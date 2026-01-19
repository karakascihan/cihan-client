import { URL } from '@/api'
import { BankAccountDtoForInsertion } from '@/api/apiDtos'
import { BankAccountForm } from '@/components/account/BankAccountForm'
import { BankAccounList } from '@/components/account/BankAccountList'
import { TabItem, Tabs } from '@/components/Tabs'
import { ReactNode, useState } from 'react'

export const BankAccountPage = () => {
   const [tabs, setTabs] = useState<TabItem[]>([ {
             key: 'bankaHesaplari',
             label: 'Banka Hesapları',
             content: function (data?: unknown): ReactNode {
              return <BankAccounList isSelected={false} />
             }},
             {
             key: 'yeniBankaHesabi',
             label: 'Yeni Banka Hesabı',
             content: function (data?: unknown): ReactNode {
              return <BankAccountForm  bankAccount={undefined} onSubmit={function (data: BankAccountDtoForInsertion): void {
                throw new Error('Function not implemented.')
              } } />
             }
           }]);
  return (
    <div className="card">
          <h2 className="text-xl text-center font-bold mb-2">Banka Hesapları </h2>
           <Tabs tabs={tabs}/>
          
          </div>
        
  )
}
