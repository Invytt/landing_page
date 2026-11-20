// Meet links (the QR on every profile) and the two app-association files are
// served by the same Supabase function as shared events. The website only
// forwards them, so a phone camera that scans a code lands on invytt.com and
// the installed app can claim the link.

export const MEET_UPSTREAM_ORIGIN =
  process.env.EVENT_SHARE_UPSTREAM_ORIGIN ??
  "https://wcooewcipvdciduvudjp.supabase.co";

const FUNCTION_BASE = "/functions/v1/public-event";

/** Only letters, digits, dash and underscore are valid in a meet code. */
export function isMeetCode(code: string): boolean {
  return /^[A-Za-z0-9_-]{1,64}$/.test(code);
}

export function upstreamPathForMeet(code: string): string {
  return `${FUNCTION_BASE}/m/${encodeURIComponent(code)}`;
}

export function upstreamPathForWellKnown(
  file: "apple-app-site-association" | "assetlinks.json",
): string {
  return `${FUNCTION_BASE}/.well-known/${file}`;
}

/** Fetch an upstream document and pass it through with a safe set of headers. */
export async function forward(
  path: string,
  contentType: string,
  cacheControl: string,
  fetchImpl: typeof fetch = fetch,
): Promise<Response> {
  let upstream: Response;
  try {
    upstream = await fetchImpl(new URL(path, MEET_UPSTREAM_ORIGIN), {
      headers: { "x-invytt-share-proxy": "1" },
      redirect: "manual",
    });
  } catch {
    return new Response("Upstream unavailable", { status: 502 });
  }
  const headers = new Headers({ "content-type": contentType });
  headers.set("cache-control", upstream.ok ? cacheControl : "no-store");
  const location = upstream.headers.get("location");
  if (location) headers.set("location", location);
  return new Response(upstream.body, { status: upstream.status, headers });
}
