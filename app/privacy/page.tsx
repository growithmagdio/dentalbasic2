import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { site } from "@/content/site";

export const metadata: Metadata = { title: "Privacy policy", alternates: { canonical: "/privacy/" }, robots: { index: false } };

export default function PrivacyPage() {
  return (
    <>
      <PageIntro title="Privacy policy" crumbs={[{ name: "Privacy", path: "/privacy/" }]} />
      <section className="pb-[var(--section)]">
        <div className="container-x prose-block max-w-[70ch] text-ink/85">
          <p>This is a template for the demo. Have it reviewed before launch.</p>
          <p>
            When you request an appointment, we collect your name, mobile number, preferred treatment, date and time, and any note you add. We use these only to contact you about your appointment.
          </p>
          <p>Your request is sent to {site.name} by email or messaging and stored where only the clinic team can access it. We don’t sell or share it.</p>
          <p>If analytics is enabled, it runs only after you accept the cookie banner, and records anonymous page visits and button clicks.</p>
          <p>
            To see, correct or delete your information, email <a className="text-accent underline" href={`mailto:${site.email}`}>{site.email}</a> or call {site.phone}.
          </p>
        </div>
      </section>
    </>
  );
}
