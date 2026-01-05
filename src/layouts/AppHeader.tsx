import React, { useEffect, useRef, useState } from "react";
import { FiMenu, FiBell } from "react-icons/fi";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { RootState } from "../store/store";

import Badge from "./../ui/badge/Badge";
import { UserMenu } from "./../components/UserMenu";
import MenuButton, { MenuItem } from "./../components/MenuButton";
import { apiRequest } from "@/services/apiRequestService";
import { ApiResponseClient } from "@/types/apiResponse";
import { URL } from "@/api";
import { useSidebar } from "@/context/SidebarContext";

export const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);
  const { toggleSidebar } = useSidebar();

  const userData = useSelector((state: RootState) => state.login.user);
  const loginState = useSelector((state: RootState) => state.login);

  const [educationState, setEducationState] = useState(0);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    apiRequest<ApiResponseClient<number>>(
      "GET",
      URL + "/education/GetAssignToPersonel?state=0",
      { Authorization: "Bearer " + loginState.accessToken }
    ).then((result) => {
      if (result?.isSuccess) setEducationState(result.result);
    });
  }, [loginState.accessToken]);

  const buttons: MenuItem[] = [];
  if (educationState !== 0) {
    buttons.push({
      icon: <FiBell />,
      label: `Tarafınıza atanmış ${educationState} adet eğitim bulunmaktadır.`,
      onClick: () => navigate("/egitimler"),
    });
  }

  return (
    <header className="sticky top-0 flex w-full bg-white border-b border-gray-200 z-50 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex items-center justify-between w-full px-6 py-4">
        {/* SOL - Toggle Button */}
        <button
          className="flex items-center justify-center w-11 h-11 text-gray-500 border border-gray-200 rounded-lg dark:border-gray-800 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <FiMenu size={20} />
        </button>

        {/* ORTA - Search */}
        <div className="flex-1 max-w-2xl mx-6">
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <span className="absolute -translate-y-1/2 pointer-events-none left-4 top-1/2">
                <svg className="fill-gray-500 dark:fill-gray-400" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.04175 9.37363C3.04175 5.87693 5.87711 3.04199 9.37508 3.04199C12.8731 3.04199 15.7084 5.87693 15.7084 9.37363C15.7084 12.8703 12.8731 15.7053 9.37508 15.7053C5.87711 15.7053 3.04175 12.8703 3.04175 9.37363ZM9.37508 1.54199C5.04902 1.54199 1.54175 5.04817 1.54175 9.37363C1.54175 13.6991 5.04902 17.2053 9.37508 17.2053C11.2674 17.2053 13.003 16.5344 14.357 15.4176L17.177 18.238C17.4699 18.5309 17.9448 18.5309 18.2377 18.238C18.5306 17.9451 18.5306 17.4703 18.2377 17.1774L15.418 14.3573C16.5365 13.0033 17.2084 11.2669 17.2084 9.37363C17.2084 5.04817 13.7011 1.54199 9.37508 1.54199Z"
                    fill=""
                  />
                </svg>
              </span>
              <input
                ref={inputRef}
                type="text"
                placeholder="Ara..."
                className="h-11 w-full rounded-lg border border-gray-200 bg-transparent py-2.5 pl-12 pr-4 text-sm text-gray-800 shadow-sm placeholder:text-gray-400 focus:border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500/10 dark:border-gray-800 dark:bg-white/[0.03] dark:text-white/90 dark:placeholder:text-white/30"
              />
            </div>
          </form>
        </div>

        {/* SAĞ - Notifications & User */}
        <div className="flex items-center gap-3">
          <MenuButton
            items={buttons}
            buttonIcon={
              <div className="relative">
                <FiBell size={22} />
                {educationState !== 0 && (
                  <div className="absolute -top-1 -right-1">
                    <Badge variant="solid" color="error" size="sm">
                      {educationState}
                    </Badge>
                  </div>
                )}
              </div>
            }
          />
          <UserMenu user={userData} />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;