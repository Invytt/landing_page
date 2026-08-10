// Scheduled worker: drains unsent waitlist signups and sends the welcome email
// via AutoSend's bulk endpoint. Invoked by pg_cron (~every minute).
//
// Concurrency: claim_waitlist_batch uses FOR UPDATE SKIP LOCKED, so overlapping
// runs claim disjoint rows and never double-send. A failed bulk send releases
// the batch (email_sent_at -> null) so the next tick retries it.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { buildBulkBody, type Signup } from "./handler.ts";

const env = (globalThis as any).Deno?.env;
const supabase = createClient(
  env.get("SUPABASE_URL")!,
  env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const AUTOSEND_API_KEY = env.get("AUTOSEND_API_KEY");
const AUTOSEND_PROJECT_ID = env.get("AUTOSEND_PROJECT_ID");
const AUTOSEND_TEMPLATE_ID = env.get("AUTOSEND_TEMPLATE_ID");
const CRON_SECRET = env.get("CRON_SECRET");

const BATCH_SIZE = 100; // AutoSend bulk max recipients per request

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });

serve(async (req: Request) => {
  // Only the cron job (carrying the shared secret) may drain the queue. This
  // function is deployed with verify_jwt = false, so the header is the only
  // thing gating it — fail closed if the secret was never configured rather
  // than leaving the queue open to the public internet.
  if (!CRON_SECRET) {
    console.error("CRON_SECRET is not set; refusing to drain the queue");
    return json(500, { error: "misconfigured" });
  }
  if (req.headers.get("x-cron-secret") !== CRON_SECRET) {
    return json(401, { error: "unauthorized" });
  }

  // 1. Atomically claim a batch (marks them sent; we roll back on failure).
  const { data: rows, error: claimErr } = await supabase.rpc(
    "claim_waitlist_batch",
    { batch_size: BATCH_SIZE },
  );
  if (claimErr) {
    console.error("claim failed", claimErr);
    return json(500, { error: "claim failed" });
  }

  const batch = (rows ?? []) as Signup[];
  if (batch.length === 0) {
    return json(200, { claimed: 0, sent: 0 });
  }

  // 2. Send the batch via AutoSend bulk.
  try {
    const res = await fetch("https://api.autosend.com/v1/mails/bulk", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${AUTOSEND_API_KEY}`,
        "x-project-id": AUTOSEND_PROJECT_ID,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(
        buildBulkBody(batch, {
          templateId: AUTOSEND_TEMPLATE_ID,
          nowMs: Date.now(),
        }),
      ),
    });
    if (!res.ok) {
      throw new Error(`AutoSend bulk failed: ${res.status} ${await res.text()}`);
    }
  } catch (e) {
    // 3. Release the claim so the next tick retries this batch.
    console.error("bulk send failed, releasing batch", e);
    await supabase.rpc("release_waitlist_batch", {
      ids: batch.map((r) => r.id),
    });
    return json(502, { claimed: batch.length, sent: 0, retry: true });
  }

  return json(200, { claimed: batch.length, sent: batch.length });
});
