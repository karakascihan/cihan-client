import { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { URL } from "@/api";

import { useSidebar2 } from "../context/SidebarContext2";
import SidebarWidget from "./SidebarWidget";
import { ChevronDownIcon, DotIcon, Kanban } from "lucide-react";
import {
  Users,
  Settings,
  FileSpreadsheet,
  ChevronDown,
  ChevronRight,
  Building2,
  Sparkles,
  Zap,
  Landmark,
  DollarSign,
  FileSignature,
  Package,
  CalendarClock,
  LayoutDashboard,
  Orbit,
  PackageSearch,
  UserCog2,
} from "lucide-react";
type NavItem = {
  name: string;
  icon?: React.ReactNode;
  path?: string;
  pro?: boolean;
  new?: boolean;
  children?: NavItem[];
};

const navItems: NavItem[] = [
  {
    name: "Anasayfa",
    icon: (
      <LayoutDashboard
        style={{
          stroke: "#0284C7",
          filter: "drop-shadow(0 1px 2px rgba(3,105,161,0.35))",
        }}
      />
    ),
    path: "/",
  },

  {
    name: "CRM",
    icon: (
      <Orbit
        size={20}
        style={{
          stroke: "#6D28D9", // violet-700
          filter: "drop-shadow(0 1px 2px rgba(109,40,217,0.35))",
        }}
      />
    ),
    children: [
      {
        name: "Fırsatlar",
        icon: <Sparkles className="w-5 h-5 text-yellow-500" />,
        path: "/firsatlar",
      },
      {
        name: "Müşteriler",
        icon: <Landmark className="w-5 h-5 text-blue-600" />,
        path: "/musteriler",
      },
      {
        name: "Aktiviteler",
        icon: <Zap className="w-5 h-5 text-green-500" />,
        path: "/aktiviteler",
      },
      {
        name: "Teklif Yönetimi",
        icon: <DollarSign className="w-5 h-5 text-orange-800" />,
        path: "/teklifler",
        children: [
          { name: "Teklif Listesi", path: "/teklifler" },
          { name: "Yeni Teklif", path: "/yeniteklif" },
        ],
      },
      {
        name: "Sözleşmeler",
        icon: <FileSignature className="w-5 h-5 text-green-900" />,
        path: "/sozlesmeler",
      },
      {
        name: "Sipariş Yönetimi",
        icon: <Package className="w-5 h-5 text-yellow-600" />,
        path: "/siparisler",
        children: [
          { name: "Sipariş Listesi", path: "/siparisler" },
          { name: "Yeni Sipariş", path: "/yenisiparis" },
        ],
      },

      {
        name: "Takvim",
        icon: <CalendarClock className="w-5 h-5 text-indigo-600" />,
        path: "/takvim",
      },
    ],
  },
  {
    name: "Ürün Yönetimi",
    icon: (
      <PackageSearch
        style={{
          stroke: "#b27d10",
        }}
      />
    ),
    children: [
      {
        name: "Ürün Fiyat Listesi",
        icon: <FileSpreadsheet />,
        path: "/urunler",
      },
    ],
  },
   {
    name: "Proje Yönetimi",
    icon: (
      <Kanban 
        style={{
          stroke: "#b27d10",
        }}
      />
    ),
    children: [
      {
        name: "Dijital Erp Kurulum Projesi",
        icon: <FileSpreadsheet />,
        path: "/proje/7",
      },
      {
        name: "Örnek Proje",
        icon: <FileSpreadsheet />,
        path: "/proje/6",
      },
    ],
  },
  {
    name: "İnsan Kaynakları",
    icon: (
      <UserCog2
        style={{
          stroke: "#85AB6C",
        }}
      />
    ),
    children: [
      {
        name: "Personeller",
        icon: <Users style={{ stroke: "#12608C" }} />,
        path: "/personeller",
      },
    ],
  },
  {
    name: "Ayarlar",
    icon: <Settings />,
    children: [
      {
        name: "Şirketlerim",
        icon: (
          <Building2
            style={{
              stroke: "#194223",
            }}
          />
        ),
        path: "/sirketlerim",
      },
    ],
  },
];
const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar2();
  const location = useLocation();

  const [openSubmenu, setOpenSubmenu] = useState<{
    type: "main" | "others";
    index: number;
  } | null>(null);
  const [subMenuHeight, setSubMenuHeight] = useState<Record<string, number>>(
    {}
  );
  const subMenuRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // const isActive = (path: string) => location.pathname === path;
  const isActive = useCallback(
    (path: string) => location.pathname === path,
    [location.pathname]
  );
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({});

  const toggleMenu = (key: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderItems = (items: NavItem[], level = 0) => {
    const showText = isExpanded || isHovered || isMobileOpen;

    const base =
      "w-full flex items-center gap-3 rounded-lg transition-colors select-none";
    const pad = "px-3 py-2";
    const justify = showText ? "justify-start" : "justify-center";
    const iconWrap =
      "shrink-0 inline-flex items-center justify-center rounded-md w-6 h-6";

    const titleClass =
      level === 0 ? "text-lg font-semibold" : "text-lg font-medium";

    return (
      <ul className={`flex flex-col gap-2 ${level > 0 ? "mt-1" : ""}`}>
        {items.map((item) => {
          const hasChildren = !!item.children?.length;
          const isOpen = openMenus[item.name];

          return (
            <li key={item.name}>
              {hasChildren ? (
                <button
                  type="button"
                  onClick={() => toggleMenu(item.name)}
                  className={`${base} ${pad} ${justify} ${
                    isOpen
                      ? "bg-gray-100 dark:bg-gray-800"
                      : "text-gray-900 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                  }`}
                >
                  {item.icon && <span className={iconWrap}>{item.icon}</span>}

                  {showText && (
                    <span
                      className={`${titleClass} text-gray-900 dark:text-gray-100`}
                    >
                      {item.name}
                    </span>
                  )}

                  {showText && (
                    <span className="ml-auto text-gray-500 dark:text-gray-300">
                      {isOpen ? (
                        <ChevronDown className="w-4 h-4" />
                      ) : (
                        <ChevronRight className="w-4 h-4" />
                      )}
                    </span>
                  )}
                </button>
              ) : (
                item.path && (
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `${base} ${pad} ${justify} ${
                        isActive
                          ? "bg-gradient-to-r from-teal-50 via-sky-50 to-blue-100 ring-1 ring-sky-200/60 shadow-md text-gray-900"
                          : "text-gray-900 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`
                    }
                  >
                    {item.icon && <span className={iconWrap}>{item.icon}</span>}

                    {showText && (
                      <span className={titleClass}>{item.name}</span>
                    )}
                  </NavLink>
                )
              )}

              {hasChildren && isOpen && showText && (
                <div className="mt-1.5 ml-4 pl-3 border-l border-gray-200 dark:border-gray-900">
                  {renderItems(item.children!, level + 1)}
                </div>
              )}
            </li>
          );
        })}
      </ul>
    );
  };

  /*useEffect(() => {
    let submenuMatched = false;
    ["main", "others"].forEach((menuType) => {
      const items = menuType === "main" ? navItems : othersItems;
      items.forEach((nav, index) => {
        if (nav.subItems) {
          nav.subItems.forEach((subItem) => {
            if (isActive(subItem.path)) {
              setOpenSubmenu({
                type: menuType as "main" | "others",
                index,
              });
              submenuMatched = true;
            }
          });
        }
      });
    });

    if (!submenuMatched) {
      setOpenSubmenu(null);
    }
  }, [location, isActive]);
*/
  useEffect(() => {
    if (openSubmenu !== null) {
      const key = `${openSubmenu.type}-${openSubmenu.index}`;
      if (subMenuRefs.current[key]) {
        setSubMenuHeight((prevHeights) => ({
          ...prevHeights,
          [key]: subMenuRefs.current[key]?.scrollHeight || 0,
        }));
      }
    }
  }, [openSubmenu]);

  const handleSubmenuToggle = (index: number, menuType: "main" | "others") => {
    setOpenSubmenu((prevOpenSubmenu) => {
      if (
        prevOpenSubmenu &&
        prevOpenSubmenu.type === menuType &&
        prevOpenSubmenu.index === index
      ) {
        return null;
      }
      return { type: menuType, index };
    });
  };

  /*const renderMenuItems = (items: NavItem[], menuType: "main" | "others") => (
    <ul className="flex flex-col gap-4">
      {items.map((nav, index) => (
        <li key={nav.name}>
          {nav.subItems ? (
            <button
              onClick={() => handleSubmenuToggle(index, menuType)}
              className={`menu-item group ${
                openSubmenu?.type === menuType && openSubmenu?.index === index
                  ? "menu-item-active"
                  : "menu-item-inactive"
              } cursor-pointer ${
                !isExpanded && !isHovered
                  ? "lg:justify-center"
                  : "lg:justify-start"
              }`}
            >
              <span
                className={`menu-item-icon-size  ${
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? "menu-item-icon-active"
                    : "menu-item-icon-inactive"
                }`}
              >
                {nav.icon}
              </span>
              {(isExpanded || isHovered || isMobileOpen) && (
                <span className="menu-item-text">{nav.name}</span>
              )}
              {(isExpanded || isHovered || isMobileOpen) && (
                <ChevronDownIcon
                  className={`ml-auto w-5 h-5 transition-transform duration-200 ${
                    openSubmenu?.type === menuType &&
                    openSubmenu?.index === index
                      ? "rotate-180 text-brand-500"
                      : ""
                  }`}
                />
              )}
            </button>
          ) : (
            nav.path && (
              <Link
                to={nav.path}
                className={`menu-item group ${
                  isActive(nav.path) ? "menu-item-active" : "menu-item-inactive"
                }`}
              >
                <span
                  className={`menu-item-icon-size ${
                    isActive(nav.path)
                      ? "menu-item-icon-active"
                      : "menu-item-icon-inactive"
                  }`}
                >
                  {nav.icon}
                </span>
                {(isExpanded || isHovered || isMobileOpen) && (
                  <span className="menu-item-text">{nav.name}</span>
                )}
              </Link>
            )
          )}
          {nav.subItems && (isExpanded || isHovered || isMobileOpen) && (
            <div
              ref={(el) => {
                subMenuRefs.current[`${menuType}-${index}`] = el;
              }}
              className="overflow-hidden transition-all duration-300"
              style={{
                height:
                  openSubmenu?.type === menuType && openSubmenu?.index === index
                    ? `${subMenuHeight[`${menuType}-${index}`]}px`
                    : "0px",
              }}
            >
              <ul className="mt-2 space-y-1 ml-9">
                {nav.subItems.map((subItem) => (
                  <li key={subItem.name}>
                    <Link
                      to={subItem.path}
                      className={`menu-dropdown-item ${
                        isActive(subItem.path)
                          ? "menu-dropdown-item-active"
                          : "menu-dropdown-item-inactive"
                      }`}
                    >
                      {subItem.name}
                      <span className="flex items-center gap-1 ml-auto">
                        {subItem.new && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            new
                          </span>
                        )}
                        {subItem.pro && (
                          <span
                            className={`ml-auto ${
                              isActive(subItem.path)
                                ? "menu-dropdown-badge-active"
                                : "menu-dropdown-badge-inactive"
                            } menu-dropdown-badge`}
                          >
                            pro
                          </span>
                        )}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
*/
  return (
    <aside
      className={`fixed mt-16 flex flex-col lg:mt-0 top-0 px-5 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out z-50 border-r border-gray-200 
        ${
          isExpanded || isMobileOpen
            ? "w-[300px]"
            : isHovered
            ? "w-[300px]"
            : "w-[90px]"
        }
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex h-full flex-col">
        <div
          className={`${isMobileOpen ? "hidden" : "flex"} py-8 ${
            !isExpanded && !isHovered ? "lg:justify-center" : "justify-start"
          }`}
        >
          <Link to="/">
            {isExpanded || isHovered || isMobileOpen ? (
              <>
                <img
                  className="block w-55 h-auto dark:hidden"
                  src={URL + "/logo.png"}
                  alt="Logo"
                  style={{ display: "block" }}
                  width={150}
                  height={40}
                />
                <img
                  className="hidden dark:block"
                  src={URL + "/logo-white.png"}
                  alt="Logo"
                  width={150}
                  height={40}
                />
              </>
            ) : (
              <img
                src="src/images/logo.svg"
                alt="Logo"
                width={32}
                height={32}
              />
            )}
          </Link>
        </div>
        <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
          <nav className="mb-6">
            <div className="flex flex-col gap-4">
              <div>
                <h2
                  className={`mb-4 mt-8 ml-3 text-xs uppercase flex leading-[20px] text-gray-400 ${
                    !isExpanded && !isHovered
                      ? "lg:justify-center"
                      : "justify-start"
                  }`}
                >
                  {isExpanded || isHovered || isMobileOpen ? (
                    "Menu"
                  ) : (
                    <DotIcon className="size-6 mr-3" />
                  )}
                </h2>
                {renderItems(navItems)}
              </div>
            </div>
          </nav>
        </div>
        <div className="mt-auto mb-4 px-3 text-xs text-gray-600 text-center leading-relaxed">
          Dijital ERP 2025 ©<br />
          Tüm hakları saklıdır.
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
