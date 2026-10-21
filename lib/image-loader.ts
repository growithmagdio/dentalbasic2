"use client";

/** Widths generated for every image by scripts/fetch-assets.mjs and scripts/make-placeholders.mjs. */
export const IMAGE_WIDTHS = [320, 480, 640, 960, 1280, 1920] as const;

/**
 * Maps "/images/name.webp" + requested width to the nearest pre-generated file
 * "/images/name-960.webp". Paths without a .webp extension are returned as-is.
 */
export default function imageLoader({ src, width }: { src: string; width: number; quality?: number }) {
  if (!src.endsWith(".webp") || !src.startsWith("/images/")) return src;
  const w = IMAGE_WIDTHS.find((x) => x >= width) ?? IMAGE_WIDTHS[IMAGE_WIDTHS.length - 1];
  return src.replace(/\.webp$/, `-${w}.webp`);
}
