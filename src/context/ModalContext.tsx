// components/ModalContext.tsx
import React, {
  createContext,
  CSSProperties,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { Dialog } from "primereact/dialog";

interface ModalData {
  id: string;
  title: string;
  maximizable?:boolean,
  maximized?:boolean,
  content: (close: (result: any) => void) => ReactNode; // Artık content bir fonksiyon,
  style?: CSSProperties
}

interface ModalContextProps {
  openModal: (modal: Omit<ModalData, "id">) => Promise<any>;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return ctx;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [modals, setModals] = useState<
    (ModalData & { resolve: (result: any) => void })[]
  >([]);
  const openModal = (modal: Omit<ModalData, "id">) => {
    return new Promise<any>((resolve) => {
      const id = `modal-${Date.now()}-${Math.random()}`;
      const modalWithId = {
        ...modal,
        id,
        resolve,
      };
      setModals((prev) => [...prev, modalWithId]);
    });
  };

  const closeModal = (id: string, result: any) => {
    setModals((prev) => {
      const modal = prev.find((m) => m.id === id);
      if (modal) {
        modal.resolve(result);
      }
      return prev.filter((m) => m.id !== id);
    });
  };

  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
      {modals.map((modal) => (
        <Dialog
          key={modal.id}
          header={modal.title}
          visible
          maximized={modal.maximized}
          maximizable={modal.maximizable}
          modal
          style={modal.style? modal.style: { width: "50vw" }}
          onHide={() => closeModal(modal.id, null)}
         
        >
          {modal.content((result) => closeModal(modal.id, result))}
        </Dialog>
      ))}
    </ModalContext.Provider>
  );
};
