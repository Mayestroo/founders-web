"use client";

import { ArrowLongRightIcon, DownloadIcon } from "@/components/InlineIcons";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

const levels = [
  "BEGINNER",
  "ELEMENTARY",
  "PRE-INTERMEDIATE",
  "INTERMEDIATE",
  "UPPER-INTERMEDIATE",
];

const books = ["STUDENT BOOKS", "WORK BOOKS"];

const pdfData: Record<string, Record<string, { name: string; file: string }[]>> = {
  BEGINNER: {
    "STUDENT BOOKS": [{ name: "5th Edition – Beginners Coursebook", file: "/pdf/5th edition Beginners coursebook.pdf" }],
    "WORK BOOKS": [{ name: "5th Edition – Beginners Workbook", file: "/pdf/5th edition Beginners workbook.pdf" }],
  },
  ELEMENTARY: {
    "STUDENT BOOKS": [{ name: "5th Edition – Elementary Coursebook", file: "/pdf/5th edition Elementary coursebook.pdf" }],
    "WORK BOOKS": [{ name: "5th Edition – Elementary Workbook", file: "/pdf/5th edition Elementary workbook.pdf" }],
  },
  "PRE-INTERMEDIATE": {
    "STUDENT BOOKS": [{ name: "5th Edition – Pre-Intermediate Coursebook", file: "/pdf/5th edition Pre-intermediate coursebook.pdf" }],
    "WORK BOOKS": [{ name: "5th Edition – Pre-Intermediate Workbook", file: "/pdf/5th edition Pre-intermediate workbook.pdf" }],
  },
  INTERMEDIATE: {
    "STUDENT BOOKS": [{ name: "5th Edition – Intermediate Coursebook", file: "/pdf/5th edition Intermediate coursebook.pdf" }],
    "WORK BOOKS": [{ name: "5th Edition – Intermediate Workbook", file: "/pdf/5th edition Intermediate workbook.pdf" }],
  },
  "UPPER-INTERMEDIATE": {
    "STUDENT BOOKS": [{ name: "5th Edition – Upper-Intermediate Coursebook", file: "/pdf/5th edition Upper-intermediate coursebook.pdf" }],
    "WORK BOOKS": [{ name: "5th Edition – Upper-Intermediate Workbook", file: "/pdf/5th edition Upper-intermediate workbook.pdf" }],
  },
};

export default function PdfMaterialsLibrary() {
  const { t } = useTranslation();
  const levelLabels: Record<string, string> = {
    BEGINNER: t("materials.beginner"),
    ELEMENTARY: t("materials.elementary"),
    "PRE-INTERMEDIATE": t("materials.pre_intermediate"),
    INTERMEDIATE: t("materials.intermediate"),
    "UPPER-INTERMEDIATE": t("materials.upper_intermediate"),
  };
  const bookLabels: Record<string, string> = {
    "STUDENT BOOKS": t("materials.student_books"),
    "WORK BOOKS": t("materials.work_books"),
  };
  const [selectedLevel, setSelectedLevel] = useState(levels[0]);
  const [selectedBook, setSelectedBook] = useState(books[0]);

  const rows = pdfData[selectedLevel]?.[selectedBook] ?? [];

  return (
    <section className="w-full bg-white px-5 pb-16 pt-8 sm:px-8 sm:pb-20 sm:pt-10 lg:pb-24">
      <div className="mx-auto max-w-360 px-6 sm:px-8">
        <div className="text-center">
           <h1 className="text-4xl font-bold text-(--brand-dark) md:text-5xl lg:text-5xl">
             {t("materials.pdf_materials")}
           </h1>
           <p className="mt-3 text-base text-(--brand-dark) md:text-lg">
             {t("materials.tagline")}
           </p>
         </div>

         <div className="mt-8 rounded-[24px] bg-(--brand-red) px-5 py-6 sm:px-7 sm:py-7 lg:px-10">
           <h2 className="text-center text-2xl font-bold text-white sm:text-4xl lg:text-5xl">
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
                  className={`inline-flex h-10 items-center rounded-full px-5 text-xs font-bold transition-colors sm:h-11 sm:px-6 sm:text-sm ${isActive
                    ? "bg-(--brand-dark) text-white"
                    : "bg-white text-(--brand-dark)"
                    }`}
                >
                  {levelLabels[level]}
                  <ArrowLongRightIcon
                    className={`ml-2 h-4 w-4 transition-transform ${isActive ? "rotate-90" : ""}`}
                  />
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
                  className={`inline-flex h-10 items-center rounded-full px-5 text-xs font-bold transition-colors sm:h-11 sm:px-6 sm:text-sm ${isActive
                    ? "bg-(--brand-dark) text-white"
                    : "bg-white text-(--brand-dark)"
                    }`}
                >
                  {bookLabels[book]}
                  <ArrowLongRightIcon
                    className={`ml-2 h-4 w-4 transition-transform ${isActive ? "rotate-90" : ""}`}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-7 space-y-2.5 sm:mt-8 sm:space-y-3">
          {rows.map(({ name, file }) => (
            <article
              key={file}
              className="flex items-center justify-between gap-4 rounded-[20px] bg-[#FFE9E9] px-4 py-3 sm:px-10 sm:py-7.5"
            >
              <p className="text-base font-bold text-(--brand-dark) sm:text-xl">
                {name}
              </p>

              <a
                href={file}
                download
                aria-label={t("materials.download_item_aria", { name })}
                className="grid h-7 w-7 shrink-0 place-items-center rounded-full text-white"
              >
                <DownloadIcon className="h-7 w-7" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
