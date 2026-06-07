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

// lg+ desktop: scattered pile positions for the cards.
const POSITIONS = [
  "absolute top-1 left-[0%] rotate-[9deg]",
  "absolute top-[20%] left-[5%] rotate-[-12deg]",
  "absolute bottom-6 left-[2%] rotate-[6deg]",
  "absolute top-1 right-[0%] rotate-[-9deg]",
  "absolute top-[20%] right-[5%] rotate-[12deg]",
  "absolute bottom-6 right-[2%] rotate-[-6deg]",
];

const CARDS = SPEAKERS.slice(0, POSITIONS.length);

export default function About() {
  return (
    <section id="about" data-nav-light className="border-t border-black/10">
      {/* Mobile: static heading + 2-col card grid. */}
      <div className="px-6 py-16 lg:hidden">
        <div className="mb-8 text-center">
          <div className="mb-5 flex items-center justify-center gap-3">
            <span className="h-px w-8 bg-black/15" />
            <p className="text-sm uppercase tracking-[0.2em] text-black/40">
              Who it&apos;s for
            </p>
            <span className="h-px w-8 bg-black/15" />
          </div>
          <h2 className="font-display text-4xl font-bold leading-tight tracking-tight text-black/80">
            Built for the everyday host.
          </h2>
          <p className="mt-4 text-base text-black/60">
            A birthday party for fifteen or Diwali for thirty if you love bringing
            people together, Invytt handles the chaos so you can actually enjoy
            your own party.
          </p>
        </div>
        <DraggableCardContainer className="grid grid-cols-2 gap-4">
          {CARDS.map((item) => (
            <DraggableCardBody
              key={item.name}
              className="min-h-0 w-full rotate-[-3deg] rounded-sm bg-white p-2 pb-4 shadow-xl even:rotate-[3deg]"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.img}
                alt={item.name}
                className="pointer-events-none relative z-10 h-32 w-full object-cover"
              />
              <h3 className="mt-3 text-center font-display text-sm font-bold text-neutral-800">
                {item.name}
              </h3>
              <p className="text-center text-xs text-neutral-500">
                {item.role}
              </p>
            </DraggableCardBody>
          ))}
        </DraggableCardContainer>
      </div>

      {/* lg+: original scattered, draggable photo pile with centered overlay text. */}
      <DraggableCardContainer className="relative hidden min-h-screen w-full items-center justify-center overflow-clip lg:flex">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.5 }}
          className="pointer-events-none absolute top-1/2 z-10 mx-auto max-w-2xl -translate-y-1/2 px-6 text-center"
        >
          <motion.div
            custom={0}
            variants={fadeUp}
            className="mb-6 flex items-center justify-center gap-4"
          >
            <span className="h-px w-12 bg-black/15" />
            <p className="text-base uppercase tracking-[0.2em] text-black/40">
              Who it&apos;s for
            </p>
            <span className="h-px w-12 bg-black/15" />
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
            className="mt-6 text-lg text-black/60"
          >
            A birthday party for fifteen or Diwali for thirty if you love bringing
            people together, Invytt handles the chaos so you can actually enjoy
            your own party.
          </motion.p>
        </motion.div>
        {CARDS.map((item, i) => (
          <DraggableCardBody
            key={item.name}
            className={`${POSITIONS[i]} w-80 min-h-96 p-6`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.img}
              alt={item.name}
              className="pointer-events-none relative z-10 h-80 w-80 object-cover"
            />
            <h3 className="mt-4 text-center font-display text-xl font-bold text-neutral-300">
              {item.name}
            </h3>
            <p className="text-center text-sm text-neutral-500">{item.role}</p>
          </DraggableCardBody>
        ))}
      </DraggableCardContainer>
    </section>
  );
}
