import type { Metadata } from "next";
import { Star } from "lucide-react";
import { PageIntro } from "@/components/ui/PageIntro";
import { BookSection } from "@/components/booking/BookSection";
import { reviews, reviewsAreDemo } from "@/content/reviews";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Patient reviews",
  description: "What patients say about Jerush Dental Clinic in Anna Nagar, Madurai.",
  alternates: { canonical: "/reviews/" },
};

export default function ReviewsPage() {
  const showRating = site.google.reviewCount > 0;
  return (
    <>
      <PageIntro
        title="What patients say"
        lead="We read every review. If something wasn’t right, tell us. We’d rather fix it than hear about it later."
        crumbs={[{ name: "Reviews", path: "/reviews/" }]}
      >
        {showRating && (
          <div className="glass mt-8 inline-flex items-center gap-3 rounded-full px-5 py-3">
            <Star className="fill-amber-400 text-amber-400" size={20} aria-hidden />
            <span className="tnum font-semibold">{site.google.rating.toFixed(1)}</span>
            <span className="text-ink/70">from {site.google.reviewCount} Google reviews</span>
          </div>
        )}
      </PageIntro>
      <section className="pb-[var(--section)]">
        <div className="container-x">
          {reviewsAreDemo && <p className="t-small mb-6 inline-block rounded-full border border-rule px-3 py-1 text-muted">Sample reviews for the demo</p>}
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" data-reveal="stagger">
            {reviews.map((r) => (
              <li key={r.name} className="flex flex-col rounded-[var(--radius-card)] border border-rule bg-surface p-7">
                <p className="text-[1.05rem] leading-relaxed">“{r.text}”</p>
                <p className="mt-auto pt-6 font-semibold">{r.name}</p>
                <p className="t-small text-muted">{r.treatment}</p>
              </li>
            ))}
          </ul>
          <a href={site.google.profileUrl} target="_blank" rel="noopener" className="link-arrow mt-10">
            Read all reviews on Google
          </a>
        </div>
      </section>
      <BookSection />
    </>
  );
}
