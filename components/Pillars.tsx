"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { PILLARS, type Pillar } from "@/app/data";
import { Reveal, Stamp, Words, useCalm } from "@/components/ui/kit";
import { Phone } from "@/components/ui/phone";
import { Parallax } from "@/components/ui/depth";
import { useMedia, WIDE_QUERY } from "@/lib/perf";

import {
  InventoryScreen,
  PlanningScreen,
  RsvpScreen,
  TemplatesScreen,
  VendorsScreen,
} from "@/components/screens";

const SCREENS: Record<Pillar["screen"], ReactNode> = {
  rsvp: <RsvpScreen />,
  inventory: <InventoryScreen />,
  templates: <TemplatesScreen />,
  vendors: <VendorsScreen />,
  planning: <PlanningScreen />,
};

const N = PILLARS.length;
/** Half-width, in pillar units, of the hand-off between two pillars. */
const TURN = 0.2;

function PillarCard({ p, className }: { p: Pillar; className?: string }) {
  return (
    <article
      className={`lit stk-lg relative flex flex-col rounded-[30px] p-7 text-ink sm:p-9 lg:short:p-7 ${className ?? ""}`}
      style={{ background: p.tint }}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="display text-6xl leading-none sm:text-7xl lg:short:text-6xl">{p.n}</span>
        {p.soon ? (
          <a href="/coming-soon" className="inline-flex min-h-11 items-center transition-transform hover:scale-105" aria-label="Coming soon: see what's on the way">
            <Stamp className="bg-white/60" rotate={6}>
              Coming soon
            </Stamp>
          </a>
        ) : null}
      </div>
      <h3 className="display mt-6 text-[clamp(1.6rem,2.2vw,2.25rem)] lg:short:mt-4 lg:short:text-[1.9rem]">{p.title}</h3>
      <p className="mt-4 text-lg leading-relaxed text-ink/80 lg:short:mt-3 lg:short:text-base">{p.body}</p>
    </article>
  );
}

/** One card of the deck: waits behind, comes forward, then is dealt away. */
function DeckCard({ i, progress }: { i: number; progress: MotionValue<number> }) {
  const p = PILLARS[i];
  const d = useTransform(progress, (v) => v * N - i);
  const out = (v: number) => (i === N - 1 ? 0 : Math.min(1, Math.max(0, (v - (1 - TURN)) / (TURN * 1.6))));
  const behind = (v: number) => Math.min(3, Math.max(0, -v));
  const x = useTransform(d, (v) => `${-out(v) * 115}%`);
  const y = useTransform(d, (v) => behind(v) * 15 - out(v) * 60);
  const rotate = useTransform(d, (v) => behind(v) * (i % 2 ? 2.2 : -2.2) - out(v) * 16);
  const rotateY = useTransform(d, (v) => out(v) * 55);
  const scale = useTransform(d, (v) => 1 - behind(v) * 0.055);
  const opacity = useTransform(d, (v) => (behind(v) > 2.4 ? 0 : 1 - out(v)));
  return (
    <motion.div
      className="absolute inset-0"
      style={{ x, y, rotate, rotateY, scale, opacity, zIndex: N - i, transformPerspective: 1400 }}
    >
      <PillarCard p={p} className="h-full" />
    </motion.div>
  );
}

export default function Pillars() {
  const ref = useRef<HTMLDivElement>(null);
  const calm = useCalm();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  // Build only the layout that fits the screen. Until mounted both are in
  // the HTML (the server cannot know the screen), then the other one goes.
  const wide = useMedia(WIDE_QUERY);
  const desk = !calm && wide !== false;
  const mob = calm || wide !== true;


  // The phone makes one full turn at each hand-off; the screen swaps while
  // its back faces the visitor.
  const turnsRaw = useTransform(scrollYProgress, (v) => {
    const u = v * N;
    const k = Math.round(u);
    if (k <= 0 || k >= N) return Math.min(N - 1, Math.max(0, Math.floor(u))) * 360;
    const t = Math.min(1, Math.max(0, (u - (k - TURN)) / (TURN * 2)));
    const e = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    return (k - 1 + e) * 360;
  });
  const rotateY = useSpring(turnsRaw, { stiffness: 120, damping: 22, mass: 0.6 });
  useMotionValueEvent(rotateY, "change", (r) => {
    setActive(Math.min(N - 1, Math.max(0, Math.floor((r + 180) / 360))));
  });
  const blob = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const blobY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const fill = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const header = (
    <>
      <h2 className="display text-[clamp(2.4rem,5vw,4.4rem)] text-ink lg:short:text-5xl lg:shorter:text-4xl">
        <Words text="Five things every host has to handle." />
      </h2>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted lg:short:mt-3 lg:short:text-base">
        Every part of hosting, from deciding to throw something to the last
        guest leaving, in one app on your phone.
      </p>
    </>
  );

  return (
    <section id="features" className="lit relative bg-paper2">
      {/* ── desktop: pinned deck + turning phone ── */}
      <div ref={ref} className={calm ? "hidden" : "relative hidden h-[560vh] lg:block"}>
        {desk && (
        <div className="sticky top-0 isolate flex h-screen items-center overflow-hidden pt-24 shorter:pt-0">
          <div className="mx-auto grid w-full max-w-7xl grid-cols-[1.1fr_1fr] items-center gap-10 px-8">
            <div>
              {header}
              <div className="relative mt-9 h-[370px] max-w-[540px] short:mt-6 short:h-[300px]">
                {PILLARS.map((_, i) => (
                  <DeckCard key={i} i={i} progress={scrollYProgress} />
                ))}
              </div>
              {/* progress: five numbered stops */}
              <div className="mt-[70px] flex max-w-[540px] items-center gap-3 short:mt-16">
                {PILLARS.map((p, i) => (
                  <span
                    key={p.n}
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-ink text-sm font-medium transition-all duration-300 ${
                      i === active
                        ? "scale-110 bg-coral text-white"
                        : i < active
                          ? "bg-ink text-paper"
                          : "bg-white text-ink"
                    }`}
                  >
                    {i + 1}
                  </span>
                ))}
                <span className="relative ml-1 h-[6px] flex-1 overflow-hidden rounded-full border-2 border-ink bg-white">
                  <motion.i className="absolute inset-y-0 left-0 bg-coral" style={{ width: fill }} />
                </span>
              </div>
            </div>

            <div className="relative flex items-center justify-center" style={{ perspective: 1600 }}>
              <motion.span
                aria-hidden
                style={{ rotate: blob, y: blobY, background: PILLARS[active].tint }}
                className="absolute h-[440px] w-[440px] rounded-[42%_58%_55%_45%/48%_42%_58%_52%] border-2 border-ink transition-colors duration-500 short:h-[360px] short:w-[360px]"
              />
              <motion.div style={{ y: phoneY }}>
              <Phone
                label={`${PILLARS[active].title} in the Invytt app`}
                className="[--ps:0.96] short:[--ps:0.8] shorter:[--ps:0.7]"
                ry={rotateY}
              >
                {PILLARS.map((p, i) => (
                  <div
                    key={p.n}
                    className="absolute inset-0"
                    style={{ visibility: i === active ? "visible" : "hidden" }}
                  >
                    {SCREENS[p.screen]}
                  </div>
                ))}
              </Phone>
              </motion.div>
            </div>
          </div>
        </div>
        )}
      </div>

      {/* ── phones and tablets (and reduced motion): swipe through the five ── */}
      {mob && (
      <div className={calm ? "py-20" : "py-20 lg:hidden"}>
        <Parallax speed={0.08} className="mx-auto max-w-7xl px-5 sm:px-8">{header}</Parallax>
        <div
          aria-label="The five pillars"
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-8 sm:px-8"
        >
          {PILLARS.map((p, i) => (
            <Reveal key={p.n} delay={i * 0.05} className="w-[84vw] max-w-[400px] shrink-0 snap-center">
              <PillarCard p={p} />
              <div className="-mt-6 flex justify-center">
                <Phone label={`${p.title} in the Invytt app`} className="[--ps:0.8]" sway>
                  {SCREENS[p.screen]}
                </Phone>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="px-5 text-center text-sm font-medium text-muted sm:px-8">Swipe to see all five</p>
      </div>
      )}
    </section>
  );
}
