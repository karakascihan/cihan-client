import { useTabs } from "@/context/TabsContext";
import Dashboard from "@/pages/dashboard/Dashboard";
import React, { useRef, useEffect } from "react";

export const TabsUI: React.FC = () => {
  const { tabs, activeTabId, setActiveTabId, closeTab } = useTabs();
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const activeTabEl = scrollRef.current?.querySelector<HTMLDivElement>(
      `[data-id="${activeTabId}"]`,
    );
    if (activeTabEl && scrollRef.current) {
      const parentRect = scrollRef.current.getBoundingClientRect();
      const childRect = activeTabEl.getBoundingClientRect();
      if (
        childRect.left < parentRect.left ||
        childRect.right > parentRect.right
      ) {
        scrollRef.current.scrollLeft += childRect.left - parentRect.left - 16;
      }
    }
  }, [activeTabId]);

  return (
    <div className="w-full">
      {/* Tab Headers - Sticky yapıldı */}
      <div
        ref={scrollRef}
        className="sticky top-0 z-10 flex space-x-3 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 p-1 bg-gray-50 border-b border-gray-200"
      >
        {tabs.map((tab) => (
          <div
            key={tab.id}
            data-id={tab.id}
            className={`flex items-center px-2 py-1 cursor-pointer rounded-t-lg transition-all whitespace-nowrap
              ${
                tab.id === activeTabId
                  ? "bg-blue-950 text-white shadow-md font-semibold"
                  : "bg-white text-gray-700 hover:bg-blue-950 hover:text-gray-100 hover:opacity-70"
              }`}
            onClick={() => setActiveTabId(tab.id)}
          >
            <span className="truncate max-w-xs">{tab.title}</span>
            <button
              className="ml-2 text-gray-400 hover:text-red-500 focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                closeTab(tab.id);
              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      {/* Tab Content - Sabit yükseklik ve kendi scroll'u */}
      <div className="p-2 bg-white border border-t-0 border-gray-300 rounded-b-lg shadow-sm h-[calc(100vh-60px)] overflow-y-auto">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={tab.id === activeTabId ? "block" : "hidden"}
          >
            {tab.component}
          </div>
        ))}
      </div>
    </div>
  );
};