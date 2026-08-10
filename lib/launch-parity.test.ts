import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";
import { EVENT } from "../app/data";
import { LAUNCH_TARGET, LAUNCH_DATE_LABEL } from "./launch";
import launch from "../launch_date.json";

// launch_date.json is the only place the launch moment is written down. The site
// countdown reads it via lib/launch.ts; the waitlist email worker reads it
// directly (it runs on Deno inside Supabase and can't import the Next app); the
// sample-email script parses it. These tests fail if any of them stops doing so —
// that drift is how the email once shipped "0 days · July 11, 2026" while the
// site counted down to August 31.
const HANDLER = "supabase/functions/send-waitlist-emails/handler.ts";
const SCRIPT = "scripts/send-sample-emails.mjs";

describe("launch date parity", () => {
  it("EVENT.target is derived from launch_date.json", () => {
    expect(EVENT.target).toBe(
      `${launch.date}T${launch.time}${launch.utcOffset}`,
    );
    expect(EVENT.target).toBe(LAUNCH_TARGET);
    expect(Number.isNaN(new Date(LAUNCH_TARGET).getTime())).toBe(false);
  });

  it("the label matches the target in the launch time zone", () => {
    expect(LAUNCH_DATE_LABEL).toBe(
      new Date(LAUNCH_TARGET).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        timeZone: launch.timeZone,
      }),
    );
  });

  it("the email worker reads launch_date.json instead of its own copy", () => {
    const src = readFileSync(HANDLER, "utf8");
    expect(src).toMatch(/launch_date\.json/);
    expect(src).not.toMatch(/LAUNCH_TARGET\s*=\s*"/);
    expect(src).not.toMatch(/LAUNCH_DATE_LABEL\s*=\s*"/);
  });

  it("the sample-email script reads launch_date.json and hardcodes nothing", () => {
    const src = readFileSync(SCRIPT, "utf8");
    expect(src).toMatch(/launch_date\.json/);
    expect(src).not.toMatch(/launchDate:\s*"/);
    expect(src).not.toMatch(/daysLeft:\s*"/);
  });
});
