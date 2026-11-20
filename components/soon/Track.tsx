"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, type MotionValue } from "motion/react";
import { Check } from "lucide-react";
import { SOON, type SoonFeature } from "@/app/data";
import { Eyebrow, Reveal, Words, useCalm } from "@/components/ui/kit";
import { DepthField } from "@/components/ui/depth";
import { Phone } from "@/components/ui/phone";
import { SOON_SCREENS } from "@/components/screens/soon";

const CARD = 600; // width of one card on the track, px
const GAP = 80;

function FeatureText({ f, i }: { f: SoonFeature; i: number }) {
  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="display text-6xl leading-none text-coral">{String(i + 1).padStart(2, "0")}</span>
        <span className="rounded-full border-2 border-ink bg-white px-3 py-1 text-xs font-bold uppercase tracking-[0.14em]">
          {f.group}
        </span>
      </div>
      <h3 className="display mt-4 text-[clamp(2.2rem,3.4vw,3.2rem)] text-ink">{f.title}</h3>
      <p className="mt-3 text-lg leading-relaxed text-muted">{f.line}</p>
      <ul className="mt-5 space-y-2">
        {f.points.map((p) => (
          <li key={p} className="flex items-start gap-2.5 text-base font-semibold text-ink">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-ink" style={{ background: f.tint }}>
              <Check size={11} strokeWidth={3.6} />
            </span>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}

/** One card riding the track; its phone turns to face you as it passes centre. */
function TrackCard({
  f,
  i,
  x,
  vw,
  pad,
}: {
  f: SoonFeature;
  i: number;
  x: MotionValue<number>;
  vw: number;
  pad: number;
}) {
  const centre = pad + i * (CARD + GAP) + CARD / 2;
  const off = useTransform(x, (v) => (centre + v - vw / 2) / Math.max(1, vw));
  const ry = useTransform(off, (o) => Math.max(-55, Math.min(55, -o * 70)));
  const rx = useTransform(off, (o) => Math.min(12, Math.abs(o) * 10));
  const lift = useTransform(off, (o) => Math.min(24, Math.abs(o) * 30));
  return (
    <article className="relative flex shrink-0 items-center gap-8" style={{ width: CARD }}>
      <motion.div style={{ y: lift }} className="relative">
        <Phone label={`${f.title} in the Invytt app`} className="[--ps:0.76] short:[--ps:0.66]" ry={ry} rx={rx} plate={f.tint}>
          {SOON_SCREENS[f.screen]}
        </Phone>
      </motion.div>
      <div className="min-w-0 flex-1">
        <FeatureText f={f} i={i} />
      </div>
    </article>
  );
}

export default function Track() {
  const wrap = useRef<HTMLDivElement>(null);
  const calm = useCalm();
  const [dims, setDims] = useState({ vw: 1440, dist: 0, pad: 0 });
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start start", "end end"] });

  // The distance is worked out from the layout itself (fixed card width and
  // gap), not measured, so the last card always arrives at the centre.
  useEffect(() => {
    const measure = () => {
      const vw = window.innerWidth;
      const pad = Math.max(32, (vw - 1280) / 2 + 32);
      const lastCentre = pad + (SOON.length - 1) * (CARD + GAP) + CARD / 2;
      setDims({ vw, pad, dist: Math.max(0, lastCentre - vw / 2) });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const raw = useTransform(scrollYProgress, [0.03, 0.9], [0, -dims.dist], { clamp: true });
  const x = useSpring(raw, { stiffness: 120, damping: 26, mass: 0.4 });
  const bar = useTransform(scrollYProgress, [0.03, 0.9], ["0%", "100%"]);

  const header = (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <Eyebrow>On the way</Eyebrow>
      <h2 className="display mt-4 max-w-3xl text-[clamp(2.4rem,5vw,4.4rem)] text-ink">
        <Words text={`${SOON.length} things, *built and waiting.*`} />
      </h2>
    </div>
  );

  return (
    <section id="on-the-way" className="relative isolate bg-paper2">
      {/* desktop: the cards ride sideways as you scroll down */}
      <div ref={wrap} className={calm ? "hidden" : "relative hidden lg:block"} style={{ height: `${SOON.length * 70 + 80}vh` }}>
        <div className="sticky top-0 isolate flex h-screen flex-col justify-center overflow-hidden pt-20">
          <DepthField seed={109} count={10} progress={scrollYProgress} />
          {header}
          <motion.div
            style={{ x, paddingLeft: dims.pad, paddingRight: dims.pad, gap: GAP }}
            className="mt-6 flex w-max items-center short:mt-2"
          >
            {SOON.map((f, i) => (
              <TrackCard key={f.id} f={f} i={i} x={x} vw={dims.vw} pad={dims.pad} />
            ))}
          </motion.div>
          <div className="mx-auto mt-6 flex w-full max-w-7xl items-center gap-4 px-8 short:mt-2">
            <span className="text-sm font-bold text-muted">01</span>
            <span className="relative h-[8px] flex-1 overflow-hidden rounded-full border-2 border-ink bg-white">
              <motion.i className="absolute inset-y-0 left-0 bg-coral" style={{ width: bar }} />
            </span>
            <span className="text-sm font-bold text-muted">{String(SOON.length).padStart(2, "0")}</span>
          </div>
        </div>
      </div>

      {/* phones, tablets and reduced motion: one after another */}
      <div className={calm ? "py-20" : "py-20 lg:hidden"}>
        {header}
        <div className="mx-auto mt-12 max-w-3xl space-y-16 px-5 sm:px-8">
          {SOON.map((f, i) => (
            <Reveal key={f.id}>
              <article className="grid items-center gap-8 sm:grid-cols-[auto_1fr]">
                <div className="relative mx-auto w-max">
                  <Phone label={`${f.title} in the Invytt app`} className="[--ps:0.72]" plate={f.tint} sway>
                    {SOON_SCREENS[f.screen]}
                  </Phone>
                </div>
                <FeatureText f={f} i={i} />
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
