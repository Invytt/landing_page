"use client";

import { useState } from "react";
import { motion } from "motion/react";
import {
  CakeSlice,
  Camera,
  ChefHat,
  Disc3,
  Flower2,
  Gift,
  Landmark,
  Palmtree,
  RotateCw,
  Building2,
  type LucideIcon,
} from "lucide-react";
import { Eyebrow, Reveal, Stamp, Tilt, Words } from "@/components/ui/kit";
import { DepthField, Parallax } from "@/components/ui/depth";

type Aisle = {
  title: string;
  line: string;
  tint: string;
  icons: LucideIcon[];
  kinds: string[];
};

// The three marketplace doors, in the app's words.
const AISLES: Aisle[] = [
  {
    title: "Shop",
    line: "Cakes, flowers, decor, gifts and everything in between.",
    tint: "#FFD6A5",
    icons: [CakeSlice, Flower2, Gift],
    kinds: ["Cakes", "Flowers", "Decor", "Gifts"],
  },
  {
    title: "Book a service",
    line: "Photographers, caterers, decorators and more.",
    tint: "#BFDDFB",
    icons: [Camera, ChefHat, Disc3],
    kinds: ["Photographers", "Caterers", "Decorators", "DJs", "Bartenders"],
  },
  {
    title: "Book venues",
    line: "Rooftops, banquets, resorts and party halls.",
    tint: "#CDBEF7",
    icons: [Building2, Landmark, Palmtree],
    kinds: ["Rooftops", "Banquets", "Resorts", "Party halls"],
  },
];

function FlipCard({ a, i }: { a: Aisle; i: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <Parallax speed={[0.04, 0.12, 0.07][i]}>
      <motion.div
        initial={{ opacity: 0, y: 60, rotate: (i - 1) * 6 }}
        whileInView={{ opacity: 1, y: 0, rotate: (i - 1) * 2 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ type: "spring", stiffness: 140, damping: 16, delay: i * 0.08 }}
      >
        <Tilt max={7} glare={false} className="rounded-[30px]">
          <button
            type="button"
            onClick={() => setFlipped((v) => !v)}
            aria-pressed={flipped}
            aria-label={`${a.title}: ${flipped ? "show the cover" : "see what's inside"}`}
            data-cursor="Flip"
            className="group/flip relative block h-[420px] w-full text-left [perspective:1400px]"
          >
            <motion.span
              className="preserve-3d absolute inset-0 block"
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ type: "spring", stiffness: 160, damping: 20 }}
            >
              {/* front */}
              <span
                className="lit backface-hidden stk-lg absolute inset-0 flex flex-col justify-between overflow-hidden rounded-[30px] p-7 text-ink"
                style={{ background: a.tint }}
              >
                <span className="flex items-start justify-between">
                  <Stamp rotate={-6} className="bg-white/60">Coming soon</Stamp>
                  <span className="flex items-center gap-1.5 rounded-full border-2 border-ink bg-white px-3 py-1.5 text-xs font-medium">
                    <RotateCw size={14} strokeWidth={2.8} className="transition-transform duration-300 group-hover/flip:rotate-180" />
                    See inside
                  </span>
                </span>
                <span className="relative mx-auto flex h-36 items-center justify-center gap-3">
                  {a.icons.map((I, k) => (
                    <span
                      key={k}
                      className="bob flex h-20 w-20 items-center justify-center rounded-[22px] border-2 border-ink bg-white"
                      style={{ ["--bob" as string]: `${3 + k * 0.6}s`, ["--r" as string]: `${(k - 1) * 8}deg` }}
                    >
                      <I size={34} strokeWidth={2} />
                    </span>
                  ))}
                </span>
                <span>
                  <span className="display block text-5xl">{a.title}</span>
                  <span className="mt-2 block text-lg leading-snug text-ink/80">{a.line}</span>
                </span>
              </span>
              {/* back */}
              <span
                className="backface-hidden stk-lg absolute inset-0 flex flex-col justify-between rounded-[30px] bg-night p-7 text-paper"
                style={{ transform: "rotateY(180deg)" }}
              >
                <span>
                  <span className="eyebrow text-peach">What&rsquo;s inside</span>
                  <span className="display mt-3 block text-4xl">{a.title}</span>
                </span>
                <span className="flex flex-wrap gap-2">
                  {a.kinds.map((k) => (
                    <span key={k} className="lit rounded-full border-2 border-ink px-3.5 py-1.5 text-sm font-medium text-ink " style={{ background: a.tint }}>
                      {k}
                    </span>
                  ))}
                </span>
                <span className="text-base leading-relaxed text-nightmuted">
                  Profiles, pricing, availability and verified reviews. Book and
                  pay without leaving your event.
                </span>
              </span>
            </motion.span>
          </button>
        </Tilt>
      </motion.div>
    </Parallax>
  );
}

export default function Marketplace() {
  return (
    <section id="marketplace" className="lit dots relative isolate overflow-hidden bg-paper py-24 lg:py-32">
      <DepthField seed={113} count={10} />
      <Parallax speed={0.1} className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Eyebrow className="justify-center">The marketplace</Eyebrow>
        <h2 className="display mt-4 text-[clamp(2.4rem,5.4vw,4.6rem)] text-ink">
          <Words text="Everything the party needs, *one tap away.*" />
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Three doors into one marketplace, right inside your event. Tap a card
          to see what&rsquo;s behind it.
        </p>
      </Parallax>
      <div className="mx-auto mt-14 grid max-w-6xl gap-8 px-5 sm:px-8 md:grid-cols-3">
        {AISLES.map((a, i) => (
          <FlipCard key={a.title} a={a} i={i} />
        ))}
      </div>
      <Reveal className="mt-10 text-center">
        <p className="text-sm font-medium text-muted">Landing city by city after launch.</p>
      </Reveal>
    </section>
  );
}
