export const formatINR = (n: number) => `₹${n.toLocaleString("en-IN")}`;

/** Non-breaking space before the last word, so headlines never end on a single word. */
export const noOrphan = (s: string) => s.replace(/ (\S+)$/, " $1");
