import { ProgressSpinner } from 'primereact/progressspinner';
import React, { createContext, useState, useContext } from 'react';
import { useSidebar2 } from './SidebarContext2';

const LoadingContext = createContext<{
  loading: boolean;
  setLoading: (v: boolean) => void;
}>({
  loading: false,
  setLoading: () => {}
});

export const useLoading = () => useContext(LoadingContext);

export function LoadingProvider({ children }: React.PropsWithChildren) {
  const {isExpanded} = useSidebar2();
  const [loading, setLoading] = useState(false);
  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
      {loading && (!isExpanded ? 
      // <div className="fixed ml-16 mt-16 inset-0 flex items-center justify-center bg-gray-100 z-50000">
      <div className="fixed   inset-0 flex items-center justify-center opacity-50 bg-gray-50 z-50000">
      <ProgressSpinner />
    </div>: 
      // <div className="fixed ml-16 mt-16 inset-0 flex items-center justify-center bg-gray-100 z-50000">
    <div className="fixed   inset-0 flex items-center justify-center opacity-50 bg-gray-50 z-50000">
      <ProgressSpinner />
    </div>)}
    </LoadingContext.Provider>
  );
}
export function GlobalLoader() {
  
  return (
    <div className="fixed ml-64 inset-0 flex items-center justify-center bg-gray-100 z-50">
      <ProgressSpinner />
    </div>
  );
}


