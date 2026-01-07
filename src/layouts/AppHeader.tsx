// import React, { useEffect, useRef, useState } from "react";
// import { FiBell } from "react-icons/fi";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import type { RootState } from "../store/store";

// import Badge from "./../ui/badge/Badge";
// import MenuButton, { MenuItem } from "./../components/MenuButton";
// import { apiRequest } from "@/services/apiRequestService";
// import { ApiResponseClient } from "@/types/apiResponse";
// import { URL } from "@/api";
// import { useSidebar } from "@/context/SidebarContext";
// import { PanelLeft, Search } from "lucide-react";
// import { Avatar } from "@/components/Avatar";
// import UserMenu2 from "@/components/UserMenu2";
// import NotificationDropdown from "@/components/NotificationDropdown";

// export const AppHeader: React.FC = () => {
//   const navigate = useNavigate();
//   const inputRef = useRef<HTMLInputElement>(null);
//   const { toggleSidebar } = useSidebar();

//   const userData = useSelector((state: RootState) => state.login.user);
//   const loginState = useSelector((state: RootState) => state.login);

//   const [educationState, setEducationState] = useState(0);

//   useEffect(() => {
//     const handleKeyDown = (event: KeyboardEvent) => {
//       if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
//         event.preventDefault();
//         inputRef.current?.focus();
//       }
//     };
//     document.addEventListener("keydown", handleKeyDown);
//     return () => document.removeEventListener("keydown", handleKeyDown);
//   }, []);

//   useEffect(() => {
//     apiRequest<ApiResponseClient<number>>(
//       "GET",
//       URL + "/education/GetAssignToPersonel?state=0",
//       { Authorization: "Bearer " + loginState.accessToken }
//     ).then((result) => {
//       if (result?.isSuccess) setEducationState(result.result);
//     });
//   }, [loginState.accessToken]);

//   const buttons: MenuItem[] = [];
//   if (educationState !== 0) {
//     buttons.push({
//       icon: <FiBell />,
//       label: `Tarafınıza atanmış ${educationState} adet eğitim bulunmaktadır.`,
//       onClick: () => navigate("/egitimler"),
//     });
//   }

//   return (
//     <header className="sticky top-0 z-50 w-full
//     bg-white/85 backdrop-blur
//     border-b border-slate-200
//     shadow-[0_1px_0_rgba(15,23,42,0.06)]
//   ">
//       <div className="flex items-center justify-between px-6 py-4">

//         <div className="flex items-center gap-4">
//           <button
//             className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 transition-colors
//                        dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-800"
//             onClick={toggleSidebar}
//             aria-label="Toggle Sidebar"
//           >
//             <PanelLeft size={20} style={{ stroke: "#798FB8" }} />
//           </button>

//           <form onSubmit={(e) => e.preventDefault()}>
//             <div className="relative w-72">
//               <span className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
//                 <Search
//                   size={18}
//                   className="text-gray-500 dark:text-gray-400"
//                 />
//               </span>


//               <input
//                 ref={inputRef}
//                 type="text"
//                 placeholder="Ara..."
//                 className="h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-4 text-sm
//                            text-gray-800 shadow-sm placeholder:text-gray-400
//                            focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/10
//                            dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30"
//               />
//             </div>
//           </form>
//         </div>

//         <div className="flex items-center gap-3">
//           <NotificationDropdown>
//             <div className="relative">
//               <Avatar
//                 imageUrl="src/images/notification-bell.png"
//                 className="gap-0"
//                 avatarClassName="w-6 h-6 rounded-none border-0 bg-transparent ring-0 hover:ring-0 mt-2"
//                 nameClassName="hidden"
//               />
//               {educationState !== 0 && (
//                 <div className="absolute -top-1 -right-1">
//                   <Badge variant="solid" color="error" size="sm">
//                     {educationState}
//                   </Badge>
//                 </div>
//               )}
//             </div>
//           </NotificationDropdown>

//           <UserMenu2 user={userData} />
//         </div>


//       </div>
//     </header>
//   );
// };
// export default AppHeader;