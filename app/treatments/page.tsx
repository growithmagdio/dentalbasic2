import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { TreatmentCard } from "@/components/ui/TreatmentCard";
import { Faq } from "@/components/ui/Faq";
import { BookSection } from "@/components/booking/BookSection";
import { JsonLd, faqLd } from "@/components/seo/JsonLd";
import { treatments } from "@/content/treatments";
import { generalFaqs } from "@/content/faqs";
import { formatINR } from "@/lib/format";

export const metadata: Metadata = {
  title: "Dental treatments and prices in Anna Nagar, Madurai",
  description: "Check-ups, root canals, implants, braces and aligners, whitening and kids dentistry at Jerush Dental Clinic, with clear starting prices.",
  alternates: { canonical: "/treatments/" },
};

export default function TreatmentsPage() {
  return (
    <>
      <PageIntro
        title="Treatments and prices"
        lead="Six things we do every day, done carefully. Every visit starts with a check and a written quote, so you always know the cost before we begin."
        crumbs={[{ name: "Treatments", path: "/treatments/" }]}
      />
      <section className="pb-[var(--section)]">
        <div className="container-x">
          <ul data-reveal="stagger" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {treatments.map((t) => (
              <li key={t.slug}>
                <TreatmentCard t={t} />
              </li>
            ))}
          </ul>

          <div className="mt-[var(--section)] grid-12 gap-y-10">
            <div className="col-span-4 md:col-span-6 lg:col-span-4">
              <h2 className="t-h2">Starting prices</h2>
              <p className="mt-4 text-muted">Your exact price depends on what the check-up finds. We confirm it in writing first.</p>
            </div>
            <div className="col-span-4 md:col-span-6 lg:col-span-7 lg:col-start-6">
              <table className="w-full text-left">
                <caption className="sr-only">Treatment starting prices</caption>
                <tbody>
                  {treatments.map((t) => (
                    <tr key={t.slug} className="border-b border-rule">
                      <th scope="row" className="py-4 pr-4 font-semibold">
                        {t.name}
                        <span className="t-small block font-normal text-muted">{t.priceNote}</span>
                      </th>
                      <td className="tnum py-4 text-right font-semibold text-accent">from {formatINR(t.priceFrom)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-[var(--section)] grid-12 gap-y-8">
            <h2 className="t-h2 col-span-4 md:col-span-6 lg:col-span-4">Common questions</h2>
            <div className="col-span-4 md:col-span-6 lg:col-span-7 lg:col-start-6">
              <Faq items={generalFaqs} />
            </div>
          </div>
        </div>
      </section>
      <BookSection />
      <JsonLd data={faqLd(generalFaqs)} />
    </>
  );
}
