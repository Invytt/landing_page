import {
  ArrowLeft,
  Bell,
  CalendarDays,
  Camera,
  Check,
  ChefHat,
  Copy,
  Disc3,
  Flower2,
  ListChecks,
  MapPin,
  Plus,
  Wine,
  MessageCircle,
  Music2,
  Package,
  Search,
  Send,
  Share2,
  Sparkles,
  Users,
  Wallet,
  X,
} from "lucide-react";
import { Av, AvStack, Btn, Caps, Card, FauxQr, Pill, Screen, Title } from "./parts";

/* Web rebuilds of the Invytt app's screens, drawn with the same colours,
   type and sticker shapes as the app. Sample data throughout. */

/* ── Tab screens ───────────────────────────────────────────────────────── */

export function HomeScreen() {
  return (
    <Screen tab="home">
      <div className="flex items-start justify-between">
        <div>
          <Caps>Friday, 27 Nov</Caps>
          <Title className="mt-[2px]">Hey, Asha</Title>
        </div>
        <span className="mt-[4px] flex h-[32px] w-[32px] items-center justify-center rounded-full border-2 border-ink bg-white shadow-[2px_2px_0_#2B1719]">
          <Bell size={15} strokeWidth={2.4} />
        </span>
      </div>

      <Card tint="#1F0B0C" className="mt-[12px] text-white">
        <div className="flex items-center justify-between">
          <Pill tint="#3CCFBF">
            <i className="h-[6px] w-[6px] rounded-full bg-ink" /> LIVE
          </Pill>
          <span className="text-[9.5px] font-semibold text-white/70">14 here now</span>
        </div>
        <p className="mt-[8px] font-display text-[21px] leading-[1.05]">Game night</p>
        <p className="mt-[2px] text-[10px] text-white/70">Koramangala · started 8:10 PM</p>
        <div className="mt-[9px] flex items-center justify-between">
          <AvStack ids={[1, 4, 7, 9, 11]} />
          <span className="rounded-full border-2 border-ink bg-coral px-[12px] py-[4px] text-[10.5px] font-bold">
            Open
          </span>
        </div>
      </Card>

      <Caps className="mt-[14px]">Your plans</Caps>
      <Card tint="#CDBEF7" className="mt-[6px] flex items-center gap-[10px]">
        <div className="flex h-[42px] w-[40px] shrink-0 flex-col items-center justify-center rounded-[10px] border-2 border-ink bg-white leading-none">
          <span className="text-[8px] font-bold text-coral">FRI</span>
          <span className="font-display text-[19px]">4</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[12.5px] font-bold leading-[1.15]">Rooftop dinner</p>
          <p className="text-[10px] text-ink/70">8:00 PM · 12 going</p>
        </div>
        <AvStack ids={[2, 5, 8]} s={20} />
      </Card>
      <Card tint="#FFD6A5" className="mt-[8px] flex items-center gap-[10px]">
        <div className="flex h-[42px] w-[40px] shrink-0 flex-col items-center justify-center rounded-[10px] border-2 border-ink bg-white leading-none">
          <span className="text-[8px] font-bold text-coral">SUN</span>
          <span className="font-display text-[19px]">6</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-[12.5px] font-bold leading-[1.15]">Birthday bash</p>
          <p className="text-[10px] text-ink/70">3 days to go · You&rsquo;re hosting</p>
        </div>
      </Card>

      <Caps className="mt-[14px]">People you may know</Caps>
      <div className="mt-[6px] flex gap-[8px]">
        {[
          { n: "Meera", i: 3 },
          { n: "Kabir", i: 6 },
        ].map((p) => (
          <Card key={p.n} className="flex flex-1 flex-col items-center gap-[5px] !p-[8px]">
            <Av i={p.i} s={30} />
            <span className="text-[10.5px] font-bold">{p.n}</span>
            <Pill tint="#4CAF50" className="text-white">
              Add friend
            </Pill>
          </Card>
        ))}
      </div>
    </Screen>
  );
}

const STYLE_THUMBS = [
  { name: "Poster", bg: "#FF9A5C" },
  { name: "Ticket", bg: "#CDBEF7" },
  { name: "Invitation", bg: "#FBF6F4" },
  { name: "Editorial", bg: "#fff" },
  { name: "Zine", bg: "#F6C1D0" },
  { name: "Record", bg: "#1F0B0C" },
  { name: "Bento", bg: "#8FD9B6" },
  { name: "Receipt", bg: "#fff" },
  { name: "Thread", bg: "#BFDDFB" },
];

function StyleThumb({ name, bg, on }: { name: string; bg: string; on?: boolean }) {
  const dark = bg === "#1F0B0C";
  return (
    <div className="relative">
      <div
        className={`relative flex h-[92px] flex-col justify-between overflow-hidden rounded-[12px] border-2 border-ink p-[7px] ${
          on ? "shadow-[3px_3px_0_#D2402A]" : "shadow-[2px_2px_0_#2B1719]"
        }`}
        style={{ background: bg, color: dark ? "#fff" : "#2B1719" }}
      >
        {name === "Record" ? (
          <span className="mx-auto mt-[2px] flex h-[40px] w-[40px] items-center justify-center rounded-full border-2 border-white/80 bg-night2">
            <i className="h-[10px] w-[10px] rounded-full bg-coral" />
          </span>
        ) : name === "Bento" ? (
          <span className="grid grid-cols-2 gap-[3px]">
            <i className="h-[16px] rounded-[4px] border-[1.5px] border-ink bg-white" />
            <i className="h-[16px] rounded-[4px] border-[1.5px] border-ink bg-sand" />
          </span>
        ) : name === "Receipt" ? (
          <span className="block border-b-2 border-dotted border-ink pb-[4px] text-[7px] font-bold tracking-[0.14em]">
            ORDER NO. 12
          </span>
        ) : name === "Thread" ? (
          <span className="block w-max rounded-[8px] rounded-bl-[2px] border-[1.5px] border-ink bg-white px-[5px] py-[1px] text-[8px] font-bold">
            you in?
          </span>
        ) : name === "Ticket" ? (
          <span className="block border-b-2 border-dashed border-ink/50 pb-[5px] text-[7px] font-bold tracking-[0.14em]">
            ADMIT ONE
          </span>
        ) : name === "Editorial" ? (
          <span className="block border-b-2 border-ink pb-[3px] text-[7px] font-bold tracking-[0.14em]">
            ISSUE 04
          </span>
        ) : name === "Zine" ? (
          <span className="block w-max -rotate-3 bg-ink px-[4px] text-[8px] font-bold text-white">
            COME OVER
          </span>
        ) : name === "Invitation" ? (
          <span className="block text-center font-display text-[9px] italic text-coral">
            you&rsquo;re invited
          </span>
        ) : (
          <span className="block text-[7px] font-bold tracking-[0.14em]">FRI · 8 PM</span>
        )}
        <span className="font-display text-[14px] leading-[1]">
          Rooftop
          <br />
          dinner
        </span>
      </div>
      {on && (
        <span className="absolute -right-[5px] -top-[5px] flex h-[18px] w-[18px] items-center justify-center rounded-full border-2 border-ink bg-coral text-white">
          <Check size={10} strokeWidth={4} />
        </span>
      )}
      <p className="mt-[4px] text-center text-[9.5px] font-bold">{name}</p>
    </div>
  );
}

export function CreateScreen() {
  return (
    <Screen>
      <div className="flex items-center justify-between">
        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-ink bg-white">
          <X size={14} strokeWidth={2.6} />
        </span>
        <Caps>New event</Caps>
        <span className="w-[30px]" />
      </div>
      <Title className="mt-[12px]">Rooftop dinner</Title>
      <div className="mt-[10px] space-y-[6px]">
        {[
          { I: CalendarDays, t: "Fri 4 Dec · 8:00 PM" },
          { I: MapPin, t: "Terrace, 4th floor" },
          { I: Users, t: "Friends, plus-ones welcome" },
        ].map(({ I, t }) => (
          <div
            key={t}
            className="flex items-center gap-[8px] rounded-[12px] border-2 border-ink bg-white px-[10px] py-[7px] text-[11.5px] font-semibold"
          >
            <I size={14} strokeWidth={2.4} className="text-coral" />
            {t}
          </div>
        ))}
      </div>
      <div className="mt-[14px] flex items-center justify-between">
        <Caps>Pick a style</Caps>
        <Pill tint="#FFEAE5">10 styles</Pill>
      </div>
      <div className="mt-[8px] grid grid-cols-3 gap-x-[8px] gap-y-[8px]">
        {STYLE_THUMBS.slice(0, 6).map((s, i) => (
          <StyleThumb key={s.name} {...s} on={i === 0} />
        ))}
      </div>
      <Btn className="mt-[14px]">Create event</Btn>
    </Screen>
  );
}

export function EventScreen() {
  return (
    <Screen>
      <div className="flex items-center justify-between">
        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-ink bg-white">
          <ArrowLeft size={14} strokeWidth={2.6} />
        </span>
        <span className="flex h-[30px] w-[30px] items-center justify-center rounded-full border-2 border-ink bg-white">
          <Share2 size={13} strokeWidth={2.6} />
        </span>
      </div>
      <Card tint="#FF9A5C" className="mt-[10px] !p-[14px]">
        <Pill tint="#fff">You&rsquo;re invited</Pill>
        <p className="mt-[10px] font-display text-[38px] leading-[0.95] tracking-[-0.02em]">
          Rooftop
          <br />
          <span className="italic">dinner</span>
        </p>
        <div className="mt-[12px] space-y-[3px] text-[11px] font-semibold">
          <p className="flex items-center gap-[6px]">
            <CalendarDays size={12} strokeWidth={2.4} /> Fri 4 Dec · 8:00 PM
          </p>
          <p className="flex items-center gap-[6px]">
            <MapPin size={12} strokeWidth={2.4} /> Terrace, 4th floor
          </p>
        </div>
        <div className="mt-[12px] flex items-center gap-[6px] border-t-2 border-dashed border-ink/50 pt-[9px] text-[10.5px] font-semibold">
          <Av i={2} s={20} /> Hosted by Asha
        </div>
      </Card>

      <div className="mt-[12px] grid grid-cols-3 gap-[6px] text-center text-[11px] font-bold">
        <span className="flex items-center justify-center gap-[3px] rounded-full border-2 border-ink bg-going py-[7px] text-goingtext shadow-[2px_2px_0_#2B1719]">
          <Check size={11} strokeWidth={3.5} /> Going
        </span>
        <span className="rounded-full border-2 border-ink bg-white py-[7px]">Maybe</span>
        <span className="rounded-full border-2 border-ink bg-white py-[7px]">Can&rsquo;t</span>
      </div>

      <div className="mt-[10px] flex items-center justify-between">
        <AvStack ids={[1, 3, 5, 7, 9, 11]} />
        <span className="text-[10.5px] font-bold">12 going · 3 maybe</span>
      </div>

      <div className="mt-[12px] grid grid-cols-2 gap-[8px]">
        {[
          { I: MessageCircle, t: "Chat", s: "3 new", c: "#CDBEF7" },
          { I: Package, t: "Supplies", s: "8 items", c: "#8FD9B6" },
          { I: Wallet, t: "Group pot", s: "72% in", c: "#FFD6A5" },
          { I: Music2, t: "Event track", s: "Party mix", c: "#BFDDFB" },
        ].map(({ I, t, s, c }) => (
          <Card key={t} tint={c} className="flex items-center gap-[7px] !p-[8px]">
            <I size={15} strokeWidth={2.3} />
            <span className="leading-[1.15]">
              <span className="block text-[11px] font-bold">{t}</span>
              <span className="block text-[9px] text-ink/70">{s}</span>
            </span>
          </Card>
        ))}
      </div>

      <Card className="mt-[10px] flex items-start gap-[7px] !p-[9px]">
        <Av i={2} s={22} />
        <span className="leading-[1.3]">
          <span className="block text-[9px] font-bold uppercase tracking-[0.14em] text-muted">
            Note from the host
          </span>
          <span className="block text-[10.5px] font-semibold">
            Bring a jacket, it gets windy up there.
          </span>
        </span>
      </Card>
    </Screen>
  );
}

export function ExploreScreen() {
  const items = [
    { t: "Board game social", s: "Sat · 6 PM · Indiranagar", g: "23 going", c: "#BFDDFB", a: [4, 8, 12] },
    { t: "Open mic & chai", s: "Sat · 8 PM · Church Street", g: "41 going", c: "#F6C1D0", a: [2, 6, 10] },
    { t: "Sunday run club", s: "Sun · 6:30 AM · Cubbon Park", g: "17 going", c: "#8FD9B6", a: [1, 5, 9] },
  ];
  return (
    <Screen tab="explore">
      <Title>Explore</Title>
      <div className="mt-[10px] flex items-center gap-[7px] rounded-full border-2 border-ink bg-white px-[11px] py-[7px] text-[11px] text-muted">
        <Search size={13} strokeWidth={2.6} /> What&rsquo;s on near you
      </div>
      <div className="mt-[9px] flex flex-wrap gap-[5px]">
        <Pill tint="#2B1719" className="text-white">Tonight</Pill>
        <Pill>This weekend</Pill>
        <Pill>House parties</Pill>
        <Pill>Game nights</Pill>
      </div>
      <div className="mt-[11px] space-y-[9px]">
        {items.map((e) => (
          <Card key={e.t} tint={e.c}>
            <p className="font-display text-[19px] leading-[1.05]">{e.t}</p>
            <p className="mt-[3px] text-[10px] font-semibold text-ink/75">{e.s}</p>
            <div className="mt-[8px] flex items-center justify-between">
              <AvStack ids={e.a} s={20} />
              <Pill tint="#fff">{e.g}</Pill>
            </div>
          </Card>
        ))}
      </div>
    </Screen>
  );
}

function TicketCard({
  tint,
  title,
  when,
  where,
  seed,
  style,
}: {
  tint: string;
  title: string;
  when: string;
  where: string;
  seed: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className="relative flex overflow-hidden rounded-[16px] border-2 border-ink shadow-[3px_3px_0_#2B1719]"
      style={{ background: tint, ...style }}
    >
      <div className="min-w-0 flex-1 p-[11px]">
        <Caps className="!text-ink/70">Admit one</Caps>
        <p className="mt-[3px] font-display text-[20px] leading-[1.05]">{title}</p>
        <p className="mt-[5px] text-[10px] font-semibold">{when}</p>
        <p className="text-[10px] text-ink/70">{where}</p>
      </div>
      <div className="flex w-[70px] flex-col items-center justify-center border-l-2 border-dashed border-ink/60 bg-white/70 p-[6px]">
        <FauxQr size={48} seed={seed} />
        <span className="mt-[3px] text-[7.5px] font-bold tracking-[0.12em]">SCAN IN</span>
      </div>
      <i className="absolute -top-[8px] right-[62px] h-[14px] w-[14px] rounded-full border-2 border-ink bg-paper" />
      <i className="absolute -bottom-[8px] right-[62px] h-[14px] w-[14px] rounded-full border-2 border-ink bg-paper" />
    </div>
  );
}

export function PlansScreen() {
  return (
    <Screen tab="plans">
      <Title>Plans</Title>
      <div className="mt-[10px] flex rounded-full border-2 border-ink bg-white p-[3px] text-center text-[10.5px] font-bold">
        <span className="flex-1 rounded-full bg-ink py-[5px] text-white">Upcoming</span>
        <span className="flex-1 py-[5px]">Hosting</span>
        <span className="flex-1 py-[5px]">Past</span>
      </div>
      <div className="mt-[14px] space-y-[10px]">
        <TicketCard tint="#CDBEF7" title="Rooftop dinner" when="Fri 4 Dec · 8:00 PM" where="Terrace, 4th floor" seed={3} style={{ rotate: "-1.5deg" }} />
        <TicketCard tint="#FFD6A5" title="Birthday bash" when="Sun 6 Dec · 7:30 PM" where="Asha&rsquo;s place" seed={11} style={{ rotate: "1.2deg" }} />
        <TicketCard tint="#8FD9B6" title="Sunday run club" when="Sun 13 Dec · 6:30 AM" where="Cubbon Park" seed={19} style={{ rotate: "-0.8deg" }} />
      </div>
    </Screen>
  );
}

export function ProfileScreen() {
  return (
    <Screen tab="profile">
      <div className="flex items-center justify-between">
        <Caps>Profile</Caps>
        <Pill tint="#FFEAE5">Member pass</Pill>
      </div>
      <div className="mt-[8px] overflow-hidden rounded-[18px] border-2 border-ink bg-white shadow-[4px_4px_0_#2B1719]">
        <div className="flex items-center justify-between bg-coral px-[12px] py-[7px] text-[8.5px] font-bold tracking-[0.16em] text-white">
          <span>INVYTT MEMBER PASS</span>
          <span>No. 0042</span>
        </div>
        <div className="flex items-center gap-[10px] p-[12px]">
          <Av i={2} s={54} />
          <div>
            <p className="font-display text-[23px] leading-[1]">Asha Rao</p>
            <p className="mt-[2px] text-[10.5px] text-muted">@asha · Bengaluru</p>
          </div>
        </div>
        <div className="grid grid-cols-3 border-y-2 border-dashed border-ink/50 text-center">
          {[
            ["12", "Hosted"],
            ["34", "Attended"],
            ["86", "Friends"],
          ].map(([n, l]) => (
            <div key={l} className="py-[8px]">
              <p className="font-display text-[20px] leading-[1]">{n}</p>
              <p className="text-[8.5px] font-bold uppercase tracking-[0.12em] text-muted">{l}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-[10px] p-[12px]">
          <FauxQr size={66} seed={5} />
          <div>
            <p className="text-[11.5px] font-bold leading-[1.2]">Scan to meet</p>
            <p className="mt-[2px] text-[9.5px] leading-[1.35] text-muted">
              Show this at a party to add each other in one tap.
            </p>
          </div>
        </div>
      </div>
      <Caps className="mt-[14px]">Card styles</Caps>
      <div className="mt-[6px] flex flex-wrap gap-[5px]">
        <Pill>Classic</Pill>
        <Pill tint="#2B1719" className="text-white">Member pass</Pill>
        <Pill>Scrapbook</Pill>
        <Pill>Editorial</Pill>
        <Pill>Bento</Pill>
      </div>
      <Card className="mt-[12px] flex items-center justify-between !p-[8px]">
        <AvStack ids={[3, 6, 9, 12, 5]} s={24} />
        <span className="text-[10.5px] font-bold">86 friends</span>
      </Card>
    </Screen>
  );
}

/* ── Pillar and step screens ───────────────────────────────────────────── */

export function RsvpScreen() {
  const rows = [
    { n: "Meera", i: 3, s: "Going", c: "#D8F5EC", x: "via WhatsApp" },
    { n: "Kabir", i: 6, s: "Going", c: "#D8F5EC", x: "+1" },
    { n: "Zoya", i: 9, s: "Maybe", c: "#FFD6A5", x: "" },
    { n: "Dev", i: 12, s: "Invited", c: "#F3E6E2", x: "" },
    { n: "Ira", i: 5, s: "Going", c: "#D8F5EC", x: "" },
    { n: "Rhea", i: 8, s: "Going", c: "#D8F5EC", x: "+1" },
    { n: "Arjun", i: 11, s: "Can’t", c: "#F6C1D0", x: "" },
  ];
  return (
    <Screen>
      <Caps>Rooftop dinner</Caps>
      <Title className="mt-[2px]">Guest list</Title>
      <div className="mt-[10px] grid grid-cols-3 gap-[6px] text-center">
        {[
          ["12", "Going", "#D8F5EC"],
          ["3", "Maybe", "#FFD6A5"],
          ["20", "Invited", "#fff"],
        ].map(([n, l, c]) => (
          <Card key={l} tint={c} className="!p-[7px]">
            <p className="font-display text-[22px] leading-[1]">{n}</p>
            <p className="text-[8.5px] font-bold uppercase tracking-[0.12em]">{l}</p>
          </Card>
        ))}
      </div>
      <div className="mt-[10px] space-y-[5px]">
        {rows.map((r) => (
          <div
            key={r.n}
            className="flex h-[40px] items-center gap-[8px] rounded-[12px] border-2 border-ink bg-white px-[9px]"
          >
            <Av i={r.i} s={24} />
            <span className="flex-1 leading-[1.15]">
              <span className="block text-[11.5px] font-bold">{r.n}</span>
              {r.x && <span className="block text-[9px] text-muted">{r.x}</span>}
            </span>
            <Pill tint={r.c}>{r.s}</Pill>
          </div>
        ))}
      </div>
      <Btn className="absolute inset-x-[14px] bottom-[14px]">
        <Send size={13} strokeWidth={2.6} /> Send a reminder
      </Btn>
    </Screen>
  );
}

export function InventoryScreen() {
  const rows = [
    { t: "Samosas", q: "40 pcs", w: "Meera brings", i: 3 },
    { t: "Soft drinks", q: "9 litres", w: "Kabir brings", i: 6 },
    { t: "Paper plates", q: "24", w: "You", i: 2 },
    { t: "Fairy lights", q: "2 strings", w: "Zoya brings", i: 9 },
    { t: "Ice", q: "4 kg", w: "", i: 0 },
    { t: "Cake", q: "1.5 kg", w: "", i: 0 },
  ];
  return (
    <Screen>
      <Caps>Rooftop dinner</Caps>
      <Title className="mt-[2px]">Supplies</Title>
      <Card tint="#CDBEF7" className="mt-[10px] flex items-center gap-[8px]">
        <span className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full border-2 border-ink bg-white">
          <Sparkles size={14} strokeWidth={2.4} />
        </span>
        <span className="leading-[1.2]">
          <span className="block text-[11.5px] font-bold">Sized for 18 guests</span>
          <span className="block text-[9.5px] text-ink/75">Updates as RSVPs change</span>
        </span>
      </Card>
      <div className="mt-[10px] space-y-[6px]">
        {rows.map((r) => (
          <div
            key={r.t}
            className="flex items-center gap-[8px] rounded-[12px] border-2 border-ink bg-white px-[9px] py-[7px]"
          >
            <span className="flex-1 leading-[1.2]">
              <span className="block text-[11.5px] font-bold">{r.t}</span>
              <span className="block text-[9.5px] text-muted">{r.q}</span>
            </span>
            {r.w ? (
              <span className="flex items-center gap-[4px] text-[9.5px] font-semibold">
                <Av i={r.i} s={18} /> {r.w}
              </span>
            ) : (
              <Pill tint="#D2402A" className="text-white">I&rsquo;ll bring it</Pill>
            )}
          </div>
        ))}
      </div>
      <Card tint="#8FD9B6" className="mt-[12px] flex items-center justify-between">
        <span className="leading-[1.2]">
          <span className="block text-[9px] font-bold uppercase tracking-[0.14em]">Estimated cost</span>
          <span className="block font-display text-[22px] leading-[1.05]">₹3,450</span>
        </span>
        <Pill tint="#fff">about ₹192 each</Pill>
      </Card>
    </Screen>
  );
}

export function TemplatesScreen() {
  return (
    <Screen>
      <Caps>Design your invite</Caps>
      <Title className="mt-[2px]">Invitation style</Title>
      <div className="mt-[10px] grid grid-cols-3 gap-x-[8px] gap-y-[7px]">
        {STYLE_THUMBS.map((s, i) => (
          <StyleThumb key={s.name} {...s} on={i === 2} />
        ))}
      </div>
      <Caps className="mt-[10px]">Make it yours</Caps>
      <div className="mt-[6px] flex items-center gap-[7px]">
        {["#FF9A5C", "#CDBEF7", "#8FD9B6", "#F6C1D0", "#BFDDFB", "#FFD6A5"].map((c, i) => (
          <i
            key={c}
            className={`h-[24px] w-[24px] rounded-full border-2 border-ink ${i === 1 ? "shadow-[2px_2px_0_#D2402A]" : ""}`}
            style={{ background: c }}
          />
        ))}
      </div>
      <Btn className="absolute inset-x-[14px] bottom-[14px]">Use this style</Btn>
    </Screen>
  );
}

export function VendorsScreen() {
  const cats = [
    { I: ChefHat, t: "Caterers", c: "#FFD6A5" },
    { I: Flower2, t: "Decorators", c: "#F6C1D0" },
    { I: Camera, t: "Photographers", c: "#BFDDFB" },
    { I: Disc3, t: "DJs", c: "#CDBEF7" },
    { I: Wine, t: "Bartenders", c: "#8FD9B6" },
    { I: Plus, t: "And more", c: "#fff" },
  ];
  return (
    <Screen>
      <div className="flex items-center justify-between">
        <Caps>Marketplace</Caps>
        <Pill tint="#D2402A" className="text-white">Coming soon</Pill>
      </div>
      <Title className="mt-[2px]">Book your vendors</Title>
      <div className="mt-[10px] flex items-center gap-[7px] rounded-full border-2 border-ink bg-white px-[11px] py-[7px] text-[11px] text-muted">
        <Search size={13} strokeWidth={2.6} /> Search by city or date
      </div>
      <div className="mt-[11px] grid grid-cols-2 gap-[8px]">
        {cats.map(({ I, t, c }) => (
          <Card key={t} tint={c} className="!p-[9px]">
            <span className="flex h-[28px] w-[28px] items-center justify-center rounded-full border-2 border-ink bg-white">
              <I size={14} strokeWidth={2.3} />
            </span>
            <p className="mt-[6px] text-[11.5px] font-bold leading-[1.2]">{t}</p>
          </Card>
        ))}
      </div>
      <Card className="mt-[11px]">
        <div className="flex items-center justify-between">
          <span className="text-[11.5px] font-bold">Verified reviews</span>
          <Pill tint="#D8F5EC">Vetted</Pill>
        </div>
        <p className="mt-[4px] text-[9.5px] leading-[1.4] text-muted">
          Compare availability, then book and pay without leaving the event.
        </p>
      </Card>
      <Card tint="#FFEAE5" className="mt-[10px] flex items-center justify-between">
        <span className="leading-[1.2]">
          <span className="block text-[11.5px] font-bold">For Rooftop dinner</span>
          <span className="block text-[9.5px] text-muted">Fri 4 Dec · 18 guests</span>
        </span>
        <Pill tint="#fff">Get quotes</Pill>
      </Card>
    </Screen>
  );
}

export function PlanningScreen() {
  const tasks = [
    { t: "Send the invites", w: 2, d: true },
    { t: "Book the terrace", w: 2, d: true },
    { t: "Order the cake", w: 6, d: false, due: "Thu" },
    { t: "Build the playlist", w: 3, d: false, due: "Fri" },
    { t: "Buy the decor", w: 2, d: false, due: "Sat" },
    { t: "Confirm headcount", w: 6, d: false, due: "Sun" },
  ];
  return (
    <Screen>
      <Caps>Rooftop dinner</Caps>
      <Title className="mt-[2px]">Plan</Title>
      <Card tint="#FFD6A5" className="mt-[10px]">
        <div className="flex items-end justify-between">
          <span className="leading-[1.1]">
            <span className="block text-[9px] font-bold uppercase tracking-[0.14em]">Budget</span>
            <span className="block font-display text-[22px]">₹8,200</span>
          </span>
          <span className="text-[10px] font-semibold">of ₹12,000</span>
        </div>
        <div className="mt-[7px] h-[10px] overflow-hidden rounded-full border-2 border-ink bg-white">
          <i className="block h-full w-[68%] bg-coral" />
        </div>
      </Card>
      <div className="mt-[12px] flex items-center justify-between">
        <Caps>Tasks</Caps>
        <span className="flex items-center gap-[5px] text-[9.5px] font-semibold">
          Co-hosts <AvStack ids={[2, 6, 3]} s={18} />
        </span>
      </div>
      <div className="mt-[6px] space-y-[6px]">
        {tasks.map((t) => (
          <div
            key={t.t}
            className="flex items-center gap-[8px] rounded-[12px] border-2 border-ink bg-white px-[9px] py-[7px]"
          >
            <span
              className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[6px] border-2 border-ink ${t.d ? "bg-statusgreen text-white" : "bg-white"}`}
            >
              {t.d && <Check size={10} strokeWidth={4} />}
            </span>
            <span className={`flex-1 text-[11.5px] font-bold ${t.d ? "text-muted line-through" : ""}`}>
              {t.t}
            </span>
            {t.due && <Pill tint="#FFEAE5">{t.due}</Pill>}
            <Av i={t.w} s={18} />
          </div>
        ))}
      </div>
      <Card tint="#F6C1D0" className="mt-[11px] flex items-center gap-[8px]">
        <ListChecks size={16} strokeWidth={2.3} />
        <span className="text-[10.5px] font-bold">Timeline: 2 of 6 done · 7 days to go</span>
      </Card>
    </Screen>
  );
}

export function ShareScreen() {
  return (
    <Screen>
      <Caps>Rooftop dinner</Caps>
      <Title className="mt-[2px]">Invite your people</Title>
      <Card className="mt-[10px] flex items-center gap-[8px]">
        <span className="min-w-0 flex-1 break-all text-[11px] font-bold leading-[1.25]">
          invytt.com/e/rooftop-dinner
        </span>
        <span className="flex h-[28px] w-[28px] shrink-0 items-center justify-center rounded-full border-2 border-ink bg-tint">
          <Copy size={12} strokeWidth={2.6} />
        </span>
      </Card>
      <div className="mt-[9px] grid grid-cols-2 gap-[8px]">
        <Btn tint="#4CAF50" className="!h-[36px] !text-[11.5px]">
          <MessageCircle size={13} strokeWidth={2.6} /> WhatsApp
        </Btn>
        <Btn tint="#fff" light={false} className="!h-[36px] !text-[11.5px]">
          <Share2 size={13} strokeWidth={2.6} /> Share link
        </Btn>
      </div>
      <div className="mt-[14px] flex items-center justify-between">
        <Caps>RSVPs</Caps>
        <span className="text-[10px] font-bold">12 going · 3 maybe</span>
      </div>
      <div className="mt-[6px] space-y-[6px]">
        {[
          { n: "Meera is going", x: "Replied on WhatsApp", i: 3, c: "#D8F5EC", s: "Going" },
          { n: "Kabir is going", x: "Bringing a +1", i: 6, c: "#D8F5EC", s: "Going" },
          { n: "Zoya might come", x: "Just now", i: 9, c: "#FFD6A5", s: "Maybe" },
          { n: "Ira is going", x: "Opened the link", i: 5, c: "#D8F5EC", s: "Going" },
          { n: "Dev hasn’t replied", x: "Reminder sent", i: 12, c: "#F3E6E2", s: "Invited" },
        ].map((r) => (
          <div
            key={r.n}
            className="flex items-center gap-[8px] rounded-[12px] border-2 border-ink bg-white px-[9px] py-[6px]"
          >
            <Av i={r.i} s={26} />
            <span className="flex-1 leading-[1.15]">
              <span className="block text-[11.5px] font-bold">{r.n}</span>
              <span className="block text-[9px] text-muted">{r.x}</span>
            </span>
            <Pill tint={r.c}>{r.s}</Pill>
          </div>
        ))}
      </div>
      <Card tint="#CDBEF7" className="mt-[11px] text-[10.5px] font-bold">
        +1s on · Reminder goes out 2 days before
      </Card>
    </Screen>
  );
}

export function SplitScreen() {
  const rows = [
    { n: "Meera", i: 3, paid: true },
    { n: "Kabir", i: 6, paid: true },
    { n: "Zoya", i: 9, paid: false },
    { n: "Dev", i: 12, paid: false },
    { n: "Ira", i: 5, paid: true },
  ];
  return (
    <Screen>
      <Caps>Rooftop dinner</Caps>
      <Title className="mt-[2px]">Group pot</Title>
      <Card tint="#F6C1D0" className="mt-[10px]">
        <p className="text-[9px] font-bold uppercase tracking-[0.14em]">Total to split</p>
        <p className="font-display text-[34px] leading-[1.05]">₹8,200</p>
        <p className="text-[10.5px] font-semibold">₹456 each · 18 guests</p>
        <div className="mt-[8px] h-[12px] overflow-hidden rounded-full border-2 border-ink bg-white">
          <i className="block h-full w-[72%] bg-statusgreen" />
        </div>
        <p className="mt-[4px] text-[9.5px] font-bold">72% collected</p>
      </Card>
      <Caps className="mt-[12px]">Balances</Caps>
      <div className="mt-[6px] space-y-[6px]">
        {rows.map((r) => (
          <div
            key={r.n}
            className="flex items-center gap-[8px] rounded-[12px] border-2 border-ink bg-white px-[9px] py-[6px]"
          >
            <Av i={r.i} s={26} />
            <span className="flex-1 text-[11.5px] font-bold">{r.n}</span>
            {r.paid ? (
              <Pill tint="#D8F5EC">
                <Check size={9} strokeWidth={4} /> Paid
              </Pill>
            ) : (
              <Pill tint="#FFD6A5">Pending</Pill>
            )}
          </div>
        ))}
      </div>
      <Btn className="absolute inset-x-[14px] bottom-[14px]">Settle up</Btn>
    </Screen>
  );
}

/* ── Live party screens ────────────────────────────────────────────────── */

export function CompanionScreen() {
  return (
    <Screen dark className="!bg-night">
      <div className="-mx-[14px] mt-[6px] h-[554px] rounded-t-[26px] border-t-2 border-ink bg-paper px-[14px] pt-[10px]">
        <i className="mx-auto block h-[4px] w-[36px] rounded-full bg-ink/25" />
        <div className="mt-[10px] flex rounded-full border-2 border-ink bg-white p-[3px] text-center text-[10.5px] font-bold">
          <span className="flex-1 rounded-full bg-ink py-[5px] text-white">Host companion</span>
          <span className="flex-1 py-[5px]">Invytt Games</span>
        </div>
        <div className="mt-[12px] space-y-[8px] text-[11px] leading-[1.4]">
          <div className="max-w-[86%] rounded-[14px] rounded-bl-[4px] border-2 border-ink bg-white px-[10px] py-[7px]">
            Doors are open. 9 of your 14 guests are here. Want an icebreaker?
          </div>
          <div className="ml-auto w-max max-w-[80%] rounded-[14px] rounded-br-[4px] border-2 border-ink bg-coral px-[10px] py-[7px] font-semibold text-white">
            Yes, something quick
          </div>
          <div className="max-w-[86%] rounded-[14px] rounded-bl-[4px] border-2 border-ink bg-white px-[10px] py-[7px]">
            Try Tap race. One minute, everyone can play from their phone.
            <span className="mt-[7px] flex h-[30px] items-center justify-center rounded-full border-2 border-ink bg-mint text-[10.5px] font-bold shadow-[2px_2px_0_#2B1719]">
              Start Tap race
            </span>
          </div>
          <div className="typing flex w-max gap-[4px] rounded-[14px] rounded-bl-[4px] border-2 border-ink bg-white px-[12px] py-[10px]">
            <i className="h-[6px] w-[6px] rounded-full bg-ink" />
            <i className="h-[6px] w-[6px] rounded-full bg-ink" />
            <i className="h-[6px] w-[6px] rounded-full bg-ink" />
          </div>
        </div>
        <div className="absolute inset-x-[14px] bottom-[14px]">
          <div className="flex flex-wrap gap-[5px]">
            <Pill tint="#FFEAE5">Who&rsquo;s missing?</Pill>
            <Pill tint="#FFEAE5">Suggest a toast</Pill>
          </div>
          <div className="mt-[8px] flex items-center gap-[7px] rounded-full border-2 border-ink bg-white px-[12px] py-[8px] text-[11px] text-muted">
            <span className="flex-1">Ask your companion</span>
            <span className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-coral text-white">
              <Send size={11} strokeWidth={2.8} />
            </span>
          </div>
        </div>
      </div>
    </Screen>
  );
}

export function GameScreen() {
  return (
    <Screen>
      <div className="flex items-center justify-between">
        <Caps>Hot takes · Round 2 of 5</Caps>
        <Pill tint="#FFD6A5" shadow>0:12</Pill>
      </div>
      <Card tint="#FF9A5C" className="mt-[14px] !p-[16px] text-center" style={{ rotate: "-1.5deg" }}>
        <Caps className="!text-ink/70">The take</Caps>
        <p className="mt-[10px] font-display text-[30px] leading-[1.02]">
          Pineapple belongs on pizza.
        </p>
      </Card>
      <div className="mt-[18px] grid grid-cols-2 gap-[10px]">
        <Btn tint="#8FD9B6" light={false} className="!h-[52px] !text-[14px]">Agree</Btn>
        <Btn tint="#F6C1D0" light={false} className="!h-[52px] !text-[14px]">Disagree</Btn>
      </div>
      <Card className="mt-[16px]">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold">6 of 9 have voted</span>
          <AvStack ids={[1, 3, 5, 7, 9, 11]} s={20} />
        </div>
        <div className="mt-[8px] h-[10px] overflow-hidden rounded-full border-2 border-ink bg-white">
          <i className="block h-full w-[66%] bg-lilac" />
        </div>
      </Card>
      <Caps className="mt-[14px] text-center">Then debate it out loud</Caps>
      <Card tint="#FFEAE5" className="absolute inset-x-[14px] bottom-[14px]">
        <Caps>Last round</Caps>
        <p className="mt-[3px] text-[11.5px] font-bold leading-[1.25]">
          Cold showers beat hot ones.
        </p>
        <div className="mt-[7px] flex h-[12px] overflow-hidden rounded-full border-2 border-ink">
          <i className="block h-full w-[56%] bg-mint" />
          <i className="block h-full flex-1 border-l-2 border-ink bg-pink" />
        </div>
        <div className="mt-[4px] flex justify-between text-[9.5px] font-bold">
          <span>5 agreed</span>
          <span>4 disagreed</span>
        </div>
      </Card>
    </Screen>
  );
}

export function QrScreen() {
  return (
    <Screen>
      <Caps className="text-center">Meet</Caps>
      <Title className="mt-[4px] text-center">Say hi in one scan</Title>
      <Card className="mx-auto mt-[16px] flex w-[214px] flex-col items-center !p-[14px]">
        <FauxQr size={170} seed={7} />
        <div className="mt-[10px] flex items-center gap-[7px]">
          <Av i={2} s={24} />
          <span className="text-[12.5px] font-bold">Asha Rao</span>
        </div>
      </Card>
      <p className="mx-auto mt-[14px] max-w-[210px] text-center text-[10.5px] leading-[1.4] text-muted">
        Any phone camera can read this. No typing usernames over the music.
      </p>
      <Btn tint="#fff" light={false} className="mx-auto mt-[14px] w-[190px]">
        <Camera size={14} strokeWidth={2.5} /> Scan a friend
      </Btn>
      <Card tint="#8FD9B6" className="absolute inset-x-[14px] bottom-[14px] flex items-center justify-between">
        <span className="leading-[1.2]">
          <span className="block text-[9px] font-bold uppercase tracking-[0.14em]">Tonight · Game night</span>
          <span className="block text-[11.5px] font-bold">3 new friends so far</span>
        </span>
        <AvStack ids={[6, 9, 12]} s={24} />
      </Card>
    </Screen>
  );
}

export function ScanScreen({ met = false }: { met?: boolean }) {
  return (
    <Screen dark className="!bg-night text-white">
      <p className="text-center text-[9px] font-bold uppercase tracking-[0.16em] text-white/60">
        Scan to meet
      </p>
      <div className="relative mx-auto mt-[40px] h-[200px] w-[200px]">
        {[
          "left-0 top-0 border-l-[4px] border-t-[4px] rounded-tl-[18px]",
          "right-0 top-0 border-r-[4px] border-t-[4px] rounded-tr-[18px]",
          "left-0 bottom-0 border-l-[4px] border-b-[4px] rounded-bl-[18px]",
          "right-0 bottom-0 border-r-[4px] border-b-[4px] rounded-br-[18px]",
        ].map((c) => (
          <i key={c} className={`absolute h-[38px] w-[38px] border-white ${c}`} />
        ))}
        <div className="absolute inset-[28px] rounded-[12px] bg-white p-[10px] opacity-90">
          <FauxQr size={124} seed={7} />
        </div>
        <i className="scanline absolute inset-x-[10px] h-[3px] rounded-full bg-live shadow-[0_0_14px_#3CCFBF]" />
      </div>
      {met ? (
        <div className="mx-auto mt-[36px] w-[214px] rounded-[16px] border-2 border-ink bg-paper p-[12px] text-center text-ink shadow-[3px_3px_0_#000]">
          <div className="flex justify-center">
            <AvStack ids={[2, 6]} s={34} />
          </div>
          <p className="mt-[6px] font-display text-[20px] leading-[1.05]">You met Kabir</p>
          <span className="mt-[8px] inline-flex rounded-full border-2 border-ink bg-statusgreen px-[14px] py-[4px] text-[11px] font-bold text-ink">
            Add friend
          </span>
        </div>
      ) : (
        <p className="mx-auto mt-[40px] max-w-[200px] text-center text-[11px] leading-[1.4] text-white/70">
          Point your camera at a friend&rsquo;s code.
        </p>
      )}
    </Screen>
  );
}

/* ── The page guests see in a browser ──────────────────────────────────── */

export function GuestWebPage({
  compact = false,
  stamp,
}: {
  compact?: boolean;
  /** shown beside "Will you be there?", in its own space */
  stamp?: React.ReactNode;
}) {
  return (
    <div className={`bg-paper text-ink ${compact ? "p-[14px] pt-[46px]" : "p-5 sm:p-7"}`}>
      <div
        className="rounded-[18px] border-2 border-ink p-4 shadow-[4px_4px_0_#2B1719]"
        style={{ background: "#FF9A5C" }}
      >
        <span className="inline-flex rounded-full border-[1.5px] border-ink bg-white px-2.5 py-0.5 text-[11px] font-bold">
          You&rsquo;re invited
        </span>
        <p className={`mt-3 font-display leading-[0.95] ${compact ? "text-[34px]" : "text-4xl sm:text-5xl"}`}>
          Rooftop <span className="italic">dinner</span>
        </p>
        <p className="mt-3 flex items-center gap-1.5 text-xs font-semibold">
          <CalendarDays size={13} strokeWidth={2.4} /> Fri 4 Dec · 8:00 PM
        </p>
        <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold">
          <MapPin size={13} strokeWidth={2.4} /> Terrace, 4th floor
        </p>
        <p className="mt-3 flex items-center gap-1.5 border-t-2 border-dashed border-ink/50 pt-2.5 text-xs font-semibold">
          <Av i={2} s={20} /> Hosted by Asha
        </p>
      </div>
      <div className={compact ? "mt-[12px]" : "mt-4"}>
        <div className={`flex items-center justify-between gap-3 ${stamp ? "min-h-[52px]" : ""}`}>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-muted">
            Will you be there?
          </p>
          {stamp}
        </div>
        <div className="mt-2 grid grid-cols-3 gap-1.5 text-center text-xs font-bold">
          <span className="rounded-full border-2 border-ink bg-going py-2 text-goingtext shadow-[2px_2px_0_#2B1719]">
            Going
          </span>
          <span className="rounded-full border-2 border-ink bg-white py-2">Maybe</span>
          <span className="rounded-full border-2 border-ink bg-white py-2">Can&rsquo;t</span>
        </div>
        <div className="mt-3 flex items-center justify-between rounded-[12px] border-2 border-ink bg-white px-3 py-2">
          <AvStack ids={[1, 3, 5, 7]} s={22} />
          <span className="text-xs font-bold">12 going</span>
        </div>
        <p className="mt-3 text-[11px] leading-[1.45] text-muted">
          No download needed. Reply from the link and you&rsquo;re on the list.
        </p>
      </div>
    </div>
  );
}
