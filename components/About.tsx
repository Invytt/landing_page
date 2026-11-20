"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { SPEAKERS, type Speaker } from "@/app/data";
import { Eyebrow, Words, useCalm } from "@/components/ui/kit";
import { DepthField, Parallax } from "@/components/ui/depth";


// Where each polaroid is pinned on the board (desktop), and how deep it sits.
const PINS = [
  { l: "1%", t: "5%", r: -8, depth: 40 },
  { l: "36%", t: "1%", r: 5, depth: 90 },
  { l: "69%", t: "7%", r: -4, depth: 25 },
  { l: "8%", t: "53%", r: 6, depth: 70 },
  { l: "40%", t: "51%", r: -6, depth: 20 },
  { l: "70%", t: "55%", r: 9, depth: 60 },
];
const TAPE = ["#FFD6A5", "#CDBEF7", "#8FD9B6", "#F6C1D0", "#BFDDFB", "#FF9A5C"];

function Polaroid({
  s,
  i,
  progress,
  board,
  calm,
  desk,
}: {
  s: Speaker;
  i: number;
  progress: MotionValue<number>;
  board: React.RefObject<HTMLDivElement | null>;
  calm: boolean;
  desk: boolean;
}) {
  const pin = PINS[i];
  // a gentler tilt on narrow screens, so no corner leaves the page
  const tilt = desk ? pin.r : pin.r * 0.3;
  // the drift is for the desktop board only; stacked on a phone it would push
  // neighbours into each other and open gaps between them
  const y = useTransform(progress, (v) => (desk ? pin.depth * (1 - 2 * v) : 0));
  return (
    <motion.figure
      drag={desk}
      dragConstraints={board}
      dragElastic={0.2}
      dragTransition={{ bounceStiffness: 300, bounceDamping: 18 }}
      whileDrag={{ scale: 1.08, rotate: 0, zIndex: 50, cursor: "grabbing" }}
      whileHover={{ scale: 1.04, rotate: tilt * 0.3 }}
      data-cursor={desk ? "Drag" : undefined}
      initial={calm ? false : { opacity: 0, scale: 0.6, rotate: pin.r * 3 }}
      whileInView={{ opacity: 1, scale: 1, rotate: tilt }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ type: "spring", stiffness: 200, damping: 18, delay: i * 0.06 }}
      style={{ ["--l"]: pin.l, ["--t"]: pin.t, zIndex: 10 + i } as CSSProperties}
      className="relative w-full lg:absolute lg:left-[var(--l)] lg:top-[var(--t)] lg:w-[29%] lg:cursor-grab"
    >
      <motion.div style={calm ? undefined : { y }} className="stk-lg relative rounded-md bg-white p-3 pb-4">
        <span
          aria-hidden
          className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 border-x-2 border-dashed border-ink/20 opacity-90"
          style={{ background: TAPE[i], rotate: `${i % 2 ? 4 : -5}deg` }}
        />
        <div className="relative aspect-[4/3] overflow-hidden rounded-sm border-2 border-ink">
          <Image
            src={s.img}
            alt={s.role}
            fill
            sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
            draggable={false}
            className="pointer-events-none object-cover"
          />
        </div>
        <figcaption className="mt-3 text-center font-display text-2xl italic leading-tight text-ink">
          {s.role}
        </figcaption>
      </motion.div>
    </motion.figure>
  );
}

export default function About() {
  const board = useRef<HTMLDivElement>(null);
  const calm = useCalm();
  const [desk, setDesk] = useState(false);
  const { scrollYProgress } = useScroll({ target: board, offset: ["start end", "end start"] });

  // dragging is for a mouse on a wide screen; on touch it would fight scrolling
  useEffect(() => {
    const q = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    setDesk(q.matches);
    const on = () => setDesk(q.matches);
    q.addEventListener?.("change", on);
    return () => q.removeEventListener?.("change", on);
  }, []);

  return (
    <section id="about" className="dots relative isolate overflow-hidden bg-paper2 py-24 lg:py-32">
      <DepthField seed={67} count={10} />
      <Parallax speed={0.12} className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Eyebrow className="justify-center">Who it&rsquo;s for</Eyebrow>
        <h2 className="display mt-4 text-[clamp(2.4rem,5.4vw,4.6rem)] text-ink">
          <Words text="Built for the *everyday host.*" />
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          A birthday party for fifteen or Diwali for thirty if you love bringing
          people together, Invytt handles the chaos so you can actually enjoy
          your own party.
        </p>
        <p className="mt-4 hidden text-sm font-bold text-coral lg:block">Pick one up. They&rsquo;re yours to move.</p>
      </Parallax>

      <div
        ref={board}
        className="relative mx-auto mt-10 grid max-w-6xl gap-x-5 gap-y-5 px-6 sm:grid-cols-2 sm:px-8 lg:mt-14 lg:block lg:h-[790px]"
      >
        {SPEAKERS.map((s, i) => (
          <Polaroid key={`${s.role}-${desk}`} s={s} i={i} progress={scrollYProgress} board={board} calm={calm} desk={desk} />
        ))}
      </div>
    </section>
  );
}
