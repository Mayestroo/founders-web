import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function About() {
  const { t } = useTranslation();
  return (
    <section
      className="w-full -mt-12 sm:-mt-16 pt-24 sm:pt-32 pb-12 sm:pb-16"
      style={{
        background:
          "linear-gradient(to bottom, #FFFFFF 0%, #FFE6EB 16%, #FFE6EB 100%)",
      }}
    >
      <div className="mx-auto max-w-360 px-4 sm:px-6 md:px-8">
        {/* Header with title and button */}
        <div className="mb-6 sm:mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-3xl font-bold text-[#00192D] sm:text-4xl md:text-5xl">
            {t("about.title")}
          </h2>
          <Link
            href="/about"
            className="flex items-center justify-center gap-2 rounded-full bg-(--brand-red) px-5 py-2.5 text-base font-semibold text-white transition-all hover:scale-105 active:scale-95 sm:px-6 sm:py-3 sm:text-lg whitespace-nowrap"
          >
            {t("about.get_info")}
            <Image
              src="/arrow-white.svg"
              alt="arrow icon"
              width={42}
              height={15}
              className="w-6 h-3 sm:w-8 sm:h-4 brightness-0 invert"
              style={{ height: 'auto' }}
            />
          </Link>
        </div>

        {/* Video Placeholder */}
        <div className="relative aspect-video w-full overflow-hidden rounded-2xl sm:rounded-3xl bg-linear-to-br from-gray-800 to-gray-900 shadow-xl">
          <div className="flex h-full items-center justify-center">
            <div className="text-center px-4">
              <div className="mb-4 sm:mb-6 text-4xl sm:text-6xl">▶</div>
              <div className="mb-3 sm:mb-4 text-xl sm:text-2xl font-bold text-white">FOUNDERS</div>
              <div className="text-lg sm:text-xl font-semibold text-white">
                {t("about.video_school")}
              </div>
              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-300">{t("about.video_placeholder")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
