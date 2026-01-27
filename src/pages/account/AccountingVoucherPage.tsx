import { TransactionType } from '@/api/apiDtos';
import { AccountingVoucherForm } from '@/components/account/AccountingVoucherForm';
import AccountingVoucherList from '@/components/account/AccountingVoucherList'
import { useModal } from '@/context/ModalContext';

 const AccountingVoucherPage = () => {
         const {openModal} = useModal();
         
    const handleTransactionClick = async (type:TransactionType) => {
          const result = await openModal({
              title: "Muhasebe Fişi",
              content: function (close: (result: any) => void): React.ReactNode {
                return <AccountingVoucherForm transactionType={type}  onClose={(data)=>{close(data);formOnClose()}}   />
              }
            })
          };
            const formOnClose = () => {
    console.log("Form kapandı, listeyi yenile!");
    // Burada listeyi fetch veya state update edebilirsin
  };
  return (
      <div className="card">
              <h2 className="text-xl text-center font-bold mb-2">Muhasebe Fişleri </h2>
              <div className="flex justify-start gap-4 mb-2 ms-4">
  {/* Collection */}
  <div
    onClick={() => handleTransactionClick(TransactionType.Collection)}
    className="flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-lg shadow hover:bg-green-200 cursor-pointer"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M12 8c-1.657 0-3 1.343-3 3s1.343 3 3 3m0-6v6m0 0v6m0-6h6m-6 0H6"
      />
    </svg>
    <span>Tahsilat</span>
  </div>

  {/* Payment */}
  <div
    onClick={() => handleTransactionClick(TransactionType.Payment)}
    className="flex items-center gap-2 bg-red-100 text-red-800 px-4 py-2 rounded-lg shadow hover:bg-red-200 cursor-pointer"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M7 11h4m0 0l-2-2m2 2l-2 2"
      />
    </svg>
    <span>Ödeme</span>
  </div>

  {/* Transfer */}
  <div
    onClick={() => handleTransactionClick(TransactionType.Virman)}
    className="flex items-center gap-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-lg shadow hover:bg-blue-200 cursor-pointer"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M4 4v6h6M20 20v-6h-6M14 10l6-6M4 20l6-6"
      />
    </svg>
    <span>Virman</span>
  </div>
</div>
               <AccountingVoucherList isSelected={false} onClose={formOnClose} />
              </div>
  )
}
export default AccountingVoucherPage;
