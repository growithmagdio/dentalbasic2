"use client";

import { useState } from "react";
import { MapPin } from "lucide-react";
import { mapsEmbedUrl, mapsDirectionsUrl, site } from "@/content/site";
import { track } from "@/lib/contact";

/** Click-to-load Google Map, so the heavy embed never slows the page down. */
export function MapFacade({ className = "" }: { className?: string }) {
  const [load, setLoad] = useState(false);
  return (
    <div className={`media relative aspect-[4/3] w-full ${className}`}>
      {load ? (
        <iframe
          title={`Map showing ${site.name}`}
          src={mapsEmbedUrl}
          className="absolute inset-0 size-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center bg-[radial-gradient(120%_90%_at_70%_20%,#fff,transparent_60%),linear-gradient(135deg,var(--accent-soft),var(--paper))]">
          {/* stylised streets */}
          <svg aria-hidden className="absolute inset-0 size-full opacity-60" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice">
            <g stroke="#fff" strokeWidth="10" fill="none" strokeLinecap="round">
              <path d="M-20 210 C100 190 160 120 420 140" />
              <path d="M120 -20 L180 320" />
              <path d="M260 -20 C250 100 300 200 290 320" />
            </g>
            <g stroke="#E3DFD8" strokeWidth="3" fill="none">
              <path d="M-20 80 L420 60" />
              <path d="M40 -20 L60 320" />
            </g>
          </svg>
          <div className="relative flex flex-col items-center gap-3">
            <span className="grid size-12 place-items-center rounded-full bg-accent text-white shadow-lg">
              <MapPin size={22} aria-hidden />
            </span>
            <div className="flex flex-wrap justify-center gap-2">
              <button
                type="button"
                onClick={() => setLoad(true)}
                className="glass btn btn-glass !min-h-[44px]"
                data-glass-follow
              >
                Show map
              </button>
              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noopener"
                onClick={() => track("directions_click", { location: "map" })}
                className="btn btn-primary !min-h-[44px]"
              >
                Get directions
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
