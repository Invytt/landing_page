// Launch moment, read from launch_date.json — the one file to edit when the
// date or time moves. Kept free of app imports so both the Next app and the
// Supabase Edge Function (Deno) can pull from the same JSON.
import launch from "@/launch_date.json";

/** ISO instant, e.g. "2026-08-31T09:00:00+05:30". */
export const LAUNCH_TARGET = `${launch.date}T${launch.time}${launch.utcOffset}`;

export const LAUNCH_TIME_ZONE = launch.timeZone;

/** Human label in the launch time zone, e.g. "August 31, 2026". */
export const LAUNCH_DATE_LABEL = new Date(LAUNCH_TARGET).toLocaleDateString(
  "en-US",
  {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: LAUNCH_TIME_ZONE,
  },
);

/** Whole days from `nowMs` until launch, clamped at zero. */
export function daysUntilLaunch(nowMs: number): string {
  const targetMs = new Date(LAUNCH_TARGET).getTime();
  return String(Math.max(0, Math.floor((targetMs - nowMs) / 86400000)));
}
