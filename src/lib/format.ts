/** Display formatting for dates and periods. Content stores ISO-like strings; the board's wording lives here. */
import { BCP47 } from './consts';
import type { Locale } from './content';

/** Splits 'YYYY' or 'YYYY-MM' into a year and an optional zero-based month. */
function parsePoint(value: string): { year: number; month?: number } {
  const [year, month] = value.split('-');
  return { year: Number(year), month: month === undefined ? undefined : Number(month) - 1 };
}

/**
 * "Mar–Dec 2023", "2022–2023", "2022" or "2024–now".
 * A missing `end` means the period is still open; `now` is the localized word for it.
 */
export function formatPeriod(start: string, end: string | undefined, lang: Locale, now: string): string {
  const month = new Intl.DateTimeFormat(BCP47[lang], { month: 'short', timeZone: 'UTC' });
  const monthName = (index: number) => month.format(new Date(Date.UTC(2000, index, 1)));
  const from = parsePoint(start);
  if (end === undefined) return `${from.year}–${now}`;
  if (end === start) return from.month === undefined ? `${from.year}` : `${monthName(from.month)} ${from.year}`;

  const to = parsePoint(end);
  if (from.year === to.year && from.month !== undefined && to.month !== undefined) {
    return `${monthName(from.month)}–${monthName(to.month)} ${from.year}`;
  }
  const label = (point: typeof from) => (point.month === undefined ? `${point.year}` : `${monthName(point.month)} ${point.year}`);
  return `${label(from)}–${label(to)}`;
}

/** "Nov 20, 2024". Dates are stored at UTC midnight, so format in UTC. */
export function formatDate(date: Date, lang: Locale): string {
  return new Intl.DateTimeFormat(BCP47[lang], { dateStyle: 'medium', timeZone: 'UTC' }).format(date);
}
