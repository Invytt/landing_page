"use client";

import { useRef, useState } from "react";
import {
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { GAMES } from "@/app/data";
import { Confetti, Reveal, Scallop, Spark, Sticker, Words, useCalm } from "@/components/ui/kit";
import { Phone } from "@/components/ui/phone";
import { Parallax } from "@/components/ui/depth";

import { CompanionScreen, GameScreen, QrScreen, ScanScreen } from "@/components/screens";
import WaitlistForm from "@/components/WaitlistForm";

const WHEEL = ["#CDBEF7", "#8FD9B6", "#FFD6A5", "#F6C1D0", "#BFDDFB", "#FF9A5C", "#FBF6F4", "#D2402A"];

function Drum() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const turn = useSpring(useTransform(scrollYProgress, [0, 1], [70, -200]), {
    stiffness: 80,
    damping: 22,
  });
  return (
    <div
      ref={ref}
      aria-hidden
      className="relative mx-auto h-[300px] w-full [--cw:132px] [--rad:172px] sm:h-[380px] sm:[--cw:200px] sm:[--rad:270px]"
      style={{ perspective: 1500 }}
    >
      <motion.div className="preserve-3d absolute inset-0" style={{ rotateY: turn, z: "calc(var(--rad) * -0.55)" }}>
        <div className="preserve-3d spin-drum absolute inset-0">
          {GAMES.map((g, i) => (
            <div
              key={g.title}
              className="backface-hidden absolute left-1/2 top-1/2 flex flex-col justify-between rounded-[22px] border-2 border-ink p-3 text-ink shadow-[4px_4px_0_#000] sm:p-4"
              style={{
                width: "var(--cw)",
                height: "calc(var(--cw) * 1.32)",
                marginLeft: "calc(var(--cw) / -2)",
                marginTop: "calc(var(--cw) * -0.66)",
                background: g.tint,
                transform: `rotateY(${i * (360 / GAMES.length)}deg) translateZ(var(--rad))`,
              }}
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-ink bg-white font-display text-lg sm:h-10 sm:w-10 sm:text-2xl">
                {i + 1}
              </span>
              <span>
                <span className="display block text-xl leading-[1.02] sm:text-3xl">{g.title}</span>
                <span className="mt-1.5 hidden text-sm leading-snug text-ink/75 sm:block">{g.blurb}</span>
                <span className="mt-2 inline-block rounded-full border-2 border-ink bg-white px-2 py-0.5 text-[10px] font-bold sm:text-xs">
                  {g.meta}
                </span>
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function Wheel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 900]), { stiffness: 60, damping: 20 });
  return (
    <div ref={ref} aria-hidden className="relative h-40 w-40 sm:h-52 sm:w-52">
      <motion.div
        style={{
          rotate,
          background: `conic-gradient(${WHEEL.map((c, i) => `${c} ${i * 45}deg ${(i + 1) * 45}deg`).join(",")})`,
        }}
        className="h-full w-full rounded-full border-2 border-ink shadow-[5px_5px_0_#000]"
      />
      <span className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-ink bg-paper" />
      <span
        className="absolute -top-3 left-1/2 h-0 w-0 -translate-x-1/2 border-x-[12px] border-t-[22px] border-x-transparent border-t-paper"
        style={{ filter: "drop-shadow(0 2px 0 #000)" }}
      />
    </div>
  );
}

function MeetScene({ calm }: { calm: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "center 45%"] });
  const p = useSpring(scrollYProgress, { stiffness: 100, damping: 22 });
  const [met, setMet] = useState(false);
  useMotionValueEvent(p, "change", (v) => setMet(v > 0.86));
  const leftX = useTransform(p, [0, 1], ["-15%", "-1%"]);
  const rightX = useTransform(p, [0, 1], ["15%", "1%"]);
  const leftRot = useTransform(p, [0, 1], [38, 18]);
  const rightRot = useTransform(p, [0, 1], [-38, -18]);
  const beam = useTransform(p, [0.3, 0.86], [0, 1]);
  const on = calm || met;
  return (
    <div ref={ref} className="relative flex items-center justify-center gap-2 pt-16 sm:gap-5" style={{ perspective: 1600 }}>
      <motion.div style={calm ? undefined : { x: leftX }} className="relative z-10">
        <Phone
          ry={calm ? 18 : leftRot}
          label="A phone showing a personal Invytt code"
          className="[--ps:0.53] sm:[--ps:0.72] lg:[--ps:0.8]"
        >
          <QrScreen />
        </Phone>
      </motion.div>

      <motion.span
        aria-hidden
        style={{ scaleX: calm ? 1 : beam }}
        className="absolute left-1/2 top-[44%] z-0 h-[3px] w-[30%] -translate-x-1/2 origin-left bg-[repeating-linear-gradient(90deg,#3CCFBF_0_8px,transparent_8px_14px)]"
      />

      <motion.div style={calm ? undefined : { x: rightX }} className="relative z-10">
        <Phone
          ry={calm ? -18 : rightRot}
          label="A second phone scanning that code and offering to add the new friend"
          className="[--ps:0.53] sm:[--ps:0.72] lg:[--ps:0.8]"
        >
          <ScanScreen met={on} />
        </Phone>
      </motion.div>

      {on && (
        <motion.div
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: -8 }}
          transition={{ type: "spring", stiffness: 380, damping: 14 }}
          className="absolute left-1/2 top-0 z-20 -translate-x-1/2"
        >
          <Sticker tint="#8FD9B6" className="whitespace-nowrap !px-5 !py-2 !text-base shadow-[4px_4px_0_#000]">
            <Spark className="h-4 w-4" /> You two just met
          </Sticker>
          {!calm && <Confetti count={22} spread={200} />}
        </motion.div>
      )}
    </div>
  );
}

export default function PartyLive() {
  const calm = useCalm();
  const head = useRef<HTMLDivElement>(null);
  const seen = useInView(head, { once: true, amount: 0.6 });
  const stage = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: stage, offset: ["start end", "end start"] });
  const phoneAY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const phoneBY = useTransform(scrollYProgress, [0, 1], [-60, 90]);
  const phoneARot = useTransform(scrollYProgress, [0, 1], [-16, 6]);
  const phoneBRot = useTransform(scrollYProgress, [0, 1], [18, -4]);

  return (
    <section id="live" className="on-night dots-night relative isolate overflow-hidden bg-night pb-24 pt-28 text-paper lg:pb-32 lg:pt-36">
      <Scallop color="var(--color-paper)" at="top" />

      <Parallax speed={0.12}>
      <div ref={head} className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        {seen && !calm && <Confetti count={34} spread={340} />}
        <h2 className="display text-[clamp(2.6rem,6.4vw,5.6rem)]">
          <Words text="When the party’s live, the app joins in." />
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-nightmuted">
          The moment an event starts, its chat gets a companion and a games
          room. Anyone who&rsquo;s going can start a round, host or guest.
        </p>
      </div>
      </Parallax>

      {/* companion + a game in play, drifting past each other */}
      <div ref={stage} className="relative mx-auto mt-16 grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:gap-16">
        <div>
          <Reveal>
            <Sticker tint="#CDBEF7" rotate={-3}>Host companion · Party companion</Sticker>
            <h3 className="display mt-5 text-[clamp(2rem,4vw,3.4rem)]">
              A helper in the chat, for both sides of the door.
            </h3>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-nightmuted">
              Hosts ask who&rsquo;s still missing or how to restart a quiet
              room. Guests ask what&rsquo;s happening next. One tab over, the
              games are waiting.
            </p>
          </Reveal>
          <ul className="mt-7 flex flex-wrap gap-2.5">
            {["Who’s missing?", "Suggest a toast", "Pick a game for 9", "Wind-down plan"].map((t, i) => (
              <motion.li
                key={t}
                initial={{ opacity: 0, x: -20, rotate: -6 }}
                whileInView={{ opacity: 1, x: 0, rotate: i % 2 ? 2 : -2 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.09, type: "spring", stiffness: 260, damping: 18 }}
                className="rounded-full border-2 border-ink bg-tint px-4 py-2 text-sm font-bold text-ink shadow-[3px_3px_0_#000]"
              >
                {t}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="relative mx-auto flex justify-center gap-4 sm:gap-8" style={{ perspective: 1600 }}>
          <motion.div style={calm ? undefined : { y: phoneAY }}>
            <Phone
              ry={calm ? -14 : phoneARot}
              label="The host companion chat suggesting a quick game"
              className="[--ps:0.52] sm:[--ps:0.8] lg:[--ps:0.86]"
            >
              <CompanionScreen />
            </Phone>
          </motion.div>
          <motion.div style={calm ? undefined : { y: phoneBY }} className="mt-16">
            <Phone
              ry={calm ? 16 : phoneBRot}
              label="A round of the Hot takes game"
              className="[--ps:0.52] sm:[--ps:0.8] lg:[--ps:0.86]"
            >
              <GameScreen />
            </Phone>
          </motion.div>
        </div>
      </div>

      {/* the eight games on a drum */}
      <div className="relative mx-auto mt-28 max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:items-end lg:justify-between lg:text-left">
          <Reveal>
            <Sticker tint="#FF9A5C" rotate={2}>Invytt Games</Sticker>
            <h3 className="display mt-5 text-[clamp(2rem,4vw,3.4rem)]">Eight games, zero setup.</h3>
            <p className="mt-3 max-w-lg text-lg leading-relaxed text-nightmuted">
              Everyone plays from their own phone, in the same room. Pick one
              and the rest of the party gets the invite.
            </p>
          </Reveal>
          <Parallax speed={0.25} spin={-40}>
            <Wheel />
          </Parallax>
        </div>
        <div className="mt-10">
          <Drum />
        </div>
        {/* the same eight, as plain text */}
        <ul className="mx-auto mt-8 flex max-w-4xl flex-wrap justify-center gap-2">
          {GAMES.map((g) => (
            <li key={g.title} className="rounded-full border-2 border-paper/25 px-3.5 py-1.5 text-sm font-semibold text-paper">
              {g.title}
            </li>
          ))}
        </ul>
      </div>

      {/* meet by QR */}
      <div className="relative mx-auto mt-28 grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <MeetScene calm={calm} />
        <Reveal className="lg:order-first">
          <Sticker tint="#8FD9B6" rotate={-2}>Meet by QR</Sticker>
          <h3 className="display mt-5 text-[clamp(2rem,4vw,3.4rem)]">
            Met someone great by the snacks? Scan, don&rsquo;t spell.
          </h3>
          <p className="mt-4 max-w-lg text-lg leading-relaxed text-nightmuted">
            Every profile carries a code. Point a camera at it and you&rsquo;re
            connected, with the party you met at remembered for you.
          </p>
        </Reveal>
      </div>

      {/* sign up where wanting it peaks, not 9,000px later */}
      <div id="join" className="relative mx-auto mt-28 max-w-2xl px-5 text-center sm:px-8">
        <h3 className="display text-[clamp(2rem,4vw,3.4rem)]">Want this at your next party?</h3>
        <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-nightmuted">
          Join the waitlist and you&rsquo;ll be among the first hosts in when Invytt launches.
        </p>
        <WaitlistForm night className="mx-auto mt-8 max-w-lg text-left" />
      </div>

      <Scallop color="var(--color-paper)" at="bottom" />
    </section>
  );
}
