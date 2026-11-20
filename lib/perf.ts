import { useEffect, useState } from "react";

export { isLite, isTouch, TOUCH_QUERY } from "./lite";

/**
 * Whether a media query matches. `null` until mounted, so the server render
 * and the first client render agree; callers render both variants until then.
 */
export function useMedia(query: string): boolean | null {
  const [match, setMatch] = useState<boolean | null>(null);
  useEffect(() => {
    const q = window.matchMedia?.(query);
    if (!q) return setMatch(false);
    setMatch(q.matches);
    const on = () => setMatch(q.matches);
    q.addEventListener?.("change", on);
    return () => q.removeEventListener?.("change", on);
  }, [query]);
  return match;
}

/** The desktop layout breakpoint (Tailwind `lg`). */
export const WIDE_QUERY = "(min-width: 1024px)";
