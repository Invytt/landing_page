import { describe, it, expect, vi } from "vitest";
import {
  forward,
  isMeetCode,
  upstreamPathForMeet,
  upstreamPathForWellKnown,
} from "@/lib/meet-link-proxy";

describe("meet link proxy", () => {
  it("accepts plain codes and rejects anything path-like", () => {
    expect(isMeetCode("aB3_x-9")).toBe(true);
    expect(isMeetCode("")).toBe(false);
    expect(isMeetCode("../secrets")).toBe(false);
    expect(isMeetCode("a/b")).toBe(false);
    expect(isMeetCode("a".repeat(65))).toBe(false);
  });

  it("maps to the public-event function", () => {
    expect(upstreamPathForMeet("abc123")).toBe("/functions/v1/public-event/m/abc123");
    expect(upstreamPathForWellKnown("assetlinks.json")).toBe(
      "/functions/v1/public-event/.well-known/assetlinks.json",
    );
  });

  it("passes the upstream body through with our content type", async () => {
    const fetchImpl = vi.fn(async () => new Response('{"ok":true}', { status: 200 }));
    const res = await forward("/x", "application/json", "public, max-age=3600", fetchImpl as unknown as typeof fetch);
    expect(res.status).toBe(200);
    expect(res.headers.get("content-type")).toBe("application/json");
    expect(res.headers.get("cache-control")).toBe("public, max-age=3600");
    expect(await res.text()).toBe('{"ok":true}');
  });

  it("never caches a failed upstream response, and reports an outage as 502", async () => {
    const missing = vi.fn(async () => new Response("nope", { status: 404 }));
    const res = await forward("/x", "text/html", "public, max-age=60", missing as unknown as typeof fetch);
    expect(res.status).toBe(404);
    expect(res.headers.get("cache-control")).toBe("no-store");

    const down = vi.fn(async () => {
      throw new Error("offline");
    });
    const out = await forward("/x", "text/html", "no-store", down as unknown as typeof fetch);
    expect(out.status).toBe(502);
  });
});
