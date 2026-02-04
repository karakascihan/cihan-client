import { URL } from "@/api";
import {
  CustomerDto,
  CustomerDtoForInsertion,
  CustomerType,
} from "@/api/apiDtos";
import { CustomerTypeDescriptions } from "@/api/extra-enums";
import {
  FieldDefinition,
  GenericForm,
} from "@/components/GenericForm";
import { Column, SmartTable } from "@/components/SmartTable";
import { useConfirm } from "@/context/ConfirmContext";
import { useSidebar } from "@/context/GlobalSidebarContext";
import { useApiRequest } from "@/hooks/useApiRequest";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

 const SupplierPage = () => {
  const confirm = useConfirm();
  const sidebar = useSidebar();
  const {data,refetch} = useApiRequest<CustomerDto>(URL+"/customer/getall?tip="+CustomerType.Tedarikci,{method:"GET"});
  const columns: Column<CustomerDto>[] = [
    { header: "#", accessor: "__index" },
    {
      header: "Müşteri Adı",
      accessor: "firma",
      filterable: true,
      sortable: true,
      summaryType:"count"
    },
     {
      header: "Müşteri Kısa Adı",
      accessor: "firmaKisaAd",
      filterable: true,
      sortable: true,
    },
    {
      header: "Yetkili",
      accessor: "yetkili",
      filterable: true,
      sortable: true,
    },
    { header: "Email", accessor: "email", filterable: true, sortable: true },
    { header: "Vergi No", accessor: "vergiNumarasi", filterable: true, sortable: true },
    {
      header: "Telefon",
      accessor: "telefon",
      filterable: true,
      sortable: true,
    },
    { header: "Adres", accessor: "adres", filterable: true, sortable: true },
    { header: "Ülke", accessor: "ulkeAdi", filterable: true, sortable: true },
    {
      header: "Müşteri Türü",
      accessor: "sirketTuru",
      filterable: true,
      sortable: true,
      body: (row: CustomerDto) => (
        <span>{CustomerTypeDescriptions[row.sirketTuru]}</span>
      ),
    },
    {
      header: "Sektör",
      accessor: "sektor",
      filterable: true,
      sortable: true,
    },
    {
      header: "Referans",
      accessor: "referans",
      filterable: true,
      sortable: true,
    },

    {
      header: "İşlemler",
      body: (row: CustomerDto) => (
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
                message: "Müşteriyi silmek istediğinize emin misiniz?",
                confirmText: "Evet",
                cancelText: "Vazgeç",
              });
              if (isConfirmed) {
                refetch(URL+"/customer/delete/"+row.id,{method:"delete",body:data,notification:{success:"Tedarikçi başarılı şekilde silindi."}});
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
        </div>
      ),
      accessor: "id",
    },
  ];
  const formElements = ( customerDtoForInsertion: CustomerDtoForInsertion) => {
    let fields: FieldDefinition[] = [
      {
        name: "firma",
        label: "Şirket İsmi",
        type: "text",
        colspan: 12,
        group: "Genel",
        required: true,
        defaultValue: customerDtoForInsertion?.firma || "",
      },
        {
        name: "firmaKisaAd",
        label: "Şirket Kısa Adı",
        type: "text",
        colspan: 12,
        group: "Genel",
        required: true,
        defaultValue: customerDtoForInsertion?.firmaKisaAd || "",
      },
      {
        name: "sirketTuru",
        label: "Şirket Tipi",
        type: "select",
        options: [
          { label: "Müşteri", value: "0" },
          { label: "Tedarikçi", value: "1" },
          { label: "Diğer", value: "2" },
        ],
        colspan: 12,
        group: "Genel",
        required: true,
        defaultValue: customerDtoForInsertion?.sirketTuru || "0",
      },
      {
        name: "yetkili",
        label: "Yetkili Kişi",
        type: "text",
        colspan: 12,
        group: "Genel",

        defaultValue: customerDtoForInsertion?.yetkili || "",
      },
      {
        name: "telefon",
        label: "Telefon",
        type: "text",
        colspan: 12,
        group: "Genel",
        required: true,
        defaultValue: customerDtoForInsertion?.telefon || "",
        // pattern: /^[0-9]{10}$/,
      },
      {
        name: "vergiNumarasi",
        label: "Vergi Numarası",
        type: "text",
        colspan: 12,
        group: "Genel",
        defaultValue: customerDtoForInsertion?.vergiNumarasi || ""
      },
      {
        name: "email",
        label: "E-mail",
        type: "text",
        colspan: 12,
        group: "Genel",
        required: true,
        defaultValue: customerDtoForInsertion?.email || "",
        pattern: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
      },
      {
        name: "adres",
        label: "Adres",
        type: "textarea",
        colspan: 12,
        group: "Genel",

        defaultValue: customerDtoForInsertion?.adres || "",
      },
      {
        name: "ulkeAdi",
        label: "Ülke",
        type: "text",
        colspan: 12,
        group: "Genel",
        defaultValue: customerDtoForInsertion?.ulkeAdi || "",
      },
      {
        name: "sektor",
        label: "Sektör",
        type: "text",
        colspan: 12,
        group: "Diğer",
        defaultValue: customerDtoForInsertion?.sektor || "",
      },
      {
        name: "referans",
        label: "Referans",
        type: "text",
        colspan: 12,
        group: "Diğer",
        defaultValue: customerDtoForInsertion?.referans || "",
      },
      
    ];
    let contactsLength = customerDtoForInsertion?.contacts?.length ?? 0;
    if (contactsLength > 0) {
      for (let i = 0; i < contactsLength; i++) {
        fields.push({
          name: `contacts.${i}.id`,
          label: "id",
          type: "text",
          group: "Kişiler",
          hidden: true,
          colspan: 12,
          defaultValue:
            customerDtoForInsertion?.contacts &&
            customerDtoForInsertion?.contacts.length > 0
              ? customerDtoForInsertion?.contacts[i].id
              : "",
        });
        fields.push({
          name: `contacts.${i}.yetkiliKisi`,
          label: "Yetkili Kişi",
          type: "text",
          group: "Kişiler",
          colspan: 12,
          defaultValue:
            customerDtoForInsertion?.contacts &&
            customerDtoForInsertion?.contacts.length > 0
              ? customerDtoForInsertion?.contacts[i].yetkiliKisi
              : "",
        });
        fields.push({
          name: `contacts.${i}.gorevi`,
          label: "Görevi",
          type: "text",
          group: "Kişiler",
          colspan: 12,
          defaultValue:
            customerDtoForInsertion?.contacts &&
            customerDtoForInsertion?.contacts.length > 0
              ? customerDtoForInsertion?.contacts[i].gorevi
              : "",
        });
        fields.push({
          name: `contacts.${i}.tel`,
          label: "Telefon",
          type: "text",
          group: "Kişiler",
          colspan: 12,
          defaultValue:
            customerDtoForInsertion?.contacts &&
            customerDtoForInsertion?.contacts.length > 0
              ? customerDtoForInsertion?.contacts[i].tel
              : "",
        });
        fields.push({
          name: `contacts.${i}.eposta`,
          label: "Mail",
          type: "text",
          group: "Kişiler",
          colspan: 12,
          defaultValue:
            customerDtoForInsertion?.contacts &&
            customerDtoForInsertion?.contacts.length > 0
              ? customerDtoForInsertion?.contacts[i].eposta
              : "",
        });
        fields.push({
           name: `line_${i}`,
          label: "",
          type: "line",
          group: "Kişiler",
          colspan: 12,
          defaultValue: "",
        });
      }
    }
    
    fields.push({
      defaultValue: null,
      type: "button",
      name: "btn",
      label: "Yeni Kişi Ekle",
      group: "Kişiler",
      onClick(setFields: any, setValue: any, allValues: any) {
        setValue(
          `contacts.${
            contactsLength == 0 ? 0 : contactsLength + 1
          }.yetkiliKisi`,
          ""
        );
        setFields((prev: any) => [
          ...prev,
          ...[
            {
              type: "text",
              name: `contacts.${
                contactsLength == 0 ? 0 : contactsLength + 1
              }.yetkiliKisi`,
              label: "Yetkili Kişi",
              defaultValue: "",
              colspan: 12,
              group: "Kişiler",
            },
            {
              type: "text",
              name: `contacts.${
                contactsLength == 0 ? 0 : contactsLength + 1
              }.gorevi`,
              label: "Görevi",
              defaultValue: "",
              colspan: 12,
              group: "Kişiler",
            },
            {
              type: "text",
              name: `contacts.${
                contactsLength == 0 ? 0 : contactsLength + 1
              }.tel`,
              label: "Telefon",
              defaultValue: "",
              colspan: 12,
              group: "Kişiler",
            },
            {
              type: "text",
              name: `contacts.${
                contactsLength == 0 ? 0 : contactsLength + 1
              }.eposta`,
              label: "Mail",
              defaultValue: "",
              colspan: 12,
              group: "Kişiler",
            },
            {
               name: `line_${contactsLength + 1}`,
          label: "",
          type: "line",
          group: "Kişiler",
          colspan: 12,
          defaultValue: "",
            }
            
          ],
        ]);
      },
    });
    return fields;
  };
  const newRecordVoid = (customer: CustomerDto) => {
    sidebar.openSidebar(
      <GenericForm
        fields={formElements(customer)}
        onSubmit={function (data: CustomerDtoForInsertion & { id: number }): void {
          if (customer && customer.id) {
            data.id = customer.id;
            data.contacts = data.contacts?? [];
            refetch(URL+"/customer/update",{method:"put",body:data,notification:{success:"Tedarikçi başarılı şekilde güncellendi."}});
            sidebar.closeSidebar();
          } else  refetch(URL+"/customer/create",{method:"post",body:data,notification:{success:"Tedarikçi başarılı şekilde kaydedildi."}});

          sidebar.closeSidebar();
        }}
      />,
      "right",
      "w-120 h-full",
      customer ? "Müşteri Düzenle" : "Yeni Müşteri Ekle"
    );
  };
  return (
    <div className="card">
      <h2 className="text-xl text-center font-bold mb-2">Tedarikçiler</h2>
      <SmartTable
        data={data ?? []}
        columns={columns}
        rowIdAccessor={"id"}
        frozenColumns={[{ name: "id", right: true }]}
        isExport={true}
        newRecordVoid={newRecordVoid}
        scrollHeight="calc(100vh - 200px)"
        enablePagination={false}
      ></SmartTable>
    </div>
  );
};
export default SupplierPage;