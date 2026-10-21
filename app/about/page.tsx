import type { Metadata } from "next";
import Image from "next/image";
import { ShieldCheck, PackageCheck, Recycle, Eye } from "lucide-react";
import { PageIntro } from "@/components/ui/PageIntro";
import { BookSection } from "@/components/booking/BookSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { site } from "@/content/site";
import { img } from "@/lib/media";

export const metadata: Metadata = {
  title: `About ${site.doctor.name}, dentist in Anna Nagar`,
  description: `${site.doctor.name}, ${site.doctor.qualifications}, with ${site.doctor.yearsInPractice} years of practice. Meet the doctor and see inside Jerush Dental Clinic.`,
  alternates: { canonical: "/about/" },
};

export default function AboutPage() {
  const d = img("doctor-portrait");
  const rec = img("clinic-reception");
  const room = img("clinic-treatment-room");
  const st = img("clinic-sterilisation");
  return (
    <>
      <PageIntro
        title={`Meet ${site.doctor.name}`}
        lead={`${site.doctor.qualifications}. ${site.doctor.yearsInPractice} years of careful, unhurried dentistry for families in Madurai.`}
        crumbs={[{ name: "About", path: "/about/" }]}
      />

      <section className="pb-[var(--section)]">
        <div className="container-x grid-12 items-start gap-y-12">
          <div className="relative col-span-4 md:col-span-6 lg:col-span-5">
            <div className="media aspect-[4/5]">
              <Image src={d.src} alt={d.alt} width={d.width} height={d.height} sizes="(min-width:1024px) 40vw, 90vw" priority />
            </div>
          </div>
          <div className="col-span-4 md:col-span-6 lg:col-span-6 lg:col-start-7">
            <blockquote className="font-display text-[clamp(1.5rem,2.6vw,2.2rem)] leading-snug">“{site.doctor.note}”</blockquote>
            <div className="prose-block mt-8 max-w-[60ch] text-ink/80">
              {site.doctor.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-rule bg-rule">
              {[
                ["Qualifications", site.doctor.qualifications],
                ["Registration", site.doctor.registration],
                ["Experience", `${site.doctor.yearsInPractice} years`],
                ["Languages", site.languages.join(" and ")],
              ].map(([k, v]) => (
                <div key={k} className="bg-surface p-5">
                  <dt className="t-small text-muted">{k}</dt>
                  <dd className="tnum mt-1 font-semibold">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section aria-labelledby="tour-title" className="pb-[var(--section)]">
        <div className="container-x">
          <h2 id="tour-title" className="t-h2">Inside the clinic</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-12" data-reveal="stagger">
            <figure className="md:col-span-7">
              <div className="media aspect-[3/2]"><Image src={rec.src} alt={rec.alt} width={rec.width} height={rec.height} sizes="(min-width:768px) 58vw, 100vw" /></div>
              <figcaption className="t-small mt-3 text-muted">Reception and waiting area</figcaption>
            </figure>
            <figure className="md:col-span-5">
              <div className="media aspect-[3/2] md:aspect-auto md:h-[calc(100%-2.6rem)]"><Image src={room.src} alt={room.alt} width={room.width} height={room.height} sizes="(min-width:768px) 40vw, 100vw" /></div>
              <figcaption className="t-small mt-3 text-muted">Treatment room</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section aria-labelledby="steril-title" className="section bg-ink text-white">
        <div className="container-x grid-12 items-center gap-y-12">
          <div className="col-span-4 md:col-span-6 lg:col-span-5">
            <div className="media aspect-[4/5]"><Image src={st.src} alt={st.alt} width={st.width} height={st.height} sizes="(min-width:1024px) 40vw, 90vw" /></div>
          </div>
          <div className="col-span-4 md:col-span-6 lg:col-span-6 lg:col-start-7">
            <h2 id="steril-title" className="t-h2">Our sterilisation promise</h2>
            <ul className="mt-8 space-y-6" data-reveal="stagger">
              {[
                [ShieldCheck, "Autoclaved instruments", "Every reusable instrument is cleaned and sterilised in an autoclave between patients."],
                [PackageCheck, "Sealed until you’re seated", "Instruments stay in sealed pouches and are opened in front of you."],
                [Recycle, "Single-use where it matters", "Needles, gloves, suction tips and cups are used once and discarded."],
                [Eye, "Come and look", "Ask to see the sterilisation area on any visit. We’re proud of it."],
              ].map(([Icon, title, text]) => {
                const I = Icon as typeof ShieldCheck;
                return (
                  <li key={title as string} className="flex gap-4">
                    <span className="glass glass-dark grid size-12 shrink-0 place-items-center rounded-full"><I size={20} className="text-accent-on-dark" aria-hidden /></span>
                    <div>
                      <h3 className="t-h3 text-white">{title as string}</h3>
                      <p className="mt-1 text-white/70">{text as string}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </section>

      <BookSection />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Physician",
          name: site.doctor.name,
          medicalSpecialty: "Dentistry",
          description: site.doctor.bio.join(" "),
          worksFor: { "@id": `${site.url}/#dentist` },
          url: `${site.url}/about/`,
        }}
      />
    </>
  );
}
