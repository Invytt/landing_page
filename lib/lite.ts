/**
 * Lite mode: a still, lighter page for slow connections, Data Saver and
 * low-memory phones. Decided once, before first paint, by the inline script
 * in app/layout.tsx, which sets data-lite on <html>. In lite mode the page
 * behaves as it does for visitors who ask for less motion: no video, no 3D,
 * no parallax, no pinned scenes, and nothing that loops.
 */
export const LITE_SCRIPT =
  "try{var d=document.documentElement,n=navigator,c=n.connection||{},m=n.deviceMemory;" +
  "if(c.saveData||/^(slow-2g|2g|3g)$/.test(c.effectiveType||'')||(m&&m<=2)){d.dataset.lite='1'}}catch(e){}";

export function isLite(): boolean {
  return typeof document !== "undefined" && document.documentElement.dataset.lite === "1";
}

/** Phones and tablets: no hover, a finger for a pointer. */
export const TOUCH_QUERY = "(hover: none), (pointer: coarse)";

export function isTouch(): boolean {
  return typeof window !== "undefined" && !!window.matchMedia?.(TOUCH_QUERY).matches;
}
