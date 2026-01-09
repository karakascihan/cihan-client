import React, { useEffect } from 'react'
import { FieldOption, GenericForm } from '../GenericForm'
import { ActivityState, ActivityType, MailSendDto } from '@/api/apiDtos'
import { apiRequest } from '@/services/apiRequestService'
import { ApiResponse, ApiResponseClient } from '@/types/apiResponse'
import { URL } from '@/api'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { setNotification } from '@/store/slices/notificationSlice'
import { fetchFileRecords } from '@/store/slices/fileRecordSlice'
import { FaSearch } from 'react-icons/fa'
import { FaUpload } from 'react-icons/fa6'
import { FileRecordPage } from '@/pages/crm/FileRecordPage'
import { useModal } from '@/context/ModalContext'
import { addActivity } from '@/store/slices/activitySlice'
export const EmailSender = ({ mailDto,priceOfferId,opportunityId}:{mailDto?:MailSendDto,priceOfferId?:number,opportunityId?:number} ) => {
    const dispatch =useDispatch<AppDispatch>();
    // const fileRecordState = useSelector( (state: RootState) => state.fileRecord);
    const token=useSelector((state:any)=>state.login.accessToken);
    //  useEffect(() => {
    //     if (fileRecordState.items.length===0 ) {
    //       dispatch(fetchFileRecords( { relatedEntityName:"PriceOffer", relatedEntityId:priceOfferId}) as any);
    //     }
    //   }, []);
      const {openModal} = useModal();
  return (
    <GenericForm   buttonNode={<button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Gönder</button>}
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
          type: "text",
          readOnly:true,
          colspan: 6,
          group: "Ekler",
           clickIcon: [
                              // <FaUpload color="green" title="Dosya Yükle" />,
                              <FaSearch title="Dosya Seç" />,
                            ],
          onThreeDotsClick: [
            async  (setValue) =>  {
             const result = await openModal({
                title: "Dosya Seç",
                content: function (close: (result: any) => void): React.ReactNode {
                  return <FileRecordPage onDoubleClick={(row)=>{ setValue("attachmentPaths.0", row.filePath);close(null);}} relatedEntityId={priceOfferId} relatedEntityName='PriceOffer' />
                }})
                // if(result)
                // {
                //    dispatch(fetchFileRecords( { relatedEntityName:"PriceOffer", relatedEntityId:priceOfferId}) as any);
                // }
            }]
                          }

      ]}
      onSubmit={async (data: MailSendDto): Promise<void> => {
        const result = await apiRequest<ApiResponseClient<string>>(
          "POST",
          URL + "/mail/sendemail",
          { Authorization: "Bearer " + token },
          data
        );
        if (result.statusCode === 200) {
           dispatch(addActivity({ activityState: ActivityState.Completed, relatedEntityId:opportunityId ?? priceOfferId, relatedEntityName:opportunityId ?"Opportunity":"PriceOffer", scheduledAt:new Date(), activityType:ActivityType.Email ,subject:"Fiyat Teklifi Mail Gönderildi", notes:"Ek dosya yolu: "+URL+"/"+data.attachmentPaths }));
          // close modal if any 
        }
        dispatch(
          setNotification({
            title:
              result.statusCode === 200 ? "Mail Gönderildi" : "Mail Gönderilemedi",
            message: result.message ?? "",
            type: result.statusCode === 0 ? "success" : "error",
          })
        );
      }}
    />
  );
}
