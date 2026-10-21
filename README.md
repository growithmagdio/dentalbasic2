# Jerush Dental Clinic — website

Premium, mobile-first clinic site: Next.js 16 (App Router, static export), Tailwind CSS v4, GSAP + ScrollTrigger + SplitText, Lenis smooth scroll, and a liquid-glass UI layer. The hero is a scroll-scrubbed image sequence of a porcelain crown assembling onto a titanium implant.

> **Demo build.** All business details (address, phone, email, doctor, prices, reviews) are placeholders marked `DEMO`. The clinic and doctor photos are AI-generated stand-ins. See the pre-launch checklist below.

## Quick start

```bash
npm install
npm run assets     # downloads the real photos + hero clips and optimises them into /public (needs internet, ~1–2 min)
npm run dev        # http://localhost:3000
```

The repo ships with lightweight placeholders, so `npm run dev` works even before `npm run assets`. To restore the placeholders: `npm run placeholders`.

## Scripts

| Script | What it does |
|---|---|
| `npm run dev` | Local dev server |
| `npm run build` | Static export to `out/` |
| `npm run assets` | Download every image/video listed in `content/media.json`, write responsive WebP sets, hero posters and hero frame sequences |
| `npm run preview` | Build + run the site **with the booking function** locally via Wrangler |
| `npm run deploy` | Build + deploy to Cloudflare Pages (project `jerush-dental`) |
| `npm run typecheck` / `npm run lint` | Checks |

## Where things live

| Path | Contents |
|---|---|
| `content/site.ts` | **Every business detail**: name, address, phone, WhatsApp, email, hours, doctor, Google rating. Change it once, it updates everywhere (pages, footer, schema, WhatsApp links). |
| `content/treatments.ts` | The 6 treatments: copy, steps, FAQs, "from ₹" prices. Add an entry → a new page is generated. |
| `content/reviews.ts` | Reviews (`reviewsAreDemo = true` shows a "Sample reviews" label). |
| `content/gallery.ts` | Before/after cases (empty until real, consented cases exist). |
| `content/media.json` | Every image + its source render and alt text. |
| `components/hero/HeroSequence.tsx` | The 3D scroll scene. |
| `app/globals.css` | Design tokens, type scale, and the **liquid glass** system (`.glass`, `.glass-strong`, `.glass-dark`, `.glass-clear`, `.glass-lens`). |
| `components/glass/*` | SVG refraction filters (Chromium) + pointer-following specular highlight. |
| `functions/api/book.ts` | Cloudflare Pages Function that receives bookings. |
| `docs/` | The build prompt and the image/hero-animation prompts used to create the assets. |

## Liquid glass

Glass is used only on the floating layer (header, mobile booking bar, CTAs, card labels, panels over photos), never on body content.

- **All browsers:** translucent tint, backdrop blur and saturation, a gradient rim, an inner specular highlight.
- **Chromium (desktop/Android with ≥ 4 cores):** an SVG displacement filter refracts whatever is behind the glass.
- **Accessibility:** respects `prefers-reduced-transparency` (solid panels) and `prefers-reduced-motion` (no Lenis, no pinning; the hero shows the finished frame).

## Hero animation

- Frames are in `public/hero/desktop/` (16:9, used on landscape screens) and `public/hero/mobile/` (9:16, used on portrait screens). The counts are in `content/hero-frames.json`, written by `npm run assets`.
- **Width ≥ 768px:** the hero is pinned and scrubbed over 1.5 screens.
- **Phones:** the clip plays once, with no pinning.
- The poster image (first frame) renders instantly, so the headline and buttons never wait for JavaScript.

## Bookings

The form validates on the client (`lib/booking-schema.ts`) and POSTs to `/api/book/`, which the Pages Function validates again before delivering. Set these in **Cloudflare → Pages → Settings → Environment variables**:

| Variable | Purpose |
|---|---|
| `BOOKING_WEBHOOK_URL` | GoHighLevel / Make.com / Google Apps Script webhook. Receives `{ name, phone, treatment, date, slot, note, source, receivedAt }`. |
| `RESEND_API_KEY` + `BOOKING_EMAIL_TO` (+ `BOOKING_EMAIL_FROM`) | Optional email per booking. |
| `NEXT_PUBLIC_GA_ID` | Optional GA4. Loads only after the visitor accepts the consent banner. Set it at build time. |

With none set, bookings are logged and the visitor sees a demo-mode note. Spam protection: a honeypot field, a minimum fill time, and a per-IP rate limit.

## Deploy (Cloudflare Pages)

1. `npx wrangler login`
2. `npm run deploy`. The first run creates the Pages project.
3. In the Pages dashboard, add the environment variables above and connect the custom domain.

Alternatively, connect the GitHub repo in the Cloudflare dashboard with:
- build command: `npm run build`
- output directory: `out`

## Pre-launch checklist

- [ ] Replace every `DEMO` value in `content/site.ts`, and make it match the Google Business Profile exactly (name, address, phone).
- [ ] Doctor name, qualifications and registration number confirmed by the doctor.
- [ ] Real photos of the clinic and the doctor.
  - Put them in `assets-src/`, update the `source` entries in `content/media.json` (or overwrite the WebP files), then re-run `npm run assets`.
- [ ] Treatment list and "from" prices approved. Set `reviewsAreDemo = false` once reviews are real.
- [ ] Only consented before/after cases in `content/gallery.ts`.
- [ ] `BOOKING_WEBHOOK_URL` set, and one test booking received by the clinic.
- [ ] Privacy and terms text reviewed.
- [ ] Lighthouse mobile run: Performance 90+, Accessibility/SEO/Best Practices 100.
