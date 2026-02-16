import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, use } from "react";
import { apiRequest } from "@/services";
import { URL } from "@/api";
import { PurchaseOrderForm } from "@/components/crm/PurchaseOrderForm";
import { PurchaseOrderDtoForUpdate } from "@/api/apiDtos";
import { ApiResponseClient } from "@/types/apiResponse";


type Props = {
    id?: number;                 // modalda id buradan gelecek
    onClose?: () => void;
    onSuccess?: () => void | Promise<unknown>;
};

const emptyForm: PurchaseOrderDtoForUpdate = {
    id: 0,
    firma_Id: null,
    priceOfferId: null,
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
    toplamIndirimOraniYuzde: 0,
    toplamTutar: 0,
    purchaseOrderLine: [],
};


 const UpdatePurchaseOrderPage = ({ id: propId, onClose, onSuccess }: Props) => {
    const { id: routeId } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const id = propId ?? (routeId ? Number(routeId) : null);
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState<PurchaseOrderDtoForUpdate>(emptyForm);
    console.log(
        "[PurchaseOrder]",
        "OPEN MODE:",
        onClose ? "MODAL" : "PAGE"
      );
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
                console.log("ESMAAAAAAAAAAAAAAAAAAAAAAAAAAAAA:", dto?.purchaseOrderLine);
                console.log("LINE KEYS:", dto?.purchaseOrderLine?.[0] && Object.keys(dto.purchaseOrderLine[0] as any));
                console.log("LINE RAW:", dto?.purchaseOrderLine?.[0]);

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


    const handleUpdate = async (currentForm: PurchaseOrderDtoForUpdate) => {
        if (!currentForm || !id) return;
        setLoading(true);
        try {
            const payload: PurchaseOrderDtoForUpdate = {
                ...currentForm,
                siparisTarihi: currentForm.siparisTarihi ?? null,
                teslimTarihi: currentForm.teslimTarihi ?? null,
                firma_Id: currentForm.firma_Id ?? null,
            };

            await apiRequest("PUT", URL + `/PurchaseOrder/Update/${id}`, payload);
            alert("Sipariş başarıyla güncellendi!");

            // MODAL varsa: refetch + close
            if (onSuccess) await onSuccess();
            if (onClose) return onClose();

            // Sayfa olarak kullanılıyorsa: navigate
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
            onSubmit={handleUpdate}
            loading={loading}
        />
    );
};
export default UpdatePurchaseOrderPage;
