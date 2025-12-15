import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { JSX, Suspense, lazy } from "react";
import { useSelector } from "react-redux";

import { AuthProvider } from "./context/AuthContext";
import { UIProvider } from "./context/UIContext";
import { ModalProvider } from "./context/ModalContext";
import { LoadingProvider, GlobalLoader } from "./context/LoadingContext";
import { ConfirmProvider } from "./context/ConfirmContext";

import { Layout } from "./layouts/Layout";
import { SurveyAnswerList } from "./pages/Survey/SurveyAnswerList";
import FileUpload from "./pages/DocumentManagement/FileUpload";
import DocumentViewer from "./pages/DocumentManagement/DocumentViewer";
import { DocumentList } from "./pages/KysDocument/DocumentList";
import { StaffLeaveList } from "./pages/person/StaffLeaveList";
import { OvertimeList } from "./pages/person/OvertimeList";
import { ProjectReportList } from "./pages/Project/ProjectReport";
import { PersonelEducation } from "./pages/person/PersonelEducation";
import { OpportunityPage } from "./pages/crm/OpportunityPage";
import { CustomerPage } from "./pages/crm/CustomerPage";
import { ActivityPage } from "./pages/crm/ActivityPage";
import { PriceOfferPage } from "./pages/crm/PriceOfferPage";
import { PriceOfferAddPage, PriceOfferDto } from "./pages/crm/PriceOfferAddPage";
import { OpportunityPageDetail } from "./pages/crm/OpportunityPageDetail";
import { CalendarPage } from "./pages/crm/CalendarPage";
import Product from "./pages/ProductPage/Product";
import CrmDashboard from "./pages/crm/CrmDashboardPage";

// Lazy-loaded pages
const EducationList = lazy(() => import("./pages/education/EducationList"));
const SurveyFill = lazy(() => import("./pages/Survey/SurveyFill"));
const SurveyList = lazy(() => import("./pages/Survey/SurveyList"));
const SurveyCreate = lazy(() => import("./pages/Survey/SurveyCreate"));
const SignIn = lazy(() => import("./pages/Authentication/SignIn"));
const PersonList = lazy(() => import("./pages/person/PersonList"));
const Settings = lazy(() => import("./pages/Settings"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

/* ----------------- Private Route ----------------- */
function PrivateRoute({ element }: { element: JSX.Element }) {
  const isAuth = useSelector((state: any) => state.login.isLoggedIn);
  return isAuth ? <Layout>{element}</Layout> : <SignIn />;
}

/* ----------------- Route Structure ----------------- */
function AppRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<GlobalLoader />}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PrivateRoute element={<CrmDashboard />} />} />


        {/* Survey */}
        {/*<Route path="/form/olustur/:id?" element={<PrivateRoute element={<SurveyCreate />} />} />
        <Route path="/form/doldur/:id/:educationId?" element={<PrivateRoute element={<SurveyFill />} />} />
        <Route path="/formlar/:type" element={<PrivateRoute element={<SurveyList />} />} />
        <Route path="/form/sonuc/:type" element={<PrivateRoute element={<SurveyAnswerList />} />} />

        {/* Education */}{/*
        <Route path="/egitimler" element={<PrivateRoute element={<EducationList />} />} />
*/}
        {/* Personel */}
        <Route path="/personeller" element={<PrivateRoute element={<PersonList isModal={false} isActive={true} />} />} />
        {/*<Route path="/pasifpersoneller" element={<PrivateRoute element={<PersonList isModal={false} isActive={false} />} />} />
        <Route path="/PersonelEgitim" element={<PrivateRoute element={<PersonelEducation />} />} />
        <Route path="/izintalepformu" element={<PrivateRoute element={<StaffLeaveList />} />} />
        <Route path="/fazlamesai" element={<PrivateRoute element={<OvertimeList />} />} />*/}
          {/* CRM */}
        {/* {import.meta.env.VITE_CRM_MODULE === "true" &&<Route path="/firsatlar" element={<PrivateRoute element={<OpportunityPage />} />} />} */}
        <Route path="/firsatlar" element={<PrivateRoute element={<OpportunityPage />} />} />
        <Route path="/firsatdetay/:id" element={<PrivateRoute element={<OpportunityPageDetail />} />} />
        <Route path="/musteriler" element={<PrivateRoute element={<CustomerPage />} />} />
        <Route path="/teklifler" element={<PrivateRoute element={<PriceOfferPage />} />} />
        <Route
          path="/yeniteklif/:opportunityId?"
          element={
            <PrivateRoute
              element={
                <PriceOfferAddPage
                  onSubmit={(data: PriceOfferDto) => {
                    console.log("Yeni teklif gönderildi:", data);
                  }}
                />
              }
            />
          }
        />
        <Route path="/takvim" element={<PrivateRoute element={<CalendarPage />} />} />
        <Route path="/aktiviteler" element={<PrivateRoute element={<ActivityPage title="Aktiviteler" />} />} />
      
        {/* Document Management */}
        <Route path="/FileUpload" element={<PrivateRoute element={<FileUpload folderId={1} />} />} />
        <Route path="/kysdokumanlar/:type?" element={<PrivateRoute element={<DocumentList />} />} />
        <Route
          path="/DocumentViewer"
          element={
            <PrivateRoute
              element={
                <DocumentViewer
                  fileUrl="https://localhost:44321/api/documents/download/1"
                  onSave={(fileData: ArrayBuffer) => {
                    console.log("File saved", fileData);
                  }}
                />
              }
            />
          }
        />

        {/* Project */}
        <Route path="/projetakipraporlari" element={<PrivateRoute element={<ProjectReportList />} />} />
       {/* Product */}
        <Route path="/urunler" element={<PrivateRoute element={<Product />} />} />
        {/* Settings */}
        <Route path="/ayarlar" element={<PrivateRoute element={<Settings />} />} />

        {/* Auth */}
        <Route path="/giris" element={<SignIn />} />

        {/* Not Found */}
        <Route path="*" element={<h1 className="text-center text-2xl p-10">404 - Sayfa bulunamadı</h1>} />
      </Routes>
    </Suspense>
  );
}

/* ----------------- Main App ----------------- */
export default function App() {
  const base = import.meta.env.VITE_BASE_NAME || "/";

  return (
    <BrowserRouter basename={base}>
      <AuthProvider>
        <ConfirmProvider>
          <UIProvider>
            <LoadingProvider>
              <ModalProvider>
                <AppRoutes />
              </ModalProvider>
            </LoadingProvider>
          </UIProvider>
        </ConfirmProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
