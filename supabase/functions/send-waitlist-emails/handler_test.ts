// Deno test: `deno test supabase/functions/send-waitlist-emails/handler_test.ts`
import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import {
  buildBulkBody,
  daysUntilLaunch,
  LAUNCH_DATE_LABEL,
  type Signup,
} from "./handler.ts";

// 2026-06-10 12:00 UTC -> launch is 2026-08-31T09:00+05:30 (03:30 UTC)
const NOW = new Date("2026-06-10T12:00:00Z").getTime();

Deno.test("daysUntilLaunch counts whole days, clamped at zero", () => {
  assertEquals(daysUntilLaunch(NOW), "81");
  const afterLaunch = new Date("2026-09-01T00:00:00Z").getTime();
  assertEquals(daysUntilLaunch(afterLaunch), "0");
});

Deno.test("buildBulkBody puts shared vars top-level, emails per recipient", () => {
  const rows: Signup[] = [
    { id: 1, email: "a@x.com" },
    { id: 2, email: "b@x.com" },
  ];
  const body = buildBulkBody(rows, { templateId: "tmpl_1", nowMs: NOW });

  assertEquals(body.from, { email: "events@invytt.com", name: "Invytt" });
  assertEquals(body.templateId, "tmpl_1");
  assertEquals(body.dynamicData, {
    firstName: "there",
    daysLeft: "81",
    launchDate: LAUNCH_DATE_LABEL,
  });
  assertEquals(body.recipients, [
    { email: "a@x.com" },
    { email: "b@x.com" },
  ]);
});

Deno.test("buildBulkBody handles empty batch", () => {
  const body = buildBulkBody([], { templateId: "tmpl_1", nowMs: NOW });
  assertEquals(body.recipients, []);
});
