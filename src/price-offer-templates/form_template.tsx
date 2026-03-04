export const form_template = `
<div style="width:210mm; min-height:297mm; margin:auto; padding:20mm; box-sizing:border-box; font-family:Arial, sans-serif; font-size:13px; color:#333; background:#fff;">

    <!-- HEADER -->
    <div style="display:flex; justify-content:space-between; align-items:center; border-bottom:2px solid #2c3e50; padding-bottom:10px; margin-bottom:20px;">
        
        <div>
            <img src="{{LOGO_URL}}" style="height:60px;" />
        </div>

        <div style="text-align:right;">
            <h1 style="margin:0; font-size:20px;">{{FORM_ADI}}</h1>
            <div style="font-size:12px; color:#777;">
                Form No: {{FORM_NO}} | Rev: {{REV_NO}}
            </div>
        </div>
    </div>


    <!-- KİŞİSEL BİLGİLER -->
    <div style="margin-bottom:20px;">
        <div style="background:#2c3e50; color:#fff; padding:6px; font-weight:bold;">
            Kişisel Bilgiler
        </div>

        <table style="width:100%; border-collapse:collapse;">
            <tr>
                <td style="border:1px solid #ccc; padding:6px;">
                    Ad Soyad: {{AD_SOYAD}}
                </td>
                <td style="border:1px solid #ccc; padding:6px;">
                    Tarih: {{TARIH}}
                </td>
            </tr>
            <tr>
                <td style="border:1px solid #ccc; padding:6px;">
                    Departman: {{DEPARTMAN}}
                </td>
                <td style="border:1px solid #ccc; padding:6px;">
                    Pozisyon: {{POZISYON}}
                </td>
            </tr>
        </table>
    </div>


    <!-- ===== DİNAMİK SORU GRUBU BLOĞU (ÇOĞALTILABİLİR) ===== -->
    <div style="margin-bottom:20px;">

        <div style="background:#ecf0f1; padding:6px; font-weight:bold; border:1px solid #ccc;">
            Grup: {{GRUP_ADI}}
        </div>

        <table style="width:100%; border-collapse:collapse;">
            <tr>
                <th style="border:1px solid #ccc; padding:8px; background:#f4f6f8; text-align:left;">
                    Soru
                </th>
                <th style="border:1px solid #ccc; padding:8px; background:#f4f6f8; width:70px; text-align:center;">
                    Puan
                </th>
            </tr>

            <tr>
                <td style="border:1px solid #ccc; padding:8px;">
                    {{SORU_1}}
                </td>
                <td style="border:1px solid #ccc; padding:8px; text-align:center;">
                    {{SORU_1_PUAN}}
                </td>
            </tr>

            <tr>
                <td style="border:1px solid #ccc; padding:8px;">
                    {{SORU_2}}
                </td>
                <td style="border:1px solid #ccc; padding:8px; text-align:center;">
                    {{SORU_2_PUAN}}
                </td>
            </tr>

            <tr style="font-weight:bold; background:#fafafa;">
                <td style="border:1px solid #ccc; padding:8px;">
                    Grup Toplam
                </td>
                <td style="border:1px solid #ccc; padding:8px; text-align:center;">
                    {{GRUP_TOPLAM}}
                </td>
            </tr>
        </table>

    </div>
    <!-- ===== BLOK SONU ===== -->


    <!-- GENEL TOPLAM -->
    <div style="margin-bottom:20px;">
        <table style="width:100%; border-collapse:collapse;">
            <tr>
                <td style="border:1px solid #000; padding:10px; font-weight:bold; width:80%;">
                    GENEL TOPLAM PUAN
                </td>
                <td style="border:1px solid #000; padding:10px; font-weight:bold; width:20%; text-align:center;">
                    {{GENEL_TOPLAM}}
                </td>
            </tr>
        </table>
    </div>


    <!-- PUAN AÇIKLAMALARI -->
    <div style="margin-bottom:20px;">
        <div style="background:#2c3e50; color:#fff; padding:6px; font-weight:bold;">
            Puan Açıklamaları
        </div>

        <table style="width:100%; border-collapse:collapse;">
            <tr>
                <th style="border:1px solid #ccc; padding:6px;">Puan</th>
                <th style="border:1px solid #ccc; padding:6px;">Açıklama</th>
            </tr>

            <tr>
                <td style="border:1px solid #ccc; padding:6px;">1</td>
                <td style="border:1px solid #ccc; padding:6px;">{{PUAN_1}}</td>
            </tr>
            <tr>
                <td style="border:1px solid #ccc; padding:6px;">2</td>
                <td style="border:1px solid #ccc; padding:6px;">{{PUAN_2}}</td>
            </tr>
            <tr>
                <td style="border:1px solid #ccc; padding:6px;">3</td>
                <td style="border:1px solid #ccc; padding:6px;">{{PUAN_3}}</td>
            </tr>
            <tr>
                <td style="border:1px solid #ccc; padding:6px;">4</td>
                <td style="border:1px solid #ccc; padding:6px;">{{PUAN_4}}</td>
            </tr>
            <tr>
                <td style="border:1px solid #ccc; padding:6px;">5</td>
                <td style="border:1px solid #ccc; padding:6px;">{{PUAN_5}}</td>
            </tr>
        </table>
    </div>


    <!-- İMZA ALANI -->
    <div style="margin-top:60px; display:flex; justify-content:space-between;">

        <div style="width:45%; text-align:center;">
            <div style="border-top:1px solid #000; margin-top:60px; padding-top:5px;">
                Dolduran<br/>
                {{DOLDURAN_AD_SOYAD}}
            </div>
        </div>

        <div style="width:45%; text-align:center;">
            <div style="border-top:1px solid #000; margin-top:60px; padding-top:5px;">
                Onaylayan<br/>
                {{ONAYLAYAN_AD_SOYAD}}
            </div>
        </div>

    </div>

</div>`;