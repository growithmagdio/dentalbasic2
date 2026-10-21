import Link from "next/link";
import Image from "next/image";
import { site, fullAddress, mapsDirectionsUrl } from "@/content/site";
import { treatments } from "@/content/treatments";
import { groupedHours } from "@/lib/hours";
import { NAV } from "@/lib/nav";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink pb-28 text-white/80 sm:pb-0">
      <div className="container-x grid-12 gap-y-12 py-20">
        <div className="col-span-4 md:col-span-6 lg:col-span-4">
          <Image
            src="/brand/jerush-logo-horizontal-white.svg"
            alt={site.name}
            width={512}
            height={200}
            unoptimized
            loading="eager"
            className="h-12 w-auto"
          />
          {/* NAP — identical to Google Business Profile */}
          <address className="mt-6 not-italic leading-relaxed">
            <strong className="font-semibold text-white">{site.name}</strong>
            <br />
            {fullAddress}
            <br />
            <a className="tnum hover:text-white" href={site.phoneHref}>
              {site.phone}
            </a>
            <br />
            <a className="hover:text-white" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </address>
          <a href={mapsDirectionsUrl} target="_blank" rel="noopener" className="mt-4 inline-block font-semibold text-accent-on-dark hover:underline">
            Get directions
          </a>
        </div>

        <div className="col-span-4 md:col-span-3 lg:col-span-3">
          <h2 className="t-label text-white">Hours</h2>
          <ul className="tnum mt-4 space-y-3">
            {groupedHours().map((d) => (
              <li key={d.label}>
                <span className="block text-white">{d.label}</span>
                <span className="whitespace-pre-line">{d.text}</span>
              </li>
            ))}
          </ul>
        </div>

        <nav aria-label="Footer" className="col-span-2 md:col-span-3 lg:col-span-2 lg:col-start-9">
          <h2 className="t-label text-white">Clinic</h2>
          <ul className="mt-4 space-y-2">
            <li>
              <Link className="hover:text-white" href="/">
                Home
              </Link>
            </li>
            {NAV.map((n) => (
              <li key={n.href}>
                <Link className="hover:text-white" href={n.href}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Treatments" className="col-span-2 md:col-span-3 lg:col-span-2">
          <h2 className="t-label text-white">Treatments</h2>
          <ul className="mt-4 space-y-2">
            {treatments.map((t) => (
              <li key={t.slug}>
                <Link className="hover:text-white" href={`/treatments/${t.slug}/`}>
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x t-small flex flex-col gap-3 py-6 text-white/55 md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/privacy/" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms/" className="hover:text-white">
              Terms
            </Link>
            <a href={site.social.instagram} className="hover:text-white">
              Instagram
            </a>
            <a href={site.social.facebook} className="hover:text-white">
              Facebook
            </a>
            <a href={site.credit.url} target="_blank" rel="noopener" className="hover:text-white">
              {site.credit.label}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
