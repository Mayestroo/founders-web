"use client";

import { useTranslation } from "@/hooks/useTranslation";

export default function Spinner() {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-95 z-50">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner Animation */}
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-[#FF2828] border-r-[#FF2828] animate-spin"
            style={{
              animationDuration: "1s",
            }}
          ></div>
        </div>

        {/* Loading Text */}
        <p className="text-gray-700 text-sm font-medium">{t("common.loading")}</p>
      </div>
    </div>
  );
}
