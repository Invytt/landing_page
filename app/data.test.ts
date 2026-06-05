import { describe, it, expect } from "vitest";
import { EVENT, MARQUEE, SPEAKERS, FAQ } from "./data";

describe("EVENT", () => {
  it("has the core fields", () => {
    for (const k of ["name", "tagline", "dateRange", "target"] as const) {
      expect(EVENT[k]).toBeTruthy();
    }
  });
  it("target is a parseable date", () => {
    expect(Number.isNaN(new Date(EVENT.target).getTime())).toBe(false);
  });
});

describe("collections", () => {
  it("marquee + faq are non-empty", () => {
    expect(MARQUEE.length).toBeGreaterThan(0);
    expect(FAQ.length).toBeGreaterThan(0);
  });

  it("every speaker has name, role, img", () => {
    expect(SPEAKERS.length).toBeGreaterThan(0);
    for (const s of SPEAKERS) {
      expect(s.name).toBeTruthy();
      expect(s.role).toBeTruthy();
      expect(s.img).toMatch(/^https?:\/\//);
    }
  });

  it("every FAQ item has q and a", () => {
    for (const f of FAQ) {
      expect(f.q).toBeTruthy();
      expect(f.a).toBeTruthy();
    }
  });
});
