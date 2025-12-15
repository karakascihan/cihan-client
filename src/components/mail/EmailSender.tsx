import React, { useEffect } from 'react'
import { FieldOption, GenericForm } from '../GenericForm'
import { MailSendDto } from '@/api/apiDtos'
import { apiRequest } from '@/services/apiRequestService'
import { ApiResponse, ApiResponseClient } from '@/types/apiResponse'
import { URL } from '@/api'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { setNotification } from '@/store/slices/notificationSlice'
import { fetchFileRecords } from '@/store/slices/fileRecordSlice'
export const EmailSender = ({ mailDto}:{mailDto?:MailSendDto} ) => {
    const dispatch =useDispatch<AppDispatch>();
    const fileRecordState = useSelector( (state: RootState) => state.fileRecord);
    const token=useSelector((state:any)=>state.login.accessToken);
     useEffect(() => {
        if (fileRecordState.items.length===0 ) {
          dispatch(fetchFileRecords( { relatedEntityName:"Opportunity"}));
        }
      }, []);
  return (
    <GenericForm
      fields={[
        {
          name: "toEmail",
          label: "Kime",
          type: "text",
          defaultValue: mailDto?.toEmail,
          group: "Gönderim Bilgileri",
          required:true
        },
        {
          name: "subject",
          label: "Konu",
          type: "text",
          defaultValue: mailDto?.subject,
          group: "Gönderim Bilgileri",
            required:true
        },
        {
          name: "smtpPort",
          label: "Port",
          type: "number",
          defaultValue: "587",
          group: "Gönderim Bilgileri",
           hidden:true

        },
        {
          name: "smtpHost",
          label: "Host",
          type: "text",
          defaultValue: "mail.digitest.com.tr",
          group: "Gönderim Bilgileri",
          hidden:true
        },
        {
          name: "smtpUser",
          label: "Kimden",
          type: "text",
          defaultValue: mailDto?.smtpUser,
          group: "Gönderim Bilgileri",
            required:true
        },
        {
          name: "smtpPassword",
          label: "Şifre",
          type: "password",
          defaultValue: mailDto?.smtpPassword,
          group: "Gönderim Bilgileri",
            required:true
        },
        {
          name: "body",
          label: "İçerik",
          type: "editor",
          colspan: 12,
          defaultValue: mailDto?.body,
          group: "Mail İçeriği",
        },
        {
          name: "attachmentPaths.0",
          label: "Ekler",
          type: "select",
          colspan: 12,
          options: fileRecordState.items.map<FieldOption>( (x) => 
             (
            {
           label:x.fileName,
           value:x.filePath
           }
          )
        ),
          group: "Ekler",
        },
      ]}
      onSubmit={async (data: MailSendDto): Promise<void> => {
        const result = await apiRequest<ApiResponseClient<string>>(
          "POST",
          URL + "/mail/sendemail",
          { Authorization: "Bearer " + token },
          data
        );
        dispatch(
          setNotification({
            title:
              result.statusCode === 0 ? "Mail Gönderildi" : "Mail Gönderilemedi",
            message: result.message ?? "",
            type: result.statusCode === 0 ? "success" : "error",
          })
        );
      }}
    />
  );
}
