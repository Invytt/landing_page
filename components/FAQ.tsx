"use client";

import { useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { Plus } from "lucide-react";
import { COMPANY, FAQ_GROUPS } from "@/app/data";
import { Eyebrow, Words } from "@/components/ui/kit";
import { DepthField, Parallax } from "@/components/ui/depth";

/** FAQ, grouped by topic: pick a topic, then open a question. */
export default function FaqSection() {
  const [groupId, setGroupId] = useState(FAQ_GROUPS[0].id);
  const [open, setOpen] = useState<number | null>(0);
  const group = FAQ_GROUPS.find((g) => g.id === groupId) ?? FAQ_GROUPS[0];

  const pick = (id: string) => {
    setGroupId(id);
    setOpen(0);
  };

  return (
    <section id="faq" className="relative isolate overflow-x-clip bg-paper py-24 lg:py-32">
      <DepthField seed={71} count={8} />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="lg:sticky lg:top-36 lg:self-start">
          <Eyebrow>FAQ</Eyebrow>
          <h2 className="display mt-4 text-[clamp(2.6rem,5.4vw,4.8rem)] text-ink">
            <Words text="We’ve got *answers*" />
          </h2>
          <p className="mt-5 max-w-sm text-lg leading-relaxed text-muted">
            Still curious? Write to{" "}
            <a href={`mailto:${COMPANY.email}`} className="font-bold text-ink underline decoration-coral decoration-2 underline-offset-4">
              {COMPANY.email}
            </a>
            .
          </p>

          {/* topics: a wrapping row of stickers on every screen size */}
          <LayoutGroup id="faq-topics">
            <div role="tablist" aria-label="FAQ topics" className="mt-8 flex flex-wrap gap-2.5">
              {FAQ_GROUPS.map((g) => {
                const on = g.id === group.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    role="tab"
                    id={`faq-tab-${g.id}`}
                    aria-selected={on}
                    aria-controls="faq-panel"
                    onClick={() => pick(g.id)}
                    className={`relative rounded-full border-2 border-ink px-4 py-2 text-[15px] font-bold transition-transform duration-150 ${
                      on ? "-translate-y-0.5 shadow-[3px_3px_0_var(--color-ink)]" : "bg-white hover:-translate-y-0.5"
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="faq-topic"
                        className="absolute inset-0 rounded-full"
                        style={{ background: g.tint }}
                        transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      />
                    )}
                    <span className="relative">
                      {g.label}
                      <span className="ml-1.5 text-muted">{g.items.length}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>

          <Parallax speed={0.3} spin={50} className="mt-10 hidden w-max lg:block">
            <span aria-hidden className="wiggle stk inline-flex h-24 w-24 items-center justify-center rounded-full bg-coral font-display text-6xl text-white">
              ?
            </span>
          </Parallax>
        </div>

        <div id="faq-panel" role="tabpanel" aria-labelledby={`faq-tab-${group.id}`}>
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={group.id}
              className="space-y-4"
              initial={{ opacity: 0, y: 24, rotateX: -8 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 1200 }}
            >
              {group.items.map((item, i) => {
                const isOpen = open === i;
                const id = `faq-${group.id}-${i}`;
                return (
                  <li
                    key={item.q}
                    className="stk rounded-[24px] transition-[background-color,transform] duration-200 hover:-translate-y-0.5"
                    style={{ background: isOpen ? group.tint : "#fff" }}
                  >
                    <h3>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        aria-controls={id}
                        onClick={() => setOpen(isOpen ? null : i)}
                        className="flex w-full items-center justify-between gap-5 rounded-[22px] p-5 text-left sm:p-6"
                      >
                        <span className="display text-2xl text-ink sm:text-[1.9rem]">{item.q}</span>
                        <motion.span
                          animate={{ rotate: isOpen ? 135 : 0 }}
                          transition={{ type: "spring", stiffness: 300, damping: 18 }}
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-ink ${isOpen ? "bg-ink text-paper" : "bg-coral text-white"}`}
                        >
                          <Plus size={22} strokeWidth={2.8} />
                        </motion.span>
                      </button>
                    </h3>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          id={id}
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-5 pb-6 text-lg leading-relaxed text-ink/85 sm:px-6">{item.a}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              })}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
