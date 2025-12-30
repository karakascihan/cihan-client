export const TarihFormatiDonustur = (dateStr: string) => {
    const date = new Date(dateStr);
    const formatted = date.toLocaleDateString("tr-TR", {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    return formatted;
}
export const dijitalerp_price_offer_template = `
<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BİRLEŞTİRİLMİŞ DİJİTAL ERP TEKLİF VE SİSTEM ANALİZİ (INLINE STYLE)</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; padding: 20px; background: #fff;">

    <div style="text-align: center; margin-bottom: 30px; border-bottom: 3px solid #2c3e50; padding-bottom: 20px;">
        <h1 style="color: #2c3e50; font-size: 24px; margin: 5px 0;">Tarih: ~teklifTarihi~</h1>
        <h2 style="color: #34495e; font-size: 20px; margin: 5px 0;">Teklif No: ~teklifBelgeNo~</h2>
    </div>

    <div style="background: #ecf0f1; padding: 20px; margin: 20px 0; border-left: 5px solid #3498db;">
        <p style="margin: 8px 0; font-weight: 600; color: #2c3e50;"><strong>~firmaAdi~</strong></p>
        <p style="margin: 8px 0; font-weight: 600; color: #2c3e50;">Ankara, Türkiye</p>
        <p style="margin: 8px 0; font-weight: 600; color: #2c3e50;"><strong>Konu: DİJİTAL ERP SİSTEMİ KURULUMU</strong></p>
    </div>

    <div style="margin: 25px 0; line-height: 1.8;">
        <p style="margin: 12px 0; text-align: justify;"><strong>Sayın ERKAN SEÇKİN;</strong></p>
        <p style="margin: 12px 0; text-align: justify;">Firmamıza gösterdiğiniz ilgi için teşekkür ederiz.</p>
        <p style="margin: 12px 0; text-align: justify;">Talebinize yönelik çözümümüzü sağlayan ürünler ve hizmetler bazında fiyat teklifimizi ekte bilgi görüşlerinize sunmaktan memnuniyet duyuyoruz.</p>
        <p style="margin-top: 20px; margin-bottom: 12px; text-align: justify;"><strong>DİJİTAL ERP YAZILIM TEKNOLOJİLERİ SAN. VE TİC. A.Ş. adına,</strong></p>
    </div>

    <div style="margin-top: 50px; text-align: center;">
        <p style="margin: 5px 0; font-weight: 600;">Saygılarımızla</p>
        <p style="margin: 5px 0; font-weight: 600;"><strong>Suzan ERDAL EKİNCİ</strong></p>
        <p style="margin: 5px 0; font-weight: 600;">Genel Müdür</p>
    </div>
<div style="background:#f8f9fa; padding:0; margin:0; border:2px solid #3498db; page-break-inside:avoid;">
<h2 style="color: #2c3e50; margin:0 0 1px 0; padding:0;">İÇİNDEKİLER</h2>
  <ol style="line-height:1.4; margin:0; padding-left:30px; ">
 <li style="margin:0; padding:0; list-style-type:none;">
    ÖZET
    <ul style="margin:4px 0 0 30px; padding:0; ">
      <li style="margin:0; padding:0;">TEKLİFİN TEMELİ</li>
    </ul>
  </li>

        <li style="margin: 8px 0;">TEKLİF KAPSAMI VE PROJE ÇALIŞMA PROGRAMI</li>

        <li style="margin: 8px 0;">
            TEKNİK ÇÖZÜMÜN AÇIKLAMASI
            <ul style="margin: 8px 0 0 30px;">
                <li style="margin: 8px 0;">Yazılım Lisansı</li>
                <li style="margin: 8px 0;">Uyarlama ve Geliştirme Hizmeti</li>
                <li style="margin: 8px 0;">Bakım Hizmeti</li>
                <li style="margin: 8px 0;">Eğitim</li>
            </ul>
        </li>

            <li style="margin: 8px 0;">TİCARİ ŞARTLAR VE KOŞULLAR
                <ul style="margin: 15px 0; padding-left: 30px;">
                    <li style="margin: 8px 0;">Ödeme</li>
                    <li style="margin: 8px 0;">Teslim Süresi</li>
                    <li style="margin: 8px 0;">Vergiler</li>
                    <li style="margin: 8px 0;">Teklif Geçerliliği</li>
                    <li style="margin: 8px 0;">İlave Ürün/Hizmet</li>
                    <li style="margin: 8px 0;">İlave Yazılımlar</li>
                    <li style="margin: 8px 0;">İlave Eğitim ve Servis</li>
                    <li style="margin: 8px 0;">Genişleme İhtiyacı</li>
                    <li style="margin: 8px 0;">Diğer Koşullar</li>
                    <li style="margin: 8px 0;">Sipariş Verilmesi</li>
                </ul>
            </li>
        </ol>
    </div>

    <div style="height: 1px;"></div> <h1 style="color: white; font-size: 22px; margin: 30px 0 15px 0; padding: 10px; background: #3498db; border-radius: 4px;">1. ÖZET</h1>
    
    <div style="background: #fff3cd; border: 2px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
        <p style="margin: 12px 0; text-align: justify;"><strong>Aşağıda belirtilen rakamlar kapsamı 50 kullanıcı ve belirtilen tüm modülleri kapsamaktadır.</strong></p>
    </div>

    <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">TEKLİFİN TEMELİ</h2>
    
    <p style="margin: 12px 0; text-align: justify;">Proje ana hatlarıyla teklif edilen yazılımların kurulumu, proje ekibi eğitimlerinin verilmesi, standart entegrasyonların gerçekleştirilmesi ve varsa teklifte belirtilen özel ürün/hizmetlerin sağlanmasını kapsamaktadır.</p>
    
    <p style="margin: 12px 0; text-align: justify;">Bu teklif kapsamında gösterilmeyen ve proje akışı içinde normal kabul edilebilecek durumları dışındaki tüm modifikasyonlar / revizyonlar ve teklif kapsamında belirtilmeyen ürün ve hizmetler ek bir teklif ve termin süresine tabi olacaktır. Fiyatlandırma, teklif hazırlanması için verilen bilgi, görüşme ve dokümantasyonlar göz önüne alınarak hazırlanmıştır. Proje aşamasında müşteri tarafından yapılacak değişiklikler ve istekler daha sonra değerlendirilip tekliflendirilecektir.</p>

    <h1 style="color: white; font-size: 22px; margin: 30px 0 15px 0; padding: 10px; background: #3498db; border-radius: 4px;">2. TEKLİF KAPSAMI MODÜLLER</h1>

    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <thead>
            <tr>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50; width: 10%;">No</th>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50; width: 40%;">Modül Adı</th>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50; width: 10%;">No</th>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50; width: 40%;">Modül Adı</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"><strong>1</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">CRM</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"><strong>11</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">KONFİGURASYON</td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"><strong>2</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">PROJE YÖNETİMİ</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"><strong>12</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">KALİTE YÖNETİMİ</td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"><strong>3</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">SATINALMA YÖNETİMİ</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"><strong>13</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">AR-GE TASARIM</td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"><strong>4</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">DEPO STOK YÖNETİMİ</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"><strong>14</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">KULLANICI YÖNETİMİ</td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"><strong>5</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">ÜRETİM YÖNETİMİ</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"><strong>15</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">ATIK YÖNETİMİ</td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"><strong>6</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">SERVİS BAKIM YÖNETİMİ</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"><strong>16</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">İSG</td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"><strong>7</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">DOKÜMAN YÖNETİMİ</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"><strong>17</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">ANALİZ RAPOR</td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"><strong>8</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">İNSAN KAYNAKLARI</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;" colspan="2"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"><strong>9</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">İDARİ VE MALİ İŞLER</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;" colspan="2"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"><strong>10</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">ÖN MUHASEBE</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;" colspan="2"></td>
            </tr>
        </tbody>
    </table>

    <div style="background: #d1ecf1; border: 2px solid #0dcaf0; padding: 15px; margin: 20px 0; border-radius: 4px;">
        <p style="margin: 12px 0; text-align: justify;"><strong>DİJİTAL ERP</strong> Yazılımı sadece yazılım paketi değil aynı zamanda sektörel bazda bilgi birikimi ile birlikte hizmet sunmaktadır. Yerli ve milli olarak geliştirilen Dijital ERP bilgi güvenliğinizi ön planda tutarak lokal de sizin server'ınıza kapalı çevrim kurulum gerçekleştirmektedir. Opsiyon olarak bulut tabanlı veya VPN destekli alternatif çözümler sunmaktadır. SQL tabanlı teknolojisi ile hız ve data kısıtını ortadan kaldırmaktadır.</p>
        <p style="margin: 12px 0; text-align: justify;">Birçok çözüm ortaklarımızla birlikte uçtan uca tüm süreçlerinizi son teknoloji ile Dijital Platform olarak sunmaktayız.</p>
    </div>

    <div style="height: 1px;"></div> <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">SİSTEM ANALİZ YAKLAŞIMI</h2>
    
    <p style="margin: 12px 0; text-align: justify;">Bir projenin doğru ve başarılı olması için uygulamaya başlamadan önce çalışma planı ve mevcut sistem analizinin çıkartılması gerekmektedir. Bir proje ancak bundan sonra başarıya ulaşacaktır.</p>
    
    <p style="margin: 12px 0; text-align: justify;">Bu çalışma kapsamında DİJİTAL ERP fabrika bünyesinde tümüyle ve daha verimli bir şekilde kullanılmasını temin etmek üzere yapılması düşünülen uygulama çalışmasına temel teşkil etmek üzere gerçekleştirilmesi planlanır.</p>

    <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">IMPLEMENTASYON METODOLOJİSİ</h2>
    
    <p style="margin: 12px 0; text-align: justify;">DİJİTAL ERP Yazılım'ın projelerinin gerçekleştirilmesinde uygulanan uygulama stratejisi uzun yıllardır ülkemizin pek çok saygın işletmesinde, köklü bilgi teknolojisi uygulamalarının hayata geçirilmesini sağlamıştır. DİJİTAL ERP olarak yazılım projelerinin uygulanabilmesi için, yazılımın geliştirilmesi aktivitelerinin dışında önem arz eden pek çok diğer aktivitenin olduğunun bilincindeyiz. Aşağıda DİJİTAL ERP İmplementasyon Metodolojisi ana başlıkları ile irdelenecektir.</p>

    <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">PROJE ORGANİZASYONU</h2>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Proje Ekibinin Tespiti:</h3>
    
    <p style="margin: 12px 0; text-align: justify;">Proje Dijital ERP Yazılım ve <strong>Firma</strong> personelinden oluşan bir proje grubu tarafından gerçekleştirilir. Dijital ERP Yazılım Proje Ekibi, Proje Yöneticisi, Proje Uzmanı ve Proje Eğitmenlerinden oluşacaktır. <strong>Firmanız</strong> da buna paralel olarak projenin koordine bir şekilde idaresine katkıda bulunacak bir ekibi oluşturması gerekmektedir. Bu ekibin Proje Yöneticisi ve Departman Proje Sorumlularından oluşması gerekmektedir. Bu Koordinatör opsiyon olarak ERP Danışmanımız tarafından da yapılabilmektedir.</p>

    <h3 style="color: #2c3e50; margin-top: 25px;">MÜŞTERİ Proje Organizasyonu:</h3>
    
    <p style="margin: 12px 0; text-align: justify;">ERP Projeleri ancak bütün departmanların katılımıyla başarılı olarak tamamlanabilir. Firmanız Projesinde olması gereken organizasyon yapısını aşağıda sizin için belirledik.</p>

    <div style="background: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin: 15px 0;">
        <h3 style="color: #2980b9; margin-top: 0;">Proje Genel Koordinatörü</h3>
        <p style="margin: 12px 0; text-align: justify;">Firma içindeki organizasyonlar arası ihtilaf ve geç alınan kararlar konusunda destek olur.</p>
    </div>

    <div style="background: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin: 15px 0;">
        <h3 style="color: #2980b9; margin-top: 0;">Dijital ERP Proje Takımı</h3>
        <p style="margin: 12px 0; text-align: justify;">Bu Projede Bir Proje Yöneticisi ve uygulamanın tamamına hakim bir personel Eğitim ve Destek Uzmanı bulunacaktır.</p>
        <p style="margin: 12px 0; text-align: justify;">Dijital ERP ekibi Uygulama geliştirme -- Karar alma -- Yazılım ve iş akışları konusunda tecrübeli ekiplerden oluşur.</p>
        <p style="margin: 12px 0; text-align: justify;">İhtiyaç anında uygulama üzerindeki her türlü geliştirmeyi anlık olarak yaparlar.</p>
        <p style="margin: 12px 0; text-align: justify;">Proje Yöneticisi projeyi sürekli izleyerek yapılma taahhüdü verilen işlerin zamanlamasını ve oluşan aksamaları önler.</p>
    </div>

    <div style="background: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin: 15px 0;">
        <h3 style="color: #2980b9; margin-top: 0;">Firma ERP Proje Sorumlusu</h3>
        <p style="margin: 12px 0; text-align: justify;">Projenin her aşamasından sorumluluk alabilecek ve her türlü data toplama -- Uygulama geliştirme konularında katkı sağlayacak -- iş akışlarının belirlenmesinde karar alabilecek düzeyde yetkili olmalı.</p>
    </div>

    <div style="background: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin: 15px 0;">
        <h3 style="color: #2980b9; margin-top: 0;">Finansman ve Muhasebe Proje Sorumlusu</h3>
        <p style="margin: 12px 0; text-align: justify;">Finansman ve Muhasebe operasyonları konusunda bilgili bu konularda çıkacak her türlü problemde anında karar alma yetkisine sahip olmalı</p>
    </div>

    <div style="background: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin: 15px 0;">
        <h3 style="color: #2980b9; margin-top: 0;">Satış Departmanı Proje Sorumlusu</h3>
        <p style="margin: 12px 0; text-align: justify;">Satış organizasyonun geliştirilmesi konusunda karar alabilecek bu birimlerden beklenen dataların toplanmasına katkı sağlayabilecek yetkiye sahip olmalı</p>
    </div>

    <div style="background: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin: 15px 0;">
        <h3 style="color: #2980b9; margin-top: 0;">Satınalma Departmanı Proje Sorumlusu</h3>
        <p style="margin: 12px 0; text-align: justify;">Satınalma Uygulamalarında ve Satınalma organizasyonun geliştirilmesi konusunda karar alabilecek bu birimlerden beklenen dataların toplanmasına katkı sağlayabilecek yetkiye sahip olmalı</p>
    </div>

    <div style="background: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin: 15px 0;">
        <h3 style="color: #2980b9; margin-top: 0;">Üretim Planlama Proje Sorumlusu</h3>
        <p style="margin: 12px 0; text-align: justify;">Alınan siparişlerin Üretime gönderilmesi -- iş emirsiz malzeme üretilmemesi ve bütün departmanların malzeme ihtiyaçlarının belirlenmesi -- tedarik süreleri ve emniyet stokları gibi çalışmaları canlı tutacak yetkiye sahip olmalı</p>
    </div>

    <div style="background: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin: 15px 0;">
        <h3 style="color: #2980b9; margin-top: 0;">Lojistik Yöneticisi Proje Sorumlusu</h3>
        <p style="margin: 12px 0; text-align: justify;"><strong>Firmanız</strong> bünyesinde yer alan depoların planlanması ve raflanması--depolardaki kullanıcı yetkilerinin belirlenmesi konularında karar alabilecek- emniyet stokları ve ABC stok öncelikleri gibi çalışmalarda bulunabilecek stokların detaylandırılmasında destek sağlayacak yetkide olmalı</p>
    </div>

    <div style="height: 1px;"></div> <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">Mevcut Sistemin Analizi</h2>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Şirket Ana Fonksiyonlarının Belirlenmesi:</h3>
    <p style="margin: 12px 0; text-align: justify;">Oluşturulan Proje Ekibi, şirketin aktiviteleri kapsamında olan ana fonksiyonları belirleyecektir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Mevcut İş Akışlarının Çıkarılması:</h3>
    <p style="margin: 12px 0; text-align: justify;">Belirlenen tüm ana fonksiyonlar doğrultusunda mevcut sistemin iş akışı incelenecektir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Mevcut Yapıdaki Problemlerin Belirlenmesi:</h3>
    <p style="margin: 12px 0; text-align: justify;">Ana fonksiyonlar ve iş akışı bazında mevcut sistemin problemleri belirlenip dokümante edilmesi.</p>

    <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">Şirket İhtiyaçlarının Belirlenmesi</h2>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Fonksiyon Bazında İhtiyaçların Belirlenmesi:</h3>
    <p style="margin: 12px 0; text-align: justify;">Mevcut sistemin işleyişindeki problemler göz önüne alınarak, kurulması istenilen sistemin ihtiyaçları belirlenir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Raporlama İhtiyaçlarının Belirlenmesi:</h3>
    <p style="margin: 12px 0; text-align: justify;">Belirlenen sistem fonksiyonları ve ihtiyaçlar doğrultusunda operasyonel ve yönetim raporları tespit edilecektir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">İş Akışlarının Düzenlenmesi:</h3>
    <p style="margin: 12px 0; text-align: justify;">Kurulacak sistemin işleyişine mani olan iş akışları belirlenir ve gerek görülürse denetim komitesinin onayına sunularak değişimi sağlanır.</p>

    <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">Hazırlık</h2>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Paket Parametrelerinin Oluşturulması:</h3>
    <p style="margin: 12px 0; text-align: justify;">İhtiyaç analizinde ortaya çıkan sonuçlar ışığında standartlar, program parametreleri, ön değerler, evrak kodları, kullanıcı bazında haklar, menü tasarımları tespit edilip uyarlanarak dokümanter edilir ve uygulama üzerinde düzenlenir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Programın Sisteme Yüklenmesi:</h3>
    <p style="margin: 12px 0; text-align: justify;">Programların sisteme yüklenmesi DİJİTAL ERP tarafından yapılır. Bu çalışma sonunda paketin sistem üzerinde organizasyonu dokümante edilir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Raporların Hazırlanması:</h3>
    <p style="margin: 12px 0; text-align: justify;">Tespit edilmiş raporlar sistemde dizayn edilerek teslim edilir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Kullanıcı Eğitimleri:</h3>
    <p style="margin: 12px 0; text-align: justify;">Programın uygulamaya geçmesinden önce son aşama olarak, kullanıcılar programın genel özellikleri ile detayda her kullanıcının kendi işiyle ilgili çalışma şekli uygulamalı olarak tanıtılacaktır. Bu süreçte kullanıcılarla tek tek çalışılabileceği gibi aynı işi yapan personel, gruplar halinde de eğitilebilir.</p>

    <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">Uygulama</h2>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Sistem Değişimi Planının Hazırlanması:</h3>
    <p style="margin: 12px 0; text-align: justify;">Mevcut sistemden yeni sisteme geçebilmek için atılması gereken adımlar ve süreleri belirlenecektir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Uygulamanın Başlatılması:</h3>
    <p style="margin: 12px 0; text-align: justify;">Yapılan plan doğrultusunda tüm operasyonlar yeni sisteme aktarılıp, sistemin çalışırlığı temin edilecektir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Sistem Testi:</h3>
    <p style="margin: 12px 0; text-align: justify;">Yeni kurulan sistem test edilerek kullanıma hazır hale getirilir.</p>

    <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">Teknik Mimari (Parça 3'te Tekrar Ediyor)</h2>
    
    <p style="margin: 12px 0; text-align: justify;">DİJİTAL ERP uygulama ortamı içinde kendi uygulama geliştirme ve yorumlama ortamlarını içeren üç katmanlı (islemci, sunucu, veritabanı) ve platform ve veritabanı bağımsız bir uygulama ortamıdır. Geliştirme ve yorumlama ortamları tamamen pl/sql -xml kullanılarak geliştirilmiştir. Bu sebeple pek çok donanım ve işletim sistemi ile sorunsuz olarak çalışabilmektedirler.</p>
    
    <p style="margin: 12px 0; text-align: justify;">Veri tabanı olarak SQL kullanılmıştır. İşletim sistemleri üzerinde sorunsuz çalışır.</p>
    
    <p style="margin: 12px 0; text-align: justify;">DİJİTAL ERP yazılımı, sisteme aynı anda bağlanacak kullanıcı sayısı baz alınarak lisanslandırılmaktadır.</p>
    
    <p style="margin: 12px 0; text-align: justify;">DİJİTAL ERP uygulama sunucusu uygulaması Windows (Windows 7 / 8 /10 Server) ve Linux işletim sistemleri üzerinde çalışmaktadır. Eğer uygulama sunucusu ve veritabanı sunucusu olarak aynı sunucu donanımı kullanılacaksa, sunucu işletim sistemi veritabanı sunucusu uygulamasına bağlı olarak seçilmelidir.</p>
    
    <p style="margin: 12px 0; text-align: justify;">DİJİTAL ERP Kullanıcı makinasında, internet explorer 7 ve üzeri kurulumu olmalıdır. Pdf raporlama yapıldığı için Acrobat Reader kurulmalıdır. Veritabanı sunucusu istemci erişim araçlarının kurulmasına gerek yoktur. Browser ve Acrobat reader dışında ( her ikisi de lisans gerektirmeyen uygulamalardır) İstemci tarafında disk alanına ihtiyaç duyulmamaktadır.</p>

    <div style="height: 1px;"></div> <h1 style="color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; margin-top: 30px; font-size: 24px;">Teknik Mimari</h1>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    DİJİTAL ERP uygulama ortamı içinde kendi uygulama geliştirme ve yorumlama ortamlarını içeren üç katmanlı (işlemci, sunucu, veritabanı) ve platform ve veritabanı bağımsız bir uygulama ortamıdır. Geliştirme ve yorumlama ortamları tamamen pl/sql -xml kullanılarak geliştirilmiştir. Bu sebeple pek çok donanım ve işletim sistemi ile sorunsuz olarak çalışabilmektedirler.
    </blockquote>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    Veri tabanı olarak SQL kullanılmıştır. İşletim sistemleri üzerinde sorunsuz çalışır.
    </blockquote>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    DİJİTAL ERP yazılımı, sisteme aynı anda bağlanacak kullanıcı sayısı baz alınarak lisanslandırılmaktadır.
    </blockquote>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    DİJİTAL ERP uygulama sunucusu uygulaması Windows (Windows 7 / 8 /10 Server) ve Linux işletim sistemleri üzerinde çalışmaktadır. Eğer uygulama sunucusu ve veritabanı sunucusu olarak aynı sunucu donanımı kullanılacaksa, sunucu işletim sistemi veritabanı sunucusu uygulamasına bağlı olarak seçilmelidir.
    </blockquote>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    DİJİTAL ERP Kullanıcı makinasında, internet explorer 7 ve üzeri kurulumu olmalıdır. Pdf raporlama yapıldığı için Acrobat Reader kurulmalıdır. Veritabanı sunucusu istemci erişim araçlarının kurulmasına gerek yoktur. Browser ve Acrobat reader dışında (her ikisi de lisans gerektirmeyen uygulamalardır) İstemci tarafında disk alanına ihtiyaç duyulmamaktadır.
    </blockquote>

    <div style="height: 2px; background: #667eea; margin: 30px 0;"></div>

    <h1 style="color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; margin-top: 30px; font-size: 24px;">Proje Uygulama Planı</h1>
    <p style="font-style: italic; color: #666; margin: 12px 0; text-align: justify;">(Proje Başlangıcında Doldurulacaktır)</p>

    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <thead>
            <tr>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">Sıra</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">Açıklama</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">01</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">02</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">03</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">04</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">05</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">06</th>
            </tr>
        </thead>
        <tbody>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;">1</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"><strong>Sistem Analizi Çalışması</strong><br>Proje kapsamında belirlenen departmanların detaylı iş süreçleri analiz edilecektir.</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">1.1</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Satış Departmanı Sistem Analizi</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">1.2</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Satınalma Departmanı Sistem Analizi</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">1.3</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Lojistik Sistem Analizi</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">1.4</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Finansman Sistem Analizi</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">1.5</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Muhasebe Sistem Analizi</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">1.6</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Bakım Yönetimi Sistem Analizi</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">1.7</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Proje Yönetimi Sistem Analizi</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;">2</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"><strong>Data Hazırlıkları</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">2.1</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Var Olan Dataların Düzenlenmesi ve Test olarak Aktarılması (Müşteriler - Adresler - Depolar - Satıcılar - Hesap Planları - Stok ve Hizmet kartları)</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">2.2</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Satış Datalarının Geçiş Öncesi Aktarma Programlarının Yazılması</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">2.3</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Finansman ve Muhasebe Datalarının Geçiş Öncesi Aktarma Programlarının Yazılması</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">2.4</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Bakım Yönetimi Datalarının Aktarılma Çalışmasını Yapılması</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;">3</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"><strong>1.Faz Eğitimlere Başlanması</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">3.1</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Malzeme Yönetimi Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">3.2</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Satış Yönetimi Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">3.3</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Satınalma Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">3.4</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">İthalat Birimi Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">3.5</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Satınalma Departmanı Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">3.6</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Finansman Departmanı Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">3.7</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Muhasebe Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">3.8</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Entegrasyon Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">3.9</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Bakım Yönetimi Kullanıcı Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">3.10</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Şantiye-Proje Yönetimi Kullanıcı Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;">4</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"><strong>2.Faz Eğitimlere Başlanması ve Yapılan Modifikasyonların Uygunluk Tespitlerinin yapılması</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">4.1</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Malzeme Yönetimi Eğitimleri ve Sevkiyat Simülasyonları</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">4.2</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Satış Yönetimi Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">4.3</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Satınalma Eğitimleri ve Satınalma İhtiyaçlarının Birimlerden Toplanması</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">4.4</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">İthalat Birimi Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">4.5</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Satınalma Departmanı Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">4.6</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Finansman Departmanı Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">4.7</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Muhasebe Eğitimleri Geliştirme Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">4.8</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Entegrasyon Eğitimleri Geliştirme Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">4.9</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Bakım Yönetimi Geliştirme Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;">5</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"><strong>Paralel Test Kullanımı</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
            </tr>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;">6</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"><strong>Day 1. (Projenin Gerçek Kullanıma Alınması)</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
            </tr>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;">7</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"><strong>Maliyet Çalışmalarının Başlatılması ve Tamamlanması</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
            </tr>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;">8</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"><strong>Yönetim Raporlama Sistemlerinin Tamamlanması</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
            </tr>
        </tbody>
    </table>

    <div style="height: 2px; background: #667eea; margin: 30px 0;"></div>

    <h2 style="color: #34495e; margin-top: 25px; font-size: 20px; border-left: 4px solid #3498db; padding-left: 10px;">Geliştirme</h2>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    Ortaya çıkacak olan özel uygulamalar, ek tablo vb. İstekler için önceden detaylı bir konsept hazırlanır. Bu konseptin hayata geçirilmesi için DİJİTAL ERP tarafından öngörülen geliştirme adam/gün sayısı olarak belirlenir ve proje yönetimine sunulur. Proje yönetimi tarafından onay alındıktan sonra konsept öngörülen zamanda ve şartlarda DİJİTAL ERP tarafından hayata geçirilir.
    </blockquote>

    <div style="height: 2px; background: #667eea; margin: 30px 0;"></div>

    <h1 style="color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; margin-top: 30px; font-size: 24px;">TEKNİK ÇÖZÜMÜN AÇIKLAMASI</h1>

    <h2 style="color: #34495e; margin-top: 25px; font-size: 20px; border-left: 4px solid #3498db; padding-left: 10px;">3.1. YAZILIM LİSANSI</h2>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    Aşağıda verilen rakamların kapsamı yukarıda belirlenen modüller ve <span style="background-color: #fff3cd; padding: 2px 6px; border-radius: 3px;">50 kullanıcı</span> baz alınarak hazırlanmış olup, proje içerisinde gerçekleşecek analizlerde ortaya çıkacak ihtiyaç ve beklentilere göre ve/veya müşteri ilaveleri ve revizyonlarına göre değişiklik gösterebilir. Toplam lisans bedeline dahil olanlar; Seçilen modüllerin kurulumu, Seçilen modüllere karşılık gelen adam/gün proje grubu eğitimleri, ve seçilen ürünün yukarıda belirtildiği gibi kullanıcı lisansı.
    </blockquote>

    <h2 style="color: #34495e; margin-top: 25px; font-size: 20px; border-left: 4px solid #3498db; padding-left: 10px;">3.2. UYARLAMA VE GELİŞTİRME HİZMETİ</h2>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    Proje uyarlama süremiz intranet sistemli çalışacak modüller için; <span style="background-color: #fff3cd; padding: 2px 6px; border-radius: 3px;">6 ay</span> olup, bu süre ilaveler ve uyarlama istekleri olması durumunda değişiklik gösterebilir.
    </blockquote>

    <h2 style="color: #34495e; margin-top: 25px; font-size: 20px; border-left: 4px solid #3498db; padding-left: 10px;">3.3. BAKIM</h2>

    <ul style="margin: 15px 0; padding-left: 30px;">
        <li style="margin: 8px 0;">Uygulama, firmanızın sunucusuna kurulumundan itibaren 1 yıl süre ile garanti kapsamında olacaktır. Bu dönem içerisinde uygulamadan kaynaklanan program hatalarının giderilmesi, telefon desteği ve uygulamanın yeni sürümleri için ayrıca bir bedel talep edilmeyecektir. Uygulamanın sunuculara kurulumu, Dijital ERP'den kaynaklanmayan nedenlerle, anlaşmanın imzalanmasından sonraki 3 ay içerisinde yapılmadığı takdirde garanti süresi anlaşma tarihinden sonraki 3. Ayın sonunda başlayacaktır.</li>
        
        <li style="margin: 8px 0;">Garanti süresi bitiminde yıllık bakım yapılması gerekmektedir. Uygulamanın sürekli fonksiyonel iyileştirilmesi ve yazılım teknolojisindeki gelişmelerin uygulamaya yansıtılması ile yazılımın güncel tutulması, ayrıca uygulamada çıkabilecek problemlerin giderilmesi, sınırsız sayıda bildirim girilmesi ve telefon desteği bu anlaşma kapsamında yapılacaktır.</li>
        
        <li style="margin: 8px 0;">Dijital ERP Yazılımı <span style="background-color: #fff3cd; padding: 2px 6px; border-radius: 3px;">Bakım Bedeli Yıllık</span> bazda ücret belirlenmiştir. Yazılım lisans bedelinin <span style="background-color: #fff3cd; padding: 2px 6px; border-radius: 3px;">%15</span> olarak belirlenmiştir. TÜİK tarafından açıklanan TÜİK 2003=100 Tüketici ve Üretici fiyatları genel endeksi 'on iki aylık ortalamalara göre değişim % oranı' tablolarından (TÜFE+ÜFE)/2 ortalaması oranları esas alınarak arttırılacaktır.</li>
        
        <li style="margin: 8px 0;">Bakım Lisans bedelinin %15 olarak her yıl sözleşme tarihinde satın alım tarihinde peşin ödeme olarak talep edilecektir.</li>
    </ul>

    <h2 style="color: #34495e; margin-top: 25px; font-size: 20px; border-left: 4px solid #3498db; padding-left: 10px;">3.4. EĞİTİM</h2>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    Proje süresi boyunca müşteri ile birlikte veya bağımsız çalışmaları, eğitimleri ekran karşısında pratiğe dönüştüreceklerdir.
    </blockquote>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    Bu proje kapsamında eğitim, <span style="background-color: #fff3cd; padding: 2px 6px; border-radius: 3px;">50 kişi / 10 gün</span> verilecektir. Proje tesliminden sonra ilave eğitim taleplerinde adam/gün bazında ayrıca ücretlendirilecektir.
    </blockquote>

    <div style="height: 2px; background: #667eea; margin: 30px 0;"></div>

    <h1 style="color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; margin-top: 30px; font-size: 24px;">FİYATLAR</h1>

    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <thead>
            <tr>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">Açıklama</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">Miktar</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">Birim</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">Para Birimi</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">Birim Fiyat (USD)</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">Toplam Fiyat (USD)</th>
            </tr>
        </thead>
        <tbody>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;" colspan="6"><strong>LİSANS</strong></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">50</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Kullanıcı</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">USD</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">50$</td>
            </tr>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;" colspan="6"><strong>HİZMETLER</strong></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Uyarlama ve Geliştirme Hizmetleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">3/180</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Adam/Gün</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">USD</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">14,000</td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Uzaktan Destek, Yerinde Destek</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">USD</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Eğitim</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">30/7</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">KİŞİ/GÜN</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Fiyata dahil</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">ERP DANIŞMANLIK HİZMETİ - OPSİYON</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">1/24</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Adam/Gün</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">USD</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">300$</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;" colspan="6"><strong>MODÜLLER</strong></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">ENTERPRISE PAKET + OPSİYONLARI<br>17 MODÜL İÇERİĞİ DAHİLDİR.</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">1 SET</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">35$</td>
            </tr>
            <tr style="background-color: #fff3cd !important; font-weight: bold; font-size: 1.1em;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff3cd; font-weight: bold; font-size: 1.1em;" colspan="5"><strong>TOPLAM LİSANS + HİZMET BEDELİ (USD):</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff3cd; font-weight: bold; font-size: 1.1em;"><strong>10,000$</strong></td>
            </tr>
            <tr style="background-color: #fff3cd !important; font-weight: bold; font-size: 1.1em;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff3cd; font-weight: bold; font-size: 1.1em;" colspan="5"><strong>İSKONTO (%40) (Firmanıza özel)</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff3cd; font-weight: bold; font-size: 1.1em;"><strong>30,000$</strong></td>
            </tr>
            <tr style="background-color: #d4edda !important; font-weight: bold; font-size: 1.1em;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #d4edda; font-weight: bold; font-size: 1.1em;" colspan="5"><strong>GENEL TOPLAM (Yalnız Ellibirbindokuzyüz USD'dir)</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #d4edda; font-weight: bold; font-size: 1.1em;"><strong>40,000$</strong></td>
            </tr>
        </tbody>
    </table>

    <h2 style="color: #34495e; margin-top: 25px; font-size: 20px; border-left: 4px solid #3498db; padding-left: 10px;">OPSİYONLAR</h2>

    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <thead>
            <tr>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50;">Açıklama</th>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50;">Miktar</th>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50;">Birim</th>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50;">Para Birimi</th>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50;">Birim Fiyat (USD)</th>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50;">Toplam Fiyat (USD)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Bakım Destek</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">2. yıl itibaren teklif tutarının %15</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Yıllık</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">İlk yıl bedelsiz</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">İlk yıl bedelsiz</td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">EK HİZMET (Servis, Destek, Eğitim..vb.)</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">1</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Adam/gün</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">USD</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">300$</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">İlave Modül (OPSİYON)<br>İsteğe bağlı ayrıca tekliflendirilecektir.</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;" colspan="5"></td>
            </tr>

        </tbody>
    </table>

    <div style="height: 1px;"></div> <div style="background-color: white; padding: 40px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <h1 style="color: #1e3a8a; font-size: 20px; font-weight: bold; margin-top: 30px; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 3px solid #3b82f6;">OPSİYON İLAVE LİSANS ÜCRETLERİ</h1>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <thead>
                <tr>
                
    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">~Açıklama~</th>
    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">~Miktar~</th>
    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">~Birim~</th>
    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">~ParaBirimi~</th>
    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">~BirimFiyat~</th>
    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">~ToplamFiyat~</th>
</tr>

                   
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">İlave 1 Kullanıcı Lisans Bedeli</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">1</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">USD</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">50$</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">50$</td>
                </tr>
                <tr style="background: #f8f9fa;">
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">İlave 5 Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">5</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">USD</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">50$</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">250$</td>
                </tr>
                <tr>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">İlave 25 Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">25</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">USD</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">50$</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">1,250$</td>
                </tr>
                <tr style="background: #f8f9fa;">
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">İlave 50 Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">50</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">USD</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">25$</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">1,250$</td>
                </tr>
                <tr>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">İlave 100 Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">100</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">USD</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">4.00$</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">400$</td>
                </tr>
            </tbody>
        </table>

        <div style="margin: 40px 0; border-top: 2px solid #e2e8f0;"></div>

        <h1 style="color: #1e3a8a; font-size: 20px; font-weight: bold; margin-top: 30px; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 3px solid #3b82f6;">E-DÖNÜŞÜM-OPSİYON</h1>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <thead>
                <tr>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Açıklama</th>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Miktar</th>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Birim</th>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Para Birimi</th>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Birim Fiyat</th>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Toplam Fiyat TL</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">KONTOR</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">1</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">ADET</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">TL</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">4 TL</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">4 TL</td>
                </tr>
                <tr style="background: #f8f9fa;">
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">E-FATURA</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;" colspan="5"></td>
                </tr>
                <tr>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">E-ARŞİV</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;" colspan="5"></td>
                </tr>
                <tr style="background: #f8f9fa;">
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">E-İHRACAT</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;" colspan="5"></td>
                </tr>
            </tbody>
        </table>

        <div style="margin: 40px 0; border-top: 2px solid #e2e8f0;"></div>

        <h1 style="color: #1e3a8a; font-size: 20px; font-weight: bold; margin-top: 30px; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 3px solid #3b82f6;">TİCARİ ŞARTLAR VE KOŞULLAR</h1>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">ÖDEME</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            <p style="margin: 12px 0; text-align: justify;">Ödeme şartları aşağıdaki tabloda belirtilmiştir.</p>
            <p style="margin: 12px 0; text-align: justify;">Kullanım lisans bedelleri, sözleşme imzalanmasını takiben, lisans tutarında fatura edilecektir.</p>
            <p style="margin: 12px 0; text-align: justify;">Hizmet bedellerine ait faturalar, hizmet sözleşmesi imzalandığı andan itibaren aylık veya haftalık baz da fatura edilecektir.</p>
            <p style="margin: 12px 0; text-align: justify;">Yabancı para birimi cinsinden kesilen fatura bedelleri, o günün T.C. Merkez Bankası döviz satış kuru ile Türk Lirası'na çevrilip KDV ilave edilerek faturaya dönüştürülecektir.</p>
            <p style="margin: 12px 0; text-align: justify;">Ödemeler fatura tarihini izleyen aşağıdaki tabloya istinaden yapılacak olup, bu süreler içinde yapılmayan ödemeler için fatura tarihinden itibaren TL değerler için aylık %2, yabancı para cinsi için %1 vade farkı ve KDV ilavesi ile fatura edilecektir.</p>
            <p style="margin: 12px 0; text-align: justify;">Yıllık bakım destek hizmetleri ise bakım dönemi başında fatura edilir ve tüm faturaların ödeme vadesi 10 (on) iş günüdür.</p>
        </blockquote>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <thead>
                <tr>
                    <th style="background-color: #059669; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #047857; font-size: 13px;">No</th>
                    <th style="background-color: #059669; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #047857; font-size: 13px;">TL</th>
                    <th style="background-color: #059669; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #047857; font-size: 13px;">Açıklama</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">1</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">%25</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">Siparişle birlikte peşin</td>
                </tr>
                <tr style="background: #f8f9fa;">
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">2</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">%50</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">Kurulum aşamasında</td>
                </tr>
                <tr>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">3</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">%15</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">Uyarlama Geliştirme</td>
                </tr>
                <tr style="background: #f8f9fa;">
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">4</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">%10</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">Teslimatta</td>
                </tr>
            </tbody>
        </table>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">TESLİM SÜRESİ</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            Teklifimizde belirlenen kapsamlar dahilinde <strong>180 gün</strong> içerisinde canlı teslimi yapılması planlanmıştır. Uyarlama süreçleri 1 yıl süreyle devam edecektir.
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">VERGİLER</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            Fiyatlarımıza KDV, diğer vergi, resim ve harçlar dahil değildir.
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">TEKLİF GEÇERLİLİĞİ</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            <strong>~teklifGecerlilikSuresi~</strong>
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">İLAVE ÜRÜN/HİZMET / MODÜL</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            Proje sırasında ortaya çıkacak olan özel uygulamalar, ek tablo, ve ekran istekleri bu teklif kapsamında değildir. Proje sırasında ortaya çıkan yazılım geliştirme ihtiyaçlarına göre detaylı çalışma yapılır. Ayrıca tekliflendirilir.
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">İLAVE YAZILIMLAR</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            Dijital ERP_V1 sisteminin çalışabilmesi için gereken işletim sistemi ve database gibi üçüncü parti yazılımlar teklif kapsamında değildir.
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">İLAVE EĞİTİM VE SERVİS</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            İlave eğitim, program yazılımı, veri aktarımı ve entegrasyon işlemleri için adam-gün ücretimiz <strong>300 USD+KDV</strong> olup, yol, konaklama (Ankara dışı olması halinde) ve yemek bedellerini kapsamaktadır.
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">GENİŞLEME İHTİYACI</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            İleride ihtiyaç olması durumunda kapasite artışı halinde talep edilen ilave kullanıcılar için teklifte belirtilen birim kullanıcı fiyatı üzerinden hesaplanıp fatura edilecektir.
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">DİĞER KOŞULLAR</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            Proje için, firmanızın kullanıcılarından bir proje grubu oluşturulup, eğitimler bu proje grubuna verilecektir. Proje grubu çalışmalar için gereken zamanı ayıracaktır.
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">DANIŞMANLIK-DESTEK HİZMETİ</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            Sistem devreye alındıktan sonra ihtiyaç duyulması halinde garanti süresi sonrasında, yüz yüze veya uzaktan çağrı sistemi ile <strong>300 USD adam/gün</strong> olarak ücretlendirilecektir.
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">SİPARİŞ VERİLMESİ</h2>
        <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin-top: 20px;">
            <p style="margin: 8px 0; color: #065f46; font-weight: 500; text-align: justify;">Sipariş için lütfen aşağıdaki kişi ile iletişime geçiniz.</p>
            <p style="margin: 8px 0; color: #065f46; font-weight: 500; text-align: justify;"><strong>SUZAN ERDAL EKİNCİ</strong></p>
            <p style="margin: 8px 0; color: #065f46; font-weight: 500; text-align: justify;">Tel: +90 533 5011270</p>
            <p style="margin: 8px 0; color: #065f46; font-weight: 500; text-align: justify;">Email: suzan.erdal@dijitalerpyazilim.com</p>
        </div>
    </div>

</body>
</html>`;
export const dijitalerp_price_offer_template2 = `<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BİRLEŞTİRİLMİŞ DİJİTAL ERP TEKLİF VE SİSTEM ANALİZİ (INLINE STYLE)</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; padding: 20px; background: #fff;">
 <div style="text-align: center;">
        <h1 style="font-size: 28px; color: #2c3e50; margin-bottom: 20px; border-bottom: 4px solid #3498db; padding-bottom: 10px; margin-top: 0;">TEKLİF MEKTUBU</h1>
        <p style="font-size: 18px; font-weight: bold; color: #34495e; margin-bottom: 30px;">DİJİTAL ERP YAZILIM TEKNOLOJİLERİ A.Ş.</p>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 14px;">
        <tbody style="vertical-align: top;">
            <tr>
                <td style="width: 30%; padding: 5px 0; font-weight: bold; color: #2c3e50;">TEKLİF NO</td>
                <td style="width: 70%; padding: 5px 0; border-bottom: 1px dotted #ccc;font-weight: bold;">~teklifBelgeNo~</td>
            </tr>
            <tr>
                <td style="width: 30%; padding: 5px 0; font-weight: bold; color: #2c3e50;">PROJE ADI</td>
                <td style="width: 70%; padding: 5px 0; border-bottom: 1px dotted #ccc;font-weight: bold;">DİJİTAL ERP</td>
            </tr>
            <tr>
                <td style="width: 30%; padding: 5px 0; font-weight: bold; color: #2c3e50;">MÜŞTERİ ADI</td>
                <td style="width: 70%; padding: 5px 0; border-bottom: 1px dotted #ccc;font-weight: bold;">~firmaAdi~</td>
            </tr>
            <tr>
                <td style="width: 30%; padding: 5px 0; font-weight: bold; color: #2c3e50;">TEKLİF SUNULAN</td>
                <td style="width: 70%; padding: 5px 0; border-bottom: 1px dotted #ccc;font-weight: bold;">Sn. ~firmaYetkili~</td>
            </tr>
            <tr>
                <td style="width: 30%; padding: 5px 0; font-weight: bold; color: #2c3e50;">TEKLİF HAZIRLAYAN</td>
                <td style="width: 70%; padding: 5px 0; border-bottom: 1px dotted #ccc;font-weight: bold;">~teklifOnay~</td>
            </tr>
            <tr>
                <td style="width: 30%; padding: 5px 0; font-weight: bold; color: #2c3e50;">GEÇERLİLİK SÜRESİ</td>
                <td style="width: 70%; padding: 5px 0; border-bottom: 1px dotted #ccc;font-weight: bold;">~teklifGecerlilikTarihi~</td>
            </tr>
            <tr>
                <td style="width: 30%; padding: 5px 0; font-weight: bold; color: #2c3e50;">OSTİM V.D.</td>
                <td style="width: 70%; padding: 5px 0; border-bottom: 1px dotted #ccc;font-weight: bold;">7330415259</td>
            </tr>
             <tr>
                <td style="width: 30%; padding: 5px 0; font-weight: bold; color: #2c3e50;">İLGİLİ</td>
                <td style="width: 70%; padding: 5px 0; border-bottom: 1px dotted #ccc;font-weight: bold;">~teklifOnay~</td>
            </tr>
             <tr>
                <td style="width: 30%; padding: 5px 0; font-weight: bold; color: #2c3e50;">TEL</td>
                <td style="width: 70%; padding: 5px 0; border-bottom: 1px dotted #ccc;font-weight: bold;">7330415259</td>
            </tr>
             <tr>
                <td style="width: 30%; padding: 5px 0; font-weight: bold; color: #2c3e50;">E-MAIL</td>
                <td style="width: 70%; padding: 5px 0; border-bottom: 1px dotted #ccc;font-weight: bold;">7330415259</td>
            </tr>
            
        </tbody>
    </table>

    <div style="clear: both;"></div>
    <div style="text-align: LEFT; margin-bottom: 30px; border-bottom: 3px solid #2c3e50; padding-bottom: 20px;">
        <h1 style="color: #2c3e50; font-size: 20px; margin: 5px 0;">Tarih: ~teklifTarihi~</h1>
        <h2 style="color: #34495e; font-size: 20px; margin: 5px 0;">Teklif No: ~teklifBelgeNo~</h2>
    </div>

    <div style="background: #ecf0f1; padding: 20px; margin: 20px 0; border-left: 5px solid #3498db;">
        <p style="text-align: center;margin: 8px 0; font-weight: 600; color: #2c3e50;"><strong>~firmaAdi~</strong></p>
        <p style="text-align: right;margin: 8px 0; font-weight: 600; color: #2c3e50;">Ankara, Türkiye</p>
        <p style="margin: 8px 0; font-weight: 600; color: #2c3e50;"><strong>Konu: DİJİTAL ERP SİSTEMİ KURULUMU</strong></p>
    </div>

    <div style="margin: 25px 0; line-height: 1.8;">
        <p style="margin: 12px 0; text-align: justify;"><strong>Sayın ~firmaYetkili~;</strong></p>
        <p style="margin: 12px 0; text-align: justify;">Firmamıza gösterdiğiniz ilgi için teşekkür ederiz.</p>
        <p style="margin: 12px 0; text-align: justify;">Talebinize yönelik çözümümüzü sağlayan ürünler ve hizmetler bazında fiyat teklifimizi ekte bilgi görüşlerinize sunmaktan memnuniyet duyuyoruz.</p>
        <p style="margin-top: 20px; margin-bottom: 12px; text-align: justify;"><strong>DİJİTAL ERP YAZILIM TEKNOLOJİLERİ SAN. VE TİC. A.Ş. adına,</strong></p>
    </div>

    <div style=" text-align:left;margin-top: 50px; ">
        <p style="margin: 5px 0; font-weight: 600;">Saygılarımızla</p>
        <p style="margin: 5px 0; font-weight: 600;"><strong>~teklifOnay~</strong></p>
        <p style="margin: 5px 0; font-weight: 600;">~teklifOnayGorev~</p>
    </div>

    <div style="background: #f8f9fa; padding: 20px; margin: 25px 0; border: 2px solid #3498db;">
        <h2 style="color: #2c3e50; margin-top: 0;">İÇİNDEKİLER</h2>
        <ol style="line-height: 2; margin: 15px 0; padding-left: 30px;">
            <li style="margin: 8px 0;">ÖZET
                <ul style="margin: 15px 0; padding-left: 30px;">
                    <li style="margin: 8px 0;">TEKLİFİN TEMELİ</li>
                </ul>
            </li>
            <li style="margin: 8px 0;">TEKLİF KAPSAMI VE PROJE ÇALIŞMA PROGRAMI</li>
            <li style="margin: 8px 0;">TEKNİK ÇÖZÜMÜN AÇIKLAMASI
                <ul style="margin: 15px 0; padding-left: 30px;">
                    <li style="margin: 8px 0;">Yazılım Lisansı</li>
                    <li style="margin: 8px 0;">Uyarlama ve Geliştirme Hizmeti</li>
                    <li style="margin: 8px 0;">Bakım Hizmeti</li>
                    <li style="margin: 8px 0;">Eğitim</li>
                </ul>
            </li>
            <li style="margin: 8px 0;">TİCARİ ŞARTLAR VE KOŞULLAR
                <ul style="margin: 15px 0; padding-left: 30px;">
                    <li style="margin: 8px 0;">Ödeme</li>
                    <li style="margin: 8px 0;">Teslim Süresi</li>
                    <li style="margin: 8px 0;">Vergiler</li>
                    <li style="margin: 8px 0;">Teklif Geçerliliği</li>
                    <li style="margin: 8px 0;">İlave Ürün/Hizmet</li>
                    <li style="margin: 8px 0;">İlave Yazılımlar</li>
                    <li style="margin: 8px 0;">İlave Eğitim ve Servis</li>
                    <li style="margin: 8px 0;">Genişleme İhtiyacı</li>
                    <li style="margin: 8px 0;">Diğer Koşullar</li>
                    <li style="margin: 8px 0;">Sipariş Verilmesi</li>
                </ul>
            </li>
        </ol>
    </div>

    <div style="height: 1px;"></div> <h1 style="color: white; font-size: 22px; margin: 30px 0 15px 0; padding: 10px; background: #3498db; border-radius: 4px;">1. ÖZET</h1>
    
    <div style="background: #fff3cd; border: 2px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
        <p style="margin: 12px 0; text-align: justify;"><strong>Aşağıda belirtilen rakamlar kapsamı 50 kullanıcı ve belirtilen tüm modülleri kapsamaktadır.</strong></p>
    </div>

    <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">TEKLİFİN TEMELİ</h2>
    
    <p style="margin: 12px 0; text-align: justify;">Proje ana hatlarıyla teklif edilen yazılımların kurulumu, proje ekibi eğitimlerinin verilmesi, standart entegrasyonların gerçekleştirilmesi ve varsa teklifte belirtilen özel ürün/hizmetlerin sağlanmasını kapsamaktadır.</p>
    
    <p style="margin: 12px 0; text-align: justify;">Bu teklif kapsamında gösterilmeyen ve proje akışı içinde normal kabul edilebilecek durumları dışındaki tüm modifikasyonlar / revizyonlar ve teklif kapsamında belirtilmeyen ürün ve hizmetler ek bir teklif ve termin süresine tabi olacaktır. Fiyatlandırma, teklif hazırlanması için verilen bilgi, görüşme ve dokümantasyonlar göz önüne alınarak hazırlanmıştır. Proje aşamasında müşteri tarafından yapılacak değişiklikler ve istekler daha sonra değerlendirilip tekliflendirilecektir.</p>

    <h1 style="color: white; font-size: 22px; margin: 30px 0 15px 0; padding: 10px; background: #3498db; border-radius: 4px;">2. TEKLİF KAPSAMI MODÜLLER</h1>

    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <thead>
            <tr>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50; width: 10%;">No</th>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50; width: 40%;">Modül Adı</th>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50; width: 10%;">No</th>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50; width: 40%;">Modül Adı</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"><strong>1</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">CRM</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"><strong>11</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">KONFİGURASYON</td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"><strong>2</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">PROJE YÖNETİMİ</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"><strong>12</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">KALİTE YÖNETİMİ</td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"><strong>3</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">SATINALMA YÖNETİMİ</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"><strong>13</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">AR-GE TASARIM</td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"><strong>4</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">DEPO STOK YÖNETİMİ</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"><strong>14</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">KULLANICI YÖNETİMİ</td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"><strong>5</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">ÜRETİM YÖNETİMİ</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"><strong>15</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">ATIK YÖNETİMİ</td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"><strong>6</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">SERVİS BAKIM YÖNETİMİ</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"><strong>16</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">İSG</td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"><strong>7</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">DOKÜMAN YÖNETİMİ</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"><strong>17</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">ANALİZ RAPOR</td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"><strong>8</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">İNSAN KAYNAKLARI</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;" colspan="2"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"><strong>9</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">İDARİ VE MALİ İŞLER</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;" colspan="2"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"><strong>10</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">ÖN MUHASEBE</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;" colspan="2"></td>
            </tr>
        </tbody>
    </table>

    <div style="background: #d1ecf1; border: 2px solid #0dcaf0; padding: 15px; margin: 20px 0; border-radius: 4px;">
        <p style="margin: 12px 0; text-align: justify;"><strong>DİJİTAL ERP</strong> Yazılımı sadece yazılım paketi değil aynı zamanda sektörel bazda bilgi birikimi ile birlikte hizmet sunmaktadır. Yerli ve milli olarak geliştirilen Dijital ERP bilgi güvenliğinizi ön planda tutarak lokal de sizin server'ınıza kapalı çevrim kurulum gerçekleştirmektedir. Opsiyon olarak bulut tabanlı veya VPN destekli alternatif çözümler sunmaktadır. SQL tabanlı teknolojisi ile hız ve data kısıtını ortadan kaldırmaktadır.</p>
        <p style="margin: 12px 0; text-align: justify;">Birçok çözüm ortaklarımızla birlikte uçtan uca tüm süreçlerinizi son teknoloji ile Dijital Platform olarak sunmaktayız.</p>
    </div>

    <div style="height: 1px;"></div> <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">SİSTEM ANALİZ YAKLAŞIMI</h2>
    
    <p style="margin: 12px 0; text-align: justify;">Bir projenin doğru ve başarılı olması için uygulamaya başlamadan önce çalışma planı ve mevcut sistem analizinin çıkartılması gerekmektedir. Bir proje ancak bundan sonra başarıya ulaşacaktır.</p>
    
    <p style="margin: 12px 0; text-align: justify;">Bu çalışma kapsamında DİJİTAL ERP fabrika bünyesinde tümüyle ve daha verimli bir şekilde kullanılmasını temin etmek üzere yapılması düşünülen uygulama çalışmasına temel teşkil etmek üzere gerçekleştirilmesi planlanır.</p>

    <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">IMPLEMENTASYON METODOLOJİSİ</h2>
    
    <p style="margin: 12px 0; text-align: justify;">DİJİTAL ERP Yazılım'ın projelerinin gerçekleştirilmesinde uygulanan uygulama stratejisi uzun yıllardır ülkemizin pek çok saygın işletmesinde, köklü bilgi teknolojisi uygulamalarının hayata geçirilmesini sağlamıştır. DİJİTAL ERP olarak yazılım projelerinin uygulanabilmesi için, yazılımın geliştirilmesi aktivitelerinin dışında önem arz eden pek çok diğer aktivitenin olduğunun bilincindeyiz. Aşağıda DİJİTAL ERP İmplementasyon Metodolojisi ana başlıkları ile irdelenecektir.</p>

    <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">PROJE ORGANİZASYONU</h2>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Proje Ekibinin Tespiti:</h3>
    
    <p style="margin: 12px 0; text-align: justify;">Proje Dijital ERP Yazılım ve <strong>Firma</strong> personelinden oluşan bir proje grubu tarafından gerçekleştirilir. Dijital ERP Yazılım Proje Ekibi, Proje Yöneticisi, Proje Uzmanı ve Proje Eğitmenlerinden oluşacaktır. <strong>Firmanız</strong> da buna paralel olarak projenin koordine bir şekilde idaresine katkıda bulunacak bir ekibi oluşturması gerekmektedir. Bu ekibin Proje Yöneticisi ve Departman Proje Sorumlularından oluşması gerekmektedir. Bu Koordinatör opsiyon olarak ERP Danışmanımız tarafından da yapılabilmektedir.</p>

    <h3 style="color: #2c3e50; margin-top: 25px;">MÜŞTERİ Proje Organizasyonu:</h3>
    
    <p style="margin: 12px 0; text-align: justify;">ERP Projeleri ancak bütün departmanların katılımıyla başarılı olarak tamamlanabilir. Firmanız Projesinde olması gereken organizasyon yapısını aşağıda sizin için belirledik.</p>

    <div style="background: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin: 15px 0;">
        <h3 style="color: #2980b9; margin-top: 0;">Proje Genel Koordinatörü</h3>
        <p style="margin: 12px 0; text-align: justify;">Firma içindeki organizasyonlar arası ihtilaf ve geç alınan kararlar konusunda destek olur.</p>
    </div>

    <div style="background: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin: 15px 0;">
        <h3 style="color: #2980b9; margin-top: 0;">Dijital ERP Proje Takımı</h3>
        <p style="margin: 12px 0; text-align: justify;">Bu Projede Bir Proje Yöneticisi ve uygulamanın tamamına hakim bir personel Eğitim ve Destek Uzmanı bulunacaktır.</p>
        <p style="margin: 12px 0; text-align: justify;">Dijital ERP ekibi Uygulama geliştirme -- Karar alma -- Yazılım ve iş akışları konusunda tecrübeli ekiplerden oluşur.</p>
        <p style="margin: 12px 0; text-align: justify;">İhtiyaç anında uygulama üzerindeki her türlü geliştirmeyi anlık olarak yaparlar.</p>
        <p style="margin: 12px 0; text-align: justify;">Proje Yöneticisi projeyi sürekli izleyerek yapılma taahhüdü verilen işlerin zamanlamasını ve oluşan aksamaları önler.</p>
    </div>

    <div style="background: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin: 15px 0;">
        <h3 style="color: #2980b9; margin-top: 0;">Firma ERP Proje Sorumlusu</h3>
        <p style="margin: 12px 0; text-align: justify;">Projenin her aşamasından sorumluluk alabilecek ve her türlü data toplama -- Uygulama geliştirme konularında katkı sağlayacak -- iş akışlarının belirlenmesinde karar alabilecek düzeyde yetkili olmalı.</p>
    </div>

    <div style="background: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin: 15px 0;">
        <h3 style="color: #2980b9; margin-top: 0;">Finansman ve Muhasebe Proje Sorumlusu</h3>
        <p style="margin: 12px 0; text-align: justify;">Finansman ve Muhasebe operasyonları konusunda bilgili bu konularda çıkacak her türlü problemde anında karar alma yetkisine sahip olmalı</p>
    </div>

    <div style="background: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin: 15px 0;">
        <h3 style="color: #2980b9; margin-top: 0;">Satış Departmanı Proje Sorumlusu</h3>
        <p style="margin: 12px 0; text-align: justify;">Satış organizasyonun geliştirilmesi konusunda karar alabilecek bu birimlerden beklenen dataların toplanmasına katkı sağlayabilecek yetkiye sahip olmalı</p>
    </div>

    <div style="background: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin: 15px 0;">
        <h3 style="color: #2980b9; margin-top: 0;">Satınalma Departmanı Proje Sorumlusu</h3>
        <p style="margin: 12px 0; text-align: justify;">Satınalma Uygulamalarında ve Satınalma organizasyonun geliştirilmesi konusunda karar alabilecek bu birimlerden beklenen dataların toplanmasına katkı sağlayabilecek yetkiye sahip olmalı</p>
    </div>

    <div style="background: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin: 15px 0;">
        <h3 style="color: #2980b9; margin-top: 0;">Üretim Planlama Proje Sorumlusu</h3>
        <p style="margin: 12px 0; text-align: justify;">Alınan siparişlerin Üretime gönderilmesi -- iş emirsiz malzeme üretilmemesi ve bütün departmanların malzeme ihtiyaçlarının belirlenmesi -- tedarik süreleri ve emniyet stokları gibi çalışmaları canlı tutacak yetkiye sahip olmalı</p>
    </div>

    <div style="background: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin: 15px 0;">
        <h3 style="color: #2980b9; margin-top: 0;">Lojistik Yöneticisi Proje Sorumlusu</h3>
        <p style="margin: 12px 0; text-align: justify;"><strong>Firmanız</strong> bünyesinde yer alan depoların planlanması ve raflanması--depolardaki kullanıcı yetkilerinin belirlenmesi konularında karar alabilecek- emniyet stokları ve ABC stok öncelikleri gibi çalışmalarda bulunabilecek stokların detaylandırılmasında destek sağlayacak yetkide olmalı</p>
    </div>

    <div style="height: 1px;"></div> <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">Mevcut Sistemin Analizi</h2>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Şirket Ana Fonksiyonlarının Belirlenmesi:</h3>
    <p style="margin: 12px 0; text-align: justify;">Oluşturulan Proje Ekibi, şirketin aktiviteleri kapsamında olan ana fonksiyonları belirleyecektir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Mevcut İş Akışlarının Çıkarılması:</h3>
    <p style="margin: 12px 0; text-align: justify;">Belirlenen tüm ana fonksiyonlar doğrultusunda mevcut sistemin iş akışı incelenecektir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Mevcut Yapıdaki Problemlerin Belirlenmesi:</h3>
    <p style="margin: 12px 0; text-align: justify;">Ana fonksiyonlar ve iş akışı bazında mevcut sistemin problemleri belirlenip dokümante edilmesi.</p>

    <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">Şirket İhtiyaçlarının Belirlenmesi</h2>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Fonksiyon Bazında İhtiyaçların Belirlenmesi:</h3>
    <p style="margin: 12px 0; text-align: justify;">Mevcut sistemin işleyişindeki problemler göz önüne alınarak, kurulması istenilen sistemin ihtiyaçları belirlenir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Raporlama İhtiyaçlarının Belirlenmesi:</h3>
    <p style="margin: 12px 0; text-align: justify;">Belirlenen sistem fonksiyonları ve ihtiyaçlar doğrultusunda operasyonel ve yönetim raporları tespit edilecektir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">İş Akışlarının Düzenlenmesi:</h3>
    <p style="margin: 12px 0; text-align: justify;">Kurulacak sistemin işleyişine mani olan iş akışları belirlenir ve gerek görülürse denetim komitesinin onayına sunularak değişimi sağlanır.</p>

    <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">Hazırlık</h2>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Paket Parametrelerinin Oluşturulması:</h3>
    <p style="margin: 12px 0; text-align: justify;">İhtiyaç analizinde ortaya çıkan sonuçlar ışığında standartlar, program parametreleri, ön değerler, evrak kodları, kullanıcı bazında haklar, menü tasarımları tespit edilip uyarlanarak dokümanter edilir ve uygulama üzerinde düzenlenir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Programın Sisteme Yüklenmesi:</h3>
    <p style="margin: 12px 0; text-align: justify;">Programların sisteme yüklenmesi DİJİTAL ERP tarafından yapılır. Bu çalışma sonunda paketin sistem üzerinde organizasyonu dokümante edilir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Raporların Hazırlanması:</h3>
    <p style="margin: 12px 0; text-align: justify;">Tespit edilmiş raporlar sistemde dizayn edilerek teslim edilir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Kullanıcı Eğitimleri:</h3>
    <p style="margin: 12px 0; text-align: justify;">Programın uygulamaya geçmesinden önce son aşama olarak, kullanıcılar programın genel özellikleri ile detayda her kullanıcının kendi işiyle ilgili çalışma şekli uygulamalı olarak tanıtılacaktır. Bu süreçte kullanıcılarla tek tek çalışılabileceği gibi aynı işi yapan personel, gruplar halinde de eğitilebilir.</p>

    <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">Uygulama</h2>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Sistem Değişimi Planının Hazırlanması:</h3>
    <p style="margin: 12px 0; text-align: justify;">Mevcut sistemden yeni sisteme geçebilmek için atılması gereken adımlar ve süreleri belirlenecektir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Uygulamanın Başlatılması:</h3>
    <p style="margin: 12px 0; text-align: justify;">Yapılan plan doğrultusunda tüm operasyonlar yeni sisteme aktarılıp, sistemin çalışırlığı temin edilecektir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Sistem Testi:</h3>
    <p style="margin: 12px 0; text-align: justify;">Yeni kurulan sistem test edilerek kullanıma hazır hale getirilir.</p>

    <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">Teknik Mimari (Parça 3'te Tekrar Ediyor)</h2>
    
    <p style="margin: 12px 0; text-align: justify;">DİJİTAL ERP uygulama ortamı içinde kendi uygulama geliştirme ve yorumlama ortamlarını içeren üç katmanlı (islemci, sunucu, veritabanı) ve platform ve veritabanı bağımsız bir uygulama ortamıdır. Geliştirme ve yorumlama ortamları tamamen pl/sql -xml kullanılarak geliştirilmiştir. Bu sebeple pek çok donanım ve işletim sistemi ile sorunsuz olarak çalışabilmektedirler.</p>
    
    <p style="margin: 12px 0; text-align: justify;">Veri tabanı olarak SQL kullanılmıştır. İşletim sistemleri üzerinde sorunsuz çalışır.</p>
    
    <p style="margin: 12px 0; text-align: justify;">DİJİTAL ERP yazılımı, sisteme aynı anda bağlanacak kullanıcı sayısı baz alınarak lisanslandırılmaktadır.</p>
    
    <p style="margin: 12px 0; text-align: justify;">DİJİTAL ERP uygulama sunucusu uygulaması Windows (Windows 7 / 8 /10 Server) ve Linux işletim sistemleri üzerinde çalışmaktadır. Eğer uygulama sunucusu ve veritabanı sunucusu olarak aynı sunucu donanımı kullanılacaksa, sunucu işletim sistemi veritabanı sunucusu uygulamasına bağlı olarak seçilmelidir.</p>
    
    <p style="margin: 12px 0; text-align: justify;">DİJİTAL ERP Kullanıcı makinasında, internet explorer 7 ve üzeri kurulumu olmalıdır. Pdf raporlama yapıldığı için Acrobat Reader kurulmalıdır. Veritabanı sunucusu istemci erişim araçlarının kurulmasına gerek yoktur. Browser ve Acrobat reader dışında ( her ikisi de lisans gerektirmeyen uygulamalardır) İstemci tarafında disk alanına ihtiyaç duyulmamaktadır.</p>

    <div style="height: 1px;"></div> <h1 style="color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; margin-top: 30px; font-size: 24px;">Teknik Mimari</h1>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    DİJİTAL ERP uygulama ortamı içinde kendi uygulama geliştirme ve yorumlama ortamlarını içeren üç katmanlı (işlemci, sunucu, veritabanı) ve platform ve veritabanı bağımsız bir uygulama ortamıdır. Geliştirme ve yorumlama ortamları tamamen pl/sql -xml kullanılarak geliştirilmiştir. Bu sebeple pek çok donanım ve işletim sistemi ile sorunsuz olarak çalışabilmektedirler.
    </blockquote>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    Veri tabanı olarak SQL kullanılmıştır. İşletim sistemleri üzerinde sorunsuz çalışır.
    </blockquote>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    DİJİTAL ERP yazılımı, sisteme aynı anda bağlanacak kullanıcı sayısı baz alınarak lisanslandırılmaktadır.
    </blockquote>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    DİJİTAL ERP uygulama sunucusu uygulaması Windows (Windows 7 / 8 /10 Server) ve Linux işletim sistemleri üzerinde çalışmaktadır. Eğer uygulama sunucusu ve veritabanı sunucusu olarak aynı sunucu donanımı kullanılacaksa, sunucu işletim sistemi veritabanı sunucusu uygulamasına bağlı olarak seçilmelidir.
    </blockquote>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    DİJİTAL ERP Kullanıcı makinasında, internet explorer 7 ve üzeri kurulumu olmalıdır. Pdf raporlama yapıldığı için Acrobat Reader kurulmalıdır. Veritabanı sunucusu istemci erişim araçlarının kurulmasına gerek yoktur. Browser ve Acrobat reader dışında (her ikisi de lisans gerektirmeyen uygulamalardır) İstemci tarafında disk alanına ihtiyaç duyulmamaktadır.
    </blockquote>

    <div style="height: 2px; background: #667eea; margin: 30px 0;"></div>

    <h1 style="color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; margin-top: 30px; font-size: 24px;">Proje Uygulama Planı</h1>
    <p style="font-style: italic; color: #666; margin: 12px 0; text-align: justify;">(Proje Başlangıcında Doldurulacaktır)</p>

    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <thead>
            <tr>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">Sıra</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">Açıklama</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">01</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">02</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">03</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">04</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">05</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">06</th>
            </tr>
        </thead>
        <tbody>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;">1</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"><strong>Sistem Analizi Çalışması</strong><br>Proje kapsamında belirlenen departmanların detaylı iş süreçleri analiz edilecektir.</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">1.1</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Satış Departmanı Sistem Analizi</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">1.2</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Satınalma Departmanı Sistem Analizi</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">1.3</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Lojistik Sistem Analizi</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">1.4</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Finansman Sistem Analizi</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">1.5</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Muhasebe Sistem Analizi</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">1.6</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Bakım Yönetimi Sistem Analizi</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">1.7</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Proje Yönetimi Sistem Analizi</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;">2</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"><strong>Data Hazırlıkları</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">2.1</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Var Olan Dataların Düzenlenmesi ve Test olarak Aktarılması (Müşteriler - Adresler - Depolar - Satıcılar - Hesap Planları - Stok ve Hizmet kartları)</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">2.2</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Satış Datalarının Geçiş Öncesi Aktarma Programlarının Yazılması</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">2.3</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Finansman ve Muhasebe Datalarının Geçiş Öncesi Aktarma Programlarının Yazılması</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">2.4</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Bakım Yönetimi Datalarının Aktarılma Çalışmasını Yapılması</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;">3</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"><strong>1.Faz Eğitimlere Başlanması</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">3.1</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Malzeme Yönetimi Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">3.2</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Satış Yönetimi Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">3.3</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Satınalma Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">3.4</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">İthalat Birimi Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">3.5</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Satınalma Departmanı Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">3.6</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Finansman Departmanı Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">3.7</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Muhasebe Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">3.8</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Entegrasyon Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">3.9</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Bakım Yönetimi Kullanıcı Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">3.10</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Şantiye-Proje Yönetimi Kullanıcı Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;">4</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"><strong>2.Faz Eğitimlere Başlanması ve Yapılan Modifikasyonların Uygunluk Tespitlerinin yapılması</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">4.1</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Malzeme Yönetimi Eğitimleri ve Sevkiyat Simülasyonları</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">4.2</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Satış Yönetimi Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">4.3</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Satınalma Eğitimleri ve Satınalma İhtiyaçlarının Birimlerden Toplanması</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">4.4</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">İthalat Birimi Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">4.5</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Satınalma Departmanı Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">4.6</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Finansman Departmanı Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">4.7</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Muhasebe Eğitimleri Geliştirme Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">4.8</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Entegrasyon Eğitimleri Geliştirme Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">4.9</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Bakım Yönetimi Geliştirme Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;">5</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"><strong>Paralel Test Kullanımı</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
            </tr>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;">6</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"><strong>Day 1. (Projenin Gerçek Kullanıma Alınması)</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
            </tr>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;">7</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"><strong>Maliyet Çalışmalarının Başlatılması ve Tamamlanması</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
            </tr>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;">8</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"><strong>Yönetim Raporlama Sistemlerinin Tamamlanması</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
            </tr>
        </tbody>
    </table>

    <div style="height: 2px; background: #667eea; margin: 30px 0;"></div>

    <h2 style="color: #34495e; margin-top: 25px; font-size: 20px; border-left: 4px solid #3498db; padding-left: 10px;">Geliştirme</h2>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    Ortaya çıkacak olan özel uygulamalar, ek tablo vb. İstekler için önceden detaylı bir konsept hazırlanır. Bu konseptin hayata geçirilmesi için DİJİTAL ERP tarafından öngörülen geliştirme adam/gün sayısı olarak belirlenir ve proje yönetimine sunulur. Proje yönetimi tarafından onay alındıktan sonra konsept öngörülen zamanda ve şartlarda DİJİTAL ERP tarafından hayata geçirilir.
    </blockquote>

    <div style="height: 2px; background: #667eea; margin: 30px 0;"></div>

    <h1 style="color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; margin-top: 30px; font-size: 24px;">TEKNİK ÇÖZÜMÜN AÇIKLAMASI</h1>

    <h2 style="color: #34495e; margin-top: 25px; font-size: 20px; border-left: 4px solid #3498db; padding-left: 10px;">3.1. YAZILIM LİSANSI</h2>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    Aşağıda verilen rakamların kapsamı yukarıda belirlenen modüller ve <span style="background-color: #fff3cd; padding: 2px 6px; border-radius: 3px;">50 kullanıcı</span> baz alınarak hazırlanmış olup, proje içerisinde gerçekleşecek analizlerde ortaya çıkacak ihtiyaç ve beklentilere göre ve/veya müşteri ilaveleri ve revizyonlarına göre değişiklik gösterebilir. Toplam lisans bedeline dahil olanlar; Seçilen modüllerin kurulumu, Seçilen modüllere karşılık gelen adam/gün proje grubu eğitimleri, ve seçilen ürünün yukarıda belirtildiği gibi kullanıcı lisansı.
    </blockquote>

    <h2 style="color: #34495e; margin-top: 25px; font-size: 20px; border-left: 4px solid #3498db; padding-left: 10px;">3.2. UYARLAMA VE GELİŞTİRME HİZMETİ</h2>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    Proje uyarlama süremiz intranet sistemli çalışacak modüller için; <span style="background-color: #fff3cd; padding: 2px 6px; border-radius: 3px;">6 ay</span> olup, bu süre ilaveler ve uyarlama istekleri olması durumunda değişiklik gösterebilir.
    </blockquote>

    <h2 style="color: #34495e; margin-top: 25px; font-size: 20px; border-left: 4px solid #3498db; padding-left: 10px;">3.3. BAKIM</h2>

    <ul style="margin: 15px 0; padding-left: 30px;">
        <li style="margin: 8px 0;">Uygulama, firmanızın sunucusuna kurulumundan itibaren 1 yıl süre ile garanti kapsamında olacaktır. Bu dönem içerisinde uygulamadan kaynaklanan program hatalarının giderilmesi, telefon desteği ve uygulamanın yeni sürümleri için ayrıca bir bedel talep edilmeyecektir. Uygulamanın sunuculara kurulumu, Dijital ERP'den kaynaklanmayan nedenlerle, anlaşmanın imzalanmasından sonraki 3 ay içerisinde yapılmadığı takdirde garanti süresi anlaşma tarihinden sonraki 3. Ayın sonunda başlayacaktır.</li>
        
        <li style="margin: 8px 0;">Garanti süresi bitiminde yıllık bakım yapılması gerekmektedir. Uygulamanın sürekli fonksiyonel iyileştirilmesi ve yazılım teknolojisindeki gelişmelerin uygulamaya yansıtılması ile yazılımın güncel tutulması, ayrıca uygulamada çıkabilecek problemlerin giderilmesi, sınırsız sayıda bildirim girilmesi ve telefon desteği bu anlaşma kapsamında yapılacaktır.</li>
        
        <li style="margin: 8px 0;">Dijital ERP Yazılımı <span style="background-color: #fff3cd; padding: 2px 6px; border-radius: 3px;">Bakım Bedeli Yıllık</span> bazda ücret belirlenmiştir. Yazılım lisans bedelinin <span style="background-color: #fff3cd; padding: 2px 6px; border-radius: 3px;">%15</span> olarak belirlenmiştir. TÜİK tarafından açıklanan TÜİK 2003=100 Tüketici ve Üretici fiyatları genel endeksi 'on iki aylık ortalamalara göre değişim % oranı' tablolarından (TÜFE+ÜFE)/2 ortalaması oranları esas alınarak arttırılacaktır.</li>
        
        <li style="margin: 8px 0;">Bakım Lisans bedelinin %15 olarak her yıl sözleşme tarihinde satın alım tarihinde peşin ödeme olarak talep edilecektir.</li>
    </ul>

    <h2 style="color: #34495e; margin-top: 25px; font-size: 20px; border-left: 4px solid #3498db; padding-left: 10px;">3.4. EĞİTİM</h2>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    Proje süresi boyunca müşteri ile birlikte veya bağımsız çalışmaları, eğitimleri ekran karşısında pratiğe dönüştüreceklerdir.
    </blockquote>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    Bu proje kapsamında eğitim, <span style="background-color: #fff3cd; padding: 2px 6px; border-radius: 3px;">50 kişi / 10 gün</span> verilecektir. Proje tesliminden sonra ilave eğitim taleplerinde adam/gün bazında ayrıca ücretlendirilecektir.
    </blockquote>

    <div style="height: 2px; background: #667eea; margin: 30px 0;"></div>

    <h1 style="color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; margin-top: 30px; font-size: 24px;">FİYATLAR</h1>

    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <thead>
            <tr>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">Açıklama</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">Miktar</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">Birim</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">Para Birimi</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">Birim Fiyat (USD)</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">Toplam Fiyat (USD)</th>
            </tr>
        </thead>
        <tbody>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;" colspan="6"><strong>LİSANS</strong></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Dijital ERP Yazılım Lisansı</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~miktar~</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"~birimi~<</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~paraBirimi~</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~birimFiyat~</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~toplamFiyat~</td>
            </tr>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;" colspan="6"><strong>HİZMETLER</strong></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Uyarlama ve Geliştirme Hizmetleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~miktar~</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"~birimi~<</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~paraBirimi~</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~birimFiyat~</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~toplamFiyat~</td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Uzaktan Destek, Yerinde Destek</td>
            m   <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~miktar~</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"~birimi~<</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~paraBirimi~</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~birimFiyat~</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~toplamFiyat~</td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Eğitim</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~miktar~</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"~birimi~<</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~paraBirimi~</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~birimFiyat~</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~toplamFiyat~</td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">ERP DANIŞMANLIK HİZMETİ - OPSİYON</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~miktar~</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"~birimi~<</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~paraBirimi~</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~birimFiyat~</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~toplamFiyat~</td>
            </tr>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;" colspan="6"><strong>MODÜLLER</strong></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">ENTERPRISE PAKET + OPSİYONLARI<br>17 MODÜL İÇERİĞİ DAHİLDİR.</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~miktar~</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"~birimi~<</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~paraBirimi~</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~birimFiyat~</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~toplamFiyat~</td>
            </tr>
            <tr style="background-color: #fff3cd !important; font-weight: bold; font-size: 1.1em;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff3cd; font-weight: bold; font-size: 1.1em;" colspan="5"><strong>TOPLAM LİSANS + HİZMET BEDELİ (USD):</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff3cd; font-weight: bold; font-size: 1.1em;"><strong>10,000$</strong></td>
            </tr>
            <tr style="background-color: #fff3cd !important; font-weight: bold; font-size: 1.1em;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff3cd; font-weight: bold; font-size: 1.1em;" colspan="5"><strong>İSKONTO (%40) (Firmanıza özel)</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff3cd; font-weight: bold; font-size: 1.1em;"><strong>30,000$</strong></td>
            </tr>
            <tr style="background-color: #d4edda !important; font-weight: bold; font-size: 1.1em;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #d4edda; font-weight: bold; font-size: 1.1em;" colspan="5"><strong>GENEL TOPLAM (Yalnız Ellibirbindokuzyüz USD'dir)</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #d4edda; font-weight: bold; font-size: 1.1em;"><strong>40,000$</strong></td>
            </tr>
        </tbody>
    </table>

    <h2 style="color: #34495e; margin-top: 25px; font-size: 20px; border-left: 4px solid #3498db; padding-left: 10px;">OPSİYONLAR</h2>

    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <thead>
            <tr>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50;">Açıklama</th>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50;">Miktar</th>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50;">Birim</th>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50;">Para Birimi</th>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50;">Birim Fiyat (USD)</th>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50;">Toplam Fiyat (USD)</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Bakım Destek</td>
             <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~miktar~</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"~birimi~<</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~paraBirimi~</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~birimFiyat~</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~toplamFiyat~</td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">EK HİZMET (Servis, Destek, Eğitim..vb.)</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~miktar~</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"~birimi~<</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~paraBirimi~</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~birimFiyat~</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">~toplamFiyat~</td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">İlave Modül (OPSİYON)<br>İsteğe bağlı ayrıca tekliflendirilecektir.</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;" colspan="5"></td>
            </tr>

        </tbody>
    </table>

    <div style="height: 1px;"></div> <div style="background-color: white; padding: 40px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <h1 style="color: #1e3a8a; font-size: 20px; font-weight: bold; margin-top: 30px; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 3px solid #3b82f6;">OPSİYON İLAVE LİSANS ÜCRETLERİ</h1>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <thead>
                <tr>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Açıklama</th>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Miktar</th>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Birim</th>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Para Birimi</th>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Birim Fiyat</th>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Toplam Fiyat (US$)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">İlave 1 Kullanıcı Lisans Bedeli</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">~miktar~</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">~birimi~</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">~paraBirimi~</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">~birimFiyat~</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">~toplamFiyat~</td>
                </tr>
                <tr style="background: #f8f9fa;">
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">İlave 5 Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">5</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">USD</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">50$</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">250$</td>
                </tr>
                <tr>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">İlave 25 Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">25</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">USD</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">50$</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">1,250$</td>
                </tr>
                <tr style="background: #f8f9fa;">
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">İlave 50 Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">50</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">USD</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">25$</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">1,250$</td>
                </tr>
                <tr>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">İlave 100 Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">100</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">USD</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">4.00$</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">400$</td>
                </tr>
            </tbody>
        </table>

        <div style="margin: 40px 0; border-top: 2px solid #e2e8f0;"></div>

        <h1 style="color: #1e3a8a; font-size: 20px; font-weight: bold; margin-top: 30px; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 3px solid #3b82f6;">E-DÖNÜŞÜM-OPSİYON</h1>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <thead>
                <tr>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Açıklama</th>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Miktar</th>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Birim</th>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Para Birimi</th>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Birim Fiyat</th>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Toplam Fiyat TL</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">KONTOR</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">1</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">ADET</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">TL</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">4 TL</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">4 TL</td>
                </tr>
                <tr style="background: #f8f9fa;">
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">E-FATURA</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;" colspan="5"></td>
                </tr>
                <tr>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">E-ARŞİV</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;" colspan="5"></td>
                </tr>
                <tr style="background: #f8f9fa;">
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">E-İHRACAT</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;" colspan="5"></td>
                </tr>
            </tbody>
        </table>

        <div style="margin: 40px 0; border-top: 2px solid #e2e8f0;"></div>

        <h1 style="color: #1e3a8a; font-size: 20px; font-weight: bold; margin-top: 30px; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 3px solid #3b82f6;">TİCARİ ŞARTLAR VE KOŞULLAR</h1>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">ÖDEME</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            <p style="margin: 12px 0; text-align: justify;">Ödeme şartları aşağıdaki tabloda belirtilmiştir.</p>
            <p style="margin: 12px 0; text-align: justify;">Kullanım lisans bedelleri, sözleşme imzalanmasını takiben, lisans tutarında fatura edilecektir.</p>
            <p style="margin: 12px 0; text-align: justify;">Hizmet bedellerine ait faturalar, hizmet sözleşmesi imzalandığı andan itibaren aylık veya haftalık baz da fatura edilecektir.</p>
            <p style="margin: 12px 0; text-align: justify;">Yabancı para birimi cinsinden kesilen fatura bedelleri, o günün T.C. Merkez Bankası döviz satış kuru ile Türk Lirası'na çevrilip KDV ilave edilerek faturaya dönüştürülecektir.</p>
            <p style="margin: 12px 0; text-align: justify;">Ödemeler fatura tarihini izleyen aşağıdaki tabloya istinaden yapılacak olup, bu süreler içinde yapılmayan ödemeler için fatura tarihinden itibaren TL değerler için aylık %2, yabancı para cinsi için %1 vade farkı ve KDV ilavesi ile fatura edilecektir.</p>
            <p style="margin: 12px 0; text-align: justify;">Yıllık bakım destek hizmetleri ise bakım dönemi başında fatura edilir ve tüm faturaların ödeme vadesi 10 (on) iş günüdür.</p>
        </blockquote>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <thead>
                <tr>
                    <th style="background-color: #059669; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #047857; font-size: 13px;">No</th>
                    <th style="background-color: #059669; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #047857; font-size: 13px;">TL</th>
                    <th style="background-color: #059669; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #047857; font-size: 13px;">Açıklama</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">1</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">%25</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">Siparişle birlikte peşin</td>
                </tr>
                <tr style="background: #f8f9fa;">
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">2</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">%50</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">Kurulum aşamasında</td>
                </tr>
                <tr>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">3</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">%15</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">Uyarlama Geliştirme</td>
                </tr>
                <tr style="background: #f8f9fa;">
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">4</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">%10</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">Teslimatta</td>
                </tr>
            </tbody>
        </table>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">TESLİM SÜRESİ</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            Teklifimizde belirlenen kapsamlar dahilinde <strong>180 gün</strong> içerisinde canlı teslimi yapılması planlanmıştır. Uyarlama süreçleri 1 yıl süreyle devam edecektir.
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">VERGİLER</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            Fiyatlarımıza KDV, diğer vergi, resim ve harçlar dahil değildir.
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">TEKLİF GEÇERLİLİĞİ</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            <strong>30 gün</strong>
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">İLAVE ÜRÜN/HİZMET / MODÜL</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            Proje sırasında ortaya çıkacak olan özel uygulamalar, ek tablo, ve ekran istekleri bu teklif kapsamında değildir. Proje sırasında ortaya çıkan yazılım geliştirme ihtiyaçlarına göre detaylı çalışma yapılır. Ayrıca tekliflendirilir.
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">İLAVE YAZILIMLAR</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            Dijital ERP_V1 sisteminin çalışabilmesi için gereken işletim sistemi ve database gibi üçüncü parti yazılımlar teklif kapsamında değildir.
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">İLAVE EĞİTİM VE SERVİS</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            İlave eğitim, program yazılımı, veri aktarımı ve entegrasyon işlemleri için adam-gün ücretimiz <strong>300 USD+KDV</strong> olup, yol, konaklama (Ankara dışı olması halinde) ve yemek bedellerini kapsamaktadır.
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">GENİŞLEME İHTİYACI</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            İleride ihtiyaç olması durumunda kapasite artışı halinde talep edilen ilave kullanıcılar için teklifte belirtilen birim kullanıcı fiyatı üzerinden hesaplanıp fatura edilecektir.
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">DİĞER KOŞULLAR</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            Proje için, firmanızın kullanıcılarından bir proje grubu oluşturulup, eğitimler bu proje grubuna verilecektir. Proje grubu çalışmalar için gereken zamanı ayıracaktır.
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">DANIŞMANLIK-DESTEK HİZMETİ</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            Sistem devreye alındıktan sonra ihtiyaç duyulması halinde garanti süresi sonrasında, yüz yüze veya uzaktan çağrı sistemi ile <strong>300 USD adam/gün</strong> olarak ücretlendirilecektir.
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">SİPARİŞ VERİLMESİ</h2>
        <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin-top: 20px;">
            <p style="margin: 8px 0; color: #065f46; font-weight: 500; text-align: justify;">Sipariş için lütfen aşağıdaki kişi ile iletişime geçiniz.</p>
            <p style="margin: 8px 0; color: #065f46; font-weight: 500; text-align: justify;"><strong>SUZAN ERDAL EKİNCİ</strong></p>
            <p style="margin: 8px 0; color: #065f46; font-weight: 500; text-align: justify;">Tel: +90 533 5011270</p>
            <p style="margin: 8px 0; color: #065f46; font-weight: 500; text-align: justify;">Email: suzan.erdal@dijitalerpyazilim.com</p>
        </div>
    </div>

</body>
</html>`
export const dijitalerp_price_offer_template3 = `
 <div style="width:100%;height:1100px;background:#ffffff;position:relative;overflow:hidden;font-family:Arial, sans-serif;">
        <div style=" position:absolute;left:0; top:0; width:18px; height:100%; background:#1f4e79;"></div>
        <div style="position:absolute;top:40px;left:18px;height:56px;background:#4f81bd;color:#ffffff;font-size:22px;font-weight:bold;line-height:56px;
    padding-left:30px;
    padding-right:50px;
    ">
            TEKLİF MEKTUBU
            <div style="position:absolute; right:-30px; top:0;width:0; height:0;
        border-top:28px solid transparent;
        border-bottom:28px solid transparent;
        border-left:30px solid #4f81bd;
        "></div>
        </div>
        <div style="
    position:absolute;
    top:30px;
    right:30px;
    text-align:right;
    ">
            <img src="~BASE_URL~logo.png" alt="Firma Logo" style="
            max-width:140px;
            max-height:70px;
            display:block;
            ">
        </div>

        <div style="
    position:absolute;
    top:240px;
    left:60px;
    right:60px;
    font-size:14px;
    line-height:1.6;
    color:#000000;
    ">
     <div style="text-align: center;">
        <p style="font-size: 25px; font-weight: bold; color: #34495e; margin-bottom: 30px;">DİJİTAL ERP YAZILIM TEKNOLOJİLERİ A.Ş.</p>
    </div>

    <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px; font-size: 20px;">
        <tbody style="vertical-align: top;">
            <tr>
                <td style="width: 30%; padding: 3px 0; font-weight: bold; color: #2c3e50;">TEKLİF NO</td>
                <td style="width: 70%; padding: 3px 0; border-bottom: 1px dotted #ccc;font-weight: bold;">~teklifBelgeNo~</td>
            </tr>
            <tr>
                <td style="width: 30%; padding: 3px 0; font-weight: bold; color: #2c3e50;">PROJE ADI</td>
                <td style="width: 70%; padding: 3px 0; border-bottom: 1px dotted #ccc;font-weight: bold;">DİJİTAL ERP</td>
            </tr>
            <tr>
                <td style="width: 30%; padding: 3px 0; font-weight: bold; color: #2c3e50;">MÜŞTERİ ADI</td>
                <td style="width: 70%; padding: 3px 0; border-bottom: 1px dotted #ccc;font-weight: bold;">~firmaAdi~</td>
            </tr>
            <tr>
                <td style="width: 30%; padding: 3px 0; font-weight: bold; color: #2c3e50;">TEKLİF SUNULAN</td>
                <td style="width: 70%; padding: 3px 0; border-bottom: 1px dotted #ccc;font-weight: bold;">Sn. ~firmaYetkili~</td>
            </tr>
            <tr>
                <td style="width: 30%; padding: 3px 0; font-weight: bold; color: #2c3e50;">TEKLİF HAZIRLAYAN</td>
                <td style="width: 70%; padding: 3px 0; border-bottom: 1px dotted #ccc;font-weight: bold;">~teklifOnay~</td>
            </tr>
            <tr>
                <td style="width: 30%; padding: 3px 0; font-weight: bold; color: #2c3e50;">GEÇERLİLİK SÜRESİ</td>
                <td style="width: 70%; padding: 3px 0; border-bottom: 1px dotted #ccc;font-weight: bold;">~teklifGecerlilikTarihi~</td>
            </tr>
            <tr>
                <td style="width: 30%; padding: 3px 0; font-weight: bold; color: #2c3e50;">OSTİM V.D.</td>
                <td style="width: 70%; padding: 3px 0; border-bottom: 1px dotted #ccc;font-weight: bold;">7330415259</td>
            </tr>
             <tr>
                <td style="width: 30%; padding: 3px 0; font-weight: bold; color: #2c3e50;">İLGİLİ</td>
                <td style="width: 70%; padding: 3px 0; border-bottom: 1px dotted #ccc;font-weight: bold;">~teklifOnay~</td>
            </tr>
             <tr>
                <td style="width: 30%; padding: 3px 0; font-weight: bold; color: #2c3e50;">TEL</td>
                <td style="width: 70%; padding: 3px 0; border-bottom: 1px dotted #ccc;font-weight: bold;">~telefon~</td>
            </tr>
             <tr>
                <td style="width: 30%; padding: 3px 0; font-weight: bold; color: #2c3e50;">E-MAIL</td>
                <td style="width: 70%; padding: 3px 0; border-bottom: 1px dotted #ccc;font-weight: bold;">~ePosta~</td>
            </tr>
            
        </tbody>
    </table>
    </div>
</div>
    <div style="clear: both;"></div>
    <div style="text-align: LEFT; margin-bottom:10px; border-bottom: 3px solid #2c3e50; padding-bottom: 10px;">
        <h1 style="color: #2c3e50; font-size: 15px; margin: 2px 0;">Tarih: ~teklifTarihi~ </h1>
        <h2 style="color: #34495e; font-size: 15px; margin: 2px 0;">Teklif No: ~teklifBelgeNo~</h2>
    </div>

    <div style="background: #ecf0f1; padding: 5px; margin: 5px 0; ">
        <p style="text-align: center;margin: 8px 0; font-weight: 600; color: #2c3e50;"><strong>~firmaAdi~</strong></p>
        <p style="text-align: right;margin: 8px 0; font-weight: 600; color: #2c3e50;">Ankara, Türkiye</p>
        <p style="margin: 5px 0; font-weight: 400; color: #2c3e50;"><strong>Konu: DİJİTAL ERP SİSTEMİ KURULUMU</strong></p>
    </div>

    <div style="margin: 8px 0; line-height: 1.8; page-break-inside: avoid;">
        <p style="margin: 8px 0; text-align: justify;"><strong>Sayın ~firmaYetkili~;</strong></p>
        <p style="margin: 8px 0; text-align: justify;">Firmamıza gösterdiğiniz ilgi için teşekkür ederiz.</p>
        <p style="margin: 8px 0; text-align: justify;">Talebinize 
yönelik çözümümüzü sağlayan ürünler ve hizmetler bazında fiyat 
teklifimizi ekte bilgi görüşlerinize sunmaktan memnuniyet duyuyoruz.</p>
        <p style="margin-top: 12px; margin-bottom: 1px; text-align: justify;"><strong>~firmaAdi~ adına,</strong></p>
    </div>
    <img src="~BASE_URL~teklif_veren_imza.png" style="width: 200px;">
        <p style="margin: 0px 0; font-weight: 300;">Saygılarımızla<br>~teklifOnayGorev~</p>


<div style="background:#f8f9fa; padding:20px; margin:20px 0; border:2px solid #3498db;page-break-after: always;">
  <h2 style="color:#2c3e50; margin:0 0 10px 0;">İÇİNDEKİLER</h2>

  <ol style="margin:10px 0; padding-left:25px; line-height:1.4;">
    <li style="margin:6px 0;">
      ÖZET
      <ul style="margin:5px 0; padding-left:20px;">
        <li style="margin:4px 0;">TEKLİFİN TEMELİ</li>
      </ul>
    </li>

    <li style="margin:6px 0;">TEKLİF KAPSAMI VE PROJE ÇALIŞMA PROGRAMI</li>

    <li style="margin:6px 0;">
      TEKNİK ÇÖZÜMÜN AÇIKLAMASI
      <ul style="margin:5px 0; padding-left:20px;">
        <li style="margin:4px 0;">Yazılım Lisansı</li>
        <li style="margin:4px 0;">Uyarlama ve Geliştirme Hizmeti</li>
        <li style="margin:4px 0;">Bakım Hizmeti</li>
        <li style="margin:4px 0;">Eğitim</li>
      </ul>
    </li>

    <li style="margin:6px 0;">
      TİCARİ ŞARTLAR VE KOŞULLAR
      <ul style="margin:5px 0; padding-left:20px;">
        <li style="margin:4px 0;">Ödeme</li>
        <li style="margin:4px 0;">Teslim Süresi</li>
        <li style="margin:4px 0;">Vergiler</li>
        <li style="margin:4px 0;">Teklif Geçerliliği</li>
        <li style="margin:4px 0;">İlave Ürün/Hizmet</li>
        <li style="margin:4px 0;">İlave Yazılımlar</li>
        <li style="margin:4px 0;">İlave Eğitim ve Servis</li>
        <li style="margin:4px 0;">Genişleme İhtiyacı</li>
        <li style="margin:4px 0;">Diğer Koşullar</li>
        <li style="margin:4px 0;">Sipariş Verilmesi</li>
      </ul>
    </li>
  </ol>
</div>


    <div style="height: 1px;"></div> <h1 style="color: white; font-size: 22px; margin: 30px 0 15px 0; padding: 20px; background: #3498db; border-radius: 4px; margin-top: 15px;">1. ÖZET</h1>
    
    <div style="background: #fff3cd; border: 2px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 4px;">
        <p style="margin: 12px 0; text-align: justify;"><strong>Aşağıda belirtilen rakamlar kapsamı 50 kullanıcı ve belirtilen tüm modülleri kapsamaktadır.</strong></p>
    </div>

    <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">TEKLİFİN TEMELİ</h2>
    
    <p style="margin: 12px 0; text-align: justify;">Proje ana hatlarıyla
 teklif edilen yazılımların kurulumu, proje ekibi eğitimlerinin 
verilmesi, standart entegrasyonların gerçekleştirilmesi ve varsa 
teklifte belirtilen özel ürün/hizmetlerin sağlanmasını kapsamaktadır.</p>
    
    <p style="margin: 12px 0; text-align: justify;">Bu teklif kapsamında
 gösterilmeyen ve proje akışı içinde normal kabul edilebilecek durumları
 dışındaki tüm modifikasyonlar / revizyonlar ve teklif kapsamında 
belirtilmeyen ürün ve hizmetler ek bir teklif ve termin süresine tabi 
olacaktır. Fiyatlandırma, teklif hazırlanması için verilen bilgi, 
görüşme ve dokümantasyonlar göz önüne alınarak hazırlanmıştır. Proje 
aşamasında müşteri tarafından yapılacak değişiklikler ve istekler daha 
sonra değerlendirilip tekliflendirilecektir.</p>

    <h1 style="color: white; font-size: 22px; margin: 30px 0 15px 0; padding: 10px; background: #3498db; border-radius: 4px;">2. TEKLİF KAPSAMI MODÜLLER</h1>

    <table style="width: 100%; border-collapse: collapse; margin: 4px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <thead>
            <tr>
                <th style="background: #34495e; color: white; padding: 6px; text-align: left; font-weight: 300; border: 1px solid #2c3e50; width: 10%;">No</th>
                <th style="background: #34495e; color: white; padding: 6px; text-align: left; font-weight: 300; border: 1px solid #2c3e50; width: 40%;">Modül Adı</th>
                <th style="background: #34495e; color: white; padding: 6px; text-align: left; font-weight: 300; border: 1px solid #2c3e50; width: 10%;">No</th>
                <th style="background: #34495e; color: white; padding: 6px; text-align: left; font-weight: 300; border: 1px solid #2c3e50; width: 40%;">Modül Adı</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #fff;"><strong>1</strong></td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #fff;">CRM</td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #fff;"><strong>11</strong></td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #fff;">KONFİGURASYON</td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #f8f9fa;"><strong>2</strong></td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #f8f9fa;">PROJE YÖNETİMİ</td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #f8f9fa;"><strong>12</strong></td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #f8f9fa;">KALİTE YÖNETİMİ</td>
            </tr>
            <tr>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #fff;"><strong>3</strong></td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #fff;">SATINALMA YÖNETİMİ</td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #fff;"><strong>13</strong></td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #fff;">AR-GE TASARIM</td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #f8f9fa;"><strong>4</strong></td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #f8f9fa;">DEPO STOK YÖNETİMİ</td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #f8f9fa;"><strong>14</strong></td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #f8f9fa;">KULLANICI YÖNETİMİ</td>
            </tr>
            <tr>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #fff;"><strong>5</strong></td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #fff;">ÜRETİM YÖNETİMİ</td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #fff;"><strong>15</strong></td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #fff;">ATIK YÖNETİMİ</td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #f8f9fa;"><strong>6</strong></td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #f8f9fa;">SERVİS BAKIM YÖNETİMİ</td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #f8f9fa;"><strong>16</strong></td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #f8f9fa;">İSG</td>
            </tr>
            <tr>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #fff;"><strong>7</strong></td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #fff;">DOKÜMAN YÖNETİMİ</td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #fff;"><strong>17</strong></td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #fff;">ANALİZ RAPOR</td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #f8f9fa;"><strong>8</strong></td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #f8f9fa;">İNSAN KAYNAKLARI</td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #f8f9fa;" colspan="2"></td>
            </tr>
            <tr>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #fff;"><strong>9</strong></td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #fff;">İDARİ VE MALİ İŞLER</td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #fff;" colspan="2"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #f8f9fa;"><strong>10</strong></td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #f8f9fa;">ÖN MUHASEBE</td>
                <td style="padding: 5px 6px; border: 1px solid #bdc3c7; background: #f8f9fa;" colspan="2"></td>
            </tr>
        </tbody>
    </table>

    <div style="background: #d1ecf1; border: 2px solid #0dcaf0; padding: 15px; margin: 20px 0; border-radius: 4px;">
        <p style="margin: 12px 0; text-align: justify;"><strong>DİJİTAL ERP</strong>
 Yazılımı sadece yazılım paketi değil aynı zamanda sektörel bazda bilgi 
birikimi ile birlikte hizmet sunmaktadır. Yerli ve milli olarak 
geliştirilen Dijital ERP bilgi güvenliğinizi ön planda tutarak lokal de 
sizin server'ınıza kapalı çevrim kurulum gerçekleştirmektedir. Opsiyon 
olarak bulut tabanlı veya VPN destekli alternatif çözümler sunmaktadır. 
SQL tabanlı teknolojisi ile hız ve data kısıtını ortadan kaldırmaktadır. Birçok çözüm ortaklarımızla birlikte uçtan uca tüm süreçlerinizi son teknoloji ile Dijital Platform olarak sunmaktayız. </p>
    </div>

    <div style="height: 1px;"></div> <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">SİSTEM ANALİZ YAKLAŞIMI</h2>
    
    <p style="margin: 12px 0; text-align: justify;">Bir projenin doğru 
ve başarılı olması için uygulamaya başlamadan önce çalışma planı ve 
mevcut sistem analizinin çıkartılması gerekmektedir. Bir proje ancak 
bundan sonra başarıya ulaşacaktır.</p>
    
    <p style="margin: 12px 0; text-align: justify;">Bu çalışma 
kapsamında DİJİTAL ERP fabrika bünyesinde tümüyle ve daha verimli bir 
şekilde kullanılmasını temin etmek üzere yapılması düşünülen uygulama 
çalışmasına temel teşkil etmek üzere gerçekleştirilmesi planlanır.</p>

    <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">IMPLEMENTASYON METODOLOJİSİ</h2>
    
    <p style="margin: 12px 0; text-align: justify;">DİJİTAL ERP 
Yazılım'ın projelerinin gerçekleştirilmesinde uygulanan uygulama 
stratejisi uzun yıllardır ülkemizin pek çok saygın işletmesinde, köklü 
bilgi teknolojisi uygulamalarının hayata geçirilmesini sağlamıştır. 
DİJİTAL ERP olarak yazılım projelerinin uygulanabilmesi için, yazılımın 
geliştirilmesi aktivitelerinin dışında önem arz eden pek çok diğer 
aktivitenin olduğunun bilincindeyiz. Aşağıda DİJİTAL ERP İmplementasyon 
Metodolojisi ana başlıkları ile irdelenecektir.</p>

    <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">PROJE ORGANİZASYONU</h2>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Proje Ekibinin Tespiti:</h3>
    
    <p style="margin: 12px 0; text-align: justify;">Proje Dijital ERP Yazılım ve <strong>Firma</strong>
 personelinden oluşan bir proje grubu tarafından gerçekleştirilir. 
Dijital ERP Yazılım Proje Ekibi, Proje Yöneticisi, Proje Uzmanı ve Proje
 Eğitmenlerinden oluşacaktır. <strong>Firmanız</strong> da buna paralel 
olarak projenin koordine bir şekilde idaresine katkıda bulunacak bir 
ekibi oluşturması gerekmektedir. Bu ekibin Proje Yöneticisi ve Departman
 Proje Sorumlularından oluşması gerekmektedir. Bu Koordinatör opsiyon 
olarak ERP Danışmanımız tarafından da yapılabilmektedir.</p>

    <h3 style="color: #2c3e50; margin-top: 25px;">MÜŞTERİ Proje Organizasyonu:</h3>
    
    <p style="margin: 12px 0; text-align: justify;">ERP Projeleri ancak 
bütün departmanların katılımıyla başarılı olarak tamamlanabilir. 
Firmanız Projesinde olması gereken organizasyon yapısını aşağıda sizin 
için belirledik.</p>

    <div style="background: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin: 15px 0;">
        <h3 style="color: #2980b9; margin-top: 0;">Proje Genel Koordinatörü</h3>
        <p style="margin: 12px 0; text-align: justify;">Firma içindeki organizasyonlar arası ihtilaf ve geç alınan kararlar konusunda destek olur.</p>
    </div>

    <div style="background: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin: 15px 0;">
        <h3 style="color: #2980b9; margin-top: 0;">Dijital ERP Proje Takımı</h3>
        <p style="margin: 12px 0; text-align: justify;">Bu Projede Bir Proje Yöneticisi ve uygulamanın tamamına hakim bir personel Eğitim ve Destek Uzmanı bulunacaktır.</p>
        <p style="margin: 12px 0; text-align: justify;">Dijital ERP ekibi Uygulama geliştirme -- Karar alma -- Yazılım ve iş akışları konusunda tecrübeli ekiplerden oluşur.</p>
        <p style="margin: 12px 0; text-align: justify;">İhtiyaç anında uygulama üzerindeki her türlü geliştirmeyi anlık olarak yaparlar.</p>
        <p style="margin: 12px 0; text-align: justify;">Proje Yöneticisi projeyi sürekli izleyerek yapılma taahhüdü verilen işlerin zamanlamasını ve oluşan aksamaları önler.</p>
    </div>

    <div style="background: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin: 15px 0;">
        <h3 style="color: #2980b9; margin-top: 0;">Firma ERP Proje Sorumlusu</h3>
        <p style="margin: 12px 0; text-align: justify;">Projenin her 
aşamasından sorumluluk alabilecek ve her türlü data toplama -- Uygulama 
geliştirme konularında katkı sağlayacak -- iş akışlarının 
belirlenmesinde karar alabilecek düzeyde yetkili olmalı.</p>
    </div>

    <div style="background: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin: 15px 0;">
        <h3 style="color: #2980b9; margin-top: 0;">Finansman ve Muhasebe Proje Sorumlusu</h3>
        <p style="margin: 12px 0; text-align: justify;">Finansman ve 
Muhasebe operasyonları konusunda bilgili bu konularda çıkacak her türlü 
problemde anında karar alma yetkisine sahip olmalı</p>
    </div>

    <div style="background: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin: 15px 0;">
        <h3 style="color: #2980b9; margin-top: 0;">Satış Departmanı Proje Sorumlusu</h3>
        <p style="margin: 12px 0; text-align: justify;">Satış 
organizasyonun geliştirilmesi konusunda karar alabilecek bu birimlerden 
beklenen dataların toplanmasına katkı sağlayabilecek yetkiye sahip 
olmalı</p>
    </div>

    <div style="background: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin: 15px 0;">
        <h3 style="color: #2980b9; margin-top: 0;">Satınalma Departmanı Proje Sorumlusu</h3>
        <p style="margin: 12px 0; text-align: justify;">Satınalma 
Uygulamalarında ve Satınalma organizasyonun geliştirilmesi konusunda 
karar alabilecek bu birimlerden beklenen dataların toplanmasına katkı 
sağlayabilecek yetkiye sahip olmalı</p>
    </div>

    <div style="background: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin: 15px 0;">
        <h3 style="color: #2980b9; margin-top: 0;">Üretim Planlama Proje Sorumlusu</h3>
        <p style="margin: 12px 0; text-align: justify;">Alınan 
siparişlerin Üretime gönderilmesi -- iş emirsiz malzeme üretilmemesi ve 
bütün departmanların malzeme ihtiyaçlarının belirlenmesi -- tedarik 
süreleri ve emniyet stokları gibi çalışmaları canlı tutacak yetkiye 
sahip olmalı</p>
    </div>

    <div style="background: #e8f4f8; border-left: 4px solid #3498db; padding: 15px; margin: 15px 0;">
        <h3 style="color: #2980b9; margin-top: 0;">Lojistik Yöneticisi Proje Sorumlusu</h3>
        <p style="margin: 12px 0; text-align: justify;"><strong>Firmanız</strong>
 bünyesinde yer alan depoların planlanması ve raflanması--depolardaki 
kullanıcı yetkilerinin belirlenmesi konularında karar alabilecek- 
emniyet stokları ve ABC stok öncelikleri gibi çalışmalarda bulunabilecek
 stokların detaylandırılmasında destek sağlayacak yetkide olmalı</p>
    </div>

    <div style="height: 1px;"></div> <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">Mevcut Sistemin Analizi</h2>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Şirket Ana Fonksiyonlarının Belirlenmesi:</h3>
    <p style="margin: 12px 0; text-align: justify;">Oluşturulan Proje Ekibi, şirketin aktiviteleri kapsamında olan ana fonksiyonları belirleyecektir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Mevcut İş Akışlarının Çıkarılması:</h3>
    <p style="margin: 12px 0; text-align: justify;">Belirlenen tüm ana fonksiyonlar doğrultusunda mevcut sistemin iş akışı incelenecektir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Mevcut Yapıdaki Problemlerin Belirlenmesi:</h3>
    <p style="margin: 12px 0; text-align: justify;">Ana fonksiyonlar ve iş akışı bazında mevcut sistemin problemleri belirlenip dokümante edilmesi.</p>

    <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">Şirket İhtiyaçlarının Belirlenmesi</h2>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Fonksiyon Bazında İhtiyaçların Belirlenmesi:</h3>
    <p style="margin: 12px 0; text-align: justify;">Mevcut sistemin işleyişindeki problemler göz önüne alınarak, kurulması istenilen sistemin ihtiyaçları belirlenir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Raporlama İhtiyaçlarının Belirlenmesi:</h3>
    <p style="margin: 12px 0; text-align: justify;">Belirlenen sistem fonksiyonları ve ihtiyaçlar doğrultusunda operasyonel ve yönetim raporları tespit edilecektir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">İş Akışlarının Düzenlenmesi:</h3>
    <p style="margin: 12px 0; text-align: justify;">Kurulacak sistemin 
işleyişine mani olan iş akışları belirlenir ve gerek görülürse denetim 
komitesinin onayına sunularak değişimi sağlanır.</p>

    <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">Hazırlık</h2>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Paket Parametrelerinin Oluşturulması:</h3>
    <p style="margin: 12px 0; text-align: justify;">İhtiyaç analizinde 
ortaya çıkan sonuçlar ışığında standartlar, program parametreleri, ön 
değerler, evrak kodları, kullanıcı bazında haklar, menü tasarımları 
tespit edilip uyarlanarak dokümanter edilir ve uygulama üzerinde 
düzenlenir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Programın Sisteme Yüklenmesi:</h3>
    <p style="margin: 12px 0; text-align: justify;">Programların sisteme
 yüklenmesi DİJİTAL ERP tarafından yapılır. Bu çalışma sonunda paketin 
sistem üzerinde organizasyonu dokümante edilir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Raporların Hazırlanması:</h3>
    <p style="margin: 12px 0; text-align: justify;">Tespit edilmiş raporlar sistemde dizayn edilerek teslim edilir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 40px; padding-top: 20px;">Kullanıcı Eğitimleri:</h3>
    <p style="margin: 12px 0; text-align: justify;">Programın uygulamaya
 geçmesinden önce son aşama olarak, kullanıcılar programın genel 
özellikleri ile detayda her kullanıcının kendi işiyle ilgili çalışma 
şekli uygulamalı olarak tanıtılacaktır. Bu süreçte kullanıcılarla tek 
tek çalışılabileceği gibi aynı işi yapan personel, gruplar halinde de 
eğitilebilir.</p>

    <h2 style="color: #34495e; font-size: 18px; margin: 20px 0 10px 0; padding: 8px; background: #ecf0f1; border-left: 4px solid #3498db;">Uygulama</h2>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Sistem Değişimi Planının Hazırlanması:</h3>
    <p style="margin: 12px 0; text-align: justify;">Mevcut sistemden yeni sisteme geçebilmek için atılması gereken adımlar ve süreleri belirlenecektir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Uygulamanın Başlatılması:</h3>
    <p style="margin: 12px 0; text-align: justify;">Yapılan plan doğrultusunda tüm operasyonlar yeni sisteme aktarılıp, sistemin çalışırlığı temin edilecektir.</p>
    
    <h3 style="color: #2c3e50; margin-top: 20px;">Sistem Testi:</h3>
    <p style="margin: 12px 0; text-align: justify;">Yeni kurulan sistem test edilerek kullanıma hazır hale getirilir.</p>
    <div style="height: 1px;"></div> <h1 style="color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; margin-top: 30px; font-size: 24px;">Teknik Mimari</h1>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    DİJİTAL ERP uygulama ortamı içinde kendi uygulama geliştirme ve 
yorumlama ortamlarını içeren üç katmanlı (işlemci, sunucu, veritabanı) 
ve platform ve veritabanı bağımsız bir uygulama ortamıdır. Geliştirme ve
 yorumlama ortamları tamamen pl/sql -xml kullanılarak geliştirilmiştir. 
Bu sebeple pek çok donanım ve işletim sistemi ile sorunsuz olarak 
çalışabilmektedirler.
    </blockquote>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    Veri tabanı olarak SQL kullanılmıştır. İşletim sistemleri üzerinde sorunsuz çalışır.
    </blockquote>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    DİJİTAL ERP yazılımı, sisteme aynı anda bağlanacak kullanıcı sayısı baz alınarak lisanslandırılmaktadır.
    </blockquote>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    DİJİTAL ERP uygulama sunucusu uygulaması Windows (Windows 7 / 8 /10 
Server) ve Linux işletim sistemleri üzerinde çalışmaktadır. Eğer 
uygulama sunucusu ve veritabanı sunucusu olarak aynı sunucu donanımı 
kullanılacaksa, sunucu işletim sistemi veritabanı sunucusu uygulamasına 
bağlı olarak seçilmelidir.
    </blockquote>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    DİJİTAL ERP Kullanıcı makinasında, internet explorer 7 ve üzeri 
kurulumu olmalıdır. Pdf raporlama yapıldığı için Acrobat Reader 
kurulmalıdır. Veritabanı sunucusu istemci erişim araçlarının kurulmasına
 gerek yoktur. Browser ve Acrobat reader dışında (her ikisi de lisans 
gerektirmeyen uygulamalardır) İstemci tarafında disk alanına ihtiyaç 
duyulmamaktadır.
    </blockquote>

    <div style="height: 2px; background: #667eea; margin: 30px 0;"></div>

    <h1 style="color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; padding-top: 50px; margin-top: 30px; font-size: 24px;">Proje Uygulama Planı</h1>
    <p style="font-style: italic; color: #666; margin: 12px 0; text-align: justify;">(Proje Başlangıcında Doldurulacaktır)</p>

    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <thead>
            <tr>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">Sıra</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">Açıklama</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">01</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">02</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">03</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">04</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">05</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">06</th>
            </tr>
        </thead>
        <tbody>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;">1</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"><strong>Sistem Analizi Çalışması</strong><br>Proje kapsamında belirlenen departmanların detaylı iş süreçleri analiz edilecektir.</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">1.1</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Satış Departmanı Sistem Analizi</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">1.2</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Satınalma Departmanı Sistem Analizi</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">1.3</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Lojistik Sistem Analizi</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">1.4</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Finansman Sistem Analizi</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">1.5</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Muhasebe Sistem Analizi</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">1.6</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Bakım Yönetimi Sistem Analizi</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">1.7</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Proje Yönetimi Sistem Analizi</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;">2</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"><strong>Data Hazırlıkları</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">2.1</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Var
 Olan Dataların Düzenlenmesi ve Test olarak Aktarılması (Müşteriler - 
Adresler - Depolar - Satıcılar - Hesap Planları - Stok ve Hizmet 
kartları)</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">2.2</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Satış Datalarının Geçiş Öncesi Aktarma Programlarının Yazılması</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">2.3</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Finansman ve Muhasebe Datalarının Geçiş Öncesi Aktarma Programlarının Yazılması</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">2.4</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Bakım Yönetimi Datalarının Aktarılma Çalışmasını Yapılması</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;">3</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"><strong>1.Faz Eğitimlere Başlanması</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">3.1</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Malzeme Yönetimi Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">3.2</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Satış Yönetimi Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">3.3</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Satınalma Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">3.4</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">İthalat Birimi Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">3.5</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Satınalma Departmanı Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">3.6</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Finansman Departmanı Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">3.7</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Muhasebe Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">3.8</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Entegrasyon Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">3.9</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Bakım Yönetimi Kullanıcı Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">3.10</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Şantiye-Proje Yönetimi Kullanıcı Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;">4</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"><strong>2.Faz Eğitimlere Başlanması ve Yapılan Modifikasyonların Uygunluk Tespitlerinin yapılması</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">4.1</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Malzeme Yönetimi Eğitimleri ve Sevkiyat Simülasyonları</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">4.2</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Satış Yönetimi Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">4.3</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Satınalma Eğitimleri ve Satınalma İhtiyaçlarının Birimlerden Toplanması</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">4.4</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">İthalat Birimi Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">4.5</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Satınalma Departmanı Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">4.6</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Finansman Departmanı Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">4.7</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Muhasebe Eğitimleri Geliştirme Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="background: #f8f9fa;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">4.8</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">Entegrasyon Eğitimleri Geliştirme Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;"></td>
            </tr>
            <tr>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">4.9</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;">Bakım Yönetimi Geliştirme Eğitimleri</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #fff;"></td>
            </tr>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;">5</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"><strong>Paralel Test Kullanımı</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
            </tr>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;">6</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"><strong>Day 1. (Projenin Gerçek Kullanıma Alınması)</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
            </tr>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;">7</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"><strong>Maliyet Çalışmalarının Başlatılması ve Tamamlanması</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
            </tr>
            <tr style="font-weight: bold; background-color: #e3f2fd;">
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;">8</td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"><strong>Yönetim Raporlama Sistemlerinin Tamamlanması</strong></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
                <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #e3f2fd;"></td>
            </tr>
        </tbody>
    </table>

    <div style="height: 2px; background: #667eea; margin: 30px 0;"></div>

    <h2 style="color: #34495e; margin-top: 25px; font-size: 20px; border-left: 4px solid #3498db; padding-left: 10px;">Geliştirme</h2>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    Ortaya çıkacak olan özel uygulamalar, ek tablo vb. İstekler için 
önceden detaylı bir konsept hazırlanır. Bu konseptin hayata geçirilmesi 
için DİJİTAL ERP tarafından öngörülen geliştirme adam/gün sayısı olarak 
belirlenir ve proje yönetimine sunulur. Proje yönetimi tarafından onay 
alındıktan sonra konsept öngörülen zamanda ve şartlarda DİJİTAL ERP 
tarafından hayata geçirilir.
    </blockquote>

    <div style="height: 2px; background: #667eea; margin: 30px 0;"></div>

     <h1 style="color: white; font-size: 22px; margin: 30px 0 15px 0; padding: 10px; background: #3498db; border-radius: 4px;">3. TEKNİK ÇÖZÜMÜN AÇIKLAMASI</h1>

    <h2 style="color: #34495e; margin-top: 25px; font-size: 20px; border-left: 4px solid #3498db; padding-left: 10px;">YAZILIM LİSANSI</h2>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    Aşağıda verilen rakamların kapsamı yukarıda belirlenen modüller ve <span style="background-color: #fff3cd; padding: 2px 6px; border-radius: 3px;">50 kullanıcı</span>
 baz alınarak hazırlanmış olup, proje içerisinde gerçekleşecek 
analizlerde ortaya çıkacak ihtiyaç ve beklentilere göre ve/veya müşteri 
ilaveleri ve revizyonlarına göre değişiklik gösterebilir. Toplam lisans 
bedeline dahil olanlar; Seçilen modüllerin kurulumu, Seçilen modüllere 
karşılık gelen adam/gün proje grubu eğitimleri, ve seçilen ürünün 
yukarıda belirtildiği gibi kullanıcı lisansı.
    </blockquote>

    <h2 style="color: #34495e; margin-top: 25px; font-size: 20px; border-left: 4px solid #3498db; padding-left: 10px;">UYARLAMA VE GELİŞTİRME HİZMETİ</h2>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
    Proje uyarlama süremiz intranet sistemli çalışacak modüller için; <span style="background-color: #fff3cd; padding: 2px 6px; border-radius: 3px;">6 ay</span> olup, bu süre ilaveler ve uyarlama istekleri olması durumunda değişiklik gösterebilir.
    </blockquote>

    <h2 style="color: #34495e; margin-top: 25px; font-size: 20px; border-left: 4px solid #3498db; padding-left: 10px;">BAKIM</h2>

    <ul style="margin: 15px 0; padding-left: 30px;">
        <li style="margin: 8px 0;">Uygulama, firmanızın sunucusuna 
kurulumundan itibaren 1 yıl süre ile garanti kapsamında olacaktır. Bu 
dönem içerisinde uygulamadan kaynaklanan program hatalarının 
giderilmesi, telefon desteği ve uygulamanın yeni sürümleri için ayrıca 
bir bedel talep edilmeyecektir. Uygulamanın sunuculara kurulumu, Dijital
 ERP'den kaynaklanmayan nedenlerle, anlaşmanın imzalanmasından sonraki 3
 ay içerisinde yapılmadığı takdirde garanti süresi anlaşma tarihinden 
sonraki 3. Ayın sonunda başlayacaktır.</li>
        
        <li style="margin: 8px 0;">Garanti süresi bitiminde yıllık bakım
 yapılması gerekmektedir. Uygulamanın sürekli fonksiyonel 
iyileştirilmesi ve yazılım teknolojisindeki gelişmelerin uygulamaya 
yansıtılması ile yazılımın güncel tutulması, ayrıca uygulamada 
çıkabilecek problemlerin giderilmesi, sınırsız sayıda bildirim girilmesi
 ve telefon desteği bu anlaşma kapsamında yapılacaktır.</li>
        
        <li style="margin: 8px 0;">Dijital ERP Yazılımı <span style="background-color: #fff3cd; padding: 2px 6px; border-radius: 3px;">Bakım Bedeli Yıllık</span> bazda ücret belirlenmiştir. Yazılım lisans bedelinin <span style="background-color: #fff3cd; padding: 2px 6px; border-radius: 3px;">%15</span>
 olarak belirlenmiştir. TÜİK tarafından açıklanan TÜİK 2003=100 Tüketici
 ve Üretici fiyatları genel endeksi 'on iki aylık ortalamalara göre 
değişim % oranı' tablolarından (TÜFE+ÜFE)/2 ortalaması oranları esas 
alınarak arttırılacaktır.</li>
        
        <li style="margin: 8px 0;">Bakım Lisans bedelinin %15 olarak her yıl sözleşme tarihinde satın alım tarihinde peşin ödeme olarak talep edilecektir.</li>
    </ul>

    <h2 style="color: #34495e; margin-top: 25px; font-size: 20px; border-left: 4px solid #3498db; padding-left: 10px;">EĞİTİM</h2>

    <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 10px 0; padding: 15px 15px; font-style: italic; color: #555;">
    Proje süresi boyunca müşteri ile birlikte veya bağımsız çalışmaları, eğitimleri ekran karşısında pratiğe dönüştüreceklerdir.Bu proje kapsamında eğitim, 50 kişi / 10 gün verilecektir. Proje tesliminden sonra ilave eğitim taleplerinde adam/gün bazında ayrıca ücretlendirilecektir.
    </blockquote>


    <div style="height: 2px; background: #667eea; margin: 30px 0;"></div>

    <h1 style="color: #2c3e50; border-bottom: 3px solid #3498db; padding-bottom: 10px; margin-top: 30px; font-size: 24px;">FİYATLAR</h1>

    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <thead>
            <tr>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">Açıklama</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">Miktar</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">Birim</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">Para Birimi</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">Birim Fiyat (USD)</th>
                <th style="background: #667eea; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #5a67d8;">Toplam Fiyat (USD)</th>
            </tr>
        </thead>
<tbody>
  ~fiyatSatirlar~
</tbody>

    </table>

    <h2 style="color: #34495e; margin-top: 25px; font-size: 20px; border-left: 4px solid #3498db; padding-left: 10px;">OPSİYONLAR</h2>

    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <thead>
            <tr>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50;">Açıklama</th>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50;">Miktar</th>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50;">Birim</th>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50;">Para Birimi</th>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50;">Birim Fiyat (USD)</th>
                <th style="background: #34495e; color: white; padding: 12px; text-align: left; font-weight: 600; border: 1px solid #2c3e50;">Toplam Fiyat (USD)</th>
            </tr>
        </thead>
<tbody>
  ~opsiyonSatirlar~
</tbody>
    </table>

    <div style="height: 1px;"></div> <div style="background-color: white; padding: 40px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
        <h1 style="color: #1e3a8a; font-size: 20px; font-weight: bold; margin-top: 30px; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 3px solid #3b82f6;">OPSİYON İLAVE LİSANS ÜCRETLERİ</h1>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <thead>
                <tr>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Açıklama</th>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Miktar</th>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Birim</th>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Para Birimi</th>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Birim Fiyat</th>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Toplam Fiyat (US$)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">İlave 1 Kullanıcı Lisans Bedeli</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">1</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">USD</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">50$</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">50$</td>
                </tr>
                <tr style="background: #f8f9fa;">
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">İlave 5 Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">5</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">USD</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">50$</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">250$</td>
                </tr>
                <tr>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">İlave 25 Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">25</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">USD</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">50$</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">1,250$</td>
                </tr>
                <tr style="background: #f8f9fa;">
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">İlave 50 Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">50</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">USD</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">25$</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">1,250$</td>
                </tr>
                <tr>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">İlave 100 Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">100</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">Kullanıcı</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">USD</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">4.00$</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">400$</td>
                </tr>
            </tbody>
        </table>

        <div style="margin: 40px 0; border-top: 2px solid #e2e8f0;"></div>

        <h1 style="color: #1e3a8a; font-size: 20px; font-weight: bold; margin-top: 30px; margin-bottom: 15px; padding-bottom: 8px; border-bottom: 3px solid #3b82f6;">E-DÖNÜŞÜM-OPSİYON</h1>
        
        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <thead>
                <tr>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Açıklama</th>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Miktar</th>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Birim</th>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Para Birimi</th>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Birim Fiyat</th>
                    <th style="background-color: #7c3aed; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #6d28d9; font-size: 13px;">Toplam Fiyat TL</th>
                </tr>
            </thead>
             <tbody>
                <tr>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">KONTOR</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">1</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">ADET</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">TL</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">4 TL</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">4 TL</td>
                </tr>
                <tr style="background: #f8f9fa;">
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">E-FATURA</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;" colspan="5"></td>
                </tr>
                <tr>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">E-ARŞİV</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;" colspan="5"></td>
                </tr>
                <tr style="background: #f8f9fa;">
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">E-İHRACAT</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;" colspan="5"></td>
                </tr>
            </tbody>
        </table>

        <div style="margin: 40px 0; border-top: 2px solid #e2e8f0;"></div>

         <h1 style="color: white; font-size: 22px; margin: 30px 0 15px 0; padding: 10px; background: #3498db; border-radius: 4px;">4.TİCARİ ŞARTLAR VE KOŞULLAR</h1>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">ÖDEME</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            <p style="margin: 12px 0; text-align: justify;">Ödeme şartları aşağıdaki tabloda belirtilmiştir.</p>
            <p style="margin: 12px 0; text-align: justify;">Kullanım lisans bedelleri, sözleşme imzalanmasını takiben, lisans tutarında fatura edilecektir.</p>
            <p style="margin: 12px 0; text-align: justify;">Hizmet bedellerine ait faturalar, hizmet sözleşmesi imzalandığı andan itibaren aylık veya haftalık baz da fatura edilecektir.</p>
            <p style="margin: 12px 0; text-align: justify;">Yabancı para
 birimi cinsinden kesilen fatura bedelleri, o günün T.C. Merkez Bankası 
döviz satış kuru ile Türk Lirası'na çevrilip KDV ilave edilerek faturaya
 dönüştürülecektir.</p>
            <p style="margin: 12px 0; text-align: justify;">Ödemeler 
fatura tarihini izleyen aşağıdaki tabloya istinaden yapılacak olup, bu 
süreler içinde yapılmayan ödemeler için fatura tarihinden itibaren TL 
değerler için aylık %2, yabancı para cinsi için %1 vade farkı ve KDV 
ilavesi ile fatura edilecektir.</p>
            <p style="margin: 12px 0; text-align: justify;">Yıllık bakım destek hizmetleri ise bakım dönemi başında fatura edilir ve tüm faturaların ödeme vadesi 10 (on) iş günüdür.</p>
        </blockquote>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
            <thead>
                <tr>
                    <th style="background-color: #059669; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #047857; font-size: 13px;">No</th>
                    <th style="background-color: #059669; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #047857; font-size: 13px;">TL</th>
                    <th style="background-color: #059669; color: white; padding: 12px 8px; text-align: left; font-weight: bold; border: 1px solid #047857; font-size: 13px;">Açıklama</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">1</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">%25</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">Siparişle birlikte peşin</td>
                </tr>
                <tr style="background: #f8f9fa;">
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">2</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">%50</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">Kurulum aşamasında</td>
                </tr>
                <tr>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">3</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">%15</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #fff;">Uyarlama Geliştirme</td>
                </tr>
                <tr style="background: #f8f9fa;">
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">4</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">%10</td>
                    <td style="padding: 10px 8px; border: 1px solid #cbd5e1; font-size: 13px; background: #f8f9fa;">Teslimatta</td>
                </tr>
            </tbody>
        </table>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">TESLİM SÜRESİ</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            Teklifimizde belirlenen kapsamlar dahilinde <strong>~teslimSuresi~</strong> içerisinde canlı teslimi yapılması planlanmıştır. Uyarlama süreçleri 1 yıl süreyle devam edecektir.
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">VERGİLER</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            Fiyatlarımıza KDV, diğer vergi, resim ve harçlar dahil değildir.
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">TEKLİF GEÇERLİLİĞİ</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            <strong>~teklifGecerlilikSuresi~</strong>
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">İLAVE ÜRÜN/HİZMET / MODÜL</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            Proje sırasında ortaya çıkacak olan özel uygulamalar, ek 
tablo, ve ekran istekleri bu teklif kapsamında değildir. Proje sırasında
 ortaya çıkan yazılım geliştirme ihtiyaçlarına göre detaylı çalışma 
yapılır. Ayrıca tekliflendirilir.
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">İLAVE YAZILIMLAR</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            Dijital ERP_V1 sisteminin çalışabilmesi için gereken işletim
 sistemi ve database gibi üçüncü parti yazılımlar teklif kapsamında 
değildir.
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">İLAVE EĞİTİM VE SERVİS</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            İlave eğitim, program yazılımı, veri aktarımı ve entegrasyon işlemleri için adam-gün ücretimiz <strong>300 USD+KDV</strong> olup, yol, konaklama (Ankara dışı olması halinde) ve yemek bedellerini kapsamaktadır.
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">GENİŞLEME İHTİYACI</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            İleride ihtiyaç olması durumunda kapasite artışı halinde 
talep edilen ilave kullanıcılar için teklifte belirtilen birim kullanıcı
 fiyatı üzerinden hesaplanıp fatura edilecektir.
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">DİĞER KOŞULLAR</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            Proje için, firmanızın kullanıcılarından bir proje grubu 
oluşturulup, eğitimler bu proje grubuna verilecektir. Proje grubu 
çalışmalar için gereken zamanı ayıracaktır.
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">DANIŞMANLIK-DESTEK HİZMETİ</h2>
        <blockquote style="background: #f8f9fa; border-left: 4px solid #3498db; margin: 20px 0; padding: 15px 20px; font-style: italic; color: #555;">
            Sistem devreye alındıktan sonra ihtiyaç duyulması halinde 
garanti süresi sonrasında, yüz yüze veya uzaktan çağrı sistemi ile <strong>300 USD adam/gün</strong> olarak ücretlendirilecektir.
        </blockquote>

        <h2 style="color: #2563eb; font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 12px;">SİPARİŞ VERİLMESİ</h2>
        <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981; margin-top: 20px;">
            <p style="margin: 8px 0; color: #065f46; font-weight: 500; text-align: justify;">Sipariş için lütfen aşağıdaki kişi ile iletişime geçiniz.</p>
            <p style="margin: 8px 0; color: #065f46; font-weight: 500; text-align: justify;"><strong>SUZAN ERDAL EKİNCİ</strong></p>
            <p style="margin: 8px 0; color: #065f46; font-weight: 500; text-align: justify;">Tel: +90 533 5011270</p>
            <p style="margin: 8px 0; color: #065f46; font-weight: 500; text-align: justify;">Email: suzan.erdal@dijitalerpyazilim.com</p>
        </div>
    </div>
`