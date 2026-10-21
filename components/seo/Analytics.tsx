"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const KEY = "jerush-consent";

/** GA4, loaded only when NEXT_PUBLIC_GA_ID is set AND the visitor accepts. */
const readStored = () => {
  try {
    const v = localStorage.getItem(KEY);
    return v === "yes" || v === "no" ? v : null;
  } catch {
    return null;
  }
};
const subscribe = (cb: () => void) => {
  window.addEventListener("storage", cb);
  return () => window.removeEventListener("storage", cb);
};

export function Analytics() {
  const stored = useSyncExternalStore(subscribe, readStored, () => "unknown" as const);
  const [decided, setDecided] = useState<"yes" | "no" | null>(null);
  const choice = decided ?? stored;

  useEffect(() => {
    if (!GA_ID || choice !== "yes") return;
    const w = window as Window & { dataLayer?: unknown[]; gtag?: (...a: unknown[]) => void };
    w.dataLayer = w.dataLayer || [];
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments);
    };
    w.gtag("js", new Date());
    w.gtag("config", GA_ID);
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(s);
  }, [choice]);

  if (!GA_ID || choice !== null) return null;
  const decide = (v: "yes" | "no") => {
    try {
      localStorage.setItem(KEY, v);
    } catch {}
    setDecided(v);
  };
  return (
    <div role="dialog" aria-label="Cookie consent" className="glass glass-strong fixed bottom-24 left-3 right-3 z-50 rounded-3xl p-4 sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm">
      <p className="t-small text-ink/85">We use simple analytics to understand which pages help patients. No ads, no selling data.</p>
      <div className="mt-3 flex gap-2">
        <button type="button" onClick={() => decide("yes")} className="btn btn-primary !min-h-[42px] text-sm">Accept</button>
        <button type="button" onClick={() => decide("no")} className="btn btn-outline !min-h-[42px] text-sm">No thanks</button>
      </div>
    </div>
  );
}
