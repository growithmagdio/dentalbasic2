import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { HeroSequence } from "@/components/hero/HeroSequence";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { TreatmentCard } from "@/components/ui/TreatmentCard";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { BookSection } from "@/components/booking/BookSection";
import { site } from "@/content/site";
import { treatments } from "@/content/treatments";
import { reviews, reviewsAreDemo } from "@/content/reviews";
import { whatsappUrl } from "@/lib/contact";
import { img } from "@/lib/media";
import { noOrphan } from "@/lib/format";

export default function Home() {
  const doctor = img("doctor-portrait");
  const reception = img("clinic-reception");
  const room = img("clinic-treatment-room");
  const steril = img("clinic-sterilisation");
  const consult = img("visit-consultation");

  return (
    <>
      {/* 1 — Hero */}
      <HeroSequence caption="Porcelain crown on a titanium implant">
        <div className="max-w-[640px] landscape:lg:max-w-[46%]">
          <OpenStatus className="glass glass-clear rounded-full px-3.5 py-1.5 text-[0.88rem] font-semibold text-ink/85" />
          <h1 id="hero-title" className="t-display mt-5 text-ink">
            Gentle, precise dentistry in Anna Nagar,&nbsp;Madurai.
          </h1>
          <p className="t-lead mt-4 !text-ink/75 max-sm:!text-[1.05rem]">
            Check-ups, root canals, implants and aligners with {site.doctor.name}. Clear prices before we start, and same-week appointments.
          </p>
          <div className="mt-7 flex flex-nowrap gap-2 sm:mt-8 sm:gap-3">
            <TrackedLink event="book_click" location="hero" href="#book" className="btn btn-primary max-sm:!px-4">
              Book an appointment
            </TrackedLink>
            <TrackedLink
              event="whatsapp_click"
              location="hero"
              href={whatsappUrl("an appointment")}
              target="_blank"
              rel="noopener"
              data-glass-follow
              className="glass btn btn-glass max-sm:!px-4"
            >
              <MessageCircle size={18} aria-hidden /> WhatsApp
            </TrackedLink>
          </div>
        </div>
      </HeroSequence>

      {/* 2 — Proof strip */}
      <section aria-label="Why patients trust us" className="border-b border-rule bg-paper">
        <ul className="container-x grid grid-cols-2 lg:grid-cols-4">
          {[
            [`${site.doctor.yearsInPractice} years`, "in practice"],
            ["MDS", "Prosthodontics specialist"],
            ["Sterilised", "and sealed instruments, every patient"],
            ["Tamil & English", "spoken"],
          ].map(([a, b]) => (
            <li
              key={a}
              className="border-rule py-7 pr-4 even:border-l even:pl-5 [&:nth-child(n+3)]:border-t lg:pl-6 lg:first:pl-0 lg:[&:nth-child(n+2)]:border-l lg:[&:nth-child(n+3)]:border-t-0"
            >
              <p className="font-display text-[1.6rem] leading-none tracking-tight">{a}</p>
              <p className="t-small mt-1.5 text-muted">{b}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* 3 — Statement */}
      <section className="section">
        <div className="container-x grid-12">
          <p className="col-span-4 t-label text-accent md:col-span-6 lg:col-span-2">Why Jerush</p>
          <p data-split className="t-statement col-span-4 mt-4 md:col-span-6 lg:col-span-10 lg:mt-0">
            We explain every step before we begin, quote the price up front, and never rush a nervous patient. Your instruments are opened fresh, in front of you.
          </p>
        </div>
      </section>

      {/* 4 — Treatments */}
      <section aria-labelledby="treatments-title" className="pb-[calc(var(--section)*0.55)]">
        <div className="container-x">
          <div className="grid-12 items-end gap-y-4">
            <h2 id="treatments-title" className="t-h2 col-span-4 md:col-span-4 lg:col-span-6">Treatments</h2>
            <p className="col-span-4 text-muted md:col-span-2 lg:col-span-4 lg:col-start-9">
              Every visit starts with a check and a written plan. Prices below are starting points; your quote is confirmed before treatment.
            </p>
          </div>
          <ul
            data-reveal="stagger"
            className="snap-row -mx-[var(--gutter)] mt-12 flex gap-4 overflow-x-auto px-[var(--gutter)] pb-2 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 lg:grid-cols-3 lg:gap-6"
          >
            {treatments.map((t) => (
              <li key={t.slug} className="w-[78vw] max-w-[340px] shrink-0 md:w-auto md:max-w-none">
                <TreatmentCard t={t} />
              </li>
            ))}
          </ul>
          <Link href="/treatments/" className="link-arrow mt-8">
            Compare all treatments <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </section>

      {/* 5 — Doctor */}
      <section aria-labelledby="doctor-title" className="section bg-[linear-gradient(180deg,var(--paper),#EFEBE4)] !pt-[calc(var(--section)*0.55)]">
        <div className="container-x grid-12 items-center gap-y-12">
          <div className="relative col-span-4 md:col-span-6 lg:col-span-5">
            <div className="media aspect-[4/5]">
              <Image src={doctor.src} alt={doctor.alt} width={doctor.width} height={doctor.height} sizes="(min-width:1024px) 40vw, 90vw" />
            </div>
            <div data-glass-follow className="glass absolute -bottom-6 right-4 max-w-[78%] rounded-[22px] p-4 sm:right-[-1.5rem] lg:right-[-3rem]">
              <p className="font-semibold">{site.doctor.name}</p>
              <p className="t-small text-ink/75">{site.doctor.qualifications}</p>
              <p className="t-small tnum text-ink/60">{site.doctor.registration}</p>
            </div>
          </div>
          <div className="col-span-4 md:col-span-6 lg:col-span-6 lg:col-start-7" data-reveal>
            <h2 id="doctor-title" className="t-h2">{noOrphan("Meet the doctor who will treat you")}</h2>
            <blockquote className="mt-6 border-l-2 border-accent pl-5 font-display text-[1.35rem] leading-snug text-ink/90">
              “{site.doctor.note}”
            </blockquote>
            <p className="mt-6 max-w-[56ch] text-muted">{site.doctor.bio[1]}</p>
            <Link href="/about/" className="link-arrow mt-6">
              More about {site.doctor.firstName} <ArrowRight size={18} aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      {/* 6 — Inside the clinic */}
      <section aria-labelledby="clinic-title" className="section pt-0 bg-[#EFEBE4]">
        <div className="relative h-[78svh] min-h-[460px] overflow-hidden">
          <div data-parallax="7" className="absolute inset-x-0 -top-[8%] h-[116%]">
            <Image src={reception.src} alt={reception.alt} width={reception.width} height={reception.height} sizes="100vw" className="size-full object-cover" />
          </div>
          <div className="container-x relative flex h-full items-end pb-8 sm:pb-12">
            <div data-glass-follow className="glass max-w-[520px] rounded-[28px] p-6 sm:p-8">
              <h2 id="clinic-title" className="t-h2">Inside the clinic</h2>
              <p className="mt-3 text-ink/80">
                A quiet reception, two bright treatment rooms and a sterilisation area you’re welcome to see. Spotless is the minimum.
              </p>
            </div>
          </div>
        </div>
        <div className="container-x mt-6 grid gap-6 md:grid-cols-[1.45fr_1fr]" data-reveal="stagger">
          <figure>
            <div className="media aspect-[3/2]">
              <Image src={room.src} alt={room.alt} width={room.width} height={room.height} sizes="(min-width:768px) 58vw, 100vw" />
            </div>
            <figcaption className="t-small mt-3 text-muted">Treatment room: chairs are wiped down and instruments opened fresh for every patient.</figcaption>
          </figure>
          <figure>
            <div className="media aspect-[4/5] md:aspect-auto md:h-[calc(100%-2.6rem)]">
              <Image src={steril.src} alt={steril.alt} width={steril.width} height={steril.height} sizes="(min-width:768px) 40vw, 100vw" />
            </div>
            <figcaption className="t-small mt-3 text-muted">Autoclave sterilisation, sealed pouches, single-use where it matters.</figcaption>
          </figure>
        </div>
      </section>

      {/* 7 — How a visit works */}
      <section aria-labelledby="visit-title" className="section">
        <div className="container-x grid-12 items-center gap-y-12">
          <div className="col-span-4 md:col-span-6 lg:col-span-5">
            <h2 id="visit-title" className="t-h2">How a visit works</h2>
            <ol className="mt-10 space-y-8" data-reveal="stagger">
              {[
                ["Book online or on WhatsApp", "Pick a morning or evening slot. We call to confirm, usually within the hour."],
                ["Check-up and a written quote", "X-rays only if needed. You get the options and prices in writing, with no pressure."],
                ["Treatment at your pace", "We explain as we go and stop whenever you need a break."],
              ].map(([title, text], i) => (
                <li key={title} className="grid grid-cols-[3.25rem_1fr] gap-4">
                  <span className="glass grid size-12 place-items-center rounded-full font-display text-[1.3rem] text-accent">{i + 1}</span>
                  <div>
                    <h3 className="t-h3">{title}</h3>
                    <p className="mt-1.5 text-muted">{text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <div className="col-span-4 md:col-span-6 lg:col-span-6 lg:col-start-7">
            <div className="media aspect-[3/2]">
              <Image src={consult.src} alt={consult.alt} width={consult.width} height={consult.height} sizes="(min-width:1024px) 48vw, 100vw" />
            </div>
          </div>
        </div>
      </section>

      {/* 8 — Reviews */}
      <section aria-labelledby="reviews-title" className="section pt-0">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="reviews-title" className="t-h2">What patients say</h2>
            {reviewsAreDemo && <span className="t-small rounded-full border border-rule px-3 py-1 text-muted">Sample reviews</span>}
          </div>
          <ul className="mt-10 grid gap-5 md:grid-cols-3" data-reveal="stagger">
            {reviews.map((r) => (
              <li key={r.name} className="flex flex-col rounded-[var(--radius-card)] border border-rule bg-surface p-7">
                <p className="text-[1.05rem] leading-relaxed text-ink/90">“{r.text}”</p>
                <div className="mt-auto flex items-center gap-3 pt-6">
                  <span aria-hidden className="grid size-11 place-items-center rounded-full bg-accent-soft font-semibold text-accent">
                    {r.name.split(" ").map((p) => p[0]).join("")}
                  </span>
                  <div>
                    <p className="font-semibold">{r.name}</p>
                    <p className="t-small text-muted">{r.treatment}</p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <Link href="/reviews/" className="link-arrow mt-8">
            Read more reviews <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </section>

      {/* 9 — Book */}
      <BookSection />
    </>
  );
}
