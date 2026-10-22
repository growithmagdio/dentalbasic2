import Link from "next/link";
import type { ReactNode } from "react";
import { JsonLd, breadcrumbLd } from "@/components/seo/JsonLd";

/** Inner-page header: breadcrumb, H1, lead text, on a soft mist backdrop the glass header can refract. */
export function PageIntro({
  title,
  lead,
  crumbs,
  children,
}: {
  title: string;
  lead?: string;
  crumbs: { name: string; path: string }[];
  children?: ReactNode;
}) {
  const all = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <section className="relative isolate overflow-hidden pb-[clamp(2.5rem,5vw,5rem)] pt-[calc(var(--header-h)+clamp(2.5rem,6vw,7rem))]">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_80%_at_85%_10%,var(--mist),transparent_70%),radial-gradient(40%_60%_at_10%_0%,#fff,transparent_70%),linear-gradient(180deg,#EEF4F3,var(--paper))]"
      />
      <div className="container-x">
        <nav aria-label="Breadcrumb">
          <ol className="t-small flex flex-wrap items-center gap-1.5 text-muted">
            {all.map((c, i) => (
              <li key={c.path} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden>/</span>}
                {i < all.length - 1 ? (
                  <Link href={c.path} className="hover:text-ink">
                    {c.name}
                  </Link>
                ) : (
                  <span aria-current="page" className="text-ink">
                    {c.name}
                  </span>
                )}
              </li>
            ))}
          </ol>
        </nav>
        <h1 className="t-display mt-3.5 sm:mt-5 max-w-[16ch] !text-[clamp(2.1rem,5vw,5rem)]">{title}</h1>
        {lead && <p className="t-lead mt-3 sm:mt-5 !max-w-[56ch] text-[1rem] sm:text-[1.2rem]">{lead}</p>}
        {children}
      </div>
      <JsonLd data={breadcrumbLd(all)} />
    </section>
  );
}
