"use client";

import { TranslationProvider } from "@/context/TranslationContext";
import AppRouterLoadingWrapper from "@/app/AppRouterLoadingWrapper";
import { ReactNode } from "react";

export default function TranslationProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <TranslationProvider>
      <AppRouterLoadingWrapper>{children}</AppRouterLoadingWrapper>
    </TranslationProvider>
  );
}
