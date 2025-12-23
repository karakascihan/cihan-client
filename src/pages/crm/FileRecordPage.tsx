import {
  ActivityDto,
  ActivityDtoForInsertion,
  ActivityType,
  ActivityState,
  CustomerDto,
  UserDtoForCrm,
  FileRecordDto,
  FileRecordDtoForInsertion,
} from "@/api/apiDtos";
import { FieldDefinition, GenericForm } from "@/components/GenericForm";
import { Column, SmartTable } from "@/components/SmartTable";
import { useConfirm } from "@/context/ConfirmContext";
import { useSidebar } from "@/context/GlobalSidebarContext";
import {
  addActivity,
  deleteActivity,
  fetchActivities,
  updateActivity,
} from "@/store/slices/activitySlice";
import { AppDispatch, RootState } from "@/store/store";
import { createElement, ReactNode, use, useEffect } from "react";
import { FaDownload, FaPencilAlt, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { convertFileToBase64, formatDateForInput } from "@/utils/commonUtils";
import {
  ActivityStateDescriptions,
  ActivityTypeDescriptions,
} from "@/api/extra-enums";
import { CustomerState, fetchCustomers } from "@/store/slices/customerSlice";
import { fetchUsers, UserState } from "@/store/slices/userSlice";
import { fetchOpportunities } from "@/store/slices/opportunitySlice";
import { title } from "process";
import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { selectActivitiesWithCustomerWithOpportunity } from "@/store/selectors/opportunitySelector";
import { addFileRecord, deleteFileRecord, fetchFileRecords } from "@/store/slices/fileRecordSlice";
import { useModal } from "@/context/ModalContext";
import { URL } from "@/api";

export const FileRecordPage = ({
  relatedEntityId,
  relatedEntityName = "Opportunity",
  title,
  onDoubleClick
}: {
  relatedEntityId?: number;
  relatedEntityName?: string;
  title?: string;
  onDoubleClick?: (record: FileRecordDto) => void;
}) => {
const {openModal}=useModal();
  const dispatch = useDispatch<AppDispatch>();
  const confirm = useConfirm();
  const sidebar = useSidebar();
const fileRecordState= useSelector<RootState>(state=>state.fileRecord)
useEffect(() => {
 dispatch(fetchFileRecords({relatedEntityName:relatedEntityName,relatedEntityId:relatedEntityId}))
}, [])
  const columns: Column<FileRecordDto>[] = [
    { header: "#", accessor: "__index" },
      {
      header: "Dosya Adı",
      accessor: "fileName",
      filterable: true,
      sortable: true,
    },
    //   {
    //   header: "Dosya Tipi",
    //   accessor: "contentType",
    //   filterable: true,
    //   sortable: true,
    // },
    {
      header: "Dosya Yolu",
      accessor: "filePath",
      filterable: true,
      sortable: true,
    },
    {
      header: "İşlemler",
      accessor: "id",
      body: (row: FileRecordDto) => (
        <div className="flex flex-row">
          <button
            onClick={async () => {
              const isConfirmed = await confirm({
                title: "Silme işlemi",
                message: "Dosyayı silmek istediğinize emin misiniz?",
                confirmText: "Evet",
                cancelText: "Vazgeç",
              });
              if (isConfirmed) {
                dispatch(deleteFileRecord(row.id!));
              }
            }}
            className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded mr-2"
          >
            <FaTrash title="Sil" />
          </button>
                  <button
                    onClick={() => {
                            //                   openModal({
                            //   title: row.fileName,
                            //   maximized: true,
                            //   content: function (
                            //     close: (result: any) => void
                            //   ): ReactNode {
                            //     return (
                            //       <iframe
                            //         src={URL+"/"+row.filePath}
                            //         width="100%"
                            //         height="100%"
                            //         style={{ border: "none" }}
                            //         title="PDF Viewer"
                            //       />
                            //     );
                            //   },
                            // });
                            window.open(URL+"/"+row.filePath, '_blank');
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
        </div>
      ),
    },
  ];

const newRecordVoid = () => {
  const input = document.createElement("input") as HTMLInputElement;
  input.type = "file";

  input.addEventListener("change", async (e: Event) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];

    if (!file) return;

    // Base model
    const newFile: FileRecordDtoForInsertion = {
      relatedEntityId,
      relatedEntityName,
      fileName: file.name,
      contentType: file.type,
      content: await convertFileToBase64(file), // Base64 string
    };

    dispatch(addFileRecord(newFile));
  });

  input.click();
};

  return (
    <div className="card">
      {title && (
        <div className="flex flex-row justify-between gap-4">
          <h2 className="text-xl text-center font-bold mb-2">{title} </h2>{" "}
        </div>
      )}

      <SmartTable
        data={fileRecordState.items ?? []}
        columns={columns}
        frozenColumns={[ { name:"id",right:true}]}
        rowIdAccessor={"id"}
        newRecordVoid={newRecordVoid}
        scrollHeight="calc(100vh - 200px)"
        enablePagination={false}
        onDoubleClick={onDoubleClick}
      />
    </div>
  );
};
