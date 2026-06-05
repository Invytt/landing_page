"use client";

import { useState } from "react";
import { FAQ } from "@/app/data";
import { Reveal } from "@/components/Reveal";

export default function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section id="faq" className="border-t border-white/10 flex min-h-screen flex-col justify-center bg-[#1a1a1a] px-5 py-16 text-white sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-8 sm:gap-12 md:grid-cols-[1fr_1.4fr]">
        <Reveal>
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-accent sm:mb-6">
            Questions?
          </p>
          <h2 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
            We&apos;ve got answers
          </h2>
          <p className="mt-4 max-w-sm text-base text-white/70 sm:mt-6 sm:text-lg">
            Everything you might be wondering about hosting with Invytt.
          </p>
        </Reveal>

        <div className="divide-y divide-white/10 border-t border-white/10">
          {FAQ.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={i}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left sm:gap-6 sm:py-6"
                >
                  <span className="font-display text-base font-semibold sm:text-lg md:text-xl">
                    {item.q}
                  </span>
                  <span
                    className={`shrink-0 text-2xl text-accent transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    isOpen ? "grid-rows-[1fr] pb-6" : "grid-rows-[0fr]"
                  }`}
                >
                  <p className="overflow-hidden pr-6 leading-relaxed text-white/60">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
