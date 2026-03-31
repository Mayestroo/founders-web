"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useTranslation } from "@/hooks/useTranslation";

interface Material {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  ctaText: string;
  href?: string;
}

const getMaterials = (t: (key: string) => string): Material[] => [
  {
    title: t("materials.audio_materials"),
    subtitle: t("materials.tagline"),
    description: t("materials.audio_subtitle"),
    image: "/materials/headphones.webp",
    ctaText: t("materials.use_materials"),
    href: "/audio-materials",
  },
  {
    title: t("materials.video_materials"),
    subtitle: t("materials.tagline"),
    description: t("materials.video_subtitle"),
    image: "/materials/video.webp",
    ctaText: t("materials.use_materials"),
    href: "/video-materials",
  },
  {
    title: t("materials.pdf_materials"),
    subtitle: t("materials.tagline"),
    description: t("materials.pdf_subtitle"),
    image: "/materials/pdf.webp",
    ctaText: t("materials.use_materials"),
    href: "/pdf-materials",
  },
];

// Create slides with clones for infinite loop in both directions
// [last clone, 1, 2, 3, 4, first clone]
const transitionDurationMs = 500;

export default function Materials() {
  const { t } = useTranslation();
  const materials = getMaterials(t);
  const slides = [materials[materials.length - 1], ...materials, materials[0]];
  
  // Start at index 1 (real first slide)
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const [brokenImages, setBrokenImages] = useState<Record<string, boolean>>({});

  const goToSlide = useCallback((index: number) => {
    setIsTransitioning(true);
    setCurrentIndex(index + 1); // +1 because of the leading clone
  }, []);

  const nextSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => Math.min(prev + 1, slides.length - 1));
  }, []);

  const prevSlide = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  // Handle infinite loop reset
  useEffect(() => {
    // At the end (first clone), reset to real first slide
    if (currentIndex === slides.length - 1) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(1);
      }, transitionDurationMs);
      return () => clearTimeout(timer);
    }
    // At the beginning (last clone), reset to real last slide
    if (currentIndex === 0) {
      const timer = setTimeout(() => {
        setIsTransitioning(false);
        setCurrentIndex(slides.length - 2);
      }, transitionDurationMs);
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  // Calculate display index for dots (0-3, not including clones)
  const displayIndex = (currentIndex - 1 + materials.length) % materials.length;

  return (
    <section className="py-10 sm:py-12 md:py-16 lg:py-20 bg-white overflow-hidden">
      <div className="mx-auto max-w-360 px-4 sm:px-6 md:px-8">
        {/* Title with decoration */}
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="relative inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-(--brand-dark) mb-3 sm:mb-4">
            <span className="relative z-10">{t("materials.title")}</span>
            <div className="absolute -bottom-1 md:-bottom-2 left-0 w-full">
              <Image
                src="/free-dec.svg"
                alt="Decorative underline"
                width={272}
                height={23}
                className="h-auto w-full"
                style={{ height: 'auto' }}
              />
            </div>
          </h2>
          <p className="text-(--brand-dark) text-sm sm:text-base md:text-lg">
            {t("materials.tagline")}
          </p>
        </div>

        {/* Slider Container */}
        <div className="relative max-w-7xl mx-auto">
          {/* Slides Track */}
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl md:rounded-[40px]">
            <div
              className="flex"
              style={{
                transform: `translateX(-${currentIndex * 100}%)`,
                transition: isTransitioning
                  ? "transform 500ms ease-in-out"
                  : "none",
              }}
            >
              {slides.map((material, index) => (
                <div
                  key={index}
                  className="flex w-full shrink-0 flex-col gap-4 sm:gap-6 overflow-hidden rounded-2xl sm:rounded-3xl border border-(--brand-red) bg-white md:flex-row md:items-stretch md:gap-0 md:rounded-[40px]"
                >
                  {/* Left Content */}
                  <div className="w-full flex-1 p-5 sm:p-6 md:p-10 lg:p-12">
                    <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-(--brand-dark) mb-1 md:mb-2">
                      {material.title.split(" ")[0]}
                    </h3>
                    <h3 className="text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-(--brand-dark) mb-2 sm:mb-3 md:mb-4">
                      {material.title.split(" ").slice(1).join(" ")}
                    </h3>
                    <p className="text-(--brand-dark) text-sm sm:text-base md:text-lg mb-5 sm:mb-6 md:mb-8">
                      {material.subtitle}
                    </p>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
                      {material.href ? (
                        <Link
                          href={material.href}
                          className="bg-(--brand-red) text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold active:bg-red-600 hover:bg-red-600 transition-colors"
                        >
                          {material.ctaText}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          className="bg-(--brand-red) text-white px-4 sm:px-6 md:px-8 py-2.5 sm:py-3 md:py-4 rounded-full text-sm sm:text-base md:text-lg font-semibold active:bg-red-600 hover:bg-red-600 transition-colors"
                        >
                          {material.ctaText}
                        </button>
                      )}
                      <button
                        type="button"
                        aria-label={`${material.title} materialini ochish`}
                        className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-(--brand-red) rounded-full flex items-center justify-center active:bg-red-600 hover:bg-red-600 transition-colors shrink-0"
                      >
                        <svg
                          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Right Image */}
                  <div className="relative h-48 sm:h-56 w-full md:h-auto md:w-[38%] md:self-stretch">
                    <Image
                      src={
                        brokenImages[material.image]
                          ? "/materials/headphones.webp"
                          : material.image
                      }
                      alt={`${material.title} illustration`}
                      fill
                      sizes="(min-width: 1024px) 32vw, (min-width: 768px) 38vw, 100vw"
                      onError={() =>
                        setBrokenImages((prev) => ({
                          ...prev,
                          [material.image]: true,
                        }))
                      }
                      className="object-contain object-bottom"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls - Mobile: Below, Desktop: Sides */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 mt-5 sm:mt-6 md:hidden">
            <button
              type="button"
              onClick={prevSlide}
              aria-label="Oldingi material"
              className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-(--brand-red) rounded-full flex items-center justify-center active:bg-(--brand-red) hover:bg-(--brand-red) active:text-white hover:text-white transition-colors text-(--brand-red)"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <div className="flex gap-1.5 sm:gap-2">
              {materials.map((item: Material, index: number) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => goToSlide(index)}
                  aria-label={`${item.title} slaydiga o'tish`}
                  className="grid h-10 w-10 sm:h-12 sm:w-12 place-items-center"
                >
                  <span
                    className={`h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full transition-colors ${index === displayIndex ? "bg-(--brand-red)" : "bg-gray-300"
                      }`}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={nextSlide}
              aria-label="Keyingi material"
              className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-(--brand-red) rounded-full flex items-center justify-center active:bg-(--brand-red) hover:bg-(--brand-red) active:text-white hover:text-white transition-colors text-(--brand-red)"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>

          {/* Desktop Arrows */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Oldingi material"
            className="hidden md:flex absolute -left-16 top-[40%] -translate-y-1/2 z-10 w-12 h-12 border-2 border-(--brand-red) rounded-full items-center justify-center hover:bg-(--brand-red) hover:text-white transition-colors text-(--brand-red)"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Keyingi material"
            className="hidden md:flex absolute -right-16 top-[40%] -translate-y-1/2 z-10 w-12 h-12 border-2 border-(--brand-red) rounded-full items-center justify-center hover:bg-(--brand-red) hover:text-white transition-colors text-(--brand-red)"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>

          {/* Desktop Dots */}
          <div className="hidden md:flex justify-center gap-3 mt-8">
            {materials.map((item: Material, index: number) => (
              <button
                key={index}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`${item.title} slaydiga o'tish`}
                className="grid h-12 w-12 place-items-center"
              >
                <span
                  className={`h-3 w-3 rounded-full transition-colors ${index === displayIndex
                    ? "bg-(--brand-red)"
                    : "bg-gray-300 hover:bg-gray-400"
                    }`}
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
