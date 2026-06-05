import { describe, it, expect } from "vitest";
import { getCountdown } from "./countdown";

const DAY = 86400000;
const HOUR = 3600000;
const MIN = 60000;
const SEC = 1000;

describe("getCountdown", () => {
  it("breaks a span into d/h/m/s", () => {
    const now = 0;
    const target = 2 * DAY + 3 * HOUR + 4 * MIN + 5 * SEC;
    expect(getCountdown(target, now)).toEqual({
      days: 2,
      hours: 3,
      minutes: 4,
      seconds: 5,
    });
  });

  it("clamps to zero when target is in the past", () => {
    expect(getCountdown(0, 10 * DAY)).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });

  it("rolls units correctly at boundaries", () => {
    expect(getCountdown(DAY, 0)).toEqual({
      days: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    expect(getCountdown(HOUR - SEC, 0)).toEqual({
      days: 0,
      hours: 0,
      minutes: 59,
      seconds: 59,
    });
  });
});
