import "@/app/globals.css";
import FloatingContactWidget from "@/components/FloatingContactWidget";
import { TranslationProvider } from "@/context/TranslationContext";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import { TestProvider } from "@/context/TestContext";
import { LoadingProvider } from "@/context/LoadingContext";
import AppContentWrapper from "@/components/AppContentWrapper";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <TranslationProvider>
      <TestProvider>
        <LoadingProvider>
          <AppContentWrapper Component={Component} pageProps={pageProps} inter={inter} />
        </LoadingProvider>
      </TestProvider>
    </TranslationProvider>
  );
}
