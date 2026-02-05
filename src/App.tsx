import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ConfirmProvider } from "./context/ConfirmContext";
import { UIProvider } from "./context/UIContext";
import { LoadingProvider } from "./context/LoadingContext";
import { ModalProvider } from "./context/ModalContext";
import { AppRoutes } from "./routes/AppRoutes";
import { Tabs } from "./components/Tabs";
import { TabsProvider } from "./context/TabsContext";
import { TabsUI } from "./layouts/TabsUI";
import { Layout } from "./layouts/Layout";
import { SignIn } from "./routes/pages";
import { useSelector } from "react-redux";

/* ----------------- Main App ----------------- */
export default function App() {
  const base = import.meta.env.VITE_BASE_NAME || "/";
const isAuth = useSelector((state: any) => state.login.isLoggedIn);
  return (
    <TabsProvider>
      <BrowserRouter basename={base}>
        <AuthProvider>
          <ConfirmProvider>
            <UIProvider>
              <LoadingProvider>
                <ModalProvider>
                  <Routes>
                    <Route path="/giris" element={<SignIn />} />
                    <Route
                      path="/*"
                      element={ isAuth ?
                        <Layout>
                          <TabsUI />
                        </Layout> : <SignIn />
                      }
                    />
                  </Routes>
                  {/* <AppRoutes /> */}
                </ModalProvider>
              </LoadingProvider>
            </UIProvider>
          </ConfirmProvider>
        </AuthProvider>
      </BrowserRouter>
    </TabsProvider>
  );
}
