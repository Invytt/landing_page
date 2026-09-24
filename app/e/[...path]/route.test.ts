import { describe, expect, it } from "vitest";

import {
  proxyResponseHeaders,
  rewriteEventMetadataUrls,
  upstreamPathForEventShare,
} from "@/lib/event-share-proxy";

describe("event share proxy routing", () => {
  it("sends a public share page to the public-event Edge Function", () => {
    expect(upstreamPathForEventShare(["abc123"])).toBe(
      "/functions/v1/public-event/abc123",
    );
  });

  it("sends OTP endpoints to the public-event Edge Function", () => {
    expect(upstreamPathForEventShare(["otp-send"])).toBe(
      "/functions/v1/public-event/otp-send",
    );
  });
});

describe("event share preview metadata", () => {
  it("rewrites canonical and cover URLs to the branded event URL", () => {
    const result = rewriteEventMetadataUrls(
      '<meta property="og:image" content="https://wcooewcipvdciduvudjp.supabase.co/functions/v1/public-event/abc123/og" /><link rel="canonical" href="https://edge-runtime.supabase.com/functions/v1/public-event/abc123" />',
      "https://invytt.com/e/abc123",
    );

    expect(result).toContain('content="https://invytt.com/e/abc123/og"');
    expect(result).toContain('href="https://invytt.com/e/abc123"');
    expect(result).not.toContain("supabase.com/functions/v1/public-event/abc123");
  });
});

describe("event share proxy response headers", () => {
  it("does not forward Supabase's HTML-blocking content security policy", () => {
    const headers = proxyResponseHeaders(new Headers({
      "content-security-policy": "default-src 'none'; sandbox",
      "content-type": "text/html; charset=utf-8",
    }));

    expect(headers.get("content-security-policy")).toBeNull();
    expect(headers.get("content-type")).toBe("text/html; charset=utf-8");
  });
});
