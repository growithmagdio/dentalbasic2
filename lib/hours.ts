import { site } from "@/content/site";

const DAY_NAMES = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const toMin = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export function formatTime(hhmm: string) {
  const [h, m] = hhmm.split(":").map(Number);
  const suffix = h >= 12 ? "pm" : "am";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12} ${suffix}` : `${h12}:${String(m).padStart(2, "0")} ${suffix}`;
}

/** Current day (0–6) and minutes past midnight in India Standard Time. */
export function nowInIST(date = new Date()) {
  const utcMin = date.getUTCHours() * 60 + date.getUTCMinutes();
  let minutes = utcMin + 330;
  let day = date.getUTCDay();
  if (minutes >= 1440) {
    minutes -= 1440;
    day = (day + 1) % 7;
  }
  return { day, minutes };
}

function sessionsFor(day: number) {
  return site.hours
    .filter((s) => (s.days as readonly number[]).includes(day))
    .map((s) => ({ open: s.open, close: s.close }))
    .sort((a, b) => toMin(a.open) - toMin(b.open));
}

export function getOpenStatus(date = new Date()): { open: boolean; label: string } {
  const { day, minutes } = nowInIST(date);
  const today = sessionsFor(day);
  for (const s of today) {
    if (minutes >= toMin(s.open) && minutes < toMin(s.close)) {
      return { open: true, label: `Open now · until ${formatTime(s.close)}` };
    }
  }
  const later = today.find((s) => toMin(s.open) > minutes);
  if (later) return { open: false, label: `Closed · opens ${formatTime(later.open)} today` };
  for (let i = 1; i <= 7; i++) {
    const d = (day + i) % 7;
    const next = sessionsFor(d)[0];
    if (next) {
      const when = i === 1 ? "tomorrow" : DAY_NAMES[d];
      return { open: false, label: `Closed · opens ${when} ${formatTime(next.open)}` };
    }
  }
  return { open: false, label: "Closed" };
}

/** Rows for the hours table: Monday first. */
export function weeklyHours() {
  return [1, 2, 3, 4, 5, 6, 0].map((d) => {
    const s = sessionsFor(d);
    return {
      day: d,
      name: DAY_NAMES[d],
      text: s.length ? s.map((x) => `${formatTime(x.open)} – ${formatTime(x.close)}`).join("\n") : "Emergencies by appointment",
    };
  });
}

export function openingHoursSpecification() {
  const dayUrl = (d: number) => `https://schema.org/${DAY_NAMES[d]}`;
  return site.hours.map((s) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: (s.days as readonly number[]).map(dayUrl),
    opens: s.open,
    closes: s.close,
  }));
}

/** Consecutive days with identical hours collapsed: "Mon – Sat" / "Sunday". */
export function groupedHours() {
  const rows = weeklyHours();
  const groups: { label: string; text: string }[] = [];
  let start = 0;
  for (let i = 1; i <= rows.length; i++) {
    if (i === rows.length || rows[i].text !== rows[start].text) {
      const a = rows[start].name, b = rows[i - 1].name;
      groups.push({ label: start === i - 1 ? a : `${a.slice(0, 3)} – ${b.slice(0, 3)}`, text: rows[start].text });
      start = i;
    }
  }
  return groups;
}
