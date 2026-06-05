"use client";

import { useEffect, useState } from "react";
import { MARQUEE, EVENT } from "@/app/data";
import { getCountdown } from "@/lib/countdown";

export default function Marquee() {
  const [countdown, setCountdown] = useState<string | null>(null);

  useEffect(() => {
    const target = new Date(EVENT.target).getTime();
    const pad = (n: number) => String(n).padStart(2, "0");
    const tick = () => {
      const c = getCountdown(target, Date.now());
      setCountdown(
        `Launching in ${c.days}d ${pad(c.hours)}h ${pad(c.minutes)}m ${pad(c.seconds)}s`,
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const base = countdown ? [countdown, ...MARQUEE] : MARQUEE;
  const items = [...base, ...base, ...base];
  const loop = [...items, ...items];

  return (
    <div className="sticky top-0 z-[60] overflow-hidden bg-[#0a0a0a] text-white">
      <div className="flex w-max animate-marquee py-2.5">
        {loop.map((t, i) => (
          <span
            key={i}
            className={`flex items-center whitespace-nowrap px-4 text-xs font-medium tracking-tight ${
              t === countdown ? "text-accent" : "text-white/80"
            }`}
          >
            {t}
            <span className="px-4 text-white/40">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
