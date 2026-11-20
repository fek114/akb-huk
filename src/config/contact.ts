/**
 * İletişim / randevu kanalları.
 * Bir kanal `enabled: false` iken ilgili bileşen hiç render edilmez
 * ve sayfaya herhangi bir üçüncü taraf kodu eklenmez.
 */
import { site } from './site';

export const contactChannels = {
  whatsapp: {
    enabled: true,
    /** Ülke koduyla, boşluksuz: 90XXXXXXXXXX */
    number: site.phone.whatsapp,
    /** Genel düğmenin ön tanımlı mesajı */
    defaultText: 'Merhaba, görüşme talebinde bulunmak istiyorum. Konu: ',
    /** Konuya göre ön tanımlı mesajlar */
    topics: [
      'Şirket ve ticaret hukuku',
      'Sözleşme hazırlığı veya incelemesi',
      'İş hukuku ve işçi-işveren ilişkileri',
      'Gayrimenkul ve inşaat',
      'Uyuşmazlık, dava veya icra takibi',
    ],
  },
  /** Sağ alt köşedeki ön bilgilendirme asistanı (Workers AI, /api/asistan) */
  asistan: {
    enabled: true,
    /** Panel açılışındaki konu düğmeleri: etiket + asistana gönderilen mesaj */
    topics: [
      { label: 'Şirket', message: 'Şirketimizle ilgili bir konuda bilgi almak istiyorum.' },
      { label: 'Sözleşme', message: 'Bir sözleşme hakkında bilgi almak istiyorum.' },
      { label: 'İş hukuku', message: 'İş hukuku ile ilgili bir konum var.' },
      { label: 'Gayrimenkul', message: 'Gayrimenkul veya inşaatla ilgili bir konum var.' },
      { label: 'Dava ve icra', message: 'Bir dava veya icra takibiyle ilgili bilgi almak istiyorum.' },
      { label: 'Diğer', message: 'Farklı bir hukuki konuda bilgi almak istiyorum.' },
    ],
    /** Sayfaya göre ek öneri. `{baslik}` yayın başlığıyla değiştirilir. */
    pageSuggestions: {
      '/kadro': 'Hangi avukatla görüşebilirim?',
      '/iletisim': 'İlk görüşme nasıl işliyor?',
      '/calisma-alanlari': 'Konumun hangi alana girdiğinden emin değilim.',
      '/hakkimizda': 'Büronuz hangi işletmelerle çalışıyor?',
      '/yayinlar/': '"{baslik}" konusunda işletmemiz için görüşmek istiyoruz.',
    } as Record<string, string>,
    /** Süreli işlem uyarısını tetikleyen ifadeler (küçük harf, Türkçe) */
    urgentPattern:
      'tebli[gğ]|ödeme emri|haciz|hacz|gözalt|tutukla|ihtarname|dava aç[ıi]ld|dava açt[ıi]|dilekçe geldi|işten çıkar|fesih bildir|icra takib|son gün|yarın duruşma|duruşma',
  },
  calcom: {
    enabled: false,
    /** Örn. 'akbulut-hukuk/on-gorusme' */
    calLink: '',
  },
} as const;

export function waHref(number: string, text: string): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(text)}`;
}

export function topicText(topic: string): string {
  return `Merhaba, ${topic.toLocaleLowerCase('tr-TR')} konusunda görüşme talebinde bulunmak istiyorum.`;
}

export const mailHref = `mailto:${site.email}?subject=${encodeURIComponent('Görüşme talebi')}`;
