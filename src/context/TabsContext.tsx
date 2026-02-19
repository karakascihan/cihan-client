import CrmDashboard from '@/pages/dashboard/CrmDashboardPage';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Tab {
  id: string;
  title: string;
  component: ReactNode;
}

interface TabsContextType {
  tabs: Tab[];
  activeTabId: string | null;
  openTab: (tab: Tab) => void;
  closeTab: (id: string) => void;
  setActiveTabId: (id: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const TabsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tabs, setTabs] = useState<Tab[]>([{
    id: "/",
    title: "Anasayfa",
    component: <CrmDashboard />
  }]);
  const [activeTabId, setActiveTabId] = useState<string | null>("/");

  const openTab = (tab: Tab) => {
    setTabs(prev => {
      if (prev.find(t => t.id === tab.id)) return prev;
      return [...prev, tab];
    });
    setActiveTabId(tab.id);
  };

  const closeTab = (id: string) => {
    if (tabs.length == 1) return;
    setTabs(prev => prev.filter(t => t.id !== id));
    if (activeTabId === id) {
      const remaining = tabs.filter(t => t.id !== id);
      setActiveTabId(remaining.length ? remaining[remaining.length - 1].id : null);
    }
  };

  return (
    <TabsContext.Provider value={{ tabs, activeTabId, openTab, closeTab, setActiveTabId }}>
      {children}
    </TabsContext.Provider>
  );
};

export const useTabs = () => {
  const context = useContext(TabsContext);
  if (!context) throw new Error('useTabs must be used within a TabsProvider');
  return context;
};
