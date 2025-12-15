import React, { createContext, useContext, useState, ReactNode } from "react";

type ConfirmOptions = {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
};

type ConfirmContextType = {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
};

const ConfirmContext = createContext<ConfirmContextType | undefined>(undefined);

export const useConfirm = () => {
  const context = useContext(ConfirmContext);
  if (!context) throw new Error("useConfirm must be used within ConfirmProvider");
  return context.confirm;
};

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [resolver, setResolver] = useState<(value: boolean) => void>();

  const confirm = (opts: ConfirmOptions) => {
    setOptions(opts);
    return new Promise<boolean>((resolve) => {
      setResolver(() => resolve);
    });
  };

  const handleClose = (result: boolean) => {
    resolver?.(result);
    setOptions(null);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {options && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.5)] flex items-center justify-center " style={{zIndex:1200}}>
          <div className="bg-white p-6 rounded-lg max-w-md w-full shadow-lg">
            <h2 className="text-lg font-semibold mb-3">{options.title || "Onayla"}</h2>
            <p className="mb-5 text-gray-700">{options.message}</p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => handleClose(false)}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded"
              >
                {options.cancelText || "İptal"}
              </button>
              <button
                onClick={() => handleClose(true)}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded"
              >
                {options.confirmText || "Onayla"}
              </button>
            </div>
          </div>
        </div>
      )}
    </ConfirmContext.Provider>
  );
};
