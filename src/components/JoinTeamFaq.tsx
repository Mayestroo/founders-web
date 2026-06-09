"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

type FaqItem = {
  question: string;
  answer: string;
};

export default function JoinTeamFaq() {
  const { t, translations } = useTranslation();
  const [openIndex, setOpenIndex] = useState(0);
  
  const items: FaqItem[] = Array.isArray(translations?.join_team?.faq_items)
    ? (translations.join_team.faq_items as FaqItem[])
    : [];

  return (
    <section className="w-full bg-white px-5 pb-16 pt-6 sm:px-8 sm:pb-20 sm:pt-10 lg:pb-24">
      <div className="mx-auto max-w-360 px-6 sm:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="relative inline-block text-4xl font-bold text-(--brand-dark) md:text-5xl lg:text-5xl">
             <span className="relative z-1">{t("join_team.faq_title")}</span>
              <Image
               src="/team-2.svg"
               alt=""
               width={640}
               height={24}
               className="absolute left-0 top-full -mt-4 w-full"
               style={{ height: 'auto', width: '100%' }}
             />
          </h2>

          <p className="mt-4 text-base text-(--brand-dark) md:text-lg">
            {t("join_team.faq_subtitle")}
          </p>
        </div>

        <div className="mt-8 w-full space-y-3 sm:mt-10 lg:mt-12">
          {items.map((item, index) => {
            const isOpen = index === openIndex;

            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl bg-[#FFE9E9] sm:rounded-[18px]"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 p-5 text-left md:p-6"
                  aria-expanded={isOpen}
                  aria-controls={`join-team-faq-${index}`}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <h3 className="pr-4 text-lg font-bold text-(--brand-dark) md:text-xl lg:text-2xl">
                    {item.question}
                  </h3>

                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-full transition-colors md:h-11 md:w-11 ${isOpen ? "bg-white" : "bg-(--brand-red)"
                      }`}
                  >
                    <svg
                      className={`h-5 w-5 transition-transform md:h-6 md:w-6 ${isOpen ? "rotate-180 text-(--brand-red)" : "text-white"
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>

                <div
                  id={`join-team-faq-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="px-5 pb-5 md:px-6 md:pb-6">
                    <p className="text-sm leading-relaxed text-(--brand-dark) md:text-base">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
