"use client";

import SilverWordmark from "@/components/ui/SilverWordmark";
import { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { Parallax } from "@/components/ui/depth";
import { COMPANY } from "@/app/data";
import { ArrowRight, PartyPopper, Sparkles } from "lucide-react";
import { Magnetic, Spark } from "@/components/ui/kit";

type IconProps = { className?: string };

const NAV = [
  { label: "Features", href: "#features" },
  { label: "Who it's for", href: "#about" },
  { label: "How it works", href: "#how-it-works" },
  { label: "FAQ", href: "#faq" },
  { label: "Get early access", href: "#tickets" },
];

const Instagram = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 1.62c-3.15 0-3.5.01-4.74.07-1.14.05-1.76.24-2.17.4-.55.21-.94.47-1.35.88-.41.41-.67.8-.88 1.35-.16.41-.35 1.03-.4 2.17-.06 1.24-.07 1.59-.07 4.74s.01 3.5.07 4.74c.05 1.14.24 1.76.4 2.17.21.55.47.94.88 1.35.41.41.8.67 1.35.88.41.16 1.03.35 2.17.4 1.24.06 1.59.07 4.74.07s3.5-.01 4.74-.07c1.14-.05 1.76-.24 2.17-.4.55-.21.94-.47 1.35-.88.41-.41.67-.8.88-1.35.16-.41.35-1.03.4-2.17.06-1.24.07-1.59.07-4.74s-.01-3.5-.07-4.74c-.05-1.14-.24-1.76-.4-2.17a3.6 3.6 0 0 0-.88-1.35 3.6 3.6 0 0 0-1.35-.88c-.41-.16-1.03-.35-2.17-.4-1.24-.06-1.59-.07-4.74-.07Zm0 2.76a5.46 5.46 0 1 1 0 10.92 5.46 5.46 0 0 1 0-10.92Zm0 9a3.54 3.54 0 1 0 0-7.08 3.54 3.54 0 0 0 0 7.08Zm6.95-9.22a1.28 1.28 0 1 1-2.55 0 1.28 1.28 0 0 1 2.55 0Z" />
  </svg>
);
const XIcon = ({ className }: IconProps) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.22-6.82-5.97 6.82H1.66l7.73-8.84L1.24 2.25h6.83l4.71 6.23 5.46-6.23Zm-1.16 17.52h1.83L7.01 4.13H5.04l12.04 15.64Z" />
  </svg>
);

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/invytt?obrf=dm4zbm5lY2cyZ2Nq&utm_source=qr",
    Icon: Instagram,
  },
  { label: "X", href: "https://x.com/invyttt?s=11", Icon: XIcon },
];

const LETTERS = "invytt".split("");
// how far each letter starts below its line, so they arrive at different speeds
const LIFT = [140, 260, 90, 320, 180, 230];

/** On the coming-soon page (`soon`), the big button leads back to what's in the app now. */
export default function Footer({ base = "", soon = false }: { base?: string; soon?: boolean }) {
  const word = useRef<HTMLDivElement>(null);
  // 0 as the wordmark enters, 1 when the page bottoms out: the letters settle
  // into one line exactly at the end of the page
  const { scrollYProgress } = useScroll({ target: word, offset: ["start end", "end end"] });
  return (
    <footer className="on-night relative overflow-hidden border-t-2 border-ink bg-night px-5 pt-16 text-paper sm:px-8">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-[1.5fr_1fr_1fr]">
        {/* brand */}
        <div className="col-span-2 lg:col-span-1">
          <SilverWordmark className="w-40" land={false} delay={0.4} />
          <p className="display mt-5 max-w-sm text-3xl text-paper">
            The all-in-one platform for <em>hosting events.</em>
          </p>
          <p className="mt-4 max-w-sm text-base leading-relaxed text-nightmuted">
            Invites, RSVPs, AI inventory planning, a vendor marketplace, and
            cost-splitting all in one app.
          </p>
          <a
            href={`mailto:${COMPANY.email}`}
            className="mt-5 inline-block text-base font-bold text-paper underline decoration-coral decoration-2 underline-offset-4"
          >
            {COMPANY.email}
          </a>
          {/* the main way between the two pages */}
          <Magnetic className="mt-7 block w-max">
            <a
              href={soon ? "/" : "/coming-soon"}
              className={`group flex items-center gap-4 rounded-[22px] border-2 border-ink py-3 pl-3 pr-5 text-ink shadow-[5px_5px_0_#000] transition-transform hover:-translate-y-0.5 ${
                soon ? "bg-mint" : "bg-sand"
              }`}
            >
              <span
                className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-ink text-white transition-transform duration-300 group-hover:rotate-90 ${
                  soon ? "bg-goingtext" : "bg-coral"
                }`}
              >
                {soon ? <PartyPopper size={22} strokeWidth={2.4} /> : <Sparkles size={22} strokeWidth={2.4} />}
              </span>
              <span className="leading-tight">
                <span className="block text-xs font-bold uppercase tracking-[0.16em] text-ink/70">
                  {soon ? "In the app at launch" : "Coming soon"}
                </span>
                <span className="display block text-2xl">
                  {soon ? <>See what&rsquo;s here now</> : <>See what&rsquo;s next</>}
                </span>
              </span>
              <ArrowRight size={20} strokeWidth={2.6} className="transition-transform group-hover:translate-x-1" />
            </a>
          </Magnetic>
          <div className="mt-6 flex gap-3">
            {SOCIALS.map(({ label, href, Icon }) => (
              <Magnetic key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-paper text-ink shadow-[3px_3px_0_#000] transition-colors hover:bg-coral hover:text-white"
                >
                  <Icon className="h-5 w-5" />
                </a>
              </Magnetic>
            ))}
          </div>
        </div>

        {/* navigation */}
        <div>
          <p className="eyebrow text-nightmuted">Navigate</p>
          <ul className="mt-5 flex flex-col gap-3 text-lg">
            {NAV.map(({ label, href }) => (
              <li key={href}>
                <a href={base + href} className="font-semibold text-paper transition-colors hover:text-peach">
                  {label}
                </a>
              </li>
            ))}

          </ul>
        </div>
        <div>
          <p className="eyebrow text-nightmuted">Legal</p>
          <ul className="mt-5 flex flex-col gap-3 text-lg">
            <li>
              <a href="/help" target="_blank" rel="noopener noreferrer" className="font-semibold text-paper transition-colors hover:text-peach">
                Help &amp; FAQ
              </a>
            </li>
            <li>
              <a href="/privacy" target="_blank" rel="noopener noreferrer" className="font-semibold text-paper transition-colors hover:text-peach">
                Privacy policy
              </a>
            </li>
            <li>
              <a href="/terms" target="_blank" rel="noopener noreferrer" className="font-semibold text-paper transition-colors hover:text-peach">
                Terms of service
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-14 max-w-7xl text-sm text-nightmuted">
        © {COMPANY.legalName}, {COMPANY.year}
      </p>

      {/* giant wordmark: each letter rises into place */}
      <div ref={word} aria-hidden className="relative mx-auto mt-6 flex max-w-7xl justify-center pb-[3vw] pt-[4vw]">
        <Parallax progress={scrollYProgress} range={[-120, 0]} className="absolute left-[13%] top-[1vw]">
          <Spark className="spin-slow h-[5vw] w-[5vw] text-coral" />
        </Parallax>
        <Parallax progress={scrollYProgress} range={[200, 0]} className="absolute right-[11%] top-[5vw]">
          <Spark className="spin-slow h-[3vw] w-[3vw] text-sand" style={{ animationDuration: "10s" }} />
        </Parallax>
        {LETTERS.map((ch, i) => (
          <Parallax key={i} progress={scrollYProgress} range={[LIFT[i], 0]}>
            <motion.span
              initial={{ opacity: 0, rotate: i % 2 ? 10 : -10 }}
              whileInView={{ opacity: 1, rotate: 0 }}
              whileHover={{ y: "-6%", rotate: i % 2 ? 4 : -4, color: "#D2402A" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ type: "spring", stiffness: 140, damping: 14, delay: i * 0.08 }}
              className="display inline-block cursor-default text-[27vw] leading-[0.9] text-paper lg:text-[22rem]"
            >
              {ch}
            </motion.span>
          </Parallax>
        ))}
      </div>
    </footer>
  );
}
