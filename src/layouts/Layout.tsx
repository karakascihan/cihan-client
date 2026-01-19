import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { useUI } from "../context/UIContext";
import { useLoading } from "@/context/LoadingContext";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { collapsed } = useUI();
  const {loading} = useLoading();
  return (
    <div className="card">
      <Sidebar />
      <div className={`flex flex-col flex-1 min-h-screen transition-all duration-300 ${
          collapsed ? "md:ml-16" : "md:ml-64"
        }`}>
        <Header />
        <main className="flex-1 p-4">
           {children}
        </main>
        {/* <footer className="p-4 text-center text-lg text-gray-600 ">
        <p className="2xl:px-20">
              Dijital ERP 2025 © Tüm hakları saklıdır.
            </p>
        </footer> */}
      </div>
    </div>
  );
};
