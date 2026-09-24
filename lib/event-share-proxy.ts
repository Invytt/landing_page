const FUNCTION_BASE = "/functions/v1/public-event";
const FUNCTION_ACTIONS = new Set(["otp-send", "otp-verify"]);

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
