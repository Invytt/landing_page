"use client";

import { motion } from "motion/react";
import ExpandableSteps from "@/components/expandable-card-demo-standard";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

export default function HowItWorks() {
  return (
    <section className="border-t border-black/10 flex min-h-screen flex-col justify-center bg-bg px-5 py-16 text-black sm:py-24">
      <div className="mx-auto w-full max-w-7xl">
        <div>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.5 }}
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="mb-6 text-sm uppercase tracking-[0.2em] text-black/50"
            >
              How it works
            </motion.p>
            <motion.h2
              custom={1}
              variants={fadeUp}
              className="max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-black md:text-6xl md:leading-tight"
            >
              From idea to last guest, in one app.
            </motion.h2>
            <motion.p
              custom={2}
              variants={fadeUp}
              className="mt-5 max-w-xl text-base text-black/70 sm:mt-6 sm:text-lg"
            >
              Create your event, invite your people, then let Invytt size the
              supplies, split the cost, and book the vendors without leaving
              the app.
            </motion.p>
          </motion.div>

          <div className="mt-10 sm:mt-16">
            <ExpandableSteps />
          </div>
        </div>
      </div>
    </section>
  );
}
