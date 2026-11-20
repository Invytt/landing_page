import { forward, isMeetCode, upstreamPathForMeet } from "@/lib/meet-link-proxy";

export const dynamic = "force-dynamic";

/** invytt.com/m/<code>: the page a phone camera opens after scanning a profile code. */
export async function GET(
  _request: Request,
  context: { params: Promise<{ code: string }> },
) {
  const { code } = await context.params;
  if (!isMeetCode(code)) return new Response("Not found", { status: 404 });
  return forward(upstreamPathForMeet(code), "text/html; charset=utf-8", "no-store");
}
