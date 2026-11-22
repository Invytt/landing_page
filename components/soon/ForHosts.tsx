"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Camera, CakeSlice, CreditCard, MapPin, Ticket, Wallet } from "lucide-react";
import { Confetti, Eyebrow, Stamp, Tilt, Words } from "@/components/ui/kit";
import { DepthField, Parallax } from "@/components/ui/depth";
import { FauxQr } from "@/components/screens/parts";

const TIERS = [
  { t: "Early Bird", p: "₹499", c: "#8FD9B6" },
  { t: "General", p: "₹799", c: "#CDBEF7" },
  { t: "VIP", p: "₹1,999", c: "#FFD6A5" },
];

/** Tiers fan out; pick one and the stub tears off. */
function TicketDemo() {
  const [pick, setPick] = useState<number | null>(null);
  return (
    <div className="relative">
      <div className="flex flex-wrap gap-2">
        {TIERS.map((t, i) => (
          <button
            key={t.t}
            type="button"
            onClick={() => setPick(i)}
            aria-pressed={pick === i}
            className={`rounded-full border-2 border-ink px-3.5 py-1.5 text-sm font-medium transition-transform ${pick === i ? "-translate-y-0.5 " : "bg-white"}`}
            style={pick === i ? { background: t.c } : undefined}
          >
            {t.t} · {t.p}
          </button>
        ))}
      </div>
      <div className="relative mt-5 flex">
        <div className="flex-1 rounded-l-[20px] border-2 border-r-0 border-ink bg-white p-4">
          <p className="eyebrow text-muted">Admit one</p>
          <p className="display mt-1 text-3xl leading-none">Rooftop open air night</p>
          <p className="mt-2 text-sm font-medium">{pick === null ? "Pick a tier" : `${TIERS[pick].t} · ${TIERS[pick].p}`}</p>
        </div>
        <motion.div
          animate={pick === null ? { x: 0, y: 0, rotate: 0 } : { x: 14, y: 16, rotate: 8 }}
          transition={{ type: "spring", stiffness: 180, damping: 12 }}
          className="relative flex w-[104px] origin-top-left items-center justify-center rounded-r-[20px] border-2 border-ink bg-coral p-2"
        >
          <span aria-hidden className="tear-y absolute bottom-3 left-0 top-3 opacity-70" />
          <span className="rounded-xl border-2 border-ink bg-paper p-1.5">
            <FauxQr size={60} seed={41} />
          </span>
          {pick !== null && <Confetti key={pick} count={18} spread={140} />}
        </motion.div>
      </div>
    </div>
  );
}

function BookingsDemo() {
  const rows = [
    { I: Camera, t: "Frame & Flash Studio", s: "Confirmed", c: "#D8F5EC" },
    { I: CakeSlice, t: "Chocolate truffle cake", s: "On the way", c: "#FFD6A5" },
    { I: Ticket, t: "2 × General", s: "Ticket", c: "#CDBEF7" },
  ];
  return (
    <div className="space-y-2">
      {rows.map(({ I, t, s, c }, i) => (
        <motion.div
          key={t}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, type: "spring", stiffness: 220, damping: 20 }}
          className="flex items-center gap-3 rounded-2xl border-2 border-ink bg-white px-3 py-2"
        >
          <I size={18} strokeWidth={2.3} />
          <span className="flex-1 text-sm font-medium">{t}</span>
          <span className="lit rounded-full border-2 border-ink px-2.5 py-0.5 text-xs font-medium" style={{ background: c }}>
            {s}
          </span>
        </motion.div>
      ))}
      <div className="flex gap-2 pt-1">
        <span className="flex items-center gap-1.5 rounded-full border-2 border-ink bg-ink px-3 py-1 text-xs font-medium text-paper">
          <CreditCard size={12} strokeWidth={2.6} /> Saved cards
        </span>
        <span className="flex items-center gap-1.5 rounded-full border-2 border-ink bg-white px-3 py-1 text-xs font-medium">
          <MapPin size={12} strokeWidth={2.6} /> Saved addresses
        </span>
      </div>
    </div>
  );
}

function Tile({
  title,
  line,
  tint,
  Icon,
  children,
  className,
  speed,
}: {
  title: string;
  line: string;
  tint: string;
  Icon: typeof Wallet;
  children: React.ReactNode;
  className?: string;
  speed: number;
}) {
  return (
    <Parallax speed={speed} className={className}>
      <Tilt max={5} className="h-full rounded-[30px]">
        <article className="lit stk-lg flex h-full flex-col gap-6 rounded-[30px] p-6 text-ink sm:p-7" style={{ background: tint }}>
          <div className="flex items-start justify-between gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-ink bg-white">
              <Icon size={22} strokeWidth={2.3} />
            </span>
            <Stamp rotate={5} className="bg-white/60">Coming soon</Stamp>
          </div>
          <div>
            <h3 className="display text-4xl">{title}</h3>
            <p className="mt-2 text-base leading-relaxed text-ink/80">{line}</p>
          </div>
          <div className="mt-auto">{children}</div>
        </article>
      </Tilt>
    </Parallax>
  );
}

export default function ForHosts() {
  return (
    <section id="for-hosts" className="lit relative isolate overflow-hidden bg-paper2 py-24 lg:py-32">
      <DepthField seed={131} count={10} />
      <Parallax speed={0.1} className="mx-auto max-w-3xl px-5 text-center sm:px-8">
        <Eyebrow className="justify-center">For hosts</Eyebrow>
        <h2 className="display mt-4 text-[clamp(2.4rem,5.4vw,4.6rem)] text-ink">
          <Words text="The extras that *round it out.*" />
        </h2>
      </Parallax>
      <div className="mx-auto mt-14 grid max-w-6xl gap-6 px-5 sm:px-8 md:grid-cols-2">
        <Tile
          speed={0.05}
          title="Ticketed events"
          line="Sell tickets to your public events, with tiers and payouts to you. Pick a tier to try it."
          tint="#F6C1D0"
          Icon={Ticket}
        >
          <TicketDemo />
        </Tile>
        <Tile
          speed={0.12}
          title="Bookings & payments"
          line="Your bookings, tickets, payment methods and addresses, kept in your profile."
          tint="#8FD9B6"
          Icon={Wallet}
        >
          <BookingsDemo />
        </Tile>
      </div>
    </section>
  );
}
