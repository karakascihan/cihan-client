import React from "react";
import { Outlet } from "react-router-dom";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import { SidebarProvider, useSidebar } from "@/context/SidebarContext";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobile } = useSidebar();
  const showExpanded = isExpanded || isHovered;

  return (
    <div className="h-screen flex overflow-hidden">
      {/* SOL: Desktop'ta flow'da yer kaplasın (sadece kendi genişliği kadar) */}
      <div
        className="hidden xl:block h-screen flex-shrink-0"
        style={{
          width: showExpanded ? 300 : 90,
          transition: "width 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "width",
        }}
      >
        <AppSidebar />
      </div>

      {/* MOBIL: Sidebar overlay */}
      <div className="xl:hidden">
        <AppSidebar />
        <Backdrop />
      </div>

      {/* SAĞ: Header + Content */}
      <div className="flex-1 min-w-0 h-screen flex flex-col">
        <div className="sticky top-0 z-50">
          <AppHeader />
        </div>

        <main className="flex-1 min-h-0 overflow-y-auto">
          <div className="w-full p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider>
      <LayoutContent />
    </SidebarProvider>
  );
};

export default AppLayout;
