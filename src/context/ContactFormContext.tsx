"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface ContactFormContextType {
  isOpen: boolean;
  openForm: () => void;
  closeForm: () => void;
  toggleForm: () => void;
}

const ContactFormContext = createContext<ContactFormContextType | undefined>(
  undefined
);

export function ContactFormProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openForm = () => setIsOpen(true);
  const closeForm = () => setIsOpen(false);
  const toggleForm = () => setIsOpen((prev) => !prev);

  return (
    <ContactFormContext.Provider
      value={{ isOpen, openForm, closeForm, toggleForm }}
    >
      {children}
    </ContactFormContext.Provider>
  );
}

export function useContactForm() {
  const context = useContext(ContactFormContext);
  if (context === undefined) {
    throw new Error("useContactForm must be used within a ContactFormProvider");
  }
  return context;
}
