"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView } from "motion/react";
import { EVENT } from "@/app/data";
import { getCountdown } from "@/lib/countdown";

const diff = (target: number) => {
  const c = getCountdown(target, Date.now());
  return [c.days, c.hours, c.minutes, c.seconds];
};

const pad = (n: number) => String(n).padStart(2, "0");
const LABELS = ["Days", "Hours", "Min", "Sec"];

/** Split-flap countdown to launch. Each tile flips when its value changes. */
export default function Countdown() {
  const target = new Date(EVENT.target).getTime();
  const [t, setT] = useState<number[] | null>(null);
  const box = useRef<HTMLDivElement>(null);
  // ticks only while it is on screen
  const seen = useInView(box, { margin: "100px" });

  useEffect(() => {
    setT(diff(target));
    if (!seen) return;
    const id = setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
  }, [target, seen]);

  const parts = t ?? [0, 0, 0, 0];

  return (
    <div ref={box} className="flex flex-wrap items-start justify-center gap-2 sm:gap-3" role="timer" aria-label="Time until launch">
      {parts.map((p, i) => {
        const text = i === 0 ? String(p) : pad(p);
        return (
          <div key={LABELS[i]} className="flex flex-col items-center">
            <div
              className="relative flex h-16 min-w-[3.6rem] items-center justify-center overflow-hidden rounded-xl border-2 border-ink bg-night px-2.5 font-display text-4xl tabular-nums text-paper sm:h-20 sm:min-w-[4.6rem] sm:text-5xl"
              style={{ perspective: 400 }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={text}
                  initial={{ rotateX: -90, opacity: 0 }}
                  animate={{ rotateX: 0, opacity: 1 }}
                  exit={{ rotateX: 90, opacity: 0 }}
                  transition={{ duration: 0.32, ease: "easeOut" }}
                  className="inline-block"
                >
                  {text}
                </motion.span>
              </AnimatePresence>
              <span aria-hidden className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 bg-black/60" />
            </div>
            <span className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-muted">
              {LABELS[i]}
            </span>
          </div>
        );
      })}
    </div>
  );
}
