"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** A dashed coral line across the top that fills as the page is read. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 26, mass: 0.3 });
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-[4px] origin-left"
      style={{
        scaleX,
        backgroundImage:
          "repeating-linear-gradient(90deg, var(--color-coral) 0 14px, transparent 14px 20px)",
      }}
    />
  );
}
