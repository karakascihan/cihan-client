import { PurchaseOrderDtoForInsertion, PurchaseOrderDtoForUpdate } from "@/api/apiDtos";

type Props<T> = {
    mode: "create" | "update";
    form: T;
    setForm: React.Dispatch<React.SetStateAction<T>>;
    onSubmit: () => void;
    loading: boolean;
};

export const PurchaseOrderForm = <T extends PurchaseOrderDtoForInsertion | PurchaseOrderDtoForUpdate>({
    mode,
    form,
    setForm,
    onSubmit,
    loading,
}: Props<T>) => { 

const handleChange = <K extends keyof T>(field: K, value: any) => {
    setForm(prev => ({ ...prev, [field]: value }));
};
console.log("FORM PROPS:", form);

console.log("FORM PROPS tekil:", form?.siparisTarihi);

return (
    <form onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
    }} className="max-w-2xl mx-auto p-6 bg-white shadow rounded">
        <h1 className="text-2xl font-bold mb-4">
            {mode === "create" ? "Yeni Sipariş" : "Sipariş Güncelle"}
        </h1>

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
                    className="w-full border p-2 rounded-md"
                />
            </div>
            <div>
                <label className="block text-sm font-medium">Sipariş Tarihi</label>
                <input
                    type="date"
                    value={form.siparisTarihi ? form.siparisTarihi.toString() : ""}
                    onChange={(e) => handleChange("siparisTarihi", e.target.value)}
                    className="w-full border p-2 rounded-md"

                />
            </div>
            <div>
                <label className="block text-sm font-medium">Teslim Tarihi</label>
                <input
                    type="date"
                    value={form.teslimTarihi ? form.teslimTarihi.toString() : ""}
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

        </div>

        <div className="mt-4 flex justify-end">
            <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded"
            >
                {loading ? "Kaydediliyor..." : "Kaydet"}
            </button>
        </div>
    </form>
);
};
