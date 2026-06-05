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
      .from("User")
      .select("id")
      .eq("email", email)
      .maybeSingle();
    if (error) throw error;
    return data;
  },
  async insert(email) {
    return await supabase.from("User").insert({ email });
  },
};

serve((req: Request) => handleSubscribe(req, db));
