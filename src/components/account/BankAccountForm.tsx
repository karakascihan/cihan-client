import React from 'react'
import { useApiRequest } from '@/hooks/useApiRequest'
import { GenericForm } from '../GenericForm'
import { URL } from '@/api'
import { useDispatch } from 'react-redux'
import { setNotification } from '@/store/slices/notificationSlice'
import { on } from 'events'
import { BankAccountDto, BankAccountDtoForInsertion, BankDto, CurrencyDto } from '@/api/apiDtos'

export const BankAccountForm = ({bankAccount,onSubmit}:{bankAccount:BankAccountDto,onSubmit:(data:BankAccountDtoForInsertion)=>void}) => {
 const {data : currencies,loading,refetch} = useApiRequest<CurrencyDto>(URL+'/currency/getall',{  method: 'GET'});
 const {data : banks,loading:loadingBanks,refetch:refetchBanks} = useApiRequest<BankDto>(URL+'/bank/getall',{  method: 'GET'});
 const dispatch=useDispatch();
  return (
<>
{ 
   (loading &&loadingBanks) ? <div>Yükleniyor...</div>: <GenericForm fields={[{
          name: 'bankAccountCode',
          label: 'Banka Hesap Kodu',
          type: 'text',
          defaultValue: bankAccount?.bankAccountCode || ''
      },
      {
          name: 'accountName',
          label: 'Hesap Adı',
          type: 'text',
            defaultValue: bankAccount?.accountName || ''
            ,required:true
      },
      {
          name: 'bankId',
          label: 'Banka',
          type: 'select',
          options: banks ? banks.map(b => ({ label: b.bankName, value: b.id })) : []
      ,
            defaultValue: bankAccount?.bankId || ''
             ,required:true
      },
       {
          name: 'branchCode',
          label: 'Şube Kodu',
          type: 'text',
            defaultValue: bankAccount?.branchCode || ''
      },
      {
          name: 'currencyId',
          label: 'Para Birimi',
          type: 'select',
          options: currencies ? currencies.map(c => ({ value: c.id, label: c.currencyName })) : [],
            defaultValue: bankAccount?.currencyId || ''
             ,required:true
      },
      {
          name: 'accountNumber',
          label: 'Hesap Numarası',
          type: 'text',
            defaultValue: bankAccount?.accountNumber || ''
      },
      {
          name: 'iban',
          label: 'IBAN',
          type: 'text',
            defaultValue: bankAccount?.iban || ''
             ,required:true
      },
      ]} onSubmit={function (data: any): void {
        if(bankAccount && bankAccount.id){
          //Güncelle
          refetch(URL+'/bank-account/update/'+bankAccount.id, {  method: 'PUT', body:data,skip: false  }).then((result)=>{   
            if(result && result.isSuccess){
                dispatch(setNotification({
                    title: 'Başarılı',
                    message: 'Banka hesabı başarıyla güncellendi.',
                    type: 'success',
                }));
                onSubmit(data);
            } })}
            else
           refetch(URL+'/bank-account/create', {  method: 'POST', body:data,skip: false  }).then((result)=>{
            if(result && result.isSuccess){
                dispatch(setNotification({
                    title: 'Başarılı',
                    message: 'Banka hesabı başarıyla oluşturuldu.',
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
