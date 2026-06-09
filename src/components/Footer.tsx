"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer id="contact" className="bg-(--brand-red) py-8 sm:py-10 md:py-16 rounded-t-[32px] sm:rounded-t-[40px] md:rounded-t-[60px]">
      <div className="mx-auto max-w-360 px-4 sm:px-6 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 sm:gap-8 md:gap-12">
          {/* Left Column - Logo & Contact */}
          <div className="space-y-4 sm:space-y-5 md:space-y-6 md:col-span-3">
            {/* Logo */}
            <Link href="/" className="inline-block">
              <Image
                src="/logo.svg"
                alt={t("common.logo_alt")}
                width={200}
                height={48}
                className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto"
                style={{ width: 'auto' }}
              />
            </Link>

             {/* Phone */}
             <div className="flex items-center gap-2 pt-0 sm:pt-6 md:pt-10 text-white">
               <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
               </svg>
               <span className="text-sm sm:text-base font-medium md:text-lg">
                 {t("footer.phone")}
               </span>
             </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 sm:gap-3">
              {[
                {
                  name: "telegram",
                  href: "https://t.me/founders_school_uz",
                  icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z",
                },
                {
                  name: "instagram",
                  href: "https://www.instagram.com/founders_school?igsh=ZzZ1N3dkMWlkYWJ4",
                  icon: "M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z",
                },
                {
                  name: "gmail",
                  href: "mailto:founderslanguageschool@gmail.com",
                  icon: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z",
                },
                {
                  name: "youtube",
                  href: "https://youtube.com/@founders_school?si=K9zOe7AUjrbLbJsy",
                  icon: "M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z",
                },
              ].map((social) =>
                social.href ? (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("footer.social_link_aria", { name: social.name })}
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center active:bg-white/90 hover:bg-white/90 transition-colors"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-(--brand-red)"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={social.icon} />
                    </svg>
                  </a>
                ) : (
                  <span
                    key={social.name}
                    role="img"
                    aria-label={social.name}
                    className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center opacity-60 cursor-default"
                  >
                    <svg
                      className="w-4 h-4 sm:w-5 sm:h-5 text-(--brand-red)"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d={social.icon} />
                    </svg>
                  </span>
                )
              )}
            </div>

            {/* CTA Button */}
            <button
              type="button"
              onClick={() => {
                window.location.href = "/choose-level";
              }}
              className="bg-white text-(--brand-red) px-5 py-2.5 sm:px-6 sm:py-3 rounded-full font-semibold text-sm sm:text-base md:text-lg active:bg-white/90 hover:bg-white/90 transition-colors"
            >
              {t("common.darajangizni_aniqlang")}
            </button>
          </div>

           {/* Middle Column - Navigation */}
           <div className="md:col-span-2">
             <h3 className="text-white font-bold text-2xl sm:text-2xl md:text-3xl mb-4 sm:mb-5 md:mb-6">{t("footer.contact_for")}</h3>
             <nav className="space-y-2 sm:space-y-2.5 md:space-y-3">
               {[
                 { label: t("footer.home"), href: "/" },
                 { label: t("header.teachers"), href: "/#teachers" },
                 { label: t("header.for_parents"), href: "/parents-solutions" },
                 { label: t("header.services"), href: "/#services" },
                 { label: t("header.customer_reviews"), href: "/#testimonials" },
                 { label: t("header.materials"), href: "/photo-materials" },
                 { label: t("header.vacancies"), href: "/join-team" },
               ].map((link) => (
                 <a
                   key={link.href}
                   href={link.href}
                   className="block text-white active:text-white/90 hover:text-white/90 transition-colors text-sm sm:text-base"
                 >
                   {link.label}
                 </a>
               ))}
             </nav>
           </div>

          <div className="md:col-span-5">
            <div className="bg-[#00192dcc] rounded-2xl sm:rounded-3xl h-48 sm:h-56 md:h-full md:min-h-50 flex items-center justify-center overflow-hidden">
              <div style={{ position: "relative", overflow: "hidden", width: "100%", height: "100%" }}>
                <a
                  href="https://yandex.uz/maps/org/210947970587/?utm_medium=mapframe&utm_source=maps"
                  style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "0px" }}
                >
                  Founders English School
                </a>
                <a
                  href="https://yandex.uz/maps/10335/tashkent/category/foreign_language_courses/184106160/?utm_medium=mapframe&utm_source=maps"
                  style={{ color: "#eee", fontSize: "12px", position: "absolute", top: "14px" }}
                >
                  {t("header.address")}
                </a>
                <iframe
                  src="https://yandex.uz/map-widget/v1/?ll=69.236178%2C41.306362&mode=search&oid=210947970587&ol=biz&z=16.54"
                  width="100%"
                  height="100%"
                  loading="lazy"
                  frameBorder="0"
                  allowFullScreen={true}
                  style={{ position: "relative" }}
                  title={t("footer.map_title")}
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
