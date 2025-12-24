import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "@/services";
import { URL } from "@/api";
import { PurchaseOrderDtoForInsertion, PurchaseOrderLineDtoForInsertion } from "@/api/apiDtos";

export const AddPurchaseOrderPage = () => {
    const navigate = useNavigate();

    const [form, setForm] = useState<{
        firmaAdi: string;
        yetkiliKisi: string;
        siparisTarihi: string;
        teslimTarihi: string;
        aciklama: string;
        durumu: string;
        onayAcikla: string;
        siparisKosullari: string;
        kaliteKosullari: string;
        siparisTipi: string;
        turu: string;
        purchaseOrderLine: PurchaseOrderLineDtoForInsertion[];
    }>({
        firmaAdi: "",
        yetkiliKisi: "",
        siparisTarihi: "",
        teslimTarihi: "",
        aciklama: "",
        durumu: "",
        onayAcikla: "",
        siparisKosullari: "",
        kaliteKosullari: "",
        siparisTipi: "",
        turu: "",
        purchaseOrderLine: [],
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (field: keyof typeof form, value: any) => {
        setForm(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const payload: PurchaseOrderDtoForInsertion = {
                ...form,
                siparisTarihi: form.siparisTarihi as any,
                teslimTarihi: form.teslimTarihi as any,
            };

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
        <div className="p-4 max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="max-w-8xl mx-auto p-6 bg-white shadow rounded">
                <div className="flex justify-center bg-gray-300 mb-3 text-gray-600">
                    <h1 className="text-2xl font-bold mb-2 p-1">Yeni Sipariş</h1>
                </div>

                <div className="flex flex-col justify-center gap-2">
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Firma Adı</label>
                            <input
                                type="text"
                                value={form.firmaAdi}
                                onChange={(e) => handleChange("firmaAdi", e.target.value)}
                                className="w-full border p-2 rounded-md" 
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Yetkili Kişi</label>
                            <input
                                type="text"
                                value={form.yetkiliKisi}
                                onChange={(e) => handleChange("yetkiliKisi", e.target.value)}
                                className="w-full border p-2 rounded-md" />

                        </div>

                        <div>
                            <label className="block text-sm font-medium">Sipariş Tarihi</label>
                            <input
                                type="date"
                                value={form.siparisTarihi}
                                onChange={(e) => handleChange("siparisTarihi", e.target.value)}
                                className="w-full border p-2 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Teslim Tarihi</label>
                            <input
                                type="date"
                                value={form.teslimTarihi}
                                onChange={(e) => handleChange("teslimTarihi", e.target.value)}
                                className="w-full border p-2 rounded-md"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Sipariş Tipi</label>
                            <input
                                type="text"
                                value={form.siparisTipi}
                                onChange={(e) => handleChange("siparisTipi", e.target.value)}
                                className="border p-1 rounded w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Türü</label>
                            <input
                                type="text"
                                value={form.turu}
                                onChange={(e) => handleChange("turu", e.target.value)}
                                className="border p-1 rounded w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Durumu</label>
                            <input
                                type="text"
                                value={form.durumu}
                                onChange={(e) => handleChange("durumu", e.target.value)}
                                className="border p-1 rounded w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Sipariş Koşulları</label>
                            <textarea
                                value={form.siparisKosullari}
                                onChange={(e) => handleChange("siparisKosullari", e.target.value)}
                                className="border p-2 rounded w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Kalite Koşulları</label>
                            <textarea
                                value={form.kaliteKosullari}
                                onChange={(e) => handleChange("kaliteKosullari", e.target.value)}
                                className="border p-2 rounded w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Açıklama</label>
                            <textarea
                                value={form.aciklama}
                                onChange={(e) => handleChange("aciklama", e.target.value)}
                                className="border p-2 rounded w-full"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Onay Açıklaması</label>
                            <textarea
                                value={form.onayAcikla}
                                onChange={(e) => handleChange("onayAcikla", e.target.value)}
                                className="border p-1 rounded w-full"
                            />
                        </div>
                       
                        <div className="mt-4 flex justify-end gap-2">
                            <button
                            type="submit" 
                            className="px-3 py-1 bg-blue-600 text-white rounded"
                            disabled={loading}>
                                {loading ? "Kaydediliyor..." : "Kaydet"}
                            </button>

                        </div>
                    </div>
                </div>
            </form>
        </div>

    );

};

