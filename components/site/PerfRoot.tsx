"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Pauses every looping CSS animation (tickers, spinning badges, bobbing
 * stickers, swaying phones) in sections that are off screen. Each section
 * gets data-off while it is out of view; globals.css pauses animations
 * under it. They resume, from where they stopped, as the section returns.
 */
export default function PerfRoot() {
  const path = usePathname();

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) delete el.dataset.off;
          else el.dataset.off = "";
        }
      },
      { rootMargin: "200px 0px" },
    );
    const watch = () => {
      document
        .querySelectorAll<HTMLElement>("section, footer, [data-perf]")
        .forEach((el) => io.observe(el));
    };
    watch();
    // sections that hydrate late are already in the HTML, but a client-side
    // navigation renders the new page after this effect runs
    const id = window.setTimeout(watch, 400);
    return () => {
      window.clearTimeout(id);
      io.disconnect();
    };
  }, [path]);

  return null;
}
