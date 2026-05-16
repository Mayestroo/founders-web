// import { ArrowRight, Sparkles } from 'lucide-react';
import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";
import { memo } from "react";

const Stats = () => {
  const { t } = useTranslation();
  return (
    <section className="w-full py-4 px-4 flex justify-center">
      <div className="relative w-full max-w-360 mx-auto px-6 sm:px-8">
        {/* Top Notch SVG Decoration */}
        {/* We place this absolutely positioned at the top center */}
        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-32 sm:w-48 h-8 z-0 hidden sm:block">
          <svg
            width="155"
            height="92"
            viewBox="0 0 155 92"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M52.6678 10.3121C60.2949 5.23069 64.1084 2.68999 68.1365 1.40959C74.0493 -0.469878 80.3994 -0.469878 86.3122 1.40959C90.3404 2.68999 94.1539 5.23069 101.781 10.3121V10.3121C133.204 31.2472 148.915 41.7148 152.363 50.4767C157.45 63.4075 152.992 78.1398 141.589 86.0802C133.862 91.4607 114.983 91.4607 77.2244 91.4607V91.4607C39.4661 91.4607 20.587 91.4607 12.86 86.0802C1.45641 78.1398 -3.00177 63.4075 2.08589 50.4767C5.53329 41.7148 21.2448 31.2472 52.6678 10.3121V10.3121Z"
              fill="#FF2828"
            />
          </svg>
        </div>

        {/* Main Dark Container */}
        <div className="bg-(--brand-red) rounded-[2.5rem] pt-12 pb-6 sm:pb-16 px-4 sm:px-6 relative z-10 shadow-xl overflow-visible">
          {/* Top Row: Marquee / Navigation content */}
          <div className="flex flex-wrap items-center justify-around gap-3 md:gap-2 text-sm sm:text-lg md:text-2xl font-medium text-white mb-8">
            {/* Founders School Item */}
            <div className="flex items-center gap-2">
              <Image
                src="/star.svg"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <span>{t("stats.title")}</span>
            </div>

            {/* Arrow */}
            <Image
              src="/arrow-white.svg"
              alt=""
              width={33}
              height={23}
              className="w-8 h-auto hidden sm:block"
            />

            {/* Repeated Items */}
            <span className="opacity-90 hidden sm:inline">{t("stats.tagline1")}</span>
            <Image
              src="/arrow-white.svg"
              alt=""
              width={33}
              height={23}
              className="w-8 h-auto hidden sm:block"
            />
 
            <span className="opacity-90 hidden sm:inline">
              {t("stats.tagline2")}
            </span>
            <Image
              src="/arrow-white.svg"
              alt=""
              width={33}
              height={23}
              className="w-8 h-auto hidden sm:block"
            />
 
            <span className="opacity-90 hidden md:inline">
              {t("stats.tagline3")}
            </span>
            <Image
              src="/arrow-white.svg"
              alt=""
              width={33}
              height={23}
              className="w-8 h-auto hidden md:block"
            />
 
            <span className="opacity-90 hidden lg:inline">{t("stats.tagline4")}</span>
          </div>

          {/* Subtle Horizontal Divider Line */}
          <div className="w-3/4 mx-auto h-px bg-linear-to-r from-transparent via-gray-700 to-transparent mb-4"></div>

          {/* Mobile Stats Cards - Inside the red container */}
          <div className="sm:hidden px-2 pt-2 pb-4">
            <div className="flex flex-col gap-2">
              <StatCard number={t("stats.experience")} label="" />
              <StatCard number={t("stats.students")} label="" />
              <StatCard number={t("stats.results")} label="" />
              <StatCard number={t("stats.team")} label="" />
            </div>
          </div>
        </div>

        {/* Floating Stats Cards - Overlapping the bottom (desktop only) */}
        <div className="relative z-20 -mt-10 px-4 hidden sm:block">
          <div className="flex flex-wrap justify-around gap-4 md:gap-6">
            {/* Card 1 */}
            <StatCard number={t("stats.experience")} label="" />

            {/* Card 2 */}
            <StatCard number={t("stats.students")} label="" />

            {/* Card 3 */}
            <StatCard number={t("stats.results")} label="" />

            {/* Card 4 */}
            <StatCard number={t("stats.team")} label="" />
          </div>
        </div>
      </div>
    </section>
  );
};

// Reusable Sub-component for the white cards
const StatCard = memo(({ number, label }: { number: string; label: string }) => {
  return (
    <div className="bg-white rounded-xl py-3 px-6 sm:py-3 sm:px-8 shadow-lg flex items-center min-w-0 sm:min-w-50 justify-center transition-transform duration-300">
      <span className="text-(--brand-red) font-extrabold text-sm sm:text-lg md:text-xl text-center whitespace-nowrap">
        {number}
      </span>
      <span className="text-(--brand-red) font-medium text-sm md:text-lg leading-tight">
        {label}
      </span>
    </div>
  );
});

StatCard.displayName = 'StatCard';

export default Stats;
