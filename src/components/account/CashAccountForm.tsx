import React from 'react'
import { useApiRequest } from '@/hooks/useApiRequest'
import { CashAccountDto, CashAccountDtoForInsertion, CurrencyDto } from '@/api/apiDtos'
import { GenericForm } from '../GenericForm'
import { URL } from '@/api'
import { useLoading } from '@/context/LoadingContext'
import { useDispatch } from 'react-redux'
import { setNotification } from '@/store/slices/notificationSlice'
import { on } from 'events'

export const CashAccountForm = ({cashAccount,onSubmit}:{cashAccount:CashAccountDto,onSubmit:(data:CashAccountDtoForInsertion)=>void}) => {
 const {data : currencies,loading,refetch} = useApiRequest<CurrencyDto>(URL+'/currency/getall',{  method: 'GET'});
 const dispatch=useDispatch();
  return (
<>
{
   loading? <div>Yükleniyor...</div>: <GenericForm fields={[{
          name: 'cashCode',
          label: 'Kasa Kodu',
          type: 'text',
          defaultValue: cashAccount?.cashCode || ''
      },
      {
          name: 'cashName',
          label: 'Kasa Adı',
          type: 'text',
            defaultValue: cashAccount?.cashName || ''
      },
      {
          name: 'description',
          label: 'Açıklama',
          type: 'text',
            defaultValue: cashAccount?.description || ''
      },
      {
          name: 'currencyId',
          label: 'Para Birimi',
          type: 'select',
          options: currencies ? currencies.map(c => ({ value: c.id, label: c.currencyName })) : [],
            defaultValue: cashAccount?.currencyId || ''
      },
      {
          name: 'specialCode',
          label: 'Özel Kod',
          type: 'text',
            defaultValue: cashAccount?.specialCode || ''
      }]} onSubmit={function (data: any): void {
        if(cashAccount && cashAccount.id){
          //Güncelle
          refetch(URL+'/cash-account/update/'+cashAccount.id, {  method: 'PUT', body:data,skip: false  }).then((result)=>{   
            if(result && result.isSuccess){
                dispatch(setNotification({
                    title: 'Başarılı',
                    message: 'Kasa hesabı başarıyla güncellendi.',
                    type: 'success',
                }));
                onSubmit(data);
            } })}
            else
           refetch(URL+'/cash-account/create', {  method: 'POST', body:data,skip: false  }).then((result)=>{
            if(result && result.isSuccess){
                dispatch(setNotification({
                    title: 'Başarılı',
                    message: 'Kasa hesabı başarıyla oluşturuldu.',
                    type: 'success',
                }));
                onSubmit(data);
            }
           });
      } }   />
}
</>

  )
}
