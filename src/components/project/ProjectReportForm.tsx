import React, { ReactNode } from "react";
import {
  FieldDefinition,
  FieldOption,
  GenericForm,
} from "@/components/GenericForm";
import { SmartTable } from "@/components/SmartTable";
import { useModal } from "@/context/ModalContext";
import { ProjectReport, Projects, Products } from "@/types/commonType";
import { PersonelNames } from "@/types/personel";
import { fromIsoDateString, toIsoDateString } from "@/pages/person/StaffLeaveList";
import { getMimeType } from "@/utils/commonUtils";
import {
  convertFileToBase64,
  getFileExtension,
  getFileNameWithoutExtension,
  createFileDataUrl,
} from "@/utils/projectReportHelpers";
import { FilePreviewModal } from "./FilePreviewModal";
import { FaFileAlt, FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { AppDispatch, projectReportSlice } from "@/store/store";

interface ProjectReportFormProps {
  record?: ProjectReport;
  projects: Projects[];
  products: Products[];
  personels: PersonelNames[];
  onClose: (data: any) => void;
}

export const ProjectReportForm: React.FC<ProjectReportFormProps> = ({
  record,
  projects,
  products,
  personels,
  onClose,
}) => {
  const { openModal } = useModal();
  const dispatch = useDispatch<AppDispatch>();

  const createFileField = (
    file: { dosyaAdi: string; bytes: string; uzantisi: string; projectReport_Id?: number },
    index: number
  ): FieldDefinition[] => {
    return [
      {
        readOnly: true,
        type: "text",
        name: `dosyalar[${index}].dosyaAdi`,
        label: index + 1 + ".Dosya",
        defaultValue: file.dosyaAdi,
        colspan: 12,
        group: "Dosyalar",
        clickIcon: [<FaFileAlt title="Önizleme" />, <FaTrash color="red" title="Sil" />],
        onThreeDotsClick: [
          // Preview file
          (setValue, allValues) => {
            const fileUrl = createFileDataUrl(
              allValues.dosyalar[index].bytes,
              allValues.dosyalar[index].uzantisi,
              getMimeType
            );
            const title = allValues.dosyalar[index].dosyaAdi;
            openModal({
              title: title,
              maximized: true,
              content: function (close: (result: any) => void): ReactNode {
                return <FilePreviewModal fileUrl={fileUrl} title={title} />;
              },
            });
          },
          // Delete file
          (setValue, allValues, setFields) => {
            setValue(`dosyalar[${index}].dosyaAdi`, "");
            setFields &&
              setFields((prev) =>
                prev.filter((x) => x.name !== `dosyalar[${index}].dosyaAdi`)
              );
          },
        ],
      },
      {
        type: "text",
        name: `dosyalar[${index}].bytes`,
        label: "Dosya Adı",
        defaultValue: file.bytes,
        group: "Dosyalar",
        hidden: true,
      },
      {
        type: "text",
        name: `dosyalar[${index}].projectReport_Id`,
        label: "Dosya Adı",
        defaultValue: file.projectReport_Id,
        group: "Dosyalar",
        hidden: true,
      },
      {
        type: "text",
        name: `dosyalar[${index}].uzantisi`,
        label: "Dosya Uzantısı",
        defaultValue: file.uzantisi,
        group: "Dosyalar",
        hidden: true,
      },
    ];
  };

  const handleFileUpload = (
    setFields: any,
    setValue: any,
    allValues: any
  ) => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,image/*";
    input.onchange = async (event) => {
      const index = allValues?.dosyalar ? allValues.dosyalar.length : 0;
      const fileList = (event.target as HTMLInputElement).files;

      if (fileList && fileList.length > 0) {
        const file = fileList[0];

        // Add field first
        setFields((prev: FieldDefinition[]) => [
          ...prev,
          ...createFileField(
            {
              dosyaAdi: "",
              bytes: "",
              uzantisi: "",
            },
            index
          ),
        ]);

        // Then populate values
        const bytes = await convertFileToBase64(file);
        setValue(`dosyalar[${index}].bytes`, bytes);
        setValue(`dosyalar[${index}].uzantisi`, getFileExtension(file.name));
        setValue(`dosyalar[${index}].dosyaAdi`, getFileNameWithoutExtension(file.name));
      }
    };
    input.click();
  };

  const getFields = (): FieldDefinition[] => {
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
            const changeProject = projects.filter((x) => x.projeAdi == value);
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
        options: projects?.map<FieldOption>((x) => ({
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
                    data={products}
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
                      close(item);
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
        readOnly: true,
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
        colspan: 12,
      },
      {
        defaultValue: record?.hazirlayan,
        type: "select",
        name: "hazirlayan",
        label: "Hazırlayan",
        options: personels
          .filter((x) => x.isActive === true)
          .map<FieldOption>((x) => ({
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
        options: personels
          .filter((x) => x.isActive === true)
          .map<FieldOption>((x) => ({
            label: x.personelAdi + " " + x.personelSoyadi,
            value: x.personelAdi + " " + x.personelSoyadi,
          })),
      },
      {
        defaultValue: record ? record?.isActive : true,
        type: "checkbox",
        name: "isActive",
        label: "Aktif",
        group: "Genel",
      },
    ];

    // Add existing file fields
    record?.dosyalar?.forEach((file, index) => {
      fields.push(...createFileField(file, index));
    });

    // Add "New File" button only for existing records
    if (record) {
      fields.push({
        defaultValue: null,
        type: "button",
        name: "btn",
        label: "Yeni Dosya Ekle",
        group: "Dosyalar",
        onClick(setFields, setValue, allValues) {
          handleFileUpload(setFields, setValue, allValues);
        },
      });
    }

    return fields;
  };

  const handleSubmit = (data: ProjectReport) => {
    data.tarih = fromIsoDateString(data.tarih);
    data.dosyalar = data.dosyalar?.filter((x) => x.dosyaAdi && x.dosyaAdi !== "");
    dispatch(projectReportSlice.actions.createItem(data));
    onClose(null);
  };

  return <GenericForm fields={getFields()} onSubmit={handleSubmit} />;
};
