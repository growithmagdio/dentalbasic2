import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { BookSection } from "@/components/booking/BookSection";
import { MapFacade } from "@/components/ui/MapFacade";
import { Faq } from "@/components/ui/Faq";
import { generalFaqs } from "@/content/faqs";
import { site, fullAddress } from "@/content/site";

export const metadata: Metadata = {
  title: "Book an appointment and find us",
  description: `Book at ${site.name}, ${fullAddress}. Call ${site.phone}, WhatsApp us, or request a slot online.`,
  alternates: { canonical: "/contact/" },
};

export default function ContactPage() {
  return (
    <>
      <PageIntro
        title="Book a visit or find us"
        lead={`${fullAddress}. Request a slot below, call ${site.phone}, or message us on WhatsApp.`}
        crumbs={[{ name: "Contact", path: "/contact/" }]}
      />
      <BookSection heading="Request an appointment" />
      <section className="section">
        <div className="container-x grid-12 gap-y-10">
          <div className="col-span-4 md:col-span-6 lg:col-span-5">
            <h2 className="t-h2">Getting here</h2>
            <p className="mt-4 text-muted">{fullAddress}</p>
            <p className="mt-2 text-muted">{site.parking}.</p>
          </div>
          <div className="col-span-4 md:col-span-6 lg:col-span-7">
            <MapFacade />
          </div>
        </div>
        <div className="container-x mt-[var(--section)] grid-12 gap-y-8">
          <h2 className="t-h2 col-span-4 md:col-span-6 lg:col-span-4">Before you visit</h2>
          <div className="col-span-4 md:col-span-6 lg:col-span-7 lg:col-start-6">
            <Faq items={generalFaqs.slice(0, 4)} />
          </div>
        </div>
      </section>
    </>
  );
}
