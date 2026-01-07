import { SidebarProvider, useSidebar } from "../context/SidebarContext";
import { Outlet } from "react-router";
import AppHeader from "./AppHeader";
import Backdrop from "./Backdrop";
import AppSidebar2 from "@/components/AppSidebar2";
import { SidebarProvider2, useSidebar2 } from "@/context/SidebarContext2";
import AppHeader2 from "./AppHeader2";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar2();

  return (
    <div className="min-h-screen xl:flex">
      <div>
        <AppSidebar2 />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
        } ${isMobileOpen ? "ml-0" : ""}`}
      >
        <AppHeader2 />
        <div className=" mx-auto  md:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

const AppLayout: React.FC = () => {
  return (
    <SidebarProvider2>
      <LayoutContent />
    </SidebarProvider2>
  );
};

export default AppLayout;
