"use client";

import dynamic from "next/dynamic";
import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowDown, Camera, Gift, Sparkles, Ticket, Wallet } from "lucide-react";
import { SOON } from "@/app/data";
import { Magnetic, Scallop, Words } from "@/components/ui/kit";
import { DepthField } from "@/components/ui/depth";
import SilverWordmark from "@/components/ui/SilverWordmark";

const Globe = dynamic(() => import("./Globe"), { ssr: false });

function Orbiter({
  mx,
  my,
  depth,
  className,
  children,
  rotate,
  delay,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  className: string;
  children: ReactNode;
  rotate: number;
  delay: number;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div className={`absolute z-20 ${className}`} style={{ x, y }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.3, rotate: rotate - 30 }}
        animate={{ opacity: 1, scale: 1, rotate }}
        transition={{ delay, type: "spring", stiffness: 200, damping: 14 }}
      >
        <div className="bob" style={{ ["--bob" as string]: `${4 + delay}s` }}>
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
}

const STRIP = ["Shop", "Book a service", "Book venues", "Invytt Agency", "Ticketed events", "Bookings & payments"];

export default function SoonHero() {
  const ref = useRef<HTMLElement>(null);
  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 80, damping: 18 });
  const my = useSpring(myRaw, { stiffness: 80, damping: 18 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const globeY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const globeScale = useTransform(scrollYProgress, [0, 1], [1, 0.82]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 220]);

  return (
    <section
      ref={ref}
      className="on-night relative isolate overflow-hidden bg-night pb-28 pt-36 text-paper lg:pt-40"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        mxRaw.set((e.clientX / window.innerWidth) * 2 - 1);
        myRaw.set((e.clientY / window.innerHeight) * 2 - 1);
      }}
    >
      <motion.div aria-hidden style={{ y: gridY }} className="dots-night pointer-events-none absolute -inset-y-[40%] inset-x-0 -z-10" />
      <DepthField seed={101} count={10} night />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1fr_1fr]">
        <motion.div style={{ y: textY }} className="relative z-30">
          <SilverWordmark className="mb-7 block w-44 sm:w-52" priority delay={1.1} />
          <p className="inline-flex items-center gap-2 rounded-full border-2 border-ink bg-coral px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-white ">
            <Sparkles size={14} strokeWidth={2.6} /> Coming soon
          </p>
          <h1 className="display mt-6 text-[clamp(3rem,7.4vw,6.4rem)]">
            <Words text="The next chapter of *every party.*" stagger={0.07} />
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-nightmuted">
            Invytt launches with invites, RSVPs, plans, supplies, splits, games
            and the live party. These {SOON.length} are built and waiting their
            turn: a marketplace for everything the party needs, an agency that
            runs it for you, ticketed events and more.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Magnetic>
              <a href="#on-the-way" className="stk-btn bg-paper text-ink" data-cursor="Scroll">
                See what&rsquo;s coming <ArrowDown size={18} strokeWidth={2.6} />
              </a>
            </Magnetic>
            <a href="#notify" className="text-base font-bold text-paper underline decoration-coral decoration-2 underline-offset-8">
              Get early access
            </a>
          </div>
        </motion.div>

        <motion.div style={{ y: globeY, scale: globeScale }} className="relative mx-auto aspect-square w-full max-w-[560px]">
          <Globe className="absolute inset-0 h-full w-full" />

          <Orbiter mx={mx} my={my} depth={-40} rotate={-8} delay={0.3} className="left-[2%] top-[10%]">
            <span className="flex items-center gap-2 rounded-full border-2 border-ink bg-sand px-3.5 py-2 text-sm font-bold text-ink ">
              <Gift size={16} strokeWidth={2.4} /> Shop
            </span>
          </Orbiter>
          <Orbiter mx={mx} my={my} depth={55} rotate={7} delay={0.42} className="right-[0%] top-[18%]">
            <span className="flex items-center gap-2 rounded-full border-2 border-ink bg-sky px-3.5 py-2 text-sm font-bold text-ink ">
              <Camera size={16} strokeWidth={2.4} /> Book a service
            </span>
          </Orbiter>
          <Orbiter mx={mx} my={my} depth={-62} rotate={5} delay={0.54} className="bottom-[16%] left-[-2%]">
            <span className="flex items-center gap-2 rounded-2xl border-2 border-ink bg-pink px-3.5 py-2.5 text-sm font-bold text-ink ">
              <Ticket size={16} strokeWidth={2.4} /> Early Bird · ₹499
            </span>
          </Orbiter>
          <Orbiter mx={mx} my={my} depth={38} rotate={-6} delay={0.66} className="bottom-[6%] right-[4%]">
            <span className="flex items-center gap-2 rounded-full border-2 border-ink bg-mint px-3.5 py-2 text-sm font-bold text-ink ">
              <Wallet size={16} strokeWidth={2.4} /> My bookings
            </span>
          </Orbiter>
          <Orbiter mx={mx} my={my} depth={24} rotate={-3} delay={0.78} className="left-1/2 top-[-2%] -translate-x-1/2">
            <span className="block rounded-2xl border-2 border-ink bg-peach px-4 py-2 text-ink ">
              <span className="block text-[11px] font-bold uppercase tracking-[0.14em]">Invytt Agency</span>
              <span className="display block text-2xl">We handle it all</span>
            </span>
          </Orbiter>
        </motion.div>
      </div>

      {/* hazard ticker */}
      <div className="absolute inset-x-0 bottom-10 z-10 -rotate-2 overflow-hidden border-y-2 border-ink bg-sand py-2.5 text-ink ">
        <div className="flex w-max animate-marquee">
          {[...STRIP, ...STRIP, ...STRIP, ...STRIP].map((t, i) => (
            <span key={i} className="flex items-center whitespace-nowrap px-5 text-sm font-bold uppercase tracking-[0.12em]">
              {t}
              <span className="ml-10 inline-block h-3 w-3 rotate-45 border-2 border-ink bg-coral" />
            </span>
          ))}
        </div>
      </div>

      <Scallop color="var(--color-paper2)" at="bottom" />
    </section>
  );
}
