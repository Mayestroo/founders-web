"use client";

import { createContext, useContext, ReactNode } from "react";

interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

const noop = () => {};

const LoadingContext = createContext<LoadingContextType>({
  isLoading: false,
  setIsLoading: noop,
});

export function LoadingProvider({ children }: { children: ReactNode }) {
  return (
    <LoadingContext.Provider
      value={{
        isLoading: false,
        setIsLoading: noop,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  return useContext(LoadingContext);
}
