/**
 * Structured data generators for SEO (JSON-LD)
 */

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Founders English School",
  url: "https://www.foundersenglishschool.uz",
  logo: "https://www.foundersenglishschool.uz/logo.png",
  description: "Professional English education school offering IELTS courses, general English, kids English, and corporate training.",
  sameAs: [
    "https://www.facebook.com/foundersschool",
    "https://www.instagram.com/foundersschool",
    "https://www.youtube.com/@foundersschool",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "Customer Support",
    telephone: "+998-XX-XXX-XX-XX",
    email: "info@foundersenglishschool.uz",
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Founders English School",
    addressLocality: "Tashkent",
    addressRegion: "Tashkent",
    postalCode: "100000",
    addressCountry: "UZ",
  },
  foundingDate: "2020",
  areaServed: ["UZ", "RU"],
  availableLanguage: ["en", "ru", "uz"],
  priceRange: "$",
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Founders English School",
  image: "https://www.foundersenglishschool.uz/logo.png",
  description: "English education school offering IELTS courses and language training",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Founders English School",
    addressLocality: "Tashkent",
    addressRegion: "Tashkent",
    postalCode: "100000",
    addressCountry: "UZ",
  },
  telephone: "+998-XX-XXX-XX-XX",
  url: "https://www.foundersenglishschool.uz",
  opens: "08:00",
  closes: "20:00",
  dayOfWeek: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "250",
  },
};

export const courseSchema = {
  "@context": "https://schema.org",
  "@type": "Course",
  name: "IELTS Preparation Course",
  description: "Comprehensive IELTS preparation course with guaranteed results",
  provider: {
    "@type": "Organization",
    name: "Founders English School",
    url: "https://www.foundersenglishschool.uz",
  },
  courseCode: "IELTS-PREP",
  educationLevel: "Intermediate to Advanced",
  inLanguage: "en",
  teaches: "English, IELTS Exam Preparation",
};

export const breadcrumbSchema = (breadcrumbs: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: item.url,
  })),
});

export const faqSchema = (faqItems: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});
