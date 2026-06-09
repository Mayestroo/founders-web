import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

const promotions = [
  {
    image: "/promotions/promotion-1.webp",
  },
  {
    image: "/promotions/promotion-2.webp",
  },
  {
    image: "/promotions/promotion-3.webp",
  },
];

export default function Promotions() {
  const { t } = useTranslation();
  
  return (
    <section
      className="py-20 -mt-10"
      style={{
        background:
          "linear-gradient(to bottom, #FFFFFF 0%, #FFE6EB 16%, #FFE6EB 100%)",
      }}
    >
      {" "}
      {/* Soft pink background from image */}
      <div className="mx-auto max-w-360 px-6 sm:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-bold text-[#011627] mb-6">
            {t("promotions.title")}
          </h2>
          <p className="text-[#011627] text-xl max-w-4xl mx-auto leading-tight opacity-90">
            {t("promotions.description")}<br />
            <strong className="text-(--brand-red)">{t("promotions.prizes")}</strong>
          </p>
        </div>

        {/* Grid */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-15">
          {promotions.map((promo, index) => (
            <PromotionCard key={index} {...promo} />
          ))}
        </div>
      </div>
    </section>
  );
}

interface PromotionCardProps {
  image: string;
}

function PromotionCard({ image }: PromotionCardProps) {
  return (
    <Image src={image} alt="" width={300} height={650} className="w-56 sm:w-72 h-auto" />
  );
}
