import { forward, upstreamPathForWellKnown } from "@/lib/meet-link-proxy";

export const dynamic = "force-dynamic";

/** Lets iOS open invytt.com links in the app (Universal Links). */
export async function GET() {
  return forward(
    upstreamPathForWellKnown("apple-app-site-association"),
    "application/json",
    "public, max-age=3600",
  );
}
