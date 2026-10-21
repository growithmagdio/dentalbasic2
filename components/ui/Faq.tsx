import { Plus } from "lucide-react";

/** Native <details> accordion: keyboard and screen-reader friendly with no JS. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-rule border-y border-rule">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex min-h-[64px] items-center justify-between gap-6 py-4 text-left text-[1.08rem] font-semibold">
            {f.q}
            <span className="acc-icon glass glass-lens grid size-9 shrink-0 place-items-center rounded-full transition-transform duration-300">
              <Plus size={18} aria-hidden />
            </span>
          </summary>
          <p className="max-w-[68ch] pb-6 text-muted">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
