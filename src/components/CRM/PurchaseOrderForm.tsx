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

type Mode = "create" | "update" | "tekliftenDonusum";

type Props<T> = {
    mode: Mode;
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
    type ProductOption = { id: number; malzemeKodu: string; malzemeAdi: string; birim?: string; birimFiyat?: number; paraBirimi?: string };

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
                        birim: (p as any).olcuBirimi,
                        miktar: (p as any).stokMiktar,
                        birimFiyat: (p as any).birimFiyat,
                        paraBirimi: (p as any).paraBirimi,
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
                ...(mode === "update" ? ({ id: 0 } as any) : {}),
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
        updateLine(lineIndex, "birimi", p.birim as any);
        updateLine(lineIndex, "birimFiyat", p.birimFiyat as any);
        updateLine(lineIndex, "paraBirimi", p.paraBirimi as any);
    };

    const getFallbackValue = (line: any) =>
        line?.malzemeKodu
            ? `offer-code:${String(line.malzemeKodu).trim()}`
            : `offer-name:${String(line?.malzemeAdi ?? "").trim()}`;



    //hesaplama çalışması


    const toNum = (v: any) => {
        const n = Number(v);
        return Number.isFinite(n) ? n : 0;
    };

    const clamp = (n: number, min: number, max: number) => Math.max(min, Math.min(max, n));

    const calc = React.useMemo(() => {
        const ls = (lines ?? []);

        const computedLines = ls.map((l) => {
            const qty = toNum((l as any).miktar);
            const unit = toNum((l as any).birimFiyat);

            const discPct = clamp(toNum((l as any).indirimOraniYuzde), 0, 100);
            const kdvPct = clamp(toNum((l as any).kdvOraniYuzde), 0, 100);

            const base = qty * unit;                          //indirimsiz, kdvsiz
            const discountAmount = base * (discPct / 100);     //indirim tutarı
            const afterDiscount = base - discountAmount;       //indirimli tutar (kdvsiz)

            const kdvAmount = afterDiscount * (kdvPct / 100);  //KDV tutarı (indirim sonrası)
            const lineTotal = afterDiscount + kdvAmount;       //KDV dahil satır toplamı

            return {
                key: getLineKey(l as any, 0), // key sadece debug için; UI zaten getLineKey kullanıyor
                base,
                discountAmount,
                afterDiscount,
                kdvAmount,
                lineTotal,
            };
        });

        const subtotal = computedLines.reduce((s, x) => s + x.base, 0);
        const lineDiscountTotal = computedLines.reduce((s, x) => s + x.discountAmount, 0);
        const afterLineDiscount = computedLines.reduce((s, x) => s + x.afterDiscount, 0);
        const tax = computedLines.reduce((s, x) => s + x.kdvAmount, 0);
        const afterLineDiscountWithTax = computedLines.reduce((s, x) => s + x.lineTotal, 0);

        const masterDiscPct = clamp(toNum((form as any).toplamIndirimOraniYuzde), 0, 100);
        const masterDiscountAmount = afterLineDiscountWithTax * (masterDiscPct / 100);



        const total = afterLineDiscountWithTax - masterDiscountAmount;

        return {
            lines: computedLines,
            subtotal,
            lineDiscountTotal,
            afterLineDiscount,
            masterDiscPct,
            masterDiscountAmount,
            tax,
            afterLineDiscountWithTax,
            total,
        };
    }, [lines, (form as any).toplamIndirimOraniYuzde]);

    React.useEffect(() => {
        handleChange("toplamTutar" as any, calc.total);
    }, [calc.total]);


    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
            }}
            className="p-6 bg-white shadow rounded"
        >
            <div className="max-w-8xl mx-auto">
                <div className="relative flex items-center mb-4 bg-gray-100 border rounded px-4 h-14">
                    <h1 className="absolute left-1/2 -translate-x-1/2 text-lg text-gray-700 font-bold">
                        {mode === "create"
                            ? "Yeni Sipariş"
                            : mode === "update"
                                ? "Sipariş Güncelle"
                                : "Tekliften Sipariş Oluştur"}
                    </h1>


                </div>


                {/* MASTER */}
                <div className="w-full border rounded bg-gray-50 p-4">
                    <div className="grid grid-cols-12 gap-3">
                        {/* Firma */}
                        <div className="col-span-12 md:col-span-6">
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Firma Adı</label>
                            <select
                                className="w-full border p-2 rounded-md bg-white"
                                value={(form as any).firma_Id ?? ""}
                                onChange={(e) => onSelectCompany(Number(e.target.value))}
                            >
                                <option value="" disabled>
                                    Firma seçiniz...
                                </option>
                                {companies.map((c) => (
                                    <option key={c.id} value={c.id}>
                                        {c.firmaAdi}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Yetkili */}
                        <div className="col-span-12 md:col-span-6">
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Yetkili Kişi</label>
                            <input
                                type="text"
                                value={form.yetkiliKisi}
                                onChange={(e) => handleChange("yetkiliKisi", e.target.value)}
                                className="w-full border p-2 rounded-md bg-white"
                            />
                        </div>

                        {/* Sipariş Tarihi */}
                        <div className="col-span-12 md:col-span-4">
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Sipariş Tarihi</label>
                            <input
                                type="date"
                                value={form.siparisTarihi ? form.siparisTarihi.toString() : ""}
                                onChange={(e) => handleChange("siparisTarihi", e.target.value)}
                                className="w-full border p-2 rounded-md bg-white"
                            />
                        </div>

                        {/* Teslim Tarihi */}
                        <div className="col-span-12 md:col-span-4">
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Teslim Tarihi</label>
                            <input
                                type="date"
                                value={form.teslimTarihi ? form.teslimTarihi.toString() : ""}
                                onChange={(e) => handleChange("teslimTarihi", e.target.value)}
                                className="w-full border p-2 rounded-md bg-white"
                            />
                        </div>

                        {/* Durumu */}
                        <div className="col-span-12 md:col-span-4">
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Durumu</label>

                            <select
                                value={form.durumu ?? ""}
                                onChange={(e) => handleChange("durumu", e.target.value)}
                                className="w-full border p-2 rounded-md bg-white"
                            >
                                <option value="" disabled>Seçiniz...</option>
                                <option value="planlandi">Planlandı</option>
                                <option value="onaylandi">Onaylandı</option>
                                <option value="stokgiris">Stok Girişi Yapıldı</option>
                                <option value="iade">İade Sipariş</option>
                            </select>
                        </div>

                        {/* Sipariş Koşulları */}
                        <div className="col-span-12 md:col-span-6">
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Sipariş Koşulları</label>
                            <textarea
                                value={form.siparisKosullari}
                                onChange={(e) => handleChange("siparisKosullari", e.target.value)}
                                className="w-full border p-2 rounded-md bg-white"
                                rows={2}
                            />
                        </div>

                        {/* Kalite Koşulları */}
                        <div className="col-span-12 md:col-span-6">
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Kalite Koşulları</label>
                            <textarea
                                value={form.kaliteKosullari}
                                onChange={(e) => handleChange("kaliteKosullari", e.target.value)}
                                className="w-full border p-2 rounded-md bg-white"
                                rows={2}
                            />
                        </div>

                        {/* Açıklama */}
                        <div className="col-span-12 md:col-span-6">
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Açıklama</label>
                            <textarea
                                value={form.aciklama}
                                onChange={(e) => handleChange("aciklama", e.target.value)}
                                className="w-full border p-2 rounded-md bg-white"
                                rows={2}
                            />
                        </div>

                        {/* Onay Açıklaması */}
                        <div className="col-span-12 md:col-span-6">
                            <label className="block text-xs font-semibold text-gray-600 mb-1">Onay Açıklaması</label>
                            <textarea
                                value={form.onayAcikla}
                                onChange={(e) => handleChange("onayAcikla", e.target.value)}
                                className="w-full border p-2 rounded-md bg-white"
                                rows={2}
                            />
                        </div>
                    </div>
                </div>


                {/* PURCHASE ORDER LINE (DETAIL) */}
                <div className="mt-6">
                    <div className="flex items-center justify-between mb-3">
                        <h2 className="text-lg font-semibold">Sipariş Kalemleri</h2>

                        <div className="flex gap-2">
                            <button
                                type="button"
                                onClick={addLine}
                                className="px-3 py-1.5 rounded bg-gray-900 text-white text-sm"
                            >
                                + Kalem Ekle
                            </button>

                            {/* <button type="button" onClick={...} className="px-3 py-1.5 rounded bg-green-600 text-white text-sm">
        Ürünlerden Ekle
      </button> */}
                        </div>
                    </div>

                    {lines.length === 0 ? (
                        <div className="text-sm text-gray-500">Henüz kalem yok.</div>
                    ) : (
                        <div className="w-full overflow-x-auto">
                            <table className="w-full border-collapse border table-fixed">
                                <colgroup>

                                    <col style={{ width: "240px" }} />
                                    <col style={{ width: "80px" }} />
                                    <col style={{ width: "80px" }} />
                                    <col style={{ width: "80px" }} />
                                    <col style={{ width: "80px" }} />
                                    <col style={{ width: "80px" }} />
                                    <col style={{ width: "70px" }} />
                                    <col style={{ width: "70px" }} />
                                    <col style={{ width: "160px" }} />
                                    <col style={{ width: "160px" }} />
                                    <col style={{ width: "160px" }} />
                                    <col style={{ width: "70px" }} />

                                </colgroup>
                                <thead className="bg-gray-100">
                                    <tr>
                                        <th className="border p-2 w-[240px]">Malzeme Adı</th>
                                        <th className="border p-2 w-[140px]">Malzeme Kodu</th>
                                        <th className="border p-2 w-[90px]">Birim</th>
                                        <th className="border p-2 w-[120px]">Birim Fiyat</th>
                                        <th className="border p-2 w-[90px]">Para Birimi</th>
                                        <th className="border p-2 w-[90px]">Miktar</th>

                                        <th className="border p-2 w-[220px]">İndirim Oranı Yüzdesi</th>
                                        <th className="border p-2 w-[220px]">KDV Oranı Yüzdesi</th>


                                        <th className="border p-2 w-[200px]">Toplam Tutar (İndirim + KDV)</th>
                                        <th className="border p-2 w-[160px]">Durumu</th>
                                        <th className="border p-2 w-[220px]">Açıklama</th>
                                        <th className="border p-2 w-[120px]">Stoğa Aktarıldı Mı?</th>
                                        <th className="border p-2 w-[90px]">İşlem</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {lines.map((line, idx) => (
                                        <tr key={getLineKey(line, idx)} className="align-top">
                                            <td className="border p-2">
                                                {/* Malzeme adı - ürün seçimi dropdown */}
                                                <select
                                                    className="w-full border rounded p-1"
                                                    value={
                                                        Number((line as any).product_Id) > 0
                                                            ? String((line as any).product_Id)
                                                            : getFallbackValue(line)
                                                    }
                                                    onChange={(e) => {
                                                        const v = e.target.value;

                                                        if (v.startsWith("offer-code:") || v.startsWith("offer-name:")) return;

                                                        onSelectProduct(idx, Number(v));
                                                    }}
                                                >
                                                    {Number((line as any).product_Id) <= 0 && (
                                                        <option value={getFallbackValue(line)}>
                                                            {line.malzemeAdi ?? "Teklif Kalemi"} {line.malzemeKodu ? `(${line.malzemeKodu})` : ""} Seçiniz...
                                                        </option>
                                                    )}

                                                    <option value="" disabled>Ürün seçiniz...</option>

                                                    {products.map((p) => (
                                                        <option key={p.id} value={String(p.id)}>
                                                            {p.malzemeAdi}
                                                        </option>
                                                    ))}
                                                </select>

                                            </td>
                                            <td className="border p-2 align-middle">
                                                <input
                                                    value={line.malzemeKodu ?? ""}
                                                    onChange={(e) => updateLine(idx, "malzemeKodu", e.target.value as any)}
                                                    className="w-full border rounded p-1"
                                                />
                                            </td>

                                            <td className="border p-2 align-middle">
                                                <input
                                                    value={line.birimi ?? ""}
                                                    onChange={(e) => updateLine(idx, "birimi", e.target.value as any)}
                                                    className="w-full border rounded p-1"
                                                />
                                            </td>

                                            <td className="border p-2 align-middle">
                                                <input
                                                    type="number"
                                                    value={line.birimFiyat ?? ""}
                                                    onChange={(e) =>
                                                        updateLine(idx, "birimFiyat", (e.target.value === "" ? undefined : Number(e.target.value)) as any)
                                                    }
                                                    className="w-full border rounded p-1"
                                                />
                                            </td>

                                            <td className="border p-2 align-middle">
                                                <input
                                                    value={line.paraBirimi ?? ""}
                                                    onChange={(e) => updateLine(idx, "paraBirimi", e.target.value as any)}
                                                    className="w-full border rounded p-1"
                                                />
                                            </td>
                                            <td className="border p-2 align-middle">
                                                <input
                                                    type="number"
                                                    value={line.miktar ?? ""}
                                                    onChange={(e) =>
                                                        updateLine(idx, "miktar", (e.target.value === "" ? undefined : Number(e.target.value)) as any)
                                                    }
                                                    className="w-full border rounded p-1"
                                                />
                                            </td>


                                            <td className="border p-1 w-[70px] align-middle">
                                                <input
                                                    type="number"
                                                    value={line.indirimOraniYuzde ?? ""}
                                                    onChange={(e) =>
                                                        updateLine(idx, "indirimOraniYuzde", (e.target.value === "" ? undefined : Number(e.target.value)) as any)
                                                    }
                                                    className="w-full border rounded px-1 py-0.5 text-center text-sm align-middle"
                                                />
                                            </td>
                                            <td className="border p-1 w-[40px] align-middle">
                                                <input
                                                    type="number"
                                                    value={line.kdvOraniYuzde ?? ""}
                                                    onChange={(e) =>
                                                        updateLine(idx, "kdvOraniYuzde", (e.target.value === "" ? undefined : Number(e.target.value)) as any)
                                                    }
                                                    className="w-full border rounded px-1 py-0.5 text-center text-sm align-middle"
                                                />
                                            </td>


                                            <td className="border p-2 text-center font-semibold">
                                                {calc.lines[idx]?.lineTotal?.toLocaleString() ?? "0"}
                                            </td>

                                            <td className="border p-2">
                                                <input
                                                    value={line.durumu ?? ""}
                                                    onChange={(e) => updateLine(idx, "durumu", e.target.value as any)}
                                                    className="w-full border rounded p-1"
                                                />
                                            </td>

                                            <td className="border p-2">
                                                <input
                                                    value={line.aciklama ?? ""}
                                                    onChange={(e) => updateLine(idx, "aciklama", e.target.value as any)}
                                                    className="w-full border rounded p-1"
                                                />
                                            </td>
                                            <td className="border p-2 align-middle">
                                                <div className="flex items-center justify-center">
                                                    <input
                                                        type="checkbox"
                                                        checked={!!line.stogaAktarildimi}
                                                        onChange={(e) => updateLine(idx, "stogaAktarildimi", e.target.checked as any)}
                                                    />
                                                </div>
                                            </td>

                                            <td className="border p-2 text-center ">
                                                <button
                                                    type="button"
                                                    onClick={() => removeLine(idx)}
                                                    className="px-2 py-1 rounded border border-red-300 text-red-700 hover:bg-red-50"
                                                >
                                                    Sil
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot>

                                    {/* Ara Toplam (Kalem indirimi + KDV) */}
                                    <tr className="bg-gray-50">
                                        <td colSpan={10} className="text-right p-2 text-sm font-semibold text-gray-600">
                                            Ara Toplam (Kalem İndirimi + KDV)
                                        </td>
                                        <td colSpan={3} className="text-right p-2 font-bold">
                                            {calc.afterLineDiscountWithTax.toLocaleString()}
                                        </td>
                                    </tr>

                                    {/* Toplam İndirim Oranı (%) */}
                                    <tr className="bg-gray-50">
                                        <td colSpan={10} className="text-right p-2 text-sm font-semibold text-gray-600">
                                            Toplam İndirim Oranı (%)
                                        </td>
                                        <td colSpan={3} className="text-right p-2">
                                            <input
                                                type="number"
                                                value={form.toplamIndirimOraniYuzde ?? 0}
                                                onChange={(e) =>
                                                    handleChange(
                                                        "toplamIndirimOraniYuzde" as any,
                                                        e.target.value === "" ? 0 : Number(e.target.value)
                                                    )
                                                }
                                                className="w-20 border rounded px-2 py-1 text-right text-sm bg-white"
                                            />
                                        </td>
                                    </tr>

                                    {/* Genel İndirim Tutarı */}
                                    <tr className="bg-gray-50">
                                        <td colSpan={10} className="text-right p-2 text-sm font-semibold">
                                            Genel İndirim ({Number(form.toplamIndirimOraniYuzde ?? 0)}%)
                                        </td>
                                        <td colSpan={3} className="text-right p-2 font-bold">
                                            {calc.masterDiscountAmount.toLocaleString()}
                                        </td>
                                    </tr>

                                    {/* Genel Toplam */}
                                    <tr className="border-t bg-gray-100">
                                        <td colSpan={10} className="text-right p-3 text-base font-bold">
                                            GENEL TOPLAM
                                        </td>
                                        <td colSpan={3} className="text-right p-3">
                                            <input
                                                type="number"
                                                readOnly
                                                value={form.toplamTutar ?? 0}
                                                className="w-40 border-2 border-red-200 bg-red-50 px-2 py-1 rounded text-right font-bold text-red-700"
                                            />
                                        </td>
                                    </tr>

                                </tfoot>


                            </table>

                        </div>

                    )}

                </div>

            </div>

            <div className="mt-4 flex justify-end">
                <button type="submit" disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
                    {loading ? "Kaydediliyor..." : "Kaydet"}
                </button>
            </div>
        </form>
    );
};
