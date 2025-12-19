import {
  ActivityDto,
  ActivityState,
  ActivityType,
  FileRecordDto,
  FileRecordDtoForInsertion,
  OpportunityDto,
  SystemLogDtoForInsertion,
} from "@/api/apiDtos";
import { useModal } from "@/context/ModalContext";
import { CustomerState, fetchCustomers } from "@/store/slices/customerSlice";
import { fetchUsers, UserState } from "@/store/slices/userSlice";
import { AppDispatch, RootState } from "@/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { convertFileToBase64, formatDateForInput } from "@/utils/commonUtils";
import { ActivityPage } from "./ActivityPage";
import { useParams } from "react-router-dom";
import { GenericForm } from "@/components/GenericForm";
import { addsystemLog, fetchsystemLogs } from "@/store/slices/systemLogSlice";
import { fetchOpportunities } from "@/store/slices/opportunitySlice";
import { PriceOfferAddPage } from "./PriceOfferAddPage";
import { PriceOfferPage } from "./PriceOfferPage";
import { Column, SmartTable } from "@/components/SmartTable";
import { ActivityStateDescriptions, ActivityTypeDescriptions } from "@/api/extra-enums";
import { fetchActivities, updateActivity } from "@/store/slices/activitySlice";
import { apiRequest } from "@/services";
import { ApiResponseClient } from "@/types/apiResponse";
import { URL } from "@/api";
import { clearSelectedRows, setAktiviteSelectedRows } from "@/store/slices/selectedRowsSlice";
import { clear } from "console";
import { addFileRecord, fetchFileRecords } from "@/store/slices/fileRecordSlice";
import { FileRecordPage } from "./FileRecordPage";
import { fetchpersonels } from "@/store/slices/personalSlice";

export const OpportunityPageDetail: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    "details" | "activities" | "notes" | "files" | "priceoffers"
  >("details");
 
  const [opportunity, setOpportunity] = useState<OpportunityDto>();
  const dispatch = useDispatch<AppDispatch>();
  const {id} = useParams();
  const opportunityState = useSelector((state: RootState) => state.opportunity);
  const systemLogState = useSelector((state: RootState) => state.systemLog);
  const loginState = useSelector((state: RootState) => state.login);

  useEffect(() => {
   setOpportunity(opportunityState.data.find(op=>op.id==id));
  }, [id])
  const userState = useSelector((state: RootState) => state.user as UserState);
  useEffect(() => {
    if ( userState.data.length === 0) {
      dispatch(fetchUsers());
    }
  }, []);

  const customerState = useSelector(
    (state: RootState) => state.customer as CustomerState
  );
  useEffect(() => {
    if ( customerState.data.length === 0) {
      dispatch(fetchCustomers());
    }
  }, []);

const {openModal} = useModal();
  const getUser =(id:number)=>{
     const user = userState.data.find(c=>c.id==id);
                     return user?.name+" "+user?.surname
  }
  if (opportunity) {
    
  return (
    <div className="w-full  mx-auto mt-2 bg-white rounded-2xl shadow-lg p-2">
      {/* Tab Headers */}
      <div className="flex border-b mb-2">
        {["details", "activities", "notes", "files","priceoffers"].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-3 -mb-px font-semibold border-b-2 transition ${
              activeTab === tab
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => { if (tab=="notes") {
              dispatch(fetchsystemLogs( {relatedEntityId: opportunity.id, relatedEntityName: "Opportunity"})); }              
             setActiveTab(tab as any); }}
          >
            {tab === "details"
              ? "Detaylar"
              : tab === "activities"
              ? "Aktiviteler"
              : tab === "notes"
              ? "Notlar"
              : tab === "files"
              ? "Dosyalar"
              : tab === "priceoffers"
              ? "Teklifler"
              : ""
            }
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "details" && (
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
            <p className="text-gray-500 font-semibold">Başlık</p>
            <p className="text-gray-800">{opportunity.title}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
            <p className="text-gray-500 font-semibold">Müşteri</p>
            <p className="text-gray-800">{opportunity.customerName}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
            <p className="text-gray-500 font-semibold">Değer</p>
            <p className="text-gray-800">
              {opportunity.value?.toLocaleString("en-US", {
                style: "currency",
                currency: opportunity.currency || "USD",
              })}
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
            <p className="text-gray-500 font-semibold">Olasılık</p>
            <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-sm font-medium">
              %{opportunity.probability}
            </span>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
            <p className="text-gray-500 font-semibold">Başlangıç Tarihi</p>
            <p className="text-gray-800">{opportunity.startDate&&new Date(formatDateForInput(opportunity.startDate)).toLocaleDateString()}</p>
          </div>
          <div className="p-4 bg-gray-50 rounded-xl shadow-sm">
            <p className="text-gray-500 font-semibold">Beklenen Kapanış</p>
            <p className="text-gray-800">
              {opportunity.expectedCloseDate&&new Date(formatDateForInput(opportunity.expectedCloseDate)).toLocaleDateString()}
            </p>
          </div>
          <div className="col-span-2 p-4 bg-gray-50 rounded-xl shadow-sm">
            <p className="text-gray-500 font-semibold">Açıklama</p>
            <p className="text-gray-800">{opportunity.description}</p>
          </div>
        </div>
      )}

      {activeTab === "activities" && (
        <div>
         
          <ActivityPage relatedEntityId={opportunity.id} relatedEntityName="Opportunity" title={undefined} />
              <button
            onClick={async () =>{ 
               const columns: Column<ActivityDto>[] = [
                  { header: "#", accessor: "__index" },
                  { header:"",
                    accessor:"__select",
                    filterable:true,
                   },
                  {
                    header: "Yapılacak Aktivite",
                    accessor: "subject",
                    filterable: true,
                    sortable: true,
                  },
                  { header: "Açıklama", accessor: "notes", filterable: true, sortable: true },
                  {
                    header: "Aktivite Türü",
                    accessor: "activityType",
                    filterable: true,
                    sortable: true,
                    body: (row: ActivityDto) => (
                      <span>{ActivityTypeDescriptions[row.activityType]}</span>
                    ),
                    filterType: "select",
                    filterOptions: Object.keys(ActivityType)
                      .filter((k) => isNaN(Number(k)))
                      .map((key) => ({
                        label:
                          ActivityTypeDescriptions[
                            ActivityType[key as keyof typeof ActivityType]
                          ],
                        value: ActivityType[key as keyof typeof ActivityType],
                      })),
                  },
                  {
                    header: "Tarih",
                    accessor: "scheduledAt",
                    filterable: true,
                    sortable: true,
                    filterType: "date",
                    body: (row: ActivityDto) => (
                      <span>{row.scheduledAt &&new Date(row.scheduledAt).toLocaleDateString()}</span>
                    ),
                  },
                  {
                    header: "Aktivite Durumu",
                    accessor: "activityState",
                    filterable: true,
                    sortable: true,
                    filterType: "select",
                    filterOptions: Object.keys(ActivityState)
                      .filter((k) => isNaN(Number(k)))
                      .map((key) => ({
                        label:
                          ActivityStateDescriptions[
                            ActivityState[key as keyof typeof ActivityState]
                          ],
                        value: ActivityState[key as keyof typeof ActivityState],
                      })),
                    body: (row: ActivityDto) => (
                      <span>{ActivityStateDescriptions[row.activityState]}</span>
                    ),
                  },
                  {
                    header: "Görevli",
                    accessor: "assignedToUserId",
                    filterable: true,
                    sortable: true,
                    filterType: "id_select",
                    filterOptions: userState.data.map((u) => ({
                      label: `${u.name} ${u.surname}`,
                      value: u.id,
                    })),
                    body: (row: ActivityDto) => {
                      const user = userState.data.find((c) => c.id === row.assignedToUserId);
                      return <span>{user ? `${user.name} ${user.surname}` : "-"}</span>;
                    },
                  }
                ];
              const result = openModal({
              title: "Tüm Aktiviteler",
              content: async function (close: (result: any) => void): React.ReactNode {
              const result =await apiRequest<ApiResponseClient<ActivityDto[]>>(
                      "GET",
                    URL + "/activity/getall",
                      { Authorization: "Bearer " + loginState.accessToken }
                    );
                    if (result && result.isSuccess && result.result) {
                      dispatch(clearSelectedRows({tableId: "my-table-id"}));
                    return   <div> <SmartTable data={result.result} enablePagination={false}  columns={columns} rowIdAccessor={"id"}    /> <button className=""  onClick={()=> { 
                      dispatch(setAktiviteSelectedRows({result:result.result,opportunity:opportunity.id}));
                      close(null);
                     
                       }} >Seçimi Kaydet</button> </div>
                    }
              return <div>Aktiviteler yükleniyor...</div>
              }
            }) 
          }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow"
          >
            Aktivitelerden Getir
          </button>
        </div>
      )}

      {activeTab === "notes" && (
        <div className="space-y-3">
          {systemLogState.items.filter(x=>x.relatedEntityId==opportunity.id&&x.relatedEntityName=="Opportunity")?.map((note, idx) => (
            <div key={idx} className="p-4 bg-yellow-50 rounded-xl shadow-sm">
              <p className="text-gray-500">{note.note}</p>
              <p className="text-gray-700 font-bold">{userState.data?.find(u => u.id === note.createdByUserId)?.userName}</p>
              <p className="text-gray-800">{new Date(note.createdAt)?.toLocaleString()}</p>
            </div>
          ))}
          <button
            onClick={async () =>{ 
              const result = openModal({
              title: "Not Ekleme",
              content: function (close: (result: any) => void): React.ReactNode {
                return (
                  <GenericForm fields={[{
                    name: "note",
                    label: "Not Girişi ",
                    type: "textarea",
                    colspan:12
                  
                  }]} onSubmit={function (data:SystemLogDtoForInsertion): void {
                    data.relatedEntityId=opportunity.id;
                    data.relatedEntityName="Opportunity";
                                        dispatch(addsystemLog(data));
                                        close(null)
                  } } />
                )
              }
            }) 
          }}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 shadow"
          >
            Yeni Not Ekle
          </button>
        </div>
      )}

      {activeTab === "files" && (
          <FileRecordPage relatedEntityId={id}  relatedEntityName="Opportunity" />
      )}
      {activeTab === "priceoffers" && (
        <PriceOfferPage  opportunityId={opportunity.id}/>
      )}
    </div>
  );
  }
else return ""
  
};

// Modal Component
const Modal: React.FC<{
  title: string;
  onClose: () => void;
  children: React.ReactNode;
}> = ({ title, onClose, children }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-xl w-96 p-6 relative">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      <button
        onClick={onClose}
        className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 font-bold"
      >
        ×
      </button>
      {children}
    </div>
  </div>
);


