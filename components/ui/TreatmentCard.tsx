import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Treatment } from "@/content/treatments";
import { img } from "@/lib/media";
import { formatINR } from "@/lib/format";

export function TreatmentCard({ t, sizes = "(min-width:1024px) 30vw, (min-width:768px) 45vw, 80vw" }: { t: Treatment; sizes?: string }) {
  const i = img(t.image);
  return (
    <Link
      href={`/treatments/${t.slug}/`}
      className="card-zoom group relative block aspect-[4/5] overflow-hidden rounded-[var(--radius-card)] bg-accent-soft"
    >
      <Image src={i.src} alt={i.alt} width={i.width} height={i.height} sizes={sizes} className="absolute inset-0 size-full object-cover" />
      <div
        data-glass-follow
        className="glass absolute inset-x-2.5 bottom-2.5 sm:inset-x-3 sm:bottom-3 rounded-[16px] sm:rounded-[18px] p-3.5 sm:p-4 pr-12 sm:pr-14 transition-[--g-alpha] duration-500 group-hover:[--g-alpha:0.55]"
      >
        <h3 className="text-[1.05rem] sm:text-[1.15rem] font-semibold leading-tight text-ink">{t.name}</h3>
        <p className="t-small mt-1 text-ink/75 line-clamp-2">{t.short}</p>
        <p className="t-small tnum mt-1.5 sm:mt-2 font-semibold text-accent">from {formatINR(t.priceFrom)}</p>
        <span className="glass glass-lens absolute right-2.5 top-2.5 sm:right-3 sm:top-3 grid size-8 sm:size-9 place-items-center rounded-full text-ink transition-transform duration-500 group-hover:rotate-45">
          <ArrowUpRight size={16} aria-hidden />
        </span>
      </div>
    </Link>
  );
}
