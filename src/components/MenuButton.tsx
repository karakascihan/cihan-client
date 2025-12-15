import React, { useEffect, useRef, useState, ReactNode } from "react";
import { MoreVertical } from "lucide-react";

export interface MenuItem {
  label: string;
  onClick: () => void;
  icon?: ReactNode;
  divider?: boolean;
}

interface MenuButtonProps {
  items: MenuItem[];
  buttonIcon?: ReactNode;
}

const MenuButton: React.FC<MenuButtonProps> = ({ items, buttonIcon }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative inline-block text-left">
      {/* Menü ikonu */}
      <button
        onClick={() => items.length > 0 && setIsOpen((prev) => !prev)}
        className="p-2 rounded-full hover:bg-gray-200 transition"
      >
        {buttonIcon || <MoreVertical className="w-5 h-5 text-gray-700" />}
      </button>

      {/* Açılır Menü */}
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {items.map((item, index) => (
              <React.Fragment key={index}>
                {item.divider && (
                  <div className="border-t border-gray-200 my-1" />
                )}
                <button
                  onClick={() => {
                    item.onClick();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 w-full text-left transition"
                  style={{ cursor: "pointer" }}
                >
                  {item.icon && <span className="w-4 h-4">{item.icon}</span>}
                  {item.label}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuButton;
