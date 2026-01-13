import { ContractsDto, ContractsDtoForInsertion, PurchaseOrders } from "@/api/apiDtos";
import { FieldDefinition, GenericForm } from "@/components/GenericForm";
import { Column, SmartTable } from "@/components/SmartTable";
import { useConfirm } from "@/context/ConfirmContext";
import { useSidebar } from "@/context/GlobalSidebarContext";
import { contractSlice, productsSlice, RootState } from "@/store/store";
import { useEffect, useRef, useState } from "react";
import { set } from "react-hook-form";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FileRecordPage } from "./FileRecordPage";
import { useModal } from "@/context/ModalContext";
import { FaEye, FaFile, FaRProject, FaShower, FaUpload } from "react-icons/fa6";
import { useLoading } from "@/context/LoadingContext";
import { contractTemplate1 } from "@/PriceOfferTemplates/contractTemplates";
import { Editor } from "@tinymce/tinymce-react";
import { fetchCustomers } from "@/store/slices/customerSlice";
import { fetchPriceOffers } from "@/store/slices/priceOfferSlice";
import { apiRequest } from "@/services/apiRequestService";
import { useApiRequest } from "@/hooks/useApiRequest";
import { URL } from "@/api";
import axios, { AxiosHeaders } from "axios";

import type { AxiosRequestHeaders } from "axios";

import enterpriseSlice, {
  fetchEnterprises,
} from "@/store/slices/enterpriseSlice";
import { addFileRecord } from "@/store/slices/fileRecordSlice";
import AddBoardForm from "@/components/board/AddBoardForm";
import { useNavigate } from "react-router-dom";

export const ContractPage = () => {
  const confirm = useConfirm();
  const sidebar = useSidebar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productsState = useSelector((state: RootState) => state.products);
  const customersState = useSelector((state: RootState) => state.customer);
  const enterpriseState = useSelector((state: RootState) => state.enterprise);
  const priceOffersState = useSelector((state: RootState) => state.priceOffer);
  const [showPreview, setShowPreview] = useState(0);
  const [editorData, setEditorData] = useState(contractTemplate1);
  const loginState = useSelector((state: RootState) => state.login);
  const { data: purchaseOrders, refetch: refetchOrders } = useApiRequest<PurchaseOrders>(
    URL + "/PurchaseOrder/GetAll", {
    method: "GET",
    skip: false,
    deps: [],
  }
  );
  const poList = Array.isArray(purchaseOrders) ? purchaseOrders : [];

  // useEffect(() => {
  //   apiRequest<ContractsDto []>('GET','/contracts/getall',{ Authorization: `Bearer ${loginState.accessToken}` }).then(res=>{
  //     })
  // }, []);
  const { data: contracts, refetch } = useApiRequest<ContractsDto[]>(
    URL + "/contracts/getall",
    {
      method: "GET",
      skip: false,
      deps: [],
    }
  );


  useEffect(() => {
    if (productsState.items.length === 0) {
      dispatch(productsSlice.actions.fetchAll() as any);
    }
    if (enterpriseState.items.length === 0) {
      dispatch(fetchEnterprises() as any);
    }
    if (customersState.data.length === 0) {
      dispatch(fetchCustomers() as any);
    }
    if (priceOffersState.data.length === 0) {
      dispatch(fetchPriceOffers() as any);
    }
  }, []);

  const showTemplate1 = async (contract: ContractsDto) => {

    let filledTemplate = contractTemplate1;
    filledTemplate = filledTemplate.replaceAll("~kurum~", contract.kurum || "");
    filledTemplate = filledTemplate.replaceAll(
      "~sirket~",
      contract.sirket || ""
    );
    filledTemplate = filledTemplate.replaceAll(
      "~kurum_shortname~",
      enterpriseState.items.find((en) => en.enterpriseName === contract.kurum)
        .shortName || "" + " "
    );
    filledTemplate = filledTemplate.replaceAll(
      "~sozlesme_adi~",
      contract.sozlesmeAdi || ""
    );
    filledTemplate = filledTemplate.replaceAll(
      "~sozlesme_no~",
      contract.sozlesmeNo || ""
    );
    filledTemplate = filledTemplate.replaceAll(
      "~sozlesme_tarihi~",
      (contract.sozlesmeTarihi as unknown as string) || ""
    );
    filledTemplate = filledTemplate.replaceAll(
      "~sozlesmeBitisTarihi~",
      (contract.sozlesmeBitisTarihi as unknown as string) ?? ""
    );
    filledTemplate = filledTemplate.replaceAll(
      "~sozlesmeBaslangicTarihi~",
      (contract.sozlesmeBaslangicTarihi as unknown as string) ?? ""
    );
    filledTemplate = filledTemplate.replaceAll(
      "~kurum_adres~",
      enterpriseState.items.find((en) => en.enterpriseName === contract.kurum)
        ?.address || ""
    );
    filledTemplate = filledTemplate.replaceAll(
      "~sirket_adres~",
      customersState.data.find((en) => en.firma === contract.sirket)?.adres ||
      ""
    );
    filledTemplate = filledTemplate.replaceAll(
      "~sirket_vergi_no~",
      customersState.data.find((en) => en.firma === contract.sirket)
        ?.vergiNumarasi || ""
    );
    let toplamFiyat = 0;

    if (contract.priceOfferId) {
      {
        let fiyatSatirlarHtml = ``;
        const priceoffers = await dispatch(fetchPriceOffers() as any).unwrap();
        const priceoffer = priceoffers.find(
          (po) => po.id == contract.priceOfferId
        );
        filledTemplate = filledTemplate.replaceAll(
          "~toplam_fiyat~",
          (priceoffer.toplamTutar + " " + priceoffer.priceOfferLine[0].paraBirimi) || ""
        );
        priceoffer.priceOfferLine?.forEach((line, index) => {
          toplamFiyat += Number(line.toplamFiyat ?? 0);
          let fiyatSatir = `<td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.malzemeAdi
            }</td>
                       <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.miktar ?? ""
            }</td>
                       <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.birimi ?? ""
            }</td>
                       <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.paraBirimi ?? ""
            }</td>
                       <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.birimFiyat ?? ""
            }</td>
                       <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.toplamFiyat ?? ""
            }</td>`;
          fiyatSatirlarHtml += `<tr>${fiyatSatir}</tr>`;
        });
        let genelToplam = `<tr><td style="padding: 10px 12px;font-size: 15px;font-weight: bold; border: 1px solid #bdc3c7; background: #f8f9fa;">Genel Toplam</td>
                       <td colspan=5 style="text-align:center;font-size: 15px;font-weight: bold;padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${priceoffer.toplamTutar + " " + priceoffer.priceOfferLine[0].paraBirimi}</td>
           </tr>`;
        fiyatSatirlarHtml += genelToplam;
        filledTemplate = filledTemplate.replaceAll(
          "~kapsam_satirlari~",
          fiyatSatirlarHtml
        );
      }
    }
    else if (contract.purchaseOrdersId) {
      let siparisSatirlariHtml = ``;


      const po = await refetchOrders(URL + "/PurchaseOrder/" + contract.purchaseOrdersId, { method: "GET" });
      console.log("PO RESULT KEYS:", Object.keys(po.result ?? {}));
      console.log("PO RESULT:", po.result);
      console.log("PO LINES:", po.result?.purchaseOrderLine);
//po.result doğru veri getirio linelar dahil, po.result.plines undefined geliyor.
      let poLines = po.result?.purchaseOrderLine || [];



      let calculatedTotal = 0;

      poLines.forEach((line, index) => {
        toplamFiyat += Number(line.toplamFiyat ?? 0);
        let siparisSatir = `<td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.malzemeAdi
          }</td>
                       <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.miktar ?? ""
          }</td>
                       <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.birimi ?? ""
          }</td>
                       <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.paraBirimi ?? ""
          }</td>
                       <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.birimFiyat ?? ""
          }</td>
                       <td style="padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">${line.toplamFiyat ?? ""
          }</td>`;

        siparisSatirlariHtml += `<tr>${siparisSatir}</tr>`;
      });



      const paraBirimi = poLines?.[0]?.paraBirimi ?? "";

      const finalTotal = po?.result.toplamTutar ?? 0;

      filledTemplate = filledTemplate.replaceAll(
        "~toplam_fiyat~",
        finalTotal ? `${finalTotal} ${paraBirimi}` : ""
      );

      siparisSatirlariHtml += `
        <tr>
          <td style="padding: 10px 12px;font-size: 15px;font-weight: bold; border: 1px solid #bdc3c7; background: #f8f9fa;">Genel Toplam</td>
          <td colspan="5" style="text-align:center;font-size: 15px;font-weight: bold;padding: 10px 12px; border: 1px solid #bdc3c7; background: #f8f9fa;">
            ${finalTotal ? `${finalTotal} ${paraBirimi}` : ""}
          </td>
        </tr>
      `;

      filledTemplate = filledTemplate.replaceAll("~kapsam_satirlari~", siparisSatirlariHtml);

      console.log("CalculatedTotal vs DB:", calculatedTotal, po?.result.toplamTutar);
    }
    else {
      filledTemplate = filledTemplate.replaceAll("~kapsam_satirlari~", "");
      filledTemplate = filledTemplate.replaceAll("~toplam_fiyat~", "");
    }
    setEditorData(filledTemplate);
    setShowPreview(contract.id!);
  };
  const editorRef = useRef(null);
  const { openModal } = useModal();
  const columns: Column<ContractsDto>[] = [
    { header: "#", accessor: "__index" },
    {
      header: "Kurum Adı",
      accessor: "kurum",
      filterable: true,
      sortable: true,
    },
    {
      header: "Şirket",
      accessor: "sirket",
      filterable: true,
      sortable: true,
    },
    {
      header: "Sözleşme Tarihi",
      accessor: "sozlesmeTarihi",
      filterable: true,
      sortable: true,
    },
    {
      header: "Sözleşme No",
      accessor: "sozlesmeNo",
      filterable: true,
      sortable: true,
    },
    {
      header: "Sözleşme Adı",
      accessor: "sozlesmeAdi",
      filterable: true,
      sortable: true,
    },
    {
      header: "NSN Kodu",
      accessor: "nsnKodu",
      filterable: true,
      sortable: true,
    },
    {
      header: "Ürün Adı",
      accessor: "urunAdi",
      filterable: true,
      sortable: true,
    },
    {
      header: "Adet",
      accessor: "adet",
      filterable: true,
      sortable: true,
    },
    {
      header: "Birim Fiyat",
      accessor: "birimFiyat",
      filterable: true,
      sortable: true,
    },
    {
      header: "Tutar",
      accessor: "tutar",
      filterable: true,
      sortable: true,
    },
    {
      header: "İşlemler",
      body: (row: ContractsDto) => (
        <div className="flex flex-row">
          <button
            onClick={() => {
              newRecordVoid(row);
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
                message: "Sözleşmeyi silmek istediğinize emin misiniz?",
                confirmText: "Evet",
                cancelText: "Vazgeç",
              });
              if (isConfirmed) {
                refetch(URL + "/contracts/delete/" + row.id, {
                  method: "delete",
                });
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
            <FaTrash title="Sözleşmeyi Sil" />
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
              openModal({
                title: "Proje Uygulama Takimi Oluşturma",
                content: function (
                  close: (result: any) => void
                ): React.ReactNode {
                  return (
                    <AddBoardForm onClose={function (boardId: number): void {
                      if (boardId != -1) {
                        close(null);
                        navigate("/proje/" + boardId)
                      }
                    }} />
                  );
                },
              });
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
            <FaRProject title="Proje Takvimi Oluştur" />
          </button>
          <button
            className="
                    inline-flex items-center 
                    px-4 py-2 
                    bg-green-500 hover:bg-green-600 
                    text-white 
                    rounded 
                    mr-2"
            onClick={() => {
              openModal({
                title: "Sözleşme Dosyaları",
                content: function (
                  close: (result: any) => void
                ): React.ReactNode {
                  return (
                    <FileRecordPage
                      relatedEntityId={row.id}
                      relatedEntityName="Contract"
                    />
                  );
                },
              });
            }}
          >
            {" "}
            <FaFile title="Sözleşme Dosyaları" />{" "}
          </button>
        </div>
      ),
      accessor: "id",
    },
  ];
  const formElements: FieldDefinition[] = (
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
        options:
          customersState.data?.map((company) => ({
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
        name: "priceOfferId",
        label: "Fiyat Teklifi",
        type: "select",
        options:
          priceOffersState.data?.map((priceOffer) => ({
            label: priceOffer.teklifBelgeNo,
            value: priceOffer.id,
          })) || [],
        colspan: 12,
        group: "Genel",
        disabled: contractDtoForInsertion?.id ? true : false,
        defaultValue: contractDtoForInsertion?.priceOfferId || "",
      },
      {
        name: "purchaseOrderId",
        label: "Sipariş Numarası",
        type: "text",
        colspan: 12,
        group: "Genel",
        readOnly: true,
        defaultValue:
          poList.find(
            po => po.id === contractDtoForInsertion?.purchaseOrdersId
          )?.siparisNo
          ?? `Sipariş #${contractDtoForInsertion?.purchaseOrdersId ?? ""}`,
      },



      {
        name: "urunAdi",
        label: "Ürün Adı",
        type: "select",
        options:
          productsState.items?.map((product) => ({
            label: product.productName,
            value: product.productName,
          })) || [],
        colspan: 12,
        group: "Ürün Bilgileri",
        defaultValue: contractDtoForInsertion?.urunAdi || "",
        onChangeEffect(value, formValues, setFields, setValue) {
          if (value) {
            let product = productsState.items?.find(
              (p) => p.productName === value
            );
            if (product) {
              setValue("nsnKodu", product.barkod || "");
            }
          }
        },
      },
      {
        name: "nsnKodu",
        label: "NSN Kodu",
        type: "text",
        colspan: 12,
        group: "Ürün Bilgileri",
        defaultValue: contractDtoForInsertion?.nsnKodu || "",
      },

      {
        name: "adet",
        label: "Adet",
        type: "text",
        colspan: 12,
        group: "Ürün Bilgileri",
        defaultValue: contractDtoForInsertion?.adet || "",
      },
      {
        name: "birimFiyat",
        label: "Birim Fiyat",
        type: "text",
        colspan: 12,
        group: "Ürün Bilgileri",
        defaultValue: contractDtoForInsertion?.birimFiyat || "",
      },
      {
        name: "tutar",
        label: "Tutar",
        type: "text",
        colspan: 12,
        group: "Ürün Bilgileri",
        defaultValue: contractDtoForInsertion?.tutar || "",
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
  const newRecordVoid = async (contract: ContractsDto) => {
    sidebar.openSidebar(
      <GenericForm
        fields={formElements(contract)}
        onSubmit={function (data: ContractsDtoForInsertion): void {
          if (contract && contract.id) {
            // dispatch(contractSlice.actions.updateEntity({ id: contract.id,data:data }));
            refetch(URL + "/contracts/update/" + contract.id, {
              method: "PUT",
              body: data,
            });
            sidebar.closeSidebar();
          } else
            refetch(URL + "/contracts/create", { method: "post", body: data });
          sidebar.closeSidebar();
        }}
      />,
      "right",
      "w-120 h-full",
      contract ? "Sözleşme Düzenle" : "Yeni Sözleşme Ekle"
    );
  };
  const { setLoading } = useLoading();
  return (
    <div className="card">
      <h2 className="text-xl text-center font-bold mb-2">Sözleşmeler</h2>
      <SmartTable
        data={contracts ?? []}
        columns={columns}
        rowIdAccessor={"id"}
        frozenColumns={[{ name: "id", right: true }]}
        newRecordVoid={newRecordVoid}
        scrollHeight="calc(100vh - 200px)"
        enablePagination={false}
      ></SmartTable>
      {showPreview !== 0 && (
        <Editor
          tinymceScriptSrc="/tinymce/tinymce.min.js"
          licenseKey="gpl"
          onInit={(evt, editor) => {
            editorRef.current = editor;
            editor.execCommand("mceFullScreen");
          }}
          initialValue={editorData}
          onEditorChange={(content) => {
            setEditorData(content);
          }}
          init={{
            language: "tr",
            menubar: "file edit view insert format tools table help",
            plugins: [
              "advlist",
              "anchor",
              "autolink",
              "autosave",
              "code",
              "codesample",
              "directionality",
              "emoticons",
              "fullscreen",
              "image",
              "importcss",
              "insertdatetime",
              "link",
              "lists",
              "media",
              "preview",
              "quickbars",
              "searchreplace",
              "table",
              "visualblocks",
              "wordcount",
            ],
            toolbar:
              "undo redo | blocks | bold italic underline | forecolor backcolor | " +
              "link image media | alignleft aligncenter alignright | bullist numlist | table |saveEditorPdf  closeEditor ",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",

            setup: (editor) => {
              // Özel Kapat butonu
              editor.ui.registry.addButton("closeEditor", {
                tooltip: "Editörü Kapat",
                icon: "close", // TinyMCE icon setinde hazır icon
                onAction: () => {
                  // Fullscreen kapatılırsa önce kapat
                  if (editor.mode.get() === "design")
                    editor.execCommand("mceFullScreen");
                  // Editörü DOM’dan kaldır
                  setShowPreview(0);
                },
              });
              editor.ui.registry.addButton("saveEditorPdf", {
                tooltip: "PDF Olarak Kaydet",
                icon: "save", // TinyMCE icon setinde hazır icon
                onAction: async () => {
                  setLoading(true);
                  const result = await dispatch(
                    addFileRecord({
                      fileName:
                        "sozlesme_" +
                        new Date().toLocaleString().replaceAll(" ", "-") +
                        ".pdf",
                      contentType: "application/pdf",
                      sizeKb: 0,
                      content: editorData,
                      uploadedBy: 0,
                      relatedEntityName: "Contract",
                      relatedEntityId: showPreview,
                      type: 5,
                    })
                  ).unwrap();
                  setLoading(false);
                  setShowPreview(0);
                },
              });
              //  editor.on('SkinLoaded', () => {
              //     const style = document.createElement('style');
              //     style.innerHTML = `
              //       .tox .tox-toolbar__button[title="Editörü Kapat"] {
              //         background-color: #ef4444;
              //         color: white;
              //         border-radius: 4px;
              //       }
              //       .tox .tox-toolbar__button[title="Editörü Kapat"]:hover {
              //         background-color: #dc2626;
              //       }
              //     `;
              //     document.head.appendChild(style);
              //   });
            },
          }}
        />
      )}
    </div>
  );
};
