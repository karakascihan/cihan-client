import { URL } from '@/api'
import { CashAccountDtoForInsertion } from '@/api/apiDtos'
import { CashAccountForm } from '@/components/account/CashAccountForm'
import { CashAccountList } from '@/components/account/CashAccountList'
import { useApiRequest } from '@/hooks/useApiRequest'
import { ref } from 'process'
import React, { use } from 'react'

 const CashAccountPage = () => {
  return (
    <div className="card">
          <h2 className="text-xl text-center font-bold mb-2">Kasa Hesapları </h2>
          <CashAccountList isSelected={false} />
          </div>
        
  )
}
export default CashAccountPage;
