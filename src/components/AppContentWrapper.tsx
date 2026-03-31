"use client";

import FloatingContactWidget from "@/components/FloatingContactWidget";
import { AppProps } from "next/app";

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
    <>
      <div className={`${inter.className} antialiased`}>
        <Component {...pageProps} />
        <FloatingContactWidget />
      </div>
    </>
  );
}
