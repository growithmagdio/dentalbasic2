import { site } from "@/content/site";

export function whatsappUrl(context?: string) {
  const text = context
    ? `Hi Jerush Dental, I’d like to book ${context}.`
    : "Hi Jerush Dental, I’d like to book an appointment.";
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] };

/** Fire an analytics event. No-op until GA4 is configured and consent given. */
export function track(event: string, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  const w = window as GtagWindow;
  if (typeof w.gtag === "function") w.gtag("event", event, params);
  if (process.env.NODE_ENV !== "production") console.debug("[track]", event, params);
}
