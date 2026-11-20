"use client";

import { useEffect, useRef, useState } from "react";
import { MARQUEE, EVENT } from "@/app/data";
import { getCountdown } from "@/lib/countdown";
import { Spark } from "@/components/ui/kit";

/** The ticker across the very top: launch countdown plus early-access perks. */
export default function Marquee() {
  const [countdown, setCountdown] = useState<string | null>(null);
  const bar = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = new Date(EVENT.target).getTime();
    const pad = (n: number) => String(n).padStart(2, "0");
    const label = () => {
      const c = getCountdown(target, Date.now());
      return `Launching in ${c.days}d ${pad(c.hours)}h ${pad(c.minutes)}m ${pad(c.seconds)}s`;
    };
    // render the ticker once, then change only the countdown's own text each
    // second, rather than re-rendering every item in the ticker
    setCountdown(label());
    const id = setInterval(() => {
      if (document.hidden) return;
      const t = label();
      bar.current?.querySelectorAll<HTMLElement>("[data-cd]").forEach((el) => {
        el.firstChild!.textContent = t;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const base = countdown ? [countdown, ...MARQUEE] : MARQUEE;
  const items = [...base, ...base, ...base];
  const loop = [...items, ...items];

  return (
    <div className="sticky top-0 z-[60] overflow-hidden border-b-2 border-ink bg-coral text-white">
      <div ref={bar} className="flex w-max animate-marquee py-2 hover:[animation-play-state:paused]">
        {loop.map((t, i) => (
          <span
            key={i}
            data-cd={t === countdown ? "" : undefined}
            className={`flex items-center whitespace-nowrap px-4 text-xs font-bold tracking-wide ${
              t === countdown ? "tabular-nums text-white" : "text-white/90"
            }`}
          >
            {t}
            <Spark className="ml-8 h-3 w-3 text-ink" />
          </span>
        ))}
      </div>
    </div>
  );
}
