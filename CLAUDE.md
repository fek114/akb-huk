# Akbulut Hukuk Bürosu — Proje ve Tasarım Anayasası

Bu dosya projedeki tüm çalışmalar için bağlayıcıdır. Her değişiklik bu kurallara uygun olmalıdır.

## 1. Kurumsal Kimlik ve Dil Kuralları
- **Kurum Adı:** Akbulut Hukuk Bürosu
- **Konum ve Köken:** Bursa merkezli, 30 yıllık mesleki deneyime (1996'dan bugüne) sahip kurumsal hukuk bürosu.
- **Dil ve Yerelleştirme:** Site ilk etapta yalnızca **Türkçe** olacak. Kök etikette mutlaka `<html lang="tr">` kullan (CSS `uppercase` dönüşümlerinde `i → İ` karakter uyumunu korumak için).
- **Mesleki Üslup (TBB Reklam Yasağı Uyumu):** "En iyi", "kesin çözüm", "garantili sonuç", "hemen arayın" gibi ticari/reklam ifadeleri kesinlikle yasaktır. Ağırbaşlı, nesnel, kurumsal ve bilgilendirici bir hukuk dili kullan.

## 2. Teknoloji Yığını ve Gelecek Entegrasyon Hazırlığı
- **Mimari:** Astro (statik çıktı) + Tailwind CSS. Harici UI kütüphanesi (DaisyUI, Magic UI vb.) ekleme.
- **İçerik Yönetimi:** Hukuki bültenler ve makaleler `src/content/yayinlar/` altında Astro Content Collections (`.mdx`) yapısıyla yönetilecek.
- **Modüler Genişleme:**
  - `Layout.astro` içinde `<head>` alanını Cloudflare Web Analytics script'i için temiz tut (çerez banner'ı gerektirmeyen yapı).
  - İletişim ve randevu bileşenlerini ileride WhatsApp (`wa.me` ön tanımlı konu yönlendirmesi) veya Cal.com gömülü takvim bağlantısı eklenecek şekilde modüler kurgula.
  - Sağ alt köşeye ileride Cloudflare Workers tabanlı Ön Bilgilendirme Asistanı (AI chatbot) eklenebilmesi için `z-index` katmanlarını temiz bırak.

## 3. Estetik ve Görsel Sistem
- **İlham Çizgisi:** paksoy.av.tr, gsghukuk.com, egemenoglu.av.tr, goksusafiisik.av.tr/tr (Editoryal minimalizm, İsviçre tipografik ızgarası, sessiz kurumsal otorite).
- **Kesin Yasaklar:** Mor/mavi degrade (gradient), yuvarlak köşeler (`border-radius: 0px` zorunlu), kutu gölgeleri (`box-shadow`), glassmorphism, SaaS kartları, adalet terazisi/tokmak/el sıkışma stok görselleri ve renkli kutu içi ikonlar yasaktır.
- **Renk Paleti:**
  - Ana Zemin: Kırık beyaz / kemik (`#FAF9F6`)
  - İkincil Zemin: Saf beyaz (`#FFFFFF`)
  - Ana Metin: Derin antrasit (`#111315`)
  - İkincil Metin: Kurumsal gri (`#525866`)
  - Vurgu Rengi: Koyu lacivert (`#0F1E36`) ve ikincil detaylarda mat bronz (`#7C6A53`)
  - Ayırıcı Çizgiler: `1px solid #E4E4E0` (bölümleri gölgelerle değil ince çizgiler ve `py-24` / `py-32` dikey boşluklarla ayır).
- **Tipografi:** Başlıklarda Türkçe karakter desteği tam editoryal serif (*Newsreader* veya *Cormorant Garamond*, `-0.02em` tracking), gövde ve arayüzde temiz grotesk sans-serif (*Plus Jakarta Sans*).
