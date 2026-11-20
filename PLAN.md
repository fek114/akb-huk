# Akbulut Hukuk Bürosu — Uygulama Planı

> Bağlayıcı kurallar: `CLAUDE.md`. Bu dosya *nasıl* yapılacağını ve açık kararları içerir.

---

## A. Kurulum (Adım 1)

| Paket | Amaç |
|---|---|
| `astro` | Statik site (`output: 'static'`) |
| `@astrojs/mdx` | `yayinlar` koleksiyonu |
| `@astrojs/sitemap` | `sitemap.xml` |
| `tailwindcss` + `@tailwindcss/vite` | Tailwind v4 (CSS-first `@theme` yapılandırması) |
| `@fontsource-variable/newsreader` | Başlık serif'i — **yerel barındırma** |
| `@fontsource-variable/plus-jakarta-sans` | Gövde sans-serif — **yerel barındırma** |

Başka bağımlılık yok. UI kütüphanesi, ikon paketi, animasyon kütüphanesi eklenmeyecek.

## B. Dosya Yapısı

```
src/
├─ config/
│  ├─ site.ts            # Kurum adı, adres, telefon, e-posta, saatler — TEK kaynak
│  └─ contact.ts         # Kanal bayrakları: whatsapp / calcom açık-kapalı + URL'ler
├─ content.config.ts     # yayinlar şeması (zod)
├─ content/yayinlar/
│  ├─ ticari-sozlesmelerde-uyarlama-talepleri.mdx
│  ├─ sanayi-isletmelerinde-isg-yukumlulukleri.mdx
│  └─ as-ve-ltd-sirketlerde-pay-devri-kisitlamalari.mdx
├─ data/calisma-alanlari.ts   # 01–06 alanlar + kapsam maddeleri (ana sayfa & alt sayfa ortak)
├─ layouts/
│  ├─ Layout.astro       # <html lang="tr">, <head> slot'u: analytics için boş "head-end" slot
│  └─ YayinLayout.astro  # Makale okuma düzeni (prose)
├─ components/
│  ├─ Header.astro / Footer.astro
│  ├─ SectionRule.astro       # 1px #E4E4E0 ayırıcı + bölüm etiketi
│  ├─ Eyebrow.astro           # "BURSA · 1996'DAN BUGÜNE" tipi üst etiket
│  ├─ PracticeIndex.astro     # 01–06 çizgili dizin
│  ├─ contact/
│  │  ├─ ContactBlock.astro   # Adres/telefon/e-posta/saatler
│  │  ├─ WhatsAppLink.astro   # wa.me?text=<konu> — config kapalıyken render edilmez
│  │  └─ CalEmbed.astro       # Cal.com — config kapalıyken render edilmez
│  └─ FloatingSlot.astro      # Sağ alt köşe: ileride asistan için ayrılmış boş konteyner
├─ pages/
│  ├─ index.astro
│  ├─ hakkimizda.astro
│  ├─ calisma-alanlari.astro
│  ├─ yayinlar/index.astro
│  ├─ yayinlar/[...slug].astro
│  ├─ iletisim.astro
│  ├─ kvkk.astro              # Öneri — bkz. D.1
│  └─ 404.astro
└─ styles/global.css     # @theme tokenları + global reset (radius 0, shadow none)
```

## C. Tasarım Sistemi Uygulaması

- **Tokenlar (`@theme`)**: `--color-bone #FAF9F6`, `--color-paper #FFFFFF`, `--color-ink #111315`, `--color-slate #525866`, `--color-navy #0F1E36`, `--color-bronze #7C6A53`, `--color-rule #E4E4E0`.
- **Yasakların teknik garantisi**: Tailwind'in `--radius-*`, `--shadow-*`, `--blur-*` ve gradient yardımcılarını tema düzeyinde sıfırlıyorum → `rounded-lg`, `shadow-md` yazılsa bile etkisiz. Global `* { border-radius: 0 }` emniyet katmanı.
- **Izgara**: 12 kolon, `max-w-[1360px]`, mobilde 16px / masaüstünde 48px kenar boşluğu. Asimetrik düzenler `col-span-4 / col-span-7 col-start-6` gibi.
- **Tipografi ölçeği**: H1 `clamp(2.5rem, 5vw, 4.5rem)`, serif, `tracking-[-0.02em]`, `leading-[1.05]`; gövde 17px / 1.65; etiketler 12px, `uppercase`, `tracking-[0.14em]`, bronz.
- **Hareket**: Yalnızca bağlantı alt çizgisi ve renk geçişleri (150ms). `prefers-reduced-motion` saygılı. Kaydırma animasyonu yok.
- **z-index ölçeği** (CSS değişkeni): `header 40`, `menu 50`, `floating-slot 60`, `modal 70`. Sağ alt köşede hiçbir öğe konumlandırılmayacak.
- **Görseller**: İlk etapta görselsiz, tamamen tipografik. Görsel gelirse yalnızca mimari/Bursa dokusu, siyah-beyaz.

## D. Sayfa Planı (Görev 2 içerikleri)

| Sayfa | Düzen |
|---|---|
| `/` | Üst etiket → H1 → alt metin (7/12 kolon) · Kurumsal Yaklaşım bandı (beyaz zemin, sol etiket / sağ metin) · 01–06 çizgili dizin (her satır `/calisma-alanlari#alan-0X`'e bağlı) · Son 3 yayın · İletişim şeridi |
| `/hakkimizda` | H1 · İki asimetrik blok: sol `sticky` başlık (4 kolon), sağ metin (7 kolon). Metodoloji 3 maddesi numaralı, çizgili |
| `/calisma-alanlari` | Sol `sticky` 01–06 indeks (aktif bölüm IntersectionObserver ile vurgulanır — ~20 satır vanilla JS), sağda her alan: başlık, kısa tanım, 5–7 kapsam maddesi |
| `/yayinlar` | Tarih · kategori · başlık · özet — kart değil, çizgili liste |
| `/yayinlar/[slug]` | Okuma kolonu ~68ch, üstte tarih/kategori/okuma süresi, altta standart "Bu yazı genel bilgilendirme amaçlıdır; hukuki görüş niteliği taşımaz." uyarısı |
| `/iletisim` | Sol: iletişim bilgileri ve saatler · Sağ: harita yerine metinsel yol tarifi (bkz. D.3) · Modüler kanal alanı (şu an kapalı) |

## E. Önerilerim (onayınızı bekleyen kararlar)

1. **KVKK Aydınlatma Metni sayfası (`/kvkk`)** — İletişim bilgisi yayınlayan ve ileride form/WhatsApp/chatbot ekleyecek bir büro sitesi için fiilen zorunlu. Footer'a bağlantı ile eklemeyi öneriyorum; metin taslağını ben hazırlarım, büro onaylar.
2. **Fontların yerel barındırılması** — Google Fonts CDN, ziyaretçi IP'sini yurt dışına aktarır (KVKK açısından risk; AB'de emsal kararlar var). Fontsource ile kendi sunucumuzdan sunmak bunu ortadan kaldırır ve "çerezsiz" mimariyle tutarlı.
3. **Harita** — Google Maps gömmesi çerez ve üçüncü taraf istek getirir. Öneri: metinsel adres + "Haritada aç" düz bağlantısı (tıklanınca dış siteye gider). Çerez banner'ı gerekmez.
4. **Telefon numarası** — `+90 (224) 000 00 00` yer tutucu görünüyor. `site.ts` içinde tek yerde tutacağım; gerçek numara gelince tek satır değişir. Yayına almadan önce mutlaka güncellenmeli.
5. **TBB uyumu notları**:
   - Yayın sayfalarına "hukuki görüş niteliği taşımaz" uyarısı.
   - Müvekkil adı/logosu, başarı oranı, dava sonucu, "referanslar" bölümü **olmayacak**.
   - Çalışma alanı metinlerinde "uzman" ifadesi yerine "çalışma alanı / deneyim" dili (uzmanlık unvanı Türkiye'de avukatlar için resmi değil).
   - `.av.tr` alan adı TBB kaydı gerektirir — teknik değil idari bir hatırlatma.
6. **Kadro sayfası (`/ekip`)** — Kurumsal büro sitelerinin (paksoy, gsg) çekirdeği. Görev 2'de yok; isim/sicil/baro bilgisi gelince eklenmesini öneriyorum. Şimdilik menüde yer almayacak.
7. **SEO** — `LegalService` JSON-LD (adres, saatler), sayfa başına `title`/`description`, Open Graph, `sitemap.xml`, `robots.txt`. Hepsi statik, ek maliyet yok.
8. **Yayın** — Cloudflare Pages (Web Analytics ile aynı ekosistem, ücretsiz, otomatik HTTPS). Git deposu kurulumu bu adımda gerekirse.
9. **Git** — Klasör henüz git deposu değil. Kurulumla birlikte `git init` öneriyorum.

## F. Uygulama Sırası

1. Kurulum + `global.css` tokenları + `Layout`, `Header`, `Footer`
2. `site.ts`, `calisma-alanlari.ts` veri dosyaları
3. Ana sayfa → Hakkımızda → Çalışma Alanları
4. Content collection + 3 bülten + yayın sayfaları
5. İletişim + modüler kanal bileşenleri (kapalı) + KVKK (onaylanırsa)
6. 404, SEO, sitemap
7. `astro build` + tarayıcıda masaüstü/mobil görsel kontrol + yasak listesi taraması (`rounded`, `shadow`, `gradient`, yasak ifadeler için grep)
