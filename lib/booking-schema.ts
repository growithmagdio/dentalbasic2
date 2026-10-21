/**
 * Booking validation shared by the form (client) and the Cloudflare Pages Function (server).
 * Hand-rolled instead of a schema library to keep the page JavaScript small.
 */
export const SLOTS = ["Morning", "Evening"] as const;
export type Slot = (typeof SLOTS)[number];

export type BookingInput = {
  name?: unknown;
  phone?: unknown;
  treatment?: unknown;
  date?: unknown;
  slot?: unknown;
  note?: unknown;
  consent?: unknown;
  company?: unknown;
  elapsedMs?: unknown;
};
export type Booking = { name: string; phone: string; treatment: string; date: string; slot: Slot; note: string };
export type Issue = { path: [keyof BookingInput]; message: string };
export type Result = { success: true; data: Booking } | { success: false; error: { issues: Issue[] } };

const indianMobile = /^(?:\+?91)?[6-9]\d{9}$/;
const str = (v: unknown) => (typeof v === "string" ? v : "");

function validate(raw: unknown): Result {
  const input: BookingInput = raw && typeof raw === "object" ? (raw as BookingInput) : {};
  const issues: Issue[] = [];
  const add = (field: keyof BookingInput, message: string) => issues.push({ path: [field], message });

  const name = str(input.name).trim();
  if (name.length < 2) add("name", "Please enter your name");
  else if (name.length > 80) add("name", "That name is too long");

  const phone = str(input.phone).replace(/[\s-]/g, "");
  if (!indianMobile.test(phone)) add("phone", "Enter a 10-digit mobile number");

  const treatment = str(input.treatment).trim();
  if (!treatment) add("treatment", "Choose a treatment");

  const date = str(input.date);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) add("date", "Choose a date");
  else {
    const d = new Date(`${date}T12:00:00+05:30`);
    const todayIST = new Date(Date.now() + 330 * 60_000).toISOString().slice(0, 10);
    if (Number.isNaN(d.getTime()) || date < todayIST) add("date", "Choose today or a later date");
    else if (d.getUTCDay() === 0) add("date", "Sundays are for emergencies only. Please call us");
  }

  const slot = str(input.slot);
  if (!(SLOTS as readonly string[]).includes(slot)) add("slot", "Choose morning or evening");

  const note = str(input.note);
  if (note.length > 300) add("note", "Please keep the note under 300 characters");

  if (input.consent !== true) add("consent", "Please agree so we can contact you");

  // spam traps: hidden field must be empty; humans take more than ~2.5 s to fill the form
  if (str(input.company)) add("company", "Spam");
  if (typeof input.elapsedMs === "number" && input.elapsedMs < 2500) add("elapsedMs", "Too fast");

  return issues.length
    ? { success: false, error: { issues } }
    : { success: true, data: { name, phone, treatment, date, slot: slot as Slot, note } };
}

export const bookingSchema = { safeParse: validate };
