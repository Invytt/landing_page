"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "Who it's for", href: "#about" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
];

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [light, setLight] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const lastY = useRef(0);
  const ticking = useRef(false);

  // hide on scroll down, show on scroll up — rAF throttled
  useEffect(() => {
    lastY.current = window.scrollY;

    const update = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
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

  // black text when a cream section sits under the navbar
  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-light]"),
    );
    if (!sections.length) return;

    const active = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) active.add(e.target);
          else active.delete(e.target);
        }
        setLight(active.size > 0);
      },
      // only the top ~10% strip (where the navbar is) counts as the root
      { rootMargin: "0px 0px -90% 0px", threshold: 0 },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // scroll-spy: highlight the section currently in view
  useEffect(() => {
    const ids = LINKS.map((l) => l.href.slice(1));
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!targets.length) return;

    const ratios = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          ratios.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        }
        let best: string | null = null;
        let max = 0;
        for (const [id, r] of ratios) {
          if (r > max) {
            max = r;
            best = id;
          }
        }
        // no tracked section in view (e.g. Hero) -> clear selection
        setActiveId(best);
      },
      { rootMargin: "-20% 0px -35% 0px", threshold: [0.1, 0.25, 0.5, 0.75] },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  // lock body scroll + close on Escape while mobile menu open
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
        className={`sticky top-8 z-50 transition-transform duration-300 motion-reduce:transition-none ${
          hidden ? "translate-y-[-150%]" : "translate-y-0"
        }`}
      >
      <div
        className={`flex w-full items-center justify-between px-8 transition-all duration-300 motion-reduce:transition-none md:px-12 ${
          scrolled ? "py-5" : "py-6"
        } ${
          open
            ? "bg-[#0a0a0a]"
            : scrolled
              ? light
                ? "bg-bg/70 backdrop-blur-md"
                : "bg-black/30 backdrop-blur-md"
              : "bg-transparent"
        } ${open ? "text-white" : light ? "text-black" : "text-white"}`}
      >
        <a
          href="#"
          aria-label="Invytt home"
          className="focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        >
          <Image
            src="/logo.png"
            alt="Invytt"
            width={1024}
            height={1024}
            priority
            className="-my-10 -ml-4 h-36 w-36"
          />
        </a>

        {/* desktop links */}
        <nav
          aria-label="Primary"
          className="hidden items-center gap-10 text-base font-bold lg:flex"
        >
          {LINKS.map((l) => {
            const isActive = activeId === l.href.slice(1);
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-left after:transition-transform after:duration-300 motion-reduce:after:transition-none hover:after:scale-x-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${
                  light
                    ? "hover:text-black after:bg-black"
                    : "hover:text-white after:bg-white"
                } ${
                  isActive
                    ? light
                      ? "text-black after:scale-x-100"
                      : "text-white after:scale-x-100"
                    : light
                      ? "text-black/60 after:scale-x-0"
                      : "text-white/70 after:scale-x-0"
                }`}
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        {/* mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          className="lg:hidden rounded-md p-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        >
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
      </header>

      {/* mobile menu overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-0 z-40 flex flex-col bg-[#0a0a0a] text-white lg:hidden"
          >
            <motion.nav
              aria-label="Mobile"
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              className="flex flex-1 flex-col items-start justify-center gap-8 px-10"
            >
              {LINKS.map((l) => {
                const isActive = activeId === l.href.slice(1);
                return (
                  <a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    aria-current={isActive ? "true" : undefined}
                    className={`font-display text-4xl font-extrabold tracking-tight transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current ${
                      isActive ? "text-accent" : "text-white/80 hover:text-white"
                    }`}
                  >
                    {l.label}
                  </a>
                );
              })}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
