import media from "@/content/media.json";
import heroFrames from "@/content/hero-frames.json";

export type ImageId = keyof typeof media.images;

export function img(id: ImageId) {
  const m = media.images[id];
  return { src: m.path, width: m.width, height: m.height, alt: m.alt };
}

export const hero = {
  posterDesktop: media.hero.posterDesktop.path,
  finalDesktop: media.hero.finalDesktop.path,
  posterMobile: media.hero.posterMobile.path,
  finalMobile: media.hero.finalMobile.path,
  desktop: { dir: media.hero.videoDesktop.dir, frames: heroFrames.desktop },
  mobile: { dir: media.hero.videoMobile.dir, frames: heroFrames.mobile },
};
