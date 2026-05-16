import ContactWidgetWrapper from "@/app/ContactWidgetWrapper";
import TranslationProviderWrapper from "@/app/TranslationProviderWrapper";
import { ContactFormProvider } from "@/context/ContactFormContext";
import { StructuredData } from "@/components/StructuredData";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Optimized font loading with font-display: swap for better LCP
const inter = Inter({
  subsets: ["latin", "cyrillic"],
  display: "swap",
  fallback: ["system-ui", "-apple-system", "sans-serif"],
  preload: true,
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.foundersenglishschool.uz"),
  title: {
    default: "Founders English School - IELTS Courses & English Education",
    template: "%s | Founders English School",
  },
  description:
    "Learn English at Founders English School. Professional IELTS courses, general English, kids English, and corporate training. Guaranteed results or free retake.",
  keywords: [
    "English school",
    "IELTS courses",
    "English learning",
    "language education",
    "Founders School",
    "Uzbekistan",
  ],
  authors: [{ name: "Founders English School" }],
  creator: "Founders English School",
  publisher: "Founders English School",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    alternateLocale: ["ru_RU", "uz_UZ"],
    url: "https://www.foundersenglishschool.uz",
    siteName: "Founders English School",
    title: "Founders English School - IELTS Courses & English Education",
    description:
      "Learn English at Founders English School. Professional IELTS courses, general English, kids English, and corporate training.",
    images: [
      {
        url: "https://www.foundersenglishschool.uz/og-image.png",
        width: 1200,
        height: 630,
        alt: "Founders English School",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Founders English School - IELTS Courses & English Education",
    description:
      "Learn English at Founders English School. Professional IELTS courses, general English, kids English, and corporate training.",
    images: ["https://www.foundersenglishschool.uz/og-image.png"],
  },
  alternates: {
    canonical: "https://www.foundersenglishschool.uz",
    languages: {
      en: "https://www.foundersenglishschool.uz",
      ru: "https://www.foundersenglishschool.uz/ru",
      uz: "https://www.foundersenglishschool.uz/uz",
    },
  },
  icons: {
    icon: "/favicon.png",
  },
  manifest: "/site.webmanifest",
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Preconnect to Google Fonts for faster font loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS prefetch for external resources */}
        <link rel="dns-prefetch" href="https://cdn.jsdelivr.net" />
        {/* Color scheme */}
        <meta name="color-scheme" content="light" />
        {/* Viewport optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {/* Structured Data for SEO */}
        <StructuredData />
        <TranslationProviderWrapper>
          <ContactFormProvider>
            {children}
            <ContactWidgetWrapper />
          </ContactFormProvider>
        </TranslationProviderWrapper>
      </body>
    </html>
  );
}
