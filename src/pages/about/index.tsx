"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
  ArrowLongRightIcon,
  CloseIcon,
  InstagramIcon,
  LinkedInIcon,
  PhoneIcon,
  TelegramIcon,
  TikTokIcon,
  type SvgIconComponent,
  YouTubeIcon,
} from "@/components/InlineIcons";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

type TimelineItem = {
  title: string;
  description: string;
  textSide: "left" | "right";
  arrowDirection: "left" | "right";
  mediaVariant: "campus" | "english";
};

export default function AboutPage() {
  const { t } = useTranslation();
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const timelineItems: TimelineItem[] = [
    {
      title: t("about.vision_title"),
      description: t("about.vision_text"),
      textSide: "right",
      arrowDirection: "right",
      mediaVariant: "campus",
    },
    {
      title: t("about.mission_title"),
      description: t("about.mission_text"),
      textSide: "left",
      arrowDirection: "left",
      mediaVariant: "english",
    },
  ];

  type SocialLink = {
    label: string;
    href: string;
    icon: SvgIconComponent;
  };

  const socialLinks: SocialLink[] = [
    { label: "Telegram", href: "https://t.me/your_channel", icon: TelegramIcon },
    {
      label: "Instagram",
      href: "https://instagram.com/your_account",
      icon: InstagramIcon,
    },
    {
      label: "LinkedIn",
      href: "https://linkedin.com/company/your_company",
      icon: LinkedInIcon,
    },
    { label: "TikTok", href: "https://tiktok.com/@your_account", icon: TikTokIcon },
    {
      label: "YouTube",
      href: "https://youtube.com/@your_channel",
      icon: YouTubeIcon,
    },
  ];

  useEffect(() => {
    if (!isContactModalOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsContactModalOpen(false);
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isContactModalOpen]);

  return (
    <main className="min-h-screen overflow-x-hidden bg-white">
      <Header />

      <section
        className="w-full px-6 pb-16 pt-12 sm:px-8 md:pb-20 md:pt-16"
        style={{
          background:
            "linear-gradient(to bottom, #f6dfe4 0%, #f4e5e8 55%, #efefef 100%)",
        }}
      >
        <div className="mx-auto max-w-360">
          <div className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-3xl font-bold text-[#00192D] sm:text-4xl lg:text-6xl">
              {t("about.title")}
            </h2>
            <button
              type="button"
              onClick={() => setIsContactModalOpen(true)}
              className="flex w-fit items-center gap-2 rounded-full bg-(--brand-red) px-6 py-3 text-base font-semibold text-white transition-all hover:scale-105 active:scale-95 sm:px-8 sm:py-4 sm:text-xl"
            >
               {t("about.get_info")}
            </button>
          </div>

          <div className="relative aspect-video w-full overflow-hidden rounded-[28px] border border-black/10 bg-black shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)] sm:rounded-[34px]">
            <iframe
              src="https://www.youtube.com/embed/nPrbQZTQ_LY?rel=0"
              title="Founders English School video"
              className="h-full w-full"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="w-full bg-white px-6 pb-20 pt-6 sm:px-8 md:pb-24 md:pt-10">
        <div className="mx-auto max-w-360">
          <h2 className="text-center text-3xl font-black uppercase leading-tight sm:text-5xl lg:text-7xl">
            <span className="text-(--brand-red)">Founders School -</span>
            <span className="mt-3 block text-[0.86em] normal-case italic text-(--brand-dark)">
              {t("about.description")}
            </span>
          </h2>

          <div className="relative mt-10 grid gap-8 md:mt-16 md:gap-14">
            <div className="pointer-events-none absolute left-1/2 top-0 z-0 hidden h-full -translate-x-1/2 border-l-2 border-dashed border-[#ff282880] md:block" />

            {timelineItems.map((item) => {
              const textBlock = (
                <div
                  className={`w-full max-w-136 rounded-3xl p-2 text-left md:p-4 ${
                    item.textSide === "right" ? "md:pl-3" : ""
                  }`}
                >
                  <span className="inline-flex rounded-full bg-(--brand-red) px-5 py-1.5 text-lg font-bold text-white sm:px-7 sm:py-2 sm:text-3xl md:text-4xl">
                    {item.title}
                  </span>
                  <p className="mt-3 max-w-110 text-sm leading-snug text-(--brand-dark) sm:text-xl md:text-2xl">
                    {item.description}
                  </p>
                </div>
              );

              const mediaBlock = (
                <div
                  className={`relative aspect-[16/10] w-full max-w-140 overflow-hidden rounded-[20px] bg-white sm:rounded-[30px] ${
                    item.textSide === "left" ? "md:mr-auto" : "md:ml-0"
                  }`}
                >
                  <Image
                    src={
                      item.mediaVariant === "campus"
                        ? "/vision.webp"
                        : "/mission.webp"
                    }
                    alt={item.title}
                    fill
                    sizes="(min-width: 1024px) 560px, (min-width: 768px) 45vw, 100vw"
                    quality={65}
                    className="object-cover"
                    style={{
                      objectPosition:
                        item.mediaVariant === "campus" ? "50% 44%" : "50% 58%",
                    }}
                  />
                </div>
              );

              return (
                <article
                  key={item.title}
                  className="relative z-10 flex flex-col items-center gap-4 md:grid md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] md:gap-8"
                >
                  {/* On mobile: always show text first, then arrow, then image */}
                  <div className="order-1 w-full md:order-none md:contents">
                    {item.textSide === "left" ? textBlock : null}
                  </div>
                  
                  {/* Text block for right side (shows first on mobile) */}
                  <div className="order-1 w-full md:hidden">
                    {item.textSide === "right" ? textBlock : null}
                  </div>

                  {/* Arrow - always in middle on mobile */}
                  <div className="order-2 flex items-center justify-center md:order-none">
                    <span className="relative z-20 grid h-10 w-10 place-items-center rounded-full bg-(--brand-red) shadow-[0_10px_20px_-12px_rgba(255,40,40,0.95)] rotate-90 sm:h-12 sm:w-12 md:rotate-0 md:h-14 md:w-14">
                      <ArrowLongRightIcon
                        className={`h-4 w-4 text-white sm:h-5 sm:w-5 md:h-6 md:w-6 ${
                          item.arrowDirection === "left" ? "md:rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </span>
                  </div>

                  {/* Image block - always last on mobile */}
                  <div className="order-3 w-full md:order-none md:contents">
                    {item.textSide === "left" ? mediaBlock : null}
                  </div>
                  
                  {/* Desktop only: media block on left when text is right */}
                  <div className="hidden md:contents">
                    {item.textSide === "right" ? mediaBlock : null}
                  </div>
                  
                  {/* Mobile only: media block */}
                  <div className="order-3 w-full md:hidden">
                    {item.textSide === "right" ? mediaBlock : null}
                  </div>
                  
                  {/* Desktop only: text block on right */}
                  <div className="hidden md:contents">
                    {item.textSide === "right" ? textBlock : null}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {isContactModalOpen && (
        <div
          className="fixed inset-0 z-100 flex items-center justify-center overflow-y-auto bg-black/45 px-4 py-6 backdrop-blur-md"
          onClick={() => setIsContactModalOpen(false)}
        >
          <div
            className="relative max-h-[calc(100dvh-2rem)] w-full max-w-5xl overflow-y-auto rounded-[34px] bg-[#f4f4f4] shadow-[0_40px_100px_-30px_rgba(0,0,0,0.6)]"
            onClick={(event) => event.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Aloqa formasi"
          >
            <button
              type="button"
              onClick={() => setIsContactModalOpen(false)}
              aria-label="Yopish"
              className="absolute right-5 top-5 z-10 text-(--brand-dark) transition-transform hover:scale-110 active:scale-95 md:text-white"
            >
              <CloseIcon className="h-8 w-8" />
            </button>

            <div className="grid md:grid-cols-[1.45fr_1fr]">
              <div className="px-7 py-10 sm:px-10 sm:py-12 md:px-12">
                <h3 className="max-w-3xl text-3xl font-extrabold leading-[1.05] text-(--brand-dark) sm:text-[34px] lg:text-[38px]">
                  Siz bilan bog&apos;lanishimiz uchun ma&apos;lumotlaringizni
                  qoldiring!
                </h3>

                <form
                  className="mt-8 space-y-4"
                  onSubmit={(event) => {
                    event.preventDefault();
                    setIsContactModalOpen(false);
                  }}
                >
                  <input
                    type="tel"
                    placeholder="+998 00 - 00 - 00"
                    className="h-12 w-full rounded-[9px] border border-[#9facbf] bg-transparent px-4 text-base text-(--brand-dark) outline-none transition-colors placeholder:text-[#8a97aa] focus:border-(--brand-red)"
                  />
                  <input
                    type="text"
                    placeholder="Ism Familiya"
                    className="h-12 w-full rounded-[9px] border border-[#9facbf] bg-transparent px-4 text-base text-(--brand-dark) outline-none transition-colors placeholder:text-[#8a97aa] focus:border-(--brand-red)"
                  />

                  <button
                    type="submit"
                    className="mt-2 h-13 w-full max-w-64 rounded-full bg-(--brand-red) text-2xl font-semibold text-white transition-all hover:scale-[1.02] active:scale-[0.98] sm:h-14 sm:text-3xl"
                  >
                    Tayyor
                  </button>
                </form>
              </div>

              <div className="bg-(--brand-red) px-7 py-10 text-white sm:px-10 sm:py-12 md:px-12">
                <p className="max-w-72 text-3xl font-extrabold leading-[1.05] sm:text-[36px] lg:text-[42px]">
                  {t("footer.follow_us")}
                </p>

                <div className="mt-7 flex flex-wrap gap-3">
                  {socialLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.label}
                        className="grid h-12 w-12 place-items-center rounded-lg bg-white text-(--brand-red) transition-transform hover:scale-105 active:scale-95"
                      >
                        <Icon className="h-6 w-6" />
                      </a>
                    );
                  })}
                </div>

                <div className="mt-8 flex flex-wrap items-center gap-3 text-xl font-medium sm:text-2xl lg:text-3xl">
                  <PhoneIcon className="h-5 w-5 shrink-0" />
                  <span>71 205-03-33 / 71 205-53-33</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
