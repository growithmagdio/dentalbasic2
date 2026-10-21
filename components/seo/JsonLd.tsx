import { site, fullAddress } from "@/content/site";
import { openingHoursSpecification } from "@/lib/hours";

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; "<" is escaped to avoid closing the tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export const dentistLd = () => ({
  "@context": "https://schema.org",
  "@type": "Dentist",
  "@id": `${site.url}/#dentist`,
  name: site.name,
  description: site.description,
  url: site.url,
  logo: `${site.url}/brand/jerush-logo-stacked.svg`,
  image: `${site.url}/og.png`,
  telephone: site.phone,
  email: site.email,
  priceRange: "₹₹",
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: site.address.country,
  },
  geo: { "@type": "GeoCoordinates", latitude: site.geo.lat, longitude: site.geo.lng },
  openingHoursSpecification: openingHoursSpecification(),
  availableLanguage: site.languages,
  hasMap: `https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}`,
});

export const breadcrumbLd = (items: { name: string; path: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: `${site.url}${it.path}` })),
});

export const faqLd = (faqs: { q: string; a: string }[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
});
