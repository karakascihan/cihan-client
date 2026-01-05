import { createContext, useContext, useMemo, useState, useCallback } from "react";

type SidebarContextType = {
  isExpanded: boolean;
  isHovered: boolean;
  showText: boolean;
  openSubmenu: string | null;
  toggleSidebar: () => void;
  setIsHovered: (v: boolean) => void;
  toggleSubmenu: (key: string) => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const useSidebar = () => {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
};

export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

  const toggleSidebar = useCallback(() => {
    setIsExpanded((p) => !p);
    setIsHovered(false);
  }, []);

  const toggleSubmenu = useCallback((key: string) => {
    setOpenSubmenu((p) => (p === key ? null : key));
  }, []);

  const showText = useMemo(() => isExpanded || isHovered, [isExpanded, isHovered]);

  const value = useMemo(
    () => ({
      isExpanded,
      isHovered,
      showText,
      openSubmenu,
      toggleSidebar,
      setIsHovered,
      toggleSubmenu,
    }),
    [isExpanded, isHovered, showText, openSubmenu, toggleSidebar, toggleSubmenu]
  );

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};