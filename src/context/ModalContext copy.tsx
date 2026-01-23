// components/ModalContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { Dialog } from "primereact/dialog";
import styled from "styled-components";

interface ModalData {
  id: string;
  title: string;
  maximizable?:boolean,
  maximized?:boolean,
  content: (close: (result: any) => void) => ReactNode; // Artık content bir fonksiyon
}

interface ModalContextProps {
  openModal: (modal: Omit<ModalData, "id">) => Promise<any>;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const useModal2 = () => {
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
      const id = `modal-${Date.now()}`;
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

const PrintOnlyContent = styled.div`
  /* Diğer bileşen stilleri */
`;

const DialogHeaderWrapper = styled.div`
  /* Yazdırma modunda gizlenecek stil */
  @media print {
    .p-dialog-header-no-print {
      display: none;
    }
  }
`;
  return (
    <ModalContext.Provider value={{ openModal }}>
      {children}
      {modals.map((modal) => (
        <DialogHeaderWrapper>
        <Dialog
          key={modal.id}
          header={modal.title}
          visible
          maximized={modal.maximized}
          maximizable={modal.maximizable}
          modal
          style={{ width: "50vw" }}
          pt={{
                    // "header" bölümünü seçiyoruz
                    header: {
                        className: 'p-dialog-header-no-print'
                    }
                }}
          onHide={() => closeModal(modal.id, null)}
           maskClassName="no-print"

        >
          {modal.content((result) => closeModal(modal.id, result))}
        </Dialog>
        </DialogHeaderWrapper>
      ))}
    </ModalContext.Provider>
  );
};
