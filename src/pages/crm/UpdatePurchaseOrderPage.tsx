import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, use } from "react";
import { apiRequest } from "@/services";
import { URL } from "@/api";
import { PurchaseOrderForm } from "@/components/CRM/PurchaseOrderForm";
import { PurchaseOrderDtoForUpdate } from "@/api/apiDtos";
import { ApiResponseClient } from "@/types/apiResponse";

const emptyForm: PurchaseOrderDtoForUpdate = {
    id: 0,     
    firmaAdi: "",
    yetkiliKisi: "",
    siparisTipi: "",
    turu: "",
    durumu: "",
    siparisKosullari: "",
    kaliteKosullari: "",
    aciklama: "",
    onayAcikla: "",
    siparisTarihi: null,
    teslimTarihi: null,
    purchaseOrderLine: [],
  };

  
export const UpdatePurchaseOrderPage = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<PurchaseOrderDtoForUpdate>(emptyForm);
    useEffect(() => {
        const fetchOrder = async () => {
            if (!id) return;
            setLoading(true);
            try {
                const res = await apiRequest<ApiResponseClient<PurchaseOrderDtoForUpdate>>(
                   "GET",
                    URL + `/PurchaseOrder/${id}`
                  );
                  
                  const dto = res.result;
                  console.log("YÜKLENEN DTO:", dto);
                  console.log("DTO.purchaseOrderLine:", dto?.purchaseOrderLine);
console.log("DTO keys:", Object.keys(dto || {}));
                  setForm({
                    ...emptyForm,
                    ...dto,
                    siparisTarihi: dto.siparisTarihi ?? null,
                    teslimTarihi: dto.teslimTarihi ?? null,
                    purchaseOrderLine: dto.purchaseOrderLine ?? [],
                  });
                  console.log("sonraki DTO:", dto);
                  
            } catch (err) {
                console.error(err);
                alert("Sipariş yüklenirken hata oluştu!");
            } finally {
                setLoading(false);
            }
        };
    
        fetchOrder();
    }, [id]);
    useEffect(() => {
        console.log("YÜKLENEN FORM:", form);
    }, [form]);
    

    const handleUpdate = async () => {
        if (!form || !id) return;
        setLoading(true);
        try {
            const payload: PurchaseOrderDtoForUpdate = {
                ...form,
                siparisTarihi: form.siparisTarihi ?? null,
                teslimTarihi: form.teslimTarihi ?? null,
            };

            await apiRequest("PUT", URL + `/PurchaseOrder/Update/${id}`, payload);
            alert("Sipariş başarıyla güncellendi!");
            navigate("/siparisler");
        } catch (err) {
            console.error(err);
            alert("Hata oluştu!");
        } finally {
            setLoading(false);
        }
    };

    if (!form) return <p>Yükleniyor...</p>;

    return (
        <PurchaseOrderForm
            mode="update"
            form={form}
            setForm={setForm}
            onSubmit={handleUpdate} // parametresiz
            loading={loading}
        />
    );
};
