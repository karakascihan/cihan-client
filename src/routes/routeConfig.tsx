import { JSX } from "react";
import * as Pages from "./pages";
import { SozlesmeTipi } from "@/api/apiDtos";

export type AppRoute = {
  path: string;
  element: JSX.Element;
  isPrivate?: boolean;
};

export const routes: AppRoute[] = [
  { path: "/", element: <Pages.CrmDashboard />, isPrivate: true },

  // Personel
  {
    path: "/personeller",
    element: <Pages.PersonList isModal={false} isActive={true} />,
    isPrivate: true,
  },

  // CRM
  { path: "/firsatlar", element: <Pages.OpportunityPage />, isPrivate: true },
  {
    path: "/firsatdetay/:id",
    element: <Pages.OpportunityPageDetail />,
    isPrivate: true,
  },
  { path: "/musteriler", element: <Pages.CustomerPage />, isPrivate: true },
  { path: "/teklifler", element: <Pages.PriceOfferPage />, isPrivate: true },
  {
    path: "/yeniteklif/:opportunityId?",
    element: (
      <Pages.PriceOfferAddPage offer={undefined}
      />
    ),
    isPrivate: true,
  },
  { path: "/sozlesmeler", element: <Pages.ContractPage />, isPrivate: true },
  { path: "/nda", element: <Pages.ContractPage sozlesmeTipi={SozlesmeTipi.NDA} />, isPrivate: true },
  { path: "/nda-en", element: <Pages.ContractPage sozlesmeTipi={SozlesmeTipi.NDA_EN} />, isPrivate: true },
  { path: "/siparisler", element: <Pages.PurchaseOrderPage />, isPrivate: true },
  {
    path: "/yenisiparis",
    element: <Pages.AddPurchaseOrderPage2 />,
    isPrivate: true,
  },
  {
    path: "/siparisiguncelle/:id",
    element: <Pages.UpdatePurchaseOrderPage />,
    isPrivate: true,
  },
  { path: "/takvim", element: <Pages.CalendarPage />, isPrivate: true },
  {
    path: "/aktiviteler",
    element: <Pages.ActivityPage title="Aktiviteler" />,
    isPrivate: true,
  },
  { path: "/kullanicilar", element: <Pages.UsersPage />, isPrivate: true },

  // Project
  { path: "/proje/:boardId?", element: <Pages.BoardView />, isPrivate: true },
  { path: "/projetakvimi", element: <Pages.BoardPage />, isPrivate: true },
  {
    path: "/projetakipraporlari",
    element: <Pages.ProjectReportList />,
    isPrivate: true,
  },

  // Document
  {
    path: "/FileUpload",
    element: <Pages.FileUpload folderId={1} />,
    isPrivate: true,
  },
  {
    path: "/kysdokumanlar/:type?",
    element: <Pages.DocumentList />,
    isPrivate: true,
  },
  {
    path: "/DocumentViewer",
    element: (
      <Pages.DocumentViewer
        fileUrl="https://localhost:44321/api/documents/download/1"
        onSave={(fileData: ArrayBuffer) =>
          console.log("File saved", fileData)
        }
      />
    ),
    isPrivate: true,
  },

  // Account
  {
    path: "/kasa-hesaplari",
    element: <Pages.CashAccountPage />,
    isPrivate: true,
  },
  {
    path: "/banka-hesaplari",
    element: <Pages.BankAccountPage />,
    isPrivate: true,
  },
    {
    path: "/muhasebe-fisleri",
    element: <Pages.AccounterVoucherPage />,
    isPrivate: true,
  },

  // Settings
  { path: "/sirketlerim", element: <Pages.EnterprisePage />, isPrivate: true },
  { path: "/ayarlar", element: <Pages.Settings />, isPrivate: true },

  // Auth
  { path: "/giris", element: <Pages.SignIn /> },

  //Product
  { path: "/urunler", element: <Pages.Product />, isPrivate: true },
];
