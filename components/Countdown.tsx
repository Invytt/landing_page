"use client";

import { useEffect, useState } from "react";
import { EVENT } from "@/app/data";
import { getCountdown } from "@/lib/countdown";

const diff = (target: number) => {
  const c = getCountdown(target, Date.now());
  return [c.days, c.hours, c.minutes, c.seconds];
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown() {
  const target = new Date(EVENT.target).getTime();
  const [t, setT] = useState<number[] | null>(null);

  useEffect(() => {
    setT(diff(target));
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target]);

  const parts = t ?? [0, 0, 0, 0];
  const labels = ["Days", "Hours", "Min", "Sec"];

  return (
    <div className="flex items-center gap-2 font-display text-2xl font-extrabold tabular-nums text-white sm:gap-3 md:text-4xl">
      {parts.map((p, i) => (
        <span key={i} className="flex items-baseline gap-2 sm:gap-3">
          <span className="flex flex-col items-center">
            <span>{i === 0 ? p : pad(p)}</span>
            <span className="mt-1 text-xs font-medium uppercase tracking-widest text-white/40">
              {labels[i]}
            </span>
          </span>
          {i < parts.length - 1 && <span className="text-accent">:</span>}
        </span>
      ))}
    </div>
  );
}
