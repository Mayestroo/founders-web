"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, memo } from "react";
import { useTranslation } from "@/hooks/useTranslation";

const heroImages = [
  "/hero/hero-01.webp",
  "/hero/hero-02.webp",
  "/hero/hero-03.webp",
  "/hero/hero-04.webp",
  "/hero/hero-05.webp",
  "/hero/hero-06.webp",
  "/hero/hero-07.webp"
];

const animationDurationMs = 700;

// Memoized hero image component to prevent re-renders
const HeroImage = memo(({ src, isActive, isPriority }: { src: string; isActive: boolean; isPriority: boolean }) => (
  <div className={`absolute inset-0 transition-opacity duration-700 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
    <Image
      src={src}
      alt="Founders School"
      fill
      priority={isPriority}
      fetchPriority={isPriority ? "high" : "auto"}
      loading={isPriority ? "eager" : "lazy"}
      className="object-cover"
      sizes="(max-width: 640px) 100vw, (min-width: 1024px) 50vw, 100vw"
      quality={60}
    />
  </div>
));

HeroImage.displayName = 'HeroImage';

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHydrated, setIsHydrated] = useState(false);
  const { t } = useTranslation();

  // Only start carousel after hydration to reduce initial JS work
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    
    // Delay carousel start to avoid blocking initial render
    const startDelay = setTimeout(() => {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % heroImages.length);
      }, 12000);
      
      return () => clearInterval(timer);
    }, 3000);

    return () => clearTimeout(startDelay);
  }, [isHydrated]);

  const goToSlide = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  return (
    <section className="w-full py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="mx-auto max-w-360 px-4 sm:px-6 md:px-8">
        <div className="grid items-center gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Image Carousel */}
          <div className="relative w-full overflow-hidden bg-gray-100 lg:order-2" style={{ aspectRatio: '916/1222' }}>
            {/* Only render first image on initial load, others after hydration */}
            <HeroImage 
              src={heroImages[0]} 
              isActive={currentIndex === 0} 
              isPriority={true}
            />
            {isHydrated && heroImages.slice(1).map((src, i) => (
              <HeroImage 
                key={src}
                src={src} 
                isActive={currentIndex === i + 1} 
                isPriority={false}
              />
            ))}

            {/* Navigation dots */}
            {isHydrated && (
              <div className="absolute bottom-2 left-1/2 z-10 flex -translate-x-1/2 gap-1">
                {heroImages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => goToSlide(index)}
                    className="p-2 group"
                    aria-label={`Go to slide ${index + 1}`}
                  >
                    <span className={`block h-2 w-2 rounded-full transition-all ${
                      index === currentIndex ? 'bg-white w-4' : 'bg-white/50 group-hover:bg-white/70'
                    }`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Text Content */}
          <div className="space-y-4 sm:space-y-6 lg:order-1">
            <h1 className="text-3xl font-bold leading-tight text-[#00192D] sm:text-4xl md:text-5xl">
              <span>Kafolatlangan </span>
              <span className="relative inline-block">
                <span className="relative z-1">IELTS</span>
                <Image
                  src="/ielts-dec.svg"
                  alt=""
                  width={200}
                  height={12}
                  className="absolute -mt-1 sm:-mt-2 left-0 h-auto w-full z-0"
                  style={{ height: 'auto' }}
                />
              </span>
              <span> yoki </span>
              <span className="relative inline-block">
                <span className="relative z-1">BEPUL</span>
                <Image
                  src="/ielts-dec.svg"
                  alt=""
                  width={200}
                  height={12}
                  className="absolute -mt-1 sm:-mt-2 left-0 h-auto w-full z-0"
                  style={{ height: 'auto' }}
                />
              </span>
              <span> o'qing!</span>
            </h1>
            <div className="text-base sm:text-lg md:text-xl text-gray-700">
              <p>{t("hero.subtitle")}</p>
            </div>
            <button
              type="button"
              className="rounded-full bg-(--brand-red) px-6 py-3 text-lg font-semibold text-white transition-all hover:scale-105 active:scale-95 sm:px-8 sm:py-4 sm:text-xl"
            >
              {t("hero.cta_button")}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
