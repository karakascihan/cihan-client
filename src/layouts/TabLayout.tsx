import React, { useState } from 'react';
import { TabsUI } from './TabsUI';

interface Tab {
  id: string;
  title: string;
  component: React.ReactNode;
}

export default function ERPApp() {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  const openTab = (tab: Tab) => {
    setTabs((prev) => {
      if (prev.find((t) => t.id === tab.id)) return prev; // zaten açık
      return [...prev, tab];
    });
    setActiveTabId(tab.id);
  };

  const closeTab = (tabId: string) => {
    setTabs((prev) => prev.filter((t) => t.id !== tabId));
    if (activeTabId === tabId) {
      const remainingTabs = tabs.filter((t) => t.id !== tabId);
      setActiveTabId(remainingTabs.length ? remainingTabs[remainingTabs.length - 1].id : null);
    }
  };

  return (
    <div className="p-4 space-y-4">
      <div className="space-x-2">
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          onClick={() =>
            openTab({ id: '/dashboard', title: 'Dashboard', component: <DashboardPage /> })
          }
        >
          Aç Dashboard
        </button>
        <button
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          onClick={() =>
            openTab({ id: '/orders', title: 'Orders', component: <OrdersPage /> })
          }
        >
          Aç Orders
        </button>
        <button
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
          onClick={() =>
            openTab({ id: '/customers', title: 'Customers', component: <CustomersPage /> })
          }
        >
          Aç Customers
        </button>
        <button
          className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition"
          onClick={() =>
            openTab({ id: '/reports', title: 'Reports', component: <ReportsPage /> })
          }
        >
          Aç Reports
        </button>
      </div>

      <TabsUI
        tabs={tabs}
        activeTabId={activeTabId}
        setActiveTabId={setActiveTabId}
        closeTab={closeTab}
      />
    </div>
  );
}
