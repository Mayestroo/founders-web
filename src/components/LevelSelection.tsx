"use client";

import { useTestContext } from "@/context/TestContext";
import { useTranslation } from "@/hooks/useTranslation";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";

export default function LevelSelection() {
  const router = useRouter();
  const { setCategory } = useTestContext();
  const { t } = useTranslation();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const levels = [
    {
      id: "kids",
      title: t("common.kids"),
      description: t("common.kids_description"),
      image: "/level/kids.png",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "general",
      title: t("common.general"),
      description: t("common.general_description"),
      image: "/level/general.png",
      color: "from-purple-500 to-purple-600",
    },
  ];

  const handleContinue = () => {
    if (selectedLevel) {
      // Set category in context
      setCategory(selectedLevel as "kids" | "general");

      // Store in localStorage as backup
      localStorage.setItem("testCategory", selectedLevel);

      // Navigate to appropriate level test
      const testPath = selectedLevel === "kids" ? "/tests/level-kids" : "/tests/level-general";
      router.push(testPath);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col px-4 py-6">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl lg:text-5xl font-bold text-[#00192D] mb-6 leading-tight">
          {t("common.darajangizni_aniqlang")}
        </h1>
      </div>

      {/* Content Container */}
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="w-full max-w-5xl">
          {/* Level Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-12">
            {levels.map((level) => (
              <button
                key={level.id}
                onClick={() => setSelectedLevel(level.id)}
                className={`relative overflow-hidden rounded-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${selectedLevel === level.id ? "ring-4 ring-(--brand-red)" : ""
                  }`}
              >
                {/* Background Image */}
                <div className="relative h-80 md:h-96 w-full">
                  <Image
                    src={level.image}
                    alt={level.title}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    priority
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/40" />

                  {/* Content */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                    <h2 className="text-4xl md:text-5xl font-bold mb-3">
                      {level.title}
                    </h2>
                    <p className="text-sm md:text-base text-center px-3 max-w-xs">
                      {level.description}
                    </p>
                  </div>

                  {/* Selection Indicator */}
                  {selectedLevel === level.id && (
                    <div className="absolute top-3 right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-(--brand-red)"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={3}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={() => {
                window.location.href = "/";
              }}
              className="px-8 py-3 rounded-full bg-(--brand-red) text-white font-bold text-base transition-all hover:bg-(--brand-red)/90 active:scale-95"
            >
              {t("common.orqaga")}
            </button>
            <button
              type="button"
              onClick={handleContinue}
              disabled={!selectedLevel}
              className={`px-8 py-3 rounded-full font-bold text-base transition-all active:scale-95 ${selectedLevel
                ? "bg-(--brand-red) text-white hover:bg-(--brand-red)/90 cursor-pointer"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
            >
              {t("common.davom_etish")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
