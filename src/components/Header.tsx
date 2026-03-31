"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

export default function Header() {
  const { locale, i18n, t } = useTranslation();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const menuToggleId = "mobile-menu-toggle";
  
  const currentLang = languages.find(lang => lang.code === locale) || languages[0];

  const handleLanguageChange = (lang: Language) => {
    i18n.changeLanguage(lang.code);
    setIsLangOpen(false);
  };

  const closeMenu = () => {
    const checkbox = document.getElementById(menuToggleId) as HTMLInputElement;
    if (checkbox) {
      checkbox.checked = false;
    }
  };

  return (
     <>
       <input
         id={menuToggleId}
         type="checkbox"
         tabIndex={-1}
         className="peer fixed -left-[9999px] -top-[9999px] h-px w-px opacity-0"
       />
       <header className="pointer-events-auto sticky top-0 z-[120] isolate w-full bg-(--brand-red)">
        <div className="mx-auto flex max-w-360 items-center justify-between gap-4 px-6 py-3.5 sm:px-8 sm:py-4">
          <div className="shrink-0">
            <LogoMark alt={t("common.logo_alt")} />
          </div>
          <div className="flex items-center gap-4 sm:gap-3">
            <div className="hidden items-center gap-4 md:flex">
              {socialButtons.map((item) =>
                item.href ? (
                  <IconTile key={item.label} label={item.label} href={item.href}>
                    {item.icon}
                  </IconTile>
                ) : (
                  <span
                    key={item.label}
                    role="img"
                    aria-label={item.label}
                    className="grid h-10 w-10 place-items-center rounded-md bg-white text-(--brand-red) opacity-60 cursor-default"
                  >
                    {item.icon}
                  </span>
                )
              )}
              <CdiButton ariaLabel={t("common.cdi_login")} />
            </div>
            <div className="hidden items-center gap-3 rounded-full sm:flex">
              <LanguageSwitcher
                currentLang={currentLang}
                isOpen={isLangOpen}
                onToggle={() => setIsLangOpen(!isLangOpen)}
                onSelect={handleLanguageChange}
              />
               <a
                href="/choose-level"
                className="min-h-10 rounded-full bg-white px-7 py-2.5 text-sm font-semibold tracking-wider text-(--brand-red) transition-all hover:scale-105 active:scale-95 inline-flex items-center"
              >
                {t("common.darajangizni_aniqlang")}
              </a>
            </div>
            <MenuButton toggleId={menuToggleId} ariaLabel={t("common.open_menu")} />
          </div>
        </div>
      </header>

       {/* Mobile Menu */}
       <div className="pointer-events-none fixed inset-0 z-[119] bg-black/50 opacity-0 transition-opacity duration-300 peer-checked:pointer-events-auto peer-checked:opacity-100">
         <label htmlFor={menuToggleId} className="block h-full w-full" aria-label={t("common.close_menu")} />
       </div>

       {/* Menu Drawer */}
       <div className="fixed right-0 top-0 z-[130] h-full w-full max-w-80 sm:max-w-100 translate-x-full bg-white shadow-xl transition-transform duration-300 peer-checked:translate-x-0">
         <div className="flex h-full flex-col">
           {/* Close Button */}
           <div className="flex justify-end p-6">
             <label
               htmlFor={menuToggleId}
               aria-label={t("common.close_menu")}
               className="cursor-pointer text-gray-800 transition-colors hover:text-gray-600"
             >
               <CloseIcon className="h-8 w-8" />
             </label>
           </div>

            {/* Logo */}
            <div className="px-12 pb-8">
              <Image
                src="/hamburger-logo.svg"
                alt={t("common.logo_alt")}
                width={160}
                height={40}
                className="h-auto w-full"
                style={{ height: 'auto' }}
              />
            </div>

           {/* Menu Items */}
           <nav className="flex-1 overflow-y-auto px-12">
              <ul className="space-y-1">
                {menuItems(t).map((item) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={closeMenu}
                      className="block py-3 text-lg font-semibold text-gray-900 transition-colors hover:text-(--brand-red)"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

           {/* Bottom Button */}
           <div className="p-6">
             <a
               href="/choose-level"
               onClick={closeMenu}
               className="inline-flex w-full items-center justify-center rounded-full bg-(--brand-red) px-6 py-4 text-center text-base font-semibold text-white transition-all hover:scale-105 active:scale-95"
             >
               {t("common.darajangizni_aniqlang")}
             </a>
           </div>
         </div>
       </div>
    </>
  );
}

type IconTileProps = {
  label: string;
  href: string;
  children: ReactNode;
};

const IconTile = ({ label, href, children }: IconTileProps) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    className="grid h-10 w-10 place-items-center rounded-md bg-white text-(--brand-red) transition-all duration-200 hover:scale-110 active:scale-95"
  >
    {children}
  </a>
);

const CdiButton = ({ ariaLabel }: { ariaLabel: string }) => (
  <a
    href="https://founderscdi.uz/login"
    target="_blank"
    rel="noopener noreferrer"
    aria-label={ariaLabel}
    className="flex h-10 items-center gap-2 rounded-md bg-white px-3 text-sm font-semibold tracking-wide text-(--brand-red) transition-all duration-200 hover:scale-105 active:scale-95"
  >
    <PcIcon className="h-4 w-4" />
    <span>CDI</span>
  </a>
);

const LogoMark = ({ alt }: { alt: string }) => (
  <Image
    src="/logo.svg"
    alt={alt}
    width={199}
    height={59}
    className="h-auto sm:h-full w-auto"
    priority
  />
);

const MenuButton = ({ toggleId, ariaLabel }: { toggleId: string; ariaLabel: string }) => (
  <label
    htmlFor={toggleId}
    aria-label={ariaLabel}
    className="pointer-events-auto relative z-[121] grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-white text-(--brand-red) transition-all duration-200 hover:scale-110 active:scale-95 sm:h-11 sm:w-11"
  >
    <MenuIcon className="h-5 w-5 sm:h-6 sm:w-6" />
  </label>
);

type IconProps = {
  className?: string;
};

const MenuIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M4 7h16M4 12h16M4 17h16" />
  </svg>
);

const CloseIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M6 6l12 12M18 6L6 18" />
  </svg>
);

const TelegramIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
  </svg>
);

const InstagramIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z" />
  </svg>
);

const LinkedInIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
  </svg>
);

const TikTokIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.07A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

const YouTubeIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z" />
  </svg>
);

const PcIcon = ({ className }: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="3" y="4" width="18" height="12" rx="2" />
    <path d="M8 20h8" />
    <path d="M12 16v4" />
  </svg>
);

const menuItems = (t: (key: string) => string) => [
  { label: t("header.about_us"), href: "/about" },
  { label: t("header.teachers"), href: "/#teachers" },
  { label: t("header.for_parents"), href: "/parents-solutions" },
  { label: t("header.services"), href: "/#services" },
  { label: t("header.customer_reviews"), href: "/#testimonials" },
  { label: t("header.materials"), href: "/materials" },
  { label: t("header.vacancies"), href: "/join-team" },
  { label: t("header.faq"), href: "/#faq" },
  { label: t("header.contact"), href: "/#contact" },
];

type Language = {
  code: string;
  name: string;
  flagSrc: string;
};

const languages: Language[] = [
  { code: "uz", name: "O'zbekcha", flagSrc: "/icons/uz.svg" },
  { code: "en", name: "English", flagSrc: "/icons/en.svg" },
  { code: "ru", name: "Русский", flagSrc: "/icons/ru.svg" },
];

type LanguageSwitcherProps = {
  currentLang: Language;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (lang: Language) => void;
};

const LanguageSwitcher = ({
  currentLang,
  isOpen,
  onToggle,
  onSelect,
}: LanguageSwitcherProps) => (
  <div className="relative">
    <button
      type="button"
      onClick={onToggle}
      aria-label={`${currentLang.name} tili tanlangan`}
      className="flex items-center"
    >
      <div className="overflow-hidden rounded-md ">
        <Image
          src={currentLang.flagSrc}
          alt={currentLang.name}
          width={52}
          height={39}
          className="h-auto w-13"
          style={{ height: 'auto' }}
        />
      </div>
    </button>

    {isOpen && (
      <div className="absolute right-0 top-full z-50 mt-2 overflow-hidden rounded-xl bg-white py-1 shadow-lg">
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => onSelect(lang)}
            className={`flex items-center justify-center px-2 py-1.5 transition-colors hover:bg-gray-100 ${currentLang.code === lang.code ? "bg-gray-50" : ""
              }`}
          >
            <div className="overflow-hidden rounded-md ">
              <Image
                src={lang.flagSrc}
                alt={lang.name}
                width={64}
                height={48}
                className="h-auto w-16"
                style={{ height: 'auto' }}
              />
            </div>
          </button>
        ))}
      </div>
    )}
  </div>
);

const socialButtons = [
  {
    label: "Telegram",
    href: "https://t.me/founders_school_uz",
    icon: <TelegramIcon className="h-8 w-8" />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/founders_school?igsh=ZzZ1N3dkMWlkYWJ4",
    icon: <InstagramIcon className="h-8 w-8" />,
  },
  {
    label: "LinkedIn",
    href: "",
    icon: <LinkedInIcon className="h-8 w-8" />,
  },
  {
    label: "TikTok",
    href: "",
    icon: <TikTokIcon className="h-6 w-8" />,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/@founders_school?si=K9zOe7AUjrbLbJsy",
    icon: <YouTubeIcon className="h-8 w-8" />,
  },
];
