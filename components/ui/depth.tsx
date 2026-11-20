"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { Spark, useCalm } from "@/components/ui/kit";

/* ── Parallax ─────────────────────────────────────────────────────────────
   Things at different depths move at different speeds as the page scrolls.
   speed > 0 drifts up faster than the page (feels near); speed < 0 lags
   behind it (feels far). Everything stops for visitors who prefer less
   motion. Ranges always run 0..1, which the browser's scroll timeline needs. */

export function Parallax({
  children,
  speed = 0.15,
  spin = 0,
  className,
  style,
  progress,
  range,
}: {
  children: ReactNode;
  /** share of the viewport travelled while the element crosses the screen */
  speed?: number;
  /** degrees turned over the same distance */
  spin?: number;
  className?: string;
  style?: CSSProperties;
  /** drive from a pinned scene's progress instead of the element's own pass */
  progress?: MotionValue<number>;
  /** exact travel in px, from start to end of the progress (overrides speed) */
  range?: [number, number];
}) {
  const ref = useRef<HTMLDivElement>(null);
  const calm = useCalm();
  const own = useScroll({ target: ref, offset: ["start end", "end start"] }).scrollYProgress;
  const p = progress ?? own;
  const travel = speed * 520;
  const y = useTransform(p, [0, 1], range ?? [travel, -travel]);
  const rotate = useTransform(p, [0, 1], [-spin / 2, spin / 2]);
  return (
    <motion.div
      ref={ref}
      className={className}
      style={calm ? style : { ...style, y, rotate: spin ? rotate : undefined }}
    >
      {children}
    </motion.div>
  );
}

/* ── Depth field: sticker shapes floating in the margins ─────────────────── */

type Shape = "spark" | "ring" | "dot" | "pill" | "tri" | "squiggle" | "plus";

type Bit = {
  shape: Shape;
  /** which margin, and how far into it (0 = the page edge, 1 = the content) */
  side: "l" | "r";
  edge: number;
  /** % down the section */
  top: number;
  size: number;
  tint: string;
  speed: number;
  spin: number;
};

const PAPER_TINTS = ["#CDBEF7", "#8FD9B6", "#FFD6A5", "#F6C1D0", "#BFDDFB", "#FF9A5C", "#D2402A"];
const NIGHT_TINTS = ["#D2402A", "#CDBEF7", "#8FD9B6", "#FFD6A5", "#3CCFBF", "#FF9A5C", "#F6C1D0"];
const SHAPES: Shape[] = ["spark", "ring", "dot", "pill", "tri", "squiggle", "plus"];

/** A fixed, repeatable scatter for a given seed: same layout on every visit. */
function scatter(seed: number, count: number, night: boolean): Bit[] {
  let s = seed * 7919 + 13;
  const rnd = () => {
    s = (s * 16807) % 2147483647;
    return (s % 10000) / 10000;
  };
  const tints = night ? NIGHT_TINTS : PAPER_TINTS;
  return Array.from({ length: count }, (_, i) => {
    const near = rnd() > 0.45;
    return {
      shape: SHAPES[Math.floor(rnd() * SHAPES.length)],
      side: i % 2 ? "r" : "l",
      edge: rnd() * 0.55,
      top: ((i + 0.3 + rnd() * 0.5) / count) * 100,
      size: near ? 30 + rnd() * 16 : 14 + rnd() * 12,
      tint: tints[Math.floor(rnd() * tints.length)],
      // near shapes rush past, far ones lag behind the page
      speed: near ? 0.35 + rnd() * 0.35 : -(0.1 + rnd() * 0.18),
      spin: (rnd() - 0.5) * 220,
    };
  });
}

function ShapeArt({ shape, size, tint, night }: { shape: Shape; size: number; tint: string; night: boolean }) {
  const ink = night ? "#000" : "#2B1719";
  const line = "#2B1719";
  const shadow = `drop-shadow(2px 2px 0 ${ink})`;
  switch (shape) {
    case "spark":
      return <Spark className="block" style={{ width: size, height: size, color: tint, filter: shadow }} />;
    case "ring":
      return (
        <span
          className="block rounded-full"
          style={{ width: size, height: size, border: `${Math.max(5, size / 5)}px solid ${tint}`, boxShadow: `0 0 0 2px ${line}, inset 0 0 0 2px ${line}, 3px 3px 0 2px ${ink}` }}
        />
      );
    case "dot":
      return (
        <span
          className="block rounded-full border-2"
          style={{ width: size * 0.7, height: size * 0.7, background: tint, borderColor: line, boxShadow: `2px 2px 0 ${ink}` }}
        />
      );
    case "pill":
      return (
        <span
          className="block rounded-full border-2"
          style={{ width: size * 1.3, height: size * 0.5, background: tint, borderColor: line, boxShadow: `3px 3px 0 ${ink}` }}
        />
      );
    case "tri":
      return (
        <svg width={size} height={size} viewBox="0 0 40 40" className="block" style={{ filter: shadow }}>
          <path d="M20 4 37 34H3Z" fill={tint} stroke={line} strokeWidth="2.5" strokeLinejoin="round" />
        </svg>
      );
    case "squiggle":
      return (
        <svg width={size * 1.4} height={size * 0.6} viewBox="0 0 70 30" className="block" style={{ filter: shadow }}>
          <path d="M4 18c8-14 14 10 22-2s14 10 22-2 12 8 18-2" fill="none" stroke={tint} strokeWidth="7" strokeLinecap="round" />
        </svg>
      );
    case "plus":
      return (
        <svg width={size * 0.8} height={size * 0.8} viewBox="0 0 30 30" className="block" style={{ filter: shadow }}>
          <path d="M11 2h8v9h9v8h-9v9h-8v-9H2v-8h9z" fill={tint} stroke={line} strokeWidth="2" strokeLinejoin="round" />
        </svg>
      );
  }
}

function Floater({ bit, night, progress }: { bit: Bit; night: boolean; progress?: MotionValue<number> }) {
  return (
    <Parallax
      speed={bit.speed}
      spin={bit.spin}
      progress={progress}
      className="absolute"
      // the page margin is whatever is left beside the 80rem content column
      style={{
        top: `${bit.top}%`,
        [bit.side === "l" ? "left" : "right"]: `calc(max(0px, (100% - 80rem) / 2) * ${bit.edge.toFixed(3)} + 8px)`,
      }}
    >
      <ShapeArt shape={bit.shape} size={bit.size} tint={bit.tint} night={night} />
    </Parallax>
  );
}

/**
 * Sticker shapes scattered down both margins of a section, at two depths.
 * Put it first inside an `isolate` section: it sits behind the content and
 * stays in the outer margins, clear of any text. Shown from 1400px wide,
 * where the page has margins wide enough to hold them.
 */
export function DepthField({
  seed,
  count = 8,
  night = false,
  progress,
  className,
}: {
  seed: number;
  count?: number;
  night?: boolean;
  /** for pinned scenes: move with the scene's progress */
  progress?: MotionValue<number>;
  className?: string;
}) {
  const bits = scatter(seed, count, night);
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 -z-10 hidden overflow-hidden min-[1400px]:block", className)}
    >
      {bits.map((b, i) => (
        <Floater key={i} bit={b} night={night} progress={progress} />
      ))}
    </div>
  );
}
