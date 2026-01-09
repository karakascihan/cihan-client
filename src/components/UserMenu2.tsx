import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { Avatar } from "./Avatar";
import { Dropdown } from "../ui/dropdown/Dropdown";
import { DropdownItem } from "../ui/dropdown/DropdownItem";
import { resetLoginSuccess } from "../store/slices/loginSlice";
import { LogOut, Settings } from "lucide-react";
import { URL } from "@/api";

interface Props {
    user: any;
}

export const UserMenu2: React.FC<Props> = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toggleDropdown = () => setIsOpen((p) => !p);
    const closeDropdown = () => setIsOpen(false);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fullName = `${user?.name ?? ""} ${user?.surname ?? ""}`.trim();
    const email = user?.email ?? user?.mail ?? "";

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={toggleDropdown}
                className="flex items-center text-gray-700 dropdown-toggle dark:text-gray-400"
                type="button"
            >
                <span className="mr-3 mt-3 overflow-hidden rounded-full h-11 w-11">
                    <Avatar imageUrl= {URL+"/user2.png"} />
                </span>

                <span className="block mr-1 font-medium text-theme-sm">
                    {fullName || "Kullanıcı"}
                </span>

                <svg
                    className={`stroke-gray-500 dark:stroke-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                    width="18"
                    height="20"
                    viewBox="0 0 18 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M4.3125 8.65625L9 13.3437L13.6875 8.65625"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            </button>

            <Dropdown
                isOpen={isOpen}
                onClose={closeDropdown}
                className="absolute right-0 mt-[17px] flex w-[260px] flex-col rounded-2xl border border-gray-200 bg-white p-3 shadow-theme-lg dark:border-gray-800 dark:bg-gray-dark z-50"
            >
                <div>
                    <span className="block font-medium text-gray-700 text-theme-sm dark:text-gray-400 ml-4">
                        {fullName || "Kullanıcı"}
                    </span>
                    {email ? (
                        <span className="mt-0.5 ml-4 block text-theme-xs text-gray-500 dark:text-gray-400">
                            {email}
                        </span>
                    ) : null}
                </div>

                <ul className="flex flex-col gap-1 pt-4 pb-3 border-b border-gray-200 dark:border-gray-800">
                    <li>

                        <DropdownItem
                            onItemClick={() => {
                                closeDropdown();
                                navigate("/ayarlar");
                            }}
                            tag="button"
                            className="
                            w-full text-left
                            flex items-center gap-3
                            px-3 py-2
                            font-medium text-theme-sm
                            text-gray-700
                            rounded-lg
                            hover:bg-gray-100
                            dark:text-gray-400
                            dark:hover:bg-white/5
                            transition-colors
                            "
                        >
                            <Settings
                                size={20}
                                className="text-gray-500 group-hover:text-gray-700 dark:text-gray-400"
                            />
                            Ayarlar
                        </DropdownItem>
                    </li>
                </ul>

                <DropdownItem
                    onItemClick={() => {
                        closeDropdown();
                        dispatch(resetLoginSuccess());
                        navigate("/giris");
                    }}
                    tag="button"
                    className="
                    w-full text-left
                    flex items-center gap-3
                    px-3 py-2 mt-3
                    font-medium text-theme-sm
                    text-gray-700
                    rounded-lg
                    hover:bg-red-50 hover:text-red-600
                    dark:text-gray-400
                    dark:hover:bg-red-500/10 dark:hover:text-red-400
                    transition-colors
                    "
                >
                    <LogOut
                        size={20}
                        className="text-gray-500 group-hover:text-red-600 dark:text-gray-400"
                    />
                    Çıkış Yap
                </DropdownItem>
            </Dropdown>
        </div>
    );
};
export default UserMenu2;