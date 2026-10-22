import type { Metadata } from "next";
import { ImageOff } from "lucide-react";
import { PageIntro } from "@/components/ui/PageIntro";
import { BeforeAfter } from "@/components/ui/BeforeAfter";
import { BookSection } from "@/components/booking/BookSection";
import { gallery } from "@/content/gallery";
import { treatments } from "@/content/treatments";

export const metadata: Metadata = {
  title: "Smile gallery: before and after",
  description: "Real before-and-after results from Jerush Dental Clinic patients, shared with their consent.",
  alternates: { canonical: "/smile-gallery/" },
};

export default function GalleryPage() {
  return (
    <>
      <PageIntro
        title="Smile gallery"
        lead="Real results from real patients, shared with their written consent. Drag the slider to compare before and after."
        crumbs={[{ name: "Smile gallery", path: "/smile-gallery/" }]}
      />
      <section className="pb-[var(--section)]">
        <div className="container-x">
          {gallery.length > 0 ? (
            <ul className="grid gap-6 md:grid-cols-2" data-reveal="stagger">
              {gallery.map((c) => (
                <li key={c.before} className="rounded-[var(--radius-card)] border border-rule bg-surface p-4 sm:p-5 shadow-sm transition hover:shadow-md">
                  <BeforeAfter before={c.before} after={c.after} alt={c.alt} />
                  <div className="mt-4 flex items-center justify-between gap-3">
                    <h2 className="font-semibold text-ink text-[1.1rem]">{c.treatment}</h2>
                    <span className="t-small text-accent font-medium">Drag slider to compare</span>
                  </div>
                  <p className="t-small mt-1.5 text-muted">{c.alt}</p>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
              {treatments.slice(0, 6).map((t) => (
                <li key={t.slug} className="relative grid aspect-[4/3] place-items-center overflow-hidden rounded-[var(--radius-card)] bg-[radial-gradient(70%_70%_at_70%_20%,#fff,transparent),linear-gradient(135deg,var(--accent-soft),var(--paper))]">
                  <div className="glass rounded-[20px] px-5 py-4 text-center">
                    <ImageOff size={20} className="mx-auto text-accent" aria-hidden />
                    <p className="mt-2 font-semibold">{t.name}</p>
                    <p className="t-small text-ink/65">Real patient cases coming soon</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
      <BookSection />
    </>
  );
}
