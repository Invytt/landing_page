"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/**
 * A sticker that trails the pointer on desktop. Elements carrying
 * data-cursor="Drag" (or any short word) turn it into a labelled pill.
 * The real cursor stays visible; this only decorates it.
 */
export default function Cursor() {
  const [on, setOn] = useState(false);
  const [label, setLabel] = useState("");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 380, damping: 30, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 380, damping: 30, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || calm.matches) return;
    setOn(true);
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as Element | null)?.closest?.("[data-cursor]");
      setLabel(el?.getAttribute("data-cursor") ?? "");
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!on) return null;
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[80]"
      style={{ x: sx, y: sy }}
    >
      <motion.span
        className="flex items-center justify-center rounded-full border-2 border-ink bg-coral text-[11px] font-bold uppercase tracking-[0.12em] text-white shadow-[2px_2px_0_#2B1719]"
        style={{ translateX: 14, translateY: 14 }}
        animate={{
          width: label ? Math.max(58, label.length * 9 + 26) : 12,
          height: label ? 30 : 12,
        }}
        transition={{ type: "spring", stiffness: 420, damping: 28 }}
      >
        {label}
      </motion.span>
    </motion.div>
  );
}
