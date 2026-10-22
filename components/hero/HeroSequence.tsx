"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { hero } from "@/lib/media";
import { track } from "@/lib/contact";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const pad = (n: number) => String(n).padStart(4, "0");

/**
 * The 3D hero: a rendered implant assembles frame by frame as you scroll.
 * - Text + CTAs and a poster image are server-rendered (fast LCP, works without JS).
 * - Landscape screens use the 16:9 frame set, portrait screens the 9:16 set.
 * - ≥768px: pinned and scrubbed over 1.5 screens. <768px: plays once, no pin.
 * - Reduced motion: the finished frame shows as a still image; no canvas at all.
 */
export function HeroSequence({ children, caption }: { children: ReactNode; caption: string }) {
  const root = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const landscape = window.matchMedia("(min-aspect-ratio: 1/1)").matches;
      const set = landscape ? hero.desktop : hero.mobile;
      const total = set.frames;
      const images: (HTMLImageElement | null)[] = new Array(total).fill(null);
      const state = { frame: 0 };
      let drawn = -1;
      let alive = true;

      const nearestLoaded = (i: number) => {
        for (let d = 0; d < total; d++) {
          if (images[i - d]) return i - d;
          if (images[i + d]) return i + d;
        }
        return -1;
      };

      const render = () => {
        const want = Math.min(total - 1, Math.max(0, Math.round(state.frame)));
        const idx = nearestLoaded(want);
        if (idx < 0 || idx === drawn) return;
        const img = images[idx]!;
        const cw = canvas.width, ch = canvas.height;
        const s = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
        const w = img.naturalWidth * s, h = img.naturalHeight * s;
        // Portrait keeps the object low in its box (matches object-position 50% 80%)
        ctx.drawImage(img, (cw - w) / 2, (ch - h) * (landscape ? 0.5 : 0.8), w, h);
        if (drawn === -1) canvas.style.opacity = "1";
        drawn = idx;
      };

      const resize = () => {
        const dpr = Math.min(window.devicePixelRatio || 1, landscape ? 2 : 1.5);
        canvas.width = Math.round(canvas.clientWidth * dpr);
        canvas.height = Math.round(canvas.clientHeight * dpr);
        drawn = -1;
        render();
      };
      const ro = new ResizeObserver(resize);
      ro.observe(canvas);

      // Progressive loading: first frame, then every 8th, then fill the gaps.
      const order: number[] = [0];
      for (let i = 8; i < total; i += 8) order.push(i);
      order.push(total - 1);
      for (let i = 1; i < total; i++) if (!order.includes(i)) order.push(i);
      let loaded = 0;
      let resolveMost: () => void;
      const mostLoaded = new Promise<void>((r) => (resolveMost = r));
      let cursor = 0;
      const loadNext = () => {
        if (!alive || cursor >= order.length) return;
        const i = order[cursor++];
        const im = new Image();
        im.decoding = "async";
        im.src = `${set.dir}/frame_${pad(i + 1)}.webp`;
        im.decode()
          .then(() => {
            if (!alive) return;
            images[i] = im;
            loaded++;
            if (loaded / total > 0.6) resolveMost();
            if (Math.abs(i - state.frame) < 12 || drawn === -1) render();
          })
          .catch(() => {})
          .finally(loadNext);
      };
      // Start streaming frames only after the page (and the LCP poster) has loaded.
      const kick = () => {
        loadNext(); // first frame right away
        setTimeout(() => {
          for (let k = 0; k < 5; k++) loadNext();
        }, 120);
      };
      if (document.readyState === "complete") kick();
      else window.addEventListener("load", kick, { once: true });

      const mm = gsap.matchMedia();
      let sent50 = false, sent100 = false;

      mm.add("(min-width: 768px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: landscape ? "+=150%" : "+=100%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (!sent50 && self.progress > 0.5) {
                sent50 = true;
                track("hero_scroll_50");
              }
              if (!sent100 && self.progress > 0.98) {
                sent100 = true;
                track("hero_scroll_100");
              }
            },
          },
        });
        tl.to({}, { duration: 0.12 })
          .to(state, { frame: total - 1, ease: "none", duration: 1, onUpdate: render })
          .to(textRef.current, { yPercent: -6, ease: "none", duration: 0.4 }, 0.12)
          .fromTo(captionRef.current, { autoAlpha: 0, y: 14 }, { autoAlpha: 1, y: 0, duration: 0.14, ease: "power2.out" }, ">-0.14")
          .to({}, { duration: 0.14 });
      });

      mm.add("(max-width: 767px)", () => {
        let tween: gsap.core.Tween | undefined;
        const start = () => {
          if (!alive || tween) return;
          tween = gsap.to(state, {
            frame: total - 1,
            duration: 2.6,
            delay: 0.2,
            ease: "power1.inOut",
            onUpdate: render,
            onComplete: () => {
              gsap.fromTo(captionRef.current, { autoAlpha: 0, y: 10 }, { autoAlpha: 1, y: 0, duration: 0.6 });
              track("hero_scroll_100");
            },
          });
        };
        Promise.race([mostLoaded, new Promise((r) => setTimeout(r, 3000))]).then(start);
        return () => tween?.kill();
      });

      document.fonts?.ready.then(() => ScrollTrigger.refresh());

      return () => {
        alive = false;
        window.removeEventListener("load", kick);
        ro.disconnect();
        mm.revert();
      };
    },
    { scope: root },
  );

  return (
    <section ref={root} aria-labelledby="hero-title" className="relative isolate h-[100svh] min-h-[560px] sm:min-h-[640px] overflow-hidden bg-[linear-gradient(90deg,#F7F5F1,#CFE3E1)] portrait:bg-[linear-gradient(180deg,#F7F5F1,#CFE3E1)]">
      {/* Media layer: full-bleed on landscape; lower ~55-62% on portrait so the headline sits cleanly above the tooth */}
      <div className="absolute inset-0 -z-20 portrait:top-auto portrait:h-[55%] sm:portrait:h-[62%] portrait:[mask-image:linear-gradient(to_bottom,transparent,#000_22%)]">
        {/* Poster = first frame (shown instantly, LCP) */}
        <picture className="hero-start">
          <source media="(min-aspect-ratio: 1/1)" srcSet={hero.posterDesktop} />
          <img
            src={hero.posterMobile}
            alt="A porcelain dental crown, abutment and titanium implant, about to assemble"
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 size-full object-cover portrait:object-[50%_80%]"
          />
        </picture>
        {/* Reduced motion: finished frame */}
        <picture className="hero-final">
          <source media="(min-aspect-ratio: 1/1)" srcSet={hero.finalDesktop} />
          <img
            src={hero.finalMobile}
            alt="A porcelain crown seated on a titanium dental implant"
            loading="lazy"
            className="absolute inset-0 size-full object-cover portrait:object-[50%_80%]"
          />
        </picture>
        <canvas ref={canvasRef} aria-hidden className="absolute inset-0 size-full opacity-0 transition-opacity duration-300" />
      </div>
      {/* soft wash so text stays legible over any frame */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(247_245_241/0.75)_0%,rgb(247_245_241/0.35)_38%,transparent_60%)] portrait:bg-none" />

      <div ref={textRef} className="container-x flex h-full flex-col justify-center pt-[calc(var(--header-h)+1rem)] portrait:justify-start portrait:pt-[calc(var(--header-h)+1.25rem)] sm:portrait:pt-[calc(var(--header-h)+2.25rem)]">
        {children}
      </div>

      <p
        ref={captionRef}
        className="glass invisible absolute bottom-6 right-[max(var(--gutter),4vw)] rounded-full px-4 py-2 text-[0.85rem] font-medium text-ink/80 opacity-0 max-sm:hidden portrait:bottom-10"
      >
        {caption}
      </p>
    </section>
  );
}
