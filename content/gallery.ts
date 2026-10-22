/**
 * Before/after cases. Add only real cases with the patient's written consent.
 * Put the photos in /public/gallery/ and list them here; the gallery page picks them up.
 */
export type GalleryCase = { treatment: string; before: string; after: string; alt: string };

export const gallery: GalleryCase[] = [
  {
    treatment: "Teeth whitening & deep cleaning",
    before: "/gallery/whitening-before.webp",
    after: "/gallery/whitening-after.webp",
    alt: "Teeth whitening result showing stain removal and brightened enamel",
  },
  {
    treatment: "Clear aligners",
    before: "/gallery/aligners-before.webp",
    after: "/gallery/aligners-after.webp",
    alt: "Orthodontic clear aligners result showing straightened teeth",
  },
  {
    treatment: "Dental implant restoration",
    before: "/gallery/implant-before.webp",
    after: "/gallery/implant-after.webp",
    alt: "Single tooth dental implant replacing missing front tooth with natural porcelain crown",
  },
  {
    treatment: "Porcelain veneers",
    before: "/gallery/veneers-before.webp",
    after: "/gallery/veneers-after.webp",
    alt: "Porcelain veneers closing front gap and restoring chipped enamel",
  },
];
