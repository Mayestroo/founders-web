import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization - disabled for Vercel static hosting
  images: {
    unoptimized: true, // Disable Next.js image optimization for static export
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
    formats: ["image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [60, 65, 70, 75],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
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
