/**
 * Akbulut Hukuk — Cloudflare Worker
 * - Statik site: ASSETS bağlaması (Astro `dist/`)
 * - POST /api/asistan: Workers AI ile ön bilgilendirme asistanı
 * Konuşmalar saklanmaz; istek gövdesi yalnızca yanıt üretmek için kullanılır.
 */
import { SYSTEM_PROMPT } from './prompt';

interface Env {
  ASSETS: { fetch: (req: Request) => Promise<Response> };
  AI: { run: (model: string, input: unknown) => Promise<unknown> };
  ASISTAN_LIMIT?: { limit: (opts: { key: string }) => Promise<{ success: boolean }> };
  AI_MODEL?: string;
  ASISTAN_ENABLED?: string;
}

type Role = 'user' | 'assistant';
interface Msg {
  role: Role;
  content: string;
}

const DEFAULT_MODEL = '@cf/google/gemma-4-26b-a4b-it';
const MAX_TURNS = 10; // son 10 mesaj
const MAX_CHARS = 1200; // mesaj başına
const MAX_BODY = 20_000;

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

function sanitize(input: unknown): Msg[] | null {
  if (!Array.isArray(input)) return null;
  const msgs = input
    .filter(
      (m): m is Msg =>
        !!m &&
        typeof m === 'object' &&
        (m.role === 'user' || m.role === 'assistant') &&
        typeof m.content === 'string' &&
        m.content.trim().length > 0,
    )
    .slice(-MAX_TURNS)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS) }));
  if (msgs.length === 0 || msgs[msgs.length - 1].role !== 'user') return null;
  return msgs;
}

/** Farklı model çıktı biçimlerinden metni çıkarır. */
function extractText(out: any): string {
  if (!out) return '';
  if (typeof out === 'string') return out;
  if (typeof out.response === 'string') return out.response;
  const choice = out.choices?.[0];
  if (choice?.message?.content) return choice.message.content;
  if (Array.isArray(out.output)) {
    for (const item of out.output) {
      const part = item?.content?.find?.((c: any) => typeof c?.text === 'string');
      if (part) return part.text;
    }
  }
  return '';
}

async function asistan(request: Request, env: Env): Promise<Response> {
  if (env.ASISTAN_ENABLED === 'false') return json({ error: 'Asistan şu anda kullanılamıyor.' }, 503);
  if (request.method !== 'POST') return json({ error: 'Yalnızca POST kabul edilir.' }, 405);

  // Yalnızca kendi sitemizden gelen istekler
  const origin = request.headers.get('origin');
  if (origin && new URL(origin).host !== new URL(request.url).host) {
    return json({ error: 'İzin verilmeyen kaynak.' }, 403);
  }

  if (env.ASISTAN_LIMIT) {
    const ip = request.headers.get('cf-connecting-ip') || 'yerel';
    const { success } = await env.ASISTAN_LIMIT.limit({ key: ip });
    if (!success) return json({ error: 'Kısa sürede çok fazla mesaj gönderildi. Lütfen bir dakika sonra tekrar deneyin.' }, 429);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY) return json({ error: 'Mesaj çok uzun.' }, 413);

  let body: any;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: 'Geçersiz istek.' }, 400);
  }
  const messages = sanitize(body?.messages);
  if (!messages) return json({ error: 'Geçersiz mesaj.' }, 400);

  const model = env.AI_MODEL || DEFAULT_MODEL;
  const system = `${SYSTEM_PROMPT}\n\n${contextBlock(body?.page)}`;
  const input = {
    messages: [{ role: 'system', content: system }, ...messages],
    max_tokens: 700,
    temperature: 0.3,
    // Akıl yürütme ("thinking") adımını kapatır: daha hızlı ve token bütçesi doğrudan yanıta gider.
    chat_template_kwargs: { enable_thinking: false },
    reasoning_effort: 'low',
  };

  // Akan yanıt: istemci `stream: true` gönderirse düz metin parçaları akar.
  if (body?.stream === true) {
    try {
      const upstream = (await env.AI.run(model, { ...input, stream: true })) as ReadableStream<Uint8Array>;
      return new Response(toTextStream(upstream), {
        headers: {
          'content-type': 'text/plain; charset=utf-8',
          'cache-control': 'no-store',
          'x-content-type-options': 'nosniff',
        },
      });
    } catch (err) {
      console.error('AI stream error', err);
      return json({ error: 'Asistan şu anda yanıt veremiyor. Telefon veya e-posta ile ulaşabilirsiniz.' }, 502);
    }
  }

  try {
    const out = await env.AI.run(model, input);
    const reply = extractText(out).trim();
    if (!reply) {
      console.error('Empty AI output shape', JSON.stringify(out).slice(0, 600));
      return json({ error: 'Yanıt üretilemedi. Lütfen tekrar deneyin.' }, 502);
    }
    return json({ reply });
  } catch (err) {
    console.error('AI error', err);
    return json({ error: 'Asistan şu anda yanıt veremiyor. Telefon veya e-posta ile ulaşabilirsiniz.' }, 502);
  }
}

/** Workers AI SSE akışını ("data: {...}") düz metin parçalarına çevirir. */
function toTextStream(upstream: ReadableStream<Uint8Array>): ReadableStream<Uint8Array> {
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let buffer = '';
  return upstream.pipeThrough(
    new TransformStream<Uint8Array, Uint8Array>({
      transform(chunk, controller) {
        buffer += decoder.decode(chunk, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';
        for (const line of lines) {
          const t = line.trim();
          if (!t.startsWith('data:')) continue;
          const data = t.slice(5).trim();
          if (!data || data === '[DONE]') continue;
          try {
            const j = JSON.parse(data);
            const piece: string = j.response ?? j.choices?.[0]?.delta?.content ?? j.choices?.[0]?.text ?? '';
            if (piece) controller.enqueue(encoder.encode(piece));
          } catch {
            /* yarım satır; bir sonraki parçada tamamlanır */
          }
        }
      },
    }),
  );
}

const SAYFALAR: Record<string, string> = {
  '/': 'Ana sayfa',
  '/hakkimizda': 'Hakkımızda',
  '/kadro': 'Kadro (avukatlar)',
  '/calisma-alanlari': 'Çalışma alanları',
  '/yayinlar': 'Yayınlar listesi',
  '/iletisim': 'İletişim',
  '/kvkk': 'KVKK aydınlatma metni',
};

/** Konuşmaya eklenen anlık bağlam: Türkiye saati, mesai durumu, ziyaretçinin bulunduğu sayfa. */
function contextBlock(page: unknown): string {
  const now = new Date();
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('tr-TR', {
      timeZone: 'Europe/Istanbul',
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
      hourCycle: 'h23',
    })
      .formatToParts(now)
      .map((p) => [p.type, p.value]),
  );
  const hour = Number(parts.hour);
  const weekend = parts.weekday === 'Cumartesi' || parts.weekday === 'Pazar';
  const mesai = !weekend && hour >= 9 && hour < 18;

  let sayfa = 'bilinmiyor';
  if (typeof page === 'object' && page) {
    const p = page as { path?: unknown; title?: unknown };
    const path = typeof p.path === 'string' ? p.path.slice(0, 120).replace(/\.html$/, '') : '';
    const title = typeof p.title === 'string' ? p.title.slice(0, 160).replace(/[\r\n]/g, ' ') : '';
    if (path.startsWith('/yayinlar/')) sayfa = `Yayın: "${title.replace(/ — .*$/, '')}"`;
    else if (SAYFALAR[path]) sayfa = SAYFALAR[path];
  }

  return `ANLIK BAĞLAM
- Şu an Türkiye saatiyle ${parts.weekday}, ${parts.hour}:${parts.minute}. Büro ${mesai ? 'mesai saatleri içinde' : 'mesai saatleri dışında'}.
- Ziyaretçinin bulunduğu sayfa: ${sayfa}.`;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/asistan') return asistan(request, env);
    return env.ASSETS.fetch(request);
  },
};
