"use client";

import { useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  ArrowLeftRight,
  Check,
  Lightbulb,
  PartyPopper,
  Sparkles,
  Store,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Magnetic, Reveal, Scallop, Words, useCalm } from "@/components/ui/kit";
import { DepthField, Parallax } from "@/components/ui/depth";
import { Phone } from "@/components/ui/phone";
import { AgencyScreen } from "@/components/screens/soon";
import AgencyBlueprint from "./AgencyBlueprint";

/* Invytt Agency gets a chapter of its own: the blueprint that builds itself,
   the four stages stacking up, an example of the day it runs, and a slider
   comparing doing it yourself with handing it over. */

const STAGES: { title: string; line: string; tint: string; Icon: LucideIcon }[] = [
  { title: "Concept", line: "The idea, the feel and the plan for the day.", tint: "#FFD6A5", Icon: Lightbulb },
  { title: "Vendors", line: "The people who make it happen, found and booked.", tint: "#BFDDFB", Icon: Store },
  { title: "Decor", line: "The look of the room, from the entrance in.", tint: "#F6C1D0", Icon: PartyPopper },
  { title: "Coordination", line: "Someone running the day, so you don't have to.", tint: "#8FD9B6", Icon: Users },
];

/* ── 1. the four stages, stacking ─────────────────────────────────────── */

function StackCard({
  s,
  i,
  progress,
  calm,
}: {
  s: (typeof STAGES)[number];
  i: number;
  progress: MotionValue<number>;
  calm: boolean;
}) {
  const n = STAGES.length;
  const start = i / n;
  const scale = useTransform(progress, [start, 1], [1, 1 - (n - 1 - i) * 0.05]);
  const rotate = useTransform(progress, [start, 1], [0, (i % 2 ? 1 : -1) * (n - 1 - i) * 1.4]);
  return (
    // each card stops a title-row lower than the last, so every title stays readable
    <div className="sticky" style={{ top: `calc(7.5rem + ${i * 96}px)` }}>
      <motion.article
        style={calm ? undefined : { scale, rotate }}
        className="stk-lg relative mb-8 min-h-[250px] origin-top rounded-[30px] p-6 text-ink sm:p-7"
      >
        <span aria-hidden className="absolute inset-0 -z-10 rounded-[28px]" style={{ background: s.tint }} />
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-white ">
            <s.Icon size={22} strokeWidth={2.2} />
          </span>
          <h3 className="display flex-1 text-4xl sm:text-5xl">{s.title}</h3>
          <span className="display text-5xl leading-none text-ink/30">0{i + 1}</span>
        </div>
        <p className="mt-8 max-w-md text-lg leading-snug text-ink/80">{s.line}</p>
      </motion.article>
    </div>
  );
}

/* ── 2. an example day, on a clock ─────────────────────────────────────── */

const DAY = [
  { t: "2:00 PM", h: 14, w: "Decor goes up", c: "#F6C1D0" },
  { t: "5:00 PM", h: 17, w: "Vendors set up", c: "#BFDDFB" },
  { t: "7:30 PM", h: 19.5, w: "Doors open", c: "#FFD6A5" },
  { t: "9:00 PM", h: 21, w: "Toasts and cake", c: "#FF9A5C" },
  { t: "11:30 PM", h: 23.5, w: "Wind-down and wrap-up", c: "#8FD9B6" },
];

function Clock({ hours }: { hours: MotionValue<number> }) {
  const hourDeg = useTransform(hours, (h) => (h % 12) * 30);
  const minDeg = useTransform(hours, (h) => (h % 1) * 360);
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[380px]">
      <div className="absolute inset-0 rounded-full border-2 border-ink bg-paper " />
      <div className="absolute inset-[14px] rounded-full border-2 border-dashed border-ink/25" />
      {Array.from({ length: 12 }, (_, k) => (
        <span
          key={k}
          className="absolute left-1/2 top-1/2 block h-[44%] w-[3px] origin-bottom -translate-x-1/2"
          style={{ transform: `translate(-50%, -100%) rotate(${k * 30}deg)` }}
        >
          <i className={`block w-full rounded-full bg-ink ${k % 3 === 0 ? "h-5" : "h-2.5"}`} />
        </span>
      ))}
      {DAY.map((d) => (
        <span
          key={d.t}
          className="absolute left-1/2 top-1/2 block h-[38%] w-0 origin-bottom"
          style={{ transform: `translate(-50%, -100%) rotate(${(d.h % 12) * 30}deg)` }}
        >
          <i className="absolute -left-2.5 top-0 block h-5 w-5 rounded-full border-2 border-ink" style={{ background: d.c }} />
        </span>
      ))}
      <motion.span
        className="absolute left-1/2 top-1/2 block h-[26%] w-[8px] origin-bottom rounded-full bg-ink"
        style={{ x: "-50%", y: "-100%", rotate: hourDeg }}
      />
      <motion.span
        className="absolute left-1/2 top-1/2 block h-[38%] w-[4px] origin-bottom rounded-full bg-coral"
        style={{ x: "-50%", y: "-100%", rotate: minDeg }}
      />
      <span className="absolute left-1/2 top-1/2 block h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-coral" />
    </div>
  );
}

function TheDay({ calm }: { calm: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 60%"] });
  const p = useSpring(scrollYProgress, { stiffness: 90, damping: 22 });
  const hours = useTransform(p, [0, 1], [13, 24]);
  const fill = useTransform(p, [0, 1], ["0%", "100%"]);
  const [now, setNow] = useState(13);
  useMotionValueEvent(hours, "change", setNow);
  const reached = (h: number) => calm || now >= h - 0.15;

  return (
    <div ref={ref} className="mx-auto mt-28 grid max-w-6xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-2">
      <div className="lg:sticky lg:top-32">
        <Reveal>
          <p className="eyebrow text-peach">An example day</p>
          <h3 className="display mt-4 text-[clamp(2.2rem,4.4vw,3.8rem)]">
            You get ready. <em className="text-peach">We run the clock.</em>
          </h3>
          <p className="mt-4 max-w-md text-lg leading-relaxed text-nightmuted">
            Coordination means someone else watches the time. Here&rsquo;s how
            an evening might run. Scroll and the clock moves with it.
          </p>
        </Reveal>
        <div className="mt-10 hidden lg:block">
          <Clock hours={hours} />
        </div>
      </div>
      <ol className="relative space-y-5 pl-10">
        <span aria-hidden className="absolute bottom-3 left-[15px] top-3 w-[3px] rounded-full bg-paper/15" />
        <motion.span aria-hidden className="absolute left-[15px] top-3 w-[3px] rounded-full bg-peach" style={{ height: calm ? "100%" : fill }} />
        {DAY.map((d) => {
          const on = reached(d.h);
          return (
            <li key={d.t} className="relative">
              <span
                className={`absolute -left-10 top-5 flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink transition-colors duration-300 ${on ? "" : "bg-night2"}`}
                style={on ? { background: d.c } : undefined}
              >
                {on && <Check size={14} strokeWidth={3.6} className="text-ink" />}
              </span>
              <motion.div
                animate={{ x: on ? 0 : 12, opacity: on ? 1 : 0.45 }}
                transition={{ type: "spring", stiffness: 240, damping: 22 }}
                className="rounded-[22px] border-2 border-ink bg-paper p-5 text-ink"
              >
                <p className="eyebrow text-muted">{d.t}</p>
                <p className="display mt-1 text-3xl">{d.w}</p>
              </motion.div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ── 3. drag to compare ────────────────────────────────────────────────── */

const DIY = [
  { t: "Call six caterers", r: -6 },
  { t: "Chase the decorator", r: 4 },
  { t: "Who's bringing chairs?", r: -3 },
  { t: "Where's the cake??", r: 7 },
  { t: "Reply to 40 messages", r: -8 },
  { t: "Fix the playlist", r: 3 },
];

function Compare() {
  const [pos, setPos] = useState(52);
  const box = useRef<HTMLDivElement>(null);
  const drag = (clientX: number) => {
    const r = box.current?.getBoundingClientRect();
    if (!r) return;
    setPos(Math.max(4, Math.min(96, ((clientX - r.left) / r.width) * 100)));
  };
  return (
    <div className="mx-auto mt-28 max-w-6xl px-5 sm:px-8">
      <Reveal className="text-center">
        <p className="eyebrow hidden text-peach sm:block">Drag to compare</p>
        <h3 className="display mt-4 text-[clamp(2.2rem,4.4vw,3.8rem)]">
          The same party, <em className="text-peach">two ways.</em>
        </h3>
      </Reveal>
      <div
        ref={box}
        className="relative mt-10 hidden h-[420px] touch-pan-y select-none overflow-hidden rounded-[30px] border-2 border-ink sm:block"
        onPointerDown={(e) => {
          (e.target as Element).setPointerCapture?.(e.pointerId);
          drag(e.clientX);
        }}
        onPointerMove={(e) => {
          if (e.buttons) drag(e.clientX);
        }}
        data-cursor="Drag"
      >
        {/* doing it yourself */}
        <div className="dots absolute inset-0 bg-paper2 p-6 text-ink sm:p-8">
          <p className="eyebrow text-coral">Doing it yourself</p>
          {/* laid out inside the left half, so at rest none is cut by the divide */}
          <div className="relative mt-4 h-[320px]">
            {DIY.map((d, k) => (
              <span
                key={d.t}
                className="wiggle stk-sm absolute left-[var(--ld)] top-[var(--td)] max-w-[21%] rounded-xl px-3.5 py-2.5 text-base font-bold leading-snug"
                style={
                  {
                    "--ld": `${k % 2 ? 24 : 1}%`,
                    "--td": `${Math.floor(k / 2) * 34 + (k % 2) * 10}%`,
                    background: ["#FFD6A5", "#F6C1D0", "#fff", "#BFDDFB"][k % 4],
                    rotate: `${d.r}deg`,
                    animationDuration: `${2 + k * 0.3}s`,
                  } as React.CSSProperties
                }
              >
                {d.t}
              </span>
            ))}
          </div>
        </div>
        {/* with Invytt Agency */}
        <div
          className="absolute inset-0 bg-mint p-6 text-ink sm:p-8"
          style={{ clipPath: `inset(0 0 0 ${pos}%)` }}
        >
          <div className="ml-auto max-w-sm text-right">
            <p className="eyebrow text-goingtext">With Invytt Agency</p>
            <ul className="mt-5 space-y-2.5">
              {STAGES.map((s) => (
                <li key={s.title} className="flex items-center justify-end gap-3 text-lg font-bold">
                  {s.title}
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-ink bg-white">
                    <Check size={14} strokeWidth={3.6} />
                  </span>
                </li>
              ))}
            </ul>
            <p className="display mt-8 text-4xl">You enjoy the party.</p>
          </div>
        </div>
        {/* handle */}
        <div className="pointer-events-none absolute inset-y-0" style={{ left: `${pos}%` }}>
          <span className="absolute inset-y-0 -left-[1.5px] w-[3px] bg-ink" />
          <span className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-ink bg-coral text-white ">
            <ArrowLeftRight size={22} strokeWidth={2.6} />
          </span>
        </div>
        {/* keyboard and screen readers */}
        <label className="sr-only" htmlFor="agency-compare">
          Compare doing it yourself with Invytt Agency
        </label>
        <input
          id="agency-compare"
          type="range"
          min={4}
          max={96}
          value={Math.round(pos)}
          onChange={(e) => setPos(Number(e.target.value))}
          className="absolute inset-x-0 bottom-0 h-1 w-full opacity-0 focus-visible:opacity-100"
        />
      </div>

      {/* phones: the two sides stacked */}
      <div className="mt-8 space-y-5 sm:hidden">
        <div className="dots rounded-[26px] border-2 border-ink bg-paper2 p-5 text-ink ">
          <p className="eyebrow text-coral">Doing it yourself</p>
          <ul className="mt-4 flex flex-wrap gap-2.5">
            {DIY.map((d, k) => (
              <li
                key={d.t}
                className="wiggle stk-sm rounded-xl px-3 py-2 text-sm font-bold"
                style={{ background: ["#FFD6A5", "#F6C1D0", "#fff", "#BFDDFB"][k % 4], rotate: `${d.r / 2}deg`, animationDuration: `${2 + k * 0.3}s` }}
              >
                {d.t}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-[26px] border-2 border-ink bg-mint p-5 text-ink ">
          <p className="eyebrow text-goingtext">With Invytt Agency</p>
          <ul className="mt-4 space-y-2">
            {STAGES.map((st) => (
              <li key={st.title} className="flex items-center gap-3 text-lg font-bold">
                <span className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-ink bg-white">
                  <Check size={14} strokeWidth={3.6} />
                </span>
                {st.title}
              </li>
            ))}
          </ul>
          <p className="display mt-5 text-4xl">You enjoy the party.</p>
        </div>
      </div>
    </div>
  );
}

/* ── the chapter ───────────────────────────────────────────────────────── */

export default function Agency() {
  const list = useRef<HTMLDivElement>(null);
  const calm = useCalm();
  const { scrollYProgress } = useScroll({ target: list, offset: ["start 30%", "end end"] });

  return (
    <section id="agency" className="on-night dots-night relative isolate bg-night pb-28 pt-16 text-paper lg:pb-36">
      <Scallop color="var(--color-paper)" at="top" />

      {/* opening: the plan builds itself (desktop) */}
      <AgencyBlueprint calm={calm} />

      {/* opening for phones, tablets and reduced motion */}
      <div className={calm ? "px-5 pt-16 sm:px-8" : "px-5 pt-16 sm:px-8 lg:hidden"}>
        <p className="eyebrow flex items-center gap-3 text-peach">
          <span aria-hidden className="h-[2px] w-8 bg-current" /> Invytt Agency
        </p>
        <h2 className="display mt-4 text-[clamp(2.8rem,10vw,4.6rem)]">
          <Words text="Want it done for you? *We handle it all.*" />
        </h2>
        <p className="mt-5 max-w-lg text-lg leading-relaxed text-nightmuted">
          End-to-end event management by Invytt: concept, vendors, decor and
          coordination. For the days you&rsquo;d rather be a guest at your own
          party.
        </p>
      </div>

      {/* the four stages */}
      <div className="relative mx-auto mt-16 grid max-w-7xl gap-14 px-5 sm:px-8 lg:mt-0 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <DepthField seed={127} count={14} night />
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Parallax speed={0.08}>
            <p className="eyebrow text-peach">What it covers</p>
            <h3 className="display mt-4 text-[clamp(2.2rem,4.4vw,3.8rem)]">
              Four parts, <em className="text-peach">one team.</em>
            </h3>
          </Parallax>
          <div className="relative mt-10 w-max">
            <Phone label="Invytt Agency in the app" className="[--ps:0.66] short:[--ps:0.56]" plate="#FF9A5C" sway>
              <AgencyScreen />
            </Phone>
          </div>
        </div>
        <div ref={list} className="relative">
          {STAGES.map((s, i) => (
            <StackCard key={s.title} s={s} i={i} progress={scrollYProgress} calm={calm} />
          ))}
        </div>
      </div>

      <TheDay calm={calm} />
      <Compare />

      <Reveal className="mt-20 flex justify-center px-5">
        <Magnetic>
          <a href="#notify" className="stk-btn on-night bg-peach !px-7 text-ink">
            <Sparkles size={18} strokeWidth={2.6} /> Be first to hear about Agency
          </a>
        </Magnetic>
      </Reveal>

      <Scallop color="var(--color-paper2)" at="bottom" />
    </section>
  );
}
