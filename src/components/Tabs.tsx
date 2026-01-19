import React, { ReactNode, useState } from "react";

export interface TabItem<T = unknown> {
  key: string;
  label: string;
  data?: T;
  content: (data?: T) => ReactNode;
}

interface TabsProps<T = unknown> {
  tabs: TabItem<T>[];
  defaultActiveKey?: string;
  className?: string;
}

export function Tabs<T>({
  tabs,
  defaultActiveKey,
  className = "",
}: TabsProps<T>) {
  const [activeKey, setActiveKey] = useState(
    defaultActiveKey || tabs[0].key
  );

  const activeTab = tabs.find((t) => t.key === activeKey);

  return (
    <div className={`w-full ${className}`}>
      {/* TAB HEADER */}
      <div className="flex gap-1 border-b border-gray-200 bg-gray-100 p-1 rounded-t-md">
        {tabs.map((tab) => {
          const isActive = activeKey === tab.key;

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveKey(tab.key)}
              className={`
                px-4 py-2 text-sm font-medium rounded-md
                transition-all duration-200
                ${
                 isActive
  ? "bg-blue-50 text-blue-700 border border-blue-300 shadow-sm"
  : "bg-transparent text-gray-600 hover:bg-gray-200"
                }
              `}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT */}
      <div className="p-4 bg-white border border-t-0 border-gray-200 rounded-b-md">
        {activeTab && activeTab.content(activeTab.data)}
      </div>
    </div>
  );
}
