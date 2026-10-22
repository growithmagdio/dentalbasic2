"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, Phone, X, MessageCircle } from "lucide-react";
import { site } from "@/content/site";
import { track, whatsappUrl } from "@/lib/contact";
import { NAV } from "@/lib/nav";


export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the menu when the route changes.
  const [prevPath, setPrevPath] = useState(pathname);
  if (pathname !== prevPath) {
    setPrevPath(pathname);
    setOpen(false);
  }
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const isActive = (href: string) => pathname?.startsWith(href);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-2.5 pt-2.5 sm:px-4 sm:pt-4">
      <div
        data-glass-follow
        className={`glass mx-auto flex h-[var(--header-h)] max-w-[1180px] items-center justify-between rounded-full pl-4 pr-1.5 sm:pl-5 sm:pr-2 transition-[--g-alpha] duration-500 ${
          scrolled ? "[--g-alpha:0.4]" : ""
        }`}
      >
        <Link href="/" aria-label={`${site.name} home`} className="flex shrink-0 items-center">
          <Image
            src="/brand/jerush-logo-horizontal.svg"
            alt={site.name}
            width={512}
            height={200}
            unoptimized
            priority
            className="h-[36px] w-auto sm:h-[44px]"
          />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={`rounded-full px-3.5 py-2 text-[0.95rem] font-medium transition-colors hover:bg-white/50 ${
                    isActive(n.href) ? "bg-white/60 text-ink" : "text-ink/80"
                  }`}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <a
            href={site.phoneHref}
            onClick={() => track("call_click", { location: "header" })}
            className="hidden items-center gap-2 rounded-full px-3 py-2 text-[0.95rem] font-medium text-ink/80 hover:bg-white/50 xl:inline-flex"
          >
            <Phone size={16} strokeWidth={1.75} aria-hidden /> <span className="tnum">{site.phone}</span>
          </a>
          <a
            href="#book"
            onClick={() => track("book_click", { location: "header" })}
            className="btn btn-primary hidden !min-h-[46px] sm:inline-flex"
          >
            Book appointment
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="glass glass-clear grid size-12 place-items-center rounded-full lg:hidden"
          >
            {open ? <X size={20} aria-hidden /> : <Menu size={20} aria-hidden />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="glass glass-strong mx-auto mt-2 max-w-[1180px] rounded-[28px] p-3 lg:hidden"
      >
        <nav aria-label="Mobile">
          <ul className="grid">
            {NAV.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className="flex min-h-[52px] items-center rounded-2xl px-4 font-display text-[1.6rem] leading-none tracking-tight hover:bg-white/50"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-ink/10 pt-3">
          <a href={site.phoneHref} onClick={() => track("call_click", { location: "menu" })} className="btn btn-outline">
            <Phone size={17} aria-hidden /> Call
          </a>
          <a
            href={whatsappUrl("an appointment")}
            target="_blank"
            rel="noopener"
            onClick={() => track("whatsapp_click", { location: "menu" })}
            className="btn btn-primary"
          >
            <MessageCircle size={17} aria-hidden /> WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
