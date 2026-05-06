import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp"],
    deviceSizes: [360, 414, 640, 750, 1080],
    imageSizes: [64, 128, 256],
  },
};

export default nextConfig;
