"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";

interface ModalContextType {
  isOpen: boolean;
  openModal: (propertyInfo?: string, preselectedPlan?: string) => void;
  closeModal: () => void;
  propertyInfo: string;
  preselectedPlan: string;
}

const ModalContext = createContext<ModalContextType>({
  isOpen: false,
  openModal: () => {},
  closeModal: () => {},
  propertyInfo: "",
  preselectedPlan: "",
});

export function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [propertyInfo, setPropertyInfo] = useState("");
  const [preselectedPlan, setPreselectedPlan] = useState("");

  const openModal = useCallback((info?: string, plan?: string) => {
    setPropertyInfo(info || "");
    setPreselectedPlan(plan || "");
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setPropertyInfo("");
    setPreselectedPlan("");
  }, []);

  return (
    <ModalContext.Provider value={{ isOpen, openModal, closeModal, propertyInfo, preselectedPlan }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
