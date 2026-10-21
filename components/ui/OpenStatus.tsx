"use client";

import { useSyncExternalStore } from "react";
import { getOpenStatus } from "@/lib/hours";

const subscribe = (cb: () => void) => {
  const id = setInterval(cb, 30_000);
  return () => clearInterval(id);
};
const read = () => getOpenStatus().label;

/** "Open now · until 1:30 pm" — computed in IST on the client and refreshed every 30 s. */
export function OpenStatus({ className = "" }: { className?: string }) {
  const label = useSyncExternalStore(subscribe, read, () => null);
  const open = label?.startsWith("Open") ?? false;
  return (
    <span className={`inline-flex items-center gap-2 ${className}`} aria-live="polite">
      <span
        aria-hidden
        className={`size-2 rounded-full ${open ? "bg-emerald-500 shadow-[0_0_0_4px_rgb(16_185_129/0.18)]" : "bg-amber-500"} ${label ? "" : "opacity-0"}`}
      />
      <span className="tnum">{label ?? "Mon–Sat · 9:30 am – 8:30 pm"}</span>
    </span>
  );
}
