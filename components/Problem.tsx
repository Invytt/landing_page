"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  CalendarDays,
  FileSpreadsheet,
  ClipboardList,
  Images,
  IndianRupee,
  MessagesSquare,
  NotebookPen,
  Palette,
  PhoneCall,
  AlarmClock,
  type LucideIcon,
} from "lucide-react";
import { TOOLS } from "@/app/data";
import { Confetti, Stamp, Words, useCalm, useRange } from "@/components/ui/kit";
import { Parallax } from "@/components/ui/depth";


const ICONS: LucideIcon[] = [
  MessagesSquare,
  FileSpreadsheet,
  IndianRupee,
  NotebookPen,
  CalendarDays,
  Palette,
  ClipboardList,
  PhoneCall,
  AlarmClock,
  Images,
];
const TINTS = ["#CDBEF7", "#8FD9B6", "#FFD6A5", "#F6C1D0", "#BFDDFB", "#FF9A5C", "#fff", "#CDBEF7", "#8FD9B6", "#FFD6A5"];

// Where each tool starts, as a share of the stage: container-query units,
// so the layout always fits between the headline above and the copy below.
type Spot = { x: number; y: number; r: number };

// Wide screens: an orbit around the count.
const ORBIT: Spot[] = TOOLS.map((_, i) => {
  const a = (i / TOOLS.length) * Math.PI * 2 - Math.PI / 2;
  const wob = i % 2 ? 1 : 0.78;
  return {
    x: Math.cos(a) * 31 * wob,
    y: Math.sin(a) * 40 * wob,
    r: (i % 2 ? 1 : -1) * (5 + (i % 4) * 3),
  };
});

// Phones: two columns either side of the count, so no chip covers another.
const ZIGZAG: Spot[] = TOOLS.map((_, i) => ({
  x: i % 2 ? 25 : -25,
  y: -42 + (i / (TOOLS.length - 1)) * 84,
  r: (i % 2 ? 1 : -1) * (3 + (i % 3) * 2),
}));

function ToolChip({ i, p, s }: { i: number; p: MotionValue<number>; s: Spot }) {
  const Icon = ICONS[i];
  const start = 0.08 + i * 0.022;
  const end = 0.56 + i * 0.012;
  const x = useTransform(p, [start, end], [`${s.x}cqw`, "0cqw"]);
  const y = useTransform(p, [start, end], [`${s.y}cqh`, "0cqh"]);
  const rotate = useTransform(p, [start, end], [s.r, s.r * -6]);
  const scale = useTransform(p, [start, end - 0.08, end], [1, 0.8, 0.2]);
  const opacity = useRange(p, [end - 0.07, end], [1, 0]);
  return (
    <motion.li
      className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 list-none"
      style={{ x, y, rotate, scale, opacity }}
    >
      <span
        className="lit bob stk-sm flex items-center gap-2 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium text-ink sm:px-4 sm:py-2 sm:text-base"
        style={{ background: TINTS[i], ["--bob" as string]: `${3.6 + (i % 4) * 0.5}s` }}
      >
        <Icon size={17} strokeWidth={2.4} />
        {TOOLS[i]}
      </span>
    </motion.li>
  );
}

function InviteCard() {
  return (
    <div className="stk-lg relative w-[min(86vw,380px)] rounded-[28px] bg-white p-6 text-center">
      <Image src="/wordmark-ink.webp" alt="Invytt" width={128} height={55} className="mx-auto h-auto w-32" />
      <p className="display mt-3 text-4xl text-ink">
        One app for the <em>whole party</em>
      </p>
      <div className="tear-x my-4" />
      <p className="flex flex-wrap justify-center gap-1.5 text-xs font-medium">
        {["Invites", "RSVPs", "Supplies", "Vendors", "Splits"].map((t) => (
          <span key={t} className="rounded-full border-2 border-ink bg-tint px-2.5 py-1">
            {t}
          </span>
        ))}
      </p>
    </div>
  );
}

export default function Problem() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useCalm();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [count, setCount] = useState(TOOLS.length);
  const [stamped, setStamped] = useState(false);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    const q = window.matchMedia("(max-width: 767px)");
    setNarrow(q.matches);
    const on = () => setNarrow(q.matches);
    q.addEventListener?.("change", on);
    return () => q.removeEventListener?.("change", on);
  }, []);

  useMotionValueEvent(p, "change", (v) => {
    const t = Math.min(1, Math.max(0, (v - 0.1) / 0.55));
    setCount(Math.max(1, Math.round(TOOLS.length - t * (TOOLS.length - 1))));
    setStamped(v > 0.78);
  });

  const cardScale = useTransform(p, [0.56, 0.74], [0, 1]);
  const cardRotate = useTransform(p, [0.56, 0.74], [-24, -3]);
  const cardOpacity = useRange(p, [0.56, 0.62], [0, 1]);
  const ringScale = useTransform(p, [0, 0.6], [1, 0.25]);
  const ringOpacity = useRange(p, [0.05, 0.55], [0.5, 0]);
  const countOpacity = useRange(p, [0.5, 0.58], [1, 0]);

  const heading = (
    <div className="mx-auto max-w-4xl px-5 text-center">
      <h2 className="display text-[clamp(2.3rem,5.6vw,4.6rem)] text-ink lg:short:text-5xl">
        <Words text="Planning a party means juggling ten apps." />
      </h2>
    </div>
  );
  const body = (
    <p className="mx-auto max-w-2xl px-5 text-center text-lg leading-relaxed text-muted">
      Planning an event means juggling ten different tools that don&rsquo;t talk
      to each other and the host ends up doing the most work and enjoying it the
      least. <strong className="font-medium text-ink">Invytt replaces all of it.</strong>
    </p>
  );

  // Calm version: no pinning, nothing flies.
  if (reduce) {
    return (
      <section id="problem" ref={ref} className="lit dots relative bg-paper py-24">
        {heading}
        <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-2.5 px-5">
          {TOOLS.map((t, i) => (
            <li key={t} className="lit stk-sm rounded-full px-4 py-2 text-sm font-medium" style={{ background: TINTS[i] }}>
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-12 flex justify-center">
          <InviteCard />
        </div>
        <div className="mt-10">{body}</div>
      </section>
    );
  }

  return (
    <section id="problem" ref={ref} className="lit relative h-[230vh] bg-paper">
      <div className="dots sticky top-0 isolate flex h-[100svh] flex-col items-center justify-between overflow-hidden pb-10 pt-28 sm:pt-32">
        <Parallax progress={p} speed={0.12}>{heading}</Parallax>

        <div className="relative my-6 w-full flex-1 [container-type:size]">
          {/* orbit ring */}
          <motion.span
            aria-hidden
            style={{ scale: ringScale, opacity: ringOpacity }}
            className="absolute left-1/2 top-1/2 hidden h-[80cqh] w-[62cqw] -translate-x-1/2 -translate-y-1/2 rounded-[50%] border-2 border-dashed border-ink/40 md:block"
          />
          <ul aria-label="The tools a host juggles today">
            {TOOLS.map((t, i) => (
              // keyed by layout too, so a rotated phone re-seats every chip
              <ToolChip key={`${t}-${narrow}`} i={i} p={p} s={(narrow ? ZIGZAG : ORBIT)[i]} />
            ))}
          </ul>

          {/* the count in the middle */}
          <motion.p
            aria-hidden
            style={{ opacity: countOpacity }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
          >
            <span className="display block text-[clamp(3.5rem,12vw,8rem)] leading-none text-coral tabular-nums lg:shorter:text-7xl">
              {count}
            </span>
            <span className="eyebrow text-muted">{count === 1 ? "app" : "tools"}</span>
          </motion.p>

          {/* everything lands as one invite */}
          <motion.div
            style={{ scale: cardScale, rotate: cardRotate, opacity: cardOpacity }}
            className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
          >
            <div className="relative short:scale-[0.82] shorter:scale-[0.7]">
              <InviteCard />
              {stamped && (
                <>
                  <motion.span
                    initial={{ scale: 2.6, opacity: 0, rotate: 18 }}
                    animate={{ scale: 1, opacity: 1, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 420, damping: 18 }}
                    className="absolute -right-5 -top-5 z-30"
                  >
                    <Stamp className="bg-paper !text-sm" rotate={0}>
                      All in one
                    </Stamp>
                  </motion.span>
                  <Confetti />
                </>
              )}
            </div>
          </motion.div>
        </div>

        <Parallax progress={p} speed={-0.08}>{body}</Parallax>
      </div>
    </section>
  );
}
