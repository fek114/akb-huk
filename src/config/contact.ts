/**
 * İletişim / randevu kanalları.
 * Bir kanal `enabled: false` iken ilgili bileşen hiç render edilmez
 * ve sayfaya herhangi bir üçüncü taraf kodu eklenmez.
 */
export const contactChannels = {
  whatsapp: {
    enabled: false,
    /** Ülke koduyla, boşluksuz: 90XXXXXXXXXX */
    number: '',
    /** wa.me ön tanımlı konu metinleri */
    topics: [
      'Şirketler ve ticaret hukuku hakkında görüşme talebi',
      'Sözleşme incelemesi hakkında görüşme talebi',
      'İş hukuku hakkında görüşme talebi',
      'Genel bilgi talebi',
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
