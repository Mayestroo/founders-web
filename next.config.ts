import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "localhost",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 31536000, // 1 year for cached images
    unoptimized: process.env.VERCEL === "1" ? false : false, // Use Vercel's optimization on Vercel
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    // Optimized device sizes for mobile-first
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Configure quality levels used in the app
    qualities: [50, 60, 65, 70, 75],
  },
  // Enable compression
  compress: true,
  // Enable ISR (Incremental Static Regeneration)
  staticPageGenerationTimeout: 120,
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ["react", "react-dom"],
  },
  // Optimize bundle
  modularizeImports: {
    "react-use": {
      transform: "react-use/lib/{{member}}",
    },
  },
  // Reduce bundle size by removing unused packages from client bundle
  serverExternalPackages: ["i18next", "next-i18next"],
  // Security headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https:; frame-src 'self' https://yandex.uz;",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
