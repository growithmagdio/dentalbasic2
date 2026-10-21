/**
 * Every business detail on the site lives here.
 * DEMO — all values below are placeholders for the demo build. Replace before launch.
 */
export const site = {
  name: "Jerush Dental Clinic",
  shortName: "Jerush",
  tagline: "Gentle, precise dentistry in Anna Nagar, Madurai",
  description:
    "Check-ups, root canals, implants, aligners and kids dentistry in Anna Nagar, Madurai. Clear prices before we start and same-week appointments.",
  // DEMO
  url: "https://www.jerushdental.in",
  // DEMO
  phone: "+91 98765 43210",
  phoneHref: "tel:+919876543210",
  // DEMO — wa.me format, country code without +
  whatsapp: "919876543210",
  // DEMO
  email: "hello@jerushdental.in",
  // DEMO
  address: {
    street: "24, 2nd Main Road, Anna Nagar",
    city: "Madurai",
    region: "Tamil Nadu",
    postalCode: "625020",
    country: "IN",
    countryName: "India",
  },
  // DEMO — area centre, not a real premises
  geo: { lat: 9.9196, lng: 78.145 },
  // DEMO — used for the map embed and the directions link
  mapsQuery: "Anna Nagar, Madurai, Tamil Nadu",
  // DEMO
  parking: "Two-wheeler and car parking in front of the clinic",
  // DEMO — 24h times, IST. 0 = Sunday … 6 = Saturday
  hours: [
    { days: [1, 2, 3, 4, 5, 6], open: "09:30", close: "13:30" },
    { days: [1, 2, 3, 4, 5, 6], open: "16:30", close: "20:30" },
  ],
  sundayNote: "Sunday: emergencies by appointment",
  languages: ["English", "Tamil"],
  // DEMO — fictional doctor
  doctor: {
    name: "Dr. Jerusha Samuel",
    firstName: "Dr. Jerusha",
    qualifications: "BDS, MDS (Prosthodontics)",
    registration: "TNDC Reg. No. DEMO-00000",
    yearsInPractice: 12,
    note: "I started Jerush so families in Madurai could get careful, unhurried dental care, with every step and every rupee explained before we begin.",
    bio: [
      "Dr. Jerusha completed her BDS and an MDS in Prosthodontics, the speciality of crowns, bridges, dentures and implants.",
      "She has spent twelve years restoring teeth for patients of every age, and is known among her patients for slowing down, explaining options on a model and never pushing treatment that isn’t needed.",
    ],
  },
  // DEMO — the rating is shown only when reviewCount > 0 (real Google reviews)
  google: { rating: 4.9, reviewCount: 0, profileUrl: "#" },
  // DEMO
  social: { instagram: "#", facebook: "#" },
  credit: { label: "Website by Magdio", url: "https://www.magdio.com" },
} as const;

export const fullAddress = `${site.address.street}, ${site.address.city}, ${site.address.region} ${site.address.postalCode}`;
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(site.mapsQuery)}`;
export const mapsEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(site.mapsQuery)}&output=embed`;
