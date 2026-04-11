import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Allow large template images
    unoptimized: false,
    // Increase device sizes for high-quality templates
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pub-74ab966d74b2cbd4dbc77d04115ffd6d.r2.dev",
      },
    ],
  },
};

export default nextConfig;
