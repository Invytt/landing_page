"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { MARQUEE } from "@/app/data";
import WaitlistForm, { type SubmitState } from "@/components/WaitlistForm";
import { Confetti, Scallop, Words } from "@/components/ui/kit";
import { DepthField, Parallax } from "@/components/ui/depth";

const TINTS = ["#CDBEF7", "#8FD9B6", "#FFD6A5", "#F6C1D0"];

export default function SoonCTA() {
  const [state, setState] = useState<SubmitState>("idle");
  return (
    <section id="notify" className="on-night dots-night relative isolate overflow-hidden bg-night pb-28 pt-32 text-paper">
      <Scallop color="var(--color-paper2)" at="top" />
      <DepthField seed={137} count={12} night />
      <Parallax speed={0.1} className="relative mx-auto max-w-3xl px-5 text-center sm:px-8">
        <p className="eyebrow inline-flex items-center gap-3 text-coral">
          <span aria-hidden className="h-[2px] w-8 bg-current" /> Be first in line <span aria-hidden className="h-[2px] w-8 bg-current" />
        </p>
        <h2 className="display mt-5 text-[clamp(2.6rem,6.4vw,5.6rem)]">
          <Words text="Get in early, *get the perks.*" />
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-nightmuted">
          Join the waitlist for Invytt. Early-access hosts get priority access to
          vetted vendors and an early-bird discount on bookings when the
          marketplace opens.
        </p>
      </Parallax>

      <div className="relative mx-auto mt-10 max-w-xl px-5 sm:px-8">
        <motion.div
          animate={state === "success" ? { rotate: [0, -2, 2, 0], scale: [1, 1.03, 1] } : undefined}
          transition={{ duration: 0.6 }}
          className="relative rounded-[30px] border-2 border-ink bg-paper p-6 text-center text-ink shadow-[8px_8px_0_#000] sm:p-8"
        >
          <WaitlistForm onState={setState} />
          {state === "success" && <Confetti count={36} spread={320} />}
          <ul className="mt-6 flex flex-wrap justify-center gap-2">
            {MARQUEE.map((perk, i) => (
              <li key={perk} className="stk-sm rounded-full px-3.5 py-1 text-sm font-bold" style={{ background: TINTS[i % TINTS.length], rotate: `${i % 2 ? 1.5 : -1.5}deg` }}>
                {perk}
              </li>
            ))}
          </ul>
        </motion.div>
        <p className="mt-8 text-center">
          <Link href="/" className="inline-flex items-center gap-2 text-base font-bold text-paper underline decoration-coral decoration-2 underline-offset-8">
            <ArrowLeft size={18} strokeWidth={2.6} /> See what launches first
          </Link>
        </p>
      </div>
    </section>
  );
}
