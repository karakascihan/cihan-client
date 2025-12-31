import React, { useEffect, useState } from "react";
import { apiRequest } from "@/services";
import { URL } from "@/api";
import { ApiResponseClient } from "@/types/apiResponse";
import { PurchaseOrderDtoForInsertion } from "@/api/apiDtos";
import { PurchaseOrderForm } from "@/components/CRM/PurchaseOrderForm";

type Props = {
  initialOrder: PurchaseOrderDtoForInsertion;
  onClose: (result?: any) => void;
  onSuccess?: () => void | Promise<unknown>;
};

export const AddPurchaseOrderFromOfferPage = ({
  initialOrder,
  onClose,
  onSuccess,
}: Props) => {
  const [loading, setLoading] = useState(false);

  // ✅ initialOrder’ı state’e alıyoruz
  const [form, setForm] = useState<PurchaseOrderDtoForInsertion>(initialOrder);

  // ✅ initialOrder sonradan değişirse (modal reuse / farklı teklif) formu güncelle
  useEffect(() => {
    setForm(initialOrder);
  }, [initialOrder]);
  console.log("initial order:", initialOrder);

  // ✅ (opsiyonel) ürünler load olduktan sonra product_Id normalize (productId -> product_Id)
  useEffect(() => {
    const fixProductIds = async () => {
      try {
        const pRes = await apiRequest<ApiResponseClient<any[]>>(
          "GET",
          URL + "/products/getall"
        );
        const list = pRes.result ?? [];

        const validIds = new Set<number>(
          list.map((p) => Number((p as any).id)).filter((x) => !Number.isNaN(x))
        );

        setForm((prev) => ({
          ...prev,
          purchaseOrderLine: (prev.purchaseOrderLine ?? []).map((l: any) => {
            const pid = Number(l.product_Id ?? l.productId ?? 0);
            return {
              ...l,
              product_Id: validIds.has(pid) ? pid : 0,
            };
          }),
        }));
      } catch (e) {
        // sessiz geç
        console.error("fixProductIds error:", e);
      }
    };

    // sadece modal açılınca bir kere
    fixProductIds();
  }, []);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      // burada senin create endpointin neyse onu kullan:
      const res = await apiRequest<ApiResponseClient<any>>(
        "POST",
        URL + "/PurchaseOrder",
        form
      );

      if (res?.isSuccess === false) {
        console.error("Create order failed:", res);
        alert(res?.message ?? "Sipariş oluşturulamadı.");
        return;
      }

      await onSuccess?.();
      onClose(res);
    } catch (err) {
      console.error("Create order error:", err);
      alert("Sipariş oluşturulamadı.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PurchaseOrderForm
      mode="tekliftenDonusum"
      form={form}
      setForm={setForm}
      onSubmit={handleSubmit}
      loading={loading}
    />
  );
};
