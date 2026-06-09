"use client";

import Image from "next/image";
import { FormEvent, useEffect } from "react";
import { useTranslation } from "@/hooks/useTranslation";
import { useContactForm } from "@/context/ContactFormContext";

export default function FloatingContactWidget() {
  const { t } = useTranslation();
  const { isOpen, closeForm, openForm } = useContactForm();

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeForm();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closeForm]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    closeForm();
  };

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 z-110 flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {isOpen && (
        <section
          className="pointer-events-auto max-h-[calc(100dvh-7rem)] w-[min(310px,calc(100vw-2rem))] overflow-y-auto rounded-3xl border border-[#cfd5db] bg-[#e8e8e8] shadow-[0_25px_55px_-25px_rgba(0,0,0,0.7)]"
          role="dialog"
          aria-label={t("form.contact_dialog_label")}
        >
          <header className="flex items-center justify-between bg-(--brand-red) px-6 py-4 text-white">
            <h2 className="text-[18px] font-medium">
              {t("header.contact")}
            </h2>
            <button
              type="button"
              onClick={closeForm}
              className="rounded-full p-1 transition-transform hover:scale-110 active:scale-95"
              aria-label={t("common.close")}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="none"
                className="h-6 w-6"
              >
                <path
                  d="M5 5L15 15M15 5L5 15"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </header>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 px-6 py-7 text-(--brand-dark)"
          >
            <div>
            <label
                 htmlFor="floating-contact-name"
                 className="mb-2 block text-[16px] font-medium"
               >
                 {t("form.full_name")}:
               </label>
              <input
                id="floating-contact-name"
                name="fullName"
                type="text"
                required
                className="h-11 w-full rounded-xl border border-[#2a4866] bg-transparent px-3 outline-none transition-shadow focus:shadow-[0_0_0_2px_rgba(42,72,102,0.15)]"
              />
            </div>

            <div>
              <label
                 htmlFor="floating-contact-phone"
                 className="mb-2 block text-[16px] font-medium"
               >
                 {t("form.phone_number")}:
               </label>
              <input
                id="floating-contact-phone"
                name="phone"
                type="tel"
                required
                className="h-11 w-full rounded-xl border border-[#2a4866] bg-transparent px-3 outline-none transition-shadow focus:shadow-[0_0_0_2px_rgba(42,72,102,0.15)]"
              />
            </div>

            <div>
              <label
                 htmlFor="floating-contact-message"
                 className="mb-2 block text-[16px] font-medium"
               >
                 {t("form.issue_with_english")}:
               </label>
              <textarea
                id="floating-contact-message"
                name="message"
                required
                className="h-11 w-full resize-none rounded-xl border border-[#2a4866] bg-transparent px-3 py-2 outline-none transition-shadow focus:shadow-[0_0_0_2px_rgba(42,72,102,0.15)]"
              />
            </div>

             <button
               type="submit"
               className="h-12 w-full rounded-[10px] bg-(--brand-red) text-2xl font-medium text-white transition-transform hover:scale-[1.01] active:scale-[0.98]"
             >
               {t("form.submit")}
             </button>
          </form>
        </section>
      )}

      {!isOpen && (
        <button
          type="button"
          onClick={openForm}
          aria-label={t("form.open_contact_widget_aria")}
          className="pointer-events-auto grid h-16 w-16 place-items-center rounded-full bg-(--brand-red) shadow-[0_14px_24px_-14px_rgba(0,0,0,0.6)] transition-transform hover:scale-105 active:scale-95"
        >
          <Image
            src="/icons/mail.svg"
            alt={t("form.contact_icon_alt")}
            width={36}
            height={36}
          />
        </button>
      )}
    </div>
  );
}
