export interface CalismaAlani {
  no: string;
  id: string;
  title: string;
  summary: string;
  scope: string[];
}

export const calismaAlanlari: CalismaAlani[] = [
  {
    no: '01',
    id: 'alan-01',
    title: 'Şirketler ve Ticaret Hukuku',
    summary:
      'Şirketlerin kuruluşundan tasfiyesine kadar geçen süreçte, kurumsal yönetim ve ticari faaliyetlere ilişkin sürekli danışmanlık hizmeti.',
    scope: [
      'Anonim ve limited şirket kuruluşu, esas sözleşme hazırlığı ve tadilleri',
      'Genel kurul ve yönetim kurulu süreçlerinin hukuki takibi',
      'Pay devri, sermaye artırımı ve azaltımı işlemleri',
      'Ortaklar arası sözleşmeler ve pay sahipleri anlaşmaları',
      'Ticari işletme rehni, ticaret sicili ve kurumsal kayıt işlemleri',
      'Yönetici sorumluluğu ve kurumsal yönetim ilkelerine uyum',
    ],
  },
  {
    no: '02',
    id: 'alan-02',
    title: 'Sözleşmeler ve Tedarik Zinciri Hukuku',
    summary:
      'Üretim ve ticaret faaliyetlerinin dayandığı sözleşme ilişkilerinin kurulması, yürütülmesi ve risklerin önceden yönetilmesi.',
    scope: [
      'Tedarik, distribütörlük, bayilik ve acentelik sözleşmeleri',
      'Fason üretim ve hizmet alım sözleşmeleri',
      'Uluslararası satım sözleşmeleri ve teslim şartları',
      'Gizlilik, rekabet yasağı ve münhasırlık düzenlemeleri',
      'Sözleşme uyarlaması, fesih ve cezai şart değerlendirmeleri',
      'Sözleşme şablonlarının standartlaştırılması ve iç süreç dokümantasyonu',
    ],
  },
  {
    no: '03',
    id: 'alan-03',
    title: 'İş ve Sosyal Güvenlik Hukuku',
    summary:
      'İşveren kuruluşlara, iş ilişkisinin kurulmasından sona ermesine kadar mevzuata uygun insan kaynakları yapısının oluşturulmasında danışmanlık.',
    scope: [
      'İş sözleşmeleri, işyeri yönetmelikleri ve disiplin prosedürleri',
      'İş sağlığı ve güvenliği yükümlülüklerine uyum',
      'Toplu işçi çıkarma, fesih süreçleri ve işe iade davaları',
      'Kıdem ve ihbar tazminatı, fazla mesai alacakları',
      'Sosyal Güvenlik Kurumu ile ilgili idari süreçler',
      'Alt işverenlik ilişkileri ve asıl işveren sorumluluğu',
    ],
  },
  {
    no: '04',
    id: 'alan-04',
    title: 'Birleşme, Devralma ve Kurumsal Yapılandırma',
    summary:
      'Şirket birleşmeleri, pay ve varlık devirleri ile grup içi yeniden yapılandırma işlemlerinde hukuki inceleme ve işlem yönetimi.',
    scope: [
      'Hukuki durum tespiti (due diligence) çalışmaları',
      'Pay ve varlık devri sözleşmelerinin hazırlanması ve müzakeresi',
      'Birleşme, bölünme ve tür değiştirme işlemleri',
      'Ortak girişim (joint venture) yapılanmaları',
      'Rekabet Kurumu izin ve bildirim süreçleri',
      'Aile şirketlerinde kurumsallaşma ve kuşak devri planlaması',
    ],
  },
  {
    no: '05',
    id: 'alan-05',
    title: 'Gayrimenkul, İnşaat ve İmar Hukuku',
    summary:
      'Sanayi ve ticari gayrimenkullere ilişkin edinim, kiralama ve inşaat projelerinde hukuki danışmanlık ve temsil.',
    scope: [
      'Taşınmaz edinimi, tapu ve kadastro işlemleri',
      'Ticari ve sanayi kiralama sözleşmeleri',
      'Kat karşılığı inşaat ve yüklenici sözleşmeleri',
      'İmar planı, yapı ruhsatı ve iskân süreçleri',
      'Organize sanayi bölgesi mevzuatından doğan işlemler',
      'Kamulaştırma ve idari işlemlere karşı başvuru yolları',
    ],
  },
  {
    no: '06',
    id: 'alan-06',
    title: 'Uyuşmazlık Çözümü, Tahkim ve İcra Hukuku',
    summary:
      'Ticari uyuşmazlıklarda arabuluculuk, yargı ve tahkim aşamalarında temsil ile alacakların takibi.',
    scope: [
      'Ticari davalar ve zorunlu arabuluculuk süreçleri',
      'Ulusal ve uluslararası tahkim yargılamaları',
      'İhtiyati tedbir ve ihtiyati haciz talepleri',
      'İcra ve iflas takipleri, alacak tahsili',
      'Konkordato süreçlerinde alacaklı ve borçlu temsili',
      'Yabancı mahkeme ve hakem kararlarının tanınması ve tenfizi',
    ],
  },
];
