"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowDown, Check, Disc3, Mail } from "lucide-react";
import { EVENT } from "@/app/data";
import { Magnetic, Scallop, Spark, Words } from "@/components/ui/kit";
import { Phone } from "@/components/ui/phone";
import { EventScreen } from "@/components/screens";
import { Av, AvStack } from "@/components/screens/parts";
import WaitlistForm from "@/components/WaitlistForm";
import { cardHoldMs, introDelay, markReady } from "@/lib/intro";

const HeroScene = dynamic(() => import("@/components/site/HeroScene"), { ssr: false });

const WORDS = ["birthday", "housewarming", "special day"];

function FlipWord() {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2400);
    return () => clearInterval(id);
  }, [reduce]);
  return (
    <span
      className="relative inline-flex min-w-[7.6em] items-center justify-center rounded-full border-2 border-ink bg-coral px-5 py-1 text-white shadow-[4px_4px_0_#000]"
      style={{ perspective: 600 }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={WORDS[i]}
          className="inline-block whitespace-nowrap italic"
          initial={{ rotateX: -80, opacity: 0, y: 14 }}
          animate={{ rotateX: 0, opacity: 1, y: 0 }}
          exit={{ rotateX: 80, opacity: 0, y: -14 }}
          transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        >
          {WORDS[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/** A sticker that floats, and shifts with the pointer by its depth. */
function Floaty({
  mx,
  my,
  depth,
  className,
  children,
  rotate = 0,
  bob = 4.2,
  delay = 0,
  go,
}: {
  mx: MotionValue<number>;
  my: MotionValue<number>;
  depth: number;
  className?: string;
  children: ReactNode;
  rotate?: number;
  bob?: number;
  delay?: number;
  go: boolean;
}) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return (
    <motion.div
      className={`absolute z-20 ${className ?? ""}`}
      style={{ x, y }}
      initial={{ opacity: 0, scale: 0.4, rotate: rotate - 20 }}
      animate={go ? { opacity: 1, scale: 1, rotate } : undefined}
      transition={{ delay, type: "spring", stiffness: 220, damping: 14 }}
    >
      <div className="bob" style={{ ["--bob" as string]: `${bob}s` }}>
        {children}
      </div>
    </motion.div>
  );
}

function canWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const [three, setThree] = useState(false);
  const [ready, setReady] = useState(false);
  const [go, setGo] = useState(false);
  const d0 = useMemo(introDelay, []);

  // lift the loading card, then bring the hero in underneath it
  useEffect(() => {
    const id = window.setTimeout(() => {
      markReady();
      setGo(true);
    }, cardHoldMs());
    return () => window.clearTimeout(id);
  }, []);

  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 90, damping: 18 });
  const my = useSpring(myRaw, { stiffness: 90, damping: 18 });

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const archY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const archScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const stageY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const badgeRotate = useTransform(scrollYProgress, [0, 1], [0, 220]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, 260]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 340]);

  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (calm) video.current?.pause();
    const desktop = window.matchMedia(
      "(min-width: 1024px) and (hover: hover) and (pointer: fine)",
    ).matches;
    if (desktop && !calm && canWebGL()) setThree(true);
  }, []);

  return (
    <section
      ref={ref}
      className="on-night relative isolate overflow-hidden bg-night text-paper"
      onPointerMove={(e) => {
        if (e.pointerType !== "mouse") return;
        mxRaw.set((e.clientX / window.innerWidth) * 2 - 1);
        myRaw.set((e.clientY / window.innerHeight) * 2 - 1);
      }}
    >
      {/* far layer: the dot grid drifts slower than the page */}
      <motion.div aria-hidden style={{ y: gridY }} className="dots-night pointer-events-none absolute -inset-y-[40%] inset-x-0 -z-10" />
      {/* soft coral glow behind the stage */}
      <motion.div
        aria-hidden
        style={{ y: glowY, background: "radial-gradient(circle, #D2402A 0%, transparent 65%)" }}
        className="pointer-events-none absolute right-[-10%] top-[10%] -z-10 h-[70vh] w-[70vh] rounded-full opacity-40 blur-3xl"
      />

      <div className="relative mx-auto grid min-h-[100svh] max-w-7xl items-center gap-x-8 gap-y-14 px-5 pb-24 pt-36 sm:px-8 lg:grid-cols-[1.08fr_1fr] lg:pb-28 lg:pt-36 lg:short:pt-32">
        {/* ── words ── */}
        <motion.div style={{ y: textY }} className="relative z-30">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={go ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: d0, duration: 0.6 }}
            className="inline-flex flex-wrap items-center gap-2 rounded-full border-2 border-paper/25 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-nightmuted"
          >
            <i className="h-2 w-2 rounded-full bg-live" />
            {EVENT.dateRange} · {EVENT.city}
          </motion.p>

          <h1 className="display mt-6 text-[clamp(3.1rem,7vw,6rem)] text-paper lg:short:mt-5 lg:short:text-[4.9rem]">
            <Words text="Every good plan starts with an *invite*" delay={d0 + 0.05} stagger={0.07} start={go} />
          </h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={go ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: d0 + 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-2 font-display text-[clamp(1.7rem,3.4vw,2.6rem)] leading-tight text-paper lg:short:mt-5 lg:short:text-[2.1rem]">
              Host your <FlipWord />
            </p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-nightmuted lg:short:mt-4">
              Invites, RSVPs, AI inventory planning, a vendor marketplace, and
              cost-splitting all in one app. You bring the people, Invytt brings
              the rest.
            </p>

            <WaitlistForm night className="mt-8 max-w-lg lg:short:mt-6" hint={`${EVENT.price} · one email when we launch.`} />

            <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Magnetic>
                <a
                  href="#how-it-works"
                  data-cursor="Scroll"
                  className="inline-flex items-center gap-2 text-base font-bold text-paper underline decoration-coral decoration-2 underline-offset-8"
                >
                  See how it works <ArrowDown size={18} strokeWidth={2.6} />
                </a>
              </Magnetic>
              <span className="flex items-center gap-3 text-sm font-semibold text-nightmuted">
                <AvStack ids={[1, 4, 7, 10]} s={28} />
                Everyday hosts already in line
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* ── stage ── */}
        <motion.div
          style={{ y: stageY }}
          className="relative mx-auto h-[560px] w-full max-w-[560px] sm:h-[640px] lg:h-[700px] lg:short:h-[610px]"
        >
          {/* arch window with the lit-windows film */}
          <motion.div
            style={{ y: archY, scale: archScale }}
            initial={{ opacity: 0, clipPath: "inset(100% 0 0 0 round 999px 999px 28px 28px)" }}
            animate={go ? { opacity: 1, clipPath: "inset(0% 0 0 0 round 999px 999px 28px 28px)" } : undefined}
            transition={{ delay: d0, duration: 1.1, ease: [0.7, 0, 0.3, 1] }}
            className="absolute inset-x-[12%] bottom-0 top-[4%] overflow-hidden rounded-b-[28px] rounded-t-full border-2 border-paper/25 bg-night2"
          >
            <video
              ref={video}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster="/hero-poster.jpg"
              aria-hidden
              className="h-full w-full object-cover opacity-90"
            >
              <source src="/hero.mp4" type="video/mp4" />
            </video>
            <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-night via-transparent to-transparent" />
          </motion.div>

          {/* CSS phone: shown first, and kept when 3D is not available */}
          <motion.div
            className="absolute left-1/2 top-1/2 z-10"
            initial={{ opacity: 0, y: 80, x: "-50%", rotate: 12 }}
            animate={
              go
                ? { opacity: three && ready ? 0 : 1, y: "-50%", x: "-50%", rotate: 5 }
                : undefined
            }
            transition={{ delay: three && ready ? 0 : d0, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="bob" style={{ ["--bob" as string]: "5s" }}>
              <Phone
                label="The Invytt app showing an invitation to a rooftop dinner"
                className="[--ps:0.74] sm:[--ps:0.86] lg:[--ps:0.94]"
                sway
              >
                <EventScreen />
              </Phone>
            </div>
          </motion.div>

          {/* real 3D phone on desktop */}
          {three && go && (
            <div
              className="absolute -inset-x-[22%] -inset-y-[8%] z-10 transition-opacity duration-700"
              style={{ opacity: ready ? 1 : 0 }}
              data-cursor="Tilt"
            >
              <HeroScene
                texture="/app/hero-screen.png"
                delay={d0}
                onReady={() => setReady(true)}
                onFail={() => setThree(false)}
              />
            </div>
          )}

          {/* floating stickers */}
          <Floaty go={go} mx={mx} my={my} depth={-34} rotate={-7} className="left-0 top-[9%] sm:left-[-2%]" delay={d0 + 0.3 + 0}>
            <span className="flex items-center gap-2 rounded-full border-2 border-ink bg-night2 px-3.5 py-2 text-sm font-bold text-paper shadow-[4px_4px_0_#000]">
              <span className="flex items-center gap-1.5 rounded-full bg-live px-2 py-0.5 text-[11px] text-ink">
                <i className="h-1.5 w-1.5 rounded-full bg-ink" /> LIVE
              </span>
              Game night
            </span>
          </Floaty>

          <Floaty go={go} mx={mx} my={my} depth={46} rotate={6} bob={5} className="right-0 top-[20%] sm:right-[-3%]" delay={d0 + 0.3 + 0.12}>
            <span className="flex items-center gap-2 rounded-full border-2 border-ink bg-going px-3 py-1.5 text-sm font-bold text-goingtext shadow-[4px_4px_0_#000]">
              <AvStack ids={[3, 6, 9]} s={24} /> 12 going
            </span>
          </Floaty>

          <Floaty go={go} mx={mx} my={my} depth={-58} rotate={-4} bob={4.6} className="left-0 top-[42%] hidden sm:block lg:left-[-9%]" delay={d0 + 0.3 + 0.24}>
            <span className="block w-[190px] rounded-2xl border-2 border-ink bg-peach p-3 text-ink shadow-[4px_4px_0_#000]">
              <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.14em]">
                <Mail size={13} strokeWidth={2.6} /> You&rsquo;re invited
              </span>
              <span className="mt-1.5 block font-display text-2xl leading-none">Rooftop dinner</span>
              <span className="mt-1 block text-xs font-semibold">Fri, 8 PM</span>
            </span>
          </Floaty>

          <Floaty go={go} mx={mx} my={my} depth={64} rotate={5} bob={5.4} className="bottom-[20%] right-0 hidden sm:block lg:right-[-10%]" delay={d0 + 0.3 + 0.36}>
            <span className="flex items-center gap-2.5 rounded-2xl border-2 border-ink bg-sky px-3 py-2.5 text-ink shadow-[4px_4px_0_#000]">
              <Disc3 size={30} strokeWidth={2} className="spin-slow" />
              <span className="leading-tight">
                <span className="block text-[11px] font-bold uppercase tracking-[0.14em]">Event track</span>
                <span className="block text-sm font-bold">Party mix</span>
              </span>
            </span>
          </Floaty>

          <Floaty go={go} mx={mx} my={my} depth={-40} rotate={4} bob={4.9} className="bottom-[5%] left-[2%] lg:left-[-6%]" delay={d0 + 0.3 + 0.48}>
            <span className="flex items-center gap-2.5 rounded-2xl border-2 border-ink bg-white p-2.5 pr-3 text-ink shadow-[4px_4px_0_#000]">
              <Av i={5} s={36} />
              <span className="leading-tight">
                <span className="block text-xs font-semibold">Asha wants to be friends</span>
                <span className="mt-1 inline-flex items-center gap-1 rounded-full border-2 border-ink bg-statusgreen px-2.5 py-0.5 text-[11px] font-bold text-white">
                  <Check size={11} strokeWidth={4} /> Accept
                </span>
              </span>
            </span>
          </Floaty>

          <Floaty go={go} mx={mx} my={my} depth={28} rotate={-5} bob={5.8} className="right-[4%] top-[1%] hidden lg:block" delay={d0 + 0.3 + 0.6}>
            <span className="flex flex-col rounded-2xl border-2 border-ink bg-sand px-3 py-2 text-ink shadow-[4px_4px_0_#000]">
              <span className="text-sm font-bold">Birthday bash</span>
              <span className="text-xs font-semibold">3 days to go</span>
            </span>
          </Floaty>

          {/* turning seal */}
          <motion.div
            aria-hidden
            style={{ rotate: badgeRotate }}
            className="absolute -bottom-10 right-[2%] z-20 hidden h-32 w-32 lg:block"
          >
            <svg viewBox="0 0 120 120" className="spin-slow h-full w-full" style={{ animationDuration: "22s" }}>
              <circle cx="60" cy="60" r="59" fill="#FBF6F4" stroke="#2B1719" strokeWidth="2" />
              <defs>
                <path id="seal" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
              </defs>
              <text fontSize="10.5" fontWeight="700" letterSpacing="2.4" fill="#2B1719">
                <textPath href="#seal">EVERY GOOD PLAN STARTS WITH AN INVITE ✦ </textPath>
              </text>
              <circle cx="60" cy="60" r="24" fill="#D2402A" stroke="#2B1719" strokeWidth="2" />
            </svg>
            <Spark className="absolute left-1/2 top-1/2 h-7 w-7 -translate-x-1/2 -translate-y-1/2 text-paper" />
          </motion.div>
        </motion.div>
      </div>

      <Scallop color="var(--color-paper)" at="bottom" />
    </section>
  );
}
