import React, { createContext, SetStateAction, useContext, useState, type ReactNode } from "react";

interface UIContextType {
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  closeSidebar: () => void;

  collapsed: boolean;
  toggleCollapsed: () => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider = ({ children }: { children: ReactNode }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  const toggleCollapsed = () => setCollapsed(!collapsed);

  return (
    <UIContext.Provider
      value={{
        sidebarOpen,
        toggleSidebar,
        closeSidebar,
        collapsed,
        toggleCollapsed
      }}
    >
      {children}
    </UIContext.Provider>
  );
};

export const useUI = () => {
  const context = useContext(UIContext);
  if (!context) throw new Error("useUI must be used within UIProvider");
  return context;
};
