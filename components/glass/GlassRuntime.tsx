"use client";

import { useEffect } from "react";

/**
 * - Turns on SVG backdrop refraction only in Chromium (Safari/Firefox parse
 *   `backdrop-filter: url()` but don't render it, so they keep the blur look).
 * - Makes the specular highlight on [data-glass-follow] elements track the pointer.
 * - Marks <html> as motion-capable so reveal animations can hide content first.
 */
export function GlassRuntime() {
  useEffect(() => {
    const html = document.documentElement;
    const ua = navigator.userAgent;
    const isChromium = /Chrome\/|Chromium\/|Edg\//.test(ua) && !/Firefox\//.test(ua);
    const reducedTransparency = window.matchMedia("(prefers-reduced-transparency: reduce)").matches;
    const lowPower = (navigator.hardwareConcurrency ?? 8) < 4;
    if (isChromium && !reducedTransparency && !lowPower) html.classList.add("lg-refract");

    let frame = 0;
    const onMove = (e: PointerEvent) => {
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-glass-follow]");
      if (!target) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const r = target.getBoundingClientRect();
        target.style.setProperty("--mx", `${((e.clientX - r.left) / r.width) * 100}%`);
        target.style.setProperty("--my", `${((e.clientY - r.top) / r.height) * 100}%`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, []);
  return null;
}
