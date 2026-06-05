export type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

/** Time remaining between `nowMs` and `targetMs`, clamped at zero. */
export function getCountdown(targetMs: number, nowMs: number): Countdown {
  const ms = Math.max(0, targetMs - nowMs);
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms % 86400000) / 3600000),
    minutes: Math.floor((ms % 3600000) / 60000),
    seconds: Math.floor((ms % 60000) / 1000),
  };
}
