"use client";

import { useId, useRef, useState, useSyncExternalStore } from "react";
import { CheckCircle2, Loader2, MessageCircle } from "lucide-react";
import { bookingSchema, SLOTS } from "@/lib/booking-schema";
import { treatments } from "@/content/treatments";
import { site } from "@/content/site";
import { track, whatsappUrl } from "@/lib/contact";

type Errors = Partial<Record<string, string>>;
type Values = { name: string; phone: string; treatment: string; date: string; slot: string; note: string; consent: boolean; company: string };

const NOT_SURE = "Not sure / check-up";

const noop = () => () => {};

function todayIST() {
  const d = new Date(Date.now() + 330 * 60_000);
  return d.toISOString().slice(0, 10);
}

export function BookingForm({ defaultTreatment = "" }: { defaultTreatment?: string }) {
  const uid = useId();
  const started = useRef<number | null>(null);
  const [values, setValues] = useState<Values>({
    name: "",
    phone: "",
    treatment: defaultTreatment,
    date: "",
    slot: "",
    note: "",
    consent: false,
    company: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [demo, setDemo] = useState(false);
  // Today's date in IST, read on the client only (the HTML is built ahead of time).
  const minDate = useSyncExternalStore(noop, todayIST, () => undefined);

  const id = (f: string) => `${uid}-${f}`;

  const validateField = (field: keyof Values, next: Values) => {
    const res = bookingSchema.safeParse({ ...next, elapsedMs: 99_999 });
    const issue = res.success ? undefined : res.error.issues.find((i) => i.path[0] === field);
    setErrors((e) => ({ ...e, [field]: issue?.message }));
  };

  const set = <K extends keyof Values>(field: K, value: Values[K], validate = false) => {
    started.current ??= Date.now();
    const next = { ...values, [field]: value };
    setValues(next);
    if (validate || errors[field]) validateField(field, next);
  };

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const payload = { ...values, elapsedMs: started.current ? Date.now() - started.current : 0 };
    const res = bookingSchema.safeParse(payload);
    if (!res.success) {
      const errs: Errors = {};
      for (const i of res.error.issues) errs[String(i.path[0])] ??= i.message;
      setErrors(errs);
      const first = Object.keys(errs)[0];
      document.getElementById(id(first === "slot" ? "slot-0" : first))?.focus();
      return;
    }
    setState("sending");
    try {
      const r = await fetch("/api/book/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if ([404, 405, 501].includes(r.status)) {
        // No booking endpoint (local dev or static preview): behave as a demo.
        setDemo(true);
      } else if (!r.ok) {
        throw new Error(String(r.status));
      }
      setState("done");
      track("booking_submit_success", { treatment: values.treatment });
    } catch {
      setState("error");
      track("booking_submit_error", { treatment: values.treatment });
    }
  }

  if (state === "done") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-6">
        <CheckCircle2 className="text-accent" size={40} aria-hidden />
        <h3 className="t-h2 !text-[2rem]">Thanks, {values.name.split(" ")[0]}.</h3>
        <p className="max-w-[44ch] text-ink/80">
          We’ll call you on <span className="tnum">{values.phone}</span> within working hours to confirm your {values.slot.toLowerCase()} appointment.
          If it’s urgent, call <a className="tnum font-semibold text-accent underline" href={site.phoneHref}>{site.phone}</a>.
        </p>
        <a
          href={whatsappUrl(values.treatment && values.treatment !== NOT_SURE ? `a ${values.treatment.toLowerCase()} appointment` : "an appointment")}
          target="_blank"
          rel="noopener"
          onClick={() => track("whatsapp_click", { location: "booking_success" })}
          className="btn btn-primary"
        >
          <MessageCircle size={18} aria-hidden /> Message us on WhatsApp
        </a>
        {demo && <p className="t-small text-muted">Demo mode: this request wasn’t sent anywhere. Bookings are delivered once the site is deployed.</p>}
      </div>
    );
  }

  const field = "mt-1.5 block w-full rounded-2xl border border-ink/10 bg-white/80 px-4 text-[1rem] text-ink shadow-[inset_0_1px_2px_rgb(20_32_43/0.06)] outline-none transition focus:border-accent focus:bg-white focus:ring-4 focus:ring-accent/15 aria-[invalid=true]:border-red-600";
  const label = "text-[0.92rem] font-semibold text-ink";
  const err = (f: string) =>
    errors[f] ? (
      <p id={id(`${f}-err`)} className="mt-1.5 text-[0.85rem] font-medium text-red-700">
        {errors[f]}
      </p>
    ) : null;
  const a11y = (f: string) => ({ "aria-invalid": errors[f] ? true : undefined, "aria-describedby": errors[f] ? id(`${f}-err`) : undefined });

  return (
    <form noValidate onSubmit={onSubmit} className="grid grid-cols-1 gap-x-4 gap-y-5 sm:grid-cols-2">
      <div className="sm:col-span-1">
        <label htmlFor={id("name")} className={label}>Full name</label>
        <input id={id("name")} name="name" autoComplete="name" className={`${field} h-12`} value={values.name}
          onChange={(e) => set("name", e.target.value)} onBlur={() => validateField("name", values)} {...a11y("name")} />
        {err("name")}
      </div>
      <div className="sm:col-span-1">
        <label htmlFor={id("phone")} className={label}>Mobile number</label>
        <input id={id("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="98765 43210"
          className={`${field} tnum h-12`} value={values.phone}
          onChange={(e) => set("phone", e.target.value)} onBlur={() => validateField("phone", values)} {...a11y("phone")} />
        {err("phone")}
      </div>
      <div className="sm:col-span-2">
        <label htmlFor={id("treatment")} className={label}>Treatment</label>
        <select id={id("treatment")} name="treatment" className={`${field} h-12 appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2214%22 height=%2214%22 fill=%22none%22 stroke=%22%2314202B%22 stroke-width=%222%22><path d=%22M2 5l5 5 5-5%22/></svg>')] bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10`}
          value={values.treatment} onChange={(e) => set("treatment", e.target.value, true)} {...a11y("treatment")}>
          <option value="" disabled>Choose a treatment</option>
          <option>{NOT_SURE}</option>
          {treatments.map((t) => <option key={t.slug}>{t.name}</option>)}
        </select>
        {err("treatment")}
      </div>
      <div>
        <label htmlFor={id("date")} className={label}>Preferred date</label>
        <input id={id("date")} name="date" type="date" min={minDate} className={`${field} tnum h-12`} value={values.date}
          onChange={(e) => set("date", e.target.value, true)} {...a11y("date")} />
        {err("date") ?? <p className="mt-1.5 text-[0.82rem] text-muted">Mon–Sat. Sundays for emergencies.</p>}
      </div>
      <fieldset>
        <legend className={label}>Time of day</legend>
        <div role="radiogroup" className="mt-1.5 grid h-12 grid-cols-2 gap-1 rounded-2xl border border-ink/10 bg-white/60 p-1" {...a11y("slot")}>
          {SLOTS.map((s, i) => (
            <label key={s} className={`grid cursor-pointer place-items-center rounded-xl text-[0.95rem] font-semibold transition ${values.slot === s ? "bg-accent text-white shadow" : "text-ink/75 hover:bg-white"}`}>
              <input id={id(`slot-${i}`)} type="radio" name="slot" value={s} checked={values.slot === s}
                onChange={() => set("slot", s, true)} className="sr-only" />
              {s}
            </label>
          ))}
        </div>
        {err("slot")}
      </fieldset>
      <div className="sm:col-span-2">
        <label htmlFor={id("note")} className={label}>Anything we should know? <span className="font-normal text-muted">(optional)</span></label>
        <textarea id={id("note")} name="note" rows={3} maxLength={300} className={`${field} resize-none py-3`} value={values.note}
          onChange={(e) => set("note", e.target.value)} {...a11y("note")} />
        {err("note")}
      </div>
      {/* honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor={id("company")}>Company</label>
        <input id={id("company")} name="company" tabIndex={-1} autoComplete="off" value={values.company} onChange={(e) => set("company", e.target.value)} />
      </div>
      <div className="sm:col-span-2">
        <label className="flex cursor-pointer items-start gap-3 text-[0.95rem] text-ink/85">
          <input id={id("consent")} type="checkbox" checked={values.consent} onChange={(e) => set("consent", e.target.checked, true)}
            className="mt-1 size-5 shrink-0 accent-[var(--accent)]" {...a11y("consent")} />
          I agree to be contacted about my appointment.
        </label>
        {err("consent")}
      </div>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <button type="submit" disabled={state === "sending"} className="btn btn-primary w-full sm:w-auto disabled:opacity-70">
          {state === "sending" ? <><Loader2 size={18} className="animate-spin" aria-hidden /> Sending…</> : "Request appointment"}
        </button>
        <p className="t-small text-muted">We confirm every request by phone.</p>
      </div>
      {state === "error" && (
        <p role="alert" className="sm:col-span-2 rounded-2xl bg-red-50 p-4 text-[0.95rem] text-red-800">
          Sorry, that didn’t go through. Please call <a className="tnum font-semibold underline" href={site.phoneHref}>{site.phone}</a> or{" "}
          <a className="font-semibold underline" href={whatsappUrl("an appointment")} target="_blank" rel="noopener">WhatsApp us</a>.
        </p>
      )}
    </form>
  );
}
