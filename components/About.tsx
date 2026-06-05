"use client";

import { motion } from "motion/react";
import { SPEAKERS } from "@/app/data";
import {
  DraggableCardBody,
  DraggableCardContainer,
} from "@/components/ui/draggable-card";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" as const },
  }),
};

// Mobile (base): cards pinned to top / bottom bands so the centered text
// stays clear. sm+ restores the original scattered desktop layout.
const POSITIONS = [
  "absolute top-2 left-[1%] rotate-[-7deg] sm:left-[0%]",
  "absolute top-2 left-[30%] rotate-[5deg] sm:top-[14%] sm:left-[12%]",
  "absolute bottom-2 left-[1%] rotate-[7deg] sm:bottom-4 sm:left-[0%]",
  "absolute bottom-2 left-[30%] rotate-[5deg] sm:top-2 sm:bottom-auto sm:left-[66%]",
  "absolute top-2 right-[1%] rotate-[8deg] sm:top-[14%] sm:right-[0%]",
  "absolute bottom-2 right-[1%] rotate-[6deg] sm:bottom-4 sm:right-[14%]",
];

// Smaller cards on mobile so they fit the bands; full size from sm+.
const CARD_SIZE = "w-40 min-h-0 p-3 sm:w-80 sm:min-h-96 sm:p-6";

const CARDS = SPEAKERS.slice(0, POSITIONS.length).map((s, i) => ({
  ...s,
  className: POSITIONS[i],
}));

export default function About() {
  return (
    <section id="about" data-nav-light className="border-t border-black/10">
      <DraggableCardContainer className="relative flex min-h-screen w-full items-center justify-center overflow-clip">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="pointer-events-none absolute top-1/2 z-10 mx-auto max-w-2xl -translate-y-1/2 px-6 text-center"
        >
          <motion.div
            custom={0}
            variants={fadeUp}
            className="mb-6 flex items-center justify-center gap-3 sm:gap-4"
          >
            <span className="h-px w-8 bg-black/15 sm:w-12" />
            <p className="text-sm uppercase tracking-[0.2em] text-black/40 sm:text-base">
              Who it&apos;s for
            </p>
            <span className="h-px w-8 bg-black/15 sm:w-12" />
          </motion.div>
          <motion.h2
            custom={1}
            variants={fadeUp}
            className="font-display text-4xl font-bold leading-tight tracking-tight text-black/80 md:text-6xl"
          >
            Built for the everyday host.
          </motion.h2>
          <motion.p
            custom={2}
            variants={fadeUp}
            className="mt-6 text-lg text-black/40"
          >
            Drag the hosts around. From a birthday dinner for fifteen to Diwali
            for thirty — Invytt is for everyone who loves bringing their world
            together, minus the three weeks of logistics.
          </motion.p>
        </motion.div>
        {CARDS.map((item) => (
          <DraggableCardBody
            key={item.name}
            className={`${item.className} ${CARD_SIZE}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.img}
              alt={item.name}
              className="pointer-events-none relative z-10 h-32 w-32 object-cover sm:h-80 sm:w-80"
            />
            <h3 className="mt-2 text-center font-display text-base font-bold text-neutral-300 sm:mt-4 sm:text-xl">
              {item.name}
            </h3>
            <p className="text-center text-xs text-neutral-500 sm:text-sm">
              {item.role}
            </p>
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>
    </section>
  );
}
