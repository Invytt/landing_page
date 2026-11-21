"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, PartyPopper, Sparkles, X } from "lucide-react";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "Who it's for", href: "#about" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

/**
 * `base` is "/" on other pages, so the section links lead back to the home page.
 * `soon` marks the coming-soon page: its button then leads back to what's in
 * the app now, instead of to the page you're already on.
 */
export default function Nav({ base = "", soon = false }: { base?: string; soon?: boolean }) {
  const [hidden, setHidden] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  // hide on scroll down, show on scroll up (rAF throttled)
  useEffect(() => {
    lastY.current = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      const goingDown = y > lastY.current;
      if (Math.abs(y - lastY.current) > 6) {
        setHidden(goingDown && y > 80);
        lastY.current = y;
      }
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // scroll-spy: highlight the section currently in view
  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    if (base) return;
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!targets.length) return;

    const seen = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.isIntersecting);
        // the last tracked section crossing the middle of the screen wins
        let best: string | null = null;
        for (const id of ids) if (seen.get(id)) best = id;
        setActiveId(best);
      },
      // a thin band across the middle of the viewport
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, [base]);

  // lock body scroll + close on Escape while the mobile menu is open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-[46px] z-50 px-3 transition-transform duration-300 motion-reduce:transition-none sm:px-5 ${
          // phones hide it on the way down (the sticky join bar takes over);
          // on desktop it stays, so "Get early access" is always one click away
          hidden && !open ? "max-lg:translate-y-[-150%]" : "translate-y-0"
        }`}
      >
        <div
          className="mx-auto flex max-w-6xl items-center justify-between gap-3 rounded-full border-2 border-ink bg-paper py-2 pl-5 pr-2 text-ink"
        >
          <a href={base || "#"} aria-label="Invytt home" className="flex h-11 shrink-0 items-center">
            <Image
              src="/wordmark-ink.webp"
              alt="Invytt"
              width={75}
              height={32}
              priority
              className="h-8 w-auto"
            />
          </a>

          {/* desktop links */}
          <nav aria-label="Primary" className="hidden items-center gap-1 text-[15px] font-bold lg:flex">
            {LINKS.map((l) => {
              const isActive = activeId === l.href.slice(1);
              return (
                <a
                  key={l.href}
                  href={base + l.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`rounded-full px-4 py-2 transition-colors ${
                    isActive ? "bg-ink text-paper" : "text-ink hover:bg-tint"
                  }`}
                >
                  {l.label}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            {/* what's coming next; on the coming-soon page this leads back */}
            <Link
              href={soon ? "/" : "/coming-soon"}
              className={`stk-btn !min-h-10 !gap-1.5 !px-3.5 !py-2 !text-sm max-sm:!hidden text-ink ${
                soon ? "bg-mint" : "bg-sand"
              }`}
            >
              {soon ? <PartyPopper size={15} strokeWidth={2.6} /> : <Sparkles size={15} strokeWidth={2.6} />}
              {soon ? "What’s here now" : "Coming soon"}
            </Link>
            <a
              href={base ? "#notify" : "#tickets"}
              className="stk-btn !min-h-11 bg-coral !px-4 !py-2 !text-sm text-white"
            >
              Get early access
            </a>
            {/* mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-white lg:hidden"
            >
              {open ? <X size={20} strokeWidth={2.6} /> : <Menu size={20} strokeWidth={2.6} />}
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            data-lenis-prevent
            initial={{ clipPath: "circle(0% at calc(100% - 44px) 70px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 44px) 70px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 44px) 70px)" }}
            transition={{ duration: 0.5, ease: [0.7, 0, 0.3, 1] }}
            className="dots fixed inset-0 z-40 flex flex-col overflow-y-auto bg-paper text-ink lg:hidden"
          >
            <nav
              aria-label="Mobile"
              className="flex flex-1 flex-col items-start justify-center gap-5 px-8 pb-10 pt-36"
            >
              {LINKS.map((l, i) => {
                const isActive = activeId === l.href.slice(1);
                return (
                  <motion.a
                    key={l.href}
                    href={base + l.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    initial={{ opacity: 0, x: -24, rotate: -3 }}
                    animate={{ opacity: 1, x: 0, rotate: 0 }}
                    transition={{ delay: 0.12 + i * 0.06, type: "spring", stiffness: 260, damping: 22 }}
                    className={`font-display text-5xl leading-none ${
                      isActive ? "italic text-coral" : "text-ink"
                    }`}
                  >
                    {l.label}
                  </motion.a>
                );
              })}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42 }}
                className="mt-4 flex flex-wrap gap-3"
              >
                <a href={base ? "#notify" : "#tickets"} onClick={() => setOpen(false)} className="stk-btn bg-coral text-white">
                  Get early access
                </a>
                <Link
                  href={soon ? "/" : "/coming-soon"}
                  onClick={() => setOpen(false)}
                  className={`stk-btn text-ink ${soon ? "bg-mint" : "bg-sand"}`}
                >
                  {soon ? <PartyPopper size={17} strokeWidth={2.6} /> : <Sparkles size={17} strokeWidth={2.6} />}
                  {soon ? "What’s here now" : "Coming soon"}
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
