/**
 * Before/after cases. Add only real cases with the patient's written consent.
 * Put the photos in /public/gallery/ and list them here; the gallery page picks them up.
 */
export type GalleryCase = { treatment: string; before: string; after: string; alt: string };

export const gallery: GalleryCase[] = [];
