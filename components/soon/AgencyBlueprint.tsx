"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Camera, ChefHat, Disc3, Flower2 } from "lucide-react";
import { Confetti, Stamp, useRange } from "@/components/ui/kit";
import { DepthField } from "@/components/ui/depth";
import { useMedia, WIDE_QUERY } from "@/lib/perf";

/* The opening of the Invytt Agency chapter. As you scroll, an event plan
   builds itself on a tilted 3D board: a concept mood board, the vendors,
   the decor, then the run of the day. Then the stamp lands. */

const PARTS = ["Concept", "Vendors", "Decor", "Coordination"] as const;
const SPAN = 1 / (PARTS.length + 1);

/** A piece of the board that flies in from far away and settles into its slot. */
function Piece({
  p,
  i,
  from,
  className,
  children,
}: {
  p: MotionValue<number>;
  i: number;
  from: { x: number; y: number; z: number; r: number };
  className: string;
  children: React.ReactNode;
}) {
  const a = SPAN * (i + 0.15);
  const b = SPAN * (i + 0.85);
  const x = useTransform(p, [a, b], [from.x, 0], { clamp: true });
  const y = useTransform(p, [a, b], [from.y, 0], { clamp: true });
  const z = useTransform(p, [a, b], [from.z, 0], { clamp: true });
  const rotate = useTransform(p, [a, b], [from.r, 0], { clamp: true });
  const opacity = useRange(p, [a, a + 0.04], [0, 1]);
  return (
    <motion.div className={`absolute ${className}`} style={{ x, y, z, rotate, opacity }}>
      {children}
    </motion.div>
  );
}

function MoodBoard() {
  return (
    <div className="stk h-full rounded-[18px] bg-paper p-3 text-ink">
      <p className="eyebrow !text-[10px] text-muted">Concept · mood board</p>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {["#FF9A5C", "#F6C1D0", "#FFD6A5", "#D2402A", "#CDBEF7", "#8FD9B6"].map((c, k) => (
          <span key={c} className="h-9 rounded-lg border-2 border-ink" style={{ background: c, rotate: `${(k % 3) - 1}deg` }} />
        ))}
      </div>
      <p className="display mt-2 text-xl leading-none">Marigold &amp; moonlight</p>
    </div>
  );
}

function VendorStack() {
  const v = [
    { I: ChefHat, t: "Caterer", c: "#FFD6A5" },
    { I: Camera, t: "Photographer", c: "#BFDDFB" },
    { I: Disc3, t: "DJ", c: "#CDBEF7" },
  ];
  return (
    <div className="relative h-full">
      {v.map(({ I, t, c }, k) => (
        <div
          key={t}
          className="stk-sm absolute inset-x-0 flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-bold text-ink"
          style={{ background: c, top: k * 40, rotate: `${(k - 1) * 3}deg` }}
        >
          <I size={16} strokeWidth={2.4} /> {t}
          <span className="ml-auto rounded-full border-2 border-ink bg-white px-2 text-[10px]">Booked</span>
        </div>
      ))}
    </div>
  );
}

function Bulb({ len, k, x }: { len: MotionValue<number>; k: number; x: number }) {
  const opacity = useTransform(len, [k / 7, k / 7 + 0.1], [0, 1]);
  return (
    <motion.circle
      cx={x}
      cy={k % 2 ? 40 : 28}
      r="6"
      fill={["#FFD6A5", "#FF9A5C", "#F6C1D0", "#8FD9B6"][k % 4]}
      stroke="#2B1719"
      strokeWidth="2"
      style={{ opacity }}
    />
  );
}

function DecorPiece({ p }: { p: MotionValue<number> }) {
  // the string of lights draws itself across the board
  const len = useTransform(p, [SPAN * 2.2, SPAN * 2.9], [0, 1], { clamp: true });
  return (
    <div className="relative h-full">
      <svg viewBox="0 0 300 70" className="absolute inset-x-0 top-0 h-[70px] w-full overflow-visible">
        <motion.path d="M4 8 Q75 64 150 22 T296 12" fill="none" stroke="#FBF6F4" strokeWidth="2.5" style={{ pathLength: len }} />
        {[30, 70, 110, 150, 190, 230, 270].map((x, k) => (
          <Bulb key={x} len={len} k={k} x={x} />
        ))}
      </svg>
      <div className="absolute bottom-0 left-2 flex items-end gap-2">
        {["#D2402A", "#FFD6A5", "#F6C1D0"].map((c, k) => (
          <span key={c} className="bob block rounded-full border-2 border-ink" style={{ width: 34 - k * 4, height: 42 - k * 5, background: c, ["--bob" as string]: `${2.6 + k * 0.5}s` }} />
        ))}
        <Flower2 size={34} strokeWidth={2} className="text-sand" />
      </div>
    </div>
  );
}

function RunOfDay() {
  const rows = [
    ["6:00 PM", "Decor up"],
    ["7:30 PM", "Doors open"],
    ["9:00 PM", "Toasts"],
  ];
  return (
    <div className="stk h-full rounded-[18px] bg-mint p-3 text-ink">
      <p className="eyebrow !text-[10px] text-ink/70">Coordination · the day</p>
      <div className="mt-2 space-y-1.5">
        {rows.map(([t, w]) => (
          <div key={t} className="flex items-center gap-2 rounded-xl border-2 border-ink bg-white px-2 py-1 text-xs font-bold">
            <span className="w-14 text-muted">{t}</span> {w}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AgencyBlueprint({ calm }: { calm: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 26, mass: 0.4 });
  const [step, setStep] = useState(0);
  const [started, setStarted] = useState(false);
  useMotionValueEvent(p, "change", (v) => {
    setStep(Math.min(PARTS.length, Math.floor(v / SPAN)));
    setStarted(v > SPAN * 0.15);
  });

  const tiltX = useTransform(p, [0, 1], [58, 22]);
  const tiltZ = useTransform(p, [0, 1], [-18, -6]);
  const boardScale = useTransform(p, [0, 0.15, 1], [0.8, 1, 1.04]);
  const glowScale = useTransform(p, [0, 1], [0.6, 1.3]);
  const done = step >= PARTS.length;
  // desktop only: on smaller screens the scene is never built
  const wide = useMedia(WIDE_QUERY);

  if (calm) return null;

  return (
    <div ref={ref} className="relative hidden h-[460vh] lg:block">
      {wide !== false && (
      <div className="sticky top-0 isolate grid h-screen grid-cols-[0.9fr_1.1fr] items-center overflow-hidden px-8 xl:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
        <DepthField seed={151} count={10} night progress={scrollYProgress} />
        <motion.span
          aria-hidden
          style={{ scale: glowScale }}
          className="pointer-events-none absolute right-[10%] top-[15%] -z-10 h-[70vh] w-[70vh] rounded-full opacity-40"
        >
          <span
            className="block h-full w-full rounded-full"
            style={{ background: "radial-gradient(circle, rgb(255 154 92 / 0.95) 0%, rgb(255 154 92 / 0.45) 30%, rgb(255 154 92 / 0.12) 55%, transparent 72%)" }}
          />
        </motion.span>

        {/* words */}
        <div className="relative z-10 pr-6">
          <p className="eyebrow flex items-center gap-3 text-peach">
            <span aria-hidden className="h-[2px] w-8 bg-current" /> Invytt Agency
          </p>
          <h2 className="display mt-5 text-[clamp(3rem,5.6vw,5.6rem)] text-paper">
            Want it done
            <br />
            <span className="italic text-peach">for you?</span>
          </h2>
          <div className="mt-8 h-[5.5rem]">
            <AnimatePresence mode="wait">
              <motion.p
                key={started ? step : -1}
                initial={{ y: 40, opacity: 0, rotateX: -60 }}
                animate={{ y: 0, opacity: 1, rotateX: 0 }}
                exit={{ y: -40, opacity: 0, rotateX: 60 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="display text-[clamp(2.4rem,4vw,4rem)] text-paper"
                style={{ transformPerspective: 600 }}
              >
                {done ? (
                  <>
                    We handle <em className="text-peach">it all.</em>
                  </>
                ) : !started ? (
                  "Scroll to build the plan"
                ) : (
                  <>
                    {PARTS[step]}
                    <span className="text-peach">.</span>
                  </>
                )}
              </motion.p>
            </AnimatePresence>
          </div>
          {/* chapter chips */}
          <ol className="mt-6 flex flex-wrap gap-2">
            {PARTS.map((t, i) => (
              <li
                key={t}
                className={`rounded-full border-2 border-ink px-3.5 py-1.5 text-sm font-bold transition-all duration-300 ${
                  i < step ? "bg-peach text-ink shadow-[3px_3px_0_#000]" : i === step ? "bg-paper text-ink shadow-[3px_3px_0_#000]" : "bg-night2 text-nightmuted"
                }`}
              >
                {String(i + 1).padStart(2, "0")} {t}
              </li>
            ))}
          </ol>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-nightmuted">
            End-to-end event management by Invytt: concept, vendors, decor and
            coordination. For the days you&rsquo;d rather be a guest at your own
            party.
          </p>
        </div>

        {/* the board */}
        <div className="relative h-[620px] short:h-[520px]" style={{ perspective: 1600 }}>
          <motion.div
            className="preserve-3d absolute left-1/2 top-1/2 h-[480px] w-[560px] -translate-x-1/2 -translate-y-1/2 short:h-[420px] short:w-[500px]"
            style={{ rotateX: tiltX, rotateZ: tiltZ, scale: boardScale }}
          >
            {/* the board itself: a blueprint sheet */}
            <div
              className="absolute inset-0 rounded-[26px] border-2 border-paper/40 bg-night2"
              style={{
                backgroundImage:
                  "linear-gradient(rgb(255 234 229 / 0.07) 1px, transparent 1px), linear-gradient(90deg, rgb(255 234 229 / 0.07) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
                boxShadow: "0 40px 80px rgb(0 0 0 / 0.55)",
              }}
            >
              <span className="absolute left-5 top-4 text-[11px] font-bold uppercase tracking-[0.2em] text-nightmuted">
                Event plan · example
              </span>
              {/* empty slots */}
              {["left-5 top-12 h-[150px] w-[230px]", "right-5 top-12 h-[150px] w-[260px]", "left-5 bottom-5 h-[150px] w-[290px]", "right-5 bottom-5 h-[150px] w-[200px]"].map((c, k) => (
                <span key={k} className={`absolute rounded-[18px] border-2 border-dashed border-paper/25 ${c}`} />
              ))}
            </div>

            <Piece p={p} i={0} from={{ x: -360, y: -240, z: 420, r: -30 }} className="left-5 top-12 h-[150px] w-[230px]">
              <MoodBoard />
            </Piece>
            <Piece p={p} i={1} from={{ x: 380, y: -200, z: 380, r: 24 }} className="right-5 top-12 h-[150px] w-[260px] pt-1">
              <VendorStack />
            </Piece>
            <Piece p={p} i={2} from={{ x: -320, y: 260, z: 360, r: 18 }} className="bottom-5 left-5 h-[150px] w-[290px]">
              <DecorPiece p={p} />
            </Piece>
            <Piece p={p} i={3} from={{ x: 340, y: 260, z: 420, r: -20 }} className="bottom-5 right-5 h-[150px] w-[200px]">
              <RunOfDay />
            </Piece>

            {done && (
              <motion.div
                initial={{ scale: 3, opacity: 0, rotate: 20, z: 200 }}
                animate={{ scale: 1, opacity: 1, rotate: -10, z: 60 }}
                transition={{ type: "spring", stiffness: 300, damping: 14 }}
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              >
                <Stamp color="var(--color-peach)" rotate={0} className="bg-night !px-6 !py-2.5 !text-2xl">
                  Handled
                </Stamp>
                <Confetti count={36} spread={300} />
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      )}
    </div>
  );
}
