import { BankAccountDto } from '@/api/apiDtos';
import { useApiRequest } from '@/hooks/useApiRequest';
import React from 'react'
import { SmartTable } from '../SmartTable';
import { URL } from '@/api';
import { useModal } from '@/context/ModalContext';
import { CashAccountForm } from './CashAccountForm';
import { ref } from 'process';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useConfirm } from '@/context/ConfirmContext';
import { useDispatch } from 'react-redux';
import { BankAccountForm } from './BankAccountForm';

export const BankAccounList = ({isSelected=false}:{isSelected: boolean}) => {
    const {data : bankAccounts,refetch} = useApiRequest<BankAccountDto>(URL+'/bank-account/getall',{  method: 'GET' });
     const {openModal} = useModal();
     const dispatch = useDispatch();
     const confirm = useConfirm();
     const handleNewRecord = async (bankAccount:BankAccountDto) => {
      const result = await openModal({
          title: bankAccount ? 'Banka Hesabı Düzenle' : 'Yeni Banka Hesabı',
          content: function (close: (result: any) => void): React.ReactNode {
            return <BankAccountForm onSubmit={()=>close(null)}   bankAccount={bankAccount} />
          }
        })
        
        refetch();
      };
      
      // refetch();
  return (
    <SmartTable data={bankAccounts || []} pageSize={10} newRecordVoid={async ()=>await handleNewRecord(undefined)} columns={[{
      header: '#',
      accessor: '__index',
        headerClassName:"w-16 "
    },{
        header: 'Banka Hesap Kodu',
        accessor: "bankAccountCode",
        filterable: true,
        headerClassName:"w-32"
        },{
            header: 'Banka Hesap Adı',
            accessor: "accountName",
            filterable: true,
        },
        {
            header: 'Şube Kodu',
            accessor: "branchCode",
            filterable: true,
        },
         {
            header: 'IBAN',
            accessor: "iban",
            filterable: true,
        },
        {
            header: 'Para Birimi',
            accessor: "currencyCode",
            filterable: true,
        },
        {
        header: 'İşlemler',
        accessor: "id",
        body:  (row: BankAccountDto) => {
            return  <div className="flex flex-row"> <button  onClick={async ()=>await handleNewRecord(row)}  className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded mr-2"
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
                                        refetch(URL + '/bank-account/delete/' + row.id, { method: 'DELETE', skip: false }).then(() => {
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
