"use client";

import { useEffect, useState } from "react";
import { useJoined } from "@/lib/waitlist-joined";

/**
 * Phones only: once the hero's form has scrolled away, a "Get early access"
 * bar sits in thumb reach at the bottom of the screen. It steps aside while
 * another form is on screen, and for anyone already on the list.
 */
export default function StickyJoin() {
  const joined = useJoined();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const ids = ["hero-form", "join", "tickets"];
    const targets = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!targets.length || typeof IntersectionObserver === "undefined") return;
    const visible = new Map<string, boolean>();
    let heroPassed = false;
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        visible.set(e.target.id, e.isIntersecting);
        if (e.target.id === "hero-form" && !e.isIntersecting) {
          heroPassed = e.boundingClientRect.top < 0;
        }
      }
      setShow(heroPassed && ![...visible.values()].some(Boolean));
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  if (joined) return null;

  return (
    <div
      className={`fixed inset-x-3 bottom-3 z-50 transition-transform duration-300 motion-reduce:transition-none lg:hidden ${
        show ? "translate-y-0" : "pointer-events-none translate-y-[160%]"
      }`}
      style={{ marginBottom: "env(safe-area-inset-bottom)" }}
      aria-hidden={!show}
    >
      <a href="#tickets" tabIndex={show ? 0 : -1} className="stk-btn w-full bg-coral text-white">
        Get early access
      </a>
    </div>
  );
}
