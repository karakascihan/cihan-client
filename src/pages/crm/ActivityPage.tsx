import {
  ActivityDto,
  ActivityDtoForInsertion,
  ActivityType,
  ActivityState,
  CustomerDto,
  UserDtoForCrm,
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
import { use, useEffect } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { formatDateForInput } from "@/utils/commonUtils";
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

export const ActivityPage = ({
  relatedEntityId,
  relatedEntityName = "Customer",
  title,
}: {
  relatedEntityId?: number;
  relatedEntityName?: string;
  title?: string;
}) => {
  const { data } = useSelector((state: RootState) => state.activity);
  const customerState = useSelector(
    (state: RootState) => state.customer as CustomerState
  );
  const opportunityState = useSelector((state: RootState) => state.opportunity);
  const userState = useSelector((state: RootState) => state.user as UserState);

  const dispatch = useDispatch<AppDispatch>();
  const confirm = useConfirm();
  const sidebar = useSidebar();
  const navigate = useNavigate();

  // Activities her zaman yüklenir
  useEffect(() => {
    dispatch(
      fetchActivities({
        relatedEntityId: relatedEntityId,
        relatedEntityName: relatedEntityName,
      })
    );
  }, [dispatch]);

  // Customers sadece boşsa yüklenir
  useEffect(() => {
    if (customerState.data.length===0 ) {
      dispatch(fetchCustomers());
    }
  }, []);

  // Users sadece boşsa yüklenir
  useEffect(() => {
    if (userState.data.length===0) {
      dispatch(fetchUsers());
    }
  }, []);

  useEffect(() => {
    if (opportunityState.data.length===0 ) {
      dispatch(fetchOpportunities());
    }
  }, []);
   const activitiesWithCustomerWithOpportunity = useSelector(selectActivitiesWithCustomerWithOpportunity);


  const columns: Column<ActivityDto>[] = [
    { header: "#", accessor: "__index" },
    // {
    //   header: "Şirket",
    //   accessor: "relatedEntityId",
    //   filterable: true,
    //   sortable: true,
    //   summaryType: "count",
    //   filterType: "id_select",
    //   filterOptions: customerState.data.map((u) => ({
    //     label: `${u.firma}`,
    //     value: u.id,
    //   })),
    //   body: (row: ActivityDto) => (
    //     <span>
    //       {row.relatedEntityName === "Customer"
    //         ? customerState.data.find((c) => c.id === row.relatedEntityId)
    //             ?.firma
    //         : customerState.data.find(
    //             (c) =>
    //               c.id ===
    //               opportunityState.data.find(
    //                 (o) => o.id === row.relatedEntityId
    //               )?.customerId
    //           )?.firma}
    //     </span>
    //   ),
    // },
      {
      header: "Müşteri",
      accessor: "customerName",
      filterable: true,
      sortable: true,
      summaryType: "count",
    },
      {
      header: "Fırsat",
      accessor: "opportunityName",
      filterable: true,
      sortable: true,
    },
    // {
    //   header: "Fırsat",
    //   accessor: "relatedEntityId3434",
    //   filterable: false,
    //   sortable: true,
    //   body: (row: ActivityDto) => (
    //     <span>
    //       {row.relatedEntityName === "Opportunity"
    //         ? opportunityState.data.find((o) => o.id === row.relatedEntityId)
    //             ?.title
    //         : ""}
    //     </span>
    //   ),
    // },
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
      filterType: "date_range",
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
    },
   {
      header: "Müşterideki İlgili Kişi",
      accessor: "customerContactPersonName",
      filterable: true,
      sortable: true
    },
    {
      header: "İşlemler",
      accessor: "id",
      body: (row: ActivityDto) => (
        <div className="flex flex-row">
          <button
            onClick={() => newRecordVoid(row)}
            className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded mr-2"
          >
            <FaPencilAlt title="Düzenle" />
          </button>
          <button
            onClick={async () => {
              const isConfirmed = await confirm({
                title: "Silme işlemi",
                message: "Aktiviteyi silmek istediğinize emin misiniz?",
                confirmText: "Evet",
                cancelText: "Vazgeç",
              });
              if (isConfirmed) {
                dispatch(deleteActivity(row.id!));
              }
            }}
            className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded mr-2"
          >
            <FaTrash title="Sil" />
          </button>
        </div>
      ),
    },
  ];

  const formElements = (
    activityDtoForInsertion: ActivityDtoForInsertion,
    customers: CustomerDto[],
    users: UserDtoForCrm[]
  ): FieldDefinition[] => [
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
      options: users.map((u) => ({
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
    // {
    //   name: "relatedEntityId",
    //   label: "İlgili Müşteri",
    //   type: "select",
    //   options: customers.map((c) => ({
    //     label: c.firma?.substring(0, 40) ?? "",
    //     value: c.id,
    //   })),
    //   colspan: 12,
    //   group: "Genel",
    //   defaultValue: activityDtoForInsertion?.relatedEntityId,
    //   hidden: true,
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
        activityDtoForInsertion?.relatedEntityName ?? relatedEntityName,
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
      defaultValue: activityDtoForInsertion?.relatedEntityId ?? relatedEntityId,
      onChangeEffect: (
        value: any,
        allValues: any,
        setFields_: any,
        setValue: any
      ) => {
        const selectedCustomer =
          allValues["relatedEntityName"] == "Customer"
            ? customers.find((x) => x.id == value)
            : customers.find(
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
    // {
    //   name: "relatedEntityId",
    //   label: "İlgili Müşteri",
    //   type: "select",
    //   hidden: true,
    //   group:"Genel",
    // },
    {
      name: "customerContactPersonId",
      label: "Müşterideki İlgili kişi",
      type: "select",
      options: activityDtoForInsertion?.relatedEntityName == "Customer"
            ? customers.find((x) => x.id == activityDtoForInsertion?.relatedEntityId)?.
            contacts?.map((c) => ({
            label: c.yetkiliKisi + (c.gorevi ? ` (${c.gorevi})` : ""),
            value: c.id,
          }))
            : customers.find(
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
      defaultValue: activityDtoForInsertion?.scheduledAt,
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
  ];

  const newRecordVoid = (activity?: ActivityDto) => {
    const users = userState.data ?? [];
    const customers = customerState.data ?? [];

    sidebar.openSidebar(
      <GenericForm
        fields={formElements(activity, customers, users)}
        onSubmit={(data: ActivityDtoForInsertion) => {
          if (activity && activity.id) {
            data.id = activity.id;
            dispatch(updateActivity(data));
          } else {
            dispatch(addActivity(data));
          }
          sidebar.closeSidebar();
        }}
      />,
      "right",
      "w-120 h-full",
      activity ? "Aktivite Düzenle" : "Yeni Aktivite Ekle"
    );
  };

  return (
    <div className="card">
      {title && (
        <div className="flex flex-row justify-between gap-4">
          <h2 className="text-xl text-center font-bold mb-2">{title} </h2>{" "}
          <Calendar
            className="mr-6"
            onClick={() => {
              navigate("/takvim");
            }}
          />
        </div>
      )}

      <SmartTable
        data={activitiesWithCustomerWithOpportunity ?? []}
        columns={columns}
        rowIdAccessor={"id"}
        frozenColumns={[{ name: "id", right: true }]}
        isExport={true}
        newRecordVoid={newRecordVoid}
        scrollHeight="calc(100vh - 200px)"
        enablePagination={false}
      />
    </div>
  );
};
