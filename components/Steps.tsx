"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { Mail } from "lucide-react";
import { STEPS, type Step } from "@/app/data";
import { Eyebrow, Stamp, Words, useCalm } from "@/components/ui/kit";
import { Phone } from "@/components/ui/phone";
import { DepthField, Parallax } from "@/components/ui/depth";

import {
  CreateScreen,
  InventoryScreen,
  ShareScreen,
  SplitScreen,
  VendorsScreen,
} from "@/components/screens";

const SCREENS: Record<Step["screen"], ReactNode> = {
  create: <CreateScreen />,
  share: <ShareScreen />,
  inventory: <InventoryScreen />,
  vendors: <VendorsScreen />,
  split: <SplitScreen />,
};

const N = STEPS.length;
const LINE_W = 220;
const AMP = 78;

/** Sideways swing of the ticket line at a given share (0..1) of its length. */
const swing = (t: number) => Math.sin(Math.PI * (t * N - 0.5)) * AMP;

function StepRow({ step, i, calm }: { step: Step; i: number; calm: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const side = i % 2 ? -1 : 1;
  const phoneY = useTransform(scrollYProgress, [0, 1], [90, -90]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5, 1], [side * 34, side * 6, side * -22]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [14, 0, -10]);
  const textY = useTransform(scrollYProgress, [0, 1], [36, -36]);
  // the stamp lands as it rises from the foot of the screen to two-thirds up
  const stamp = useRef<HTMLSpanElement>(null);
  const { scrollYProgress: stampP } = useScroll({ target: stamp, offset: ["start end", "start 62%"] });
  const stampScale = useTransform(stampP, [0, 1], [0.3, 1]);
  const stampRotate = useTransform(stampP, [0, 1], [-120, -6]);

  return (
    <li ref={ref} className="relative grid items-center gap-8 py-10 lg:min-h-[700px] lg:grid-cols-2 lg:gap-[240px] lg:py-0">
      {/* numbered stamp on the line */}
      <motion.span
        ref={stamp}
        aria-hidden
        style={calm ? undefined : { scale: stampScale, rotate: stampRotate }}
        className="absolute left-0 top-10 z-10 flex h-14 w-14 items-center justify-center rounded-full border-2 border-ink bg-coral font-display text-3xl text-white shadow-[4px_4px_0_var(--color-ink)] lg:left-1/2 lg:top-1/2 lg:h-20 lg:w-20 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:text-5xl"
      >
        {step.n}
      </motion.span>

      <motion.div
        style={calm ? undefined : { y: textY }}
        className={`pl-[76px] lg:pl-0 ${side === 1 ? "lg:order-1 lg:text-right" : "lg:order-2"}`}
      >
        <p className={`eyebrow flex items-center gap-3 text-coral ${side === 1 ? "lg:justify-end" : ""}`}>
          Step {step.n}
          {step.soon && (
            <a href="/coming-soon" className="transition-transform hover:scale-105" aria-label="Coming soon: see what's on the way">
              <Stamp rotate={-4} className="!tracking-[0.14em]">
                Coming soon
              </Stamp>
            </a>
          )}
        </p>
        <h3 className="display mt-3 text-[clamp(2.1rem,4.2vw,3.6rem)] text-ink">{step.title}</h3>
        <p className={`mt-4 max-w-md text-lg leading-relaxed text-muted ${side === 1 ? "lg:ml-auto" : ""}`}>
          {step.body}
        </p>
      </motion.div>

      <div
        className={`flex justify-center pl-[76px] lg:pl-0 ${side === 1 ? "lg:order-2 lg:justify-start" : "lg:order-1 lg:justify-end"}`}
        style={{ perspective: 1400 }}
      >
        <motion.div
          style={calm ? undefined : { y: phoneY }}
          className="relative"
        >
          <Phone
            plate={step.tint}
            label={`${step.title} in the Invytt app`}
            className="[--ps:0.74] sm:[--ps:0.86] lg:[--ps:0.9]"
            ry={calm ? side * 16 : rotateY}
            rx={calm ? 4 : rotateX}
          >
            {SCREENS[step.screen]}
          </Phone>
        </motion.div>
      </div>
    </li>
  );
}

export default function Steps() {
  const list = useRef<HTMLOListElement>(null);
  const calm = useCalm();
  const [h, setH] = useState(0);
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 55%", "end 55%"] });
  const p = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.4 });

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setH(el.offsetHeight));
    ro.observe(el);
    setH(el.offsetHeight);
    return () => ro.disconnect();
  }, []);

  // The line is drawn for the real height, so its dashes never stretch.
  const d = useMemo(() => {
    if (!h) return "";
    const pts: string[] = [];
    const steps = Math.max(60, Math.round(h / 12));
    for (let k = 0; k <= steps; k++) {
      const t = k / steps;
      pts.push(`${k ? "L" : "M"}${(LINE_W / 2 + swing(t)).toFixed(1)},${(t * h).toFixed(1)}`);
    }
    return pts.join(" ");
  }, [h]);

  const clip = useTransform(p, (v) => `inset(0 0 ${(1 - v) * 100}% 0)`);
  const riderTop = useTransform(p, (v) => v * h);
  const riderX = useTransform(p, (v) => swing(v));
  const riderRotate = useTransform(p, (v) => Math.cos(Math.PI * (v * N - 0.5)) * -22);
  const barH = useTransform(p, (v) => `${v * 100}%`);

  return (
    <section id="how-it-works" className="dots relative isolate overflow-hidden bg-paper py-24 lg:py-32">
      <DepthField seed={23} count={22} />
      <Parallax speed={0.1} className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Eyebrow className="justify-center">How it works</Eyebrow>
        <h2 className="display mt-4 text-[clamp(2.4rem,5.4vw,4.6rem)] text-ink">
          <Words text="From idea to last guest, *in one app.*" />
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Create your event, invite your people, then let Invytt size the
          supplies, split the cost, and book the vendors without leaving the
          app.
        </p>
      </Parallax>

      <ol ref={list} className="relative mx-auto mt-14 max-w-6xl px-5 sm:px-8 lg:mt-10">
        {/* desktop: winding ticket line with an envelope riding it */}
        <div aria-hidden className="pointer-events-none absolute inset-y-0 left-1/2 hidden -translate-x-1/2 lg:block" style={{ width: LINE_W }}>
          {h > 0 && (
            <>
              <svg width={LINE_W} height={h} viewBox={`0 0 ${LINE_W} ${h}`} className="absolute inset-0">
                <path d={d} fill="none" stroke="#2B1719" strokeOpacity="0.22" strokeWidth="3" strokeDasharray="10 9" strokeLinecap="round" />
              </svg>
              <motion.svg
                width={LINE_W}
                height={h}
                viewBox={`0 0 ${LINE_W} ${h}`}
                className="absolute inset-0"
                style={{ clipPath: calm ? undefined : clip }}
              >
                <path d={d} fill="none" stroke="#D2402A" strokeWidth="4" strokeDasharray="10 9" strokeLinecap="round" />
              </motion.svg>
              {!calm && (
                <motion.span
                  style={{ top: riderTop, x: riderX, rotate: riderRotate }}
                  className="absolute left-1/2 z-20 -ml-6 -mt-6 flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-ink bg-sand text-ink shadow-[3px_3px_0_var(--color-ink)]"
                >
                  <Mail size={22} strokeWidth={2.4} />
                </motion.span>
              )}
            </>
          )}
        </div>

        {/* phones and tablets: a straight ticket line down the left */}
        <div aria-hidden className="absolute bottom-10 left-[calc(1.25rem+27px)] top-10 w-[3px] sm:left-[calc(2rem+27px)] lg:hidden">
          <span className="tear-y absolute inset-0 !w-[3px] opacity-60" />
          <motion.span className="absolute inset-x-0 top-0 bg-coral" style={{ height: calm ? "100%" : barH }} />
        </div>

        {STEPS.map((s, i) => (
          <StepRow key={s.n} step={s} i={i} calm={calm} />
        ))}
      </ol>
    </section>
  );
}
