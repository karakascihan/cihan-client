import { Routes, Route, Navigate } from "react-router-dom";
import React, { Suspense } from "react";
import { useSelector } from "react-redux";
import { Layout } from "../layouts/Layout";
import { GlobalLoader } from "../context/LoadingContext";
import { routes } from "./routeConfig";

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const isAuth = useSelector((state: any) => state.login.isLoggedIn);
  return isAuth ? <Layout>{children}</Layout> : <Navigate to="/giris" replace />;
}

export function AppRoutes() {
  return (
    <Suspense fallback={<GlobalLoader />}>
      <Routes>
        {routes.map(({ path, element, isPrivate }) => (
          <Route
            key={path}
            path={path}
            element={
              isPrivate ? (
                <PrivateRoute>{element}</PrivateRoute>
              ) : (
                element
              )
            }
          />
        ))}

        <Route
          path="*"
          element={
            <h1 className="text-center text-2xl p-10">
              404 - Sayfa bulunamadı
            </h1>
          }
        />
      </Routes>
    </Suspense>
  );
}
