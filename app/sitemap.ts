import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { treatments } from "@/content/treatments";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["/", "/treatments/", "/about/", "/smile-gallery/", "/reviews/", "/contact/"];
  return [
    ...pages.map((p) => ({ url: `${site.url}${p}`, changeFrequency: "monthly" as const, priority: p === "/" ? 1 : 0.8 })),
    ...treatments.map((t) => ({ url: `${site.url}/treatments/${t.slug}/`, changeFrequency: "monthly" as const, priority: 0.9 })),
  ];
}
