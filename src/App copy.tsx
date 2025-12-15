import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { Layout } from "./layouts/Layout";
import { UIProvider } from "./context/UIContext";
import { ModalProvider } from "./context/ModalContext";
import { useSelector } from "react-redux";
import { Suspense, lazy } from 'react';
import { SurveyAnswerList } from "./pages/Survey/SurveyAnswerList";
import { GlobalLoader, LoadingProvider } from "./context/LoadingContext";
import FileUpload from "./pages/DocumentManagement/FileUpload";
import DocumentViewer from "./pages/DocumentManagement/DocumentViewer";
import { DocumentList } from "./pages/KysDocument/DocumentList";
import { ConfirmProvider } from "./context/ConfirmContext";
import { StaffLeaveList } from "./pages/person/StaffLeaveList";
import { OvertimeList } from "./pages/person/OvertimeList";
import { ProjectReportList } from "./pages/Project/ProjectReport";
import { PersonelEducation } from "./pages/person/PersonelEducation";
import { OpportunityPage } from "./pages/crm/OpportunityPage";
import { CustomerPage } from "./pages/crm/CustomerPage";
import { ActivityPage } from "./pages/crm/ActivityPage";
import { PriceOfferPage } from "./pages/crm/PriceOfferPage";
import { PriceOfferAddPage, PriceOfferDto } from "./pages/crm/PriceOfferAddPage";
import OpportunityTabs, { OpportunityPageDetail } from "./pages/crm/OpportunityPageDetail";
import { CalendarPage } from "./pages/crm/CalendarPage";

const EducationList = lazy(() => import('./pages/education/EducationList'));
const SurveyFill = lazy(() => import('./pages/Survey/SurveyFill'));
const SurveyList = lazy(() => import('./pages/Survey/SurveyList'));
const SurveyCreate = lazy(() => import('./pages/Survey/SurveyCreate'));
const SignIn = lazy(() => import('./pages/Authentication/SignIn'));
const PersonList = lazy(() => import('./pages/person/PersonList'));
const Settings = lazy(() => import('./pages/Settings'));
const Dashboard = lazy(() => import("./pages/Dashboard"));

export default function App123() {
    const isAuth = useSelector((state: any) => state.login.isLoggedIn);
  return (
    <BrowserRouter basename="/digitest">
      <Suspense fallback={<GlobalLoader />}>
    <AuthProvider>
      <ConfirmProvider>
 
      <UIProvider>
        <LoadingProvider>
        <ModalProvider>
          {/* <AnimatePresence> */}
          <Routes key={location.pathname} location={location}>
            <Route path="/" element={!isAuth ? <SignIn /> :<Layout><Dashboard /></Layout>} />
            <Route path="/form/olustur/:id?" element={!isAuth ? <SignIn /> :<Layout><SurveyCreate /></Layout>} />
            <Route path="/form/doldur/:id/:educationId?" element={!isAuth ? <SignIn /> :<Layout><SurveyFill /></Layout>} />
            <Route path="/formlar/:type" element={!isAuth ? <SignIn /> :<Layout><SurveyList /></Layout>} />
            <Route path="/egitimler" element={!isAuth ? <SignIn /> :<Layout><EducationList /></Layout>} />
            <Route path="/form/sonuc/:type" element={!isAuth ? <SignIn /> :<Layout><SurveyAnswerList /></Layout>} />
            <Route path="/personeller" element={!isAuth ? <SignIn /> :<Layout><PersonList isModal={false} isActive={true}/></Layout>} />
            <Route path="/pasifpersoneller" element={!isAuth ? <SignIn /> :<Layout><PersonList isModal={false} isActive={false}/></Layout>} />
            <Route path="/ayarlar" element={!isAuth ? <SignIn /> :<Layout><Settings/></Layout>} />
            <Route path="/izintalepformu" element={!isAuth ? <SignIn /> :<Layout><StaffLeaveList/></Layout>} />
            <Route path="/fazlamesai" element={!isAuth ? <SignIn /> :<Layout><OvertimeList/></Layout>} />
            <Route path="/giris" element={<SignIn />} />
            <Route path="/FileUpload" element={!isAuth ? <SignIn /> :<Layout><FileUpload folderId={1} /></Layout>} />
            <Route path="/projetakipraporlari" element={!isAuth ? <SignIn /> :<Layout><ProjectReportList/></Layout>} />
            <Route path="/kysdokumanlar/:type?" element={!isAuth ? <SignIn /> :<Layout><DocumentList/></Layout>} />
            <Route path="/PersonelEgitim/" element={!isAuth ? <SignIn /> :<Layout><PersonelEducation/></Layout>} />
            <Route path="/firsatlar/" element={!isAuth ? <SignIn /> :<Layout><OpportunityPage/></Layout>} />
            <Route path="/firsatdetay/:id" element={!isAuth ? <SignIn /> :<Layout><OpportunityPageDetail /></Layout>} />
            <Route path="/musteriler/" element={!isAuth ? <SignIn /> :<Layout><CustomerPage/></Layout>} />
            <Route path="/teklifler/" element={!isAuth ? <SignIn /> :<Layout><PriceOfferPage/></Layout>} />
            <Route path="/takvim/" element={!isAuth ? <SignIn /> :<Layout><CalendarPage/></Layout>} />
            {/* <Route path="/firsat/" element={!isAuth ? <SignIn /> :<Layout><OpportunityTabs opportunity={{i}} /></Layout>} /> */}
            <Route path="/yeniteklif/:opportunityId?" element={!isAuth ? <SignIn /> :<Layout><PriceOfferAddPage onSubmit={function (data: PriceOfferDto): void {
                     
                    } }/></Layout>} />


            <Route path="/DocumentViewer" element={!isAuth ? <SignIn /> :<Layout><DocumentViewer fileUrl={"https://localhost:44321/api/documents/download/1"} onSave={function (fileData: ArrayBuffer): void {
                    throw new Error("Function not implemented.");
                  } } /></Layout>} />
<Route path="/aktiviteler/" element={!isAuth ? <SignIn /> :<Layout><ActivityPage title="Aktiviteler"/></Layout>} />
          </Routes>
            {/* </AnimatePresence> */}
        </ModalProvider>
        </LoadingProvider>
      </UIProvider>
      </ConfirmProvider>

    </AuthProvider>
    </Suspense>
    </BrowserRouter>
  );
}

