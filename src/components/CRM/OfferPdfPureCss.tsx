import React from "react";
import { PriceOfferDto, CustomerDto, PersonelDtoForName } from "@/api/apiDtos";
import { calcLineTotal, calcLineTotalKdv } from "@/pages/crm/PriceOfferAddPage";
import { formatDateForInput } from "@/utils/commonUtils";

const OfferPdfPureCss: React.FC<{ offer: PriceOfferDto; customer: CustomerDto; onay?: PersonelDtoForName; logoUrl?: string; enterpriseName?: string; address?: string; city?: string; country?: string; phone?: string; email?: string }> = ({
  offer,
  customer,
  onay,
  logoUrl,
  enterpriseName,
  address,
  city,
  country,
  phone,
  email
}) => {
  const subtotal = offer.priceOfferLine?.reduce((acc, line) => acc + calcLineTotal(line), 0) ?? 0;
  const tax = offer.priceOfferLine?.reduce((acc, line) => acc + calcLineTotalKdv(line), 0) ?? 0;
  const total = subtotal + tax;

  return (
    <div style={{ fontFamily: "Arial, sans-serif", padding: "8px", backgroundColor: "#ffffff", color: "#000000" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid #999", paddingBottom: "8px" }}>
        <div>
          {logoUrl && <img src={logoUrl} alt="Logo" style={{ height: "64px", marginBottom: "8px" }} />}
          <div style={{ fontSize: "12px" }}>
            {enterpriseName && <p>{enterpriseName}</p>}
            {address && city && country && <p>{address}, {city} - {country}</p>}
            {phone && <p>{phone}</p>}
            {email && <p>E-Mail: {email}</p>}
          </div>
        </div>
        <div style={{ textAlign: "right", color: "#003366" }}>
          <h2 style={{ fontSize: "18px", fontWeight: "bold", margin: "0 0 8px 0" }}>TEKLİF DOKÜMANI</h2>
          <table style={{ fontSize: "12px" }}>
            <tbody>
              <tr>
                <td style={{ textAlign: "left" }}>Teklif Tarihi</td>
                <td style={{ textAlign: "left" }}> : </td>
                <td style={{ textAlign: "left" }}>{formatDateForInput(offer.teklifTarihi)}</td>
              </tr>
              <tr>
                <td style={{ textAlign: "left" }}>Teklif No</td>
                <td style={{ textAlign: "left" }}> : </td>
                <td style={{ textAlign: "left" }}>{offer.teklifBelgeNo}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Customer Info */}
      <div style={{ marginTop: "16px", borderBottom: "1px solid #999", paddingBottom: "8px", fontSize: "12px" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12px" }}>
          <tbody>
            <tr>
              <td style={{ fontWeight: "bold" }}>UNVAN:</td>
              <td>{customer?.firma}</td>
              <td style={{ fontWeight: "bold" }}>E-MAIL:</td>
              <td>{customer?.email}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>ADRES:</td>
              <td>{customer?.adres}</td>
              <td style={{ fontWeight: "bold" }}>TEL/FAX:</td>
              <td>{customer?.telefon}</td>
            </tr>
            <tr>
              <td style={{ fontWeight: "bold" }}>İLGİLİ:</td>
              <td>{customer?.yetkili}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Table Section */}
      <div style={{ marginTop: "16px" }}>
        <table style={{ width: "100%", fontSize: "12px", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ backgroundColor: "#e2e2e2" }}>
              <th style={{ padding: "4px", border: "1px solid #999" }}>Malzeme Kodu</th>
              <th style={{ padding: "4px", border: "1px solid #999" }}>Malzeme Adı</th>
              <th style={{ padding: "4px", border: "1px solid #999" }}>Miktar</th>
              <th style={{ padding: "4px", border: "1px solid #999" }}>Birim</th>
              <th style={{ padding: "4px", border: "1px solid #999" }}>Birim Fiyat</th>
              <th style={{ padding: "4px", border: "1px solid #999" }}>İndirim (%)</th>
              <th style={{ padding: "4px", border: "1px solid #999" }}>KDV (%)</th>
              <th style={{ padding: "4px", border: "1px solid #999" }}>Para Birimi</th>
              <th style={{ padding: "4px", border: "1px solid #999" }}>Toplam</th>
              <th style={{ padding: "4px", border: "1px solid #999" }}>Teslim Tarihi</th>
            </tr>
          </thead>
          <tbody>
            {offer.priceOfferLine?.map((line, idx) => (
              <tr key={idx}>
                <td style={{ padding: "4px", border: "1px solid #999" }}>{line.malzemeKodu}</td>
                <td style={{ padding: "4px", border: "1px solid #999" }}>{line.malzemeAdi}</td>
                <td style={{ padding: "4px", border: "1px solid #999" }}>{line.miktar}</td>
                <td style={{ padding: "4px", border: "1px solid #999" }}>{line.birimi}</td>
                <td style={{ padding: "4px", border: "1px solid #999" }}>{line.birimFiyat}</td>
                <td style={{ padding: "4px", border: "1px solid #999" }}>{line.indirimOraniYuzde}</td>
                <td style={{ padding: "4px", border: "1px solid #999" }}>{line.kdvOraniYuzde}</td>
                <td style={{ padding: "4px", border: "1px solid #999" }}>{line.paraBirimi}</td>
                <td style={{ padding: "4px", border: "1px solid #999" }}>{calcLineTotal(line).toFixed(2)} TL</td>
                <td style={{ padding: "4px", border: "1px solid #999" }}>{line.teslimTarih?.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div style={{ marginTop: "16px", textAlign: "right", fontSize: "12px" }}>
        <p>Ara Toplam: {subtotal.toLocaleString("tr-TR", { style: "currency", currency: offer.priceOfferLine && offer.priceOfferLine[0].paraBirimi })}</p>
        <p>KDV: {tax.toLocaleString("tr-TR", { style: "currency", currency: offer.priceOfferLine && offer.priceOfferLine[0].paraBirimi })}</p>
        <p><strong>Genel Toplam: {total.toLocaleString("tr-TR", { style: "currency", currency: offer.priceOfferLine && offer.priceOfferLine[0].paraBirimi })}</strong></p>
      </div>

      {/* Description */}
      <div style={{ marginTop: "16px", fontSize: "12px", borderTop: "1px solid #999", paddingTop: "8px" }}>
        <p style={{ fontWeight: "bold" }}>AÇIKLAMA</p>
        <p>{offer.teklifAciklama}</p>
      </div>

      {/* Signature */}
      <div style={{ marginTop: "16px", display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
        <div>
          <p>{onay?.personelAdi}&nbsp;{onay?.personelSoyadi}</p>
          <p style={{ fontWeight: "bold" }}>{onay?.personelGorevi}</p>
        </div>
        <div style={{ textAlign: "right" }}>
          <p style={{ fontWeight: "bold" }}>ONAY</p>
          <p>Firma Yetkilisi: _______________</p>
          <p>Tarih: _______________</p>
          <p>Kaşe / İmza: _______________</p>
        </div>
      </div>

      {/* Bank Info */}
      <div style={{ marginTop: "16px", fontSize: "12px" }}>
        <p style={{ fontWeight: "bold" }}>Banka Hesap Bilgileri</p>
        <p>TL: "HALKBANK" (411-ANTT)</p>
        <p>IBAN: TR90 0001 2009 4110 0005 0319 03</p>
        <p>USD: "HALKBANK" (411-ANTT)</p>
        <p>IBAN: TR40 0001 2009 4110 0000 0328 87</p>
        <p>EURO: "HALKBANK" (411-ANTT)</p>
        <p>IBAN: TR18 0001 2009 4110 0005 0000 42</p>
      </div>
    </div>
  );
};

export default OfferPdfPureCss;
