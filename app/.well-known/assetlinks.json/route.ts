import { forward, upstreamPathForWellKnown } from "@/lib/meet-link-proxy";

export const dynamic = "force-dynamic";

/** Lets Android open invytt.com links in the app (App Links). */
export async function GET() {
  return forward(
    upstreamPathForWellKnown("assetlinks.json"),
    "application/json",
    "public, max-age=3600",
  );
}
