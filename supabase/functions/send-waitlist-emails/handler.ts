// Pure helpers for the waitlist email worker. No Deno/network imports so this
// can be unit-tested in isolation.

export interface Signup {
  id: number;
  email: string;
}

// Launch target — keep in sync with app/data.ts (EVENT.target).
export const LAUNCH_TARGET = "2026-08-01T09:00:00+05:30";
export const LAUNCH_DATE_LABEL = "August 1, 2026";

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
