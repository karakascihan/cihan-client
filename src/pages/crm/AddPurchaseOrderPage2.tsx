import { useNavigate } from "react-router-dom";
import { apiRequest } from "@/services";
import { URL } from "@/api";
import { PurchaseOrderForm } from "@/components/CRM/PurchaseOrderForm";
import { useState } from "react";
import { DateOnly, PurchaseOrderDtoForInsertion } from "@/api/apiDtos";


type Props = {
  onClose?: () => void;
  onSuccess?: () => void | Promise<unknown>;
};

export const AddPurchaseOrderPage2 = ({ onClose, onSuccess }: Props) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState<PurchaseOrderDtoForInsertion>({
    firma_Id: null,
    priceOfferId: null,
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
    toplamIndirimOraniYuzde: 0,
    toplamTutar: 0,
    purchaseOrderLine: [], // boş bile olsa backend artık görüyor
  });
  console.log(
    "[PurchaseOrder]",
    "OPEN MODE:",
    onClose ? "MODAL" : "PAGE"
  );
  const handleCreate = async (currentForm: PurchaseOrderDtoForInsertion) => {
    setLoading(true);
    try {
      const payload: PurchaseOrderDtoForInsertion = {
        ...currentForm,
        siparisTarihi: currentForm.siparisTarihi
          ? (currentForm.siparisTarihi as unknown as DateOnly)
          : null,
        teslimTarihi: currentForm.teslimTarihi
          ? (currentForm.teslimTarihi as unknown as DateOnly)
          : null,
      };

      console.log("GİDEN PAYLOAD:", payload);

      await apiRequest("POST", URL + "/PurchaseOrder/Create", payload);
      alert("Sipariş başarıyla eklendi!");
      // MODAL varsa: refetch + close
      if (onSuccess) await onSuccess();
      //if (onClose) return onClose();

      // Sayfa olarak kullanılıyorsa: navigate
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
