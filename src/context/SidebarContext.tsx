// import React, {
//   createContext,
//   useCallback,
//   useContext,
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// export type SidebarContextType = {
//   // layout states
//   isMobile: boolean;
//   isExpanded: boolean; // desktop expanded state (raw)
//   isMobileOpen: boolean; // mobile drawer open/close
//   isHovered: boolean;

//   // helpers
//   showText: boolean; // isExpanded || isHovered (desktop behavior)
//   activeItem: string | null;
//   openSubmenu: string | null;

//   // actions
//   toggleSidebar: () => void; // desktop expand/collapse
//   toggleMobileSidebar: () => void; // mobile open/close
//   closeMobileSidebar: () => void; // handy helper
//   setIsHovered: (v: boolean) => void;
//   setActiveItem: (item: string | null) => void;
//   toggleSubmenu: (key: string) => void;

//   // derived (optional but useful)
//   effectiveIsExpanded: boolean; // on mobile = false, desktop = isExpanded
// };

// const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// export const useSidebar = () => {
//   const ctx = useContext(SidebarContext);
//   if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
//   return ctx;
// };

// export const SidebarProvider: React.FC<{ children: React.ReactNode }> = ({
//   children,
// }) => {
//   const [isExpanded, setIsExpanded] = useState(true);
//   const [isHovered, setIsHovered] = useState(false);

//   const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
//   const [activeItem, setActiveItem] = useState<string | null>(null);

//   const [isMobileOpen, setIsMobileOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   // ✅ Mobile detection + auto close drawer when switching to desktop
//   useEffect(() => {
//     const handleResize = () => {
//       const mobile = window.innerWidth < 768;
//       setIsMobile(mobile);

//       // desktop'a geçince drawer kapanır
//       if (!mobile) setIsMobileOpen(false);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const toggleSidebar = useCallback(() => {
//     setIsExpanded((p) => !p);
//     setIsHovered(false);
//   }, []);

//   const toggleMobileSidebar = useCallback(() => {
//     setIsMobileOpen((p) => !p);
//   }, []);

//   const closeMobileSidebar = useCallback(() => {
//     setIsMobileOpen(false);
//   }, []);

//   const toggleSubmenu = useCallback((key: string) => {
//     setOpenSubmenu((p) => (p === key ? null : key));
//   }, []);

//   // ✅ showText: desktop’ta expanded ya da hover iken text göster
//   const showText = useMemo(() => isExpanded || isHovered, [isExpanded, isHovered]);

//   // ✅ mobile’da expanded false gibi davranmak istersen bu değeri kullan
//   const effectiveIsExpanded = useMemo(
//     () => (isMobile ? false : isExpanded),
//     [isMobile, isExpanded]
//   );

//   const value = useMemo<SidebarContextType>(
//     () => ({
//       isMobile,
//       isExpanded,
//       isMobileOpen,
//       isHovered,
//       showText,
//       activeItem,
//       openSubmenu,
//       toggleSidebar,
//       toggleMobileSidebar,
//       closeMobileSidebar,
//       setIsHovered,
//       setActiveItem,
//       toggleSubmenu,
//       effectiveIsExpanded,
//     }),
//     [
//       isMobile,
//       isExpanded,
//       isMobileOpen,
//       isHovered,
//       showText,
//       activeItem,
//       openSubmenu,
//       toggleSidebar,
//       toggleMobileSidebar,
//       closeMobileSidebar,
//       toggleSubmenu,
//     ]
//   );

//   return (
//     <SidebarContext.Provider value={value}>
//       {children}
//     </SidebarContext.Provider>
//   );
// };
