"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Countdown from "./Countdown";
import WaitlistForm, { type SubmitState } from "./WaitlistForm";
import { useJoined } from "@/lib/waitlist-joined";
import { MARQUEE } from "@/app/data";
import { LAUNCH_DATE_LABEL } from "@/lib/launch";
import { Confetti, Scallop, Spark, Tilt, Words } from "@/components/ui/kit";
import { DepthField, Parallax } from "@/components/ui/depth";

import { AvStack, FauxQr } from "@/components/screens/parts";

const PERK_TINTS = ["#CDBEF7", "#8FD9B6", "#FFD6A5", "#F6C1D0"];

/** The waitlist, printed as an admission ticket. The stub tears off when you join. */
export default function TicketCTA() {
  const [state, setState] = useState<SubmitState>("idle");
  // the stub stays torn for anyone already on the list; confetti only for a
  // join that just happened here
  const joined = useJoined() || state === "success";

  return (
    <section id="tickets" className="on-night dots-night relative isolate overflow-hidden bg-night pb-24 pt-28 text-paper lg:pb-32 lg:pt-36">
      <Scallop color="var(--color-paper)" at="top" />
      <DepthField seed={79} count={12} night />
      <Parallax speed={0.5} className="absolute left-[6%] top-[14%] -z-10 hidden lg:block">
        <Spark className="spin-slow h-10 w-10 text-coral" />
      </Parallax>
      <Parallax speed={-0.15} className="absolute right-[8%] top-[30%] -z-10 hidden lg:block">
        <Spark className="spin-slow h-7 w-7 text-sand" style={{ animationDuration: "11s" }} />
      </Parallax>
      <Parallax speed={0.3} className="absolute bottom-[12%] left-[12%] -z-10 hidden lg:block">
        <Spark className="spin-slow h-6 w-6 text-lilac" style={{ animationDuration: "9s" }} />
      </Parallax>

      <Parallax speed={0.14} className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
        <h2 className="display text-[clamp(2.6rem,6.4vw,5.6rem)]">
          <Words text="Host your next party *on Invytt.*" />
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-nightmuted">
          Join the hosts building their next event on Invytt. Drop your email
          and we&apos;ll let you know the moment it&apos;s live.
        </p>
      </Parallax>

      <div className="relative mx-auto mt-14 max-w-5xl px-4 sm:px-8" style={{ perspective: 1600 }}>
        <Tilt max={4} glare={false}>
          <div className="relative flex flex-col lg:flex-row">
            {/* ── main part of the ticket ── */}
            <div className="lit relative flex-1 rounded-[30px] border-2 border-ink bg-paper p-6 text-ink sm:p-10 lg:rounded-r-none lg:border-r-0">
              <p className="eyebrow text-center text-muted">Launching in</p>
              <div className="mt-4">
                <Countdown />
              </div>

              <WaitlistForm className="mx-auto mt-8 max-w-xl text-center" onState={setState} />

              <div className="tear-x my-7" />

              <p className="eyebrow text-center text-muted">Early-access perks</p>
              <ul className="mt-4 flex flex-wrap justify-center gap-2.5">
                {MARQUEE.map((perk, i) => (
                  <motion.li
                    key={perk}
                    initial={{ opacity: 0, y: 16, rotate: 0 }}
                    whileInView={{ opacity: 1, y: 0, rotate: i % 2 ? 1.5 : -1.5 }}
                    whileHover={{ y: -3, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.07, type: "spring", stiffness: 260, damping: 18 }}
                    className="lit stk-sm rounded-full px-4 py-1.5 text-sm font-medium"
                    style={{ background: PERK_TINTS[i % PERK_TINTS.length] }}
                  >
                    {perk}
                  </motion.li>
                ))}
              </ul>

              <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <AvStack ids={[1, 3, 6, 8, 11]} s={34} />
                <p className="text-base text-muted">
                  Join the <span className="font-medium text-ink">everyday hosts</span> already in line
                </p>
              </div>
            </div>

            {/* ── the stub ── */}
            <motion.div
              animate={
                joined
                  ? { x: 26, y: 30, rotate: 7 }
                  : { x: 0, y: 0, rotate: 0 }
              }
              transition={{ type: "spring", stiffness: 160, damping: 12 }}
              className="relative origin-top-left rounded-[30px] border-2 border-ink bg-coral p-6 text-white lg:w-[250px] lg:rounded-l-none lg:border-l-0"
            >
              {/* tear line + notches */}
              <span aria-hidden className="tear-y absolute bottom-6 left-0 top-6 hidden opacity-70 lg:block" />
              <span aria-hidden className="absolute -top-[13px] left-[-12px] hidden h-6 w-6 rounded-full border-2 border-ink bg-night lg:block" />
              <span aria-hidden className="absolute -bottom-[13px] left-[-12px] hidden h-6 w-6 rounded-full border-2 border-ink bg-night lg:block" />

              <div className="flex h-full flex-row items-center justify-between gap-5 lg:flex-col lg:justify-center lg:text-center">
                <div>
                  <p className="eyebrow">Admit one</p>
                  <p className="display mt-2 text-4xl leading-none">Founding host</p>
                  <p className="mt-3 text-sm font-medium text-white">
                    Doors open {LAUNCH_DATE_LABEL}
                  </p>
                </div>
                <div className="shrink-0 rounded-2xl border-2 border-ink bg-paper p-2.5">
                  <FauxQr size={96} seed={23} />
                </div>
                <p className="hidden text-xs font-medium uppercase tracking-[0.2em] lg:block">
                  {joined ? "Yours. See you there." : "No. 0001"}
                </p>
              </div>
              {state === "success" && <Confetti count={40} spread={380} />}
            </motion.div>
          </div>
        </Tilt>
      </div>
    </section>
  );
}
