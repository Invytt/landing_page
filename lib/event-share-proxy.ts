const FUNCTION_BASE = "/functions/v1/public-event";
const FUNCTION_ACTIONS = new Set(["otp-send", "otp-verify"]);
const EVENT_PAGE_CACHE_CONTROL =
  "public, s-maxage=60, stale-while-revalidate=300";

/** Maps the public website route to the matching public Event Function route. */
export function upstreamPathForEventShare(path: string[]): string {
  const [first, second] = path;
  if (!first) return FUNCTION_BASE;
  if (FUNCTION_ACTIONS.has(first)) return `${FUNCTION_BASE}/${first}`;
  const eventPath = `${FUNCTION_BASE}/${encodeURIComponent(first)}`;
  return second === "og" ? `${eventPath}/og` : eventPath;
}

export function isEventShareAction(path: string[]): boolean {
  return FUNCTION_ACTIONS.has(path[0] ?? "");
}

export type EventPageCacheInput = {
  method: string;
  path: string[];
  status: number;
};

/**
 * Cache only a successful event document. RSVP/OTP actions, missing events,
 * and all other function routes must never become shared cache entries.
 */
export function eventPageCacheControl(
  input: EventPageCacheInput,
): string | null {
  if (
    input.method !== "GET" ||
    input.path.length !== 1 ||
    isEventShareAction(input.path) ||
    input.status !== 200
  ) return null;
  return EVENT_PAGE_CACHE_CONTROL;
}

/** Remove transport policies from the upstream API domain that do not apply to
 * the public website and would otherwise block its stylesheet and images. */
export function proxyResponseHeaders(upstream: Headers): Headers {
  const headers = new Headers(upstream);
  headers.delete("content-security-policy");
  headers.delete("content-length");
  headers.delete("content-encoding");
  headers.delete("set-cookie");
  return headers;
}

/** Move event metadata off the Supabase API origin onto the branded share URL. */
export function rewriteEventMetadataUrls(source: string, pageUrl: string): string {
  return source.replace(
    /https:\/\/(?:wcooewcipvdciduvudjp\.supabase\.co|edge-runtime\.supabase\.com)\/functions\/v1\/(?:public|private)-event\/[A-Za-z0-9_-]+(\/og)?/g,
    (_match, ogPath: string | undefined) => `${pageUrl}${ogPath ?? ""}`,
  );
}
