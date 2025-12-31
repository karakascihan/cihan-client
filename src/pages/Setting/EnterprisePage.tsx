import { EnterpriseDto, EnterpriseDtoForInsertion } from "@/api/apiDtos";
import { FieldDefinition, GenericForm } from "@/components/GenericForm";
import { Column, SmartTable } from "@/components/SmartTable";
import { useConfirm } from "@/context/ConfirmContext";
import { useSidebar } from "@/context/GlobalSidebarContext";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useModal } from "@/context/ModalContext";
import { FaEye, FaFile, FaShower, FaUpload } from "react-icons/fa6";
import { useLoading } from "@/context/LoadingContext";
import { useApiRequest } from "@/hooks/useApiRequest";
import { URL } from "@/api";
import { ReactNode } from "react";

export const EnterprisePage = () => {
  const confirm = useConfirm();
  const sidebar = useSidebar();
  const { data: enterprise, refetch } = useApiRequest<EnterpriseDto[]>(
    URL + "/enterprise/getall",
    {
      method: "GET",
      skip: false,
      deps: [],
    }
  );

  const { openModal } = useModal();
  const columns: Column<EnterpriseDto>[] = [
    { header: "#", accessor: "__index" },
    {
      header: "Şirket Adı",
      accessor: "enterpriseName",
      filterable: true,
      sortable: true,
    },
    {
      header: "Şirket Kısa Adı",
      accessor: "shortName",
      filterable: true,
      sortable: true,
    },
    {
      header: "Sektör",
      accessor: "sector",
      filterable: true,
      sortable: true,
    },
    {
      header: "Şehir",
      accessor: "city",
      filterable: true,
      sortable: true,
    },
    {
      header: "Ülke",
      accessor: "country",
      filterable: true,
      sortable: true,
    },
    {
      header: "Telefon",
      accessor: "phone",
      filterable: true,
      sortable: true,
    },
    {
      header: "Email",
      accessor: "email",
      filterable: true,
      sortable: true,
    },
    {
      header: "Yetkili Personel",
      accessor: "contactPerson",
      filterable: true,
      sortable: true,
    },
    {
      header: "İşlemler",
      body: (row: EnterpriseDto) => (
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
                message: "Şirketi silmek istediğinize emin misiniz?",
                confirmText: "Evet",
                cancelText: "Vazgeç",
              });
              if (isConfirmed) {
                refetch(URL + "/enterprise/delete/" + row.id, {
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
            <FaTrash title="Şirketi Sil" />
          </button>
       
        </div>
      ),
      accessor: "id",
    },
  ];
  const formElements: (dto: EnterpriseDto) => FieldDefinition[] = (
    enterpriseDto
  ) => {
    return [
      {
        name: "enterpriseName",
        label: "Şirket Adı",
        type: "text",
        defaultValue: enterpriseDto?.enterpriseName,
        group: "Genel",
      },
      {
        name: "shortName",
        label: "Şirket Kısa Adı",
        type: "text",
        defaultValue: enterpriseDto?.shortName,
        group: "Genel",
      },
      {
        name: "logoUrl",
        label: "Log Url",
        type: "text",
        defaultValue: enterpriseDto?.logoUrl,
        group: "Genel",
      },
      {
        name: "sector",
        label: "Sektör",
        type: "text",
        defaultValue: enterpriseDto?.sector,
        group: "Genel",
      },
      {
        name: "address",
        label: "Adres",
        type: "text",
        defaultValue: enterpriseDto?.address,
        group: "Genel",
      },
      {
        name: "city",
        label: "Şehir",
        type: "text",
        defaultValue: enterpriseDto?.city,
        group: "Genel",
      },
      {
        name: "country",
        label: "Ülke",
        type: "text",
        defaultValue: enterpriseDto?.country,
        group: "Genel",
      },
      {
        name: "phone",
        label: "Telefon",
        type: "text",
        defaultValue: enterpriseDto?.phone,
        group: "İletişim",
      },
      {
        name: "email",
        label: "Email",
        type: "text",
        defaultValue: enterpriseDto?.email,
        group: "İletişim",
      },
      {
        name: "s",
        label: "Website",
        type: "text",
        defaultValue: enterpriseDto?.website,
        group: "İletişim",
      },
      {
        name: "contactPerson",
        label: "Yetkili Kişi",
        type: "text",
        defaultValue: enterpriseDto?.contactPerson,
        group: "Yetkili",
      },
      {
        name: "contactTitle",
        label: "Yetkili Görevi",
        type: "text",
        defaultValue: enterpriseDto?.contactTitle,
        group: "Yetkili",
      },
      {
        name: "contactEmail",
        label: "Yetkili Mail",
        type: "text",
        defaultValue: enterpriseDto?.contactEmail,
        group: "Yetkili",
      },
      {
        name: "contactPhone",
        label: "Yetkili Telefon",
        type: "text",
        defaultValue: enterpriseDto?.contactPhone,
        group: "Yetkili",
      },
      {
        name: "taxNumber",
        label: "Vergi Numarası",
        type: "text",
        defaultValue: enterpriseDto?.taxNumber,
        group: "Muhasebe",
      },
      {
        name: "taxOffice",
        label: "Vergi Dairesi",
        type: "text",
        defaultValue: enterpriseDto?.taxOffice,
        group: "Muhasebe",
      },
      {
        name: "iban",
        label: "IBAN",
        type: "text",
        defaultValue: enterpriseDto?.iban,
        group: "Diğer",
      },
      {
        name: "currency",
        label: "Para Birimi",
        type: "text",
        defaultValue: enterpriseDto?.currency,
               group: "Diğer",

      }
    ];
  };

  const newRecordVoid = async (enterprise: EnterpriseDto) => {
    openModal({
      style:{height:"80vh",width:"50vw"},
      title: enterprise ? "Şirket Düzenle" : "Yeni Şirket Ekle",
      content: function (close: (result: any) => void): ReactNode {
        return (
          <GenericForm
            fields={formElements(enterprise)}
            onSubmit={function (data: EnterpriseDtoForInsertion): void {
              if (enterprise && enterprise.id) {
                // dispatch(contractSlice.actions.updateEntity({ id: contract.id,data:data }));
                refetch(URL + "/enterprise/update/" + enterprise.id, {
                  method: "PUT",
                  body: data,
                });
              } else
                refetch(URL + "/enterprise/create", {
                  method: "post",
                  body: data,
                });
              close(null);
            }}
          />
        );
      },
    });
  };
  const { setLoading } = useLoading();
  return (
    <div className="card">
      <h2 className="text-xl text-center font-bold mb-2">Şirketler</h2>
      <SmartTable
        data={enterprise ?? []}
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
