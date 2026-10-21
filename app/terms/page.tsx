import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Terms of use", alternates: { canonical: "/terms/" }, robots: { index: false } };

export default function TermsPage() {
  return (
    <>
      <PageIntro title="Terms of use" crumbs={[{ name: "Terms", path: "/terms/" }]} />
      <section className="pb-[var(--section)]">
        <div className="container-x prose-block max-w-[70ch] text-ink/85">
          <p>This is a template for the demo. Have it reviewed before launch.</p>
          <p>Information on this website is general and is not a diagnosis. Your dentist will advise you after an examination.</p>
          <p>Prices shown are starting prices. Your final price is confirmed in writing before any treatment begins.</p>
          <p>An appointment request is not a confirmed booking until {site.name} contacts you to confirm it.</p>
        </div>
      </section>
    </>
  );
}
