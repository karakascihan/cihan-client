import { CurrencyDto } from '@/api/apiDtos';
import { SmartTable } from '@/components/SmartTable'
import { useApiRequest } from '@/hooks/useApiRequest';
import React from 'react'

export const CurrencyPage = () => {
       const {data:currencies, loading} = useApiRequest<CurrencyDto>(URL+'/currency/getall',{ method: 'GET'});
  return (
    <SmartTable data={currencies || []} columns={[
        {
            header: 'Para Birimi Adı',
            accessor: "currencyName",
            filterable: true,
        },
        {
            header: 'Para Birimi Kodu',
            accessor: "currencyCode",
            filterable: true,
        }
        
    ]} rowIdAccessor={"id"}  />
  )
}
