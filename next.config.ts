import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Thumbnails returned by the YouTube Data API for the /messages video
    // cards (src/lib/youtube.ts).
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "img.youtube.com" },
    ],
  },
};

export default nextConfig;
