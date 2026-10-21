"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, MessageCircle, Phone } from "lucide-react";
import { site } from "@/content/site";
import { track, whatsappUrl } from "@/lib/contact";

/** Mobile-only floating glass bar: Book / WhatsApp / Call. Hides while the booking form is on screen. */
export function StickyBookBar() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("book");
    if (!target) return;
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold: 0.15 });
    io.observe(target);
    return () => io.disconnect();
  });

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 px-3 pb-[max(12px,env(safe-area-inset-bottom))] transition-transform duration-500 ease-[var(--ease-out)] sm:hidden ${
        hidden ? "translate-y-[140%]" : ""
      }`}
      aria-hidden={hidden}
    >
      <nav aria-label="Quick contact" data-glass-follow className="glass grid grid-cols-3 gap-1 rounded-full p-1.5">
        <a
          href="#book"
          tabIndex={hidden ? -1 : 0}
          onClick={() => track("book_click", { location: "sticky_bar" })}
          className="btn btn-primary !min-h-[52px] !px-2 text-[0.95rem]"
        >
          <CalendarCheck size={18} aria-hidden /> Book
        </a>
        <a
          href={whatsappUrl("an appointment")}
          target="_blank"
          rel="noopener"
          tabIndex={hidden ? -1 : 0}
          onClick={() => track("whatsapp_click", { location: "sticky_bar" })}
          className="btn !min-h-[52px] !px-2 text-[0.95rem] text-ink hover:bg-white/50"
        >
          <MessageCircle size={18} aria-hidden /> WhatsApp
        </a>
        <a
          href={site.phoneHref}
          tabIndex={hidden ? -1 : 0}
          onClick={() => track("call_click", { location: "sticky_bar" })}
          className="btn !min-h-[52px] !px-2 text-[0.95rem] text-ink hover:bg-white/50"
        >
          <Phone size={18} aria-hidden /> Call
        </a>
      </nav>
    </div>
  );
}
