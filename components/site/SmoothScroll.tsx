"use client";

import { useEffect } from "react";
import { isLite, isTouch } from "@/lib/perf";

/**
 * Weighted, smooth wheel scrolling on desktop. Phones already scroll
 * smoothly, so there it only adds work: it stays off on touch screens, in
 * lite mode and for visitors who prefer less motion, and its code is only
 * downloaded where it runs.
 */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || isTouch() || isLite()) return;
    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    let gone = false;
    import("lenis").then(({ default: Lenis }) => {
      if (gone) return;
      const l = new Lenis({
        lerp: 0.11,
        wheelMultiplier: 1,
        anchors: { offset: -72 },
      });
      lenis = l;
      const loop = (t: number) => {
        l.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
    });
    return () => {
      gone = true;
      cancelAnimationFrame(raf);
      lenis?.destroy();
    };
  }, []);
  return null;
}
