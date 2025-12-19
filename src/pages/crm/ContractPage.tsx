import {
  ContractsDto,
  ContractsDtoForInsertion,
} from "@/api/apiDtos";
import {
  FieldDefinition,
  GenericForm,
} from "@/components/GenericForm";
import { Column, SmartTable } from "@/components/SmartTable";
import { useConfirm } from "@/context/ConfirmContext";
import { useSidebar } from "@/context/GlobalSidebarContext";
import { contractSlice, productsSlice, RootState } from "@/store/store";
import { useEffect } from "react";
import { set } from "react-hook-form";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FileRecordPage } from "./FileRecordPage";
import { useModal } from "@/context/ModalContext";
import { FaEye, FaShower, FaUpload } from "react-icons/fa6";

export const ContractPage = () => {
  const confirm = useConfirm();
  const sidebar = useSidebar();
  const dispatch = useDispatch();
  const constractsState = useSelector(
    (state: RootState) => state.contract
  ) ;
   const productsState = useSelector(
    (state: RootState) => state.products
  ) ;
  useEffect(() => {
    dispatch(contractSlice.actions.fetchAll());
  }, [dispatch]);
 useEffect(() => {
     if (productsState.items.length===0) {
         dispatch( productsSlice.actions.fetchAll() as any );    
     }
 }, []);
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
    { header: "Sözleşme Tarihi", accessor: "sozlesmeTarihi", filterable: true, sortable: true },
    {
      header: "Sözleşme No",
      accessor: "sozlesmeNo",
      filterable: true,
      sortable: true,
    },
    { header: "Sözleşme Adı", accessor: "sozlesmeAdi", filterable: true, sortable: true },
    { header: "NSN Kodu", accessor: "nsnKodu", filterable: true, sortable: true },
    {
      header: "Ürün Adı",
      accessor: "urunAdi",
      filterable: true,
      sortable: true
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
                dispatch(contractSlice.actions.deleteEntity(row.id!));
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
          <button className="
                    inline-flex items-center 
                    px-4 py-2 
                    bg-green-500 hover:bg-green-600 
                    text-white 
                    rounded 
                    mr-2" onClick={()=>{
                        openModal({
                                      title: "Sözleşme Dosyaları",
                                      content: function (close: (result: any) => void): React.ReactNode {
                                        return <FileRecordPage  relatedEntityId={row.id} relatedEntityName='Contract' />
                                      }})
                    }}  >  <FaEye title="Sözleşme Dosyaları" /> </button>
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
        type: "text",
        colspan: 12,
        group: "Genel",
        required: true,
        defaultValue: contractDtoForInsertion?.kurum || "",
      },
      {
        name: "sirket",
        label: "Şirket",
        type: "text",
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
        name: "urunAdi",
        label: "Ürün Adı",
        type: "select",
        options: productsState.items?.map((product) => ({
          label: product.productName,
          value: product.productName,
        })) || [],
        colspan: 12,
        group: "Ürün Bilgileri",
        defaultValue: contractDtoForInsertion?.urunAdi || "",
        onChangeEffect(value, formValues, setFields, setValue) {
          if (value) {
            let product = productsState.items?.find((p) => p.productName === value);
            if (product) {
        
             setValue("nsnKodu", product.barkod || "");
        }}},
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
  const newRecordVoid = (contract: ContractsDto) => {
    sidebar.openSidebar(
      <GenericForm
        fields={formElements(contract)}
        onSubmit={function (data: ContractsDtoForInsertion): void {
          if (contract && contract.id) {
            dispatch(contractSlice.actions.updateEntity({ id: contract.id,data:data }));
            sidebar.closeSidebar();
          } else dispatch(contractSlice.actions.createEntity(data));
          sidebar.closeSidebar();
        }}
      />,
      "right",
      "w-120 h-full",
      contract ? "Sözleşme Düzenle" : "Yeni Sözleşme Ekle"
    );
  };
  return (
    <div className="card">
      <h2 className="text-xl text-center font-bold mb-2">Sözleşmeler</h2>
      <SmartTable
        data={constractsState.items ?? []}
        columns={columns}
        rowIdAccessor={"id"}
        frozenColumns={[{ name: "id", right: true }]}
        newRecordVoid={newRecordVoid}
        scrollHeight="calc(100vh - 200px)"
        enablePagination={false}
      ></SmartTable>
    </div>
  );
};
