"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  Bot,
  Camera,
  Compass,
  Disc3,
  Gamepad2,
  IdCard,
  LayoutTemplate,
  Package,
  QrCode,
  Sparkles,
  UserPlus,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { Reveal, Tilt, Words, useCalm } from "@/components/ui/kit";
import { Phone } from "@/components/ui/phone";
import { Parallax } from "@/components/ui/depth";
import { useMedia, WIDE_QUERY } from "@/lib/perf";

import {
  CreateScreen,
  EventScreen,
  ExploreScreen,
  HomeScreen,
  PlansScreen,
  ProfileScreen,
} from "@/components/screens";
import { Av, AvStack, FauxQr } from "@/components/screens/parts";

const TOUR: { name: string; line: string; screen: ReactNode; tint: string }[] = [
  { name: "Home", line: "Tonight’s party, your next plans and people you may know.", screen: <HomeScreen />, tint: "#CDBEF7" },
  { name: "Create", line: "Name it, date it, then pick one of ten invite styles.", screen: <CreateScreen />, tint: "#FFD6A5" },
  { name: "Event page", line: "The invite, the RSVPs, chat, supplies, the pot and the playlist.", screen: <EventScreen />, tint: "#FF9A5C" },
  { name: "Explore", line: "See what’s on near you and who’s already going.", screen: <ExploreScreen />, tint: "#BFDDFB" },
  { name: "Plans", line: "Every plan you’ve said yes to, kept as a deck of tickets.", screen: <PlansScreen />, tint: "#8FD9B6" },
  { name: "Profile", line: "Your card in five styles, with a code to meet people in one scan.", screen: <ProfileScreen />, tint: "#F6C1D0" },
];
const N = TOUR.length;

/** One phone in the fan: flat in the middle, turned away at the sides. */
function FanPhone({ i, pos, open }: { i: number; pos: MotionValue<number>; open: MotionValue<number> }) {
  const d = useTransform([pos, open] as MotionValue[], ([p, o]) => (i - (p as number)) * (o as number));
  const x = useTransform(d, (v) => (v < 0 ? v * 320 : v * 215));
  const rotateY = useTransform(d, (v) => Math.max(-62, Math.min(62, -v * 36)));
  const z = useTransform(d, (v) => -Math.abs(v) * 200);
  const rotate = useTransform(d, (v) => v * 2.5);
  // dealt phones leave to the left and fade; the queue fades out at the far right
  const opacity = useTransform(d, (v) => (v < -0.45 ? Math.max(0, 1 + (v + 0.45) * 1.7) : v > 3.4 ? 0 : 1));
  return (
    <motion.div
      className="absolute left-[38%] top-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ x, z, rotate, opacity }}
    >
      <Phone
        label={`${TOUR[i].name} screen of the Invytt app`}
        className="short:[--ps:0.86] shorter:[--ps:0.74]"
        ry={rotateY}
      >
        {TOUR[i].screen}
      </Phone>
    </motion.div>
  );
}

/* ── feature wall ──────────────────────────────────────────────────────── */

type Feature = { Icon: LucideIcon; title: string; line: string; tint: string; demo: ReactNode; wide?: boolean };

const FEATURES: Feature[] = [
  {
    Icon: QrCode,
    title: "Meet by QR",
    line: "Scan a code at the party and you’re connected. Any phone camera works.",
    tint: "#CDBEF7",
    wide: true,
    demo: (
      <span className="relative block rounded-xl border-2 border-ink bg-white p-2">
        <FauxQr size={84} seed={7} />
        <i className="scanline absolute inset-x-1 h-[3px] rounded-full bg-coral" />
      </span>
    ),
  },
  {
    Icon: Gamepad2,
    title: "Invytt Games",
    line: "Eight party games everyone plays from their own phone.",
    tint: "#FF9A5C",
    demo: (
      <span className="flex items-end gap-1.5">
        {["#CDBEF7", "#8FD9B6", "#FFD6A5"].map((c, i) => (
          <i
            key={c}
            className="lit bob block h-12 w-9 rounded-lg border-2 border-ink"
            style={{ background: c, ["--bob" as string]: `${2.2 + i * 0.5}s`, ["--r" as string]: `${(i - 1) * 8}deg` }}
          />
        ))}
      </span>
    ),
  },
  {
    Icon: Bot,
    title: "Host & Party companion",
    line: "A helper in the event chat for the host, and one for every guest.",
    tint: "#8FD9B6",
    demo: (
      <span className="typing flex gap-1.5 rounded-2xl rounded-bl-sm border-2 border-ink bg-white px-4 py-3">
        <i className="h-2 w-2 rounded-full bg-ink" />
        <i className="h-2 w-2 rounded-full bg-ink" />
        <i className="h-2 w-2 rounded-full bg-ink" />
      </span>
    ),
  },
  {
    Icon: Sparkles,
    title: "Event coach",
    line: "Stuck on the wording? Get a sharper title and description.",
    tint: "#FFD6A5",
    demo: (
      <span className="flex flex-col gap-1 text-xs font-medium">
        <span className="rounded-full border-2 border-ink bg-white px-2.5 py-1 line-through decoration-coral decoration-2">Dinner at mine</span>
        <span className="wiggle rounded-full border-2 border-ink bg-coral px-2.5 py-1 text-white">Rooftop dinner</span>
      </span>
    ),
  },
  {
    Icon: Package,
    title: "AI supply list",
    line: "Food, drink and supplies sized to your guest count.",
    tint: "#BFDDFB",
    demo: (
      <span className="flex flex-col gap-1 text-xs font-medium">
        {["Samosas · 40", "Soft drinks · 9 L", "Plates · 24"].map((t, i) => (
          <span key={t} className="flyin rounded-full border-2 border-ink bg-white px-2.5 py-1" style={{ ["--fx" as string]: "40px", ["--fy" as string]: "0px", ["--fr" as string]: "6deg", ["--tr" as string]: "0deg", animationDelay: `${i * 0.25}s` }}>
            {t}
          </span>
        ))}
      </span>
    ),
  },
  {
    Icon: Wallet,
    title: "Group pot",
    line: "Split the bill and see who has paid at a glance.",
    tint: "#F6C1D0",
    demo: (
      <span className="block w-28">
        <span className="display block text-3xl leading-none">₹8,200</span>
        <span className="mt-2 block h-3 overflow-hidden rounded-full border-2 border-ink bg-white">
          <i className="block h-full w-[72%] bg-statusgreen" />
        </span>
        <span className="mt-1 block text-[11px] font-medium">72% collected</span>
      </span>
    ),
  },
  {
    Icon: Disc3,
    title: "Event track",
    line: "Give the party a song. Guests hear it on the invite.",
    tint: "#1F0B0C",
    demo: (
      <span className="spin-slow flex h-20 w-20 items-center justify-center rounded-full border-2 border-paper/80 bg-night2" style={{ backgroundImage: "repeating-radial-gradient(circle, transparent 0 5px, rgb(255 255 255 / 0.08) 5px 6px)" }}>
        <i className="h-6 w-6 rounded-full border-2 border-ink bg-coral" />
      </span>
    ),
  },
  {
    Icon: Camera,
    title: "Photo dump",
    line: "Everyone’s photos in one place, plus a highlight video after.",
    tint: "#8FD9B6",
    wide: true,
    demo: (
      <span className="relative block h-24 w-36">
        {[
          { c: "#FFD6A5", r: -10, l: 0 },
          { c: "#CDBEF7", r: 4, l: 34 },
          { c: "#F6C1D0", r: 12, l: 68 },
        ].map((p) => (
          <i key={p.l} className="absolute top-1 block h-[84px] w-[68px] rounded-md border-2 border-ink bg-white p-1.5 pb-4 " style={{ left: p.l, rotate: `${p.r}deg` }}>
            <b className="lit block h-full w-full rounded-sm border-[1.5px] border-ink" style={{ background: p.c }} />
          </i>
        ))}
      </span>
    ),
  },
  {
    Icon: LayoutTemplate,
    title: "10 event styles",
    line: "Poster, Ticket, Invitation, Editorial, Bento, Zine, Receipt, Thread, Calendar, Record.",
    tint: "#FFD6A5",
    wide: true,
    demo: (
      <span className="flex max-w-[190px] flex-wrap gap-1 text-[11px] font-medium">
        {["Poster", "Ticket", "Zine", "Receipt", "Record"].map((t, i) => (
          <span key={t} className={`rounded-full border-2 border-ink px-2 py-0.5 ${i === 1 ? "bg-coral text-white" : "bg-white"}`}>
            {t}
          </span>
        ))}
      </span>
    ),
  },
  {
    Icon: IdCard,
    title: "5 profile cards",
    line: "Classic, Member pass, Scrapbook, Editorial or Bento.",
    tint: "#CDBEF7",
    demo: (
      <span className="block w-28 overflow-hidden rounded-xl border-2 border-ink bg-white ">
        <span className="block bg-coral px-2 py-1 text-[8px] font-medium tracking-[0.14em] text-white">MEMBER PASS</span>
        <span className="flex items-center gap-1.5 p-2 text-xs font-medium">
          <Av i={2} s={26} /> Asha
        </span>
      </span>
    ),
  },
  {
    Icon: Compass,
    title: "Explore",
    line: "Find what’s on near you this weekend.",
    tint: "#BFDDFB",
    demo: (
      <span className="flex flex-col gap-1 text-xs font-medium">
        <span className="rounded-full border-2 border-ink bg-ink px-2.5 py-1 text-paper">Tonight</span>
        <span className="rounded-full border-2 border-ink bg-white px-2.5 py-1">Game nights</span>
      </span>
    ),
  },
  {
    Icon: UserPlus,
    title: "Friends & feed",
    line: "Add the people you meet and see what they’re hosting next.",
    tint: "#F6C1D0",
    wide: true,
    demo: (
      <span className="flex flex-col items-start gap-2">
        <AvStack ids={[1, 5, 9, 12]} s={30} />
        <span className="rounded-full border-2 border-ink bg-statusgreen px-3 py-1 text-xs font-medium text-ink ">
          Add friend
        </span>
      </span>
    ),
  },
];

function FeatureTile({ f, i }: { f: Feature; i: number }) {
  const dark = f.tint === "#1F0B0C";
  return (
    <motion.li
      className={f.wide ? "sm:col-span-2" : ""}
      initial={{ opacity: 0, y: 40, rotateX: 50 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.75, delay: (i % 4) * 0.07, ease: [0.16, 1, 0.3, 1] }}
      style={{ transformPerspective: 1000 }}
    >
      {/* tiles drift at slightly different rates, so the wall feels layered */}
      <Parallax speed={[0.03, 0.09, 0.05, 0.11][i % 4]} className="h-full">
      <Tilt max={9} className="h-full rounded-[26px]">
        <article
          className={`lit stk flex h-full min-h-[230px] flex-col justify-between gap-5 rounded-[26px] p-5 ${dark ? "text-paper" : "text-ink"}`}
          style={{ background: f.tint }}
        >
          <div className="flex items-start justify-between gap-3">
            <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-ink ${dark ? "bg-coral text-white" : "bg-white"}`}>
              <f.Icon size={20} strokeWidth={2.3} />
            </span>
            <div aria-hidden style={{ transform: "translateZ(30px)" }}>
              {f.demo}
            </div>
          </div>
          <div>
            <h3 className="display text-2xl xl:text-3xl">{f.title}</h3>
            <p className={`mt-2 text-[15px] leading-snug ${dark ? "text-nightmuted" : "text-ink/75"}`}>{f.line}</p>
          </div>
        </article>
      </Tilt>
      </Parallax>
    </motion.li>
  );
}

export default function InsideApp() {
  const ref = useRef<HTMLDivElement>(null);
  const calm = useCalm();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const pos = useSpring(
    useTransform(scrollYProgress, [0.12, 0.95], [0, N - 1], { clamp: true }),
    { stiffness: 110, damping: 24, mass: 0.5 },
  );
  const open = useSpring(useTransform(scrollYProgress, [0, 0.1], [0.12, 1], { clamp: true }), {
    stiffness: 120,
    damping: 20,
  });
  const [active, setActive] = useState(0);
  useMotionValueEvent(pos, "change", (v) => setActive(Math.min(N - 1, Math.max(0, Math.round(v)))));
  // build only the layout that fits the screen (both until mounted)
  const wide = useMedia(WIDE_QUERY);
  const desk = !calm && wide !== false;
  const mob = calm || wide !== true;

  const header = (
    <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
      <h2 className="display text-[clamp(2.4rem,5.4vw,4.6rem)] text-ink">
        <Words text="The whole party, in your pocket." />
      </h2>
    </div>
  );

  return (
    <section id="inside" className="lit relative isolate overflow-x-clip bg-paper2">
      {/* ── desktop: six phones fan out, scroll walks through them ── */}
      <div ref={ref} className={calm ? "hidden" : "relative hidden h-[460vh] lg:block"}>
        {desk && (
        <div className="sticky top-0 isolate grid h-screen grid-cols-[minmax(320px,0.8fr)_1.7fr] items-center overflow-hidden pt-20 shorter:pt-0">
          <div className="relative z-10 pl-8 xl:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]">
            <h2 className="display text-[clamp(2.2rem,3.2vw,3.3rem)] text-ink">
              <Words text="The whole party, in your pocket." />
            </h2>
            <p className="display mt-8 flex items-baseline gap-3 text-ink short:mt-5">
              <span className="text-6xl text-coral tabular-nums">0{active + 1}</span>
              <span className="text-2xl text-muted">/ 0{N}</span>
            </p>
            <p className="mt-3">
              <span
                className="lit stk-sm inline-block rounded-full px-4 py-1.5 text-base font-medium transition-colors duration-300"
                style={{ background: TOUR[active].tint }}
              >
                {TOUR[active].name}
              </span>
            </p>
            <p className="mt-4 min-h-[5.5rem] max-w-sm text-xl leading-snug text-ink">{TOUR[active].line}</p>
            <div className="mt-6 flex max-w-sm gap-2 short:mt-3">
              {TOUR.map((t, i) => (
                <span
                  key={t.name}
                  className={`h-3 flex-1 rounded-full border-2 border-ink transition-colors duration-300 ${
                    i === active ? "bg-coral" : i < active ? "bg-ink" : "bg-white"
                  }`}
                />
              ))}
            </div>
          </div>
          <div className="relative h-full" style={{ perspective: 1800 }}>
            <div className="preserve-3d absolute inset-0">
              {TOUR.map((_, i) => (
                <FanPhone key={i} i={i} pos={pos} open={open} />
              ))}
            </div>
          </div>
        </div>
        )}
      </div>

      {/* ── phones and tablets: swipe through the screens ── */}
      {mob && (
      <div className={calm ? "pt-20" : "pt-20 lg:hidden"}>
        <Parallax speed={0.08}>{header}</Parallax>
        <div
          aria-label="Screens of the Invytt app"
          className="no-scrollbar mt-10 flex snap-x snap-mandatory gap-6 overflow-x-auto px-[12vw] pb-6"
        >
          {TOUR.map((t) => (
            <figure key={t.name} className="flex w-[240px] shrink-0 snap-center flex-col items-center">
              <Phone label={`${t.name} screen of the Invytt app`} className="[--ps:0.8]" sway>
                {t.screen}
              </Phone>
              <figcaption className="mt-5 text-center">
                <span className="lit stk-sm inline-block rounded-full px-3.5 py-1 text-sm font-medium" style={{ background: t.tint }}>
                  {t.name}
                </span>
                <span className="mt-2 block text-[15px] leading-snug text-muted">{t.line}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      )}

      {/* ── feature wall ── */}
      <div className="relative isolate mx-auto max-w-7xl px-5 pb-24 pt-16 sm:px-8 lg:pb-32 lg:pt-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h3 className="display text-[clamp(2rem,4vw,3.2rem)] text-ink">
            And a dozen things that make the night.
          </h3>
        </Reveal>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((f, i) => (
            <FeatureTile key={f.title} f={f} i={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
