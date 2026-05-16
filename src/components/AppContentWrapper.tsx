"use client";

import FloatingContactWidget from "@/components/FloatingContactWidget";
import { AppProps } from "next/app";
import { ContactFormProvider } from "@/context/ContactFormContext";

export default function AppContentWrapper({
  Component,
  pageProps,
  inter,
}: {
  Component: AppProps["Component"];
  pageProps: AppProps["pageProps"];
  inter: any;
}) {
  return (
    <ContactFormProvider>
      <div className={`${inter.className} antialiased`}>
        <Component {...pageProps} />
        <FloatingContactWidget />
      </div>
    </ContactFormProvider>
  );
}
