/**
 * Bengali language conversion helpers
 */

const BANGLA_DIGITS = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBanglaNumber(value: number | string | undefined | null): string {
  if (value === undefined || value === null) return "";
  const str = String(value);
  return str.replace(/\d/g, (digit) => BANGLA_DIGITS[parseInt(digit, 10)] || digit);
}

export function formatBanglaPrice(value: number | undefined | null): string {
  if (value === undefined || value === null || isNaN(value)) return "০";
  // Format with standard Indian/South Asian commas (e.g. 1,850 or 12,345)
  const formatted = Math.round(value).toLocaleString("en-IN");
  return toBanglaNumber(formatted);
}

export function formatBanglaFloat(value: number | undefined | null, decimals = 1): string {
  if (value === undefined || value === null || isNaN(value)) return "০";
  const fixed = Number(value).toFixed(decimals);
  return toBanglaNumber(fixed);
}

export function getBanglaUnit(unit: string): string {
  switch (unit?.toLowerCase()) {
    case "kg":
      return "প্রতি কেজি";
    case "litre":
    case "l":
      return "প্রতি লিটার";
    case "dozen":
      return "প্রতি ডজন";
    case "piece":
    case "pc":
      return "প্রতি পিস";
    default:
      return unit ? `প্রতি ${unit}` : "প্রতি একক";
  }
}

export function getBanglaTickerUnit(unit: string): string {
  switch (unit?.toLowerCase()) {
    case "kg":
      return "টাকা/কেজি";
    case "litre":
    case "l":
      return "টাকা/লিটার";
    case "dozen":
      return "টাকা/ডজন";
    case "piece":
    case "pc":
      return "টাকা/পিস";
    default:
      return `টাকা/${unit || "একক"}`;
  }
}

const BANGLA_DAYS = [
  "রবিবার",
  "সোমবার",
  "মঙ্গলবার",
  "বুধবার",
  "বৃহস্পতিবার",
  "শুক্রবার",
  "শনিবার",
];

const BANGLA_MONTHS = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

export function getTodayBanglaDate(): string {
  const now = new Date();
  const dayName = BANGLA_DAYS[now.getDay()];
  const dateNum = toBanglaNumber(now.getDate());
  const monthName = BANGLA_MONTHS[now.getMonth()];
  const yearNum = toBanglaNumber(now.getFullYear());
  return `${dayName}, ${dateNum} ${monthName}, ${yearNum}`;
}
