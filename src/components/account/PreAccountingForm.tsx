import { useEffect, useState } from "react";

type TransactionType = "COLLECTION" | "PAYMENT" | "TRANSFER";

interface FormState {
  transactionType: TransactionType;
  cashBankType?: "CASH" | "BANK";
  cashBankId?: number;
  customerId?: number;
  amount: number;
  description?: string;
}

export const PreAccountingForm = () => {
  const [form, setForm] = useState<FormState>({
    transactionType: "COLLECTION",
    amount: 0,
  });

  useEffect(() => {
    // İşlem türü değişince alanları sıfırla
    setForm((f) => ({
      ...f,
      customerId:
        f.transactionType === "TRANSFER" ? undefined : f.customerId,
    }));
  }, [form.transactionType]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-2 ">
      {/* İşlem Türü */}
      <div className="mb-5">
        <label className="block text-sm text-gray-600 mb-1">
          İşlem Türü
        </label>
        <select className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-indigo-600">
          <option>Ödeme</option>
          <option>Tahsilat</option>
          <option>Virman</option>
        </select>
      </div>

      {/* Cari */}
      <div className="mb-5">
        <label className="block text-sm text-gray-600 mb-1">
          Cari
        </label>
        <input
          type="text"
          placeholder="Cari seç"
          className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-indigo-600"
        />
      </div>

      {/* Kasa / Banka */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Kasa / Banka
          </label>
          <select className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-indigo-600">
            <option>Kasa</option>
            <option>Banka</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-600 mb-1">
            Kasa / Banka ID
          </label>
          <input
            type="text"
            placeholder="ID"
            className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-indigo-600"
          />
        </div>
      </div>

      {/* Tutar */}
      <div className="mb-5">
        <label className="block text-sm text-gray-600 mb-1">
          Tutar
        </label>
        <input
          type="number"
          placeholder="0,00"
          className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-indigo-600"
        />
      </div>

      {/* Açıklama */}
      <div className="mb-8">
        <label className="block text-sm text-gray-600 mb-1">
          Açıklama
        </label>
        <input
          type="text"
          placeholder="İşlem açıklaması"
          className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-indigo-600"
        />
      </div>

      {/* Footer */}
      <div className="flex justify-end">
        <button className="bg-indigo-600 text-white px-6 py-2 rounded-md hover:bg-indigo-700">
          Kaydet
        </button>
      </div>
    </div>
  );
};

