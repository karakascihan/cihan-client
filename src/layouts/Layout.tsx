import React from "react";
import { Sidebar } from "../components/Sidebar";
import { Header } from "../components/Header";
import { useUI } from "../context/UIContext";
import { useLoading } from "@/context/LoadingContext";
import { FiMenu } from "react-icons/fi";

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { collapsed,toggleSidebar } = useUI();
  const {loading} = useLoading();
  return (
    <div className="card">
      <Sidebar />
      <button className="md:hidden mt-2 ml-2" onClick={toggleSidebar}>
                <FiMenu size={24} />
              </button>
      <div className={`flex flex-col flex-1 min-h-screen transition-all duration-300 ${
          collapsed ? "md:ml-16" : "md:ml-64"
        }`}>
        {/* <Header /> */}
        <main className="flex-1 p-2">
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
