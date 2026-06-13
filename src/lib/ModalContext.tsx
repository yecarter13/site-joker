"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface ModalContextType {
  isOpen: boolean;
  openModal: (propertyInfo?: string) => void;
  closeModal: () => void;
  propertyInfo: string;
}

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  propertyInfo: "",
});

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [propertyInfo, setPropertyInfo] = useState("");

  const openModal = useCallback((info?: string) => {
    setPropertyInfo(info || "");
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setPropertyInfo("");
  }, []);

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, propertyInfo }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
