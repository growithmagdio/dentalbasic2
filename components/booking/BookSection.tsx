import Image from "next/image";
import { Mail, MapPin, MessageCircle, Phone, Car } from "lucide-react";
import { BookingForm } from "./BookingForm";
import { OpenStatus } from "@/components/ui/OpenStatus";
import { TrackedLink } from "@/components/ui/TrackedLink";
import { site, fullAddress, mapsDirectionsUrl } from "@/content/site";
import { whatsappUrl } from "@/lib/contact";
import { groupedHours } from "@/lib/hours";
import { img } from "@/lib/media";

/** Full-bleed photograph with a strong glass booking panel and a dark glass contact panel. */
export function BookSection({ heading = "Book your visit", defaultTreatment, context }: { heading?: string; defaultTreatment?: string; context?: string }) {
  const bg = img("clinic-treatment-room");
  return (
    <section id="book" aria-labelledby="book-title" className="relative isolate overflow-hidden py-[clamp(4rem,9vw,8rem)]">
      <Image src={bg.src} alt="" width={bg.width} height={bg.height} sizes="100vw" className="absolute inset-0 -z-20 size-full object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(20_32_43/0.55)_0%,rgb(20_32_43/0.25)_55%,rgb(20_32_43/0.45)_100%)]" />

      <div className="container-x grid-12 items-start gap-y-6">
        <div className="glass glass-strong col-span-4 rounded-[22px] sm:rounded-[30px] p-5 sm:p-9 md:col-span-6 lg:col-span-7" data-glass-follow>
          <h2 id="book-title" className="t-h2 !text-[1.85rem] sm:!text-[clamp(2rem,3.6vw,3.25rem)]">{heading}</h2>
          <p className="mt-2.5 sm:mt-3 max-w-[48ch] text-ink/75 text-[0.95rem] sm:text-base">
            Tell us when suits you and we’ll call to confirm. Prefer to talk? Call or WhatsApp, we reply quickly in working hours.
          </p>
          <div className="mt-6 sm:mt-8">
            <BookingForm defaultTreatment={defaultTreatment} />
          </div>
        </div>

        <aside className="glass glass-dark col-span-4 rounded-[22px] sm:rounded-[30px] p-5 sm:p-8 md:col-span-6 lg:col-span-5" aria-label="Clinic contact details" data-glass-follow>
          <OpenStatus className="text-[0.95rem] font-semibold" />
          <ul className="mt-6 space-y-4 text-[1.02rem]">
            <li>
              <TrackedLink event="call_click" location="book_panel" href={site.phoneHref} className="flex items-center gap-3 hover:underline">
                <Phone size={18} aria-hidden className="text-accent-on-dark" /> <span className="tnum">{site.phone}</span>
              </TrackedLink>
            </li>
            <li>
              <TrackedLink event="whatsapp_click" location="book_panel" href={whatsappUrl(context ?? "an appointment")} target="_blank" rel="noopener" className="flex items-center gap-3 hover:underline">
                <MessageCircle size={18} aria-hidden className="text-accent-on-dark" /> WhatsApp us
              </TrackedLink>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-3 hover:underline">
                <Mail size={18} aria-hidden className="text-accent-on-dark" /> {site.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin size={18} aria-hidden className="mt-1 shrink-0 text-accent-on-dark" />
              <span>
                {fullAddress}
                <br />
                <TrackedLink event="directions_click" location="book_panel" href={mapsDirectionsUrl} target="_blank" rel="noopener" className="font-semibold text-accent-on-dark hover:underline">
                  Get directions
                </TrackedLink>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Car size={18} aria-hidden className="mt-1 shrink-0 text-accent-on-dark" /> {site.parking}
            </li>
          </ul>
          <table className="t-small tnum mt-7 w-full border-t border-white/15">
            <caption className="sr-only">Opening hours</caption>
            <tbody>
              {groupedHours().map((d) => (
                <tr key={d.label} className="border-b border-white/10">
                  <th scope="row" className="whitespace-nowrap py-2.5 pr-4 text-left align-top font-medium text-white/70">{d.label}</th>
                  <td className="whitespace-pre-line py-2.5 text-right">{d.text}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </aside>
      </div>
    </section>
  );
}
