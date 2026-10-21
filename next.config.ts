import type { NextConfig } from "next";

/**
 * Static export: the whole site is pre-rendered HTML + assets, so it can be
 * hosted on Cloudflare Pages (bookings go to the Pages Function in /functions).
 * Images are pre-optimised by scripts/fetch-assets.mjs into fixed widths and
 * served through a tiny custom loader (lib/image-loader.ts).
 */
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    deviceSizes: [640, 960, 1280, 1920],
    imageSizes: [320, 480],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
