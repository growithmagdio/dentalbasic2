# Build prompt — Jerush Dental Clinic website

> Paste everything below the line into Antigravity (or any AI coding agent). Before you start, put these in the empty project folder:
> - `docs/asset-prompts.md` — the image and hero-animation prompts file
> - `public/brand/` — the five logo SVGs (`jerush-logo-horizontal.svg`, `jerush-logo-horizontal-white.svg`, `jerush-logo-stacked.svg`, `jerush-mark.svg`, `jerush-app-icon.svg`)

---

## Role and goal

You are a senior front-end engineer and art director at a studio known for calm, premium, editorial websites. Build a **production-quality marketing website for Jerush Dental Clinic**. It uses Next.js and React, and its hero is a scroll-scrubbed 3D image-sequence animation.

The site has one job: **turn local visitors into booked appointments.** Every page must make booking one tap away. It must feel like a bright, private, trustworthy clinic: porcelain whites, one deep teal accent, big confident serif headlines, real-looking photography and one memorable 3D moment. It must not look like a template.

Build it **in phases** (listed at the end). After each phase:
1. Run the dev server.
2. Check the page at 390, 834, 1280 and 1440 px widths.
3. Fix what you see before moving on.

## Tech stack (use exactly this)

- **Framework:** Next.js 16 (latest stable), App Router, TypeScript (strict), React Server Components by default.
- **Styling:** Tailwind CSS v4, with every colour, font, spacing and radius defined as CSS custom-property tokens in `app/globals.css` and mapped through `@theme`. No hard-coded hex values in components.
- **Fonts:** `next/font/google`.
  - **Fraunces** for display headings: weights 400–600, optical sizing on, `display: swap`.
  - **Hanken Grotesk** for body and UI: weights 400, 500, 600.
- **Motion:** `gsap` (3.13+, all plugins free) with **ScrollTrigger** and **SplitText**, `@gsap/react` (`useGSAP`), and **Lenis** smooth scroll.
  - All animation code lives in `"use client"` components.
  - Register plugins inside client modules only.
- **Forms:** React Hook Form + Zod. Submit through a **Server Action** (fall back to `app/api/book/route.ts` if needed).
- **Icons:** `lucide-react`, 1.5 px stroke, used sparingly.
- **Images:** `next/image`, AVIF/WebP, correct `sizes`, `priority` only on the hero poster.
- **Deploy target:** Cloudflare Workers via `@opennextjs/cloudflare`.
  - Add `wrangler.jsonc` and the `preview` and `deploy` scripts.
  - Keep the code platform-neutral so Vercel also works.
- **Don't add:** UI kits (shadcn themes, MUI), Three.js/R3F, carousel libraries or CSS-in-JS. Build primitives yourself.

## Demo business details (keep ALL of these in one file: `content/site.ts`)

Every value below is **demo data**. Put it in `content/site.ts` with a `// DEMO — replace before launch` comment on each block, so the real details can be swapped in one place. No component may hard-code any of these values.

```ts
export const site = {
  name: "Jerush Dental Clinic",
  shortName: "Jerush",
  tagline: "Gentle, precise dentistry in Anna Nagar, Madurai",
  url: "https://www.jerushdental.in",            // DEMO
  phone: "+91 98765 43210",                       // DEMO
  phoneHref: "tel:+919876543210",                 // DEMO
  whatsapp: "919876543210",                       // DEMO (wa.me format)
  email: "hello@jerushdental.in",                 // DEMO
  address: {
    street: "24, 2nd Main Road, Anna Nagar",      // DEMO
    city: "Madurai",
    region: "Tamil Nadu",
    postalCode: "625020",
    country: "IN",
  },
  geo: { lat: 9.9196, lng: 78.1450 },             // DEMO — area centre, not a real premises
  mapsQuery: "Anna Nagar, Madurai",               // DEMO — used for embed + directions link
  parking: "Two-wheeler and car parking in front of the clinic", // DEMO
  hours: [                                        // DEMO — 24h times, IST
    { days: ["Mon","Tue","Wed","Thu","Fri","Sat"], open: "09:30", close: "13:30" },
    { days: ["Mon","Tue","Wed","Thu","Fri","Sat"], open: "16:30", close: "20:30" },
  ],
  sundayNote: "Sunday: emergencies by appointment",
  doctor: {                                       // DEMO — fictional
    name: "Dr. Jerusha Samuel",
    qualifications: "BDS, MDS (Prosthodontics)",
    registration: "TNDC Reg. No. DEMO-00000",
    yearsInPractice: 12,
    note: "I started Jerush so families in Madurai could get careful, unhurried dental care, with every step and every rupee explained before we begin.",
  },
  google: { rating: 4.9, reviewCount: 0, profileUrl: "#" }, // DEMO — show rating only if reviewCount > 0
  social: { instagram: "#", facebook: "#" },      // DEMO
};
```

Also create these data files:

- **`content/treatments.ts`** — 6 treatments. Each has: `slug`, `name`, `short` (one line), `whatItIs`, `whoNeedsIt` (list), `steps` (3–5 items), `duration`, `visits`, `priceFrom` (₹, DEMO), `faqs` (3 each), `image`, `keyword`.
  - `checkup-cleaning` — Check-up and cleaning, from ₹500
  - `root-canal` — Root canal treatment, from ₹4,500
  - `implants` — Dental implants, from ₹25,000
  - `braces-aligners` — Braces and clear aligners, from ₹35,000
  - `whitening-veneers` — Whitening and veneers, from ₹6,000
  - `kids-dentistry` — Kids dentistry, from ₹400
- **`content/reviews.ts`** — 3 short demo reviews, flagged `demo: true`. Each has a first name and last initial, a treatment, and 2–3 plain sentences. Display them with initials avatars, no photos. While `demo` is true, show a small muted "Sample reviews" label.
- **`content/faqs.ts`** — 6 general FAQs (first visit, payment methods, emergencies, sterilisation, kids, insurance).

Write all copy in a short, calm, specific tone. Use sentence case and plain verbs. Don't use hype words ("world-class", "revolutionary", "best in town"), fake counters ("10,000+ smiles") or medical promises. Price lines always read "from ₹X". Use proper typography: ’ “ ” – ₹, and a non-breaking space before the last word of headlines.

## Brand and design system

**Logo:** use the supplied SVGs in `public/brand/`.
- `jerush-logo-horizontal.svg` in the header.
- `jerush-logo-horizontal-white.svg` on the dark footer.
- `jerush-app-icon.svg` → generate `app/icon.png` (512), `apple-icon.png` (180) and `favicon.ico` from it.

The mark is a single teal line: a tooth whose right root hooks into a "J". Never recolour it outside the tokens below.

**Colour tokens**

| Token | Hex | Use |
|---|---|---|
| `--paper` | #F7F5F1 | page background (porcelain) |
| `--surface` | #FFFFFF | cards, form fields |
| `--ink` | #14202B | headings, body, footer background |
| `--muted` | #5B6670 | secondary text (passes 4.5:1 on paper) |
| `--rule` | #E3DFD8 | hairlines, borders |
| `--accent` | #0E5E63 | buttons, links, focus, highlights ONLY |
| `--accent-ink` | #FFFFFF | text on accent |
| `--accent-soft` | #E4EFEE | quiet tinted panels (max 1–2 per page) |
| `--accent-on-dark` | #7FC4C2 | accent on the dark footer |

One accent only. No gradients except a barely visible paper-to-white vertical fade behind the hero.

**Type scale** (fluid `clamp()`, ratio about 1.333):
- Display: `clamp(2.75rem, 6.2vw, 6rem)`, leading 1.0, tracking -0.02em, Fraunces 500.
- H2: `clamp(2rem, 3.6vw, 3.25rem)`, Fraunces 500.
- H3: 1.5rem, Hanken Grotesk 600.
- Body: 1.0625–1.125rem, leading 1.6, max 68ch.
- Small/UI: 0.875rem.
- Use `font-variant-numeric: tabular-nums` for prices and hours.

Don't put coloured single words in headlines, don't put all-caps eyebrows above every heading, and don't use italic accent words.

**Grid and space**
- 12 columns on desktop (gutter 24 px), 6 on tablet, 4 on mobile.
- Max width 1280 px.
- Side margins `clamp(16px, 4vw, 48px)`.
- Section padding `clamp(5rem, 10vw, 10rem)`.
- Vary rhythm: a dense proof strip, then a big quiet statement, then a structured grid. Use asymmetric layouts (headline on columns 1–7, supporting text on columns 9–12).

**Components**
- **Buttons:** primary is solid accent, 48 px tall, 999 px radius, 600 weight; secondary is a 1 px ink outline.
- **Cards:** 20 px radius, 1 px `--rule` border, no drop shadows (a tiny shadow only on hover lift).
- **Media frames:** consistent ratios (4:5 portrait, 3:2 wide) with 20 px radius.

**Signature moment:** the hero tooth. Nothing else on the page competes with it.

## Images

Read `docs/asset-prompts.md`.
- If you have an image-generation tool, generate every image listed there at its exact path and size, with the style suffix, and generate the doctor portrait first as the style reference.
- If you can't generate images, create neutral placeholders at the **same paths**: a soft `--accent-soft` to `--paper` blur with the image name in small muted text. Real files can then be dropped in with no code change.
- Write meaningful alt text for every image, stored in the data files.
- The smile gallery uses "Real patient cases coming soon" placeholders. Never generate before/after results.

## Pages and routes

| Route | Content |
|---|---|
| `/` | Home (sections below) |
| `/treatments` | Intro + 6 treatment cards + general FAQs |
| `/treatments/[slug]` | Statically generated from `treatments.ts`: hero with image, what it is, who needs it, steps (numbered: a real sequence), duration and visits, "from ₹" price card, FAQs (accordion), related treatments, booking CTA |
| `/about` | Doctor profile (portrait, qualifications, registration, years, personal note), clinic tour, sterilisation promise |
| `/smile-gallery` | Filter chips by treatment + before/after drag-slider component, wired to an empty `content/gallery.ts` with placeholder state |
| `/reviews` | Rating summary (only if `reviewCount > 0`) + reviews + "Read more on Google" link |
| `/contact` | Booking form, WhatsApp, call, email, address, hours with live open/closed, map, directions, parking |
| `/privacy`, `/terms` | Simple pages, linked in the footer |
| `not-found` | On-brand 404 with Book and Home links |

## Home page sections (in this order)

1. **Header.**
   - Horizontal logo on the left.
   - Nav on the right: Treatments, About, Smile gallery, Reviews, Contact, plus a "Book appointment" primary button on desktop.
   - Transparent over the hero, turning paper-coloured with a hairline once you scroll.
   - On mobile, a menu button opens a full-screen sheet.
2. **Hero, the 3D scroll scene** (details in the motion section).
   - H1: "Gentle, precise dentistry in Anna Nagar, Madurai."
   - Subline: "Check-ups, root canals, implants and aligners with Dr. Jerusha Samuel. Clear prices before we start, and same-week appointments."
   - Buttons: "Book an appointment" (primary) and "WhatsApp us" (secondary).
   - A small live line: "Open now · until 1:30 pm" or "Closed · opens 4:30 pm", computed from `site.hours` in IST.
3. **Proof strip.** A thin row separated by hairlines:
   - "12 years in practice"
   - "MDS Prosthodontics"
   - "Single-use and autoclaved instruments"
   - "Tamil and English spoken"
   - The Google rating, only if real reviews exist.
4. **"Why Jerush" statement.** One large Fraunces paragraph across 10 columns, revealed line by line:
   - "We explain every step before we begin, quote the price up front, and never rush a nervous patient. Your instruments are sterilised in front of you."
5. **Treatments.**
   - H2 "Treatments", plus a short intro on the right.
   - A grid of 6 cards (3×2 desktop, 2×3 tablet, horizontal scroll-snap on mobile). Each card has a 4:5 image, name, one-line summary, "from ₹" and an arrow link.
6. **Meet the doctor.** Asymmetric layout:
   - Portrait (4:5) on columns 1–5.
   - Name, qualifications, registration, the personal note and a "More about Dr. Jerusha" link on columns 7–12.
7. **Inside the clinic.** Three images in an editorial layout (one wide 3:2 and two stacked), each with a short caption: reception, treatment room, sterilisation.
8. **How a visit works.** Three numbered steps with one line each:
   1. "Book online or on WhatsApp"
   2. "Check-up, X-ray if needed, and a written quote"
   3. "Treatment at a pace you're comfortable with"
   Add the consultation image beside them.
9. **Reviews.** Three review cards, with the "Sample reviews" label while the data is demo, plus a link to `/reviews`.
10. **Visit us and book.** Two columns:
    - Left: the booking form.
    - Right: address, phone, WhatsApp, email, hours table (today highlighted), a "Get directions" button, and a lazy-loaded Google Maps embed (click-to-load facade so it doesn't hurt LCP).
11. **Footer.** Ink background, with:
    - The white logo.
    - The full NAP block, exactly as in `site.ts`.
    - Hours.
    - Quick links and treatment links.
    - Social links.
    - "© {current year} Jerush Dental Clinic", plus a small "Website by Magdio" link → https://www.magdio.com.
    - Privacy and Terms links.

**Sticky booking bar (every page):**
- On mobile, a fixed bottom bar with three equal buttons (Book, WhatsApp, Call), 56 px tall, respecting the safe-area inset. Hide it while the booking form is in view.
- On desktop, the header's Book button plays this role.

## 3D hero — image-sequence scroll scene (the most important part)

The frames come from `docs/asset-prompts.md`:
- Desktop: `public/hero/desktop/frame_0001.webp` … `frame_0120.webp`, 1600 px.
- Mobile: `public/hero/mobile/frame_0001.webp` … `frame_0072.webp`, 900 px.
- Posters: `hero-poster-*.webp` (first frame) and `hero-final-*.webp` (last frame).

If the frames don't exist yet, build a `scripts/make-placeholder-frames.mjs` that uses `sharp` to render 120 simple frames: a soft porcelain ellipse that rises and gains a highlight. The scene can then be built and tuned now, with the real frames dropped in later.

Implement `components/hero/HeroSequence.tsx` (client):

- **Markup.** The H1, subline, CTAs and poster `<img>` are server-rendered, so the hero is readable and LCP-ready with zero JavaScript.
  - The poster is `next/image` with `priority` and `fetchPriority="high"`.
  - A `<canvas>` sits on top of the poster and takes over once the first frames load.
- **Loading.**
  - Choose the frame set with `matchMedia('(min-width: 768px)')`.
  - Preload progressively: frame 1, then every 8th frame, then fill the gaps. Use `createImageBitmap` where supported.
  - While a frame isn't loaded, draw the nearest loaded one.
- **Drawing.**
  - Cover-fit the image to the canvas.
  - Account for `devicePixelRatio`, capped at 2.
  - Redraw only when the frame index changes, inside `requestAnimationFrame`.
  - Resize with a `ResizeObserver`.
- **Desktop (≥ 1024 px).**
  - Pin the hero with ScrollTrigger: `start: "top top"`, `end: "+=150%"`, `scrub: 1`, `anticipatePin: 1`.
  - One timeline, `ease: "none"`, tweening `{ frame: 0 → last }`.
  - Hold a short beat at the start and end (`tl.to({}, { duration: 0.15 })`).
  - The headline block starts visible on the left. Over the first 30% it eases up slightly (`yPercent: -6`) and the CTAs stay fixed and clickable the whole time.
  - At the end, a small caption fades in under the tooth: "Porcelain crown on a titanium implant".
- **Tablet (768–1023 px).** Same scene with `end: "+=100%"`.
- **Mobile (< 768 px).** No pinning.
  - When the hero is in view, play the 72 mobile frames once on a time-based tween (about 2.4 s, `power1.inOut`) and stop on the last frame.
  - Text sits above the tooth (9:16 composition).
- **Reduced motion.** Under `prefers-reduced-motion: reduce`:
  - Show `hero-final-*.webp` as a static image.
  - Don't create the canvas, pinning or Lenis.
- **Robustness.**
  - If frames fail to load, the poster stays and nothing breaks.
  - Call `ScrollTrigger.refresh()` after `document.fonts.ready` and after the first frame draws.
  - Set `ScrollTrigger.config({ ignoreMobileResize: true })`.
  - Booking never depends on this component.
- **Analytics.** Fire `hero_scroll_50` and `hero_scroll_100` events once each.

## Other motion (keep it quiet)

- **Lenis.** One `SmoothScroll` client provider in the root layout.
  - Settings: `lerp: 0.1`, synced to ScrollTrigger on GSAP's ticker.
  - Disabled under reduced motion.
  - Anchor links use `lenis.scrollTo`.
- **"Why Jerush" statement.** SplitText into lines with `mask: "lines"`, rising in with a 0.08 s stagger when it enters the viewport (not scrubbed).
- **Treatment cards and section headings.** A single fade-and-rise (`y: 24 → 0`, `opacity 0 → 1`, `power3.out`, stagger 0.06), once.
- **Inside the clinic.** Subtle image parallax (`yPercent` ±6 on the inner image inside an overflow-hidden frame), desktop only.
- **Animating properties.** Animate only `transform` and `opacity`. Use `gsap.matchMedia()` for breakpoints and reduced motion. Use `useGSAP` with a scope ref everywhere for cleanup.
- **Totals.** One pinned scene in total. Nothing else pins, snaps or hijacks scroll speed.

## Booking flow (F3–F5)

- **Fields:**
  - Full name.
  - Mobile number: Indian 10-digit, accepting a +91 prefix, validated with `/^(?:\+?91)?[6-9]\d{9}$/` after stripping spaces.
  - Treatment: select from `treatments.ts`, plus "Not sure / check-up".
  - Preferred date: no past dates; Sundays disabled with a hint.
  - Slot: Morning or Evening segmented control.
  - Note: optional, 300 characters.
  - Consent checkbox: "I agree to be contacted about my appointment."
  - Honeypot field and a minimum fill-time check against spam.
- **Behaviour:**
  - Inline errors appear on blur.
  - The submit button shows a spinner and disables while sending.
  - On success, replace the form with a confirmation: "Thanks, [name]. We'll call you within working hours to confirm." It shows the clinic phone and a "Message us on WhatsApp" button.
- **Server Action `bookAppointment`:**
  1. Validate with the same Zod schema.
  2. Rate-limit by IP (simple in-memory or KV-ready interface).
  3. Then deliver:
     - `POST` JSON to `process.env.BOOKING_WEBHOOK_URL` if set (works for GoHighLevel, Make.com or a Google Sheets Apps Script), and/or
     - send an email via Resend if `RESEND_API_KEY` and `BOOKING_EMAIL_TO` are set.
     - If neither is set (demo mode), log to the server console and still return success.
  4. Never expose secrets to the client.
  5. Add `.env.example` documenting every variable.
- **WhatsApp links.** Build them with `https://wa.me/${site.whatsapp}?text=` and a pre-filled, URL-encoded message naming the page or treatment, e.g. "Hi Jerush Dental, I'd like to book a root canal consultation."
- **Analytics events.** Track `book_click`, `whatsapp_click`, `call_click`, `directions_click`, `booking_submit_success` and `booking_submit_error`.
  - Load GA4 only if `NEXT_PUBLIC_GA_ID` is set.
  - Load it after a minimal cookie-consent banner is accepted.

## SEO and structured data

- Use the `metadata` API on every page.
  - Each page gets a unique title under 60 characters and a description under 155.
  - Each page has one primary keyword, e.g. "Root canal treatment in Anna Nagar, Madurai | Jerush Dental".
  - Set canonical URLs from `site.url`.
  - Set Open Graph and Twitter data.
- Generate OG images with `next/og`: paper background, logo and page title in Fraunces.
- Every page has exactly one H1 containing its keyword, and headings follow a logical H2/H3 order.
- **JSON-LD** (a reusable `<JsonLd>` component, data from `site.ts`):
  - `Dentist` (which is a `LocalBusiness`) on every page, with name, address, geo, telephone, email, `openingHoursSpecification`, url, logo, image and priceRange "₹₹".
  - `MedicalProcedure` and `FAQPage` on treatment pages.
  - `Physician` on `/about`.
  - `BreadcrumbList` on inner pages.
- Add `app/sitemap.ts`, `app/robots.ts` and `app/manifest.ts`.
- Use clean URLs.
- Keep the name, address and phone in the footer identical to `site.ts` on every page.

## Accessibility (WCAG 2.2 AA)

- Use semantic landmarks and add a skip link.
- Show visible 2 px `--accent` focus rings with offset.
- Tap targets must be at least 44 px.
- Contrast must be checked against the tokens.
- The accordion, menu sheet, filter chips and before/after slider must be fully keyboard operable with correct ARIA. The slider uses `role="slider"` with arrow-key support.
- The canvas is `aria-hidden`. The poster image carries the alt text: "Porcelain dental crown on a titanium implant".
- Respect reduced motion everywhere.
- Every form field has a label, and errors are linked with `aria-describedby`.

## Performance budget (must pass)

- Lighthouse mobile scores: 90+ Performance, 100 Accessibility, 100 SEO, 100 Best Practices.
- LCP under 2.5 s, INP under 200 ms, CLS under 0.1.
- The home page ships under 1.5 MB before hero frames start streaming.
- First-load JS for `/` stays under 180 KB gzipped.
- Load GSAP only in client islands that need it.
- The map embed and below-the-fold images lazy-load.
- Fonts are subset by `next/font` and preloaded.
- Images have explicit sizes, so there's no layout shift.

## Project structure

```
app/
  layout.tsx            # fonts, SmoothScroll provider, header, footer, sticky bar, JSON-LD Dentist
  page.tsx              # home
  treatments/page.tsx
  treatments/[slug]/page.tsx   # generateStaticParams from treatments.ts
  about/page.tsx  smile-gallery/page.tsx  reviews/page.tsx  contact/page.tsx
  privacy/page.tsx  terms/page.tsx  not-found.tsx
  actions/book.ts       # server action
  sitemap.ts  robots.ts  manifest.ts  opengraph-image.tsx  icon.png  apple-icon.png
components/
  hero/HeroSequence.tsx  layout/Header.tsx  layout/Footer.tsx  layout/StickyBookBar.tsx
  motion/SmoothScroll.tsx  motion/Reveal.tsx  motion/SplitStatement.tsx
  booking/BookingForm.tsx  ui/Button.tsx  ui/Card.tsx  ui/Accordion.tsx  ui/BeforeAfter.tsx
  ui/OpenStatus.tsx  ui/MapFacade.tsx  seo/JsonLd.tsx
content/  site.ts  treatments.ts  reviews.ts  faqs.ts  gallery.ts
lib/  hours.ts (IST open/closed logic, unit-tested)  whatsapp.ts  analytics.ts  validation.ts
public/  brand/  hero/  images/
docs/  asset-prompts.md
scripts/  make-placeholder-frames.mjs
```

## Build phases (stop and self-check after each)

1. **Foundation.**
   - Scaffold, add tokens, fonts and primitives (type styles, container/grid, Button, Card, media frame).
   - Add all `content/*` files with demo data.
   - Build a `/styleguide` page (excluded from the sitemap) showing the type scale, colours and components.
2. **Layout without motion.** Build every page and home section using only the primitives, with images or placeholders in place. The site must look finished with JavaScript disabled.
3. **Booking.** Build the form, server action, WhatsApp, call and directions links, the sticky bar and analytics events. Test valid, invalid and spam submissions.
4. **Hero scene.** Add placeholder frames (or the real ones), the `HeroSequence` component, and the desktop, tablet, mobile and reduced-motion behaviour. Tune `end` and `scrub` until it feels calm and controlled.
5. **Light motion.** Add Lenis, the SplitText statement, reveals and parallax.
6. **SEO, accessibility and performance.** Add metadata, JSON-LD, sitemap and OG images. Run Lighthouse and axe, and fix everything below budget.
7. **Deploy setup.** Add the OpenNext Cloudflare config and a README covering:
   - how to run, build and deploy;
   - every environment variable;
   - how to replace the demo data (`content/site.ts`);
   - how to drop in real images and hero frames;
   - a **pre-launch checklist**: replace all DEMO values, real doctor and clinic photos, real reviews, consented before/after cases, verify the address against the Google Business Profile, and set the booking webhook.

## Done means

- [ ] All routes render with no console errors, no hydration warnings, and pass `next build` and `tsc --noEmit`.
- [ ] The site looks intentional at 390, 834, 1280 and 1440 px, with no horizontal scroll at any width.
- [ ] The hero is readable instantly, scrubs smoothly at 60 fps on desktop, plays once on mobile and is static under reduced motion.
- [ ] Booking works end to end in demo mode, and with a webhook URL when one is set.
- [ ] Every DEMO value lives only in `content/site.ts` and the content files.
- [ ] The Lighthouse and accessibility budgets above are met. Report the final scores.
- [ ] No lorem ipsum, no fake counters, no stock-photo clichés, and no more than one accent colour.
