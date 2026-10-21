/**
 * Cloudflare Pages Function: POST /api/book
 * Validates the booking and delivers it to the clinic. Configure in
 * Cloudflare → Pages → Settings → Environment variables:
 *   BOOKING_WEBHOOK_URL  (optional) GoHighLevel / Make.com / Google Apps Script webhook
 *   RESEND_API_KEY       (optional) to email each request via Resend
 *   BOOKING_EMAIL_TO     (optional) clinic inbox for those emails
 *   BOOKING_EMAIL_FROM   (optional) verified sender, e.g. "Jerush Website <bookings@jerushdental.in>"
 * With none set, requests are only logged (demo mode).
 */
import { bookingSchema } from "../../lib/booking-schema";

type Env = {
  BOOKING_WEBHOOK_URL?: string;
  RESEND_API_KEY?: string;
  BOOKING_EMAIL_TO?: string;
  BOOKING_EMAIL_FROM?: string;
};
type Ctx = { request: Request; env: Env };

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { "content-type": "application/json" } });

// Simple per-IP rate limit (per isolate; good enough to stop casual abuse).
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

export async function onRequestPost({ request, env }: Ctx) {
  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  if (limited(ip)) return json({ ok: false, error: "Too many requests" }, 429);

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid JSON" }, 400);
  }
  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    // Honeypot / too-fast submissions get a quiet success so bots learn nothing.
    const bot = parsed.error.issues.some((i) => i.path[0] === "company" || i.path[0] === "elapsedMs");
    return bot ? json({ ok: true }) : json({ ok: false, errors: parsed.error.issues.map((i) => i.message) }, 422);
  }
  const b = parsed.data;
  const booking = {
    name: b.name,
    phone: b.phone,
    treatment: b.treatment,
    date: b.date,
    slot: b.slot,
    note: b.note,
    source: "website",
    receivedAt: new Date().toISOString(),
  };

  const tasks: Promise<Response>[] = [];
  if (env.BOOKING_WEBHOOK_URL) {
    tasks.push(fetch(env.BOOKING_WEBHOOK_URL, { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(booking) }));
  }
  if (env.RESEND_API_KEY && env.BOOKING_EMAIL_TO) {
    const text = Object.entries(booking).map(([k, v]) => `${k}: ${v}`).join("\n");
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, "content-type": "application/json" },
        body: JSON.stringify({
          from: env.BOOKING_EMAIL_FROM ?? "Jerush Website <onboarding@resend.dev>",
          to: [env.BOOKING_EMAIL_TO],
          subject: `New booking: ${booking.name} · ${booking.treatment} · ${booking.date} ${booking.slot}`,
          text,
        }),
      }),
    );
  }
  if (tasks.length === 0) {
    console.log("[demo] booking received", booking);
    return json({ ok: true, demo: true });
  }
  const results = await Promise.allSettled(tasks);
  const delivered = results.some((r) => r.status === "fulfilled" && r.value.ok);
  return delivered ? json({ ok: true }) : json({ ok: false, error: "Delivery failed" }, 502);
}
