import React, { useState, useRef, useEffect } from "react";
import { Avatar } from "./Avatar";
import { useDispatch } from "react-redux";
import { resetLoginSuccess } from "../store/slices/loginSlice";
import { useNavigate } from "react-router-dom";


interface Props {
  user: any;
}

export const UserMenu: React.FC<Props> = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <Avatar
        imageUrl="src/images/user/user2.png"   
        name={user?.name + " " + user?.surname}
        onClick={() => setIsOpen(!isOpen)}
      />
      {/* <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 text-white"
      >
        {user.name.charAt(0)}
      </button> */}

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">

            <a
              onClick={() => { navigate("/ayarlar") }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Ayarlar
            </a>
            <a
              onClick={() => { dispatch(resetLoginSuccess()); navigate('/giris'); }}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Çıkış Yap
            </a>

          </div>
        </div>
      )}
    </div>
  );
};
