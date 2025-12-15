import GlobalSidebar from "@/components/GlobalSidebar";
import React, { createContext, useContext, useState, ReactNode } from "react";

type SidebarPosition = "left" | "right" | "top" | "bottom";

interface SidebarState {
  isOpen: boolean;
  position: SidebarPosition;
  content: ReactNode | null;
  size: string;
  title:string;
}

interface SidebarContextProps {
  state: SidebarState;
  openSidebar: (content: ReactNode, position?: SidebarPosition,size?:string,title?:string) => void;
  closeSidebar: () => void;
  size: string;
}

const GlobalSidebarContext = createContext<SidebarContextProps | undefined>(undefined);

export const GlobalSidebarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<SidebarState>({  isOpen: false,  position: "left",  content: null,  size: "w-64 h-full", title:""});

  const openSidebar = (content: ReactNode, position: SidebarPosition = "left",size:string="w-64 h-full",title:string) => {
    setState({ isOpen: true, position, content, size, title });
  };

  const closeSidebar = () => {
    setState({ isOpen: false, position: "left", content: null,size:"",title:"" });
  };

  return (
    <GlobalSidebarContext.Provider value={{ state, openSidebar, closeSidebar }}>
      <GlobalSidebar/>
      {children}
    </GlobalSidebarContext.Provider>
  );
};

export const useSidebar = () => {
  const context = useContext(GlobalSidebarContext);
  if (!context) throw new Error("useSidebar must be used within SidebarProvider");
  return context;
};
