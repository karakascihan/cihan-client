import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import logo from "../../images/logo/logo.svg";
import { AppDispatch, RootState } from "../../store/store";
import { CustomerDto, PersonelDto, PersonelDtoForName, PersonelEducationAssignDto, PriceOfferDto, UserDtoForCrm } from "@/api/apiDtos";
import { off } from "process";
import { calcLineTotal, calcLineTotalKdv } from "@/pages/crm/PriceOfferAddPage";
import { formatDateForInput } from "@/utils/commonUtils";
import { fetchEnterprises } from "@/store/slices/enterpriseSlice";


const OfferPdf2: React.FC<{ offer: PriceOfferDto; customer: CustomerDto,onay?:PersonelDtoForName }> = ({
  offer,
  customer,
  onay
}) => {
  const enterpriseState = useSelector((state:RootState)=>state.enterprise);
  const dispatch=useDispatch<AppDispatch>();
  useEffect(() => {
    if(enterpriseState.items.length==0)
    dispatch(fetchEnterprises())
  }, [dispatch, enterpriseState.items])
  
  const subtotal = offer.priceOfferLine?.reduce((acc, line) => acc + calcLineTotal(line), 0);
  const tax = offer.priceOfferLine?.reduce((acc, line) => acc + calcLineTotalKdv(line), 0);
  const total = subtotal + tax;
  return (
    <div className="p-1">
      <div  className="pdf-container">
        <div className="p-4 font-sans bg-white border border-gray-300">
          {/* Header Section */}
          <div className="flex justify-between items-start border-b border-gray-400 pb-2">
            <div>
              <img src={enterpriseState?.items[0]?.logoUrl} alt="DigiTest Logo" className="h-16 mb-2" />
              <div className="text-xs text-black">
                <p>
                  {enterpriseState?.items[0]?.enterpriseName}
                </p>
                <p>
                  {enterpriseState?.items[0]?.address}, {enterpriseState?.items[0]?.city}
                  - {enterpriseState?.items[0]?.country}
                </p>
                <p>{enterpriseState?.items[0]?.phone}</p>
                <p>E-Mail: {enterpriseState.items[0]?.email}</p>
              </div>
            </div>
            <div className="text-right text-dark-blue">
              <h2 className="text-lg text-center font-bold">TEKLİF DOKÜMANI</h2>
              <table className="">
                 <tr>
                <td className="text-left" >Teklif Tarihi</td>
                <td className="text-left" >&nbsp;:&nbsp;</td>
                <td className="text-left">{ formatDateForInput(offer.teklifTarihi)}</td>
               
              </tr>
                <tr>
                 <td className="text-left">Teklif No &nbsp;</td>
                <td className="text-left" >&nbsp;:&nbsp;</td>

                <td className="text-left"> {offer.teklifBelgeNo}</td>
              </tr>
              </table>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mt-4 border-b border-gray-400 pb-4">
            <table className="table-auto w-full text-xs text-black">
              <tbody>
                <tr>
                  <td className="font-bold">UNVAN:</td>
                  <td>{customer?.firma}</td>
                  <td className="font-bold">E-MAIL:</td>
                  <td>{customer?.email}</td>
                </tr>
                <tr>
                  <td className="font-bold">ADRES:</td>
                  <td>{customer?.adres}</td>
                  <td className="font-bold">TEL/FAX:</td>
                  <td>{customer?.telefon}</td>
                </tr>
                <tr>
                  <td className="font-bold">İLGİLİ:</td>
                  <td>{customer?.yetkili}</td>
                  
                </tr>
              </tbody>
            </table>
          </div>

          {/* Table Section */}
          <div className="mt-4">
            <table className="table-auto w-full text-xs text-black">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-2 py-1">Malzeme Kodu</th>
                  <th className="px-2 py-1">Malzeme Adı</th>
                  <th className="px-2 py-1">Miktar</th>
                  <th className="px-2 py-1">Birim</th>
                  <th className="px-2 py-1">Birim Fiyat</th>
                  <th className="px-2 py-1">İndirim (%)</th>
                  <th className="px-2 py-1">KDV (%)</th>
                  <th className="px-2 py-1">Para Birimi</th>
                  <th className="px-2 py-1">Toplam</th>
                  <th className="px-2 py-1">Teslim Tarihi</th>
                </tr>
              </thead>
              <tbody>
                {offer.priceOfferLine?.map((line) => (
                  <tr>
                    <td className="px-2 py-1">{line.malzemeKodu}</td>
                    <td className="px-2 py-1">{line.malzemeAdi}</td>
                    <td className="px-2 py-1">{line.miktar}</td>
                    <td className="px-2 py-1">{line.birimi}</td>
                    <td className="px-2 py-1">{line.birimFiyat}</td>
                    <td className="px-2 py-1">{line.indirimOraniYuzde}</td>
                    <td className="px-2 py-1 ">
                      {line.kdvOraniYuzde}{" "}
                    </td>
                    <td className="px-2 py-1 ">
                      {" "}
                      {line.paraBirimi}
                    </td>
                    <td className="px-2 py-1 ">
                      {calcLineTotal(line).toFixed(2)} TL
                    </td>
                    <td className="px-2 py-1">
                      {line.teslimTarih?.toString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="mt-4 text-right text-black">
            <p className="font-medium mb-1">Ara Toplam: {subtotal?.toLocaleString("tr-TR", { style: "currency", currency: offer.priceOfferLine&&offer.priceOfferLine[0].paraBirimi })??0}</p>
            <p className="font-medium mb-1">Kdv : {tax?.toLocaleString("tr-TR", { style: "currency", currency: offer.priceOfferLine&&offer.priceOfferLine[0].paraBirimi })??0}</p>
            <p className="font-medium">Genel Toplam: {total.toLocaleString("tr-TR", { style: "currency", currency: offer.priceOfferLine&&offer.priceOfferLine[0].paraBirimi })??0}</p>
          </div>

          {/* Sales Conditions */}
          <div className="mt-4 text-xs border-t border-gray-400 pt-4 text-black">
            <p className="font-bold">AÇIKLAMA</p>
            <p>
              {offer.teklifAciklama}
            </p>
          </div>

          {/* Signature Section */}
          <div className="mt-4">
            <div className="text-xs flex justify-between text-black">
              <div>
                <p>{onay?.personelAdi+" "+onay?.personelSoyadi}</p>
                <p className="font-bold">{onay?.personelGorevi}</p>
              </div>
              <div className="text-right">
                <p className="font-bold">ONAY</p>
                <p>Firma Yetkilisi: _______________</p>
                <p>Tarih: _______________</p>
                <p>Kaşe / İmza: _______________</p>
              </div>
            </div>
          </div>

          {/* Bank Details */}
          <div className="mt-4 text-xs text-black">
            <p className="font-bold">Banka Hesap Bilgileri</p>
            <p>TL: "HALKBANK" (411-ANTT)</p>
            <p>IBAN: TR90 0001 2009 4110 0005 0319 03</p>
            <p>USD: "HALKBANK" (411-ANTT)</p>
            <p>IBAN: TR40 0001 2009 4110 0000 0328 87</p>
            <p>EURO: "HALKBANK" (411-ANTT)</p>
            <p>IBAN: TR18 0001 2009 4110 0005 0000 42</p>
          </div>

          {/* Footer */}
          {/* <div className="mt-4 text-xs text-right text-black">
            <p>DGT.FR.029 13/04/2022 REV: 01 REV.TAR: 05/06/2023</p>
          </div> */}
          
        </div>
      </div>
      <div className="flex justify-center mt-1">
        <button onClick={print} className="p-1 print:hidden rounded-xl bg-blue-500 text-white">
        Yazdır
        </button>
      </div>
    </div>
  );
};

export default OfferPdf2;
