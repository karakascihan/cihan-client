import React from "react";
import { useLoading } from "@/context/LoadingContext";
import { AppSidebar } from "@/components/AppSidebar";
import AppHeader from "./AppHeader";
import { useSidebar } from "@/context/SidebarContext"; // ✅


export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { loading } = useLoading();
  const { isExpanded, isHovered } = useSidebar();
  const showExpanded = isExpanded || isHovered;

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <div
        className="h-screen sticky top-0"
        style={{
          width: showExpanded ? "290px" : "90px",
          transition: "width 200ms cubic-bezier(0.4, 0, 0.2, 1)",
          willChange: "width",
        }}
      >
        <AppSidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <AppHeader />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
};
export default Layout;
