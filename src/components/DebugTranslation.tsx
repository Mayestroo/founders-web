"use client";

import { useTranslation } from "@/hooks/useTranslation";
import { useEffect } from "react";

export function DebugTranslation() {
  const { locale, translations, t } = useTranslation();

  useEffect(() => {
    console.log("=== TRANSLATION DEBUG ===");
    console.log("Current locale:", locale);
    console.log("Translations loaded:", Object.keys(translations).length > 0);
    console.log("Translations keys:", Object.keys(translations));
    console.log("Test translation:", t("common.darajangizni_aniqlang"));
    console.log("=======================");
  }, [locale, translations, t]);

  return null;
}
