import React from 'react'
import { FieldDefinition, GenericForm } from '../GenericForm';
import { ActivityDtoForInsertion, ActivityState, ActivityType, CustomerDto, OpportunityDto, OpportunityDtoForInsertion, UserDtoForCrm } from '@/api/apiDtos';
import { ActivityStateDescriptions, ActivityTypeDescriptions } from '@/api/extra-enums';
import { formatDateForInput } from '@/utils/commonUtils';

export const ActivityForm = ({activity,customers,users,onSubmit}:{activity:ActivityDtoForInsertion,customers?: CustomerDto[],
      users: UserDtoForCrm[],onSubmit:(data: ActivityDtoForInsertion)=>void}) => {
  
    const formElements = (
      activityDtoForInsertion: ActivityDtoForInsertion,
      customers: CustomerDto[],
      users: UserDtoForCrm[]
    ): FieldDefinition[] => [
      {
        name: "subject",
        label: "Konu",
        type: "text",
        colspan: 12,
        group: "Genel",
        required: true,
        defaultValue: activityDtoForInsertion?.subject,
      },
      {
        name: "notes",
        label: "Notlar",
        type: "textarea",
        colspan: 12,
        group: "Genel",
        
        defaultValue: activityDtoForInsertion?.notes,
      },
      {
        name: "assignedToUserId",
        label: "Görevli",
        type: "select",
        options: users.map((u) => ({
          label: `${u.name} ${u.surname} (${u.title})`,
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
      {
        name: "relatedEntityId",
        label: "İlgili Müşteri",
        type: "select",
        options:customers?.map((c) => ({
          label: c.firma?.substring(0, 40),
          value: c.id,
        })),
        colspan: 12,
        group: "Genel",
      
        hidden:customers?false:true,
        defaultValue: activityDtoForInsertion?.relatedEntityId,
      },
      {
        name: "scheduledAt",
        label: "Planlama Tarihi",
        type: "date",
        colspan: 12,
        group: "Genel",
        required: true,
        defaultValue: formatDateForInput(activityDtoForInsertion?.scheduledAt),
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
  function dispatch(arg0: any) {
    throw new Error('Function not implemented.');
  }

  return (
  <GenericForm
          fields={formElements(activity, customers, users)}
          onSubmit={onSubmit}
        />
  )
}
