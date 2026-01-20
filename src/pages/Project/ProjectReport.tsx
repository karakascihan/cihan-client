import {
  FieldDefinition,
  FieldOption,
  GenericForm,
} from "@/components/GenericForm";
import { SmartTable } from "@/components/SmartTable";
import { useConfirm } from "@/context/ConfirmContext";
import { useLoading } from "@/context/LoadingContext";
import { useModal } from "@/context/ModalContext";
import { PersonelGetNamesService } from "@/services";
import {
  AppDispatch,
  productsSlice,
  projectReportSlice,
  projectsSlice,
  RootState,
} from "@/store/store";
import { Products, ProjectReport, Projects } from "@/types/commonType";
import { PersonelNames } from "@/types/personel";
import React, { ReactNode, useEffect, useState } from "react";
import {
  FaFileAlt,
  FaPencilAlt,
  FaShower,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "@/store/slices/notificationSlice";
import { fromIsoDateString, toIsoDateString } from "../person/StaffLeaveList";
import { getMimeType } from "@/utils/commonUtils";

 const ProjectReportList = () => {
  const [personels, setPersonels] = useState<PersonelNames[]>([]);
  const data = useSelector((state: RootState) => state.projectReport.items);
  const loading = useSelector(
    (state: RootState) => state.projectReport.loading
  );
  const dispatch = useDispatch<AppDispatch>();
  const products_ = useSelector((state: RootState) => state.products.items);
  const projects_ = useSelector((state: RootState) => state.projects.items);
  useEffect(() => {
    dispatch(projectReportSlice.actions.fetchAll());
  }, [dispatch]);
  useEffect(() => {
    PersonelGetNamesService(true).then((data) => {
      setPersonels(data.result);
    });
  }, []);
  const OpenModal_ = (
    record: ProjectReport,
    data: Projects,
    data1: Products
  ) => {
    openModal({
      maximizable: true,
      title:
        "Proje Takip Raporu " +
        (record?.id ? "Düzenleme" : "Giriş") +
        " Ekranı",
      content(close) {
        let fields: FieldDefinition[] = [
          {
            type: "text",
            name: "id",
            label: "id",
            hidden: true,
            defaultValue: record?.id ?? 0,
            group: "Genel",
          },
          {
            type: "text",
            name: "kullanici",
            label: "Kullanıcı",
            hidden: true,
            defaultValue: record?.kullanici,
            group: "Genel",
          },
          {
            onChangeEffect: (value) => {
              if (value) {
                let changeProject = (data as Projects[]).filter(
                  (x) => x.projeAdi == value
                );
                if (changeProject && changeProject.length > 0) {
                  return { projeNo: changeProject[0].projeNo ?? "" };
                }
              }
              return {};
            },
            defaultValue: record?.projeAdi,
            type: "select",
            name: "projeAdi",
            label: "Proje Adı",
            required: true,
            options: (data as Projects[])?.map<FieldOption>((x) => ({
              label: x.projeAdi ?? "",
              value: x.projeAdi ?? "",
            })),
            group: "Genel",
          },
          {
            defaultValue: record?.projeNo,
            type: "text",
            name: "projeNo",
            label: "Proje No",
            disabled: true,
            group: "Genel",
          },
          {
            defaultValue: record?.parcaAdi,
            type: "text",
            name: "parcaAdi",
            label: "Malzeme/Parça Adı",
            disabled: true,
            onThreeDotsClick: [
              (setValue) => {
                openModal({
                  title: "Parça Seçimi",
                  content(close) {
                    return (
                      <SmartTable
                       
                        pageSize={10}
                        enablePagination={true}
                        data={data1}
                        columns={[
                          { header: "#", accessor: "__index" },
                          {
                            header: "Ürün Kodu",
                            filterable: true,
                            accessor: "productCode",
                          },
                          {
                            header: "Ürün Adı",
                            filterable: true,
                            accessor: "productName",
                          },
                        ]}
                        rowIdAccessor={"id"}
                        onDoubleClick={(item) => {
                          // Modal kapat
                           close(item);
                          // Form değerini güncelle
                          setValue("parcaKodu", item.productCode);
                          setValue("parcaAdi", item.productName);

                        }}
                      />
                    );
                  },
                });
              },
            ],
            group: "Genel",
          },
          {
            defaultValue: record?.parcaKodu,
            type: "text",
            name: "parcaKodu",
            label: "Parça Kodu",
            group: "Genel",
            readOnly:true
          },
          {
            defaultValue: record?.revizyon,
            type: "text",
            name: "revizyon",
            label: "Revizyon No",
            group: "Genel",
          },
          {
            defaultValue: toIsoDateString(record?.tarih),
            type: "date",
            name: "tarih",
            label: "Tarih",
            group: "Genel",
          },
          {
            defaultValue: record?.raporNo,
            type: "text",
            name: "raporNo",
            label: "Rapor No",
            group: "Genel",
          },
          {
            defaultValue: record?.aciklama,
            type: "textarea",
            name: "aciklama",
            label: "Açıklama",
            group: "Açıklama",
            colspan:12
          },
          {
            defaultValue: record?.hazirlayan,
            type: "select",
            name: "hazirlayan",
            label: "Hazırlayan",
            options: personels.filter(x=>x.isActive===true).map<FieldOption>((x) => ({
              label: x.personelAdi + " " + x.personelSoyadi,
              value: x.personelAdi + " " + x.personelSoyadi,
            })),
            group: "Genel",
          },
          {
            defaultValue: record?.onaylayan,
            type: "select",
            name: "onaylayan",
            label: "Onaylayan",
            group: "Genel",
            options: personels.filter(x=>x.isActive===true).map<FieldOption>((x) => ({
              label: x.personelAdi + " " + x.personelSoyadi,
              value: x.personelAdi + " " + x.personelSoyadi,
            })),
          },
          {
            defaultValue:record? record?.isActive:true,
            type: "checkbox",
            name: "isActive",
            label: "Aktif",
            group: "Genel",
          },
          
        ];
          record?.dosyalar?.forEach((file, index) => {
            fields.push({
               readOnly: true,
              type: "text",
              name: `dosyalar[${index}].dosyaAdi`,
              label: index + 1 + ".Dosya",
              defaultValue: file.dosyaAdi,
              colspan:12,
              group: "Dosyalar",
              clickIcon: [
                //  <FaUpload color="green" title="Dosya Yükle" />,
                    <FaFileAlt title="Önizleme" />,
                    <FaTrash color="red" title="Sil" />,
              ],
              onThreeDotsClick: [
                // (setValue) => {
                //   var input = document.createElement("input");
                //   input.type = "file";
                //   input.accept = ".pdf,image/*"; // PDF ve resim dosyaları için
                //   input.onchange = async (event) => {
                //     const fileList = (event.target as HTMLInputElement).files;
                //     if (fileList && fileList.length > 0) {
                //       const file = fileList[0];
                //       file.arrayBuffer().then((buffer) => {
                //         const bytes = btoa(
                //           new Uint8Array(buffer).reduce(
                //             (acc, byte) => acc + String.fromCharCode(byte),
                //             ""
                //           )
                //         );
                //         setValue(`dosyalar[${index}].bytes`, bytes);
                //         setValue(
                //           `dosyalar[${index}].uzantisi`,
                //           "." + file.name.split(".").pop().toUpperCase() || ""
                //         );
                //         setValue(
                //           `dosyalar[${index}].dosyaAdi`,
                //           file.name.split(".")[0].toUpperCase() || ""
                //         );
                //       });
                //     }
                //   };
                //   input.click();
                // },
                (setValue, allValues) => {
                  const fileUrl = `data:${getMimeType(
                    allValues.dosyalar[index].uzantisi
                      ?.replace(".", "")
                      .toLowerCase()
                  )};base64,${allValues.dosyalar[index].bytes}`;
                  let title = allValues.dosyalar[index].dosyaAdi;
                  openModal({
                    title: title,
                    maximized: true,
                    content: function (
                      close: (result: any) => void
                    ): ReactNode {
                      return (
                        <iframe
                          src={fileUrl}
                          width="100%"
                          height="100%"
                          style={{ border: "none" }}
                          title="PDF Viewer"
                        />
                      );
                    },
                  });
                },
                (setValue, allValues, setFields) => {
                  setValue(`dosyalar[${index}].dosyaAdi`, "");
                 setFields&& setFields((prev) =>
                    prev.filter((x) => x.name != `dosyalar[${index}].dosyaAdi`)
                  );
                },
              ],
            });
            fields.push({
              type: "text",
              name: `dosyalar[${index}].bytes`,
              label: "Dosya Adı",
              defaultValue: file.bytes,
              group: "Dosyalar",
              hidden: true,
            });
            fields.push({
              type: "text",
              name: `dosyalar[${index}].projectReport_Id`,
              label: "Dosya Adı",
              defaultValue: file.projectReport_Id,
              group: "Dosyalar",
              hidden: true,
            });
            fields.push({
              type: "text",
              name: `dosyalar[${index}].uzantisi`,
              label: "Dosya Uzantısı",
              defaultValue: file.uzantisi,
              group: "Dosyalar",
              hidden: true,
            });
          });
        if(record) {
          fields.push({
            defaultValue: null,
            type: "button",
            name: "btn",
            label: "Yeni Dosya Ekle",
            group: "Dosyalar",
            onClick(setFields, setValue, allValues) {
              
              let input = document.createElement("input");
              input.type = "file";
              input.accept = ".pdf,image/*"; // PDF ve resim dosyaları için
              input.onchange = async (event) => {
                let index = allValues?.dosyalar ? allValues.dosyalar.length : 0;
              setFields((prev) => [
                ...prev,
                {
                  readOnly: true,
                  type: "text",
                  name: `dosyalar[${index}].dosyaAdi`,
                  label: index + 1 + ".Dosya",
                  defaultValue: "",
                  colspan:12,
                  group: "Dosyalar",
                  clickIcon: [
                    // <FaUpload color="green" title="Dosya Yükle" />,
                    <FaFileAlt title="Önizleme" />,
                    <FaTrash color="red" title="Sil" />,
                  ],
                  onThreeDotsClick: [
                    // (setValue) => {
                    //   let input = document.createElement("input");
                    //   input.type = "file";
                    //   input.accept = ".pdf,image/*"; // PDF ve resim dosyaları için
                    //   input.onchange = async (event) => {
                    //     const fileList = (event.target as HTMLInputElement)
                    //       .files;
                    //     if (fileList && fileList.length > 0) {
                    //       const file = fileList[0];
                    //       file.arrayBuffer().then((buffer) => {
                    //         const bytes = btoa(
                    //           new Uint8Array(buffer).reduce(
                    //             (acc, byte) => acc + String.fromCharCode(byte),
                    //             ""
                    //           )
                    //         );
                    //         setValue(`dosyalar[${index}].bytes`, bytes);
                    //         setValue(
                    //           `dosyalar[${index}].uzantisi`,
                    //           "." + file.name.split(".").pop().toUpperCase() ||
                    //             ""
                    //         );
                    //         setValue(
                    //           `dosyalar[${index}].dosyaAdi`,
                    //           file.name.split(".")[0].toUpperCase() || ""
                    //         );
                    //       });
                    //     }
                    //   };
                    //   input.click();
                    // },
                    (setValue, allValues) => {
                      const fileUrl = `data:${getMimeType(
                        allValues.dosyalar[index].uzantisi
                          ?.replace(".", "")
                          .toLowerCase()
                      )};base64,${allValues.dosyalar[index].bytes}`;
                      let title = allValues.dosyalar[index].dosyaAdi;
                      openModal({
                        title: title,
                        maximized: true,
                        content: function (
                          close: (result: any) => void
                        ): ReactNode {
                          return (
                            <iframe
                              src={fileUrl}
                              width="100%"
                              height="100%"
                              style={{ border: "none" }}
                              title="PDF Viewer"
                            />
                          );
                        },
                      });
                    },
                      (setValue, allValues, setFields) => {
                  setValue(`dosyalar[${index}].dosyaAdi`, "");
                 setFields&& setFields((prev) =>
                    prev.filter((x) => x.name != `dosyalar[${index}].dosyaAdi`)
                  );
                },
                  ],
                },
              ]);
                const fileList = (event.target as HTMLInputElement).files;
                if (fileList && fileList.length > 0) {
                  const file = fileList[0];
                  file.arrayBuffer().then((buffer) => {
                    const bytes = btoa(
                      new Uint8Array(buffer).reduce(
                        (acc, byte) => acc + String.fromCharCode(byte),
                        ""
                      )
                    );
                    setValue(`dosyalar[${index}].bytes`, bytes);
                    setValue(
                      `dosyalar[${index}].uzantisi`,
                      "." + file.name.split(".").pop().toUpperCase() || ""
                    );
                    setValue(
                      `dosyalar[${index}].dosyaAdi`,
                      file.name.split(".")[0].toUpperCase() || ""
                    );
                  });
                } else {
                  setFields((prev) =>
                    prev.filter((x) => x.name != `dosyalar[${index}].dosyaAdi`)
                  );
                }
              };
              input.click();
            },
          },);
        }
        return (
          <GenericForm
            fields={fields}
            onSubmit={function (data: ProjectReport): void {
              data.tarih = fromIsoDateString(data.tarih);
              data.dosyalar = data.dosyalar?.filter(
                (x) => x.dosyaAdi && x.dosyaAdi !== ""
              );
              dispatch(projectReportSlice.actions.createItem(data));
              close(null);
            }}
          />
        );
      },
    });
  };
  const { setLoading } = useLoading();
  setLoading(loading);
  const { openModal } = useModal();
  const NewRecordHandler = async (record?: ProjectReport) => {
    if (
      (projects_.length == 0 || projects_ == null) &&
      (products_.length == 0 || products_ == null)
    ) {
      dispatch(await projectsSlice.actions.fetchAll())
        .unwrap()
        .then(async (data) => {
          dispatch(await productsSlice.actions.fetchAll())
            .unwrap()
            .then((data1) => {
              OpenModal_(record, data, data1);
            });
        });
    } else {
      OpenModal_(record, projects_, products_);
    }
  };
  const confirm = useConfirm();
  const actionBodyTemplate = (rowData: ProjectReport) => (
    <div className="flex flex-row">
      <button
        onClick={() => {
          NewRecordHandler(rowData);
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
            message: "Formu silmek istediğinize emin misiniz?",
            confirmText: "Evet",
            cancelText: "Vazgeç",
          });
          if (isConfirmed) {
            dispatch(projectReportSlice.actions.deleteItem(rowData.id));
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
        <FaTrash title="Formu Sil" />
      </button>
      {/* <input type="file" ref={inputRef} onChange={(e) => UploadDocument(e, rowData.id ?? -1,rowData.contentType)} style={{ display: "none" }} /> */}
    </div>
  );
  return (
    <div className="card">
      <h2 className="text-xl text-center font-bold mb-2">
        Proje Takip Raporu Listesi
      </h2>
      <SmartTable
        data={data}
        enablePagination={false}
          frozenColumns={[{name:"id",right:true}]}
        scrollHeight="calc(100vh - 200px)"
        newRecordVoid={NewRecordHandler}
        // tableClassName="min-w-max"
        columns={[
          {
            accessor: "__index",
            header: "#",
          },
          {
            accessor: "raporNo",
            header: "Rapor No",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "tarih",
            header: "Tarih",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "projeNo",
            header: "Proje No",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "parcaKodu",
            header: "Parca Kodu",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "parcaAdi",
            header: "Parça Adı",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "revizyon",
            header: "Revizyon",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "hazirlayan",
            header: "Hazırlayan",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "onaylayan",
            header: "Onaylayan",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "aciklama",
            header: "Açıklama",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "durumu",
            header: "Durumu",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "durumAciklama",
            header: "Durum Açıklama",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "kullanici",
            header: "Kullanıcı",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "isActive",
            header: "Aktif",
            filterable: true,
            sortable: true,
            body: (e) => (e.isActive ? "Aktif" : "Pasif"),
          },
          {
            accessor: "dosyalar",
            header: "Dosya Durumu",

            body: (e) => (e.dosyalar?.length > 0 ? "Var" : "Yok"),
          },
          {
            accessor: "id",
            header: "İşlemler",
            body: (e) => actionBodyTemplate(e),
          },
        ]}
        rowIdAccessor={"id"}
      />
    </div>
  );
};
export default ProjectReportList;
