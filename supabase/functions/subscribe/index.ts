import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { handleSubscribe, type Db } from "./handler.ts";

const env = (globalThis as any).Deno?.env;
const supabase = createClient(
  env.get("SUPABASE_URL")!,
  env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

const db: Db = {
  async findByEmail(email) {
    const { data, error } = await supabase
      .from("waitlist_signups")
      .select("id")
      .eq("email", email)
      .maybeSingle();
    if (error) throw error;
    return data;
  },
  async insert(email) {
    return await supabase.from("waitlist_signups").insert({ email });
  },
};

// Signup is insert-only: it returns 201 immediately and never blocks on email.
// The welcome email is sent asynchronously by the scheduled worker
// (supabase/functions/send-waitlist-emails) draining waitlist_signups where
// email_sent_at IS NULL. This keeps the signup path fast under concurrent
// load and makes delivery durable + retryable.
serve((req: Request) => handleSubscribe(req, db));
