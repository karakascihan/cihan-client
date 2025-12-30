import {
    Company,
    CustomerDto,
    Products,
    PurchaseOrderDtoForInsertion,
    PurchaseOrderDtoForUpdate,
    PurchaseOrderLineDtoForInsertion,
    PurchaseOrderLineDtoForUpdate,
} from "@/api/apiDtos";
import { ApiResponseClient } from "@/types/apiResponse";
import React from "react";
import { apiRequest } from "@/services";
import { URL } from "@/api";

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
        setForm((prev) => ({ ...prev, [field]: value }));
    };

    console.log("FORM PROPS:", form);
    console.log("FORM PROPS tekil:", form?.siparisTarihi);

    type CompanyOption = { id: number; firmaAdi: string; yetkiliKisi: string };
    type ProductOption = { id: number; malzemeKodu: string; malzemeAdi: string };

    const [companies, setCompanies] = React.useState<CompanyOption[]>([]);
    const [products, setProducts] = React.useState<ProductOption[]>([]);

    React.useEffect(() => {
        const load = async () => {
            try {
                const [pRes, cRes] = await Promise.all([
                    apiRequest<ApiResponseClient<Products[]>>("GET", URL + "/products/getall"),
                    apiRequest<ApiResponseClient<CustomerDto[]>>("GET", URL + "/customer/getall"),
                ]);

                const productsList = pRes.result ?? [];
                const companiesList = cRes.result ?? [];

                console.log("Loaded products:", productsList);
                console.log("Loaded companies:", companiesList);

                setProducts(
                    productsList.map((p) => ({
                        id: (p as any).id,
                        malzemeKodu: (p as any).productCode,
                        malzemeAdi: (p as any).productName,
                    }))
                );

                setCompanies(
                    companiesList.map((c) => ({
                        id: (c as any).id,
                        firmaAdi: (c as any).firma,
                        yetkiliKisi: (c as any).yetkili,
                    }))
                );

                console.log("Loaded companies:", companiesList);
            } catch (err) {
                console.error("Lookup load error:", err);
                setProducts([]);
                setCompanies([]);
            }
        };

        load();
    }, []);

    //LINES
    type AnyLine = (PurchaseOrderLineDtoForInsertion | PurchaseOrderLineDtoForUpdate) & { __key?: string };

    const makeKey = () => `tmp-${Date.now()}-${Math.random().toString(16).slice(2)}`;

    const getLineKey = (line: AnyLine, _index: number) => {
        const id = (line as any).id;
        if (typeof id === "number" && id > 0) return `db-${id}`;

        // UI-only stable key
        if (!line.__key) line.__key = makeKey();
        return line.__key;
    };

    const lines = (form.purchaseOrderLine ?? []) as AnyLine[];

    const setLines = (updater: (prev: AnyLine[]) => AnyLine[]) => {
        setForm(
            (prev) =>
            ({
                ...prev,
                purchaseOrderLine: updater((((prev as any).purchaseOrderLine ?? []) as AnyLine[]) as AnyLine[]),
            } as T)
        );
    };

    const addLine = () => {
        setLines((prev) => [
            ...prev,
            {
                __key: makeKey(),
                ...(mode === "update" ? ({ id: 0 } as any) : {}), // update ekranında yeni satır: id=0
                product_Id: 0,
                malzemeKodu: "",
                malzemeAdi: "",
                miktar: undefined,
                birimi: "",
                birimFiyat: undefined,
                paraBirimi: "",
                teslimTarih: undefined,
                tamamTarihi: undefined,
                durumu: "",
                aciklama: "",
                stogaAktarildimi: false,
            } as AnyLine,
        ]);
    };

    const removeLine = (index: number) => {
        setLines((prev) => prev.filter((_, i) => i !== index));
    };

    const updateLine = <K extends keyof AnyLine>(index: number, field: K, value: AnyLine[K]) => {
        setLines((prev) => {
            const copy = [...prev];
            copy[index] = { ...copy[index], [field]: value };
            return copy;
        });
    };

    const onSelectCompany = (companyId: number) => {
        const c = companies.find((x) => x.id === companyId);
        if (!c) return;

        handleChange("firma_Id" as any, c.id);
        handleChange("firmaAdi" as any, c.firmaAdi);
        handleChange("yetkiliKisi" as any, c.yetkiliKisi);
    };

    const onSelectProduct = (lineIndex: number, product_Id: number) => {
        const p = products.find((x) => x.id === product_Id);
        if (!p) return;

        updateLine(lineIndex, "product_Id" as any, p.id as any);
        updateLine(lineIndex, "malzemeKodu", p.malzemeKodu as any);
        updateLine(lineIndex, "malzemeAdi", p.malzemeAdi as any);
    };

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
            className="max-w-2xl mx-auto p-6 bg-white shadow rounded"
        >
            <h1 className="text-2xl font-bold mb-4">{mode === "create" ? "Yeni Sipariş" : "Sipariş Güncelle"}</h1>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium">Firma Adı</label>
                    <select
                        className="w-full border p-2 rounded-md"
                        value={(form as any).firma_Id ?? ""}
                        onChange={(e) => onSelectCompany(Number(e.target.value))}
                    >
                        <option value="" disabled>Firma seçiniz...</option>

                        {companies.map((c) => (
                            <option key={c.id} value={c.id}>
                                {c.firmaAdi}
                            </option>
                        ))}
                    </select>
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
                    <input type="text" value={form.turu} onChange={(e) => handleChange("turu", e.target.value)} className="border p-1 rounded w-full" />
                </div>

                <div>
                    <label className="block text-sm font-medium">Durumu</label>
                    <input type="text" value={form.durumu} onChange={(e) => handleChange("durumu", e.target.value)} className="border p-1 rounded w-full" />
                </div>

                <div>
                    <label className="block text-sm font-medium">Sipariş Koşulları</label>
                    <textarea value={form.siparisKosullari} onChange={(e) => handleChange("siparisKosullari", e.target.value)} className="border p-2 rounded w-full" />
                </div>

                <div>
                    <label className="block text-sm font-medium">Kalite Koşulları</label>
                    <textarea value={form.kaliteKosullari} onChange={(e) => handleChange("kaliteKosullari", e.target.value)} className="border p-2 rounded w-full" />
                </div>

                <div>
                    <label className="block text-sm font-medium">Açıklama</label>
                    <textarea value={form.aciklama} onChange={(e) => handleChange("aciklama", e.target.value)} className="border p-2 rounded w-full" />
                </div>

                <div>
                    <label className="block text-sm font-medium">Onay Açıklaması</label>
                    <textarea value={form.onayAcikla} onChange={(e) => handleChange("onayAcikla", e.target.value)} className="border p-1 rounded w-full" />
                </div>
            </div>

            {/* PURCHASE ORDER LINE (DETAIL) */}
            <div className="mt-6">
                <div className="flex items-center justify-between mb-3">
                    <h2 className="text-lg font-semibold">Sipariş Kalemleri</h2>

                    <button type="button" onClick={addLine} className="px-3 py-1.5 rounded bg-gray-900 text-white text-sm">
                        + Kalem Ekle
                    </button>
                </div>

                {lines.length === 0 ? (
                    <div className="text-sm text-gray-500">Henüz kalem yok.</div>
                ) : (
                    <div className="space-y-3">
                        {lines.map((line, idx) => (
                            <div key={getLineKey(line, idx)} className="border rounded p-3">
                                <div className="grid grid-cols-3 gap-3">
                                    <div>
                                        <label className="block text-xs font-medium">Malzeme Kodu</label>
                                        <input
                                            value={line.malzemeKodu ?? ""}
                                            onChange={(e) => updateLine(idx, "malzemeKodu", e.target.value as any)}
                                            className="w-full border p-2 rounded"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium">Malzeme Adı</label>
                                        <select
                                            className="w-full border p-2 rounded-md"
                                            value={(line as any).product_Id ?? ""}
                                            onChange={(e) => onSelectProduct(idx, Number(e.target.value))}
                                        >
                                            <option value="" disabled>Ürün seçiniz...</option>

                                            {products.map((p) => (
                                                <option key={p.id} value={p.id}>
                                                    {p.malzemeAdi}
                                                </option>
                                            ))}
                                        </select>



                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium">Durumu</label>
                                        <input value={line.durumu ?? ""} onChange={(e) => updateLine(idx, "durumu", e.target.value as any)} className="w-full border p-2 rounded" />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium">Miktar</label>
                                        <input
                                            type="number"
                                            value={line.miktar ?? ""}
                                            onChange={(e) => updateLine(idx, "miktar", (e.target.value === "" ? undefined : Number(e.target.value)) as any)}
                                            className="w-full border p-2 rounded"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium">Birimi</label>
                                        <input value={line.birimi ?? ""} onChange={(e) => updateLine(idx, "birimi", e.target.value as any)} className="w-full border p-2 rounded" />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium">Birim Fiyat</label>
                                        <input
                                            type="number"
                                            value={line.birimFiyat ?? ""}
                                            onChange={(e) => updateLine(idx, "birimFiyat", (e.target.value === "" ? undefined : Number(e.target.value)) as any)}
                                            className="w-full border p-2 rounded"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium">Para Birimi</label>
                                        <input value={line.paraBirimi ?? ""} onChange={(e) => updateLine(idx, "paraBirimi", e.target.value as any)} className="w-full border p-2 rounded" />
                                    </div>

                                    <div className="col-span-2">
                                        <label className="block text-xs font-medium">Açıklama</label>
                                        <input value={line.aciklama ?? ""} onChange={(e) => updateLine(idx, "aciklama", e.target.value as any)} className="w-full border p-2 rounded" />
                                    </div>

                                    <div className="flex items-center gap-2 col-span-3">
                                        <input type="checkbox" checked={!!line.stogaAktarildimi} onChange={(e) => updateLine(idx, "stogaAktarildimi", e.target.checked as any)} />
                                        <span className="text-sm">Stoğa aktarıldı mı?</span>
                                    </div>
                                </div>

                                <div className="mt-3 flex justify-end">
                                    <button type="button" onClick={() => removeLine(idx)} className="px-3 py-1.5 rounded border border-red-300 text-red-700">
                                        Sil
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className="mt-4 flex justify-end">
                <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
                    {loading ? "Kaydediliyor..." : "Kaydet"}
                </button>
            </div>
        </form>
    );
};
