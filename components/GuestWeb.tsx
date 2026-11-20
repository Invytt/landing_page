"use client";

import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "motion/react";
import { Link2, MessageCircle, Smartphone } from "lucide-react";
import { Eyebrow, Reveal, Stamp, Words, useCalm } from "@/components/ui/kit";
import { Browser, Phone } from "@/components/ui/phone";
import { DepthField, Parallax } from "@/components/ui/depth";

import { GuestWebPage } from "@/components/screens";

export default function GuestWeb() {
  const ref = useRef<HTMLDivElement>(null);
  const calm = useCalm();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const browserY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const browserRot = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -6]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [90, -70]);
  const phoneRot = useTransform(scrollYProgress, [0, 1], [-14, 8]);
  const inView = useInView(ref, { once: true, amount: 0.55 });

  return (
    <section id="guests" className="relative isolate overflow-hidden bg-paper py-24 lg:py-32">
      <DepthField seed={61} count={8} />
      <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 sm:px-8 lg:grid-cols-[0.85fr_1.15fr]">
        <Parallax speed={0.1}>
          <Eyebrow>For your guests</Eyebrow>
          <h2 className="display mt-4 text-[clamp(2.4rem,5vw,4.4rem)] text-ink">
            <Words text="Guests *don’t need* the app." />
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted">
            Share one link. It opens as a web page with the invite, the details
            and the RSVP buttons, on any phone or laptop.
          </p>
          <ul className="mt-8 space-y-3">
            {[
              { I: Link2, t: "One link for the whole guest list" },
              { I: MessageCircle, t: "Drop it in WhatsApp, a story or a text" },
              { I: Smartphone, t: "They confirm with a one-time code, no account needed" },
            ].map(({ I, t }, i) => (
              <Reveal key={t} delay={i * 0.08}>
                <li className="flex items-center gap-3 text-lg font-semibold text-ink">
                  <span className="stk-sm flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-tint">
                    <I size={18} strokeWidth={2.4} />
                  </span>
                  {t}
                </li>
              </Reveal>
            ))}
          </ul>
        </Parallax>

        <div ref={ref} className="relative" style={{ perspective: 1600 }}>
          {/* the browser keeps its right side clear, so the phone covers nothing */}
          <motion.div style={calm ? undefined : { y: browserY, rotateX: browserRot }}>
            <Browser url="invytt.com/e/rooftop-dinner">
              <div className="dots sm:pr-[210px]">
                <GuestWebPage
                  stamp={
                    (inView || calm) && (
                      <motion.span
                        initial={calm ? false : { scale: 3, opacity: 0, rotate: 12 }}
                        animate={{ scale: 1, opacity: 1, rotate: -7 }}
                        transition={{ type: "spring", stiffness: 380, damping: 16, delay: 0.25 }}
                        className="inline-block"
                      >
                        <Stamp color="var(--color-goingtext)" rotate={0} className="bg-going !px-4 !py-1.5 !text-lg">
                          Going
                        </Stamp>
                      </motion.span>
                    )
                  }
                />
              </div>
            </Browser>
          </motion.div>

          <motion.div
            style={calm ? undefined : { y: phoneY }}
            className="relative z-10 mx-auto mt-8 w-max sm:absolute sm:-right-3 sm:top-16 sm:mt-0 lg:-right-8"
          >
            <Phone
              label="The same invitation opened in a phone browser"
              className="[--ps:0.7] sm:[--ps:0.64]"
              ry={calm ? -16 : phoneRot}
            >
              <GuestWebPage compact />
            </Phone>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
