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
        className="glass absolute inset-x-3 bottom-3 rounded-[18px] p-4 pr-14 transition-[--g-alpha] duration-500 group-hover:[--g-alpha:0.55]"
      >
        <h3 className="text-[1.15rem] font-semibold leading-tight text-ink">{t.name}</h3>
        <p className="t-small mt-1 text-ink/75">{t.short}</p>
        <p className="t-small tnum mt-2 font-semibold text-accent">from {formatINR(t.priceFrom)}</p>
        <span className="glass glass-lens absolute right-3 top-3 grid size-9 place-items-center rounded-full text-ink transition-transform duration-500 group-hover:rotate-45">
          <ArrowUpRight size={18} aria-hidden />
        </span>
      </div>
    </Link>
  );
}
