import { useNavigate } from "react-router-dom";
import { apiRequest } from "@/services";
import { URL } from "@/api";
import { PurchaseOrderForm } from "@/components/CRM/PurchaseOrderForm";
import { useState } from "react";
import { DateOnly, PurchaseOrderDtoForInsertion } from "@/api/apiDtos";

export const AddPurchaseOrderPage2 = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<PurchaseOrderDtoForInsertion>({
    firmaAdi: "",
    yetkiliKisi: "",
    siparisTarihi: null,
    teslimTarihi: null,
    aciklama: "",
    durumu: "",
    onayAcikla: "",
    siparisKosullari: "",
    kaliteKosullari: "",
    siparisTipi: "",
    turu: "",
    purchaseOrderLine: [], // boş bile olsa backend artık görüyor
  });

  const handleCreate = async () => {
    setLoading(true);
    try {
      const payload: PurchaseOrderDtoForInsertion = {
        ...form,
        siparisTarihi: form.siparisTarihi
          ? (form.siparisTarihi as unknown as DateOnly)
          : null,
        teslimTarihi: form.teslimTarihi
          ? (form.teslimTarihi as unknown as DateOnly)
          : null,
      };
  
      console.log("GİDEN PAYLOAD:", payload);
  
      await apiRequest("POST", URL + "/PurchaseOrder/Create", payload);
      alert("Sipariş başarıyla eklendi!");
      navigate("/siparisler");
    } catch (err) {
      console.error(err);
      alert("Sipariş eklenirken hata oluştu!");
    } finally {
      setLoading(false);
    }
  };
  
  

  return (
    <PurchaseOrderForm
      mode="create"
      form={form}
      setForm={setForm}
      onSubmit={handleCreate}
      loading={loading}
    />
  );
};
