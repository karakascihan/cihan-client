import { BankAccountDto, FinancalTransaction, FinancalTransactionDto, TransactionType } from '@/api/apiDtos';
import { useApiRequest } from '@/hooks/useApiRequest';
import React, { useEffect } from 'react'
import { SmartTable } from '../SmartTable';
import { URL } from '@/api';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useConfirm } from '@/context/ConfirmContext';
import { enumToLabel, getEnumOptions } from '@/utils/commonUtilsCompnent';
import { EntityTypeDescriptions, TransactionTypeDescriptions } from '@/api/extra-enums';

 const AccountingVoucherList = ({isSelected=false,onClose}:{isSelected: boolean,onClose()}) => {
    const {data : vouchers,refetch} = useApiRequest<FinancalTransactionDto>(URL+'/financal-transaction/getall',{  method: 'GET' });
     const confirm = useConfirm();
     useEffect(() => {
       refetch();
     }, [onClose])
  return (
    <SmartTable enablePagination={false} data={vouchers || []}  
    scrollHeight="calc(100vh - 200px)"
     columns={[{
      header: '#',
      accessor: '__index',
        headerClassName:"w-16 "
    },{
        header: 'İşlem Numarası',
        accessor: "id",
        filterable: true,
        headerClassName:"w-32",
         summaryType: "count"
        },
        {
            header: 'İşlem Tipi',
            accessor:"transactionType",
            filterable: true,
            filterType:"select",
            body:(row)=><span>{ row.transactionType=== TransactionType.Collection ? "Tahsilat" : 
               row.transactionType=== TransactionType.Payment ? "Ödeme" : "Virman" }</span>,
            filterOptions: getEnumOptions<TransactionType>(TransactionTypeDescriptions)
        },
        {
            header: 'İşlem Tarihi',
            accessor: "transactionDate",
            filterable: true,
            body: (row)=> <span>{new Date(row.transactionDate).toLocaleDateString()}</span>
        },
      
        {
            header: 'Tutar',
            accessor: "amount",
            filterable: true,
            summaryType: "sum",
            body : (row) =>  <span className="text-md ">{row.amount?.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}</span>
            
        },
        {
            header: 'Kaynak Tipi',
            accessor: "sourceType",
            filterable: true,
            body : (row) => <span>{enumToLabel(row.sourceType,EntityTypeDescriptions)}</span>

        },
        {
            header: 'Kaynak Hesabı',
            accessor: "sourceName",
            filterable: true,
        },
        {
            header: 'Karşı Hesap Tipi',
            accessor: "targetType",
            filterable: true,
               body : (row) => <span>{enumToLabel(row.targetType,EntityTypeDescriptions)}</span>
        },
        {
            header: 'Karşı Hesap',
            accessor: "targetName",
            filterable: true,
           
        },
      
        {
            header: 'Oluşturma Zamanı',
            accessor: "createtAt",
            filterable: true,
             body: (row)=> <span>{new Date(row.createtAt).toLocaleString()}</span>
        },
        {
            header: 'Oluşturan',
            accessor: "userName",
            filterable: true,
        },
        {
        header: 'İşlemler',
        accessor: "id",
        body:  (row: FinancalTransactionDto) => {
            return  <div className="flex flex-row"> <button    className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded mr-2"
                      >
                        <FaPencilAlt title="Düzenle" /></button><button
                                    onClick={async () => {
                                      const isConfirmed = await confirm({
                                        title: "Silme işlemi",
                                        message: "Banka Hesabını silmek istediğinize emin misiniz?",
                                        confirmText: "Evet",
                                        cancelText: "Vazgeç",
                                      });
                                      if (isConfirmed) {
                                        refetch(URL + '/financal-transaction/delete/' + row.id, { method: 'DELETE', skip: false }).then(() => {
                                        refetch();
                                        }
                                      );
                                    }}}
                                    className="inline-flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded mr-2"
                                  >
                                    <FaTrash title="Sil" />
                                  </button></div>
        }
         }
    
]} rowIdAccessor={"id"}   />
  )
}
export default AccountingVoucherList;