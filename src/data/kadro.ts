/**
 * Kadro bilgileri — TÜMÜ YER TUTUCUDUR.
 * Yayına almadan önce gerçek ad, unvan, baro sicil numarası ve eğitim bilgileriyle değiştirilmelidir.
 * TBB Reklam Yasağı Yönetmeliği: kariyer bilgisi, sicil, dil ve çalışma alanı yazılabilir;
 * müvekkil adı, dava sonucu veya "uzman" unvanı yazılmaz.
 */
export interface Avukat {
  id: string;
  ad: string;
  unvan: string;
  baro: string;
  sicilNo: string;
  baroKayitYili: number;
  egitim: string[];
  diller: string[];
  /** calisma-alanlari.ts içindeki alan numaraları */
  alanlar: string[];
  ozet: string;
}

export const kadro: Avukat[] = [
  {
    id: 'akbulut-1',
    ad: 'Akbulut 1',
    unvan: 'Kurucu Avukat',
    baro: 'Bursa Barosu',
    sicilNo: '0000',
    baroKayitYili: 1994,
    egitim: ['Ankara Üniversitesi Hukuk Fakültesi'],
    diller: ['İngilizce'],
    alanlar: ['01', '04', '06'],
    ozet:
      "Büroyu 1996 yılında kurmuştur. Şirketler hukuku, kurumsal yapılandırma ve ticari uyuşmazlıklar alanında Bursa'daki sanayi ve ticaret işletmelerine danışmanlık vermektedir.",
  },
  {
    id: 'akbulut-2',
    ad: 'Akbulut 2',
    unvan: 'Kıdemli Avukat',
    baro: 'Bursa Barosu',
    sicilNo: '0000',
    baroKayitYili: 2005,
    egitim: ['İstanbul Üniversitesi Hukuk Fakültesi', 'Özel Hukuk Yüksek Lisansı'],
    diller: ['İngilizce', 'Almanca'],
    alanlar: ['02', '04'],
    ozet:
      'Ulusal ve uluslararası ticari sözleşmeler, tedarik ve distribütörlük ilişkileri ile pay ve varlık devri işlemlerinde çalışmaktadır.',
  },
  {
    id: 'akbulut-3',
    ad: 'Akbulut 3',
    unvan: 'Avukat',
    baro: 'Bursa Barosu',
    sicilNo: '0000',
    baroKayitYili: 2014,
    egitim: ['Bursa Uludağ Üniversitesi Hukuk Fakültesi'],
    diller: ['İngilizce'],
    alanlar: ['03', '06'],
    ozet:
      'İş ve sosyal güvenlik hukuku, iş sağlığı ve güvenliği uyumu ile işçi-işveren uyuşmazlıklarında işveren kuruluşlara hizmet vermektedir.',
  },
  {
    id: 'akbulut-4',
    ad: 'Akbulut 4',
    unvan: 'Avukat',
    baro: 'Bursa Barosu',
    sicilNo: '0000',
    baroKayitYili: 2019,
    egitim: ['Marmara Üniversitesi Hukuk Fakültesi'],
    diller: ['İngilizce', 'Fransızca'],
    alanlar: ['05', '06'],
    ozet:
      'Gayrimenkul, inşaat ve imar hukuku ile icra ve iflas takiplerinde çalışmaktadır.',
  },
];

export const kurucu = kadro[0];
export const avukatBul = (id: string | undefined) => kadro.find((a) => a.id === id);
