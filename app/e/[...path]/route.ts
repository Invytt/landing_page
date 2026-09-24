import { NextRequest } from "next/server";
import {
  isEventShareAction,
  proxyResponseHeaders,
  rewriteEventMetadataUrls,
  upstreamPathForEventShare,
} from "@/lib/event-share-proxy";

const SUPABASE_ORIGIN =
  process.env.EVENT_SHARE_UPSTREAM_ORIGIN ??
  "https://wcooewcipvdciduvudjp.supabase.co";
const FUNCTION_BASE = "/functions/v1/public-event";
const FUNCTION_ORIGIN = `${SUPABASE_ORIGIN}${FUNCTION_BASE}`;

function isHtmlPage(path: string[], method: string): boolean {
  return method === "GET" &&
    path.length === 1 &&
    !isEventShareAction(path);
}

function rewritePageUrls(source: string, request: NextRequest, slug: string) {
  const shareBase = `${request.nextUrl.origin}/e`;
  const pageUrl = `${shareBase}/${encodeURIComponent(slug)}`;
  // Metadata (canonical and OG) should point at the public website, while
  // static function assets remain on their content-typed Supabase endpoints.
  return rewriteEventMetadataUrls(source, pageUrl)
    .replaceAll(`"${FUNCTION_BASE}/`, `"${FUNCTION_ORIGIN}/`)
    .replaceAll(`'${FUNCTION_BASE}/`, `'${FUNCTION_ORIGIN}/`);
}

async function proxy(request: NextRequest, path: string[]): Promise<Response> {
  const upstreamUrl = new URL(upstreamPathForEventShare(path), SUPABASE_ORIGIN);
  upstreamUrl.search = request.nextUrl.search;

  const headers = new Headers();
  headers.set("x-invytt-share-proxy", "1");
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("content-type", contentType);

  const upstream = await fetch(upstreamUrl, {
    method: request.method,
    headers,
    body: request.method === "GET" || request.method === "HEAD"
      ? undefined
      : await request.arrayBuffer(),
    redirect: "manual",
  });

  const responseHeaders = proxyResponseHeaders(upstream.headers);

  if (isHtmlPage(path, request.method)) {
    responseHeaders.set("content-type", "text/html; charset=utf-8");
    responseHeaders.set("cache-control", "no-store");
    return new Response(
      rewritePageUrls(await upstream.text(), request, path[0]!),
      { status: upstream.status, headers: responseHeaders },
    );
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: responseHeaders,
  });
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return proxy(request, (await context.params).path);
}

export async function POST(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> },
) {
  return proxy(request, (await context.params).path);
}
