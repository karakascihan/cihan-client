import { CashAccountDto, CashAccountDtoForInsertion } from '@/api/apiDtos';
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

export const CashAccountList = ({isSelected=false}:{isSelected: boolean}) => {
    const {data : cashAccounts,refetch} = useApiRequest<CashAccountDto>(URL+'/cash-account/getall',{  method: 'GET' });
     const {openModal} = useModal();
     const dispatch = useDispatch();
     const confirm = useConfirm();
     const handleNewRecord = async (cashAccount:CashAccountDto) => {
      const result = await openModal({
          title: cashAccount ? 'Kasa Hesabı Düzenle' : 'Yeni Kasa Hesabı',
          content: function (close: (result: any) => void): React.ReactNode {
            return <CashAccountForm onSubmit={()=>close(null)}   cashAccount={cashAccount} />
          }
        })
        
        refetch();
      };
      
      // refetch();
  return (
    <SmartTable data={cashAccounts || []} pageSize={10} newRecordVoid={async ()=>await handleNewRecord(undefined)} columns={[{
      header: '#',
      accessor: '__index',
        headerClassName:"w-16 "
    },{
        header: 'Kasa Kodu',
        accessor: "cashCode",
        filterable: true,
        headerClassName:"w-32"
        },{
            header: 'Kasa Adı',
            accessor: "cashName",
            filterable: true,
        },
        {
            header: 'Para Birimi',
            accessor: "currencyCode",
            filterable: true,
        },
        {
        header: 'Açıklama',
        accessor: "description",
        filterable: true,
        },
        {
        header: 'İşlemler',
        accessor: "id",
        body:  (row: CashAccountDto) => {
            return  <div className="flex flex-row"> <button  onClick={async ()=>await handleNewRecord(row)}  className="inline-flex items-center px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded mr-2"
                      >
                        <FaPencilAlt title="Düzenle" /></button><button
                                    onClick={async () => {
                                      const isConfirmed = await confirm({
                                        title: "Silme işlemi",
                                        message: "Kasa Hesabını silmek istediğinize emin misiniz?",
                                        confirmText: "Evet",
                                        cancelText: "Vazgeç",
                                      });
                                      if (isConfirmed) {
                                        refetch(URL + '/cash-account/delete/' + row.id, { method: 'DELETE', skip: false }).then(() => {
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
