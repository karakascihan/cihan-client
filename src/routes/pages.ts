import { lazyWithPreload } from "../utils/lazyWithPreload";

// Dashboard
export const CrmDashboard = lazyWithPreload(
  () => import("../pages/crm/CrmDashboardPage")
);

// Personel
export const PersonList = lazyWithPreload(
  () => import("../pages/person/PersonList")
);
export const PersonelEducation = lazyWithPreload(
  () => import("../pages/person/PersonelEducation")
);

// CRM
export const OpportunityPage = lazyWithPreload(
  () => import("../pages/crm/OpportunityPage")
);
export const OpportunityPageDetail = lazyWithPreload(
  () => import("../pages/crm/OpportunityPageDetail")
);
export const CustomerPage = lazyWithPreload(
  () => import("../pages/crm/CustomerPage")
);
export const ActivityPage = lazyWithPreload(
  () => import("../pages/crm/ActivityPage")
);
export const PriceOfferPage = lazyWithPreload(
  () => import("../pages/crm/PriceOfferPage")
);
export const PriceOfferAddPage = lazyWithPreload(
  () => import("../pages/crm/PriceOfferAddPage")
);
export const CalendarPage = lazyWithPreload(
  () => import("../pages/crm/CalendarPage")
);
export const ContractPage = lazyWithPreload(
  () => import("../pages/crm/ContractPage")
);
export const PurchaseOrderPage = lazyWithPreload(
  () => import("../pages/crm/PurchaseOrderPage")
);
export const AddPurchaseOrderPage2 = lazyWithPreload(
  () => import("../pages/crm/AddPurchaseOrderPage2")
);
export const UpdatePurchaseOrderPage = lazyWithPreload(
  () => import("../pages/crm/UpdatePurchaseOrderPage")
);
export const UsersPage = lazyWithPreload(
  () => import("../pages/crm/UsersPage")
);

// Project
export const BoardView = lazyWithPreload(
  () => import("../components/board/BoardView")
);
export const BoardPage = lazyWithPreload(
  () => import("../pages/project/BoardPage")
);
export const ProjectReportList = lazyWithPreload(
  () => import("../pages/project/ProjectReport")
);

// Document
export const FileUpload = lazyWithPreload(
  () => import("../pages/documentManagement/FileUpload")
);
export const DocumentViewer = lazyWithPreload(
  () => import("../pages/documentManagement/DocumentViewer")
);
export const DocumentList = lazyWithPreload(
  () => import("../pages/kys-document/DocumentList")
);

// Product
export const Product = lazyWithPreload(
  () => import("../pages/product/Product")
);

// Account
export const CashAccountPage = lazyWithPreload(
  () => import("../pages/account/CashAccountPage")
);
export const BankAccountPage = lazyWithPreload(
  () => import("../pages/account/BankAccountPage")
);

// Settings
export const EnterprisePage = lazyWithPreload(
  () => import("../pages/setting/EnterprisePage")
);
export const Settings = lazyWithPreload(
  () => import("../pages/Settings")
);

// Auth
export const SignIn = lazyWithPreload(
  () => import("../pages/authentication/SignIn")
);
