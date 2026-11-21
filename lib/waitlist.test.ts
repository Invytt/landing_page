import { describe, it, expect, vi } from "vitest";
import { INVALID_EMAIL_MESSAGE, isEmail, subscribe } from "./waitlist";

const URL = "https://example.test/subscribe";

function mockFetch(status: number, body: unknown) {
  return vi.fn(async () =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json" },
    }),
  ) as unknown as typeof fetch;
}

describe("subscribe", () => {
  it("returns success on 201", async () => {
    const f = mockFetch(201, { success: true, message: "You're in!" });
    const res = await subscribe("a@b.com", URL, f);
    expect(res).toEqual({ state: "success", message: "You're in!" });
  });

  it("returns duplicate on 409", async () => {
    const f = mockFetch(409, { alreadyExists: true, message: "Already!" });
    expect(await subscribe("a@b.com", URL, f)).toEqual({
      state: "duplicate",
      message: "Already!",
    });
  });

  it("returns invalid with a fix-it message on 400", async () => {
    const f = mockFetch(400, { error: "Invalid email format." });
    expect(await subscribe("bad", URL, f)).toEqual({
      state: "invalid",
      message: INVALID_EMAIL_MESSAGE,
    });
  });

  it("returns generic error when 500 has no message", async () => {
    const f = mockFetch(500, {});
    const res = await subscribe("a@b.com", URL, f);
    expect(res.state).toBe("error");
    expect(res.message).toMatch(/something went wrong/i);
  });

  it("returns network error when fetch throws", async () => {
    const f = vi.fn(async () => {
      throw new Error("boom");
    }) as unknown as typeof fetch;
    const res = await subscribe("a@b.com", URL, f);
    expect(res).toEqual({ state: "error", message: "Network error. Please try again." });
  });

  it("posts the email as JSON to the url", async () => {
    const f = mockFetch(201, { success: true, message: "ok" });
    await subscribe("hi@x.com", URL, f);
    expect(f).toHaveBeenCalledWith(
      URL,
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ email: "hi@x.com" }),
      }),
    );
  });
});

describe("isEmail", () => {
  it("matches the server's rule", () => {
    expect(isEmail("asha@gmail.com")).toBe(true);
    expect(isEmail("  Asha@Gmail.com ")).toBe(true);
    expect(isEmail("asha@x")).toBe(false);
    expect(isEmail("asha")).toBe(false);
    expect(isEmail("as ha@x.com")).toBe(false);
  });
});
