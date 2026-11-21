export type SubscribeState = "success" | "duplicate" | "invalid" | "error";

/** Same rule as the subscribe function (supabase/functions/subscribe/handler.ts). */
export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const INVALID_EMAIL_MESSAGE =
  "That email looks incomplete. Check the part after the @, like name@gmail.com.";

export function isEmail(email: string) {
  return EMAIL_RE.test(email.toLowerCase().trim());
}

export type SubscribeResult = {
  state: SubscribeState;
  message: string;
};

/**
 * POST an email to the Supabase `subscribe` edge function and normalise the
 * response into a UI state. Pure aside from the injected `fetch`.
 */
export async function subscribe(
  email: string,
  url: string,
  fetchImpl: typeof fetch = fetch,
): Promise<SubscribeResult> {
  try {
    const res = await fetchImpl(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json().catch(() => ({}));

    if (res.status === 201 && data.success) {
      return { state: "success", message: data.message };
    }
    if (res.status === 409 && data.alreadyExists) {
      return { state: "duplicate", message: data.message };
    }
    if (res.status === 400) {
      return { state: "invalid", message: INVALID_EMAIL_MESSAGE };
    }
    return {
      state: "error",
      message: data.error || "Something went wrong. Please try again.",
    };
  } catch {
    return { state: "error", message: "Network error. Please try again." };
  }
}
