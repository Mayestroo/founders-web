import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "@/hooks/useTranslation";

export default function WhyChooseUs() {
  const { t } = useTranslation();
  const reasons = [
    {
      icon: "/icons/guarantee.svg",
      title: t("why_choose.guarantee.title"),
      description: t("why_choose.guarantee.description"),
    },
    {
      icon: "/icons/speed.svg",
      title: t("why_choose.fast_results.title"),
      description: t("why_choose.fast_results.description"),
    },
    {
      icon: "/icons/teacher.svg",
      title: t("why_choose.demanding_teachers.title"),
      description: t("why_choose.demanding_teachers.description"),
    },
    {
      icon: "/icons/interactive.svg",
      title: t("why_choose.interesting_method.title"),
      description: t("why_choose.interesting_method.description"),
    },
    {
      icon: "/icons/community.svg",
      title: t("why_choose.friendly_environment.title"),
      description: t("why_choose.friendly_environment.description"),
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-360 px-6 sm:px-8">
        {/* Title */}
        <div className="text-center mb-4">
          <h2 className="relative z-0 inline-block text-4xl font-bold text-(--brand-dark) md:text-5xl lg:text-5xl">
            <span className="relative z-1">{t("why_choose.title")}</span>
            <Image
              src="/whychooseus.svg"
              alt=""
              width={320}
              height={14}
              className="absolute left-0 top-full -mt-3 h-auto w-full"
              style={{ height: 'auto' }}
            />
          </h2>
        </div>
        <p className="text-center text-gray-600 text-lg mb-12">
          {t("why_choose.subtitle")}
        </p>

        {/* Cards Grid */}
        <div className="mx-auto">
          {/* Top Row - 3 cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {reasons.slice(0, 3).map((reason, index) => (
              <div
                key={index}
                className="relative min-h-64 sm:min-h-80 rounded-[42px] border border-(--brand-red) bg-white p-6 sm:p-8"
              >
                {/* Left Border Accent */}
                <div className="absolute -left-1 top-[50%] h-22 w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--brand-red)" />

                {/* Icon */}
                <div className="mb-7 flex h-18 w-18 items-center justify-center rounded-full bg-(--brand-red) text-white">
                  <Image
                    src={reason.icon}
                    alt={reason.title}
                    width={36}
                    height={36}
                    className="w-9 h-9"
                  />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl sm:text-3xl font-extrabold uppercase leading-[1.06] tracking-tight text-(--brand-red)">
                  {reason.title}
                </h3>
                <ul className="list-disc pl-5 text-base sm:text-lg leading-snug text-(--brand-dark)">
                  <li>{reason.description}</li>
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Row - 2 cards centered */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {reasons.slice(3, 5).map((reason, index) => (
              <div
                key={index + 3}
                className="relative min-h-64 sm:min-h-80 rounded-[42px] border border-(--brand-red) bg-white p-6 sm:p-8"
              >
                {/* Left Border Accent */}
                <div className="absolute -left-1 top-[50%] h-22 w-[10px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-(--brand-red)" />

                {/* Icon */}
                <div className="mb-7 flex h-18 w-18 items-center justify-center rounded-full bg-(--brand-red) text-white">
                  <Image
                    src={reason.icon}
                    alt={reason.title}
                    width={36}
                    height={36}
                    className="w-9 h-9"
                  />
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl sm:text-3xl font-extrabold uppercase leading-[1.06] tracking-tight text-(--brand-red)">
                  {reason.title}
                </h3>
                <ul className="list-disc pl-5 text-base sm:text-lg leading-snug text-(--brand-dark)">
                  <li>{reason.description}</li>
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <Link
            href="/parents-solutions"
            className="bg-(--brand-red) text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-red-600 transition-colors flex items-center gap-3 shadow-lg hover:shadow-xl"
          >
            {t("parents_solutions.question")}
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
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
