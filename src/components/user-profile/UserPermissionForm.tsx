import { UserPermission, UserPermissionDtoForUpdate } from '@/api/apiDtos'
import { useApiRequest } from '@/hooks/useApiRequest'
import { apiRequest } from '@/services/apiRequestService'
import React from 'react'
import { FieldDefinition, GenericForm } from '../GenericForm'
import { URL } from '@/api'
import { Column } from '../SmartTable'
import { data, Form } from 'react-router-dom'

export const UserPermissionForm = ({userId}:{userId?:number}): React.ReactNode => {
    const { data:users, loading,refetch} =useApiRequest<UserPermission>(URL+"/UserPermission/GetByUserId/"+userId, { method: 'GET' });
    const GetElements  =() =>{
       let elements= [];
if(users)
     users.forEach((user,ind) => {
            elements.push({
                name: "UserPermission."+ind+".serviceName",
                label: 'Servis Adı',
                type: 'text',
                defaultValue: user.serviceName,
                readOnly: true,
                colspan:6
            } as FieldDefinition);
            elements.push({
                name: "UserPermission."+ind+".canRead",
                label: 'Okuma İzni',
                type: 'checkbox',
                defaultValue: user.canRead,
                colspan:2,
                onChangeEffect(value, formValues, setFields, setValue) {
                    refetch(URL+"/UserPermission/update/",{method:"PUT",body:{
                        id: user.id,
                        userId: user.userId,
                        serviceName: user.serviceName,
                        canRead: value,
                        canWrite: user.canWrite,
                        canDelete: user.canDelete,
                    } as UserPermissionDtoForUpdate})
                },
            } as FieldDefinition);
               elements.push({
                name: "UserPermission."+ind+".canWrite",
                label: 'Yazma İzni',
                type: 'checkbox',
                defaultValue: user.canWrite,
                colspan:2,
                onChangeEffect(value, formValues, setFields, setValue) {
                    refetch(URL+"/UserPermission/update/",{method:"PUT",body:{
                        id: user.id,
                        userId: user.userId,
                        serviceName: user.serviceName,
                        canWrite: value,
                        canRead: user.canRead,
                        canDelete: user.canDelete,
                    } as UserPermissionDtoForUpdate})
                },
            } as FieldDefinition);
               elements.push({
                name: "UserPermission."+ind+".canDelete",
                label: 'Silme İzni',
                type: 'checkbox',
                defaultValue: user.canDelete,
                colspan:2,
                onChangeEffect(value, formValues, setFields, setValue) {
                    refetch(URL+"/UserPermission/update/",{method:"PUT",body:{
                        id: user.id,
                        userId: user.userId,
                        serviceName: user.serviceName,
                        canWrite: value,
                        canRead: user.canRead,
                        canDelete: user.canDelete,
                    } as UserPermissionDtoForUpdate})
                },
            } as FieldDefinition);
       });
        return elements;
    }
  return (
    <>
{ 
   (loading ) ? <div>Yükleniyor...</div>:
    <GenericForm fields={GetElements()} onSubmit={function (data: any): void {
          throw new Error('Function not implemented.')
      } } />
  
    }
  </>
  )
}
