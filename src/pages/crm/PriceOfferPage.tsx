import { ContractsDto, ContractsDtoForInsertion, MailSendDto, PriceOfferDto, PriceOfferDtoForInsertion, PriceOfferState } from "@/api/apiDtos";
import OfferPdf from "@/components/CRM/OfferPdf";
import { PriceOfferComponent } from "@/components/CRM/PriceOfferComponent";
import {
  FieldDefinition,
  FieldType,
  GenericForm,
} from "@/components/GenericForm";
import { Column, SmartTable } from "@/components/SmartTable";
import { useConfirm } from "@/context/ConfirmContext";
import { useSidebar } from "@/context/GlobalSidebarContext";
import { useModal } from "@/context/ModalContext";
import {
  addPriceOffer,
  deletePriceOffer,
  fetchPriceOffers,
  updatePriceOffer,
} from "@/store/slices/priceOfferSlice";
import store, { AppDispatch, RootState } from "@/store/store";
import { formatDateForInput } from "@/utils/commonUtils";
import { ReactNode, use, useEffect, useState } from "react";
import { FaAdversal, FaPencilAlt, FaTrash } from "react-icons/fa";
import { Provider, useDispatch, useSelector } from "react-redux";
import { PriceOfferAddPage } from "./PriceOfferAddPage";
import ProfessionalOffer from "@/components/CRM/PriceOfferComponent2";
import { CustomerState, fetchCustomers } from "@/store/slices/customerSlice";
import { FaEye, FaFileContract, FaFirstOrder } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { fetchUsers, UserState } from "@/store/slices/userSlice";
import { fetchpersonels } from "@/store/slices/personalSlice";
import { PriceOfferStateDescriptions } from "@/api/extra-enums";
import { MdSend, MdTempleHindu } from "react-icons/md";
import { EmailSender } from "@/components/mail/EmailSender";
import ReactDOMServer from "react-dom/server";
import OfferPdfPureCss from "@/components/CRM/OfferPdfPureCss";
import { OpportunityState, fetchOpportunities } from "@/store/slices/opportunitySlice";
import { selectPriceOffersWithCustomerWithOpportunity } from "@/store/selectors/opportunitySelector";
import OfferPdfPureCss2 from "@/components/CRM/OfferPdfPureCss2";
import OfferPdf2 from "@/components/CRM/OfferPdf2";
import { dijitalerp_price_offer_template, dijitalerp_price_offer_template2, dijitalerp_price_offer_template3, TarihFormatiDonustur } from "@/PriceOfferTemplates/dijitalerp";
import { URL } from "@/api";
import { addFileRecord } from "@/store/slices/fileRecordSlice";
import { useLoading } from "@/context/LoadingContext";
import { useApiRequest } from "@/hooks/useApiRequest";
import { fetchEnterprises } from "@/store/slices/enterpriseSlice";
import { setNotification } from "@/store/slices/notificationSlice";
export const PriceOfferPage = ({
  opportunityId,
}: {
  opportunityId?: number;
}) => {
  const { data, loading, error } = useSelector(
    (state: RootState) => state.priceOffer
  );
  const confirm = useConfirm();
  const sidebar = useSidebar();
  const dispatch = useDispatch<AppDispatch>();
  const { openModal } = useModal();
  const customerState = useSelector(
    (state: RootState) => state.customer as CustomerState
  );

  const opportunities = useSelector(
    (state: RootState) => state.opportunity as OpportunityState
  );

  // Opportunities sadece boşsa yüklenir
  useEffect(() => {
    if (opportunities.data.length === 0) {
      dispatch(fetchOpportunities());
    }
  }, []);

  // Customers sadece boşsa yüklenir
  useEffect(() => {
    if (customerState.data.length === 0) {
      dispatch(fetchCustomers());
    }
  }, []);
  useEffect(() => {
    dispatch(fetchPriceOffers());
  }, [dispatch]);
  const personels = useSelector((state: RootState) => state.personel);
  useEffect(() => {
    if (personels.items.length === 0) {
      dispatch(fetchpersonels({ onlyNames: false, isActive: true }));
    }
  }, []);

  const userState = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (userState.data.length === 0) {
      dispatch(fetchUsers() as any);
    }
    dispatch(fetchEnterprises()as any);
  }, []);
   const { refetch } = useApiRequest<ContractsDto[]>(  URL + "/contracts/getall",{method: "GET", skip: true,deps: [],}
  );
  const enterpriseState = useSelector((state: RootState) => state.enterprise);
   const formElementsforContract: FieldDefinition[] = (
    contractDtoForInsertion: ContractsDtoForInsertion
  ) => {
    let fields: FieldDefinition[] = [
      {
        name: "kurum",
        label: "Kurum",
        type: "select",
        options:
          enterpriseState.items?.map((enterprise) => ({
            label: enterprise.enterpriseName,
            value: enterprise.enterpriseName,
          })) || [],
        colspan: 12,
        group: "Genel",
        required: true,
        defaultValue: contractDtoForInsertion?.kurum || "",
      },
      {
        name: "sirket",
        label: "Şirket",
        type: "select",
        disabled: true,
        options:
          customerState.data?.map((company) => ({
            label: company.firma,
            value: company.firma,
          })) || [],
        colspan: 12,
        group: "Genel",
        required: true,
        defaultValue: contractDtoForInsertion?.sirket || "",
      },
      {
        name: "sozlesmeTarihi",
        label: "Sözleşme Tarihi",
        type: "date",
        colspan: 12,
        group: "Genel",

        defaultValue: contractDtoForInsertion?.sozlesmeTarihi || "",
      },
      {
        name: "sozlesmeNo",
        label: "Sözleşme No",
        type: "text",
        colspan: 12,
        group: "Genel",
        required: true,
        defaultValue: contractDtoForInsertion?.sozlesmeNo || "",
      },
      {
        name: "sozlesmeAdi",
        label: "Sözleşme Adı",
        type: "text",
        colspan: 12,
        group: "Genel",
        required: true,
        defaultValue: contractDtoForInsertion?.sozlesmeAdi || "",
      },
      {
        name: "sozlesmeBaslangicTarihi",
        label: "Sözleşme Başlangıç Tarihi",
        type: "date",
        colspan: 12,
        group: "Genel",

        defaultValue: contractDtoForInsertion?.sozlesmeBaslangicTarihi || "",
      },
      {
        name: "sozlesmeBitisTarihi",
        label: "Sözleşme Bitiş Tarihi",
        type: "date",
        colspan: 12,
        group: "Genel",
        defaultValue: contractDtoForInsertion?.sozlesmeBitisTarihi || "",
      },
      {
        name: "aciklama",
        label: "Açıklama",
        type: "textarea",
        colspan: 12,
        group: "Genel",
        defaultValue: contractDtoForInsertion?.aciklama || "",
      },
    ];
    return fields;
  };
  const ConvertToContract = async (contract: ContractsDto) => {
   openModal({
     title: "Sözleşme Oluştur",
     content: async function (close: (result: any) => void): Promise<ReactNode> {
      return (<GenericForm
        fields={formElementsforContract(contract)}
        onSubmit={function (data: ContractsDtoForInsertion): void {
          data.priceOfferId= contract.priceOfferId;
           let result= refetch(URL + "/contracts/create", { method: "post", body: data });
           if (result) {
            dispatch(setNotification({ message: "Sözleşme başarıyla oluşturuldu.", type: "success" , title: "Başarılı"}));
              close(result);
           }
        }}
      />)
     }
   });
  };
  const PriceOfferWith = useSelector(selectPriceOffersWithCustomerWithOpportunity);
  const columns: Column<PriceOfferDto>[] = [
    { header: "#", accessor: "__index" },
    {
      header: "Teklif Numarası",
      accessor: "teklifBelgeNo",
      filterable: true,
      sortable: true,
      summaryType: "count",
    },
    {
      header: "Teklif Tarihi",
      accessor: "teklifTarihi",
      filterable: true,
      sortable: true,
      body: (row: PriceOfferDto) => (
        <span>{new Date(row.teklifTarihi).toLocaleDateString()}</span>
      ),
    },
    {
      header: "Referans Numarası",
      accessor: "referansNo",
      filterable: true,
      sortable: true,
      summaryType: "count",
    },
    {
      header: "Teklif Geçerlilik Tarihi",
      accessor: "teklifGecerlilikTarihi",
      filterable: true,
      filterType: "date_range",
      sortable: true,
      body: (row: PriceOfferDto) => (
        <span>{new Date(row.teklifGecerlilikTarihi).toLocaleDateString()}</span>
      ),
    },
    {
      header: "Müşteri",
      accessor: "firma_Id",
      filterable: true,
      sortable: true,
      filterType: "id_select",
      filterOptions: customerState.data
        ? customerState.data.map((c) => ({ label: c.firma, value: c.id }))
        : [],
      body: (row: PriceOfferDto) => {
        let firma = customerState.data?.find((x) => x.id == row.firma_Id);
        return <span>{firma?.firma}</span>;
      },
    },
    {
      header: "İlgili Kişi",
      accessor: "customerContact",
      filterable: true,
      sortable: true,
    },
    {
      header: "Ülke",
      accessor: "ulkeAdi",
      filterable: true,
      sortable: true,
    },
    {
      header: "Açıklama",
      accessor: "teklifAciklama",
      filterable: true,
      sortable: true,
    },
    {
      header: "Hazırlayan",
      accessor: "hazirlayan",
      filterable: true,
      sortable: true,
    },
    {
      header: "Teklif Onayı",
      accessor: "onaylayanPersonel",
      filterable: true,
      sortable: true,
      // body: (row: PriceOfferDto) => {
      //   let firma = personels.items?.find((x) => x.id == row.teklifOnay);
      //   return <span>{firma?.personelAdi + " " + firma?.personelSoyadi}</span>;
      // },
    },
    {
      header: "Durumu",
      accessor: "durumu",
      filterable: true,
      sortable: true,
      filterType: "select",
      filterOptions: Object.keys(PriceOfferState)
        .filter((k) => isNaN(Number(k)))
        .map((key) => ({
          label:
            PriceOfferStateDescriptions[
            PriceOfferState[key as keyof typeof PriceOfferState]
            ],
          value: PriceOfferState[key as keyof typeof PriceOfferState],
        })),
      body: (row: PriceOfferDto) => {
        return <span>{PriceOfferStateDescriptions[row.durumu]}</span>;
      },
    },
    {
      header: "Adet",
      accessor: "adet",
      filterable: true,
      sortable: true,
      summaryType: "sum",
    },
    {
      header: "Toplam Fiyat",
      accessor: "toplamFiyat",
      filterable: true,
      sortable: true,
      summaryType: "sum",
      body: (row: PriceOfferDto) => {
        return <span>{row.toplamTutar?.toLocaleString("tr-TR",
          { style: "currency", currency: (row.priceOfferLine && row.priceOfferLine[0]?.paraBirimi) ?? "TRY" }) ?? 0}</span>;
      }
    },
    {
      header: "İşlemler",
      body: (row: PriceOfferDto) => (
        <div className="flex flex-row">
          <button
            onClick={() => {
              showRecord(row);
            }}
            className="
                    inline-flex items-center 
                    px-4 py-2 
                    bg-yellow-500 hover:bg-yellow-600 
                    text-white 
                    rounded 
                    mr-2
                  "
          >
            <FaPencilAlt title="Düzenle" />
          </button>
          <button
            onClick={async () => {
              const isConfirmed = await confirm({
                title: "Silme işlemi",
                message: "Teklifi silmek istediğinize emin misiniz?",
                confirmText: "Evet",
                cancelText: "Vazgeç",
              });
              if (isConfirmed) {
                dispatch(deletePriceOffer(row.id!));
              }
            }}
            className="
                        inline-flex items-center 
                        px-4 py-2 
                        bg-red-600 hover:bg-red-700 
                        text-white 
                        rounded
                         mr-2
                      "
          >
            <FaTrash title="Dokümanı Sil" />
          </button>
          <button
            onClick={() => {
              showTemplate1(row);
            }}
            className="
                    inline-flex items-center 
                    px-4 py-2 
                    bg-purple-500 hover:bg-purple-600 
                    text-white 
                    rounded 
                    mr-2
                  "
          >
            <FaEye title="Göster" />
          </button>
                  <button
            onClick={() => {
              let contract: ContractsDto = {
                kurum: "",
                sirket: customerState.data?.find(c => c.id === row.firma_Id)?.firma ?? "",
                sozlesmeTarihi: undefined,
                sozlesmeNo: "",
                sozlesmeAdi: "",
                nsnKodu: "",
                urunAdi: "",
                adet: 0,
                birimFiyat: 0,
                tutar: 0,
                teslimGunu: "",
                teslimTarihi: undefined,
                durum: "",
                aciklama: "",
                id: 0,
                priceOfferId: row.id!,
                sozlesmeBaslangicTarihi: undefined,
                sozlesmeBitisTarihi: undefined
              };
              ConvertToContract(contract);
            }}
            className="
                    inline-flex items-center 
                    px-4 py-2 
                    bg-sky-500 hover:bg-sky-600 
                    text-white 
                    rounded 
                    mr-2
                  "
          >
            <FaFileContract title="Sözleşme Oluştur" />
          </button>
          {/* <button
            onClick={() => {
              showTemplate1(row);
            }}
            className="
                    inline-flex items-center 
                    px-4 py-2 
                    bg-green-500 hover:bg-gray-600 
                    text-white 
                    rounded 
                    mr-2
                  "
          >
            <MdTempleHindu  title="Şablonu Göster" />
          </button> */}
          <button
            onClick={() => {
              showMail(row);
            }}
            className="
                    inline-flex items-center 
                    px-4 py-2 
                    bg-gray-500 hover:bg-gray-600 
                    text-white 
                    rounded 
                    mr-2
                  "
          >
            <MdSend title="Mail Gönder" />
          </button>
        </div>
      ),
      accessor: "id",
    },
  ];

  const formElements: FieldDefinition[] = (
    priceofferDtoForInsertion: PriceOfferDtoForInsertion
  ) => {
    return [
      {
        name: "teklifBelgeNo",
        label: "Teklif Numarası",
        type: "text",
        colspan: 12,
        group: "Genel",
        required: true,
        defaultValue: priceofferDtoForInsertion?.teklifBelgeNo || "",
      },
      {
        name: "teklifTarihi",
        label: "Teklif Tarihi",
        type: "date",
        colspan: 12,
        group: "Genel",
        required: true,
        defaultValue: formatDateForInput(
          priceofferDtoForInsertion?.teklifTarihi
        ),
      },
      {
        name: "teklifGecerlilikTarihi",
        label: "Teklif Geçerlilik Tarihi",
        type: "date",
        colspan: 12,
        group: "Genel",
        defaultValue: formatDateForInput(
          priceofferDtoForInsertion?.teklifGecerlilikTarihi
        ),
      },
      {
        name: "teklifAciklama",
        label: "Açıklama",
        type: "textarea",
        colspan: 12,
        group: "Genel",
        required: true,
        defaultValue: priceofferDtoForInsertion?.teklifAciklama || "",
      },
      {
        name: "teklifOnay",
        label: "Teklif Onayı",
        type: "text",
        colspan: 12,
        group: "Genel",

        defaultValue: priceofferDtoForInsertion?.teklifOnay || "",
      },
    ];
  };
  const newRecordVoid = (priceoffer: PriceOfferDto) => {
    sidebar.openSidebar(
      <GenericForm
        fields={formElements(priceoffer)}
        onSubmit={function (data: PriceOfferDtoForInsertion): void {
          if (priceoffer && priceoffer.id) {
            dispatch(updatePriceOffer({ id: priceoffer.id, changes: data }));
            sidebar.closeSidebar();
          } else dispatch(addPriceOffer(data));
          sidebar.closeSidebar();
        }}
      />,
      "right",
      "w-120 h-full",
      priceoffer ? "Teklifi Düzenle" : "Yeni Teklif Ekle"
    );
  };
  const showRecord = (priceoffer: PriceOfferDto) => {
    let tar = formatDateForInput(priceoffer.teklifGecerlilikTarihi);
    let record = { ...priceoffer };
    record.teklifGecerlilikTarihi = tar;
    record.teklifTarihi = formatDateForInput(priceoffer.teklifTarihi);
    openModal({
      title: "Teklif Detayı",
      maximizable: true,
      style: { width: "85vw" },
      content: (close) => <PriceOfferAddPage offer={record} />,
    });
  };
  const showPreview = (priceoffer: PriceOfferDto) => {
    openModal({
      title: "Teklif Detayı",
      maximized: true,
      content: (close) => (
        // <OfferPdf
        //   offer={priceoffer}
        //   onay={personels.items?.find((x) => x.id == priceoffer.teklifOnay)}
        //   customer={customerState.data.find((x) => x.id == priceoffer.firma_Id)}
        // />
        <OfferPdf
          offer={priceoffer}
          onay={personels.items?.find((x) => x.id == priceoffer.teklifOnay)}
          customer={customerState.data.find((x) => x.id == priceoffer.firma_Id)}
        />
      ),
    });
  };

  const showMail = (priceoffer: PriceOfferDto) => {
    openModal({
      title: "E-Mail",
      maximizable: true,
      maximized: true,
      content: (close) => (
        <EmailSender priceOfferId={priceoffer.id} opportunityId={priceoffer.opportunityId}  mailDto={{
          toEmail: customerState.data.find((x) => x.id == priceoffer.firma_Id)?.email, subject: opportunities.data.find((x) => x.id == priceoffer.opportunityId)?.title,
          body: "Teklif metnimiz ektedir.İyi Çalışmalar."
          /*
          body:ReactDOMServer.renderToString(
         <Provider store={store} >
          <OfferPdfPureCss
            offer={priceoffer}
            onay={personels.items?.find((x) => x.id == priceoffer.teklifOnay)}
            customer={customerState.data.find((x) => x.id == priceoffer.firma_Id)}
          />
          </Provider>)
          */
        }}

        />
      ),
    });
  };
  const {setLoading}=useLoading();
  const showTemplate1 = (priceoffer: PriceOfferDto) => {
    openModal({
      title: "Teklif Şablonu",
      maximizable: true,
      maximized: true,

      content: (close) => {

        let firma = customerState.data.find(x => x.id === priceoffer.firma_Id);
        let onayPersonel = personels.items.find(x => x.id == priceoffer.teklifOnay);
        let teklifMetni = dijitalerp_price_offer_template3.replaceAll("~teklifBelgeNo~", priceoffer.teklifBelgeNo);
        teklifMetni = teklifMetni.replaceAll("~teklifTarihi~", TarihFormatiDonustur(priceoffer.teklifTarihi.toString()));
        teklifMetni = teklifMetni.replaceAll("~firmaAdi~", firma.firma);
        teklifMetni = teklifMetni.replaceAll("~firmaYetkili~", firma.yetkili);
        teklifMetni = teklifMetni.replaceAll("~teklifGecerlilikTarihi~", TarihFormatiDonustur(priceoffer.teklifGecerlilikTarihi.toString()));
        teklifMetni = teklifMetni.replaceAll("~teklifOnay~", (onayPersonel.personelAdi?? "") + " " + (onayPersonel.personelSoyadi ?? ""));
        teklifMetni = teklifMetni.replaceAll("~teklifOnayGorev~", onayPersonel.personelGorevi??"");
        teklifMetni = teklifMetni.replaceAll("~telefon~", onayPersonel.telefonNo??"");
        teklifMetni = teklifMetni.replaceAll("~ePosta~", onayPersonel.ePosta??"");

        const teklifTarihi=new Date(priceoffer.teklifTarihi);

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

        console.log("VAR MI:", teklifMetni.includes("~teslimSuresi~"));
        console.log("thiss", priceoffer.teslimTarihi);
        console.log("this fark", gunFarkiTeslim);
        console.log("this teklşf trrih", gunFarkiTeklif);
        let fiyatSatirlarHtml = ``;
        priceoffer.priceOfferLine?.forEach((line, index) => {
          let fiyatSatir = `<td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.malzemeAdi}</td>
                       <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.miktar ?? ""}</td>
                       <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.birimi ?? ""}</td>
                       <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.paraBirimi ?? ""}</td>
                       <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.birimFiyat ?? ""}</td>
                       <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.toplamFiyat ?? ""}</td>`;
          fiyatSatirlarHtml += `<tr>${fiyatSatir}</tr>`;

        });
        teklifMetni = teklifMetni.replaceAll("~fiyatSatirlar~", fiyatSatirlarHtml);

        let opsiyonSatirlarHtml = ``;
        priceoffer.priceOfferLine?.forEach((line, index) => {
          let opsiyonSatir = `<td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.malzemeAdi}</td>
                       <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.miktar ?? ""}</td>
                       <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.birimi ?? ""}</td>
                       <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.paraBirimi ?? ""}</td>
                       <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.birimFiyat ?? ""}</td>
                       <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.toplamFiyat ?? ""}</td>`;

          opsiyonSatirlarHtml += `<tr>${opsiyonSatir}</tr>`;

        });
        teklifMetni = teklifMetni.replaceAll("~opsiyonSatirlar~", opsiyonSatirlarHtml);


        return <GenericForm
          key={priceoffer.id + "-" + Date.now()}
         buttonNode={<button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Pdf Olarak Kaydet</button>}
          fields={[{
            colspan: 12,
            name: "icerik",
            label: "Teklif Düzenle",
            type: "editor",
            defaultValue: teklifMetni,

          }]} onSubmit={function (data: any): void {
            setLoading(true);
               dispatch( addFileRecord({
                 fileName: "fiyat_teklifi_"+new Date().toLocaleString().replaceAll(" ", "-")+".pdf",
                 contentType: "application/pdf",
                 sizeKb: 0,
                 content: data.icerik,
                 uploadedBy: 0,
                 relatedEntityName: "PriceOffer",
                 relatedEntityId: priceoffer.id!,
                 type: 5
               })).unwrap().then(() => {
                 setLoading(false);
                 close(null);})
          }} />

      }
    })
  };


  const navigate = useNavigate();
  return (
    <div className="card">
      <h2 className="text-xl text-center font-bold mb-2">Teklifler</h2>
      <SmartTable
        data={
          opportunityId
            ? PriceOfferWith.filter((x) => x.opportunityId == opportunityId)
            : PriceOfferWith ?? []
        }
        columns={columns}
        rowIdAccessor={"id"}
        frozenColumns={[{ name: "id", right: true }]}
        isExport={true}
        newRecordVoid={() =>
          navigate(
            "/yeniteklif/" + (opportunityId && opportunityId?.toString())
          )
        }
        scrollHeight="calc(100vh - 200px)"
        enablePagination={false}
      ></SmartTable>
    </div>
  );
};


