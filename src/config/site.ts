/**
 * Kurumsal bilgilerin TEK kaynağı.
 * Telefon, adres veya saat değiştiğinde yalnızca bu dosya güncellenir.
 */
export const site = {
  name: 'Akbulut Hukuk Bürosu',
  shortName: 'Akbulut Hukuk',
  founded: 1996,
  city: 'Bursa',
  url: 'https://www.akbuluthukuk.av.tr',
  description:
    "Bursa merkezli Akbulut Hukuk Bürosu, 1996'dan bu yana şirketlere kurumsal yönetim, ticari sözleşmeler ve uyuşmazlık çözümü alanlarında hukuki danışmanlık ve temsil hizmeti sunmaktadır.",

  address: {
    street: 'Odunluk Mah. Akademi Cad. No: 14',
    district: 'Nilüfer',
    city: 'Bursa',
    country: 'TR',
    /** Tek satır gösterim */
    full: 'Odunluk Mah. Akademi Cad. No: 14, Nilüfer / Bursa',
    /** Gömülü harita yerine dış bağlantı (çerez/üçüncü taraf isteği oluşturmaz). */
    mapUrl:
      'https://www.openstreetmap.org/search?query=Odunluk%20Mahallesi%20Akademi%20Caddesi%2014%20Nil%C3%BCfer%20Bursa',
  },

  // GEÇİCİ numara — büronun sabit hattı ve WhatsApp Business hattı netleşince güncellenmelidir.
  phone: {
    display: '+90 (537) 565 26 70',
    href: 'tel:+905375652670',
    /** WhatsApp hattı — ülke koduyla, boşluksuz. */
    whatsapp: '905375652670',
  },

  email: 'info@akbuluthukuk.av.tr',

  hours: {
    display: 'Pazartesi – Cuma · 09:00 – 18:00',
    /** schema.org formatı */
    schema: 'Mo-Fr 09:00-18:00',
  },
} as const;

export const nav = [
  { href: '/hakkimizda', label: 'Hakkımızda' },
  { href: '/kadro', label: 'Kadro' },
  { href: '/calisma-alanlari', label: 'Çalışma Alanları' },
  { href: '/iletisim', label: 'İletişim' },
] as const;

/** Alt menü: ana menü + yalnızca footer'da görünen sayfalar */
export const footerNav = [...nav, { href: '/yayinlar', label: 'Yayınlar' }] as const;

export const yearsOfPractice = new Date().getFullYear() - site.founded;
