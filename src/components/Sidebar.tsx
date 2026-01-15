import React, { useRef, useEffect, useState } from "react";
import { Link, NavLink, Route } from "react-router-dom";
import {
  FiHome,
  FiFileMinus,
  FiSettings,
  FiChevronDown,
  FiChevronRight,
  FiUsers,
  FiUser,
  FiUserPlus,
  FiTable,
  FiUserX,
} from "react-icons/fi";
import { useUI } from "../context/UIContext";
import { useSelector } from "react-redux";
import icon from "../images/logo/favicon.ico";
import { FaBuilding, FaCalendar, FaFileCirclePlus, FaFileContract, FaWarehouse } from "react-icons/fa6";
import {
  FaBoxes,
  FaCoins,
  FaDochub,
  FaFileInvoiceDollar,
  FaPencilAlt,
  FaProjectDiagram,
} from "react-icons/fa";
import { FcFile, FcSurvey } from "react-icons/fc";
import { RootState } from "@/store/store";
import { HiOutlineDocumentReport } from "react-icons/hi"; // Rapor dokümanı (net)
import { LuUser } from "react-icons/lu"; // CRM
import { Building2, Calendar, CalendarClock, ClipboardList, DollarSign, FileSignature, FileSpreadsheet, Landmark, LayoutDashboard, Orbit, Package, PackageSearch, Plus, Repeat2, RouteIcon, Settings, Sparkles, Spline, User2, UserCog2, Users, Workflow, Zap } from "lucide-react";
import { CalendarDays } from "lucide-react";
import { URL } from "@/api";

interface MenuItem {
  title: string;
  icon?: React.ReactNode;
  path?: string;
  roles?: number[];
  items?: MenuItem[];
}

const menus: MenuItem[] = [
  {
    title: "Anasayfa",
    icon: <LayoutDashboard />,
    path: "/",
    roles: [-1],
  },
  // {
  //   title: "Proje Yönetimi",
  //   icon: <FaProjectDiagram />,
  //   roles: [-1],
  //   items: [
  //     {
  //       title: "Proje Takip Raporları",
  //       path: "/projetakipraporlari",
  //       icon: <HiOutlineDocumentReport />,
  //     },
  //   ],
  // },
  {
    title: "Proje Yönetimi",
    icon: <Workflow />,
    items: [{
      title: "Proje Takvimi",
      path: "/projetakvimi",
      icon: <FaCalendar />
    }
    ]
  },
  {
    title: "CRM", icon: <Orbit />,
    roles: [1, 2],
    items: [
      { title: "Fırsatlar", icon: <Sparkles className="w-4 h-4 text-yellow-300" />, path: "/firsatlar" }
      , { title: "Müşteriler", icon: <Building2 className="w-4 h-4 text-blue-100" />, path: "/musteriler" }
      , { title: "Aktiviteler", icon: <Zap className="w-4 h-4 text-pink-300" />, path: "/aktiviteler" }

      , {
        title: "Teklif Yönetimi",
        icon: <DollarSign className="w-4 h-4 text-green-300" />,
        items: [
          { title: "Teklif Listesi", path: "/teklifler" },
          { title: "Yeni Teklif", path: "/yeniteklif" }
        ]
      }

      , { title: "Sözleşmeler", icon: <FileSignature className="w-4 h-4 text-purple-100" />, path: "/sozlesmeler" }

      , {
        title: "Sipariş Yönetimi",
        icon: <Package className="w-4 h-4 text-amber-500" />,
        items: [
          { title: "Sipariş Listesi", path: "/siparisler" },
          { title: "Yeni Sipariş", path: "/yenisiparis" }
        ]
      }

      , { title: "Takvim", icon: <CalendarClock className="w-4 h-4 text-cyan-100" />, path: "/takvim" }]

  },
  {
    title: "Ürün Yönetimi",
    icon: <PackageSearch />,
    roles: [-1],
    items: [
      {
        title: "Ürün Fiyat Listesi",
        icon: <FileSpreadsheet />,
        roles: [-1],
        path: "/urunler",

      },

    ],
  },
  // {
  //   title: "Kys Dokümanları",
  //   icon: <FaDochub />,
  //   roles: [-1],
  //   items: [
  //         { title: "Tüm Dokümanlar", icon: null, path: "/kysdokumanlar/" },
  //     { title: "Süreçler", icon: null, path: "/kysdokumanlar/1" },
  //     { title: "Prosedürler", icon: null, path: "/kysdokumanlar/2" },
  //     {
  //       title: "Talimatlar",
  //       icon: null,
  //       items: [
  //         { title: "Depo T.", icon: null, path: "/kysdokumanlar/3.1" },
  //         {
  //           title: "Doküman Yönetimi T.",
  //           icon: null,
  //           path: "/kysdokumanlar/3.2",
  //         },
  //         {
  //           title: "Ekipman ve Alt Yapı Süreci T.",
  //           icon: null,
  //           path: "/kysdokumanlar/3.3",
  //         },
  //         {
  //           title: "İnsan Kaynakları T.",
  //           icon: null,
  //           path: "/kysdokumanlar/3.4",
  //         },
  //         {
  //           title: "Kalite Güvence T.",
  //           icon: null,
  //           path: "/kysdokumanlar/3.5",
  //         },
  //         {
  //           title: "Proje Yönetimi T.",
  //           icon: null,
  //           path: "/kysdokumanlar/3.6",
  //         },
  //         { title: "Satınalma T.", icon: null, path: "/kysdokumanlar/3.7" },
  //         { title: "Tasarım T.", icon: null, path: "/kysdokumanlar/3.8" },
  //         { title: "Üretim T.", icon: null, path: "/kysdokumanlar/3.9" },
  //         {
  //           title: "Yönetim Temsilcisi T.",
  //           icon: null,
  //           path: "/kysdokumanlar/3.10",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Formlar",
  //       icon: null,

  //       items: [
  //         { title: "Depo Sevkiyat F.", icon: null, path: "/kysdokumanlar/4.1" },
  //         {
  //           title: "Düzeltici Faaliyet R.",
  //           path: "/kysdokumanlar/4.2",
  //           icon: null,
  //         },
  //         {
  //           title: "Ekipman ve Alt Yapı F.",
  //           icon: null,
  //           items: [
  //             {
  //               title: "Tezgah Bakım Cetveli",
  //               icon: null,
  //               items: [
  //                 {
  //                   title: "Günlük Bakım Cetveli",
  //                   icon: null,
  //                   path: "/kysdokumanlar/4.3.1",
  //                 },
  //                 {
  //                   title: "Haftalık Bakım Cetveli",
  //                   icon: null,
  //                   path: "/kysdokumanlar/4.3.2",
  //                 },
  //                 {
  //                   title: "Aylık Bakım Cetveli",
  //                   icon: null,
  //                   path: "/kysdokumanlar/4.3.3",
  //                 },
  //                 {
  //                   title: "Yıllık Bakım Cetveli",
  //                   icon: null,
  //                   path: "/kysdokumanlar/4.3.3",
  //                 },
  //               ],
  //             },
  //             {
  //               title: "Ekipman ve Alt Yapı F.",
  //               icon: null,
  //               path: "/kysdokumanlar/4.3",
  //             },
  //           ],
  //         },
  //         {
  //           title: "İnsan Kaynakları Süreci F.",
  //           path: "/kysdokumanlar/4.4",
  //           icon: null,
  //         },
  //         {
  //           title: "İş Geliştirme ve Yönetim Süreci F.",
  //           path: "/kysdokumanlar/4.5",
  //           icon: null,
  //         },
  //         {
  //           title: "Kalite Güvence F.",
  //           path: "/kysdokumanlar/4.6",
  //           icon: null,
  //         },
  //         {
  //           title: "Proje Yönetimi ve Planlama F.",
  //           path: "/kysdokumanlar/4.7",
  //           icon: null,
  //         },
  //       ],
  //     },
  //     { title: "Listeler", icon: null, path: "/kysdokumanlar/5" },
  //     { title: "Planlar", icon: null, path: "/kysdokumanlar/6" },
  //     { title: "Etiketler", icon: null, path: "/kysdokumanlar/7" },
  //     { title: "Şemalar", icon: null, path: "/kysdokumanlar/8" },
  //     { title: "Politikalar", icon: null, path: "/kysdokumanlar/9" },

  //   ],
  // },
  {
    title: "İnsan Kaynakları",
    icon: <UserCog2 />,
    roles: [-1],
    items: [
      /* {
         title: "Eğitim",
         icon: <FaPencilAlt />,
         roles: [-1],
         items: [
           { title: "Eğitimler", path: "/egitimler" },
           { title: "Eğitim Değerlendirme Sonuçları",roles: [1,2,15], path: "/form/sonuc/0" },
           { title: "Personel Değerlendirme Sonuçları",roles: [1,2,15], path: "/form/sonuc/4" },
         ],
       },
       { title: "Yeni Form", roles: [1,2,4,9,15],icon: <FcSurvey />, path: "/form/olustur" },
       {
         title: "Form Sonuçları",
         icon: <FcFile />,
         items: [
           { title: "Tedarikçi Değerlendirme Sonuçları", path: "/form/sonuc/1" },
           { title: "Yetkinlik Değerlendirme Sonuçları", path: "/form/sonuc/2" },
           { title: "Diğer Form Sonuçları", path: "/form/sonuc/3" },
         ],
         roles: [1,2,4,9]
       },
       {
         title: "Formlar",
         icon: <FiTable />,
               roles: [1,2,15],
         items: [
           { title: "Eğitim Değerlendirme Formları", path: "/formlar/0" },
           { title: "Tedarikçi Değerlendirme Formları", path: "/formlar/1" },
           { title: "Yetkinlik Değerlendirme Formları", path: "/formlar/2" },
           { title: "Personel Değerlendirme Formları", path: "/formlar/4" },
           { title: "Diğer Formlar", path: "/formlar/3" },
         ],
       },*/
      { title: "Personeller", roles: [1, 2, 15], icon: <Users />, path: "/personeller" },/*
      { title: "Pasif Personeller",roles: [1,2,15], icon: <FiUserX />, path: "/pasifpersoneller" },
      { title: "Personel Eğitim Durumu",roles: [1,2,15], icon: <FiUsers />, path: "/PersonelEgitim" },
      {
        title: "İzin Talep Formu",
        icon: <FiUser />,
        path: "/izintalepformu",
        roles: [-1],
      },
      deneme.
      {
        title: "Fazla Mesai Talep Formu",
        icon: <FiUserPlus />,
        path: "/fazlamesai",
        roles: [-1],
      },*/
    ],
  },
  {
    title: "Ayarlar", icon: <Settings />, roles: [1, 2], items: [
      { title: "Şirketlerim", icon: <Building2 />, path: "/sirketlerim" },
      { title: "Kullanıcılar", icon: <User2 />, path: "/kullanicilar" }

    ]
  },
];




export const Sidebar: React.FC = () => {
  const { sidebarOpen, closeSidebar, collapsed, toggleCollapsed, toggleMenu, openMenus } = useUI();
  const sidebarRef = useRef<HTMLDivElement>(null);
  // const [openMenus, setOpenMenus] = useState<string[]>([]);
  const user = useSelector((state: RootState) => state.login.user);

  const handleClickOutside = (e: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
      closeSidebar();
    }
  };

  useEffect(() => {
    if (sidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  // const toggleMenu = (title: string) => {
  //   setOpenMenus((prev) =>
  //     prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]
  //   );
  // };

  const MenuList: React.FC<{ items: MenuItem[]; level?: number }> = ({
    items,
    level = 0,
  }) => {
    return (
      <div>
        {items
          .filter(
            (m) =>
              m.roles?.includes(user?.rolId) ||
              m.roles?.includes(-1) ||
              !m.roles
          )
          .map((item) => (
            <div
              key={item.title}
              style={{ paddingLeft: `${level * 18}px` }}
              className={`mb-1`}
            >
              {item.path ? (
                <NavLink
                  to={item.path}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `flex items-center  gap-2 px-3 py-2 rounded-lg transition-colors duration-200
                    ${isActive ? "bg-gradient-to-r from-blue-600 to-blue-400 text-white shadow-md" : "hover:bg-gray-700 hover:text-blue-300"}
                    ${level === 0 ? "font-semibold" : "font-normal"}`
                  }
                >
                  {item.icon && (
                    <span className="bg-gray-700 rounded-full p-2 flex items-center justify-center">
                      {item.icon}
                    </span>
                  )}
                  {!collapsed && <span>{item.title}</span>}
                </NavLink>
              ) : (
                <>
                  <button
                    onClick={() => toggleMenu(item.title)}
                    className={`flex items-center  gap-2 px-3 py-2 rounded-lg w-full transition-colors duration-200
                    hover:bg-gray-700 hover:text-blue-300
                    ${level === 0 ? "font-semibold" : "font-normal"}`}
                  >
                    {item.icon && (
                      <span className="bg-gray-700 rounded-full p-2 flex items-center justify-center">
                        {item.icon}
                      </span>
                    )}
                    <span className="flex-1 text-left">
                      {!collapsed && item.title}
                    </span>
                    {!collapsed &&
                      (openMenus.includes(item.title) ? (
                        <FiChevronDown />
                      ) : (
                        <FiChevronRight />
                      ))}
                  </button>
                  {!collapsed &&
                    openMenus.includes(item.title) &&
                    item.items && (
                      <MenuList items={item.items} level={level + 1} />
                    )}
                </>
              )}
            </div>
          ))}
      </div>
    );
  };

  return (
    <div onMouseEnter={() => collapsed && toggleCollapsed()}>
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        ></div>
      )}
      <div
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 text-white shadow-2xl transform md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }
          transition-transform duration-300 z-50 flex flex-col ${collapsed ? "w-16" : "w-64"
          }`}
      >
        {/* Logo */}
        <div className="flex items-center justify-center px-4 py-3  ">
          <NavLink to="/">
            <img
              src={collapsed ? icon : URL + "/logo-white.png"}
              alt="Logo"
              className={`transition-all duration-300 ${collapsed ? "w-8 h-8" : "w-48 h-10"}`}
            />
          </NavLink>
        </div>

        {/* Menü listesi */}
        <div className="flex-1 overflow-y-auto py-4 px-2">
          <MenuList items={menus} />
        </div>
      </div>
    </div>
  );
};
