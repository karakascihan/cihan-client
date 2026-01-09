import { Outlet } from "react-router";
import Backdrop from "./Backdrop";
import AppSidebar2 from "@/components/AppSidebar2";
import { SidebarProvider2, useSidebar2 } from "@/context/SidebarContext2";
import AppHeader2 from "./AppHeader2";
import AppSidebar from "@/components/AppSidebar";

const LayoutContent: React.FC = () => {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar2();

  return (
    <div className="min-h-screen xl:flex overflow-x-hidden">
      <div>
        <AppSidebar />
        <Backdrop />
      </div>
      <div
        className={`flex-1 transition-all duration-300 ease-in-out overflow-x-hidden ${isExpanded || isHovered ? "lg:ml-[290px]" : "lg:ml-[90px]"
          } ${isMobileOpen ? "ml-0" : ""}`}
      >

        <AppHeader2 />
        <div className="mx-auto md:p-6 overflow-x-hidden">
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
