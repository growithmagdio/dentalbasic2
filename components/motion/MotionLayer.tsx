"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";

gsap.registerPlugin(ScrollTrigger, SplitText);

declare global {
  interface Window {
    __lenis?: Lenis;
    __motionReady?: boolean;
  }
}

/**
 * One place for site-wide motion:
 *  - Lenis smooth scroll, synced to GSAP's ticker (off under reduced motion)
 *  - [data-reveal]       fade + rise once on enter (children stagger with data-reveal="stagger")
 *  - [data-split]        line-by-line mask reveal (SplitText)
 *  - [data-parallax]     gentle yPercent drift on an inner image (desktop only)
 * Re-scans the page on every route change.
 */
export function MotionLayer() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // Lenis — once
  useEffect(() => {
    window.__motionReady = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ScrollTrigger.config({ ignoreMobileResize: true });
    if (reduce) return;
    const lenis = new Lenis({ lerp: 0.1, anchors: { offset: -88 }, autoRaf: false });
    lenisRef.current = lenis;
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);

  // Per-route animations
  useEffect(() => {
    if (!window.location.hash) lenisRef.current?.scrollTo(0, { immediate: true });
    const html = document.documentElement;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      html.classList.remove("js-motion");
      return;
    }

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const stagger = el.dataset.reveal === "stagger";
        const targets = stagger ? Array.from(el.children) : [el];
        if (stagger) gsap.set(el, { opacity: 1 });
        gsap.fromTo(
          targets,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            stagger: stagger ? 0.07 : 0,
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          },
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        SplitText.create(el, {
          type: "lines",
          mask: "lines",
          aria: "none",
          autoSplit: true,
          onSplit: (self) =>
            gsap.from(self.lines, {
              yPercent: 105,
              duration: 1.1,
              ease: "power3.out",
              stagger: 0.08,
              scrollTrigger: { trigger: el, start: "top 82%", once: true },
            }),
        });
      });

      mm.add("(min-width: 1024px)", () => {
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const amount = Number(el.dataset.parallax || 8);
          gsap.fromTo(
            el,
            { yPercent: -amount },
            { yPercent: amount, ease: "none", scrollTrigger: { trigger: el.parentElement, start: "top bottom", end: "bottom top", scrub: true } },
          );
        });
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener("load", refresh);
    return () => {
      window.removeEventListener("load", refresh);
      ctx.revert();
    };
  }, [pathname]);

  return null;
}
