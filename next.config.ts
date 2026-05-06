import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    deviceSizes: [360, 414, 640, 750, 1080],
    imageSizes: [64, 128, 256],
  },
  // Compress responses for faster mobile delivery
  compress: true,
  // Inline small assets to reduce round trips on mobile networks
  experimental: {
    optimizeCss: true,
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Cache static assets aggressively on Android WebView
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ];
  },
};

export default nextConfig;
