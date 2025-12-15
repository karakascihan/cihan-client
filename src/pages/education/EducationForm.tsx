import React, { useState } from "react";

interface PersonelEducationPlan {
  id: number;
  personelId: number;
  educationName: string;
  startDate: string;
  endDate: string;
}

interface PersonelEducationMapping {
  id: number;
  planId: number;
  status: string;
}

const PersonelEducationForm: React.FC = () => {
  const [plan, setPlan] = useState<PersonelEducationPlan>({
    id: 0,
    personelId: 0,
    educationName: "",
    startDate: "",
    endDate: "",
  });

  const [mapping, setMapping] = useState<PersonelEducationMapping>({
    id: 0,
    planId: 0,
    status: "",
  });

  const handlePlanChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlan({ ...plan, [e.target.name]: e.target.value });
  };

  const handleMappingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMapping({ ...mapping, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada API'ye POST isteği gönderebilirsiniz
    console.log("Plan:", plan);
    console.log("Mapping:", mapping);
    alert("Kayıt başarıyla oluşturuldu!");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Personel Eğitim Planı Oluştur</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Personel ID</label>
          <input
            type="number"
            name="personelId"
            value={plan.personelId}
            onChange={handlePlanChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Eğitim Adı</label>
          <input
            type="text"
            name="educationName"
            value={plan.educationName}
            onChange={handlePlanChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block mb-1 font-medium">Başlangıç Tarihi</label>
            <input
              type="date"
              name="startDate"
              value={plan.startDate}
              onChange={handlePlanChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1 font-medium">Bitiş Tarihi</label>
            <input
              type="date"
              name="endDate"
              value={plan.endDate}
              onChange={handlePlanChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
        </div>
        <div>
          <label className="block mb-1 font-medium">Plan ID (Mapping için)</label>
          <input
            type="number"
            name="planId"
            value={mapping.planId}
            onChange={handleMappingChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Durum</label>
          <input
            type="text"
            name="status"
            value={mapping.status}
            onChange={handleMappingChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Kaydet
        </button>
      </form>
    </div>
  );
};

export default PersonelEducationForm;