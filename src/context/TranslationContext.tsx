"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  ReactNode,
} from "react";
import enCommon from "../../public/locales/en/common/common.json";
import ruCommon from "../../public/locales/ru/common/common.json";
import uzCommon from "../../public/locales/uz/common/common.json";

type Translations = Record<string, any>;

const DEFAULT_LOCALE = "uz";
const LOCALE_STORAGE_KEY = "locale";

const locales: Record<string, Translations> = {
  uz: uzCommon as Translations,
  en: enCommon as Translations,
  ru: ruCommon as Translations,
};

type TranslationContextType = {
  translations: Translations;
  locale: string;
  loading: boolean;
  t: (key: string) => string;
  changeLanguage: (lng: string) => void;
};

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export function TranslationProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState(DEFAULT_LOCALE);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const savedLocale = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (savedLocale && locales[savedLocale]) {
      setLocale(savedLocale);
    }

    const handlePageShow = (event: PageTransitionEvent) => {
      if (event.persisted) {
        window.location.reload();
      }
    };

    window.addEventListener("pageshow", handlePageShow);

    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  const changeLanguage = useCallback((lng: string) => {
    if (!locales[lng]) {
      return;
    }

    if (typeof window !== "undefined") {
      localStorage.setItem(LOCALE_STORAGE_KEY, lng);
    }

    setLocale(lng);
  }, []);

  const translations = useMemo(() => locales[locale] || locales[DEFAULT_LOCALE], [locale]);

  const t = useCallback(
    (key: string): string => {
      const normalizedKey = key.replace(/\[(\d+)\]/g, ".$1");
      const keys = normalizedKey.split(".").filter(Boolean);
      let value: any = translations;

      for (const nestedKey of keys) {
        if (value && typeof value === "object" && nestedKey in value) {
          value = value[nestedKey];
        } else {
          return key;
        }
      }

      if (typeof value === "string") {
        return value;
      }

      if (typeof value === "number" || typeof value === "boolean") {
        return String(value);
      }

      return key;
    },
    [translations],
  );

  const contextValue = useMemo(
    () => ({
      translations,
      locale,
      loading: false,
      t,
      changeLanguage,
    }),
    [translations, locale, t, changeLanguage],
  );

  return <TranslationContext.Provider value={contextValue}>{children}</TranslationContext.Provider>;
}

export function useTranslation() {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within TranslationProvider");
  }

  return {
    ...context,
    i18n: {
      changeLanguage: context.changeLanguage,
      language: context.locale,
    },
  };
}
