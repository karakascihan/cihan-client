import { URL } from "@/api";
import { Personel, Projects, ProjeTuru } from "@/api/apiDtos";
import { GenericForm } from "@/components/GenericForm";
import { Column, SmartTable } from "@/components/SmartTable";
import { useConfirm } from "@/context/ConfirmContext";
import { useLoading } from "@/context/LoadingContext";
import { useModal } from "@/context/ModalContext";
import { useApiRequest } from "@/hooks/useApiRequest";
import { createGenericSlice } from "@/store/genericSliceFactory";
import { fetchpersonels } from "@/store/slices/personalSlice";
import { AppDispatch, RootState } from "@/store/store";
import { toInputDate } from "@/utils/commonUtils";
import { ReactNode, useEffect } from "react";
import { FaFile, FaPencilAlt, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { FileRecordPage } from "../crm/FileRecordPage";
import { getEnumOptions } from "@/utils/commonUtilsComponent";
import { ProjeTuruDescriptions } from "@/api/extra-enums";
import { appMode, AppModeEnum } from "@/components/Sidebar";



export enum ProjectStatus {
  SiaKapsaminda = "Sia Kapsamında",
  Active = "Aktif",
  Inactive = "Askıda",
  Completed = "Tamamlandı",
  Cancelled = "Kapatıldı"
}

export default function ProjectPage({ isPage = true, type, onSelect }: { isPage: boolean, type?: string, onSelect?: (temp: Projects) => void }) {
  const {
    data: templates,
    loading,
    refetch,
  } = useApiRequest<Projects>(URL + "/projects/getall");
  const { setLoading } = useLoading();
  const { openModal } = useModal();
  const dispatch = useDispatch<AppDispatch>();
  const personelData = useSelector((state: RootState) => state.personel);
  const confirm = useConfirm();

  useEffect(() => {
    dispatch(fetchpersonels({
      onlyNames: false,
      isActive: true
    }));
  }, []);
  const TemplateHandler = async (id?: Projects) => {
    setLoading(true);
    let row: Projects = id;

    setLoading(false);
    openModal({
      maximizable: true,

      title: "Proje " + (row ? "Düzenleme" : "Ekleme"),
      content: function (close: (result: any) => void): ReactNode {
        return (
          <GenericForm

            fields={[
              {
                name: "projeNo",
                label: "Proje No",
                type: "text",
                defaultValue: row?.projeNo ?? "",
                colspan: 3
              },
              {
                name: "projeAdi",
                label: "Proje Adı",
                type: "text",
                defaultValue: row?.projeAdi ?? "",
                colspan: 9
              },
              {
                name: "dgtNo",
                label: "DGT No",
                type: "text",
                defaultValue: row?.dgtNo ?? "",
                colspan: 3

              },
              {
                name: "nsnKodu",
                label: "NSN Kodu",
                type: "text",
                defaultValue: row?.nsnKodu ?? "",
                colspan: 3

              },
              {
                name: "turu",
                label: "Proje Türü" + ProjeTuruDescriptions[ProjeTuru.Diskaynak],
                type: "select",
                defaultValue: row?.turu ?? "",
                options: Object.values(ProjeTuru).filter((v) => typeof v === "number").map((status) => ({
                  value: ProjeTuruDescriptions[status],
                  label: ProjeTuruDescriptions[status]
                })),

                colspan: 6

              },
              {
                name: "durum",
                label: "Proje Durumu",
                type: "select",
                defaultValue: row?.durum ?? "",
                options: Object.values(ProjectStatus).map((status) => ({
                  value: status,
                  label: status
                })),
                colspan: 3
              },
              {
                name: "miktar",
                label: "Miktar",
                type: "number",
                defaultValue: row?.miktar ?? "",
                colspan: 3

              },
              {
                name: "yedekMiktar",
                label: "Yedek Miktar",

                type: "number",
                defaultValue: row?.yedekMiktar ?? "",
                colspan: 3

              },


              {
                name: "baslangicZamani",
                label: "Başlangıç Tarihi",
                type: "date",
                defaultValue: toInputDate(row?.baslangicZamani),
                colspan: 3

              },

              {
                name: "bitisZamani",
                label: "Bitiş Tarihi",
                type: "date",
                defaultValue: toInputDate(row?.bitisZamani),
                colspan: 3

              },
              {
                name: "toplamSure",
                label: "Toplam Süre",
                type: "number",
                defaultValue: row?.toplamSure ?? "",
                colspan: 3

              },
              {
                name: "sorumlu",
                label: "Sorumlu",
                type: "select",
                colspan: 6,
                options: personelData?.items?.map((personel: Personel) => ({
                  value: personel.personelAdi + " " + personel.personelSoyadi,
                  label: personel.personelAdi + " " + personel.personelSoyadi,
                })),

              },
              {
                name: "aciklama",
                label: "Açıklama",
                type: "textarea",
                defaultValue: row?.aciklama ?? "",
                colspan: 12

              }


              //   {
              //     name: "htmlContent",
              //     label: "Müşteri/Tedarikçi",
              //     type: "text",
              //     defaultValue: row?. ?? "",
              //     colspan:12    
              //  },
            ]}
            onSubmit={function (data: any): void {
              data.id = row?.id;
              refetch(URL + "/projects/create", {
                method: "POST",
                body: data,
                notification: {
                  success: row?.id ? "Proje başarılı bir şekilde güncellendi." : "Proje başarılı bir şekilde kaydedildi.",
                  error: row?.id ? "Proje güncellenirken bir hata oluştu." : "Proje kaydedilirken bir hata oluştu.",
                },
              }).then(() => {
                close(true);
                refetch();
              })
            }}
          />
        );
      },
    })
    // .then(x=>  refetch(URL + "/projects/getall", {   method: "GET",  }));
  };
  const getColumns = () => {
    let columns: Column<Projects>[] = [];

    columns.push({
      header: "#",
      accessor: "__index",
    });
    columns.push({
      header: " Proje No",
      accessor: "projeNo",
      filterable: true,
      sortable: true,
      summaryType: "count"
    });
    columns.push({
      header: " Proje Adı",
      accessor: "projeAdi",
      filterable: true,
      sortable: true,
    });
    columns.push({
      header: "DGT No",
      accessor: "dgtNo",
      filterable: true,
      sortable: true,
    });
    columns.push({
      header: "NSN Kodu",
      accessor: "nsnKodu",
      filterable: true,
      sortable: true,
    });
    columns.push({
      header: "Proje Türü",
      accessor: "turu",
      filterable: true,
      filterOptions: Object.values(ProjeTuru).filter((v) => typeof v === "number").map((status) => ({
        value: ProjeTuruDescriptions[status],
        label: ProjeTuruDescriptions[status]
      })),
      filterType: "select",
      sortable: true,
    });

    columns.push({
      header: "Proje Durumu",
      accessor: "durum",
      filterable: true,
      sortable: true,
    });


    columns.push({
      header: "Miktar",
      accessor: "miktar",
      filterable: true,
      sortable: true,
    });

    columns.push({
      header: "Yedek Miktar",
      accessor: "yedekMiktar",
      filterable: true,
      sortable: true,
    });


    columns.push({
      header: "Başlangıç Tarihi",
      accessor: "baslangicZamani",
      filterable: true,
      sortable: true,
      body: (row) => new Date(row.baslangicZamani).toLocaleString(),
    });

    columns.push({
      header: "Bitiş Tarihi",
      accessor: "bitisZamani",
      filterable: true,
      sortable: true,
      body: (row) => new Date(row.bitisZamani).toLocaleString(),
    });

    columns.push({
      header: "Toplam Süre",
      accessor: "toplamSure",
      filterable: true,
      sortable: true,
    });
    columns.push({
      header: "Açıklama",
      accessor: "aciklama",
      filterable: true,
      sortable: true,
    });
    //  columns.push({
    //   header: "Müşteri",
    //   accessor: "",
    //   filterable: true,
    //   sortable: true,
    // });
    if (isPage)
      columns.push({
        header: "İşlemler",
        accessor: "id",
        body: (row: Projects) => (
          <div className="flex flex-row">
            <button
              onClick={() => TemplateHandler(row)}
              className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded mr-2"
            >
              <FaPencilAlt title="Düzenle" />
            </button>
            <button
              onClick={async () => {
                const isConfirmed = await confirm({
                  title: "Silme işlemi",
                  message: "Proje silmek istediğinize emin misiniz?",
                  confirmText: "Evet",
                  cancelText: "Vazgeç",
                });
                if (isConfirmed) {
                  refetch(URL + "/projects/delete/" + row.id, {
                    method: "DELETE",
                    notification: {
                      success: "Proje başarılı bir şekilde silindi.",

                    },
                  }).then(() => refetch(URL + "/projects/getall", {
                    method: "GET",
                  }));
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
              <FaTrash title="Projeyi Sil" />
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
                  title: "Proje Dosyaları",
                  content: function (
                    close: (result: any) => void,
                  ): React.ReactNode {
                    return (
                      <FileRecordPage
                        relatedEntityId={row.id}
                        relatedEntityName="Projects"
                      />
                    );
                  },
                });
              }}
            >
              {" "}
              <FaFile title="Proje Dosyaları" />{" "}
            </button>
          </div>
        ),
      });

    return columns;
  }
  return (
    <div className="card">
      <div className="flex flex-row justify-between gap-4">
        {isPage ? <h2 className="text-xl text-center font-bold mb-2">Projeler</h2> : ""}
      </div>
      <SmartTable
        data={loading ? [] : templates || []}
        // onDoubleClick={(row)=>onSelect(row)}
        columns={getColumns()}
        rowIdAccessor={"id"}
        frozenColumns={[{ name: "id", right: true }]}
        isExport={isPage}
        newRecordVoid={appMode == AppModeEnum.supplier ? undefined : () => TemplateHandler(undefined)}
        scrollHeight="calc(100vh - 200px)"
        enablePagination={false}
      />
    </div>
  );
};
