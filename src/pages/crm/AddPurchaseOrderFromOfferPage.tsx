import React, { useEffect, useState } from "react";
import { apiRequest } from "@/services";
import { URL } from "@/api";
import { ApiResponseClient } from "@/types/apiResponse";
import { DateOnly, PurchaseOrderDtoForInsertion } from "@/api/apiDtos";
import { PurchaseOrderForm } from "@/components/crm/PurchaseOrderForm";

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

    const [form, setForm] = useState<PurchaseOrderDtoForInsertion>(initialOrder);

    useEffect(() => {
        setForm(initialOrder);
    }, [initialOrder]);
    console.log("initial order:", initialOrder);

    useEffect(() => {
        const fixProductIds = async () => {
            try {
                const pRes = await apiRequest<ApiResponseClient<any[]>>(
                    "GET",
                    URL + "/products/getall"
                );
                const list = pRes.result ?? [];

                const norm = (v: any) => String(v ?? "").trim().toLowerCase();

                setForm((prev) => ({
                    ...prev,
                    purchaseOrderLine: (prev.purchaseOrderLine ?? []).map((l: any) => {
                        const existing = Number(l.product_Id ?? 0);
                        if (existing > 0) return l;

                        const code = norm(l.malzemeKodu);
                        const name = norm(l.malzemeAdi);

                        const match =
                            list.find((p: any) => norm(p.productCode) === code) ||
                            list.find((p: any) => norm(p.productName) === name);

                        return {
                            ...l,
                            product_Id: match ? Number(match.id) : 0,
                        };
                    }),
                }));
            } catch (e) {
                console.error("fixProductIds error:", e);
            }
        };

        fixProductIds();
    }, []);

    const handleSubmit = async () => {
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
            purchaseOrderLine: form.purchaseOrderLine ?? [], // boş bile olsa
          };
      
          console.log("GİDEN PAYLOAD:", payload);
      
          const res = await apiRequest<any>("POST", URL + "/PurchaseOrder/Create", payload);
      
          alert("Sipariş başarıyla eklendi!");
      
          await onSuccess?.();
          onClose(res);
        } catch (err) {
          console.error(err);
          alert("Sipariş oluşturulamadı!");
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
