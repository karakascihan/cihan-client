import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./CalendarPage.css";
import trLocale from "@fullcalendar/core/locales/tr";
import { EventInput } from "@fullcalendar/core/index.js";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import {
  addActivity,
  fetchActivities,
  updateActivity,
} from "@/store/slices/activitySlice";
import {
  ActivityStateDescriptions,
  ActivityTypeDescriptions,
} from "@/api/extra-enums";
import {
  ActivityDto,
  ActivityDtoForInsertion,
  ActivityState,
  ActivityType,
  BoardDto,
  ColumnDto,
  CustomerDto,
} from "@/api/apiDtos";
import { useSidebar } from "@/context/GlobalSidebarContext";
import { GenericForm } from "@/components/GenericForm";
import { CustomerState, fetchCustomers } from "@/store/slices/customerSlice";
import { fetchUsers, UserState } from "@/store/slices/userSlice";
import { formatDateForCalendar } from "@/utils/commonUtils";
import { fetchOpportunities } from "@/store/slices/opportunitySlice";
import tippy from "tippy.js";
import { useApiRequest } from "@/hooks/useApiRequest";
import { CalendarEvent } from "@/types/commonType";
import { URL } from "@/api";
import ItemDetailModal from "@/components/item/ItemDetailModal";
import { useAppSelector } from "@/store/hooks";
import { fetchGroupsForBoard, Group, selectAllGroups } from "@/store/features/groupSlice";
import { fetchItemsForBoard, Item,  selectAllItemsFlat } from "@/store/features/itemSlice";
import { selectAllColumns } from "@/store/features/columnSlice";
import { selectSelectedBoard } from "@/store/features/boardSlice";
import { se } from "date-fns/locale";
import { all } from "axios";
import { apiRequest } from "@/services";
import { Column } from "primereact/column";
import { bo } from "node_modules/@fullcalendar/core/internal-common";
//import listPlugin from "@fullcalendar/list";

 const CalendarPage = () => {
  const activityState = useSelector((state: RootState) => state.activity);
  const dispatch = useDispatch<AppDispatch>();
  const sidebar = useSidebar();
  const customerState = useSelector(
    (state: RootState) => state.customer as CustomerState
  );
  const userState = useSelector((state: RootState) => state.user as UserState);
  useEffect(() => {
    if (customerState.data.length === 0) {
      dispatch(fetchCustomers());
    }
  }, []);

  const opportunityState = useSelector((state: RootState) => state.opportunity);
  useEffect(() => {
    if (opportunityState.data.length === 0) {
      dispatch(fetchOpportunities());
    }
  }, []);

  // Users sadece boşsa yüklenir
  useEffect(() => {
    if (userState.data.length === 0) {
      dispatch(fetchUsers());
    }
  }, []);
  useEffect(() => {
    dispatch(fetchActivities({})).then((dat) => {
      //  setEvents(
      //     activityState.data?.map<EventInput>((act)=> {
      //      return {
      //          id: act.id,
      //           title: act.subject,
      //           start: new Date(act.scheduledAt?.toString()),
      //           classNames: ""
      //      }
      //     }))
    });
  }, []);
const [showItemDetailModal,setShowItemDetailModal]=useState(-1);
const [item,setItem]=useState<Item|undefined>(undefined);
const [group, setGroup] = useState<Group | undefined>(undefined);
const [board, setBoard] = useState<BoardDto | undefined>(undefined);
const [columns, setColumns] = useState<ColumnDto [] | undefined>(undefined);
  const newRecordVoid =async (entityName:string,id?: number, date?: Date) => {
    if (entityName=="Item") {
      setShowItemDetailModal(id);
     
        const item =await apiRequest<Item>( "GET" , URL + `/items/${id}/values`);
        setItem(item);
        const group =await apiRequest<Group>( "GET" , URL + `/items/${id}/values/${item.groupId}`);
      setGroup(group);
        const columns =await apiRequest<ColumnDto []>( "GET" , URL + `/boards/${group.boardId}/columns`);
      setColumns(columns);
        const board =await apiRequest<BoardDto>( "GET" , URL + `/board/${group.boardId}`);
      setBoard(board);
                return;
    }
    let activityDtoForInsertion: ActivityDtoForInsertion | undefined =
      id && activityState.data.find((x) => x.id == id);
    sidebar.openSidebar(
      <GenericForm
        fields={[
          {
            name: "subject",
            label: "Yapılacak Aktivite",
            type: "text",
            colspan: 12,
            group: "Genel",
            required: true,
            defaultValue: activityDtoForInsertion?.subject,
          },
          {
            name: "notes",
            label: "Açıklama",
            type: "textarea",
            colspan: 12,
            group: "Genel",
            required: true,
            defaultValue: activityDtoForInsertion?.notes,
          },
          {
            name: "assignedToUserId",
            label: "Görevli",
            type: "select",
            options: userState.data.map((u) => ({
              label: `${u.name} ${u.surname}`,
              value: u.id,
            })),
            colspan: 12,
            group: "Genel",
            required: true,
            defaultValue: activityDtoForInsertion?.assignedToUserId,
          },

          {
            name: "activityType",
            label: "Aktivite Türü",
            type: "select",
            options: Object.keys(ActivityType)
              .filter((k) => isNaN(Number(k)))
              .map((key) => ({
                label:
                  ActivityTypeDescriptions[
                    ActivityType[key as keyof typeof ActivityType]
                  ],
                value: ActivityType[key as keyof typeof ActivityType],
              })),
            colspan: 12,
            group: "Genel",
            required: true,
            defaultValue: activityDtoForInsertion?.activityType,
          },
          //          {
          //   name: "relatedEntityId",
          //   label: "İlgili Müşteri",
          //   type: "select",
          //   options: customerState.data.map((c) => ({
          //     label: c.firma?.substring(0, 40) ?? "",
          //     value: c.id,
          //   })),
          //   colspan: 12,
          //   group: "Genel",
          //   defaultValue: activityDtoForInsertion?.relatedEntityId,
          //   hidden:  true,
          // },
          {
            name: "relatedEntityName",
            label: "Müşteri/Fırsat",
            type: "select",
            required: true,
            colspan: 12,
            options: [
              {
                label: "Müşteri",
                value: "Customer",
              },
              {
                label: "Fırsat",
                value: "Opportunity",
              },
            ],
            group: "Genel",
            defaultValue:
              activityDtoForInsertion?.relatedEntityName ?? "Customer",
            onChangeEffect: (
              value: any,
              allValues: any,
              setFields_: any,
              setValue: any
            ) => {
              setFields_((prev: any) => {
                const updated = prev.map((f: any) =>
                  f.name === "relatedEntityId"
                    ? {
                        ...f,
                        // defaultValue: activityDtoForInsertion?.relatedEntityId ?? relatedEntityId,

                        label:
                          value == "Customer"
                            ? "İlgili Müşteri"
                            : "İlgili Fırsat",
                        options:
                          value == "Opportunity"
                            ? opportunityState.data.map((c) => ({
                                label: c.title ?? "",
                                value: c.id,
                              }))
                            : customerState.data.map((c) => ({
                                label: c.firma ?? "",
                                value: c.id,
                              })),
                      }
                    : f
                );

                // Eğer alanlarda gerçekten fark yoksa state'i değiştirme
                if (JSON.stringify(prev) === JSON.stringify(updated)) {
                  return prev;
                }
                return updated;
              });
            },
          },
          {
            name: "relatedEntityId",
            label: "İlgili Müşteri",
            type: "select",
            options:
              activityDtoForInsertion?.relatedEntityName === "Opportunity"
                ? opportunityState.data.map((c) => ({
                    label: c.title,
                    value: c.id,
                  }))
                : customerState.data.map((c) => ({
                    label: c.firma,
                    value: c.id,
                  })),
            group: "Genel",
            colspan: 12,
            defaultValue: activityDtoForInsertion?.relatedEntityId,
            onChangeEffect: (
              value: any,
              allValues: any,
              setFields_: any,
              setValue: any
            ) => {
              const selectedCustomer =
                allValues["relatedEntityName"] == "Customer"
                  ? customerState.data.find((x) => x.id == value)
                  : customerState.data.find(
                      (c) =>
                        c.id ===
                        opportunityState.data.find((o) => o.id == value)
                          ?.customerId
                    );
              setFields_((prev: any) => {
                const updated = prev.map((f: any) =>
                  f.name === "customerContactPersonId"
                    ? {
                        ...f,
                        options:
                          selectedCustomer?.contacts?.map((c) => ({
                            label:
                              c.yetkiliKisi +
                              (c.gorevi ? ` (${c.gorevi})` : ""),
                            value: c.id,
                          })) || [],
                      }
                    : f
                );
                // Eğer alanlarda gerçekten fark yoksa state'i değiştirme
                if (JSON.stringify(prev) === JSON.stringify(updated)) {
                  return prev;
                }
                return updated;
              });
            },
          },
          {
            name: "customerContactPersonId",
            label: "Müşterideki İlgili kişi",
            type: "select",
            options:
              activityDtoForInsertion?.relatedEntityName == "Customer"
                ? customerState.data
                    .find(
                      (x) => x.id == activityDtoForInsertion?.relatedEntityId
                    )
                    ?.contacts?.map((c) => ({
                      label: c.yetkiliKisi + (c.gorevi ? ` (${c.gorevi})` : ""),
                      value: c.id,
                    }))
                : customerState.data
                    .find(
                      (c) =>
                        c.id ===
                        opportunityState.data.find(
                          (o) =>
                            o.id == activityDtoForInsertion?.relatedEntityId
                        )?.customerId
                    )
                    ?.contacts?.map((c) => ({
                      label: c.yetkiliKisi + (c.gorevi ? ` (${c.gorevi})` : ""),
                      value: c.id,
                    })) || [],

            colspan: 12,
            group: "Genel",
            defaultValue:
              activityDtoForInsertion?.customerContactPersonId || "",
          },
          {
            name: "scheduledAt",
            label: "Tarih",
            type: "datetime-local",
            colspan: 12,
            group: "Genel",
            required: true,
            defaultValue: date ? date : activityDtoForInsertion?.scheduledAt,
          },
          {
            name: "activityState",
            label: "Aktivite Durumu",
            type: "select",
            options: Object.keys(ActivityState)
              .filter((k) => isNaN(Number(k)))
              .map((key) => ({
                label:
                  ActivityStateDescriptions[
                    ActivityState[key as keyof typeof ActivityState]
                  ],
                value: ActivityState[key as keyof typeof ActivityState],
              })),
            colspan: 12,
            group: "Genel",
            required: true,
            defaultValue: activityDtoForInsertion?.activityState,
          },
        ]}
        onSubmit={(data: ActivityDtoForInsertion) => {
          if (activityDtoForInsertion && activityDtoForInsertion.id) {
            data.id = activityDtoForInsertion.id;
            dispatch(updateActivity(data)).unwrap().then(() => {
             refetch(URL + "/calendar-events", { method: "GET" });
            });
          } else {
            dispatch(addActivity(data)).unwrap().then(() => {
             refetch(URL + "/calendar-events", { method: "GET" });
            } );
          } 
          sidebar.closeSidebar();
             

        }}
      />,
      "right",
      "w-120 h-full",
      activityDtoForInsertion ? "Aktivite Düzenle" : "Yeni Aktivite Ekle"
    );
  };

  function getEventClass(status: ActivityState) {
    switch (status) {
      case ActivityState.Planned:
        return ["Planned"];
      case ActivityState.InProgress:
        return ["InProgress"];
      case ActivityState.Completed:
        return ["Completed"];
      case ActivityState.Canceled:
        return ["Canceled"];
      case ActivityState.Postponed:
        return ["Postponed"];
      case ActivityState.Failed:
        return ["Failed"];
    }
  }
  const { data: calendarEvents  , refetch } = useApiRequest<CalendarEvent>(
      URL + "/calendar-events",
      {
        method: "GET",
        skip: false,
        deps: [],
      }
    );
   
 
  return (
    <div className="p-2 text-black">
      <div className="flex gap-2">
        <div className="flex-1">
            <FullCalendar
            locale={trLocale}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={calendarEvents?.map<EventInput>((act) => {
              return {
                id: act.id.toString(),
                title:act.title,
                start: new Date(act.endDate ?? act.startDate!),
                subject: act.title,
                classNames: getEventClass(act.status),
                extendedProps: {
                  type: act.eventType,
                  state: act.status,
                  releatedName: act.releatedName,
                  releatedId: act.releatedId,
                },
              };
            })}
            eventDidMount={(info) => {
              tippy(info.el, {
                  content: `<span style="color:black">${info.event.extendedProps.subject}</span>`,
                placement: "top",
                 allowHTML: true,
               
              });
            }}
            eventClick={(e) => {
              
              newRecordVoid(e.event.extendedProps.releatedName,e.event.extendedProps.releatedId);
            }}
            dateClick={(e) => {
              newRecordVoid("Activity",undefined, formatDateForCalendar(e.date));
            }}
            height="auto"
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay",
            }}
            eventContent={(arg) => {
              const typeIconMap: Record<ActivityType, string> = {
                1: "📞",
                2: "📨",
                3: "📅",
                0: "📌",
                4: "📝",
                5: "🚗",
                6: "❓",
              };
              const type = arg.event.extendedProps.type;

              return (
                <div className="flex items-center gap-1 truncate">
                  <span>{typeIconMap[type]}</span>
                  <span className="truncate">{arg.event.title}</span>
                </div>
              );
            }}
          />
          <div className="mt-4 pr-4 flex justify-end flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-yellow-400 rounded-sm inline-block"></span>
              <span>Planlandı</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-purple-500 rounded-sm inline-block"></span>
              <span>İlerliyor</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-green-400 rounded-sm inline-block"></span>
              <span>Tamamlandı</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-red-400 rounded-sm inline-block"></span>
              <span>İptal</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-orange-400 rounded-sm inline-block"></span>
              <span>Ertelendi</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-4 h-4 bg-gray-400 rounded-sm inline-block"></span>
              <span>Başarısız</span>
            </div>
          </div>
        </div>
        {
          showItemDetailModal !== -1  && item && group &&  columns&& board &&
          <ItemDetailModal
            isOpen={showItemDetailModal !== -1}
            onClose={() => setShowItemDetailModal(-1)}
            item={item}
            group={group}
            columns={columns}
            boardName={ board?.name || 'Pano'}
          />
        }
      </div>
    </div>
  );
};
export default CalendarPage;
