import {
  CustomerDto,
  OpportunityDto,
  OpportunityDtoForInsertion,
  OpportunityDtoForUpdate,
  OpportunityStage,
} from "@/api/apiDtos";
import { OpportunityStageDescriptions } from "@/api/extra-enums";
import { FieldDefinition, GenericForm } from "@/components/GenericForm";
import KanbanColumn from "@/components/KanbanColumn";
import { useSidebar } from "@/context/GlobalSidebarContext";
import {
  addOpportunity,
  deleteOpportunity,
  fetchOpportunities,
  OpportunityState,
  patchOpportunity,
  updateOpportunity,
} from "@/store/slices/opportunitySlice";
import { fetchCustomers } from "@/store/slices/customerSlice";
import { RootState } from "@/store/store";
import React, { ReactNode, use, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { paraBirimleri } from "./PriceOfferAddPage";
import { useModal } from "@/context/ModalContext";
import { OpportunityPageDetail } from "./OpportunityPageDetail";
import { useNavigate } from "react-router-dom";
import { FaList, FaTrash } from "react-icons/fa6";
import { FaPencilAlt, FaThLarge } from "react-icons/fa";
import { SmartTable } from "@/components/SmartTable";
  import { useConfirm } from "@/context/ConfirmContext";
import { selectOpportunitiesWithCustomer } from "@/store/selectors/opportunitySelector";
import { fetchUsers } from "@/store/slices/userSlice";

enum ListType {
  card,
  table
}

export const OpportunityPage = () => {
  const dispatch = useDispatch<any>();
  const sidebar = useSidebar();
  const [listTypeState,setListTypeState] = useState<ListType>(ListType.card);
  // preload fırsatlar + müşteriler
  const customerState = useSelector((state: RootState) => state.customer);
  useEffect(() => {
    dispatch(fetchOpportunities());
    if (customerState.data.length===0) {
      dispatch(fetchCustomers());
    }
  }, [dispatch]);
   const userState = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (userState.data.length===0) {
      dispatch(fetchUsers());
    }
  }, [dispatch,userState]);
  const { data, loading, error } = useSelector(
    (state: RootState) => state.opportunity as OpportunityState
  );
  const [draggingCardId, setDraggingCardId] = useState<number | null>(null);
  const [dragOverColumn, setDragOverColumn] = useState<OpportunityStage | null>(
    null
  );
   const opportunitiesWithCustomer = useSelector(selectOpportunitiesWithCustomer);
  const handleDragStart = (id: number) => setDraggingCardId(id);
  const handleDragEnd = () => {
    setDraggingCardId(null);
    setDragOverColumn(null);
  };
  const handleDrop = (id: number, newStatus: OpportunityStage) => {
    dispatch(patchOpportunity({ id, changes: { opportunityStage: newStatus } }));
    handleDragEnd();
  };
  const confirm = useConfirm();
  const formElements = async (
    opportunityDtoForInsertion: OpportunityDtoForInsertion,
    customers: CustomerDto[]
  ): Promise<FieldDefinition[]> => {
    return [
      {
        name: "customerId",
        label: "Şirket İsmi",
        type: "select",
        colspan: 12,
        group: "Genel",
        required: true,
        defaultValue: opportunityDtoForInsertion?.customerId,
        options: customers.map((cust: CustomerDto) => ({
          label: cust.firma?.substring(0, 40) || "",
          value: cust.id || "",
        })),
           onChangeEffect: (value: any, allValues: any, setFields_: any) => {
          const selectedCustomer = customers.find((x) => x.id == value);
         setFields_((prev) => {
  const updated = prev.map((f) =>
    f.name === "customerContactPersonId"
      ? {
          ...f,
          options:
            selectedCustomer?.contacts?.map((c) => ({
              label: c.yetkiliKisi,
              value: c.id,
            })) || [],
        }
      : f
  );

  // Eğer alanlarda gerçekten fark yoksa state'i değiştirme
  if (JSON.stringify(prev) === JSON.stringify(updated)) return prev;
  return updated;
});

        },
      },
      {
        name: "customerContactPersonId",
        label: "Müşterideki İlgili kişi",
        type: "select",
        options:
       customers.find((x) => x.id == opportunityDtoForInsertion?.customerId)
             
          ?.contacts?.map((c) => ({
            label: c.yetkiliKisi + (c.gorevi ? ` (${c.gorevi})` : ""),
            value: c.id,
          })) || [],
        colspan: 12,
        group: "Genel",
        defaultValue: opportunityDtoForInsertion?.customerContactPersonId || "",
      },
      {
        name: "title",
        label: "Fırsat Başlığı",
        type: "text",
        colspan: 12,
        group: "Genel",
        required: true,
        defaultValue: opportunityDtoForInsertion?.title || "",
      },
      {
        name: "description",
        label: "Açıklama",
        type: "textarea",
        colspan: 12,
        group: "Genel",
        defaultValue: opportunityDtoForInsertion?.description || "",
      },
      {
        name: "value",
        label: "Tutar",
        type: "number",
       
        group: "Genel",
        required: true,
        defaultValue: opportunityDtoForInsertion?.value || 0,
      },
          {
        name: "currency",
        label: "Para Birimi",
        type: "select",
        options:   paraBirimleri.map((p) => (           {
          label: p,
          value: p
        }
                            )),
       
        group: "Genel",
        required: true,
        defaultValue: opportunityDtoForInsertion?.currency || "",
      },
      {
        name: "probability",
        label: "Olasılık (%)",
        type: "probability",
        colspan: 12,
        group: "Genel",
        defaultValue: opportunityDtoForInsertion?.probability || 0,
      },
      
      {
        name: "startDate",
        label: "Başlangıç Tarihi",
        type: "date",
        colspan: 12,
        group: "Diğer",
        defaultValue: opportunityDtoForInsertion?.startDate || null,
      },
      {
        name: "expectedCloseDate",
        label: "Tahmini Bitiş Tarihi",
        type: "date",
        colspan: 12,
        group: "Diğer",
        defaultValue: opportunityDtoForInsertion?.expectedCloseDate || null,
      },
      {
        name: "opportunityStage",
        label: "Aşama",
        type: "select",
        colspan: 12,
        group: "Genel",
        defaultValue: opportunityDtoForInsertion?.opportunityStage || 0,
        options: Object.keys(OpportunityStage)
          .filter((k) => isNaN(Number(k)))
          .map((key) => ({
            label:
              OpportunityStageDescriptions[
                OpportunityStage[key as keyof typeof OpportunityStage]
              ],
            value: OpportunityStage[key as keyof typeof OpportunityStage],
          })),
      },
    ];
  };

  const newOpportunityHandler = async (
    opportunity?: OpportunityDtoForInsertion
  ) => {
    const customers = customerState?.data || [];
    sidebar.openSidebar(
      <GenericForm
        fields={await formElements(opportunity, customers)}
        onSubmit={(data: OpportunityDtoForInsertion) => {
          if (opportunity?.id) {
            data.id = opportunity.id;
            dispatch(updateOpportunity(data));
          } else {
            dispatch(addOpportunity(data));
          }
          sidebar.closeSidebar();
        }}
      />,
      "right",
      "w-120 h-full",
      opportunity ? "Fırsat Düzenle" : "Yeni Fırsat Ekle"
    );
  };
  const {openModal} = useModal();
// const showOpportunityDetail = (dto:OpportunityDto) =>{
//     openModal({
//       title: "Detaylar",
//       maximizable:true,
//       style:{width:"60vw",height:"80vh"},
//       content: function (close: (result: any) => void): ReactNode {
//         return (
//            <OpportunityPageDetail consoleLog={()=>console.log("TEst edildi")} opportunity={dto}/>
//         )
//       }
//     })
// }
const navigate=useNavigate();
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleClick = (opp:OpportunityDto) => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current);
    }
    clickTimeout.current = setTimeout(() => {
     newOpportunityHandler(opp);
    }, 250); // 250ms içinde çift tık gelmezse tek tık kabul et
  };

  const handleDoubleClick = (opp:OpportunityDto) => {
    if (clickTimeout.current) {
      clearTimeout(clickTimeout.current); // Tek tık iptal
    }
     navigate("/firsatdetay/"+opp.id)
  };
  return (
    <div className="flex flex-col p-1 space-y-2">
      <div className="flex flex-row justify-between">
        <div className="text-2xl font-bold mb-2">Fırsatlar</div>
        <div className="flex flex-row items-center  gap-2 space-x-6">
     <button
          className="px-2 border rounded cursor-pointer bg-green-500 text-white"
          onClick={() => newOpportunityHandler(undefined)}
        >
          Yeni Fırsat
        </button>


        <FaList onClick={()=>setListTypeState(ListType.table)} /> 
        <FaThLarge onClick={()=>setListTypeState(ListType.card)} /> 
        </div>
   
      </div>
      {loading && <div>Yükleniyor...</div>}
      {error && <div className="text-red-500">Hata: {error}</div>}
      {
        listTypeState == ListType.card ?
      <div className="flex gap-2 overflow-auto">
        {Object.keys(OpportunityStage)
          .filter((k) => isNaN(Number(k)))
          .map((key) => (
            <div className="w-1/7">
            <KanbanColumn
              key={OpportunityStage[key as keyof typeof OpportunityStage]}
              title={
                OpportunityStageDescriptions[
                  OpportunityStage[key as keyof typeof OpportunityStage]
                ]
              }
              stage={
                OpportunityStage[key as keyof typeof OpportunityStage] ??
                OpportunityStage.New
              }
              opportunities={data.filter(
                (op) =>
                  op.opportunityStage ===
                  OpportunityStage[key as keyof typeof OpportunityStage]
              )}
              draggingCardId={draggingCardId}
              dragOverColumn={dragOverColumn}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragEnter={() =>
                setDragOverColumn(
                  OpportunityStage[key as keyof typeof OpportunityStage]
                )
              }
              onDrop={handleDrop}
              onDoubleClick={(opportunityDto) =>
                        handleDoubleClick(opportunityDto)
              }
              onClick={(opportunityDto)=>{
                    
                        handleClick(opportunityDto)

              }}
            />
            </div>
          ))}
      </div>
      : <div>
        <SmartTable
      
        data={opportunitiesWithCustomer ?? []}
        onDoubleClick={ (row: OpportunityDto)=>{
          handleDoubleClick(row)
        }
          
        }
        columns={[
          {
            header:"#",
            accessor:"__index",
          },
            {
          header: "Müşteri",
          accessor: "customerName",
          filterable:true,
          sortable:true,
        },
        {

          header: "Fırsat Başlığı",
          accessor: "title",
          filterable: true,
          sortable: true,
          
        },
        {

          header: "Açıklama",
          accessor: "description",
          filterable: true,
          sortable: true,
          body: (row: OpportunityDto) => (
            <span >{row.description?.substring(0,50)}{row.description?.length>50?"...":""}</span>
          ),
        },
         {

          header: "Sektör",
          accessor: "sektor",
          filterable: true,
          sortable: true,
        },
        {

          header: "Ülke",
          accessor: "ulkeAdi",
          filterable: true,
          sortable: true,
        },
        {
          header: "Aşama",
          accessor: "opportunityStage",
          filterable:true,
          sortable:true,
          body: (row: OpportunityDto) =>(
          <span>{ OpportunityStageDescriptions[row.opportunityStage]}</span>
            ),
            filterType:"select",
            filterOptions:Object.keys(OpportunityStage)
          .filter((k) => isNaN(Number(k)))
          .map((key) => ({
            label:
              OpportunityStageDescriptions[
                OpportunityStage[key as keyof typeof OpportunityStage]
              ],
            value: OpportunityStage[key as keyof typeof OpportunityStage],
          })),
        },
       {
          header: "Olasılık",
          accessor: "probability",
          filterable:true,
          sortable:true,
          body: (row: OpportunityDto)=> (
           <div className="flex flex-row items-center justify-start"><input type="range"  value={row.probability}/><span>{row.probability}%</span></div>
          )
        },
        {
          header: "Tutar",
          accessor: "value",
          filterable:true,
          sortable:true,
          summaryType:"sum",
          body: (row: OpportunityDto)=>
            <span className="text-md ">{row.value?.toLocaleString("tr-TR", { style: "currency", currency: row.currency??"TRY" })}</span>
        },
       
        {
          header: "Para Birimi",
          accessor: "currency",
          filterable:true,
          sortable:true,
          filterType:"select",
          filterOptions:paraBirimleri.map((p)=>({label:p,value:p
          })),
          // body: (row: OpportunityDto)=>
          //   <span className="text-md ">{row.value?.toLocaleString("tr-TR", { style: "currency", currency: row.currency??"TRY" })}</span>
        },
        {
          header: "Hesap Sahibi",
          accessor: "userName",
          filterable:true,
          sortable:true,
        },
        {
          header: "Başlangıç",
          accessor: "startDate",
          filterable:true,
          sortable:true,
          filterType:"date",
          body: (row: OpportunityDto)=>
                       <span>{row.expectedCloseDate ? new Date(row.expectedCloseDate).toLocaleDateString() : "-"}</span>

          
        },
{
          header: "Kapanış",
          accessor: "expectedCloseDate",
          filterable:true,
          sortable:true,
          filterType:"date",
          body: (row: OpportunityDto)=>
                       <span>{row.expectedCloseDate ? new Date(row.expectedCloseDate).toLocaleDateString() : "-"}</span>

          
        },
       
        {
          header:"İşlemler",
          accessor:"id",
body: (row: OpportunityDto) => (
        <div className="flex flex-row">
          <button
            onClick={() => newOpportunityHandler(row)}
            className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded mr-2"
          >
            <FaPencilAlt title="Düzenle" />
          </button>
          <button
            onClick={async () => {
              const isConfirmed = await confirm({
                title: "Silme işlemi",
                message: "Fırsatı silmek istediğinize emin misiniz?",
                confirmText: "Evet",
                cancelText: "Vazgeç",
              });
              if (isConfirmed) {
                dispatch(deleteOpportunity(row.id!));
              }
            }}
            className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded mr-2"
          >
            <FaTrash title="Sil" />
          </button>
        </div>
      ),        }
        ]}
        rowIdAccessor={"id"}
        frozenColumns={[{ name: "id", right: true }]}
        scrollHeight="calc(100vh - 200px)"
        enablePagination={false}
        />
      </div>
}
    </div>
  )
};

export default OpportunityPage;
