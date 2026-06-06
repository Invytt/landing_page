import {
  Users,
  MailOpen,
  Sparkles,
  Store,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ScrollRevealText } from "@/components/ScrollRevealText";

type Feature = {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  desc: string;
  bg: string;
  dark: boolean; // dark bg → light text
  big?: boolean; // hero tile — larger title on desktop bento
  area: string; // md bento placement
};

const FEATURES: Feature[] = [
  {
    Icon: Users,
    title: "Guest RSVP Management",
    desc: "Invites, guestlists, +1s, WhatsApp RSVPs, reminders, and cost-splitting all in one dashboard.",
    bg: "#9b8cdb",
    dark: true,
    big: true,
    area: "md:col-span-3 md:col-start-1 md:row-span-2 md:row-start-1",
  },
  {
    Icon: Sparkles,
    title: "Smart Inventory Management",
    desc: "AI sizes food, drink, and supplies to your guest count with contributions and cost estimates.",
    bg: "#221c3a",
    dark: true,
    big: true,
    area: "md:col-span-3 md:col-start-4 md:row-span-2 md:row-start-1",
  },
  {
    Icon: MailOpen,
    title: "Invitation Design & Templates",
    desc: "Beautiful, customisable invites that feel personal ready in minutes.",
    bg: "#f3b53f",
    dark: false,
    area: "md:col-span-2 md:col-start-1 md:row-span-2 md:row-start-3",
  },
  {
    Icon: Store,
    title: "Vendor Marketplace",
    desc: "Discover and book caterers, decorators, photographers, DJs, and more with verified reviews.",
    bg: "#e2703a",
    dark: true,
    area: "md:col-span-2 md:col-start-3 md:row-span-2 md:row-start-3",
  },
  {
    Icon: ClipboardList,
    title: "Party Planning Management",
    desc: "Tasks, timelines, and budgets in one hub co-plan with co-hosts.",
    bg: "#fff7e9",
    dark: false,
    area: "md:col-span-2 md:col-start-5 md:row-span-2 md:row-start-3",
  },
];

function FeatureBody({ f }: { f: Feature }) {
  const fg = f.dark ? "text-white" : "text-black";
  const sub = f.dark ? "text-white/80" : "text-black/65";
  return (
    <>
      <f.Icon
        className={`size-7 ${fg} transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110`}
      />
      <div>
        <h3
          className={`font-display font-medium leading-snug ${fg} text-xl ${
            f.big ? "lg:text-3xl" : "lg:text-2xl"
          }`}
        >
          {f.title}
        </h3>
        <p className={`mt-2 text-sm leading-relaxed ${sub}`}>{f.desc}</p>
      </div>
    </>
  );
}

export default function FeaturedIn() {
  return (
    <section
      id="features"
      className="flex min-h-screen flex-col justify-center border-t border-white/10 bg-[#1a1a1a] px-5 py-10 text-white sm:py-24"
    >
      <div className="mx-auto mb-6 w-full max-w-7xl sm:mb-12">
        <Reveal>
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-accent sm:mb-6">
            The platform
          </p>
        </Reveal>
        <ScrollRevealText
          text="Five pillars. One platform."
          className="flex max-w-3xl flex-wrap font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl"
        />
        <Reveal>
          <p className="mt-4 hidden max-w-2xl text-base text-white/60 sm:mt-6 sm:block sm:text-lg">
            Every part of the hosting journey from the moment you decide to
            throw something to the moment the last guest leaves in a single
            mobile-first experience.
          </p>
        </Reveal>
      </div>

      {/* mobile: horizontal swipe carousel (same pattern as how-it-works) */}
      <div className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] lg:hidden [&::-webkit-scrollbar]:hidden">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className="group flex w-[78%] shrink-0 snap-center flex-col gap-3 rounded-2xl p-6 shadow-sm"
            style={{ backgroundColor: f.bg }}
          >
            <FeatureBody f={f} />
          </div>
        ))}
      </div>
      <p className="mt-3 text-center text-[11px] uppercase tracking-widest text-white/30 lg:hidden">
        swipe ✦
      </p>

      {/* md+: bento grid */}
      <div className="mx-auto hidden w-full max-w-7xl auto-rows-[minmax(15rem,1fr)] grid-cols-6 grid-rows-4 gap-5 lg:grid">
        {FEATURES.map((f) => (
          <div
            key={f.title}
            className={`group flex flex-col justify-between rounded-3xl p-8 transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/30 ${f.area}`}
            style={{ backgroundColor: f.bg }}
          >
            <FeatureBody f={f} />
          </div>
        ))}
      </div>

      <Reveal className="mx-auto mt-6 w-full max-w-7xl sm:mt-10">
        <a
          href="#tickets"
          className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-accent"
        >
          Get early access
          <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
        </a>
      </Reveal>
    </section>
  );
}
