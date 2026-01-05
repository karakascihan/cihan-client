import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { useSidebar } from "./../context/SidebarContext";
import icon from "../images/logo/favicon.ico";
import { URL } from "@/api";

import {
    BoxCubeIcon,
    CalenderIcon,
    ChevronDownIcon,
    GridIcon,
    HorizontaLDots,
    ListIcon,
    PageIcon,
    PieChartIcon,
    PlugInIcon,
    TableIcon,
    UserCircleIcon,
  } from "../icons";

import {
  Home,
  Users,
  Settings,
  FileMinus,
  Warehouse,
  Boxes,
  Coins,
  FileText,
  FilePlus2,
  FileSpreadsheet,
  ChevronDown,
  ChevronRight,
  Calendar,
  CalendarDays,
  Building2,
  User,
  UserCog,
  UserCheck,
} from "lucide-react";
import { FaFileCirclePlus } from "react-icons/fa6";
import { LuUser } from "react-icons/lu";




/** -------- TYPES -------- */
interface MenuItem {
    title: string;
    icon?: React.ReactNode;
    path?: string;
    roles?: number[];
    items?: MenuItem[];
}

/*MENU DATA*/
const menus: MenuItem[] = [{
    title: "Anasayfa",
    icon: <Home/>,
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
    title: "CRM", icon: <LuUser />,
    roles: [1, 2],
    items: [
        { title: "Fırsatlar", icon: <Coins className="w-4 h-4 text-yellow-500" />, path: "/firsatlar" }
        , { title: "Müşteriler", icon: <Building2 className="w-4 h-4 text-blue-500" />, path: "/musteriler" }
        , { title: "Aktiviteler", icon: <CalendarDays className="w-4 h-4 text-green-500" />, path: "/aktiviteler" }
        , { title: "Teklifler", icon: <FileSpreadsheet  className="w-4 h-4 text-purple-500" />, path: "/teklifler" }
        , { title: "Sözleşmeler", icon: <FileText className="w-4 h-4 text-purple-500" />, path: "/sozlesmeler" }
        , { title: "Siparişler", icon: <FileText className="w-4 h-4 text-purple-500" />, path: "/siparisler" }
        , { title: "Yeni Sipariş", icon: <FilePlus2 className="w-4 h-4 text-blue-600" />, path: "/yenisiparis" }
        , { title: "Yeni Teklif", icon: <FaFileCirclePlus className="w-4 h-4 text-blue-600" />, path: "/yeniteklif" }
        , { title: "Takvim", icon: <Calendar className="w-4 h-4 text-gray-600" />, path: "/takvim" }]

},
{
    title: "Ürün Yönetimi",
    icon: <Warehouse />,
    roles: [-1],
    items: [
        {
            title: "Ürün Fiyat Listesi",
            icon: <FileMinus />,
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
    icon: <UserCog/>,
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
    title: "Ayarlar", icon: <Settings />, roles: [1, 2], items: [{
        title: "Şirketlerim", icon: <Building2 />, path: "/sirketlerim"
    }]
},
];

/*HELPERS*/
const hasAccess = (item: MenuItem, userRoleId?: number) => {
    if (!item.roles || item.roles.length === 0) return true;
    if (item.roles.includes(-1)) return true;
    if (userRoleId == null) return false;
    return item.roles.includes(userRoleId);
};

const filterByRole = (items: MenuItem[], userRoleId?: number): MenuItem[] => {
    return items
        .filter((m) => hasAccess(m, userRoleId))
        .map((m) => ({ ...m, items: m.items ? filterByRole(m.items, userRoleId) : undefined }))
        .filter((m) => (m.path ? true : !!(m.items && m.items.length > 0)));
};

const containsActivePath = (item: MenuItem, pathname: string): boolean => {
    if (item.path && item.path === pathname) return true;
    if (!item.items) return false;
    return item.items.some((x) => containsActivePath(x, pathname));
};

const makeKey = (chain: string[]) => chain.join("::");

type RowProps = {
    item: MenuItem;
    level: number;
    showText: boolean;
    opened: boolean;
    hasChildren: boolean;
    onToggle: () => void;
};

const Row = React.memo(function Row({
    item,
    level,
    showText,
    opened,
    hasChildren,
    onToggle,
}: RowProps) {
    const base = "w-full flex items-center gap-3 rounded-lg transition-colors";
    const pad = "px-3 py-2";
    const justify = showText ? "justify-start" : "justify-center";
    const iconWrap = "shrink-0 inline-flex items-center justify-center rounded-md";
    const titleClass = level === 0 ? "text-lg font-semibold" : "text-lg font-medium";

    if (hasChildren) {
        return (
            <button
                type="button"
                onClick={onToggle}
                className={`${base} ${pad} ${justify} ${opened ? "bg-gray-100 dark:bg-gray-800" : "hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`}
            >
                <span className={iconWrap}>{item.icon}</span>

                {showText && (
                    <span className={`${titleClass} text-gray-900 dark:text-gray-100`}>{item.title}</span>
                )}

                {showText && (
                    <span className="ml-auto text-gray-500 dark:text-gray-300">
                        {opened ? <ChevronDown /> : <ChevronRight />}
                    </span>
                )}
            </button>
        );
    }

    if (item.path) {
        return (
            <NavLink
                to={item.path}
                className={({ isActive }) =>
                    `${base} ${pad} ${justify} ${isActive
                        ? "bg-gradient-to-r from-pink-600 to-blue-500 text-white shadow-sm"
                        : "text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800"
                    }`
                }
            >
                <span className={iconWrap}>{item.icon}</span>
                {showText && <span className={titleClass}>{item.title}</span>}
            </NavLink>
        );
    }

    return null;
});

export const AppSidebar: React.FC = () => {
    const { pathname } = useLocation();
    const user = useSelector((state: RootState) => state.login.user);

    const { isExpanded, isHovered, setIsHovered } = useSidebar();

    const showText = isExpanded || isHovered;

    const visibleMenus = useMemo(() => filterByRole(menus, user?.rolId), [user?.rolId]);

    const [openMap, setOpenMap] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const next: Record<string, boolean> = {};
        const walk = (items: MenuItem[], chain: string[]) => {
            items.forEach((item, idx) => {
                const currentChain = [...chain, `${idx}-${item.title}-${item.path ?? ""}`];
                const key = makeKey(currentChain);

                if (item.items?.length) {
                    if (containsActivePath(item, pathname)) next[key] = true;
                    walk(item.items, currentChain);
                }
            });
        };

        walk(visibleMenus, ["root"]);
        setOpenMap((prev) => ({ ...prev, ...next }));
    }, [pathname, visibleMenus]);

    const toggleKey = useCallback((key: string) => {
        setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }));
    }, []);

    const renderMenu = useCallback(
        (items: MenuItem[], chain: string[] = ["root"], level = 0) => (
            <ul className="flex flex-col gap-2">
                {items.map((item, idx) => {
                    const currentChain = [...chain, `${idx}-${item.title}-${item.path ?? ""}`];
                    const key = makeKey(currentChain);

                    const hasChildren = !!item.items?.length;
                    const opened = !!openMap[key];

                    return (
                        <li key={key}>
                            <Row
                                item={item}
                                level={level}
                                showText={showText}
                                opened={opened}
                                hasChildren={hasChildren}
                                onToggle={() => toggleKey(key)}
                            />

                            {hasChildren && showText && (
                                <div
                                    className={`grid transition-[grid-template-rows] duration-200 ease-in-out ${opened ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                                        }`}
                                    style={{ willChange: opened ? "grid-template-rows" : "auto" }}
                                >
                                    <div className="overflow-hidden">
                                        <div className="mt-1.5 ml-4 pl-3 border-l border-gray-200 dark:border-gray-700">
                                            {renderMenu(item.items!, currentChain, level + 1)}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </li>
                    );
                })}
            </ul>
        ),
        [openMap, showText, toggleKey]
    );

    return (
        <aside
            className="h-screen border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100"
            style={{
                width: showText ? "290px" : "90px",
                transition: "width 200ms cubic-bezier(0.4, 0, 0.2, 1)",
                willChange: "width",
            }}
            onMouseEnter={() => !isExpanded && setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Logo */}
            <div className={`py-6 px-5 flex ${showText ? "justify-start" : "justify-center"}`}>
                <Link to="/">
                    {showText ? (
                        <img
                            src={URL + "/logo-white.png"}
                            alt="Logo"
                            className="block w-55 h-auto"
                            style={{ display: "block" }}
                            width={150}
                            height={40}
                        />
                    ) : (
                        <img src={icon} alt="Logo" width={32} height={32} />
                    )}
                </Link>
            </div>

            {/* Menu */}
            <div className="px-5 pb-6 flex flex-col overflow-y-auto no-scrollbar">
                <div className="mb-6">
                    <h2 className={`mb-4 text-md uppercase text-gray-400 ${showText ? "text-left" : "text-center"}`}>
                        {showText ? "Menu" : "•••"}
                    </h2>

                    {renderMenu(visibleMenus)}
                </div>
            </div>
        </aside>
    );
};

export default AppSidebar;