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
  CustomerDto,
} from "@/api/apiDtos";
import { useSidebar } from "@/context/GlobalSidebarContext";
import { GenericForm } from "@/components/GenericForm";
import { CustomerState, fetchCustomers } from "@/store/slices/customerSlice";
import { fetchUsers, UserState } from "@/store/slices/userSlice";
import { formatDateForCalendar } from "@/utils/commonUtils";
import { fetchOpportunities } from "@/store/slices/opportunitySlice";
import tippy from "tippy.js";
//import listPlugin from "@fullcalendar/list";

export const CalendarPage = () => {
  const activityState = useSelector((state: RootState) => state.activity);
  const dispatch = useDispatch<AppDispatch>();
  const sidebar = useSidebar();
  const customerState = useSelector(
    (state: RootState) => state.customer as CustomerState
  );
  const userState = useSelector((state: RootState) => state.user as UserState);
  useEffect(() => {
    if ( customerState.data.length === 0) {
      dispatch(fetchCustomers());
    }
  }, []);

    const opportunityState = useSelector((state: RootState) => state.opportunity);
  useEffect(() => {
    if ( opportunityState.data.length === 0) {
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
  
  const newRecordVoid = (id?: number,date?:Date) => {
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
      defaultValue: activityDtoForInsertion?.relatedEntityName ?? "Customer",
      onChangeEffect: (
        value: any,
        allValues: any,
        setFields_: any,
        setValue: any
      ) => {
        setFields_((prev:any) => {
          const updated = prev.map((f:any) =>
            f.name === "relatedEntityId"
              ? {
                  ...f,
                  // defaultValue: activityDtoForInsertion?.relatedEntityId ?? relatedEntityId,

                  label:
                    value == "Customer" ? "İlgili Müşteri" : "İlgili Fırsat",
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
          ? opportunityState.data.map((c) => ({ label: c.title, value: c.id }))
          : customerState.data.map((c) => ({ label: c.firma, value: c.id })),
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
                  opportunityState.data.find((o) => o.id == value)?.customerId
              );
        setFields_((prev:any) => {
          const updated = prev.map((f:any) =>
            f.name === "customerContactPersonId"
              ? {
                  ...f,
                  options:
                    selectedCustomer?.contacts?.map((c) => ({
                      label: c.yetkiliKisi + (c.gorevi ? ` (${c.gorevi})` : ""),
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
      options: activityDtoForInsertion?.relatedEntityName == "Customer"
            ? customerState.data.find((x) => x.id == activityDtoForInsertion?.relatedEntityId)?.
            contacts?.map((c) => ({
            label: c.yetkiliKisi + (c.gorevi ? ` (${c.gorevi})` : ""),
            value: c.id,
          }))
            : customerState.data.find(
                (c) =>
                  c.id ===
                  opportunityState.data.find((o) => o.id == activityDtoForInsertion?.relatedEntityId)?.customerId
              )
          ?.contacts?.map((c) => ({
            label: c.yetkiliKisi + (c.gorevi ? ` (${c.gorevi})` : ""),
            value: c.id,
          })) || [],

      colspan: 12,
      group: "Genel",
      defaultValue: activityDtoForInsertion?.customerContactPersonId || "",
    },
          {
            name: "scheduledAt",
            label: "Tarih",
            type: "datetime-local",
            colspan: 12,
            group: "Genel",
            required: true,
            defaultValue: date? date: activityDtoForInsertion?.scheduledAt,
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
            dispatch(updateActivity(data));
          } else {
            dispatch(addActivity(data));
          }
          sidebar.closeSidebar();
        }}
      />,
      "right",
      "w-120 h-full",
      activityDtoForInsertion ? "Aktivite Düzenle" : "Yeni Aktivite Ekle"
    );
  };

  function getEventClass(status: ActivityState){
    switch(status){
        case ActivityState.Planned:
            return ["Planned"];
       case ActivityState.InProgress:
        return ["InProgress"];
        case ActivityState.Completed:
            return["Completed"];
        case ActivityState.Canceled:
            return["Canceled"];
        case ActivityState.Postponed:
            return["Postponed"];
        case ActivityState.Failed:
            return["Failed"];
    }  
  }

  

  return (
    <div className="p-2 text-black">
      {/* <h2 className="text-center text-2xl font-bold mb-2">Aktivite Takvimi</h2> */}
      <div className="flex gap-2">
        {/* Takvim */}
        <div className="flex-1">
          <FullCalendar
            locale={trLocale}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            events={activityState.data?.map<EventInput>((act) => {
              return {
                id: act.id,
                title:  act.relatedEntityName ==="Customer" ? customerState.data.find(c=>c.id==act.relatedEntityId)?.firma : opportunityState.data.find(o=>o.id==act.relatedEntityId)?.title,
                start: new Date(act.scheduledAt?.toString()),
                subject: act.subject,
                 classNames:getEventClass(act.activityState),
                extendedProps: {
                  type: act.activityType,
                  state: act.activityState,
                },
              };
            })}
            eventDidMount={(info) => {
        tippy(info.el, {
          content: info.event.extendedProps.subject,
          placement: "top",
        })}}
            eventClick={(e) =>{ newRecordVoid(e.event.id)}}
            dateClick={(e)=> {  newRecordVoid(undefined, formatDateForCalendar(e.date))}}
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
      </div>
    </div>
  );
};
