# Phone Number Service

Telefon numarası doğrulama, ülke kodu yönetimi ve maskeleme işlemleri için geliştirilmiş, Angular tabanlı bir web uygulamasıdır.  
Türkiye, Fas, Mısır, Irak, İran, Kuveyt ve Birleşik Krallık gibi ülkeler için özelleştirilmiş telefon numarası giriş ve doğrulama desteği sunar.

## Özellikler

- Farklı ülkeler için telefon numarası doğrulama
- Ülke kodu seçimi ve yönetimi
- Ülkeye özel maskeleme ve placeholder desteği
- Mobil numara tipine özel doğrulama
- Angular Reactive Forms ile kolay entegrasyon
- Gerçek zamanlı doğrulama ve hata yönetimi

## Kullanılan Teknolojiler ve Paketler

- **Angular**: Uygulama çatısı
- **libphonenumber-js**: Telefon numarası doğrulama ve biçimlendirme
- **ngx-mask**: Ülkeye özel maskeleme
- **Bootstrap**: Arayüz tasarımı
- **RxJS**: Reactive state yönetimi
- **Express**: SSR ve sunucu tarafı işlemler
- **TypeScript**: Güçlü tip desteği

## Metadata Optimizasyonu (`metadata.custom.json`)

Bu projede, telefon numarası doğrulama ve biçimlendirme işlemlerinde kullanılan `libphonenumber-js` kütüphanesinin metadata dosyası, sadece ihtiyaç duyulan ülkeler için özel olarak oluşturulmuştur. Böylece uygulamanın boyutu ve yükleme süresi önemli ölçüde azaltılır.

- **Amaç:** Orijinal metadata dosyası çok büyük olduğu için, sadece EG, GB, IQ, IR, KW, MA, TR ülkeleri için optimize edilmiş bir JSON dosyası kullanılır.
- **Oluşturma:** Yeni veya güncel metadata dosyası oluşturmak için aşağıdaki komutu kullanabilirsiniz:
  ```bash
  npm run generate-libphonenumber-metadata
  ```
  Bu komut, `metadata.custom.json` dosyasını günceller.
- **Kullanım:**
  - `PhoneNumberService` içinde bu dosya doğrudan import edilir:
    ```typescript
    import metadata from "../../../../metadata.custom.json";
    ```
  - Doğrulama işlemlerinde, `parsePhoneNumberFromString` fonksiyonuna metadata parametresi olarak verilir.

## Kurulum

1. Bağımlılıkları yükleyin:

   ```bash
   npm install
   ```

2. Geliştirme sunucusunu başlatın:

   ```bash
   npm start
   ```

   veya

   ```bash
   ng serve
   ```

3. Uygulamayı tarayıcıda açın:  
   [http://localhost:4200](http://localhost:4200)

## Telefon Numarası Doğrulama ve Maskeleme

- Her ülke için `src/app/core/data/phone-number-data.ts` dosyasında maske ve placeholder tanımlıdır.
- Doğrulama işlemleri `PhoneNumberService` ile yapılır. Sadece mobil numaralar geçerli kabul edilir.
- Maskeleme için `ngx-mask` kullanılır ve maske, seçilen ülkeye göre dinamik olarak uygulanır.

## Örnek Kullanım

```typescript
// FormControl ile telefon doğrulama
phoneControl = new FormControl("", this.phoneNumberService.getPhoneValidator());
```

## Komutlar

- **Projeyi başlat:**  
  `npm start` veya `ng serve`
- **Testleri çalıştır:**  
  `ng test`
- **SSR sunucusunu başlat:**  
  `npm run serve:ssr:phone-number-service`
- **Libphonenumber metadata güncelle:**  
  `npm run generate-libphonenumber-metadata`

## Proje Yapısı

```
src/
  app/
    core/
      data/                # Ülke ve telefon numarası verileri
      models/              # Tip ve arayüzler
      services/            # Doğrulama ve yönetim servisleri
    assets/flags/          # Ülke bayrakları
  main.ts                  # Angular giriş noktası
  server.ts                # SSR sunucu dosyası
```

## Katkı Sağlama

Katkıda bulunmak için lütfen bir fork oluşturun ve pull request gönderin.  
Kodunuzu göndermeden önce testlerin geçtiğinden emin olun.

## Lisans

Bu proje MIT lisansı ile lisanslanmıştır.
