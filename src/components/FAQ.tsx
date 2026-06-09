"use client";

import Image from "next/image";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const { t, translations } = useTranslation();
  const [openIndex, setOpenIndex] = useState<number>(0);
  
  const faqItems: FAQItem[] = Array.isArray(translations?.faq?.faq_items) 
    ? (translations?.faq?.faq_items as FAQItem[]) 
    : [];

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-16 md:py-20 bg-white">
      <div className="mx-auto max-w-360 px-6 sm:px-8">
        {/* Title with decoration */}
        <div className="text-center mb-10 md:mb-12">
          <h2 className="relative inline-block text-4xl md:text-5xl lg:text-5xl font-bold text-(--brand-dark) mb-4">
            <span className="relative z-10">{t("faq.title")}</span>
            <div className="absolute -bottom-0.5 md:-bottom-1 left-0 w-full">
              <Image
                src="/free-dec.svg"
                alt=""
                width={272}
                height={23}
                className="h-full w-full scale-y-150"
                style={{ height: 'auto' }}
              />
            </div>
          </h2>
          <p className="text-(--brand-dark) text-base md:text-lg">
            {t("faq.subtitle")}
          </p>
        </div>

        {/* FAQ Items - Full width */}
        <div className="w-full space-y-3">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div
                key={index}
                className="bg-[#FFE9E9] rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  id={buttonId}
                  onClick={() => toggleItem(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="w-full flex items-center justify-between p-5 md:p-6 text-left"
                >
                  <h3 className="text-lg md:text-xl lg:text-2xl font-bold text-(--brand-dark) pr-4">
                    {item.question}
                  </h3>
                  <div
                    className={`shrink-0 w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 ${isOpen
                      ? "bg-white rotate-180"
                      : "bg-(--brand-red)"
                      }`}
                  >
                    <svg
                      className={`w-5 h-5 md:w-6 md:h-6 ${isOpen ? "text-(--brand-red)" : "text-white"
                        }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </button>

                {/* Answer */}
                <div
                  id={panelId}
                  aria-labelledby={buttonId}
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                  <div className="px-5 md:px-6 pb-5 md:pb-6">
                    <p className="text-(--brand-dark) text-sm md:text-base leading-relaxed">
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
