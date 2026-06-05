export type SubscribeState = "success" | "duplicate" | "error";

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
    return {
      state: "error",
      message: data.error || "Something went wrong. Please try again.",
    };
  } catch {
    return { state: "error", message: "Network error. Please try again." };
  }
}
