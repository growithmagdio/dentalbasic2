"use client";

import { useState } from "react";

/** Drag / keyboard slider comparing two photos. Used once real, consented cases exist in content/gallery.ts. */
export function BeforeAfter({ before, after, alt }: { before: string; after: string; alt: string }) {
  const [pos, setPos] = useState(50);
  return (
    <div className="media relative aspect-[4/3] select-none">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after} alt={`After: ${alt}`} className="absolute inset-0" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before} alt={`Before: ${alt}`} className="absolute inset-0" />
      </div>
      <div className="absolute inset-y-0 w-px bg-white/90" style={{ left: `${pos}%` }} aria-hidden />
      <input
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        aria-label={`Compare before and after: ${alt}`}
        className="absolute inset-0 size-full cursor-ew-resize opacity-0"
      />
      {/* Before / After labels */}
      <span className="glass absolute left-3 top-3 pointer-events-none z-10 rounded-full px-2.5 py-1 text-[0.75rem] font-bold tracking-wide uppercase text-ink/80">
        Before
      </span>
      <span className="glass absolute right-3 top-3 pointer-events-none z-10 rounded-full px-2.5 py-1 text-[0.75rem] font-bold tracking-wide uppercase text-ink/80">
        After
      </span>
      <span
        aria-hidden
        className="glass glass-lens pointer-events-none absolute top-1/2 grid size-11 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-sm font-semibold shadow-md"
        style={{ left: `${pos}%` }}
      >
        ⇆
      </span>
    </div>
  );
}
