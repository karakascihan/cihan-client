import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchOpportunities } from "@/store/slices/opportunitySlice";
import { OpportunityDto } from "@/api/apiDtos";
import { OpportunityStage } from "@/api/apiDtos";
import * as XLSX from "xlsx";
// import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import PageMeta from "@/components/common/PageMeta";
// import autoTable from "jspdf-autotable";
//import robotoNormal from "./fonts/Roboto-Regular-normal.js"; // base64 font

/*const doc = new jsPDF();
doc.addFileToVFS("Roboto-Regular.ttf", robotoNormal);
doc.addFont("Roboto-Regular.ttf", "Roboto", "normal");
doc.setFont("Roboto");*/


export default function CrmDashboard() {
  const dispatch = useDispatch<AppDispatch>();

  const opportunityState = useSelector((state: RootState) => state.opportunity);

  useEffect(() => {
    if (opportunityState.data.length === 0) {
      dispatch(fetchOpportunities());
    }
  }, []);

  const [activeTab, setActiveTab] = useState<"daily" | "monthly">("daily");
  //  Arama
  const [companySearch, setCompanySearch] = useState("");

  //  Min-Max Fiyat filtreleri
  const [minValue, setMinValue] = useState("");
  const [maxValue, setMaxValue] = useState("");

  //  Multi-select şirket filtresi
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);

  // Çoklu şirket seçme toggler
  const toggleCompanySelection = (name: string) => {
    setSelectedCompanies((prev) =>
      prev.includes(name)
        ? prev.filter((n) => n !== name)
        : [...prev, name]
    );
  };
  const getCompanyValueData = (opps: OpportunityDto[]) => {
    const map = new Map<string, number>();

    opps?.forEach((opp) => {
      if (opp.opportunityStage !== OpportunityStage.Won) return;
      if (!opp.customerName) return;

      const value = opp.value || 0;
      map.set(opp.customerName, (map.get(opp.customerName) || 0) + value);
    });

    return Array.from(map, ([name, totalValue]) => ({ name, totalValue }))
      .sort((a, b) => b.totalValue - a.totalValue);
  };

  const companyValueData = getCompanyValueData(opportunityState.data);
  const normalizeTurkish = (str) => {
    const map = {
      ç: "c",
      Ç: "C",
      ğ: "g",
      Ğ: "G",
      ı: "i",
      İ: "I",
      ö: "o",
      Ö: "O",
      ş: "s",
      Ş: "S",
      ü: "u",
      Ü: "U",
    };
    return str.replace(/[çÇğĞıİöÖşŞüÜ]/g, (m) => map[m]);
  };

  // Türkçe karakter normalize edici yardımcı fonksiyon
  const normalize = (str: string) =>
    str
      ?.toString()
      .toLowerCase()
      .trim()
      .replace(/ı/g, "i")
      .replace(/İ/g, "i")
      .replace(/ş/g, "s")
      .replace(/ğ/g, "g")
      .replace(/ç/g, "c")
      .replace(/ö/g, "o")
      .replace(/ü/g, "u");


  // 1) Arama filtresi
  let filtered = companyValueData.filter((item) =>
    item.name.toLowerCase().includes(companySearch.toLowerCase())
  );
  const filteredCompanyValueData = filtered;


  // 2) Min-Max tutar filtresi
  filtered = filtered.filter((item) => {
    const min = minValue ? parseFloat(minValue) : 0;
    const max = maxValue ? parseFloat(maxValue) : Number.MAX_SAFE_INTEGER;
    return item.totalValue >= min && item.totalValue <= max;
  });

  // 3) Multi-select devredeyse
  if (selectedCompanies.length > 0) {
    filtered = filtered.filter((item) => selectedCompanies.includes(item.name));
  }


  const getMonthlyChartData = (opportunities: OpportunityDto[]) => {

    const months = [
      "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"
    ];

    const results = months.map((m) => ({
      name: m,
      won: 0,
      lost: 0,
      progress: 0,
    }));

    opportunities.forEach((opp) => {
      const dateStr = opp.startDate || opp.expectedCloseDate;
      if (!dateStr) return;

      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return; // geçersiz tarihse atla

      const monthIndex = date.getMonth();

      switch (opp.opportunityStage) {
        case OpportunityStage.Won:
          results[monthIndex].won++;
          break;

        case OpportunityStage.Lost:
          results[monthIndex].lost++;
          break;

        default:
          results[monthIndex].progress++;
          break;
      }
    });

    return results;
  };

  const getDailyChartData = (opportunities: OpportunityDto[]) => {
    const map = new Map<
      string,
      { won: number; lost: number; progress: number }
    >();

    opportunities.forEach((opp) => {
      const dateStr = opp.startDate || opp.expectedCloseDate;
      if (!dateStr) return;

      const dateObj = new Date(dateStr);
      if (isNaN(dateObj.getTime())) return;

      const date = dateObj.toLocaleDateString("tr-TR");

      if (!map.has(date)) {
        map.set(date, { won: 0, lost: 0, progress: 0 });
      }

      const entry = map.get(date);

      switch (opp.opportunityStage) {
        case OpportunityStage.Won:
          entry!.won++;
          break;

        case OpportunityStage.Lost:
          entry!.lost++;
          break;

        default:
          entry!.progress++;
          break;
      }
    });

    return Array.from(map, ([date, values]) => ({
      date,
      ...values,
    })).sort((a, b) => {
      const [d1, m1, y1] = a.date.split(".").map(Number);
      const [d2, m2, y2] = b.date.split(".").map(Number);
      return new Date(y1, m1 - 1, d1).getTime() - new Date(y2, m2 - 1, d2).getTime();
    });
  };


  const monthlyData = getMonthlyChartData(opportunityState.data);
  const dailyData = getDailyChartData(opportunityState.data);
  const safeDailyData = dailyData.length === 0
    ? [{ date: "Veri Yok", won: 0, lost: 0, progress: 0 }]
    : dailyData;


  // TÜM FİLTRELER UYGULAMA

  let filteredCompanyValue = companyValueData
    .filter(item => normalize(item.name).includes(normalize(companySearch)))
    .filter(item => {
      const min = minValue ? parseFloat(minValue) : 0;
      const max = maxValue ? parseFloat(maxValue) : Number.MAX_SAFE_INTEGER;
      return item.totalValue >= min && item.totalValue <= max;
    })
    .filter(item => {
      if (selectedCompanies.length === 0) return true;
      return selectedCompanies
        .map(c => normalize(c))
        .includes(normalize(item.name));
    });


  if (selectedCompanies.length > 0) {
    filteredCompanyValue = filteredCompanyValue.filter((item) =>
      selectedCompanies.includes(item.name)
    );
  }
  /* const exportToExcel = () => {
     const worksheet = XLSX.utils.json_to_sheet(filteredCompanyValue);
     const workbook = XLSX.utils.book_new();
     XLSX.utils.book_append_sheet(workbook, worksheet, "Rapor");
 
     const excelBuffer = XLSX.write(workbook, {
       type: "array",
       bookType: "xlsx",
     });
 
     const blob = new Blob([excelBuffer], {
       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
     });
 
     saveAs(blob, `CRM_Rapor_${new Date().toLocaleDateString()}.xlsx`);
   };
 */

  /* const exportToPDF = () => {
     const doc = new jsPDF();
 
     doc.setFontSize(16);
     doc.text("CRM Raporu - Şirket Bazlı Sözleşme Tutarları", 14, 20);
 
     autoTable(doc, {
       startY: 30,
       head: [["Şirket", "Toplam Tutar"]],
       body: filteredCompanyValue.map((item) => [
         normalizeTurkish(item.name),
         item.totalValue.toLocaleString("tr-TR") + " ₺",
       ]),
       styles: { fontSize: 7 },
       headStyles: { fillColor: [0, 122, 255] },
     });
 
     doc.save(`CRM_Rapor_${new Date().toLocaleDateString()}.pdf`);
   };
 */

  return (
    <PageMeta title="CRM Dashboard" description="CRM Dashboard Sayfası">
    <div className="grid grid-cols-1 gap-6 p-6">
      {/* <div className="flex justify-end gap-3 mb-4">
        <button
          onClick={exportToExcel}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          Excel'e Aktar
        </button>

        <button
          onClick={exportToPDF}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
        >
          PDF Oluştur
        </button>
      </div>
*/}
      {/* 🔵 TAB PANEL (Günlük / Aylık) */}
      <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm">

        {/* TAB HEADER */}
        <div className="flex items-center justify-between mb-4">

          {/*  Tab Buttons  */}
          <div className="flex items-center gap-4 border-b pb-2">
            <button
              onClick={() => setActiveTab("daily")}
              className={`pb-2 px-2 border-b-2 transition-all ${activeTab === "daily"
                ? "border-blue-500 text-blue-600 font-semibold"
                : "border-transparent text-neutral-500 hover:text-neutral-700"
                }`}
            >
              Günlük Analiz
            </button>

            <button
              onClick={() => setActiveTab("monthly")}
              className={`pb-2 px-2 border-b-2 transition-all ${activeTab === "monthly"
                ? "border-blue-500 text-blue-600 font-semibold"
                : "border-transparent text-neutral-500 hover:text-neutral-700"
                }`}
            >
              Aylık Analiz
            </button>
          </div>

          {/* ---------------- Legend ---------------- */}
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              <span className="text-neutral-700 dark:text-neutral-300">Sipariş</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-red-500"></span>
              <span className="text-neutral-700 dark:text-neutral-300">Kayıp</span>
            </div>

            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-full bg-sky-500"></span>
              <span className="text-neutral-700 dark:text-neutral-300">Süreçte</span>
            </div>
          </div>
        </div>

        {/* TAB CONTENT */}


        {/* Günlük Grafik */}
        {activeTab === "daily" && (
          <div className="w-full" style={{ height: 420 }}>
            {dailyData.length === 0 && (
              <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                <div className="px-4 py-2 rounded-lg bg-pink-100 text-pink-700 text-xs font-medium shadow-sm border border-pink-200 items-center">
                  📉 Günlük analiz verisi bulunamadı
                </div>
              </div>
            )}
            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={safeDailyData}   >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" interval={0} textAnchor="end" />
                <YAxis width={75} />
                <Tooltip />
                <Line type="monotone" dataKey="won" stroke="#22c55e" strokeWidth={2} />
                <Line type="monotone" dataKey="lost" stroke="#ef4444" strokeWidth={2} />
                <Line type="monotone" dataKey="progress" stroke="#0ea5e9" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Aylık Grafik */}
        {activeTab === "monthly" && (
          <div className="w-full" style={{ height: 420 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}   >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" interval={0} textAnchor="end" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="won" fill="#22c55e" minPointSize={3} />
                <Bar dataKey="lost" fill="#ef4444" minPointSize={3} />
                <Bar dataKey="progress" fill="#0ea5e9" minPointSize={3} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}

      </div>

      {/* ŞİRKET BAZLI KIYAS */}

      <div className="bg-white dark:bg-neutral-900 p-5 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-sm pr-4" style={{ maxHeight: 450, overflowY: 'auto' }}>
        <h3 className="text-lg font-semibold text-neutral-800 dark:text-neutral-100 mb-4">
          Şirket Bazlı Toplam Sözleşme Tutarı
        </h3>

        {/* Filtreler */}
        <div className="flex flex-wrap gap-4 mb-5">
          {/* Arama */}
          <input
            type="text"
            placeholder="Şirket Ara..."
            value={companySearch}
            onChange={(e) => setCompanySearch(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 w-48"
          />

          {/* Min Tutar */}
          <input
            type="number"
            placeholder="Min Tutar"
            value={minValue}
            onChange={(e) => setMinValue(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 w-32"
          />

          {/* Max Tutar */}
          <input
            type="number"
            placeholder="Max Tutar"
            value={maxValue}
            onChange={(e) => setMaxValue(e.target.value)}
            className="px-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-800 w-32"
          />

          {/* Multi-select şirket chipleri */}
          <div className="flex flex-wrap gap-2 max-h-28 overflow-auto">
            {companyValueData.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={() => toggleCompanySelection(c.name)}
                className={`px-3 py-1 text-xs rounded-full border transition-all ${selectedCompanies.includes(c.name)
                  ? "bg-pink-200 text-white border-pink-300"
                  : "bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 border-neutral-300 dark:border-neutral-700"
                  }`}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>

        {/* Grafik */}
        <div className="w-full" style={{ height: 450 }} >
          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={filteredCompanyValue} layout="vertical" margin={{ left: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <YAxis
                dataKey="name"
                type="category"
                width={140}
                className="text-xs"
                tick={{ fontSize: 12 }}
              />
              <XAxis
                type="number"
                tickFormatter={(v) =>
                  Number(v).toLocaleString("tr-TR") + " ₺"
                }
              />
              <Tooltip
                formatter={(v) =>
                  Number(v).toLocaleString("tr-TR") + " ₺"
                }
              />
              <Bar
                dataKey="totalValue"
                fill="#0ea5e9"
                radius={[0, 6, 6, 0]}
                name="Toplam Sözleşme Tutarı"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {filteredCompanyValue.length === 0 && (
          <p className="text-center text-neutral-500 mt-4">
            Filtrelere göre sonuç bulunamadı.
          </p>
        )}
      </div>
    </div>
    </PageMeta>
  );
}