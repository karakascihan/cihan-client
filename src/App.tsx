import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ConfirmProvider } from "./context/ConfirmContext";
import { UIProvider } from "./context/UIContext";
import { LoadingProvider } from "./context/LoadingContext";
import { ModalProvider } from "./context/ModalContext";
import { AppRoutes } from "./routes/AppRoutes";


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
