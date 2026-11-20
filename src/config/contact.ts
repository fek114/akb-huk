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
