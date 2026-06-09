"use client";

import { DownloadIcon } from "@/components/InlineIcons";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

const levels = [
  "BEGINNER",
  "ELEMENTARY",
  "INTERMEDIATE",
  "UPPER-INTERMEDIATE",
  "ADVANCED",
];

const books = ["STUDENT BOOKS", "WORK BOOKS"];

const videoItems = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
}));

export default function VideoMaterialsLibrary() {
  const { t } = useTranslation();
  const levelLabels: Record<string, string> = {
    BEGINNER: t("materials.beginner"),
    ELEMENTARY: t("materials.elementary"),
    INTERMEDIATE: t("materials.intermediate"),
    "UPPER-INTERMEDIATE": t("materials.upper_intermediate"),
    ADVANCED: t("materials.advanced"),
  };
  const bookLabels: Record<string, string> = {
    "STUDENT BOOKS": t("materials.student_books"),
    "WORK BOOKS": t("materials.work_books"),
  };
  const [selectedLevel, setSelectedLevel] = useState(levels[1]);
  const [selectedBook, setSelectedBook] = useState(books[0]);

  return (
    <section className="w-full bg-white px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-10 lg:pb-24">
      <div className="mx-auto max-w-360 px-6 sm:px-8">
        <div className="text-center">
           <h1 className="text-4xl font-bold text-(--brand-dark) md:text-5xl lg:text-5xl">
             {t("materials.video_materials")}
           </h1>
           <p className="mt-3 text-base text-(--brand-dark) md:text-lg">
             {t("materials.tagline")}
           </p>
         </div>

         <div className="mt-8 rounded-[24px] bg-(--brand-red) px-5 py-6 sm:px-7 sm:py-7 lg:px-10">
           <h2 className="text-center text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
             {t("materials.choose_level")}
           </h2>

          <div className="mt-5 flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {levels.map((level) => {
              const isActive = selectedLevel === level;

              return (
                <button
                  key={level}
                  type="button"
                  onClick={() => setSelectedLevel(level)}
                  className={`inline-flex h-10 items-center rounded-full px-5 text-sm font-bold transition-colors sm:h-11 sm:px-6 sm:text-2xl ${
                    isActive
                      ? "bg-(--brand-dark) text-white"
                      : "bg-white text-(--brand-dark)"
                  }`}
                >
                  {levelLabels[level]}
                  <span className="ml-2">→</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-2.5 rounded-[22px] bg-(--brand-red) px-5 py-4 sm:px-7 sm:py-5 lg:px-10">
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-3">
            {books.map((book) => {
              const isActive = selectedBook === book;

              return (
                <button
                  key={book}
                  type="button"
                  onClick={() => setSelectedBook(book)}
                  className={`inline-flex h-10 items-center rounded-full px-5 text-sm font-bold transition-colors sm:h-11 sm:px-6 sm:text-2xl ${
                    isActive
                      ? "bg-(--brand-dark) text-white"
                      : "bg-white text-(--brand-dark)"
                  }`}
                >
                  {bookLabels[book]}
                  <span className="ml-2">→</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-2.5 sm:mt-8 sm:gap-3 md:grid-cols-3 lg:grid-cols-4 lg:gap-4">
          {videoItems.map((item) => {
            const title = t("materials.video_item_title", { number: item.id });

            return (
            <article
              key={item.id}
              className="relative aspect-3/3.5 overflow-hidden rounded-[12px] bg-[#e8d8db]"
              aria-label={title}
            >
              <button
                type="button"
                aria-label={t("materials.download_item_aria", { name: title })}
                className="absolute bottom-2.5 right-2.5 grid h-7 w-7 place-items-center rounded-full bg-(--brand-dark) text-white sm:bottom-3 sm:right-3"
              >
                <DownloadIcon className="h-3.5 w-3.5" />
              </button>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
