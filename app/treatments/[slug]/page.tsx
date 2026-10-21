import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, Clock, CalendarDays, MessageCircle } from "lucide-react";
import { treatments, getTreatment } from "@/content/treatments";
import { site } from "@/content/site";
import { img } from "@/lib/media";
import { formatINR } from "@/lib/format";
import { whatsappUrl } from "@/lib/contact";
import { Faq } from "@/components/ui/Faq";
import { TreatmentCard } from "@/components/ui/TreatmentCard";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { BookSection } from "@/components/booking/BookSection";
import { JsonLd, breadcrumbLd, faqLd } from "@/components/seo/JsonLd";

export const dynamicParams = false;

export function generateStaticParams() {
  return treatments.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/treatments/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const t = getTreatment(slug);
  if (!t) return {};
  const title = t.keyword.length <= 58 ? t.keyword : `${t.name} in Madurai`;
  return {
    title: { absolute: `${title} | Jerush` },
    description: `${t.short} ${t.priceNote}. Book at Jerush Dental Clinic, Anna Nagar.`.slice(0, 155),
    alternates: { canonical: `/treatments/${t.slug}/` },
  };
}

export default async function TreatmentPage({ params }: PageProps<"/treatments/[slug]">) {
  const { slug } = await params;
  const t = getTreatment(slug);
  if (!t) notFound();
  const i = img(t.image);
  const related = treatments.filter((x) => x.slug !== t.slug).slice(0, 3);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Treatments", path: "/treatments/" },
    { name: t.name, path: `/treatments/${t.slug}/` },
  ];

  return (
    <>
      <section className="relative isolate overflow-hidden pb-[clamp(3rem,7vw,6rem)] pt-[calc(var(--header-h)+clamp(3rem,7vw,6rem))]">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(55%_70%_at_80%_20%,var(--mist),transparent_70%),linear-gradient(180deg,#EEF4F3,var(--paper))]" />
        <div className="container-x grid-12 items-center gap-y-10">
          <div className="col-span-4 md:col-span-6 lg:col-span-6">
            <nav aria-label="Breadcrumb">
              <ol className="t-small flex flex-wrap gap-1.5 text-muted">
                <li><Link href="/" className="hover:text-ink">Home</Link> /</li>
                <li><Link href="/treatments/" className="hover:text-ink">Treatments</Link> /</li>
                <li aria-current="page" className="text-ink">{t.name}</li>
              </ol>
            </nav>
            <h1 className="t-display mt-5 !text-[clamp(2.6rem,5.2vw,4.8rem)]">{t.name}</h1>
            <p className="t-lead mt-5">{t.short}</p>
            <div className="mt-7 flex flex-wrap gap-3">
              <TrackedLink event="book_click" location={`treatment_${t.slug}`} href="#book" className="btn btn-primary">
                Book a consultation
              </TrackedLink>
              <TrackedLink
                event="whatsapp_click"
                location={`treatment_${t.slug}`}
                href={whatsappUrl(`a ${t.name.toLowerCase()} consultation`)}
                target="_blank"
                rel="noopener"
                data-glass-follow
                className="glass btn btn-glass"
              >
                <MessageCircle size={18} aria-hidden /> Ask on WhatsApp
              </TrackedLink>
            </div>
          </div>
          <div className="relative col-span-4 md:col-span-4 md:col-start-2 lg:col-span-5 lg:col-start-8">
            <div className="media aspect-[4/5]">
              <Image src={i.src} alt={i.alt} width={i.width} height={i.height} sizes="(min-width:1024px) 38vw, 80vw" priority />
            </div>
            <dl data-glass-follow className="glass absolute -bottom-5 left-4 right-4 grid grid-cols-3 gap-2 rounded-[22px] p-4 sm:left-[-1.5rem] sm:right-auto sm:min-w-[340px]">
              <div>
                <dt className="t-small text-ink/60">From</dt>
                <dd className="tnum font-semibold text-accent">{formatINR(t.priceFrom)}</dd>
              </div>
              <div>
                <dt className="t-small flex items-center gap-1 text-ink/60"><Clock size={13} aria-hidden /> Time</dt>
                <dd className="t-small font-semibold">{t.duration}</dd>
              </div>
              <div>
                <dt className="t-small flex items-center gap-1 text-ink/60"><CalendarDays size={13} aria-hidden /> Visits</dt>
                <dd className="t-small font-semibold">{t.visits}</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-x grid-12 gap-y-12">
          <div className="col-span-4 md:col-span-6 lg:col-span-7">
            <h2 className="t-h2">What it is</h2>
            <p data-split className="t-statement mt-6 !text-[clamp(1.4rem,2.4vw,2.1rem)]">{t.whatItIs}</p>
          </div>
          <div className="col-span-4 md:col-span-6 lg:col-span-4 lg:col-start-9">
            <h2 className="t-h3">Who it’s for</h2>
            <ul className="mt-5 space-y-3" data-reveal="stagger">
              {t.whoNeedsIt.map((w) => (
                <li key={w} className="flex gap-3">
                  <Check size={20} className="mt-0.5 shrink-0 text-accent" aria-hidden /> <span>{w}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section aria-labelledby="steps-title" className="pb-[var(--section)]">
        <div className="container-x">
          <h2 id="steps-title" className="t-h2">Step by step</h2>
          <ol className={`mt-10 grid gap-5 md:grid-cols-2 ${t.steps.length > 3 ? "lg:grid-cols-4" : "lg:grid-cols-3"}`} data-reveal="stagger">
            {t.steps.map((s, n) => (
              <li key={s.title} className="rounded-[var(--radius-card)] border border-rule bg-surface p-6">
                <span className="glass grid size-11 place-items-center rounded-full font-display text-[1.2rem] text-accent">{n + 1}</span>
                <h3 className="t-h3 mt-5">{s.title}</h3>
                <p className="mt-2 text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="mt-10 rounded-[var(--radius-card)] bg-accent-soft p-6 sm:p-8">
            <p className="t-label text-accent">Price</p>
            <p className="tnum mt-2 font-display text-[clamp(1.6rem,3vw,2.4rem)] leading-tight">{t.priceNote}</p>
            <p className="t-small mt-2 text-muted">Confirmed in writing after your check-up. Cash, UPI and cards accepted.</p>
          </div>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="pb-[var(--section)]">
        <div className="container-x grid-12 gap-y-8">
          <h2 id="faq-title" className="t-h2 col-span-4 md:col-span-6 lg:col-span-4">Questions about {t.name.toLowerCase()}</h2>
          <div className="col-span-4 md:col-span-6 lg:col-span-7 lg:col-start-6">
            <Faq items={t.faqs} />
          </div>
        </div>
      </section>

      <section aria-labelledby="related-title" className="pb-[var(--section)]">
        <div className="container-x">
          <h2 id="related-title" className="t-h2">Other treatments</h2>
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
            {related.map((r) => (
              <li key={r.slug}>
                <TreatmentCard t={r} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BookSection heading={`Book a ${t.name.toLowerCase()} consultation`} defaultTreatment={t.name} context={`a ${t.name.toLowerCase()} consultation`} />

      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          faqLd(t.faqs),
          {
            "@context": "https://schema.org",
            "@type": "MedicalProcedure",
            name: t.name,
            description: t.whatItIs,
            howPerformed: t.steps.map((s) => `${s.title}: ${s.text}`).join(" "),
            url: `${site.url}/treatments/${t.slug}/`,
            provider: { "@id": `${site.url}/#dentist` },
          },
        ]}
      />
    </>
  );
}
