import React from "react";
import { useSidebar } from "@/context/GlobalSidebarContext";
import { FiX } from "react-icons/fi";
const GlobalSidebar: React.FC = () => {
  const { state, closeSidebar } = useSidebar();
  if (!state.isOpen) return null;

  const positionClasses: Record<typeof state.position, string> = {
    left: "top-0 left-0 ",
    right: "top-0 right-0 ",
    top: "top-0 left-0",
    bottom: "bottom-0 left-0 ",
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/30 z-[51] transition-opacity "
        onClick={() =>{} }
      ></div>
      <div
        className={`fixed bg-white shadow-xl z-[52] transition-transform  overflow-auto duration-300 ${
          positionClasses[state.position]
        } ${state.size}`}
      >
        <div className="relative border-b p-4 flex items-center justify-between">
            <h2 className="font-bold">{state.title}</h2>
      
          <FiX onClick={closeSidebar} size={24} />
        </div>
      
        <div className="p-4">{state.content}</div>
      </div>
    </>
  );
};

export default GlobalSidebar;
