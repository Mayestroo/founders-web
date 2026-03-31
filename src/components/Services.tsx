import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

interface Service {
  title: string;
  description: string;
  duration: string;
  price: string;
  image?: string;
}

const defaultServiceImage = "/services/kids-english.webp";

const resolveServiceImage = (image?: string) => {
  if (!image) return defaultServiceImage;
  if (
    image.startsWith("/") ||
    image.startsWith("http://") ||
    image.startsWith("https://")
  ) {
    return image;
  }

  return defaultServiceImage;
};

const getServices = (t: (key: string) => string): Service[] => [
  {
    title: t("services.kids_english.title"),
    description: t("services.kids_english.description"),
    duration: t("services.kids_english.duration"),
    price: t("services.kids_english.price"),
    image: "/services/kids-english.webp",
  },
  {
    title: t("services.general_english.title"),
    description: t("services.general_english.description"),
    duration: t("services.general_english.duration"),
    price: t("services.general_english.price"),
    image: "/services/general.webp",
  },
  {
    title: t("services.ielts.title"),
    description: t("services.ielts.description"),
    duration: t("services.ielts.duration"),
    price: t("services.ielts.price"),
    image: "/services/ielts.webp",
  },
  {
    title: t("services.corporate_english.title"),
    description: t("services.corporate_english.description"),
    duration: t("services.corporate_english.duration"),
    price: t("services.corporate_english.price"),
    image: "/services/corporate.webp",
  },
  {
    title: t("services.online_english.title"),
    description: t("services.online_english.description"),
    duration: t("services.online_english.duration"),
    price: t("services.online_english.price"),
    image: "/services/online.webp",
  },
];

export default function Services() {
  const { t } = useTranslation();
  const services = getServices(t);
  return (
    <section id="services" className="bg-white py-10 sm:py-12 md:py-16">
      <div className="mx-auto max-w-360 px-4 sm:px-6 md:px-8">
        <h2 className="mb-8 sm:mb-10 md:mb-12 text-center text-3xl font-bold text-(--brand-dark) sm:text-4xl md:text-5xl">
          {t("services.title")}
        </h2>

        <div className="space-y-4 sm:space-y-6">
          {services.map((service) => (
            <article
              key={service.title}
              className="overflow-hidden rounded-3xl sm:rounded-4xl border border-(--brand-dark) bg-white"
            >
              <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between">
                <div className="flex-1 px-4 pb-4 pt-5 sm:px-5 sm:pb-5 sm:pt-6 lg:px-8 lg:pb-8 lg:pt-8">
                  <div className="mb-4 sm:mb-5">
                    <div>
                      <h3 className="relative inline-block pr-1 text-xl font-black uppercase tracking-tight text-(--brand-dark) sm:text-2xl md:text-3xl lg:text-4xl">
                        {service.title}
                        <Image
                          src="/free-dec.svg"
                          alt="Service title highlight"
                          width={272}
                          height={23}
                          className="absolute left-0 top-full -mt-1 sm:-mt-2 h-auto w-full"
                          style={{ height: 'auto' }}
                        />
                      </h3>
                    </div>
                  </div>

                  <p className="max-w-3xl text-sm leading-relaxed text-(--brand-dark) sm:text-base md:text-lg">
                    {service.description}
                  </p>

                  <p className="mt-3 sm:mt-4 text-base text-(--brand-red) sm:text-lg md:text-xl">
                    {t("services.course_duration")}{" "}
                    <span className="font-bold ">{service.duration}</span>
                  </p>

                  <div className="mt-5 sm:mt-7 flex flex-wrap items-center gap-2 sm:gap-3 md:gap-4">
                    <button
                      type="button"
                      aria-label={`${service.title} kursi haqida batafsil`}
                      className="grid h-12 w-12 sm:h-14 sm:w-14 shrink-0 place-items-center rounded-full bg-(--brand-red) text-white transition-colors active:bg-red-600 hover:bg-red-600"
                    >
                      <svg
                        className="h-6 w-6 sm:h-7 sm:w-7"
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

                    <button
                      type="button"
                      className="rounded-full bg-(--brand-red) px-5 py-2.5 text-base font-semibold text-white transition-colors active:bg-red-600 hover:bg-red-600 sm:px-6 sm:py-3 sm:text-lg"
                    >
                      {t("services.register_button")}
                    </button>

                    <p className="rounded-full bg-(--brand-red) px-5 py-2.5 text-lg font-bold text-white sm:px-6 sm:py-3 sm:text-xl">
                      {service.price}
                    </p>
                  </div>
                </div>

                <div className="relative mx-auto h-48 w-full max-w-[280px] sm:h-52 sm:max-w-[320px] md:h-64 lg:mr-5 lg:h-62.5 lg:w-[28%] lg:max-w-none">
                  <Image
                    src={resolveServiceImage(service.image)}
                    alt={`${service.title} illustration`}
                    fill
                    className="origin-bottom object-contain object-bottom scale-[1.2]"
                    sizes="(min-width: 1024px) 30vw, 85vw"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
