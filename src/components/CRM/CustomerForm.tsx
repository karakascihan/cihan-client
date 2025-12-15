import { CustomerDto } from "@/api/apiDtos";
import React from "react";
import { useForm } from "react-hook-form";


interface CustomerFormProps {
  initialData?: CustomerDto;
  onSubmit: (data: CustomerDto) => void;
}

const CustomerForm: React.FC<CustomerFormProps> = ({ initialData, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerDto>({
    defaultValues: initialData || {},
  });

  const isUpdate = Boolean(initialData?.id);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl mx-auto p-6 bg-white rounded-2xl shadow-md space-y-4"
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {isUpdate ? "Müşteri Güncelle" : "Yeni Müşteri Kaydı"}
      </h2>

      {/* Firma */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Firma</label>
        <input
          {...register("firma", { required: "Firma adı zorunludur" })}
          className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          placeholder="Firma adı giriniz"
        />
        {errors.firma && (
          <p className="text-red-500 text-sm">{errors.firma.message}</p>
        )}
      </div>

      {/* Yetkili */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Yetkili</label>
        <input
          {...register("yetkili")}
          className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          placeholder="Yetkili kişi"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700">E-mail</label>
        <input
          type="email"
          {...register("email", { pattern: { value: /\S+@\S+\.\S+/, message: "Geçerli bir email girin" } })}
          className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          placeholder="ornek@mail.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      {/* Telefon */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Telefon</label>
        <input
          type="tel"
          {...register("telefon")}
          className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          placeholder="05xx xxx xx xx"
        />
      </div>

      {/* Tedarikçi Puanı */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Tedarikçi Puanı</label>
        <input
          type="number"
          {...register("tedarikciPuanı")}
          className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
          placeholder="0 - 100"
        />
      </div>

      {/* Çalışma Başlama Tarihi */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Çalışma Başlama Tarihi
        </label>
        <input
          type="date"
          {...register("calismaBaslamaTarihi")}
          className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
        />
      </div>

      {/* Değerlendirme Tarihi */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Değerlendirme Tarihi
        </label>
        <input
          type="date"
          {...register("degerlendirmeTarihi")}
          className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
        />
      </div>

      {/* Onay Durumu */}
      <div>
        <label className="block text-sm font-medium text-gray-700">Onay Durumu</label>
        <select
          {...register("onayDurumu")}
          className="mt-1 w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring focus:ring-blue-400"
        >
          <option value="">Seçiniz</option>
          <option value="onayli">Onaylı</option>
          <option value="beklemede">Beklemede</option>
          <option value="reddedildi">Reddedildi</option>
        </select>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="submit"
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          {isUpdate ? "Güncelle" : "Kaydet"}
        </button>
      </div>
    </form>
  );
};

export default CustomerForm;
