
import { PriceOfferDto, TemplateDto, CustomerDto, PersonelDto } from "@/api/apiDtos";
import { TarihFormatiDonustur } from "@/price-offer-templates/dijitalerp";

export const generatePriceOfferTemplate = (
    temp: TemplateDto,
    priceoffer: PriceOfferDto,
    firma: CustomerDto | undefined,
    onayPersonel: PersonelDto | undefined,
    URL: string,
    enterpriseState: any,
    productState: any
): string => {
    if (!temp || !temp.htmlContent) return "";
    if (!priceoffer || !firma || !onayPersonel) return temp.htmlContent;


    let teklifMetni = temp.htmlContent.replaceAll("~teklifBelgeNo~", priceoffer.teklifBelgeNo);
    teklifMetni = teklifMetni.replaceAll("~teklifTarihi~", TarihFormatiDonustur(priceoffer.teklifTarihi.toString()));
    teklifMetni = teklifMetni.replaceAll("~firmaAdi~", firma.firma ?? "");
    teklifMetni = teklifMetni.replaceAll("~firmaTelefon~", firma.telefon ?? "");
    teklifMetni = teklifMetni.replaceAll("~firmaEmail~", firma.email ?? "");
    teklifMetni = teklifMetni.replaceAll("~firmaYetkili~", firma.yetkili ?? "");
    teklifMetni = teklifMetni.replaceAll("~teklifGecerlilikTarihi~", TarihFormatiDonustur(priceoffer.teklifGecerlilikTarihi.toString()));
    teklifMetni = teklifMetni.replaceAll("~teklifOnay~", (onayPersonel.personelAdi ?? "") + " " + (onayPersonel.personelSoyadi ?? ""));
    teklifMetni = teklifMetni.replaceAll("~teklifOnayGorev~", onayPersonel.personelGorevi ?? "");
    teklifMetni = teklifMetni.replaceAll("~telefon~", onayPersonel.telefonNo ?? "");
    teklifMetni = teklifMetni.replaceAll("~ePosta~", onayPersonel.ePosta ?? "");

    const teklifTarihi = new Date(priceoffer.teklifTarihi);
    const teklifGecerlilikTarihi = new Date(priceoffer.teklifGecerlilikTarihi);
    const gunFarkiTeklif = Math.ceil((teklifGecerlilikTarihi.getTime() - teklifTarihi.getTime()) / (1000 * 60 * 60 * 24));
    if (gunFarkiTeklif > 0) {
        teklifMetni = teklifMetni.replaceAll("~teklifGecerlilikSuresi~", gunFarkiTeklif + " gün");
    }
    else {
        teklifMetni = teklifMetni.replaceAll("~teklifGecerlilikSuresi~", "5 gün");
    }
    teklifMetni = teklifMetni.replaceAll("~BASE_URL~", URL.replace("api", ""));
    const gunFarkiTeslim = Math.ceil(
        (new Date(priceoffer.teslimTarihi?.toString().replace(/-/g, "/")).getTime() - teklifTarihi.getTime()) / (1000 * 60 * 60 * 24)
    );
    if (gunFarkiTeslim > 0) {
        teklifMetni = teklifMetni.replaceAll("~teslimSuresi~", gunFarkiTeslim.toString() + " gün");
    }
    else {
        teklifMetni = teklifMetni.replaceAll("~teslimSuresi~", "belirlenen süre");
    }
    let fiyatSatirlarHtml = ``;
    let teknikOzelliklerHtml = ``;
    let firma2 = enterpriseState.items?.[0];
    if (firma2 && firma2.enterpriseName.startsWith("DİJİTAL ERP")) {
        priceoffer.priceOfferLine?.forEach((line: any, index: any) => {
            let fiyatSatir = `<td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.malzemeAdi}</td>
             <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.miktar ?? ""}</td>
             <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.birimi ?? ""}</td>
             <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.paraBirimi ?? ""}</td>
             <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.birimFiyat ?? ""}</td>
             <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.toplamFiyat ?? ""}</td>`;
            fiyatSatirlarHtml += `<tr>${fiyatSatir}</tr>`;
        });
        if (priceoffer.belgeIndirimOraniYuzde > 0) {
            fiyatSatirlarHtml += `<tr><td style="padding: 10px 12px;font-size: 15px; font-weight: bold; border: 1px solid #bdc3c7; background: #f8f9fa;">Ara Toplam</td>
             <td colspan=5 style="text-align:center; font-size: 15px;font-weight: bold;padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${(priceoffer.toplamTutar ?? 0) + ((priceoffer.toplamTutar ?? 0) * priceoffer.belgeIndirimOraniYuzde / 100)}</td>
 ></tr>`;
            fiyatSatirlarHtml += `<tr><td  style="padding: 10px 12px;font-size: 15px;font-weight: bold; border: 1px solid #bdc3c7; background: #f8f9fa;">İskonto %${priceoffer.belgeIndirimOraniYuzde}</td>
             <td colspan=5 style="text-align:center;font-size: 15px;font-weight: bold;padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${(priceoffer.toplamTutar ?? 0) * priceoffer.belgeIndirimOraniYuzde / 100}</td>
 ></tr>`;
        }
        fiyatSatirlarHtml += `<tr><td style="padding: 10px 12px;font-size: 15px;font-weight: bold; border: 1px solid #bdc3c7; background: #f8f9fa;">Genel Toplam</td>
             <td colspan=5 style="text-align:center;font-size: 15px;font-weight: bold;padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${(priceoffer.toplamTutar ?? 0) + " " + (priceoffer.priceOfferLine?.[0]?.paraBirimi ?? "")}</td>
 ></tr>`;
    }
    else {
        priceoffer.priceOfferLine?.forEach((line: any, index: any) => {
            let product = productState.items?.filter((p: any) => p.productName == line.malzemeAdi)[0];
            let productImg = productState.items?.filter((p: any) => p.productName == line.malzemeAdi)[0]?.pictures ?? "";
            let fiyatSatir = `  
             <td style="padding: 12px; border: 1px solid #000;">
                ${line.malzemeAdi}
                 <p style="margin: 0; font-style: italic; color: #666;">
                 ${productImg ? `<img width="200" height="100"src="data:image/jpeg;base64,${productImg}" />` : null}</p>
             </td>
             <td style="padding: 12px; border: 1px solid #000; text-align: center; font-weight: bold;">${line.miktar ?? 1}</td>
             <td style="padding: 12px; border: 1px solid #000; text-align: center;">${line.birimFiyat ?? ""}</td>
             <td style="padding: 12px; border: 1px solid #000; text-align: center;">${line.toplamFiyat ?? ""}</td>
             <td style="padding: 12px; border: 1px solid #000; text-align: center;">${line.teslimTarih ?? ""}</td>
        `;
            let fiyatSatir2 = `  
             <td>${line.malzemeAdi}</td>
             <td>${line.miktar ?? 1}</td>
             <td>${line.birimFiyat ?? ""}</td>
             <td>${line.toplamFiyat ?? ""}</td>
             <td>${line.teslimTarih ?? ""}</td>
        `;

            let tekOzellik = `
<div style="border: 1px solid #ccc; margin-bottom: 15px;padding:5px;">
           <table  width="100%" cellpadding="8" cellspacing="0">
             <tr>
               <td width="120">
                ${productImg ? ` <img src="data:image/jpeg;base64,${productImg}" style="width:500px;" />` : null}
               </td>
               <td>
                 <h3 style="margin:0 0 5px 0;">${line.malzemeAdi}</h3>
                 <p style="margin:0; font-size:12px;">
                   MODEL NO: ${product ? product.productCode : ""} 
                 </p>
               </td>
             </tr>
           </table>
             ${product ? product.notes : ""}
             </div>
                 `;

            teknikOzelliklerHtml += tekOzellik;
            // fiyatSatirlarHtml += `<tr>${fiyatSatir}</tr>`;
            fiyatSatirlarHtml += `<tr>${fiyatSatir2}</tr>`;
        });
    }

    teklifMetni = teklifMetni.replaceAll("<tr>\n<td colspan=\"5\">~fiyatSatirlar~</td>\n</tr>", fiyatSatirlarHtml);

    let opsiyonSatirlarHtml = ``;
    priceoffer.priceOfferLine?.forEach((line: any, index: any) => {
        let opsiyonSatir = `<td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.malzemeAdi}</td>
             <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.miktar ?? ""}</td>
             <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.birimi ?? ""}</td>
             <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.paraBirimi ?? ""}</td>
             <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.birimFiyat ?? ""}</td>
             <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.toplamFiyat ?? ""}</td>`;

        opsiyonSatirlarHtml += `<tr>${opsiyonSatir}</tr>`;

    });
    teklifMetni = teklifMetni.replaceAll("<tr>\n<td colspan=\"5\">~opsiyonSatirlar~</td>\n</tr>", opsiyonSatirlarHtml);
    teklifMetni = teklifMetni.replaceAll("~products_notes~", teknikOzelliklerHtml);

    return teklifMetni;
}
