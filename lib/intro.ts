/**
 * The loading card and the hero's entrance are tied together.
 *
 * First visit: the card stays up for at least MIN_CARD_MS and until the hero
 * has hydrated; then the hero sets data-ready on <html>, the card lifts
 * (see .loader in globals.css) and the hero animates in underneath it.
 * Repeat visits in the same session skip the card (the inline script in
 * app/layout.tsx sets data-seen), so the hero starts at once.
 */
export const MIN_CARD_MS = 1300;

export function seenBefore(): boolean {
  return typeof document !== "undefined" && document.documentElement.dataset.seen === "1";
}

/** Milliseconds to keep the card up, counted from now. */
export function cardHoldMs(): number {
  if (typeof performance === "undefined" || seenBefore()) return 0;
  return Math.max(0, MIN_CARD_MS - performance.now());
}

/** Seconds the hero waits after the card starts lifting. */
export function introDelay(): number {
  return seenBefore() ? 0.05 : 0.4;
}

export function markReady() {
  document.documentElement.dataset.ready = "1";
}
