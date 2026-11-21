"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Fragment, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import { isLite } from "@/lib/perf";

/* ── Small pieces shared by every section ─────────────────────────────── */

/**
 * useTransform for a 0..1 scroll progress, with the range padded so it always
 * spans 0 to 1. Motion hands opacity, filter and clip-path to the browser's
 * own scroll timeline; there, a range that stops short of either end drifts
 * back to the element's starting value instead of holding. Padding prevents it.
 */
export function useRange<T extends string | number>(
  progress: MotionValue<number>,
  input: number[],
  output: T[],
): MotionValue<T> {
  const i = [...input];
  const o = [...output];
  if (i[0] > 0) {
    i.unshift(0);
    o.unshift(o[0]);
  }
  if (i[i.length - 1] < 1) {
    i.push(1);
    o.push(o[o.length - 1]);
  }
  return useTransform(progress, i, o);
}

/**
 * True once we know the visitor asked for reduced motion. Starts false on the
 * server and the first client render so the two always match; scroll scenes
 * swap to their calm layout right after mounting.
 */
/** Less motion: the visitor asked for it, or the page is in lite mode. */
export function useCalm() {
  const [calm, setCalm] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    setCalm(q.matches || isLite());
    const on = () => setCalm(q.matches || isLite());
    q.addEventListener?.("change", on);
    return () => q.removeEventListener?.("change", on);
  }, []);
  return calm;
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p className={cn("eyebrow flex items-center gap-3 text-coral", className)}>
      <span aria-hidden className="h-[2px] w-8 bg-current" />
      {children}
    </p>
  );
}

/** A sticker: tinted fill, ink outline, slight tilt. */
export function Sticker({
  children,
  className,
  tint = "#fff",
  rotate = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  tint?: string;
  rotate?: number;
  style?: CSSProperties;
}) {
  return (
    <span
      className={cn(
        "stk-sm inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-bold text-ink",
        className,
      )}
      style={{ background: tint, rotate: `${rotate}deg`, ...style }}
    >
      {children}
    </span>
  );
}

/** Rubber-stamp label, used for "Coming soon" and "Going". */
export function Stamp({
  children,
  className,
  color = "var(--color-coral)",
  rotate = -8,
}: {
  children: ReactNode;
  className?: string;
  color?: string;
  rotate?: number;
}) {
  return (
    <span
      className={cn(
        "inline-block rounded-lg border-[3px] px-3 py-1 text-xs font-bold uppercase tracking-[0.18em]",
        className,
      )}
      style={{ color, borderColor: color, rotate: `${rotate}deg` }}
    >
      {children}
    </span>
  );
}

/**
 * Headline that arrives one word at a time. Wrap a phrase in *asterisks*
 * to set it in coral italics. Nothing is clipped: words fade and rise.
 */
export function Words({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  start,
}: {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  /** when given, the words wait for this to turn true instead of for scroll */
  start?: boolean;
}) {
  const reduce = useReducedMotion();
  const parts = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  let k = 0;
  return (
    <motion.span
      className={className}
      initial={reduce ? false : "hide"}
      {...(start === undefined
        ? { whileInView: "show", viewport: { once: true, amount: 0.4 } }
        : { animate: start || reduce ? "show" : "hide" })}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {parts.map((part, pi) => {
        const em = part.startsWith("*");
        const words = (em ? part.slice(1, -1) : part).split(" ").filter(Boolean);
        const inner = words.map((w) => (
          // the word animates as a block; the space after it stays ordinary
          // text, so lines wrap and centre exactly as plain text would
          <Fragment key={k++}>
            <motion.span
              className="wd inline-block"
              variants={{
                hide: { opacity: 0, y: "0.5em", rotate: 4, filter: "blur(6px)" },
                show: {
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                  filter: "blur(0px)",
                  transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
                },
              }}
            >
              {w}
            </motion.span>{" "}
          </Fragment>
        ));
        return em ? <em key={pi}>{inner}</em> : <span key={pi}>{inner}</span>;
      })}
    </motion.span>
  );
}

/** Fade-and-rise when scrolled into view. */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Pulls its child toward the pointer, like a magnet. */
export function Magnetic({
  children,
  className,
  strength = 0.3,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 260, damping: 16, mass: 0.4 });
  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Tilts its child in 3D under the pointer, with a moving glare. */
export function Tilt({
  children,
  className,
  max = 10,
  glare = true,
  style,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  glare?: boolean;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const spx = useSpring(px, { stiffness: 180, damping: 18 });
  const spy = useSpring(py, { stiffness: 180, damping: 18 });
  const rotateY = useTransform(spx, [0, 1], [-max, max]);
  const rotateX = useTransform(spy, [0, 1], [max, -max]);
  const gx = useTransform(spx, [0, 1], ["0%", "100%"]);
  const gy = useTransform(spy, [0, 1], ["0%", "100%"]);
  const glareBg = useGlare(gx, gy);
  return (
    <motion.div
      ref={ref}
      className={cn("group/tilt relative preserve-3d", className)}
      style={{ rotateX, rotateY, transformPerspective: 1000, ...style }}
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        px.set((e.clientX - r.left) / r.width);
        py.set((e.clientY - r.top) / r.height);
      }}
      onPointerLeave={() => {
        px.set(0.5);
        py.set(0.5);
      }}
    >
      {children}
      {glare && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  );
}

function useGlare(gx: MotionValue<string>, gy: MotionValue<string>) {
  return useTransform(
    [gx, gy] as MotionValue[],
    ([x, y]) =>
      `radial-gradient(260px circle at ${x} ${y}, rgb(255 255 255 / 0.35), transparent 65%)`,
  );
}

/**
 * Perforated ticket edge. Sits inside a section, along its top or bottom,
 * and bites semicircles of the neighbouring section's colour into it.
 */
export function Scallop({
  color,
  at = "top",
}: {
  /** the colour of the section on the other side of the edge */
  color: string;
  at?: "top" | "bottom";
}) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-x-0 z-10 h-4",
        at === "top" ? "top-0" : "bottom-0",
      )}
      style={{
        backgroundImage: `radial-gradient(circle at 16px ${at === "top" ? "0" : "100%"}, ${color} 11px, transparent 12px)`,
        backgroundSize: "32px 16px",
        backgroundRepeat: "repeat-x",
      }}
    />
  );
}

const CONFETTI = ["#D2402A", "#CDBEF7", "#8FD9B6", "#FFD6A5", "#F6C1D0", "#BFDDFB", "#FF9A5C"];

/** One burst of paper confetti from the centre of its parent. */
export function Confetti({ count = 28, spread = 260 }: { count?: number; spread?: number }) {
  return (
    <span aria-hidden className="confetti pointer-events-none absolute inset-0 z-20">
      {Array.from({ length: count }, (_, i) => {
        const a = (i / count) * Math.PI * 2 + (i % 3) * 0.4;
        const d = spread * (0.45 + ((i * 37) % 55) / 100);
        return (
          <i
            key={i}
            style={
              {
                background: CONFETTI[i % CONFETTI.length],
                borderRadius: i % 3 === 0 ? "50%" : i % 3 === 1 ? "2px" : "0 60% 0 60%",
                "--cx": `${Math.cos(a) * d}px`,
                "--cy": `${Math.sin(a) * d - 60}px`,
                "--cr": `${(i % 2 ? 1 : -1) * (180 + i * 22)}deg`,
                animationDelay: `${(i % 6) * 0.03}s`,
              } as CSSProperties
            }
          />
        );
      })}
    </span>
  );
}

/** Four-point sparkle, as on the Invytt wordmark. */
export function Spark({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} style={style}>
      <path
        d="M12 0c.9 6.6 4.5 10.2 12 12-7.5 1.800-11.1 5.4-12 12-.9-6.600-4.500-10.200-12-12 7.500-1.800 11.100-5.400 12-12Z"
        fill="currentColor"
      />
    </svg>
  );
}
