// Pure request handler for the waitlist subscribe function.
// No Deno/Supabase imports here so it can be unit-tested in isolation.

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const json = (status: number, body: unknown) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

export interface Db {
  findByEmail(email: string): Promise<{ id: string } | null>;
  insert(email: string): Promise<{ error?: { code?: string } | null }>;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function handleSubscribe(req: Request, db: Db): Promise<Response> {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json(405, { error: "Method not allowed" });
  }

  let email: unknown;
  try {
    ({ email } = await req.json());
  } catch {
    return json(400, { error: "Invalid JSON body." });
  }

  if (!email || typeof email !== "string") {
    return json(400, { error: "A valid email is required." });
  }

  const clean = email.toLowerCase().trim();
  if (!EMAIL_RE.test(clean)) {
    return json(400, { error: "Invalid email format." });
  }

  let existing: { id: string } | null;
  try {
    existing = await db.findByEmail(clean);
  } catch {
    return json(500, { error: "Database error. Please try again." });
  }

  if (existing) {
    return json(409, {
      success: false,
      alreadyExists: true,
      message: "You're already on the list! We'll be in touch.",
    });
  }

  const { error } = await db.insert(clean);
  if (error) {
    if (error.code === "23505") {
      return json(409, {
        success: false,
        alreadyExists: true,
        message: "You're already on the list! We'll be in touch.",
      });
    }
    return json(500, { error: "Failed to subscribe. Please try again." });
  }

  return json(201, {
    success: true,
    alreadyExists: false,
    message: "You're on the list! Welcome aboard.",
  });
}
