export const contractTemplate1 = `<div
        style="font-family: Arial, sans-serif; line-height: 1.6; margin: 0 auto; padding: 20px; color: #333;">

        <h1 style="text-align: center; font-size: 18px; font-weight: bold; margin-bottom: 20px;">~sozlesme_adi~</h1>
        <h2 style="font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 10px;">1. TARAFLAR</h2>
        <p style="margin: 10px 0;">İşbu ~sozlesme_adi~ ("Sözleşme"),</p>
        <ol style="margin-left: 20px;">
            <li style="margin: 10px 0;"><strong>Bir tarafta</strong> ~kurum_adres~ <strong>adresinde mukim</strong> 7330415259 <strong>Vergi Kimlik Numaralı</strong> 
                ~kurum~ <strong> ("Şirket") ile</strong></li>

            <li style="margin: 10px 0;"><strong>Diğer tarafta</strong> ~sirket_adres~ <strong>adresinde mukim</strong><br><strong> ~sirket_vergi_no~ Vergi Kimlik</strong> ~sirket~ <strong> ("Müşteri") arasında,</strong> karşılıklı
                mutabakat ile imzalanmıştır. Yukarıda adresleri, vergi kimlik numaraları ve unvanları yazılı şirketler
                bundan sonra münferiden "Taraf" ve birlikte "Taraflar" olarak anılacaklardır.</li>
        </ol>
        <h2 style="font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 10px;">2. SÖZLEŞMENİN KONUSU
        </h2>
        <p style="margin: 10px 0;">İşbu Sözleşme, Şirket tarafından Müşteriye Sözleşme süresince ücreti mukabilinde
            bakım hizmeti verilmesi ile Hizmete dair Tarafların hak ve yükümlülüklerini konu alır.</p>
        <h2 style="font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 10px;">3. TANIMLAR</h2>
        <p style="margin: 10px 0;">Bu Sözleşmede aşağıda tanımlanan ifadeler, Sözleşmenin başka bir yerinde veya ileride
            imzalanabilecek eklerinde açıkça farklı bir şekilde tanımlanmadıkça aşağıdaki anlamları taşır:</p>
        <p style="margin: 10px 0;"><strong>"Gizli Bilgi",</strong> işbu Sözleşme ve ekleri kapsamında Taraflar arasında
            gerçekleşecek olan görüşmeler, fiyat teklifleri ile aralarındaki her türlü anlaşma ve hükümlerini ve
            gerçekleştirecekleri ticaretin gereklilikleri doğrultusunda birbirleriyle yazılı, görsel, sözlü ve sair
            şekilde paylaşacakları ticari sır olsun veya olmasın her tür bilgi, teknik veri, ticari sır, know-how, fiyat
            bilgisi, müşteri ve potansiyel müşterilere, buluşlara, süreçlere, teknolojilere, tasarımlara, çizimlere,
            finansal duruma ilişkin tüm bilgiler dâhil ve bunlarla sınırlı olmaksızın kamuya ifşa edilmemiş her türlü
            bilgiyi,</p>
        <p style="margin: 10px 0;"><strong>"Hizmet",</strong> Yazılıma dair aşağıda sayılan hizmet türlerinden Sözleşme
            uyarınca Müşteriye sağlanacak olanları,</p>

        <p style="margin: 10px 0;"><strong>"Çağrı Bazlı Hizmet",</strong> destek hizmetinin yerinde verilmesi gereken
            hallerde, Taraflar arasında mutabakat ile belirlenen gün ve saatte Şirket tarafından yetkilendirilen destek
            personelinin Müşterinin işyerinde verdiği ve Sistemin çalışamaz durumda olduğu ve Şirket tarafından acil
            müdahale gerektiğinin tespit edildiği durumlarda karşılıklı mutabakatı takiben 4 saat içinde verilen
            hizmeti,</p>

        <p style="margin: 10px 0;"><strong>"Online Destek Hizmeti",</strong> Sisteme uzaktan erişim vasıtasıyla tespit
            edilebilecek sorunlar için çevrimiçi bağlantı ile Müşterinin sistemine bağlanarak sorunun teşhis edilerek
            çözümlenmesini,</p>

        <p style="margin: 10px 0;"><strong>"Periyodik Ziyaret Hizmeti",</strong> Şirket tarafından yetkilendirilen
            destek personeli tarafından Müşterinin işyerine ziyarette bulunularak, kullanılan ürün ve çalışma ortamının
            gözden geçirilmesini, gerekli önlemlerin alınması için Müşteriye tavsiyelerde bulunulmasını ve destek
            personeli tarafından gerekli görülmesi halinde Sisteme müdahale edilerek sorunların giderilmesi hizmetini,
        </p>

        <p style="margin: 10px 0;"><strong>"Telefonla Destek Hizmeti",</strong> Sözleşmede yer alan Yazılım ürünlerinin,
            dokümantasyonlarında belirtilen fonksiyonları yerine getirebilecek şekilde çalışmalarını sağlamak amacıyla,
            Müşterinin kullanım esnasında karşılaşabileceği ve telefonla cevaplanabilecek basit sorunların çözümü ve bu
            konulara telefonla danışmanlık, internet üzerinden destek ve gerekli hallerde doküman gönderilmesi
            hizmetlerini,</p>

        <p style="margin: 10px 0;"><strong>"~kurum_shortname~",</strong> ~kurum~ unvanı ile
            faaliyet gösteren, Yazılımın üreticisi ve fikri haklarının sahibi olan şirketi,</p>

        <p style="margin: 10px 0;"><strong>"Türk Lirası"</strong> veya <strong>"TL",</strong> 5083 sayılı Türkiye
            Cumhuriyeti Devletinin Para Birimi Hakkında Kanun hükümleri uyarınca belirlenen kanuni para birimini,</p>

        <p style="margin: 10px 0;"><strong>"Yazılım",</strong> Şirket tarafından Müşteriye lisansı temin edilen DİJİTAL
            ERP'ye ait ve ürüne ait belgelerde belirtilen işlevleri gerçekleştirmek üzere geliştirilen bilgisayar
            programlarını, ifade eder.</p>

        <h2 style="font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 10px;">4. YORUM</h2>
        <p style="margin: 10px 0;">İşbu Sözleşmede, aksi içerikte belirtilmedikçe:</p>

        <ol style="margin-left: 20px;">
            <li style="margin: 10px 0;">Taraflar ile ilgili her türlü atıf, ilgili olduğu yerlerde, bunların haleflerini
                de kapsar.</li>
            <li style="margin: 10px 0;">Birden fazla kişiden oluşan bir tarafa yapılan atıf, o tarafı oluşturan her bir
                kişiyi içerir.</li>
            <li style="margin: 10px 0;">Başlıklar ve açıklayıcı notlar sadece atıf kolaylığı amacıyladır ve Sözleşmenin
                kuruluşunu veya yorumunu etkilemez.</li>
            <li style="margin: 10px 0;">Herhangi bir kanuna, tüzüğe, yönetmeliğe veya herhangi bir mevzuata yapılan atıf
                bunlarda yapılan ya da yapılacak değişiklikleri de kapsar biçimde yorumlanır ve herhangi bir mevzuatın
                yerine yürürlüğe konulan yeni mevzuata yapılmış sayılır. Mevzuata yapılan tüm atıflar, anılan kanuna
                ilişkin olarak çıkartılmış olan tüzük, yönetmelik, tebliğ veya ilgili diğer mevzuatı da kapsayacak
                şekilde yorumlanır.</li>
            <li style="margin: 10px 0;">Günün herhangi bir saatine veya bir tarihine yapılan atıf, Türkiye
                Cumhuriyeti'ndeki o saat veya tarihi ifade eder.</li>
            <li style="margin: 10px 0;">"Fatura" anlam itibariyle basılı faturanın yanı sıra her türlü, elektronik
                fatura, e-arşiv fatura, serbest meslek makbuzu ve elektronik serbest meslek makbuzunu da içerir.</li>
        </ol>

        <h2 style="font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 10px;">5. KAPSAM</h2>

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;" >
            <thead>
                <tr style="background-color: #f2f2f2;">
                    <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Açıklama</th>
                    <th style="border: 1px solid #ddd; padding: 10px; text-align: center;">Miktar</th>
                    <th style="border: 1px solid #ddd; padding: 10px; text-align: center;">Birim</th>
                    <th style="border: 1px solid #ddd; padding: 10px; text-align: center;">Para Birimi</th>
                    <th style="border: 1px solid #ddd; padding: 10px; text-align: right;">Birim Fiyat (TL)</th>
                    <th style="border: 1px solid #ddd; padding: 10px; text-align: right;">Toplam Fiyat (TL)</th>
                </tr>
            </thead>
            <tbody>
              ~kapsam_satirlari~
            </tbody>
        </table>

        <ol style="list-style: none;">
            <li style="margin: 10px 0;"><strong>5.1.</strong> İş bu sözleşme <strong>~sozlesmeBaslangicTarihi~</strong> tarihinde başlar ve
                <strong>~sozlesmeBitisTarihi~</strong> tarihinde sona erer.</li>
                 <li style="margin: 10px 0;"><strong>5.2.</strong> Şirket tarafından Müşteriye yukarıda belirtilen Bakım ve Destek Hizmetlerinin
                satışı yapılmıştır.</li>
                  <li style="margin: 10px 0;"><strong>5.3</strong>
                Sözleşme ile satışı yapılan tüm Hizmetlerin KDV hariç toplam bedeli, yukarıda
                belirtildiği üzere toplam <strong>~toplam_fiyat~</strong> +KDV'dir.
            </li>
            <li style="margin: 10px 0;"> Hizmet bedeli, Sözleşme'nin imzalanmasını takiben Şirket tarafından
                Müşteriye fatura edilecektir.
               <p style="margin: 20px 0; text-decoration: underline; font-weight: bold;">GENEL TOPLAM LİSANS+ HİZMET BEDELİ
            (TL) :~toplam_fiyat~</p>
        <p style="margin: 10px 0; text-decoration: underline; font-weight: bold;"> (KDV Dahil
            değildir)</p></li>
                <li style="margin: 10px 0;"><strong>5.3.</strong>Sözleşme kapsamında verilecek hizmetler ("Destek Hizmet(ler)i") aşağıda
                belirtilmiştir;</li>
                <li style="margin: 10px 0;"><strong>5.4.</strong>Ödeme Planı
                 <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
                <tr style="background-color: #f2f2f2;">
                    <th style="border: 1px solid #ddd; padding: 10px; text-align: center;">No</th>
                    <th style="border: 1px solid #ddd; padding: 10px; text-align: right;">TL</th>
                    <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Açıklama</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">1</td>
                    <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">10, TL</td>
                    <td style="border: 1px solid #ddd; padding: 10px;">Siparişle birlikte peşin</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">2</td>
                    <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">50, TL</td>
                    <td style="border: 1px solid #ddd; padding: 10px;">Kurulum aşamasında-MART SONU</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">3</td>
                    <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">70, TL</td>
                    <td style="border: 1px solid #ddd; padding: 10px;">Uyarlama Geliştirme-NİSAN AYI</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 10px; text-align: center;">4</td>
                    <td style="border: 1px solid #ddd; padding: 10px; text-align: right;">80, TL</td>
                    <td style="border: 1px solid #ddd; padding: 10px;">Teslimatta-MAYIS AYI</td>
                </tr>
            </tbody>
        </table></li>
        

       

       

       

       

        <li style="margin: 10px 0;"><strong>5.7.</strong> Sözleşme Kapsamı Dışındaki Hizmetler: 2000TL adam/gün. Belirtilenlerin dışında
            özel rapor tasarımı, özel yazılım ve destek hizmetleri vb. hizmetler MÜŞTERİ tarafından talep edilirse
            aşağıdaki ücretler uygulanır. Müşteri tarafından Yerinde Destek Hizmeti'nin Ankara ili dışında verilmesinin
            talep edildiği durumlarda, MÜŞTERİ'den öncesinde yazılı onayı olmak kaydıyla Sözleşme Bedeli dışında günlük
            <strong>2.500,00 TL</strong> adam/gün ücret ve ek olarak var ise ulaşım ve konaklama bedelleri talep edilir.
       

        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
                <tr style="background-color: #f2f2f2;">
                    <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Hizmet</th>
                    <th style="border: 1px solid #ddd; padding: 10px; text-align: left;">Bedeli (KDV Hariç)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 10px;">Eğitim Hizmeti</td>
                    <td style="border: 1px solid #ddd; padding: 10px;">Kurulumda ücretsiz; İlave taleplerde 2000TL
                        adam/gün</td>
                </tr>
                <tr>
                    <td style="border: 1px solid #ddd; padding: 10px;">Özel Rapor Tasarımı veya Yazılım Hizmeti</td>
                    <td style="border: 1px solid #ddd; padding: 10px;">2000 TL adam/gün</td>
                </tr>
            </tbody>
        </table>
 </li>
        
            <li style="margin: 10px 0;"><strong>5.8.</strong>İlave Hizmet bedeli, Müşteri tarafından, faturanın gönderilmesini takiben 3 iş
                günü içinde ödenir.</li>
            <li style="margin: 10px 0;"><strong>5.9.</strong>Müşteri tarafından zamanında ve tam olarak ödeme yapılmaması halinde Şirket,
                Hizmeti durdurabilir. Müşteri, bu sebeple Hizmetin durdurulması halinde Şirketten zarar, ziyan veya
                tazminat talebinde bulunamaz.</li>
            <li style="margin: 10px 0;"><strong>5.10.</strong>Müşteri, aylık ödemeleri vaktinde yapmaması halinde hiçbir ihbar veya ihtara
                gerek kalmaksızın temerrüde düşülen miktar üzerinden aylık %3 (yüzde üç) gecikme faizi ödeyeceğini
                peşinen kabul, beyan ve taahhüt eder.</li>
            <li style="margin: 10px 0;"><strong>5.11.</strong>Müşteri tarafından zamanında ve tam olarak ödeme yapılmaması ve ödemenin 15 (on
                beş) gün içerisinde tamamlanmaması halinde işbu Sözleşmenin toplam bedeli muaccel hale gelir.</li>
            <li style="margin: 10px 0;"><strong>5.12.</strong>Hizmet kapsamında Şirket, Müşteriye ait sayılan Yazılımları denetler, rutin
                kontrolleri sağlar ve gerekmesi halinde müdahalede bulunarak Yazılımın bakımını sağlar.</li>
            <li style="margin: 10px 0;">Rutin bakımın kapsamının belirlenmesinde tek yetkili Şirkettir. Bakım hizmeti
                kapsamında çözülmesi mümkün olmayan bir sorun ile karşılaşılması halinde Şirket, sorunun çözümü için ek
                bir anlaşma ve ücret talep edebilir.</li>
            <li style="margin: 10px 0;"><strong>5.13.</strong>Müşteri, Şirket tarafından belirlenen Hizmet kapsamının eksik veya yetersiz
                olduğunu ileri sürerek iade veya iptal veya tazminat talebinde bulunmayacağını peşinen kabul, beyan ve
                taahhüt eder.</li>
            <li style="margin: 10px 0;"><strong>5.14.</strong>Hizmet, acil durumlar haricinde Mesai Saatleri içinde verilir.</li>
            <li style="margin: 10px 0;"><strong>5.15.</strong>    Acil durum hali, Şirket tarafından belirlenir ve Şirketin onayı olmaksızın bir
                durumun acil durum teşkil ettiği ileri sürülemez.</li>  
            <li style="margin: 10px 0;"><strong>5.16.</strong>üşteri tarafından Online Destek Hizmetinden yararlanılması için gerekli olan
                internet bağlantısının sağlaması ve Yazılımın temini yalnızca Müşterinin sorumluluğundadır. Bu
                gerekliliklerin yerine getirilememesi sebebiyle Hizmetin verilememesinden Şirket sorumlu tutulamaz ve bu
                sebeple Şirketin Sözleşmedeki yükümlülüklerini yerine getirmediği öne sürülemez.</li>
            <li style="margin: 10px 0;"><strong>5.17.</strong>Hizmet, Şirket personeli tarafından verilir.</li>
            <li style="margin: 10px 0;"><strong>5.18.</strong>Görevlendirilecek personel sayısının belirlenmesi ve bu personellerin seçilmesi
                hususlarındaki kararlar tamamen Şirkete aittir.</li>
            <li style="margin: 10px 0;">Müşteri, Şirket personelinin Hizmeti sağlayabilmesi için uygun ortamı temin
                etmekle yükümlüdür.</li>
            <li style="margin: 10px 0;"><strong>5.19.</strong>Müşteri, Şirket tarafından gerekli görülmesi halinde Yazılım kullanıcıların veya
                bilişim yetkililerinin Hizmet esnasında hazır bulunmasını sağlayacağını beyan ve taahhüt eder.</li>
            </ol>

        <h2 style="font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 10px;">6. ~kurum_shortname~ BAKIM
            ŞARTLARI</h2>

        <ol style="margin-left: 20px;">
            <li style="margin: 10px 0;">İşbu Sözleşme'nin amacı ve konusu; ~kurum_shortname~ tarafından Firma'ya, Firma'nın
                Bakım'a ilişkin yıllık Bakım bedelini ödemesi halinde ilgili yıllık dönem içerisinde sunulacak Bakım'a
                ilişkin olarak Taraflar'ın hak ve yükümlülüklerinin belirlenmesidir.</li>
            <li style="margin: 10px 0;">BAKIM TEDARİKİNE İLİŞKİN ESASLAR</li>
        </ol>

        <p style="margin: 10px 0;">Firma tarafından Danışmanlık ve Uyarlama Destek Hizmetleri talep edilebilir. Söz
            konusu Danışmanlık ve Uyarlama Destek Hizmetleri, sözleşme altında belirtilen hüküm ve koşullar uyarınca
            belirlenen bedeller üzerinden ücretlendirilir.</p>

        <p style="margin: 10px 0;">6.3 Yeni versiyona ve/veya versiyon içi revizyona geçişle ilgili Firma, Danışmanlık
            ve Uyarlama Destek Hizmetleri sözleşmesi altında belirtilen hüküm ve koşullar uyarınca belirlenen bedeller
            üzerinden ücretlendirilir.</p>

        <h2 style="font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 10px;">7. LİSANS KULLANIMI</h2>

        <p style="margin: 10px 0;">7.1. Sözleşme ile Firma'ya münhasır olmayan ve devredilemeyen, Lisans Belgesi'nde
            listelenen Yazılım'ı kullanma hakkı verilir. Sözleşme'nin imzalanmasının akabinde Yazılım'a ilişkin lisans
            haklarının kullanımı Firma'ya teslim edilmiş sayılır.</p>

        <p style="margin: 10px 0;">7.2. Firma, Yazılım'ın kendisine lisansı verilen versiyonundan, telif hakları ile
            ilgili ibareleri kaldırmayacak ve Yazılım'a ilişkin telif ve fikri mülkiyet haklarını ihlal etmeyecektir.
        </p>

        <p style="margin: 10px 0;">Firma, Yazılım'ın telif ve sair sınai mülkiyet haklarında işbu Hüküm ve Koşullar'da
            yer alan esaslara uyacağını ve Yazılım üzerinde mülkiyet hakkı iddia edemeyeceğini kabul eder.</p>

        <p style="margin: 10px 0;">7.3. Yazılım'ın kullanım hakkının Firma'ya verilmesi; Firma'ya, (a) Yazılım'ı
            kopyalamasına, derlemesine, dağıtmasına, yayınlamasına, (b) çevirisini yapmasına, (c) kaynak koda
            dönüştürmesine, </p>

        <h2 style="font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 10px;">8. DENETİM</h2>

        <p style="margin: 10px 0;">~kurum_shortname~, senede en az 1 (bir) kere Sözleşme ile işbu Hüküm ve Koşullar kapsamında
            Firma'ya tanımlanan Yazılımların kullanımını denetleyebilecektir. Firma, bu denetimler gerçekleştirilirken
            işbirliği sağlayacağını kabul eder. ~kurum_shortname~ ve/veya ~kurum_shortname~'nin yetkilendireceği bir uzman ve/veya
            şirket tarafından yapılan denetim sonucunda Firma'nın lisans ücretleri ve/veya ~kurum_shortname~ bakım destek
            hizmetleri ile danışmanlık ve uyarlama destek ücretleri hizmeti kapsamında sunulacak servislere ilişkin
            ücretleri eksik ödediğinin ve/veya Firma'nın Yazılım'ı Lisans Belgesi'nde belirtilen modül ve kullanıcı
            miktarlarından fazla kullandığının tespit edilmesi halinde, Firma, söz konusu eksik ücreti ve/veya fazla
            kullanıma ilişkin oluşacak ücret farkını denetimin yapıldığı sırada geçerli olan ~kurum_shortname~ ücretlendirme
            prosedürüne ve usulüne göre ödeyecektir.</p>

        <h2 style="font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 10px;">9. SÖZLEŞMENİN SÜRESİ VE
            FESHİ</h2>

        <ul style="margin-left: 0px;list-style-type:none;">
            <li style="margin: 10px 0;"><strong>9.1.</strong> İşbu Sözleşmenin süresi imzalandığı tarihten itibaren 1 (bir) yıldır. Taraflar
                Sözleşmenin bitmesine en az 30 (otuz) gün kala Sözleşme'yi yenilemeyeceğini yazılı şekilde
                bildirmedikleri takdirde Sözleşme kendiliğinden birer yıllık süreler ile uzar.</li>
                <li style="margin: 10px 0;"></strong> Müşterinin işbu Sözleşmeden doğan borçlarını kısmen veya tamamen yerine
            getirmemesi ve Şirket tarafından yapılan yazılı bildirime rağmen eksikliğin 15 (on beş) gün içinde
            giderilmemesi halinde Şirket işbu Sözleşmeyi haklı sebeple sona erdirebilir.</li>

        <li style="margin: 10px 0;"><strong>9.3.</strong> Şirketin haklı nedenle Sözleşmeyi feshetmesi halinde Sözleşmeden doğan
            alacakların tamamı muaccel olur. Şirketin mevzuat uyarınca talep edebileceği tazminat hakları saklıdır.</li>

        <li style="margin: 10px 0;"><strong>9.4.</strong> Müşteri, Sözleşmeyi 7.1. maddede belirlenen sürenin bitiminden önce feshederek
            Hizmeti sonlandırması halinde, Sözleşme süresinden kalan bakiye Hizmet bedelinin yarısını Şirkete ödemeyi
            peşinen kabul ve taahhüt eder.</li>

        <li style="margin: 10px 0;"><strong>9.5.</strong> Şirket tarafından yeni dönem Hizmet bedellerinin Müşteriye bildirilmemesi
            halinde Sözleşme, Hizmet bedellerinde TÜİK tarafından Hizmet döneminin son ayına ilişkin açıklanan 12 aylık
            ÜFE artışı oranının yüzde on fazlası oranında artış yapılması suretiyle 1 (bir) yıl süreyle yenilenmiş olur.
        </li>
      </ul>

        

        <h2 style="font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 10px;">10. MÜŞTERİNİN PERSONELE
            DAİR YÜKÜMLÜLÜKLERİ</h2>

        <ol style="margin-left: 0px;list-style: none;">
            <li style="margin: 10px 0;"><strong>10.1.</strong> Müşteri, işbu Sözleşme kapsamında verilen hizmetlerde görev yapan Şirket
                personelini işten ayrılmaya teşvik edemez, Şirket personelinden Şirketin bilgisi ve açık yazılı onayı
                olmadan hizmet alamaz.</li>
            <li style="margin: 10px 0;"><strong>10.2.</strong> Müşterinin işbu Sözleşme yürürlükte olduğu süre içinde ve Sözleşmenin her ne
                sebeple olursa olsun sona ermesinden itibaren 1 yıl içinde, Sözleşme süresince hizmet aldığı veya
                almadığı herhangi bir Şirket personelini işe alamaz veya bu kişilerden hizmet alamaz.</li>
            <li style="margin: 10px 0;"><strong>10.3.</strong> Müşteri, bu yükümlülüğünü ihlali halinde, Şirketin söz konusu personele ödemiş
                olduğu en son maaş esas alınarak personelin 12 Aylık Brüt Ücret tutarını, cezai şart bedeli olarak
                Şirkete ödemeyi kabul ve taahhüt etmiştir.</li>
            <li style="margin: 10px 0;"><strong>10.4.</strong> Müşteri; sözleşme kapsamında verilen hizmetleri Şirket'in talimatlarına göre
                kullanmak zorundadır. Hizmetlerin kullanım ve performans değerlerine ilişkin olarak Şirket'in talebi
                halinde kayıtlarını tutmak zorundadır.</li>
            <li style="margin: 10px 0;"><strong>10.5.</strong> Müşteri; Şirket'e yazılı bildirimde bulunmadan ve görüşünü almadan yazılım ve
                sistemlere üçüncü kişilerin müdahale edemeyeceğini kabul, beyan ve taahhüt etmektedir. Aksi halde ortaya
                çıkacak zarar/sorunlardan Şirket sorumlu tutulamayacaktır.</li>
            <li style="margin: 10px 0;"><strong>10.6.</strong> Müşteri, Sözleşme konusu hizmeti kullanırken uygun çalışma ortamını sağlamak
                durumundadır.</li>
            </ol>

        <h2 style="font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 10px;">11. DIJITAL ERP'NİN
            SINIRLI SORUMLULUĞU</h2>

        <ol style=" list-style: none;">
            <li style="margin: 10px 0;"><strong>11.1.</strong> ~kurum_shortname~ AŞAĞIDA BELİRTİLEN DURUMLARDAN DOLAYI ORTAYA ÇIKABİLECEK MADDİ,
                MANEVİ VE HUKUKİ SONUÇLARDAN, KAZANÇ VEYA KAYIPLARDAN SORUMLU OLMAYACAKTIR:</li>
                <li style="margin: 10px 0;">
                    <ol style="list-style-type: lower-alpha; margin-left: 40px;">
            <li style="margin: 10px 0;">~kurum_shortname~ YAZILIMI, YAZILIM, DİJİTALDB VERİTABANI FİRMA'DA KURULU OLAN
                VERSİYONLARINA AİT TANITIM DOKÜMANLARINDA YER ALAN FONKSİYONLARININ KAPSAMI DIŞINDA KALAN KONULARDAN;
            </li>
            <li style="margin: 10px 0;">YAZILIM'IN HATALI KULLANILMASINDAN, ~kurum_shortname~ DESTEĞİ VEYA GARANTİSİ UYARINCA
                SAĞLANAN GÜNCELLEMELER HARİÇ OLMAK ÜZERE ÜÇÜNCÜ TARAF YAZILIMLARININ KULLANILMASINDAN;</li>
            <li style="margin: 10px 0;">KULLANICI KAYNAKLI HATALARDAN, DONANIM, İŞLETİM SİSTEMİ VE DIJITALDB DIŞINDA
                KULLANILACAK VERİ TABANI HATALARINDAN, ~kurum_shortname~ YAZILIMI, YAZILIM, DIJITALDB VERİTABANI FİRMA'NIN ANA
                BİLGİSAYARINA KURULDUKTAN SONRA ANA MEVCUT YAZILIM KODLARINA MÜDAHALE EDİLMESİ VEYA SİLİNMESİNDEN;</li>
            <li style="margin: 10px 0;">FİRMA'NIN ~kurum_shortname~ YAZILIMI, YAZILIM, DİJİTALDB VERİTABANI YANLIŞ VE/VEYA
                MEVCUT HUKUKİ DÜZENLEMELERE AYKIRI OLARAK KULLANMASINDAN</li>
        </ol>
                </li>
                 <li style="margin: 10px 0;"><strong>11.2.</strong> ~kurum_shortname~'NİN AĞIR KUSURUNDAN KAYNAKLANAN ZARARLAR HARİÇ OLMAK ÜZERE; FİRMA'YA
                SUNULAN YAZILIM VEYA ÜRÜN İLE HİZMETLERDEN KAYNAKLANAN VEYA BUNLARLA BAĞLANTILI OLARAK ORTAYA
                ÇIKABİLECEK MADDİ VEYA MANEVİ ZARARLARDA, KAYIPLARDA VE/VEYA TALEPLERDE SORUMLULUĞU; SORUMLULUĞA SEBEP
                OLAN OLAYDAN ÖNCEKİ 12 AYLIK DÖNEM İÇERİSİNDE FİRMA TARAFINDAN ~kurum_shortname~'YE ÖDENEN BAKIM BEDELİ İLE
                SINIRLI OLACAKTIR. ~kurum_shortname~; MALİ SONUÇLARDAN, KAR-KAZANÇ KAYBI GİBİ DOLAYLI ZARARLARDAN, ÖZEL
                ZARARLARDAN VE/VEYA NETİCE ZARARLARINDAN, İŞİN DURMASI, VERİ KAYBI, BİLGİSAYAR ARIZASI, AVUKAT
                ÜCRETLERİ, MAHKEME, FAİZ VE YASAL TAKİP MASRAFLARINDAN SORUMLU OLMAYACAKTIR.</li>
                <li style="margin: 10px 0;"><strong>11.3.</strong> İşbu madde dahilinde ~kurum_shortname~'nin sözleşme gereği yükümlülüklerine ilişkin
                tüm sınırlandırmalar ~kurum_shortname~ ve herhangi bir üyesi için de geçerli olacaktır.</li>
        </ol>
        <h2 style="font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 10px;">12. GİZLİLİK</h2>

        <h3 style="font-size: 14px; font-weight: bold; margin-top: 25px;margin-left:10px; margin-bottom: 10px;">12.1. REKABET VE GİZLİLİK
        </h3>
     <ol style=" list-style: none;">
        <li style="margin: 10px 0;"><strong>12.1.1.</strong> Firma, ~kurum_shortname~ Grup ürünleri, kodları ve bu ürünler ile kodların
            geliştirilmesi için kullanılmış veya bunlarla ilişkili tüm fikirler, yöntemler, algoritmalar, formüller,
            süreçler ve kavramlar, gelecekteki tüm güncellemeler, yükseltmeler ve diğer tüm iyileştirmeler, revizyonlar,
            düzeltmeler, hata düzeltmeleri, hızlı-düzeltmeler, yamalar, modifikasyonlar, genişletmeler, sürümler,
            yükseltmeler ve politika ve veri tabanı güncellemeleri ve/veya bunlara ilişkin diğer güncellemeler, yukarıda
            sayılanlarla sınırlı olmaksızın tüm çalışmaların ~kurum_shortname~'nin gizli bilgisi olduğunu kabul, beyan ve
            taahhüt eder.</li>

        <li style="margin: 10px 0;">  <strong>12.1.2.</strong> Taraflar yukarıdaki bilgiler ile sınırlı olmaksızın işbu sözleşmenin ifası
            sırasında veya herhangi bir surette diğer tarafın işi ve işlemleriyle ilgili olarak öğrendikleri tüm
            bilgileri yasal olarak bilgi istemeye yetkili resmi makamlar dışında hiçbir kişi ya da kuruluşlara
            bildirmeyeceklerini, sır saklama yükümlülükleri olduğunu ve bu bilgileri Sözleşme süresince ve sonrasında
            kesinlikle kendi özel amaçları için ve/veya diğer tarafın rakiplerine karşı kullanmayacaklarını ve
            kullandırmayacaklarını, bu amaç doğrultusunda tüm çalışanlarının ve görevlendirdiği kişilerin de bu
            yükümlülüğe uyması dahil her türlü tedbiri alacaklarını beyan ve taahhüt ederler. Taraflar, işbu Sözleşme ve
            içeriği ile ilgili olarak diğer Taraf'ın yazılı izni olmadıkça yasal merciler ile ~kurum_shortname~'nin grup
            şirketleri dışında üçüncü kişi ve kuruluşlara bilgi ve belge vermeyecek, kamuya ve/veya basına açıklama
            yapmayacaktır.</li>

        <li style="margin: 10px 0;"><strong>12.1.3.</strong> Firma, ~kurum_shortname~'nin, DİJİTAL ERP Yazılım Geliştirme Servis A.Ş.'nin veya
            ~kurum_shortname~'nin web sitesinde İş Ortakları listesinde yer alan ve geçerli bir iş ortaklığı sözleşmesi ile iş
            birliği içinde bulunduğu iş ortaklarının bünyesinde bir iş sözleşmesi ile çalışmakta olan ve iş
            sözleşmesinin sonlanmasının üzerinden bir yıl geçmemiş olan personeli kendi bünyesinde ya da -varsa- grup
            şirketlerinde istihdam etmeyecek ve/veya bu kişilerle iş ilişkisine girmeyecektir. Böyle bir ihlalin tespiti
            durumunda ~kurum_shortname~ tarafından yapılacak yazılı uyarıyı takiben Firma, ilgili personelle iş ilişkisini
            derhal sonlandıracağını, aksi takdirde, ~kurum_shortname~ ya da ilgili iş ortağının uğrayabileceği zararı
            karşılayacağını kabul, beyan ve taahhüt eder.</li>
            </ol>

           <h3 style="font-size: 14px; font-weight: bold; margin-top: 25px;margin-left:10px; margin-bottom: 10px;">12.2. GİZLİLİK
        </h3>

        <ol style=" list-style: none;">
        <li style="margin: 10px 0;"><strong>12.1.1.</strong> Gizli Bilginin Tanımı</strong></li>

        <li style="margin: 10px 0;">Taraflardan birinin kendisi ya da çalışanlarınca diğer tarafın işçileri, ya da
            çalışanlarına açıklanan her türlü bilgi, buluş, iş, metot, ilerleme ve patent, telif hakkı, marka, ticari
            sır yasal korumaya konu olmasa bile diğer her türlü yenilik ve tarafların aralarındaki ticari ilişki
            esasında yazılı ya da sözlü yoldan öğrenecekleri tüm ticari, mali, teknik bilgiler ve konuşma bilgileri
            gizli bilgi olarak kabul edilir.</li>

        <li style="margin: 10px 0;"><strong>12.1.2.</strong> Gizli Bilginin Diğer Tarafça Korunması</strong></li>

        <li style="margin: 10px 0;"> Taraflar ilişkilerinin gerektirdiği ölçüde gizli bilgilerini birbirlerine açıklamak
            durumundadırlar. Taraflardan her biri diğer tarafça kendisine açıklanan gizli bilgilerin eksik ya da hatalı
            olmasından sorumlu tutulamayacaklarını kabul ve taahhüt ederler. Taraflar kendilerine diğer tarafça
            açıklanan bu gizli bilgiyi;</li>
        <ol style="list-style-type: lower-alpha; margin-left: 20px;">
            <li style="margin: 10px 0;">Büyük bir gizlilik içinde korumayı,</li>
            <li style="margin: 10px 0;">Herhangi bir 3. Kişiye hangi suretle olursa olsun vermemeyi,</li>
            <li style="margin: 10px 0;">ISO 27001 Bilgi Güvenliği Yönetim Sistemi Belgesi gereği yükümlülükleri
                korumayı,</li>
            <li style="margin: 10px 0;">Doğrudan ya da dolaylı olarak aralarındaki ticari ilişkinin amaçları dışında
                kullanmamayı taahhüt eder.</li>
        </ol>
        </li>

        <p style="margin: 10px 0;">Taraflar kendi gizli bilgilerini korumakta gösterdikleri özenin aynısını karşı
            tarafın gizli bilgilerini korumakta da göstermeyi kabul ve taahhüt ederler. Taraflar ancak zorunlu hallerde
            ve işi gereği bu bilgiyi, öğrenmesi gereken işçilerine, alt çalışanlarına ve kendilerine bağlı olarak
            çalışan diğer kişilere verebilirler. Ancak bilginin gizliliği hususunda işçilerini, alt çalışanlarını ve
            kendilerine bağlı olarak çalışan diğer kişileri uyarırlar. Taraflar işçilerinin, alt çalışanlarının ve
            kendilerine bağlı olarak çalışan diğer kişilerin işbu sözleşme yükümlülüklerine aykırı davranmayacaklarını
            ve böyle davranmaları halinde doğrudan sorumlu olacaklarını peşinen kabul ve taahhüt ederler.</p>

                <li style="margin: 10px 0;"><strong>12.1.3.</strong>
 Gizli Bilgi Tanımına Girmeyen Bilgiler</strong></li>

        <ol style="list-style-type: lower-alpha; margin-left: 20px;">
            <li style="margin: 10px 0;">Kamuya mal olmuş bilgiler</li>
            <li style="margin: 10px 0;">Yürürlükte olan kanun ya da düzenlemeler ya da verilmiş olan bir mahkeme kararı,
                idari emir gereğince açıklanması gereken bilgiler.</li>
        </ol>

                <li style="margin: 10px 0;"><strong>12.1.4.</strong>
 Münhasır Hak Sahipliği</strong></li>

        <p style="margin: 10px 0;">Taraflardan her biri kendilerine ilişkin gizli bilgiler üzerinde münhasır hak
            sahibidirler.</p>

                <li style="margin: 10px 0;"><strong>12.1.5.</strong>
 Alınması Gereken Önlemler</strong>

        <p style="margin: 10px 0;">Taraflardan biri sorumlu olduğu kişilerce diğer tarafa ait gizli bilgilerin
            sözleşmeye aykırı biçimde açıklandığından haberdar olduğunda, derhal ve yazılı olarak karşı tarafa durumu
            bildirmekle yükümlüdür. Gizli bilgileri sözleşmeye aykırı olarak açıklanmış taraf, bu bildirim üzerine veya
            kendiliğinden masrafları diğer tarafa ait olmak kaydıyla tüm yasal yollara başvurma ve uğradığı her türlü
            zararın giderilmesini diğer taraftan talep etme hakkına sahiptir.</p></li>

       <li style="margin: 10px 0;"><strong>12.1.6.</strong> Gizli Bilgileri İçeren Materyallerin İadesi</strong></li>

        <p style="margin: 10px 0;">Gizli bilgileri içeren her türlü materyal, taraflar arasındaki ticari ilişkinin ya da
            işbu gizlilik sözleşmesinin sona ermesi halinde ve karşı tarafın yazılı ihtarı üzerine, derhal bu bilgilerin
            ait olduğu tarafa iade edilir.</p>

       <li style="margin: 10px 0;"><strong>12.1.7.</strong> Gizli Bilgilerin Açıklanabilmesi</strong></li>

        <p style="margin: 10px 0;">Taraflardan hiçbiri, diğerinin yazılı izni olmaksızın kanunda açıkça belirtilen
            haller dışında bu bilgiyi 3. Kişilere aktaramaz herhangi bir şekilde ya da herhangi bir yolla dağıtamaz,
            basın yayın organları ve medya kuruluşları vasıtasıyla açıklayamaz, reklam amacıyla kullanamaz.</p>

        <li style="margin: 10px 0;"><strong>12.1.8.</strong> Devir ve Süre</strong></li>

        <p style="margin: 10px 0;">İşbu sözleşme imza tarihinden itibaren yürürlüğe girer ve taraflarca müştereken sona
            erdirilmedikçe yürürlükte kalır. Taraflar arasındaki ticari ilişki sona erse dahi işbu sözleşmedeki gizlilik
            yükümlülükleri geçerli olmaya devam edecektir. Bu sözleşme ya da buradaki herhangi bir hak tamamen ya da
            kısmen devredilemez.</p>

        <li style="margin: 10px 0;"><strong>12.1.9.</strong> Uygulanacak Hukuk ve Yetkili Mahkeme</strong></li>

        <p style="margin: 10px 0;">Bu sözleşmenin yorumunda ve işbu sözleşme sebebiyle ortaya çıkacak olan tüm
            uyuşmazlıklarda Ankara Mahkemeleri yetkilidir.</p>

       <li style="margin: 10px 0;"><strong>12.1.10 Kısmi Geçersizlik</strong>

        <p style="margin: 10px 0;">İşbu sözleşme maddelerinden herhangi biri geçersiz sayılır ya da iptal edilirse, bu
            hal sözleşmenin diğer maddelerinin geçerliğine etki etmez.</p></li>

        <li style="margin: 10px 0;"><strong>12.1.11. Sözleşme Değişikliği</strong>

        <p style="margin: 10px 0;">Sözleşme taraflarca daha önce özellikle gizlilik konusunda yapılmış olabilecek yazılı
            ve sözlü tüm sözleşmelerin yerine geçer. Sözleşme değişiklikleri ancak yazılı yapılabilir.</p></li>

                <li style="margin: 10px 0;"><strong>12.1.12. Bildirimler</strong>

        <p style="margin: 10px 0;">Bu sözleşme gereğince çekilen tüm bildirimler işbu sözleşmede belirtilen taraf
            adreslerine yapılır.</p>
        </li>
        </ol>
        <h2 style="font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 10px;">13. FİKRİ MÜLKİYET
            HAKLARI</h2>

        <ol style="margin-left: 20px;">
            <li style="margin: 10px 0;">Firma, işbu Sözleşme'de Firma'ya verilen sınırlı kullanım haklarının kapsamı
                dışında Yazılım dahil olmak üzere ~kurum_shortname~ Grup ürünleri ve materyallerinin fikri mülkiyet hakkına
                ilişkin ihlal gerçekleştiremez ve hiçbir hak, unvan ve kâr işlemi yapamaz.</li>
            <li style="margin: 10px 0;">~kurum_shortname~, Firma nezdinde yapılan her türlü geliştirmeyi ~kurum_shortname~
                yazılımının standart versiyonuna taşıyabilir. Firma, buna ilişkin herhangi bir hak ileri süremeyeceğini
                kabul, beyan ve taahhüt eder.</li>
        </ol>

        <h2 style="font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 10px;">14. MÜCBİR SEBEP</h2>

        <p style="margin: 10px 0;">Taraflardan herhangi biri, kendi kusurundan veya gecikmesinden kaynaklanmayan haller
            dahilinde, yangın, salgın hastalık, pandemi hali, hükümet kısıtlamaları, sel, patlama, savaş, isyan veya
            işgücü eksikliği de dahil olmak üzere; mücbir sebep tarafın makul kontrolünün ötesinde herhangi bir nedenle
            sözleşmesel yükümlülüklerinden herhangi birini erteleyecek veya yerine getiremeyecek ise, mücbir sebep
            kapsamında diğer tarafa olayı yazılı olarak derhal bildirecektir. Her iki Taraf da bir mücbir sebep olayının
            etkisini en aza indirmek için elinden gelen çabayı gösterecektir. İşbu madde, Firma'ya sunulan ürünler ve
            hizmetler için Firma'nın yerine getirmesi gereken ödeme yükümlülüğünü ortadan kaldırmamaktadır.</p>

        <h2 style="font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 10px;">15. SÖZLEŞMENİN DEVRİ VE
            TEMLİK</h2>

        <ol style="margin-left: 20px;">
            <li style="margin: 10px 0;">Firma, işbu Sözleşme'yi ve gerekse işbu Sözleşme'den doğan hak ve alacaklarını
                ~kurum_shortname~'nin yazılı onayı almaksızın üçüncü kişilere devir ve temlik edemez.</li>
            <li style="margin: 10px 0;">~kurum_shortname~ bu sözleşmeyi ve sözleşme kapsamındaki herhangi bir hakkını ya da
                yükümlülüğünü (tamamen veya kısmen) Firma'nın yazılı onayı ile herhangi bir ~kurum_shortname~ üyesine
                devredebilir, yetkilendirebilir, alt yüklenici olarak veya başka türlü aktarabilir. ~kurum_shortname~ ve
                herhangi bir ~kurum_shortname~ üyesi, üçüncü tarafları bu Sözleşme kapsamındaki haklarını ve yükümlülüklerini
                yerine getirme konusunda alt yükleniciler olarak kullanabilir.</li>
        </ol>

        <h2 style="font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 10px;">16. VERİLERİN KORUNMASI
        </h2>

 <ul  style="list-style: none;">
        <li style="margin: 10px 0;"><strong>16.1.</strong> Taraflar, İşbu Sözleşmede yer alan hak ve yükümlülüklerinin
            kullanılması ve yerine getirilmesi esnasında diğer Tarafın aktardığı veya diğer Taraf adına elde ettikleri
            kişisel verilerin işlenmesine ilişkin tüm faaliyetlerinin, 6698 sayılı Kişisel Verilerin Korunması Kanunu
            ("6698 Sayılı Kanun"), ilgili mevzuat, Kişisel Verileri Koruma Kurul Kararları ile her türlü ilgili yasal
            düzenlemeye uygun olacağını kabul, beyan ve taahhüt eder.</li>
        <li style="margin: 10px 0;"><strong>16.2.</strong> Taraflar, diğer Tarafa aktarılacak kişisel verilerin veri
            sahibinin 6698 Sayılı Kanun'da yer alan usul ve esaslar ile ilgili mevzuata uygun olarak aydınlatıldığını ve
            açık rızasının elde edildiğini; yine bu usul ve esaslara uygun olarak bu verileri işlediğini ve aktardığını
            kabul, beyan ve taahhüt eder.</li>

        <li style="margin: 10px 0;"><strong>16.3.</strong> Taraflar, diğer Tarafça kendisine aktarılan veya diğer Taraf
            adına elde edilen kişisel verileri, işbu Sözleşme konusu hizmetlerin gerçekleştirilmesi dışında üçüncü
            kişilere aktarılmasından, silinmesinden, yok edilmesinden anonim hale getirilmesinden münferiden veri
            sorumlusu sıfatı ile sorumludur. Firma Kapsamda ~kurum_shortname~'nin herhangi bir sorumluluğu bulunmadığını kabul
            eder.</li>
        <li style="margin: 10px 0;"><strong>16.4.</strong> Taraflar, işledikleri kişisel verilerin hukuka aykırı olarak
            işlenmesini ve bu verilere yetkisiz veya hukuka aykırı olarak erişilmesini önlemeye yönelik gerekli teknik
            ve idari önlemleri almayı kabul, beyan ve taahhüt eder.</li>



            <li style="margin: 10px 0;"><strong>16.5.</strong> Kişisel verilerin saklanmasına ilişkin kanuni yükümlülükler saklı kalmak
                kaydıyla, kişisel verilerin işlenmesine esas teşkil eden işbu Sözleşmenin son bulması halinde Taraflar,
                diğer Tarafça kendisine aktarılmış olan veya diğer Taraf adına elde edilen kişisel verileri siler veya
                anonimleştirir.</li>
            <li style="margin: 10px 0;"><strong>16.6.</strong> Veri sahibi tarafından, kişisel verilerine ilişkin olarak 6698 Sayılı Kanun'un
                11. Maddesi veya ilgili mevzuat uyarınca şikâyette bulunulması halinde, Taraflar 3 (üç) iş günü
                içerisinde diğer Tarafa yazılı bildirimde bulunur. Bu halde taraflar, diğer Tarafı bilgilendirip
                görüşünü almadan veri sahibine herhangi bir yanıt veya bilgi vermeyeceğini kabul beyan ve taahhüt eder.
            </li>

        <li style="margin: 10px 0;"><strong>16.7.</strong> Taraflardan birinin, 6698 Sayılı Kanun ve ilgili mevzuatta
            veya işbu Sözleşmede yer alan taahhüt veya yükümlülüklerini yerine getirmemesi veya başka bir sebeple diğer
            Tarafı; personellerini; Kişisel Veri Sahibini ya da üçüncü şahısları zarara uğratması halinde, kusuru veya
            ihmali ile zarara sebebiyet veren taraf, karşı tarafın ve ilgililerin uğradığı bu zararlardan sorumludur.
            Zarara sebebiyet veren Taraf, diğer Tarafça dayanaklarıyla ispat edilmiş doğrudan zararı derhal ve defaten
            ödeyeceğini, aksi takdirde, bu zararın diğer Taraf nezdindeki alacaklarından veya teminatlarından mahsup
            edileceğini kabul, beyan ve taahhüt eder.</li>

        <li style="margin: 10px 0;"><strong>16.8.</strong> İşbu Sözleşmenin kişisel verilerin korunması ile ilgili
            hükümleri Sözleşmenin herhangi bir sebeple sona ermesi veya feshedilmesinden sonra da yürürlükte kalır.</li>
 </ul>

        <h2 style="font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 10px;">17. TEBLİGAT</h2>

        <ol style="margin-left: 20px;">
            <li style="margin: 10px 0;">İşbu Sözleşmede belirtilen adreslere yapılan tebligatlar; bir Tarafın adres
                değişikliğini diğer tarafa noter aracılığı ile yazılı olarak tebliğ edilmedikçe, Türk Hukukundaki
                tebligatlarla ilgili yasal düzenlemeler uyarınca geçerli ve bağlayıcı olarak kabul edilir.</li>
            <li style="margin: 10px 0;">İşbu Sözleşme ile kurulan ticari faaliyetin sürdürülmesi bakımından, Müşterinin
                aşağıda yazılı olan elektronik posta adreslerine gönderilecek iletiler yazılı bildirim olarak kabul
                edilir. Sözleşmenin feshine ilişkin ihtar ve bildirimlerin noter aracılığıyla gönderilmesi zorunludur.
            </li>
        </ol>

        <h2 style="font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 10px;">18. DİJİTAL PLATFORMLARDA
            YAPILAN İŞLEMLER</h2>

         <ul  style="list-style: none;">
        <li style="margin: 10px 0;"> <strong>18.1.</strong> Şirkete ait veya Şirketin kullandığı dijital platformlar üzerinde Müşterinin
            kullanıcı bilgileri ve şifresi kullanılarak yapılan tüm iş ve işlemler Müşteri tarafından gerçekleştirilmiş
            kabul edilir.</li>

        <li style="margin: 10px 0;"><strong>18.2.</strong> Müşteri, Şirkete ait veya Şirketin kullandığı dijital platformlar üzerinde
            kendi personeli veya üçüncü kişiler tarafından kendisine ait kullanıcı bilgileri ve şifre ile yapılan
            işlemlerden haberdar olmadığını veya bu işlemlere rıza ve onayı olmadığını ileri süremez.</li>
        </ul>
        <h2 style="font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 10px;">19. BÜTÜNLÜK</h2>

         <ul  style="list-style: none;">
        <li style="margin: 10px 0;"> <strong>19.1.</strong> İşbu Sözleşme ve ileride bu Sözleşmeye ek olarak akdedilecek belgeler, Taraflar
            arasındaki bütün bir sözleşmeyi teşkil eder ve bundan önce işbu Sözleşmenin konusu bakımından taraflar
            arasında yapılmış olan tüm mutabakatları sonlandırır ve onların yerine geçer.</li>

        <li style="margin: 10px 0;"><strong>19.2.</strong> İşbu Sözleşme ile ilgili ekleme ve değişiklikler yazılı olarak veya Şirketin
            Müşteriye sunduğu dijital platformlar üzerinden onaylanabilir.</li>

        <li style="margin: 10px 0;"><strong>19.3.</strong> Taraflar, işbu Sözleşmeyi takiben ve Sözleşmenin yetkisine dayanarak yapılan
            dijital onaylamaların, eklerin, yeni Sözleşme ve düzenlemelerin, bu düzenlemelerin yazılı olarak düzenlenip
            taraflarca usulüne uygun olarak imzalanması ile aynı sonuçları doğuracağı konusunda mutabıktırlar.</li>
        </ul>
        <h2 style="font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 10px;">20. AYRILABİLİRLİK</h2>

        <ol style="margin-left: 0px;">
            <li style="margin: 10px 0;">İşbu Sözleşmede yer alan herhangi bir hüküm veya kuralın tatbik edilemez olduğu
                anlaşılır veya herhangi bir sebeple hükümsüz kılınırsa, diğer hüküm ve kurallar yürürlükte kalmaya devam
                eder.</li>
            <li style="margin: 10px 0;">Herhangi bir geçersiz veya uygulanamaz hüküm; üzerinde değişiklik yapılarak,
                geçerli, uygulanabilir veya yasal hale gelecekse bu hüküm, söz konusu hükmü yasal, geçerli veya
                uygulanabilir kılmak için gereken en az düzeyde değişiklik yapılarak uygulanacaktır.</li>
            <li style="margin: 10px 0;">Taraflar işbu Sözleşmenin tam olarak yürürlükte olabilmesi için makul çabayı
                sarf edeceklerdir.</li>
        </ol>

        <h2 style="font-size: 16px; font-weight: bold; margin-top: 25px; margin-bottom: 10px;">21. DİĞER HÜKÜMLER</h2>

        <ol style="margin-left: 0px;">
            <li style="margin: 10px 0;">İşbu Sözleşme imzalandığı tarihte yürürlüğe girer.</li>
            <li style="margin: 10px 0;">Sözleşmenin Gizlilik yükümlülüğüne, Müşterinin Personele Dair Yükümlülüklerine
                ve Kişisel Verilerin Korunmasına dair hükümleri Sözleşmenin sona ermesinden sonra da yükümlülükte kalır.
            </li>
            <li style="margin: 10px 0;">Taraflar, bu sözleşmeden doğan anlaşmazlıklarda Şirket'in ticari kayıt ve
                defterlerinin kesin delil teşkil edeceğini, bu kayıt ve defterlere hiçbir şekilde itiraz etmeyeceğini ve
                bunlar dışında delil sunmayacağını kabul beyan ve taahhüt eder.</li>
            <li style="margin: 10px 0;">Beklenmeyen bir enflasyon ortamında veya yıl içerisinde asgari ücret değişikliği
                halinde Şirket, Müşteri ile karşılıklı görüşerek sözleşme bedelini güncelleme hakkını saklı tutar.</li>
            <li style="margin: 10px 0;">Sözleşmeden doğacak damga vergisi Müşteri tarafından ödenir. Müşteri damga
                vergisi ödeme makbuzunun bir kopyasını Şirkete iletir. Şirketin herhangi bir sebeple işbu Sözleşmeye
                ilişkin damga vergisi ödemek zorunda kalması halinde yapılan bu ödeme Şirketin ilk yazılı talebi üzerine
                Müşteri tarafından nakden ve defaten Şirkete ödenir.</li>
            <li style="margin: 10px 0;">İşbu Sözleşmede Türk Hukuku uygulanır.</li>
            <li style="margin: 10px 0;">İşbu Sözleşmeden doğabilecek uyuşmazlıklarda Ankara Adliyesinde bulunan
                Mahkemeler ve İcra Daireleri yetkilidir.</li>
            <li style="margin: 10px 0;">Farklı bir firmadan Lem güncellemesi yapılması halinde oluşabilecek sorunlardan
                ~kurum_shortname~ sorumlu değildir.</li>
            <li style="margin: 10px 0;">İşbu Sözleşme iki (2) asıl kopya halinde düzenlenmiş,
                <strong>~sozlesme_tarihi~</strong> tarihinde Taraflarca imza altına alınmış ve her bir tarafa imzalı birer
                sureti teslim edilmiştir.</li>
        </ol>

        <div style="margin-top: 40px; display: flex; justify-content: space-between;">
            <div style="text-align: center; width: 45%;">
                <p style="margin: 10px 0; font-weight: bold;">~kurum~</p>
                <p style="margin: 30px 0;">KAŞE-İMZA</p>
            </div>
            <div style="text-align: center; width: 45%;">
                <p style="margin: 10px 0; font-weight: bold;">~sirket~</p>
                <p style="margin: 30px 0;">KAŞE-İMZA</p>
            </div>
        </div>
    </div>`;
    export const nda_contract_template=`
    <div
        style="box-sizing: border-box; max-width: 210mm; margin: 0 auto; font-family:  Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.2; color: #000;">

        <div style="display:flex; justify-content:space-between; align-items:center; border:1px solid;">
            <div style="display:flex; flex-direction:column; align-items:center; justify-content:center;width: 75%;">

                <h1 style=" font-size:14pt; font-weight:bold;">
                    NDA GİZLİLİK ANLAŞMASI
                </h1>
            </div>

            <table style="font-size: 10px; border-left: 2px solid;width: 25%;padding:5px">
                <tr>
                    <td>Doküman No:</td>
                    <td>~sozlesme_no~</td>
                </tr>
                <tr>
                    <td>Tarih:</td>
                    <td>~sozlesme_tarihi~</td>
                </tr>
                <tr>
                    <td>Rev:</td>
                    <td>00</td>
                </tr>
                <tr>
                    <td>Rev. Tar.:</td>
                    <td>-</td>
                </tr>
                <tr>
                    <td>Ek:</td>
                    <td>5</td>
                </tr>
            </table>
        </div>
        <div style="  position: relative; padding-bottom: 40px;">
            <p style="text-align: left; margin-bottom: 20px;"><strong>Sayı:</strong></p>

            <h1 style="text-align: center; font-size: 14pt; font-weight: bold; margin: 30px 0;">~kurum~</h1>

            <h1 style="text-align: center; font-size: 14pt; font-weight: bold; margin: 20px 0;">İLE</h1>

            <h1 style="text-align: center; font-size: 14pt; font-weight: bold; margin: 20px 0;">~sirket~</h1>

            <h1 style="text-align: center; font-size: 14pt; font-weight: bold; margin: 20px 0;">ARASINDA</h1>
            <h1 style="text-align: center; font-size: 14pt; font-weight: bold; margin: 30px 0;">GİZLİLİK
                ANLAŞMASI<br>NON-DISCLOSURE AGREEMENT</h1>

            <p style="text-align: justify; margin: 20px 0;"><strong>~kurum_adres~</strong> adresinde
                yerleşik ve Türkiye Cumhuriyeti yasaları uyarınca kurulmuş <strong>~kurum~</strong>
                (bundan böyle <strong>"~kurum_shortname~"</strong> olarak anılacaktır) ile
                <strong>~sirket_adres~</strong>
                adresinde yerleşik ve Türkiye Cumhuriyeti yasaları uyarınca kurulmuş
                <strong>~sirket~</strong> (bundan böyle
                <strong>"~firmaKisaAd~"</strong> olarak anılacaktır) arasında (her ikisi de tek tek "Taraf" veya
                birlikte "Taraflar" olarak anılacaktır) akdedilen,
            </p>

            <h3 style="font-size: 12pt; font-weight: bold; margin: 20px 0;">İşbu Anlaşma;</h3>

            <p style="text-align: justify; margin: 15px 0;">Tarafların <strong>"~sozlesme_adi~"</strong> Projesi
                (bundan böyle <strong>"Proje"</strong> olarak anılacaktır) kapsamında yapacakları çalışmalarda
                birbirlerine açıklayacakları gizlilik dereceli bilgilerin değişiminin düzenlenmesi ve açıklanan
                bilgilerin korunmasına yönelik hak ve yükümlülüklerin belirlenmesi amacıyla düzenlenmiştir.</p>

            <p style="text-align: justify; margin: 15px 0;">Yukarıda belirtilen amaç doğrultusunda, Taraflar aşağıdaki
                hususlarda anlaşmaya varmışlardır:</p>

            <ol style="text-align: justify; margin: 15px 0; padding-left: 25px;">
                <li style="margin-bottom: 15px;">Bu Anlaşma, Proje kapsamında yapılması gereken çalışmaların
                    sürdürülebilmesi için Taraflar arasında değişimi yapılacak olan gizlilik dereceli bilgilerin
                    kullanılması ve korunması konusunda, her iki Tarafın yükümlülüklerini belirler. Ancak; bu Anlaşma
                    Tarafları, herhangi bir doküman ve/veya bilgiyi birbirlerine ifşa etmek yükümlüğüne sokmaz.</li>

                <li style="margin-bottom: 15px;">Bu Anlaşmada kullanılan "Gizli Bilgi" terimi ile, açıklayan Tarafça
                    diğer Tarafa verilen ve üzerinde açıklayan Tarafça konulmuş "Çok Gizli", "Gizli", "Ticari Gizli",
                    "Hizmete Özel" veya benzeri uyarılar bulunan ve bunlarla sınırlı olmamak üzere; açıklayan Tarafın
                    sahip olduğu Sistem üzerinde bilgi İşleme ait bilgi ve programları, firmaya ait tasarım bilgilerini,
                    teknik bilgileri, ticari sırları, fikirleri ve buluşları içeren her türlü yazılı bilgi, belge,
                    yazılım vb. kastedilecektir. Ayrıca; sözlü, görsel, örnekler veya modeller ile açıklanan (yazılı
                    olmayan) ve gizlilik derecesi olan bilgiler ve/veya açıklayan Tarafça diğer Tarafa verilebilecek
                    cihazların veya komponentlerinin incelenmesi, test edilmesi ve benzeri yöntemlerin kullanılması
                    sureti ile edinilebilecek gizlilik dereceli bilgiler bundan böyle "Gizli Bilgi" olarak anılacaktır
                    ve bu Anlaşma kapsamında işlem görecektir. Gizli Bilgi'nin sözlü olarak açıklanması durumunda ise
                    açıklama esnasında Gizli Bilgi'nin bilginin gizlilik dereceli olduğu belirtilecek ve ayrıca bu durum
                    onbeş (15) gün içinde yazılı olarak teyit edilecektir. Anlaşma kapsamındaki yükümlülükler bahse konu
                    on beş (15) günlük süre içerisinde de geçerli olacaktır.</li>
                <li style="margin-bottom: 15px;">Bu Anlaşmaya göre değişimi yapılacak bilgilerin teslim alınması ve
                    kontrol altında tutulması amacı ile her iki tarafça tayin edilen temas noktaları aşağıda
                    verilmiştir.
                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0; ">
                        <tr>
                            <td colspan="2" style=" padding: 8px;"><strong>~kurum_shortname~</strong>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style=" padding: 8px;"><strong>~kurum_adres~</strong></td>
                        </tr>
                    </table>
                    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                        <tr>
                            <td style=" padding: 8px; width: 15%;"><strong>İsim</strong></td>
                            <td style=" padding: 8px; width: 2%;"><strong>:</strong></td>
                            <td style=" padding: 8px; width: 33%;">~personelAdi~ ~personelSoyadi~</td>
                            <td style=" padding: 8px; width: 15%;"><strong>İsim</strong></td>
                            <td style=" padding: 8px; width: 2%;"><strong>:</strong></td>
                            <td style=" padding: 8px; width: 33%;"></td>
                        </tr>
                        <tr>
                            <td style=" padding: 8px;"><strong>Unvan</strong></td>
                            <td style=" padding: 8px;"><strong>:</strong></td>
                            <td style=" padding: 8px;">~personelGorevi~</td>
                            <td style=" padding: 8px;"><strong>Unvan</strong></td>
                            <td style=" padding: 8px;"><strong>:</strong></td>
                            <td style=" padding: 8px;"></td>
                        </tr>
                        <tr>
                            <td style=" padding: 8px;"><strong>Telefon No</strong></td>
                            <td style=" padding: 8px;"><strong>:</strong></td>
                            <td style=" padding: 8px;">~telefonNo~</td>
                            <td style=" padding: 8px;"><strong>Telefon No</strong></td>
                            <td style=" padding: 8px;"><strong>:</strong></td>
                            <td style=" padding: 8px;"></td>
                        </tr>
                        <tr>
                            <td style=" padding: 8px;"><strong>Faks No</strong></td>
                            <td style=" padding: 8px;"><strong>:</strong></td>
                            <td style=" padding: 8px;">~telefonNo~</td>
                            <td style=" padding: 8px;"><strong>Faks No</strong></td>
                            <td style=" padding: 8px;"><strong>:</strong></td>
                            <td style=" padding: 8px;"></td>
                        </tr>
                        <tr>
                            <td style=" padding: 8px;"><strong>E-Mail</strong></td>
                            <td style=" padding: 8px;"><strong>:</strong></td>
                            <td style=" padding: 8px;">~ePosta~</td>
                            <td style=" padding: 8px;"><strong>E-Mail</strong></td>
                            <td style=" padding: 8px;"><strong>:</strong></td>
                            <td style=" padding: 8px;"></td>
                        </tr>
                        <tr>
                            <td style=" padding: 8px;"><strong>İmza</strong></td>
                            <td style=" padding: 8px;"><strong>:</strong></td>
                            <td style=" padding: 8px;"></td>
                            <td style=" padding: 8px;"><strong>İmza</strong></td>
                            <td style=" padding: 8px;"><strong>:</strong></td>
                            <td style=" padding: 8px;"></td>
                        </tr>
                    </table>
                    <p style="text-align: justify; margin: 20px 0; padding-left: 20px;">Taraflar, bu Anlaşma kapsamında
                        değişimi yapılacak bilgileri kendi kuruluşunda teslim almaya yetkili olan şahsı diğer Tarafa
                        yazılı ihbarda bulunmak suretiyle değiştirme hak ve yetkisine sahip olacaktır. Yukarıda isimleri
                        belirtilen yetkililer arasında değişimi yapılacak Gizli Bilgi, posta/kurye sistemi, herhangi bir
                        yazılı ya da basılı doküman, elektronik ortam, örnek, model olarak veya Tarafların bu Anlaşma
                        süresince tercih edeceği başka bir yöntemle aktarılabilecektir.</p>

                </li>
                <li style="margin-bottom: 15px;">Taraflar;
                    <ol type="a" style="margin-top: 10px; padding-left: 20px;">
                        <li style="margin-bottom: 10px;">Gizli Bilgi'yi sadece Proje amaçları için ve diğer Tarafça
                            açıklanma amacına uygun olarak kullanmayı,</li>
                        <li style="margin-bottom: 10px;">Gizli Bilgi'yi konuyla ilgili olmaları şartıyla "Bilmesi
                            Gereken" prensibine göre kendi personeline bu Anlaşma şartlarına uymalarını sağlamak sureti
                            ile vermeyi,</li>
                        <li style="margin-bottom: 10px;">Gizli Bilgi'yi, Gizli Bilgi'yi veren tarafın onayı olmadan
                            hissedarları, bağlı şirketleri ve yan kuruluşları dahil olmak üzere üçüncü şahıslara
                            açıklamamayı,</li>
                        <li style="margin-bottom: 10px;">Bu Anlaşmanın amaçlarının yerine getirilmesi için gerekli olan
                            haller dışında, Gizli Bilgi'yi tamamen veya kısmen herhangi bir şekilde kopyalamamayı veya
                            çoğaltmamayı; eğer diğer Tarafın yazılı onayı ile tamamen veya kısmen kopyalamış veya
                            çoğaltmışsa, kopyalanmış veya çoğaltılmış nüshaların üzerinde orijinal metnin üzerinde
                            bulunanlara eşdeğer kısıtlayıcı bir ibarenin olmasını,</li>
                        <li style="margin-bottom: 10px;">Diğer Tarafa ait Gizli Bilgi'yi ihtiva eden veya kullanan ya da
                            Gizli Bilgi'den istifade eden cihazları doğrudan veya dolaylı yoldan imal etmemeyi,
                            yurtiçinde veya yurtdışında satmamayı veya başkasına imal ettirmemeyi,</li>
                        <li style="margin-bottom: 10px;">Bu Anlaşma hükümlerine uygun olarak, Gizli Bilgi'nin
                            aktarıldığı kuruluş, alt yüklenici ya da diğer üçüncü taraflar da Gizli Bilgi'nin saklanması
                            ve açıklanması ile ilgili olarak aynı sınırlamalara bağlı olacağını ve bu koşulun sağlanması
                            sorumluluğunun Gizli Bilgi'yi alan Taraf'a ait olacağını,</li>
                    </ol>
                    <p style="margin: 15px 0; padding-left: 20px;">kabul ve taahhüt eder.</p>

                </li>
                <li style="margin-bottom: 15px;">Eğer Taraflarca açıklanan Gizli Bilgi,
                    <ol type="a" style="margin-top: 10px; padding-left: 20px;">
                        <li style="margin-bottom: 10px;">Alındıkları tarihte, bilgiyi alan Tarafça biliniyorsa ve bu
                            durum yeterli belge(ler) ile kanıtlanabiliyorsa veya</li>
                        <li style="margin-bottom: 10px;">Gizli Bilgi'yi alan Tarafın bu bilgilerden haberdar olmayan
                            personelince bağımsız olarak geliştirilmişse ve bu durum yeterli belge(ler) ile
                            kanıtlanabiliyorsa veya</li>
                        <li style="margin-bottom: 10px;">Kamu tarafından o sırada biliniyorsa veya alan Tarafın hiçbir
                            kusuru olmaksızın kamuya daha sonra bildirilmişse veya</li>
                        <li style="margin-bottom: 10px;">Benzer kısıtlamalar olmaksızın ve bu Anlaşmayı ihlal
                            etmeksizin, üçüncü bir şahıstan, üçüncü şahsın Gizli Bilgi'sini ifşa etmeme yükümlülüğü
                            altında olmadığına ilişkin gerekli tüm araştırma ve incelemelerin yerine getirilmesini
                            müteakip, kanuni bir şekilde alınmışlarsa ve bu durum yeterli belge(ler) ile
                            kanıtlanabiliyorsa veya</li>
                        <li style="margin-bottom: 10px;">Gizli Bilgi'yi alan Tarafın, Hükümetine ve/veya kanuni
                            görevlerini ifa etmekte olan kendi ülkelerinin devlet memurlarına veya kurumlarına veya
                            yargı makamlarına kanunlar çerçevesi içinde açıklanması gerekli ise, Gizli Bilgi'yi veren
                            Tarafı önceden yazılı olarak bilgilendirmek ve Gizli Bilgi'yi alan Tarafın talebi üzerine,
                            bu gibi bir ifşayı tartışmak ve en uygun alternatif koruma çözümü bulmak üzere işbirliğinde
                            bulunmak suretiyle veya yayınlanmaları veya kullanılmaları açıklayan Tarafın yazılı izni ile
                            onaylanmışsa alan Taraf için Madde 4 kapsamındaki kısıtlamalar geçerli olmayacaktır.</li>
                    </ol>
                </li>
                <li style="margin-bottom: 15px;">Alan Taraf Gizli Bilgi'yi, en az kendisine ait olan ve aynı derecede
                    önemli Gizli Bilgi'yi korumak için sarf ettiği itinayı gösterecektir.</li>

                <li style="margin-bottom: 15px;">Taraflar, bu Anlaşma kapsamında ve özellikle bu Anlaşmaya göre elde
                    edilen Gizli Bilgi'nin korunmasına ilişkin yükümlülüklerinden herhangi birini ihlal etmesi durumunda
                    ihlal eden Taraf, meydana gelebilecek zarar ve ziyanı karşılamakla yükümlü olacaktır. Ayrıca;
                    <ol type="a" style="margin-top: 10px; padding-left: 20px;">
                        <li style="margin-bottom: 10px;">Bu bilgilerin açıklandığının veya kullanıldığının ortaya
                            çıkması halinde alan Taraf daha başka açıklama yapılmasını veya kullanımı önlemek için
                            gayret sarf edecektir.</li>
                        <li style="margin-bottom: 10px;">Alan Taraf açıklayan Tarafa o sıradaki mevcut şartları derhal
                            bildirecek ve açıklayan Tarafça talep edilen tüm düzeltici önlemleri uygulamaya koyacaktır.
                        </li>
                    </ol>
                </li>

                <li style="margin-bottom: 15px;">Bu Anlaşma kapsamında açıklanan Gizli Bilgilerde bulunan herhangi bir
                    hata ya da eksiklik nedeniyle veya bu bilgilerin kullanılması sonucu, kullanan Tarafın cihaz, araç,
                    gereçlerinde, personelinde ve/veya üçüncü şahıslarda meydana gelebilecek zarar ve hasar dolayısı ile
                    açıklayan Taraf sorumlu tutulmayacaktır.</li>

                <li style="margin-bottom: 15px;">Bu Anlaşmada yer alan hiçbir hüküm herhangi bir fikri ve/veya sınaî
                    mülkiyet hakkına ilişkin olarak açıkça veya zımnen herhangi bir hakkın verildiği şeklinde
                    yorumlanmayacaktır.</li>
                <li style="margin-bottom: 15px;">Bu Anlaşma, Tarafların yazılı mutabakatı ile uzatılmadığı takdirde,
                    Taraflarca imzalandığı tarihten itibaren 5 (Beş) yıl süre ile yürürlükte kalacaktır. Ancak,
                    Taraflardan her biri diğer Tarafa 30 (Otuz) takvim günü önceden yazılı ihbarda bulunarak bu
                    Anlaşmayı sona erme tarihinden önce feshedebilir.</li>

                <li style="margin-bottom: 15px;">Bu Anlaşma burada belirtildiği üzere feshedildiği veya sona erdiği
                    takdirde, Taraflar diğer Tarafa ait Gizli Bilgilerin kullanımına derhal son verecek, açıklayan
                    Tarafa ait olan ve diğer Tarafın elinde bulunan tüm Gizli Bilgiler ve belgelerin kopyaları,
                    açıklayan Tarafın talebi halinde iade edilecek veya açıklayan Tarafın belirteceği şekilde imha
                    edilecektir ve imha edildiğine dair belge ibraz edilecektir.</li>

                <li style="margin-bottom: 15px;">Bu Anlaşmanın feshedilmesi veya sona ermesi, sona erme veya fesih
                    tarihinden önce alınmış bilgilerin korunmasıyla ilgili olarak madde 4 ve 5'de yer alan Taraflara
                    yüklenen yükümlülükleri ortadan kaldırmayacaktır.</li>

                <li style="margin-bottom: 15px;">Bu Anlaşma; burada açıklanan hükümler haricinde, Taraflara herhangi bir
                    hak ve yükümlülük getirmez, ayrıca; Tarafların ortak girişim, ortaklık veya resmi mahiyette başka
                    bir işin kurulmasını amaçladığı, birlikte çalışacakları veya gelecekte başka bir sözleşme yapılacağı
                    şeklinde yorumlanamaz.</li>

                <li style="margin-bottom: 15px;">Bu Anlaşma Tarafların aynı veya benzer konularda üçüncü şahıslarla
                    benzer anlaşmalar yapmalarına engel teşkil etmez.</li>

                <li style="margin-bottom: 15px;">Taraflar, bu Anlaşma kapsamında gerçekleştireceği çalışmalar için
                    yapması gerekebilecek harcamaları diğer Taraftan talep etmemeyi kabul eder. Bu Anlaşma kapsamında
                    herhangi bir faaliyet için ödeme talep edilirse, şart ve koşulları Tarafların mutabakatı ile ayrı
                    bir sözleşme ile belirlenebilir.</li>

                <li style="margin-bottom: 15px;">Bicinet tarafından maliyet veya teklif alabilmek için gönderilen teknik
                    resim veya doküman üçüncü bir şahıs ile paylaşılamaz.</li>

                <li style="margin-bottom: 15px;">Bu Anlaşmanın yorum ve icrasından doğabilecek anlaşmazlıklar karşılıklı
                    müzakereler yolu ile çözülmeye çalışılacak, çözülemeyen bütün anlaşmazlıklarda T.C. kanunları
                    uygulanacak olup, anlaşmazlıklara Ankara Mahkemeleri ve İcra Daireleri bakmaya yetkili olacaktır.
                </li>

                <li style="margin-bottom: 15px;">Hakları Bicinet'e ait olup, üretim yapılması maksadıyla karşı firmaya
                    Bicinet tarafından teknik veri setleri sağlanan ürün ve teknik verileri ticari vb. faaliyetler
                    kapsamında herhangi bir fuar veya tanıtım organizasyonunda sergilenemez.</li>

                <li style="margin-bottom: 15px;">Yukarıdaki Maddeler Taraflar arasındaki Anlaşmanın tümünü teşkil
                    etmekte olup, bu Anlaşmanın konusuna ilişkin olarak daha önce sözlü veya yazılı olarak yapılmış olan
                    her türlü anlaşmanın, taahhüdün, mutabakatın yerine geçer. Bu Anlaşmada değişiklik ancak Tarafların
                    yazılı mutabakatı ile yapılabilir ve değişiklik ancak tarafların yetkili temsilcilerinin imzası ile
                    yürürlüğe girer.</li>
            </ol>
            <p style="text-align: justify; margin: 30px 0 20px 0;">Yukarıdaki hususları teyiden, bu Anlaşma Tarafların
                yetkililerince / / tarihinde, on dokuz (19) Madde ve iki (2) nüsha olarak imzalanmış ve yürürlüğe
                girmiştir.</p>
            <table style="width: 100%; border-collapse: collapse; margin: 30px 0;">
                <tr>
                    <td style=" padding: 8px; " colspan="3"><strong>~kurum_shortname~</strong></td>
                    <td style=" padding: 8px; " colspan="3"><strong>~firmaKisaAd~</strong></td>

                </tr>
                <tr>
                    <td style=" padding: 8px;width: 15%;"><strong>İsim</strong></td>
                    <td style=" padding: 8px;width: 2%; "><strong>:</strong></td>
                    <td style=" padding: 8px;width: 33%;">~personelAdi~ ~personelSoyadi~</td>
                    <td style=" padding: 8px;width: 15%;"><strong>İsim</strong></td>
                    <td style=" padding: 8px;width: 2%; ">:</td>
                    <td style=" padding: 8px;width: 33%;"></td>
                </tr>
                <tr>
                    <td style=" padding: 8px;"><strong>Unvan</strong></td>
                    <td style=" padding: 8px;"><strong>:</strong></td>
                    <td style=" padding: 8px;">~personelGorevi~</td>
                    <td style=" padding: 8px;"><strong>Unvan</strong></td>
                    <td style=" padding: 8px;"><strong>:</strong></td>
                    <td style=" padding: 8px;"></td>
                </tr>
                <tr>
                    <td style=" padding: 8px;"><strong>İmza</strong></td>
                    <td style=" padding: 8px;"><strong>:</strong></td>
                    <td style=" padding: 8px;"></td>
                    <td style=" padding: 8px;"><strong>İmza</strong></td>
                    <td style=" padding: 8px;"><strong>:</strong></td>
                    <td style=" padding: 8px;"></td>
                </tr>
            </table>
             <table style="width: 100%; border-collapse: collapse; margin: 50px 0;">
                <tr>
                    <td style=" padding: 8px; " colspan="3"><strong>~kurum_shortname~</strong></td>
                    <td style=" padding: 8px; " colspan="3"><strong>~firmaKisaAd~</strong></td>
                </tr>
                <tr>
                    <td style=" padding: 8px;width: 15%;"><strong>İsim</strong></td>
                    <td style=" padding: 8px;width: 2%; "><strong>:</strong></td>
                    <td style=" padding: 8px;width: 33%;"></td>
                    <td style=" padding: 8px;width: 15%;"><strong>İsim</strong></td>
                    <td style=" padding: 8px;width: 2%; ">:</td>
                    <td style=" padding: 8px;width: 33%;"></td>
                </tr>
                <tr>
                    <td style=" padding: 8px;"><strong>Unvan</strong></td>
                    <td style=" padding: 8px;"><strong>:</strong></td>
                    <td style=" padding: 8px;"></td>
                    <td style=" padding: 8px;"><strong>Unvan</strong></td>
                    <td style=" padding: 8px;"><strong>:</strong></td>
                    <td style=" padding: 8px;"></td>
                </tr>
                <tr>
                    <td style=" padding: 8px;"><strong>İmza</strong></td>
                    <td style=" padding: 8px;"><strong>:</strong></td>
                    <td style=" padding: 8px;"></td>
                    <td style=" padding: 8px;"><strong>İmza</strong></td>
                    <td style=" padding: 8px;"><strong>:</strong></td>
                    <td style=" padding: 8px;"></td>
                </tr>
            </table>

            <!-- <div style="position: absolute; bottom: 10px; left: 0; right: 0; text-align: center; font-size: 10pt; color: #666;">Sayfa 1</div> -->
        </div>
    </div>`;
    export const nda_contract_template_en=`<div style="box-sizing: border-box; max-width: 210mm; margin: 0 auto; padding: 20mm; font-family: Arial, Helvetica, sans-serif; font-size: 16px; line-height: 1.2; color: #000;">

    <div style="display:flex; justify-content:space-between; align-items:center; border:1px solid;">
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center;width: 75%;">
            <h1 style="font-size:14pt; font-weight:bold;">
                NON-DISCLOSURE AGREEMENT (NDA)
            </h1>
        </div>

        <table style="font-size: 10px; border-left: 2px solid;width: 25%;padding:5px">
            <tr>
                <td>Document No:</td>
                <td>~sozlesme_no~</td>
            </tr>
            <tr>
                <td>Date:</td>
                <td>~sozlesme_tarihi~</td>
            </tr>
            <tr>
                <td>Rev:</td>
                <td>00</td>
            </tr>
            <tr>
                <td>Rev. Date:</td>
                <td>:-</td>
            </tr>
            <tr>
                <td>Annex:</td>
                <td>5</td>
            </tr>
        </table>
    </div>

    <div style="position: relative; padding-bottom: 40px;">
        <p style="text-align: left; margin-bottom: 20px;"><strong>No:</strong> / /</p>

        <h1 style="text-align: center; font-size: 14pt; font-weight: bold; margin: 30px 0;">~kurum~</h1>

        <h2 style="text-align: center; font-size: 12pt; font-weight: bold; margin: 20px 0;">AND</h2>

        <h2 style="text-align: center; font-size: 12pt; font-weight: bold; margin: 20px 0;">~sirket~</h2>

        <h2 style="text-align: center; font-size: 12pt; font-weight: bold; margin: 20px 0;">BETWEEN</h2>

        <h1 style="text-align: center; font-size: 14pt; font-weight: bold; margin: 30px 0;">NON-DISCLOSURE AGREEMENT<br>(NDA)</h1>

        <p style="text-align: justify; margin: 20px 0;">This Agreement is made and entered into between <strong>~kurum~</strong>, located at <strong>~kurum_adres~</strong>, established under the laws of the REPUBLIC of TURKIYE (hereinafter referred to as <strong>"~kurum_shortname~"</strong>) and <strong>.~sirket~</strong> located at <strong>~sirket_adres~</strong> (hereinafter referred to as <strong>"~firmaKisaAd~"</strong>) (each individually referred to as a "<strong>Party</strong>" and collectively as the "<strong>Parties</strong>").</p>

        <h3 style="font-size: 12pt; font-weight: bold; margin: 20px 0;">This Agreement hereby:</h3>

        <p style="text-align: justify; margin: 15px 0;">Establishes the regulation of the exchange of confidential information that the Parties will disclose to each other in the work they will carry out within the scope of <strong>"~sozlesme_adi~"</strong> (hereinafter referred to as the <strong>"Project"</strong>) and to determine the rights and obligations for the protection of the disclosed information.</p>

        <p style="text-align: justify; margin: 15px 0;">For the above-mentioned purpose, the Parties have agreed as follows:</p>

        <ol style="text-align: justify; margin: 15px 0; padding-left: 25px;">
            <li style="margin-bottom: 15px;">This agreement sets out the obligations of both Parties with respect to the use and protection of confidential information to be exchanged between the Parties in order to carry out the work required under the Project. However, this Agreement does not obligate the Parties to disclose any documents and/or information to each other.</li>

            <li style="margin-bottom: 15px;">The term "Confidential Information" as used in this Agreement shall mean any written information, documents, software, etc. provided by the disclosing Party to the other Party and marked by the disclosing Party as "Top Secret", "Confidential", "Trade Secret", "Restricted Data" or similar notices, including, but not limited to, any written information, documents, software, etc. on the System owned by the disclosing Party containing information and programs of the Information Processing, design information of the company, technical information, trade secrets, ideas and inventions. In addition, any confidential information disclosed orally, visually, by means of samples and models (not in writing) and/or any confidential information that may be obtained by examining, testing or using similar methods of examining, or testing devices or components that may be provided by the disclosing Party to the other Party shall therein be referred to as "Confidential Information" and shall be treated under this Agreement. In the event that Confidential Information is disclosed orally, it shall be stated that the Confidential Information is confidential Information and this shall be confirmed in writing within fifteen (15) days. The obligations under the Agreement shall also apply within such fifteen (15) day period.</li>

            <li style="margin-bottom: 15px;">The points of contact designated by both parties for the purpose of receiving and controlling the information to be exchanged pursuant to this Agreement are given below.

                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <tr>
                        <td colspan="2" style="padding: 8px;"><strong>~kurum_shortname~</strong></td>
                    </tr>
                    <tr>
                        <td colspan="2" style="padding: 8px;"><strong>~kurum_adres~</strong></td>
                    </tr>
                </table>

                <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                    <tr>
                        <td style="padding: 8px; width: 15%;"><strong>Name</strong></td>
                        <td style="padding: 8px; width: 2%;"><strong>:</strong></td>
                        <td style="padding: 8px; width: 33%;">~personelAdi~ ~personelSoyadi~</td>
                        <td style="padding: 8px; width: 15%;"><strong>Name</strong></td>
                        <td style="padding: 8px; width: 2%;"><strong>:</strong></td>
                        <td style="padding: 8px; width: 33%;"></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;"><strong>Title</strong></td>
                        <td style="padding: 8px;"><strong>:</strong></td>
                        <td style="padding: 8px;"></td>
                        <td style="padding: 8px;"><strong>Title</strong></td>
                        <td style="padding: 8px;"><strong>:</strong></td>
                        <td style="padding: 8px;"></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;"><strong>Phone No</strong></td>
                        <td style="padding: 8px;"><strong>:</strong></td>
                        <td style="padding: 8px;">~telefonNo~</td>
                        <td style="padding: 8px;"><strong>Phone No</strong></td>
                        <td style="padding: 8px;"><strong>:</strong></td>
                        <td style="padding: 8px;"></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;"><strong>Fax No</strong></td>
                        <td style="padding: 8px;"><strong>:</strong></td>
                        <td style="padding: 8px;">~telefonNo~</td>
                        <td style="padding: 8px;"><strong>Fax No</strong></td>
                        <td style="padding: 8px;"><strong>:</strong></td>
                        <td style="padding: 8px;"></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;"><strong>E-Mail</strong></td>
                        <td style="padding: 8px;"><strong>:</strong></td>
                        <td style="padding: 8px;">~ePosta~</td>
                        <td style="padding: 8px;"><strong>E-Mail</strong></td>
                        <td style="padding: 8px;"><strong>:</strong></td>
                        <td style="padding: 8px;"></td>
                    </tr>
                    <tr>
                        <td style="padding: 8px;"><strong>Signature</strong></td>
                        <td style="padding: 8px;"><strong>:</strong></td>
                        <td style="padding: 8px; height: 60px;"></td>
                        <td style="padding: 8px;"><strong>Signature</strong></td>
                        <td style="padding: 8px;"><strong>:</strong></td>
                        <td style="padding: 8px;"></td>
                    </tr>
                </table>

                <p style="text-align: justify; margin: 20px 0; padding-left: 20px;">Each Party shall have the right and authority to change the person authorized to receive the information to be exchanged under this Agreement within its own organization by giving written notice to the other Party. Confidential Information to be exchanged between the above-named officials may be transmitted by mail/courier system, any written or printed document, electronic media, sample, model or by any other method that the Parties may choose during the term of this Agreement.</p>
            </li>

            <li style="margin-bottom: 15px;">Parties shall;
                <ol type="a" style="margin-top: 10px; padding-left: 20px;">
                    <li style="margin-bottom: 10px;">Use the Confidential Information only for the Project purposes and in accordance with the purpose which it was disclosed by the other Party,</li>
                    <li style="margin-bottom: 10px;">Make Confidential Information available to its own personnel on a "Need-to-Know" basis, provided that they are relevant and that they comply with the terms of this Agreement,</li>
                    <li style="margin-bottom: 10px;">Not to disclose Confidential Information to third parties, including its shareholders, affiliates and subsidiaries, without the consent of the Party providing the Confidential Information,</li>
                    <li style="margin-bottom: 10px;">Not copy or reproduce the Confidential Information in whole or in part in any form whatsoever, except to the extent necessary for the fulfillment of the purposes of this Agreement; if copied or reproduced in whole or in part with the written consent of the other Party, to ensure that the copied or reproduced copies bear a restrictive legend equivalent that on the original text,</li>
                    <li style="margin-bottom: 10px;">Not directly or indirectly manufacture, sell at home or abroad, or have others manufacture, devices that contain or use the Confidential Information of the other Party or make use of the Confidential Information,</li>
                    <li style="margin-bottom: 10px;">In accordance with the provisions of this Agreement, the organization, subcontractor or other third party to whom Confidential Information is transferred shall be bound by the same limitations on the retention and disclosure of Confidential Information, and the Party receiving the Confidential Information shall be responsible for ensuring this condition,</li>
                </ol>
                <p style="margin: 15px 0; padding-left: 20px;">accept and undertake.</p>
            </li>

            <li style="margin-bottom: 15px;">If the Confidential Information disclosed by the Parties:
                <ol type="a" style="margin-top: 10px; padding-left: 20px;">
                    <li style="margin-bottom: 10px;">Was known to the receiving Party at the time of receipt and this can be proven with sufficient documentation, or</li>
                    <li style="margin-bottom: 10px;">Was independently developed by employees of the receiving Party who were not aware of the Confidential Information, and this can be proven with sufficient documentation, or</li>
                    <li style="margin-bottom: 10px;">Was known to the public at the time of disclosure or subsequently became public through no fault of the receiving Party, or</li>
                    <li style="margin-bottom: 10px;">Was lawfully obtained from a third party without similar restrictions and without breach of this Agreement, provided that necessary research and investigation were conducted to confirm that the third party was not under an obligation not to disclose the Confidential Information, and this can be proven with sufficient documentation, or</li>
                    <li style="margin-bottom: 10px;">Needs to be disclosed by the receiving Party to its Government and/or to its country's civil servants or institutions or judicial authorities performing their legal duties within the framework of the laws, provided that the disclosing Party is informed in writing in advance and upon the receiving Party's request, cooperation is made to discuss such disclosure and to find the most appropriate alternative protection solution, or is approved with the written consent of the disclosing Party for publication or use, the restrictions under Article 4 shall not apply to the receiving Party.</li>
                </ol>
            </li>

            <li style="margin-bottom: 15px;">The Receiving Party shall exercise at least the same degree of care in protecting the Confidential Information as it uses to protect its own Confidential Information of equal importance.</li>

            <li style="margin-bottom: 15px;">In the event that either Party breaches any of its obligations under this Agreement, particularly those related to the protection of Confidential Information obtained under this Agreement, the breaching Party shall be liable for any damages and losses that may occur. Additionally;
                <ol type="a" style="margin-top: 10px; padding-left: 20px;">
                    <li style="margin-bottom: 10px;">In the event that the disclosure or use of this information is discovered, the Receiving Party shall make efforts to prevent any further disclosure or use.</li>
                    <li style="margin-bottom: 10px;">The Receiving Party shall immediately notify the Disclosing Party of the current circumstances and shall implement all corrective measures requested by the Disclosing Party.</li>
                </ol>
            </li>

            <li style="margin-bottom: 15px;">The Disclosing Party shall not be held liable for any errors or omissions in the Confidential Information disclosed under this Agreement, or for any damage or harm that may occur to the Receiving Party's equipment, tools, devices, personnel, and/or third parties as a result of using this information.</li>

            <li style="margin-bottom: 15px;">Nothing in this Agreement shall be construed as granting, either expressly or impliedly, any rights to any intellectual and/or industrial property.</li>

            <li style="margin-bottom: 15px;">This Agreement shall remain in effect for a period of 5 (Five) years from the date it is signed by the Parties, unless extended by written agreement of the Parties. However, either Party may terminate this Agreement before its expiration date by giving the other Party written notice 30 (Thirty) calendar days in advance.</li>

            <li style="margin-bottom: 15px;">In the event that this Agreement is terminated or expires as specified herein, the Parties shall immediately cease using the Confidential Information belonging to the other Party. All copies of Confidential Information and documents belonging to the Disclosing Party that are in the possession of the Receiving Party shall be returned to the Disclosing Party upon request or destroyed as directed by the Disclosing Party, and a certificate of destruction shall be provided.</li>

            <li style="margin-bottom: 15px;">The termination or expiration of this Agreement shall not relieve the Parties of their obligations under Articles 4 and 5 regarding the protection of information obtained before the termination or expiration date.</li>

            <li style="margin-bottom: 15px;">This Agreement, except for the provisions set forth herein, does not confer any rights or obligations on the Parties. Furthermore, it shall not be construed as an intention by the Parties to establish a joint venture, partnership, or any other formal business arrangement, nor as an agreement to work together or to enter into another contract in the future.</li>

            <li style="margin-bottom: 15px;">This Agreement does not prevent the Parties from entering into similar agreements with third parties on the same or similar subjects.</li>

            <li style="margin-bottom: 15px;">The Parties agree not to request reimbursement from the other Party for any expenses that may be incurred in performing the work under this Agreement. If payment is requested for any activity under this Agreement, the terms and conditions shall be determined by a separate agreement with the mutual consent of the Parties.</li>

            <li style="margin-bottom: 15px;">The technical drawings or documents sent by Bicinet to obtain cost or quotations may not be shared with any third party.</li>

            <li style="margin-bottom: 15px;">Any disputes arising from the interpretation and execution of this Agreement shall be resolved through mutual negotiations, and for all unresolved disputes, the laws of the Republic of Turkey shall apply, and the Ankara Courts and Enforcement Offices shall have jurisdiction.</li>

            <li style="margin-bottom: 15px;">Products and technical data for which Bicinet owns the rights and for which technical data sets are provided by Bicinet to the other party for production purposes cannot be exhibited at any fair or promotional organization within the scope of commercial activities.</li>

            <li style="margin-bottom: 15px;">The above Articles constitute the entire Agreement between the Parties and supersede any prior oral or written agreements, commitments, or understandings related to the subject matter of this Agreement. Any Amendments to this Agreement can only be made with the written consent of the Parties and shall only take effect upon the signatures of the authorized representatives of the Parties.</li>
        </ol>

        <p style="text-align: justify; margin: 30px 0 20px 0;">In confirmation of the above matters, this Agreement has been signed and come into effect on / / by the authorized representatives of the Parties, in eighteen (18) Articles and two (2) copies.</p>

        <table style="width: 100%; border-collapse: collapse; margin: 30px 0;">
            <tr>
                <td style="padding: 8px;" colspan="3"><strong>Representing ~kurum_shortname~</strong></td>
                <td style="padding: 8px;" colspan="3"><strong>Representing</strong></td>
            </tr>
            <tr>
                <td style="padding: 8px;width: 15%;"><strong>Name</strong></td>
                <td style="padding: 8px;width: 2%;"><strong>:</strong></td>
                <td style="padding: 8px;width: 33%;">~personelAdi~ ~personelSoyadi~</td>
                <td style="padding: 8px;width: 15%;"><strong>Name</strong></td>
                <td style="padding: 8px;width: 2%;">:</td>
                <td style="padding: 8px;width: 33%;"></td>
            </tr>
            <tr>
                <td style="padding: 8px;"><strong>Title</strong></td>
                <td style="padding: 8px;"><strong>:</strong></td>
                <td style="padding: 8px;"></td>
                <td style="padding: 8px;"><strong>Title</strong></td>
                <td style="padding: 8px;"><strong>:</strong></td>
                <td style="padding: 8px;"></td>
            </tr>
            <tr>
                <td style="padding: 8px;"><strong>Date</strong></td>
                <td style="padding: 8px;"><strong>:</strong></td>
                <td style="padding: 8px;">~sozlesmeTarihi~</td>
                <td style="padding: 8px;"><strong>Date</strong></td>
                <td style="padding: 8px;"><strong>:</strong></td>
                <td style="padding: 8px;">~sozlesmeTarihi~</td>
            </tr>
            <tr>
                <td style="padding: 8px;"><strong>Stamp/Signature</strong></td>
                <td style="padding: 8px;"><strong>:</strong></td>
                <td style="padding: 8px; height: 80px;"></td>
                <td style="padding: 8px;"><strong>Stamp/Signature</strong></td>
                <td style="padding: 8px;"><strong>:</strong></td>
                <td style="padding: 8px;"></td>
            </tr>
        </table>
    </div>
</div>`;