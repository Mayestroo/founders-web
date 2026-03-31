import Image from "next/image";
import { useTranslation } from "@/hooks/useTranslation";

interface Testimonial {
  author: string;
  text: string;
}

export default function Testimonials() {
  const { t, translations } = useTranslation();
  
  const testimonials: Testimonial[] = Array.isArray(translations?.testimonials?.testimonials_list) 
    ? translations.testimonials.testimonials_list 
    : [];
  // Duplicate testimonials for seamless infinite scroll
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section id="testimonials" className="py-12 sm:py-16 md:py-20 bg-white overflow-hidden">
      <div className="mx-auto max-w-360 px-4 sm:px-6 md:px-8 mb-8 sm:mb-10 md:mb-12">
        {/* Title with decoration */}
        <div className="text-center">
          <h2 className="relative inline-block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-(--brand-dark) mb-3 sm:mb-4">
            <span className="relative z-10">{t("testimonials.title")}</span>
            <div className="absolute -bottom-1 sm:-bottom-1.5 md:-bottom-2 left-0 w-full">
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
        </div>
      </div>

      {/* Carousel */}
      <div className="relative">
        <div className="flex gap-3 sm:gap-4 md:gap-6 animate-scroll">
          {duplicatedTestimonials.map((testimonial, index) => (
            <div
              key={index}
              className="shrink-0 w-72 sm:w-80 md:w-96 bg-white rounded-3xl sm:rounded-[35px] md:rounded-[40px] border border-(--brand-red) p-5 sm:p-6 md:p-8 flex flex-col"
            >
               {/* Avatar */}
                <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5 md:mb-6">
                  <div className="w-12 h-12 sm:w-13 sm:h-13 md:w-14 md:h-14 rounded-full bg-gray-200 overflow-hidden shrink-0">
                    {/* Placeholder avatar */}
                    <div className="w-full h-full bg-linear-to-br from-red-100 to-red-200 flex items-center justify-center text-(--brand-red) font-bold text-lg sm:text-xl">
                      {testimonial?.author?.charAt(0) || "U"}
                    </div>
                  </div>
                 <div>
                   <h3 className="font-bold text-(--brand-dark) text-sm sm:text-base">
                     {testimonial.author}
                   </h3>
                   <p className="text-xs sm:text-sm text-gray-600">{t("testimonials.title")}</p>
                 </div>
               </div>

              {/* Testimonial Text */}
              <p className="text-(--brand-dark) text-sm sm:text-base leading-relaxed flex-1">
                {testimonial.text}
              </p>

              {/* Rating Stars */}
              <div className="flex gap-1 mt-4 sm:mt-5 md:mt-6">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 sm:w-5 sm:h-5 text-(--brand-red)"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
