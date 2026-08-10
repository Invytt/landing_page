// Pure helpers for the waitlist email worker. No Deno/network imports so this
// can be unit-tested in isolation.

export interface Signup {
  id: number;
  email: string;
}

// Launch moment comes from launch_date.json at the repo root — the same file the
// site countdown reads through lib/launch.ts. Edit the JSON, never these lines.
// (Deno can't use the "@/" alias or import the Next app, hence the relative path
// and the small duplicated derivation.)
import launch from "../../../launch_date.json" with { type: "json" };

export const LAUNCH_TARGET =
  `${launch.date}T${launch.time}${launch.utcOffset}`;

export const LAUNCH_DATE_LABEL = new Date(LAUNCH_TARGET).toLocaleDateString(
  "en-US",
  {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: launch.timeZone,
  },
);

/** Whole days from `nowMs` until the launch target, clamped at zero. */
export function daysUntilLaunch(nowMs: number): string {
  const targetMs = new Date(LAUNCH_TARGET).getTime();
  return String(Math.max(0, Math.floor((targetMs - nowMs) / 86400000)));
}

/**
 * Build the AutoSend bulk-send body for a claimed batch. firstName/daysLeft/
 * launchDate are shared across all recipients, so they go in the top-level
 * dynamicData; recipients carry only their email.
 */
export function buildBulkBody(
  rows: Signup[],
  opts: { templateId: string; nowMs: number },
) {
  return {
    from: { email: "events@invytt.com", name: "Invytt" },
    subject: "You're on the Invytt waitlist!",
    templateId: opts.templateId,
    dynamicData: {
      firstName: "there",
      daysLeft: daysUntilLaunch(opts.nowMs),
      launchDate: LAUNCH_DATE_LABEL,
    },
    recipients: rows.map((r) => ({ email: r.email })),
  };
}
