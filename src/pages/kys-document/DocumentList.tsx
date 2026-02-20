import {
  KYSDOCUMENT_CREATEUPDATE,
  KYSDOCUMENT_DELETE,
  KYSDOCUMENT_DOWNLOAD,
  KYSDOCUMENT_GETALL,
  KYSDOCUMENT_UPLOAD,
} from "@/api";
import { FieldDefinition, GenericForm } from "@/components/GenericForm";
import { SmartTable } from "@/components/SmartTable";
import { useConfirm } from "@/context/ConfirmContext";
import { useModal } from "@/context/ModalContext";
import { KysDocumentType } from "@/enums";
import { useApiRequest } from "@/hooks/useApiRequest";
import { apiRequest, uploadDocument } from "@/services";
import { KysDocument } from "@/types/commonType";
import { getExtensionFromMimeType, parseToJsDate } from "@/utils/commonUtils";
import React, { ReactNode, useEffect, useRef, useState } from "react";
import {
  FaDownload,
  FaPencilAlt,
  FaPersonBooth,
  FaTrash,
  FaUpload,
} from "react-icons/fa";
import { useParams } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import MenuButton, { MenuItem } from "@/components/MenuButton";
import { setNotification } from "@/store/slices/notificationSlice";
const DocumentList = ({ type }: { type?: string }) => {
  const { data, setData } = useApiRequest<KysDocument>(
    KYSDOCUMENT_GETALL + (type ? "?type=" + type : "")
  );
  const { refetch } = useApiRequest<KysDocument>(KYSDOCUMENT_UPLOAD, {
    method: "POST",
    skip: true,

  });
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { openModal } = useModal();
  const confirm = useConfirm();
  const user = useSelector((state: RootState) => state.login.user);

  const fields: FieldDefinition[] = [
    {
      name: "documentNo",
      label: "Doküman No",
      type: "text",
      required: true,
      minLength: 3,
      group: "Genel",
    },
    {
      name: "documentName",
      label: "Doküman Adı",
      type: "text",
      required: true,
      minLength: 3,
      group: "Genel",
    },
  ];
  const GetFields = (document?: KysDocument): FieldDefinition[] => {
    return [
      {
        name: "documentNo",
        label: "Doküman No",
        type: "text",
        required: true,
        minLength: 3,
        group: "Genel",
        defaultValue: document?.documentNo,
      },
      {
        name: "documentName",
        label: "Doküman Adı",
        type: "text",
        required: true,
        minLength: 3,
        group: "Genel",
        defaultValue: document?.documentName,
      },
      {
        name: "revisionNumber",
        label: "Revizyon Numarası",
        type: "text",
        readOnly: true,
        group: "Genel",
        defaultValue: document?.revisionNumber,
      },
      {
        name: "revisionDate",
        label: "Revizyon Tarihi",
        type: "datetime-local",
        required: false,
        readOnly: true,
        group: "Genel",
        defaultValue: document?.revisionDate,
      },
      {
        name: "revisionDescription",
        label: "Revizyon Açıklaması",
        type: "text",
        required: false,
        readOnly: true,
        group: "Genel",
        defaultValue: document?.revisionDescription,
      },
      {
        name: "publishedDate",
        label: "Yayımlanma Tarihi",
        type: "datetime-local",
        required: true,
        group: "Genel",
        defaultValue: document?.publishedDate,
      },
    ];
  };
  const GetFields2 = (): FieldDefinition[] => {
    return [
      {
        name: "revisionDescription",
        label: "Revizyon Açıklaması",
        type: "text",
        required: true,
        minLength: 20,
        group: "Genel",
      },
    ];
  };
  const UpdateDocument = (document?: KysDocument) => {
    console.log(document);
    openModal({
      title: document ? "Doküman Düzenleme" : "Yeni Doküman Kaydı",
      content: function (close: (result: any) => void): ReactNode {
        return (
          <GenericForm
            fields={GetFields(document)}
            onSubmit={(data: Record<string, any>): void => {
              // data.publishedDate+=":00"
              refetch(KYSDOCUMENT_CREATEUPDATE, {
                method: "POST",
                body: { ...data, id: document?.id, kysDocumentType: type },
              }).then(
                (x) => {
                  close(null);
                  refetch(KYSDOCUMENT_GETALL + (type ? "?type=" + type : ""), {
                    method: "GET",
                  }).then((c) => setData(c?.result));
                }
                // setData(prev=>prev?.map(y=>
                //   y.id===document?.id?{...data,id:document?.id }:y))
              );
            }}
          />
        );
      },
    });
  };
  const UploadDocument = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.getAttribute("contentType") === "isUserUpload") {
      const files = e.target.files;
      if (!files || files.length === 0) return;
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("kysDocumentId", e.target.getAttribute("id"));
      formData.append("isUserUpload", "true");
      formData.append("newFile", "false");
      refetch(undefined, { body: formData }).then(() =>
        refetch(KYSDOCUMENT_GETALL + (type ? "?type=" + type : ""), {
          method: "GET",
        }).then((c) => {
          setData(c?.result); dispatch(setNotification({
            title: "Doküman Yükleme",
            message: "Doküman başarıyla yüklendi",
            type: "success",
            duration: 3000
          }))
        })
      );
    } else if (e.target.getAttribute("contentType") !== "") {
      openModal({
        title: "Doküman Revizyonu",
        content: function (close: (result: any) => void): ReactNode {
          return (
            <GenericForm
              fields={GetFields2()}
              onSubmit={(data: Record<string, any>): void => {
                const files = e.target.files;
                if (!files || files.length === 0) return;
                const formData = new FormData();
                formData.append("file", files[0]);
                formData.append("kysDocumentId", e.target.getAttribute("id"));
                formData.append(
                  "revisionDescription",
                  data.revisionDescription
                );
                formData.append("newFile", "false");
                close(null);
                refetch(undefined, { body: formData }).then((x) => {
                  close(null);
                  refetch(KYSDOCUMENT_GETALL + (type ? "?type=" + type : ""), {
                    method: "GET",
                  }).then((c) => setData(c?.result));
                });
              }}
            />
          );
        },
      });
    } else {
      const files = e.target.files;
      if (!files || files.length === 0) return;
      const formData = new FormData();
      formData.append("file", files[0]);
      formData.append("kysDocumentId", e.target.getAttribute("id"));
      refetch(undefined, { body: formData }).then(() =>
        refetch(KYSDOCUMENT_GETALL + (type ? "?type=" + type : ""), {
          method: "GET",
        }).then((c) => setData(c?.result))
      );
    }
  };
  let roller = [1, 2, 4, 14];
  const actionBodyTemplate = (rowData: KysDocument) => {
    let buttons: MenuItem[] = [];
    if (roller.includes(user.rolId) && !rowData.isArchive && !rowData.isUserUploaded) {
      buttons.push({
        label: "Düzenle",
        onClick: function (): void {
          UpdateDocument(rowData);
        },
      });
      buttons.push({
        label: "Dosya Yükle",
        onClick: function (): void {
          inputRef.current?.setAttribute("id", rowData.id ?? "");
          inputRef.current?.setAttribute(
            "contentType",
            rowData.contentType ?? ""
          );
          inputRef.current.click();
        },
      });
      buttons.push({
        label: "Dokümanı Sil",
        onClick: async () => {
          const isConfirmed = await confirm({
            title: "Silme işlemi",
            message: "Dokümanı silmek istediğinize emin misiniz?",
            confirmText: "Evet",
            cancelText: "Vazgeç",
          });
          if (isConfirmed) {
            refetch(KYSDOCUMENT_DELETE + "/" + rowData.id, {
              method: "DELETE",
            }).then((c) =>
              refetch(
                KYSDOCUMENT_GETALL + (type ? "?type=" + type : ""),
                { method: "GET" }
              ).then((c) => setData(c?.result))
            );
          }
        },
      });
    }
    buttons.push({
      label: "Dosya İndir",
      onClick: function (): void {
        {
          refetch(KYSDOCUMENT_DOWNLOAD + "/" + rowData.id, {
            method: "GET",
          }).then((data) => {
            if (data?.isSuccess) {
              const fileUrl = `data:${data?.result.contentType};base64,${data?.result.fileContents}`;
              if (data?.result.contentType == "application/pdf") {
                openModal({
                  title: rowData.documentName,
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
              } else {
                const link = document.createElement("a");

                link.href = fileUrl;
                link.download =
                  data?.result.fileDownloadName +
                  "." +
                  getExtensionFromMimeType(data?.result.contentType);
                // link.target="_blank";
                // link.rel="noopener noreferrer";
                link.click();
              }
            }
          });
        }
      },
    });
    if (!rowData.isArchive) {
      buttons.push({
        label: "Kullanıcı Dosya Yükle",
        onClick: function (): void {
          inputRef.current?.setAttribute("id", rowData.id ?? "");
          inputRef.current?.setAttribute("contentType", "isUserUpload");
          inputRef.current.click();
        },
      });
    }

    return (
      <>
        {/* <MenuButton items={buttons} */}
        {/* /> */}
        {/* <BsThreeDots size={20} style={{ cursor: 'pointer' }}/> */}
        <div className="flex flex-row">
          {(roller.includes(user.rolId) && !rowData.isArchive) && (
            <>
              <button
                onClick={() => {
                  UpdateDocument(rowData);
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
                onClick={() => {
                  inputRef.current?.setAttribute("id", rowData.id ?? "");
                  inputRef.current?.setAttribute(
                    "contentType",
                    rowData.contentType ?? ""
                  );
                  inputRef.current.click();
                }}
                className="
            inline-flex items-center 
            px-4 py-2 
            bg-green-600 hover:bg-green-700 
            text-white 
            rounded
             mr-2
          "
              >
                <FaUpload title="Dosya Yükle" />
              </button>
              <button
                onClick={async () => {
                  const isConfirmed = await confirm({
                    title: "Silme işlemi",
                    message: "Dokümanı silmek istediğinize emin misiniz?",
                    confirmText: "Evet",
                    cancelText: "Vazgeç",
                  });
                  if (isConfirmed) {
                    refetch(KYSDOCUMENT_DELETE + "/" + rowData.id, {
                      method: "DELETE",
                    }).then((c) =>
                      refetch(
                        KYSDOCUMENT_GETALL + (type ? "?type=" + type : ""),
                        { method: "GET" }
                      ).then((c) => setData(c?.result))
                    );
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
            </>
          )}
          <button
            onClick={() => {
              refetch(KYSDOCUMENT_DOWNLOAD + "/" + rowData.id, {
                method: "GET",
              }).then((data) => {
                if (data?.isSuccess) {
                  const fileUrl = `data:${data?.result.contentType};base64,${data?.result.fileContents}`;
                  if (data?.result.contentType == "application/pdf") {
                    openModal({
                      title: rowData.documentName,
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
                  } else {
                    const link = document.createElement("a");

                    link.href = fileUrl;
                    link.download =
                      data?.result.fileDownloadName +
                      "." +
                      getExtensionFromMimeType(data?.result.contentType);
                    // link.target="_blank";
                    // link.rel="noopener noreferrer";
                    link.click();
                  }
                }
              });
            }}
            className="
            inline-flex items-center 
            px-4 py-2 
            bg-blue-600 hover:bg-blue-700 
            text-white 
            rounded
             mr-2
          "
          >
            <FaDownload title="Dosya İndir" />
          </button>
          {
            !rowData.isArchive && <button
              onClick={() => {
                inputRef.current?.setAttribute("id", rowData.id ?? "");
                inputRef.current?.setAttribute("contentType", "isUserUpload");
                inputRef.current.click();
              }}
              className="
            inline-flex items-center 
            px-4 py-2 
            bg-gray-600 hover:bg-gray-700 
            text-white 
            rounded
             mr-2
          "
            >
              <FaUpload title="Kullanıcı Dosya Yükle" />
            </button>
          }

        </div>
      </>
    );
  }
  return (
    <>
      <input
        type="file"
        ref={inputRef}
        onChange={(e) => UploadDocument(e)}
        style={{ display: "none" }}
      />
      <SmartTable
        data={data ?? []}
        frozenColumns={[{ name: "id", right: true }]}
        isExport={true}
        scrollHeight="calc(100vh - 200px)"
        groupBy="documentNo"
        groupTitle={["documentNo", "documentName"]}
        newRecordVoid={(data?: any) => UpdateDocument(data)}
        enablePagination={false}
        columns={[
          {
            accessor: "__index",
            header: "#",
          },
          {
            accessor: "documentNo",
            header: "Doküman No",
            filterable: true,
            sortable: true,
            // filterType: "select",
            // filterOptions: [
            //   { label: "Süreçler", value: "DGT.S" },
            //   { label: "Politikalar", value: "DGT.P0" },
            //   { label: "Prosedürler", value: "DGT.PR" },
            //   { label: "Talimatlar", value: "DGT.TL" },
            //   { label: "Formlar", value: "DGT.FR" },
            //   { label: "Listeler", value: "DGT.LS" },
            //   { label: "Planlar", value: "DGT.PL" },
            //   { label: "Etiketler", value: "DGT.E" },
            //   { label: "Şemalar", value: "DGT.S0" },
            // ]
          },
          {
            accessor: "documentName",
            header: "Doküman Adı",
            filterable: true,
            sortable: true,
            summaryType: "count",
          },
          {
            accessor: "publishedDate",
            header: "Yayımlama Tarihi",
            body: (T) => (
              <span>
                {T.publishedDate !== null &&
                  parseToJsDate(T.publishedDate).toLocaleDateString()}
              </span>
            ),
            filterable: true,
            sortable: true,
            filterType: "date",
          },
          {
            accessor: "revisionNumber",
            header: "Revizyon No",
            filterable: true,
            sortable: true,
          },
          // {
          //   accessor: "revisionDate",
          //   header: "Revizyon Tarihi",
          //   body: (T) => (
          //     <span>
          //       {T.revisionDate !== null &&
          //         parseToJsDate(T.revisionDate).toLocaleDateString()}
          //     </span>
          //   ),
          //   filterable: true,
          //   sortable: true,
          // },
          // {
          //   accessor: "revisionDescription",
          //   header: "Revizyon Açıklaması",
          //   filterable: true,
          //   sortable: true,
          // },
          // {
          //   accessor: "contentType",
          //   header: "Dosya Tipi",
          //   filterable: true,
          //   sortable: true,
          // },
          {
            accessor: "userName",
            header: "Yükleyen Kullanıcı",
            filterable: true,
            sortable: true,
          },
          {
            accessor: "updatedAt",
            header: "Güncelleme Tarihi",
            body: (T) => (
              <span>
                {T.updatedAt !== null &&
                  parseToJsDate(T.updatedAt).toLocaleDateString()}
              </span>
            ),
            filterable: true,
            filterType: "date",
            sortable: true,
          },
          {
            accessor: "isArchive",
            header: "Arşiv Durumu",
            sortable: true,
            filterable: true,
            filterOptions: [
              {
                label: "Evet",
                value: "true",
              },
              {
                label: "Hayır",
                value: "false",
              },
            ],
            filterType: "select",
            body: (rowData) => (
              <input
                type="checkbox"
                checked={rowData?.isArchive ?? false}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            ),
          },
          {
            accessor: "isUserUploaded",
            header: "Kullanıcı Tarafından Yüklenmiş",
            sortable: true,
            filterable: true,
            filterOptions: [
              {
                label: "Evet",
                value: "true",
              },
              {
                label: "Hayır",
                value: "false",
              },
            ],
            filterType: "select",
            body: (rowData) => (
              <input
                type="checkbox"
                checked={rowData?.isUserUploaded ?? false}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
            ),
          },
          {
            body: (T) => actionBodyTemplate(T),
            accessor: "id",
            header: "İşlemler",
          },
        ]}
        rowIdAccessor="id"
      />
    </>
  );
};
export default DocumentList;