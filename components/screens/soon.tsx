import {
  CakeSlice,
  Camera,
  Check,
  ChefHat,
  CreditCard,
  Disc3,
  Flower2,
  Gift,
  Lamp,
  MapPin,
  Package,
  Search,
  ShoppingBag,
  Sparkles,
  Star,
  Ticket,
  Wallet,
} from "lucide-react";
import type { ReactNode } from "react";
import type { SoonFeature } from "@/app/data";
import { Av, Btn, Caps, Card, FauxQr, Pill, Screen, Title } from "./parts";

/* Web rebuilds of the app screens that are built but held back from the first
   release. Sample data throughout. */

function SoonPill() {
  return (
    <Pill tint="#D2402A" className="text-white">
      Coming soon
    </Pill>
  );
}

function Head({ caps, title }: { caps: string; title: string }) {
  return (
    <>
      <div className="flex items-center justify-between">
        <Caps>{caps}</Caps>
        <SoonPill />
      </div>
      <Title className="mt-[2px]">{title}</Title>
    </>
  );
}

export function ShopScreen() {
  const items = [
    { I: CakeSlice, t: "Chocolate truffle cake", p: "₹1,450", c: "#FFD6A5", r: "4.8" },
    { I: Flower2, t: "Marigold garland set", p: "₹620", c: "#F6C1D0", r: "4.7" },
    { I: Lamp, t: "Fairy light canopy", p: "₹890", c: "#CDBEF7", r: "4.9" },
    { I: Gift, t: "Return gift hampers", p: "₹240 each", c: "#8FD9B6", r: "4.6" },
  ];
  return (
    <Screen>
      <Head caps="Marketplace" title="Shop" />
      <div className="mt-[10px] flex items-center gap-[7px] rounded-full border-2 border-ink bg-white px-[11px] py-[7px] text-[11px] text-muted">
        <Search size={13} strokeWidth={2.6} /> Cakes, flowers, decor, gifts
      </div>
      <div className="mt-[10px] grid grid-cols-2 gap-[8px]">
        {items.map(({ I, t, p, c, r }) => (
          <Card key={t} className="!p-[7px]">
            <div className="flex h-[66px] items-center justify-center rounded-[10px] border-2 border-ink" style={{ background: c }}>
              <I size={28} strokeWidth={2} />
            </div>
            <p className="mt-[6px] text-[10.5px] font-bold leading-[1.2]">{t}</p>
            <div className="mt-[3px] flex items-center justify-between">
              <span className="text-[10.5px] font-bold">{p}</span>
              <span className="flex items-center gap-[2px] text-[9px] font-bold">
                <Star size={9} strokeWidth={3} className="fill-current" /> {r}
              </span>
            </div>
          </Card>
        ))}
      </div>
      <Card tint="#FFEAE5" className="mt-[10px] flex items-center justify-between">
        <span className="flex items-center gap-[6px] text-[11px] font-bold">
          <ShoppingBag size={14} strokeWidth={2.4} /> 3 items in your cart
        </span>
        <Pill tint="#fff">₹2,310</Pill>
      </Card>
      <Btn className="absolute inset-x-[14px] bottom-[14px]">Check out</Btn>
    </Screen>
  );
}

export function ServicesScreen() {
  const pros = [
    { I: Camera, t: "Frame & Flash Studio", k: "Photographer", r: "4.9", n: 128, c: "#BFDDFB" },
    { I: ChefHat, t: "Spice Route Caterers", k: "Caterer", r: "4.8", n: 214, c: "#FFD6A5" },
    { I: Flower2, t: "Petal Theory", k: "Decorator", r: "4.7", n: 96, c: "#F6C1D0" },
    { I: Disc3, t: "DJ Nikhil", k: "DJ", r: "4.9", n: 71, c: "#CDBEF7" },
  ];
  return (
    <Screen>
      <Head caps="Marketplace" title="Book a service" />
      <div className="mt-[9px] flex flex-wrap gap-[5px]">
        <Pill tint="#2B1719" className="text-white">All</Pill>
        <Pill>Photographers</Pill>
        <Pill>Caterers</Pill>
        <Pill>Decor</Pill>
      </div>
      <div className="mt-[10px] space-y-[7px]">
        {pros.map(({ I, t, k, r, n, c }) => (
          <Card key={t} className="flex items-center gap-[8px] !p-[8px]">
            <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-[12px] border-2 border-ink" style={{ background: c }}>
              <I size={18} strokeWidth={2.2} />
            </span>
            <span className="min-w-0 flex-1 leading-[1.2]">
              <span className="block text-[11.5px] font-bold">{t}</span>
              <span className="block text-[9.5px] text-muted">{k} · Free on 4 Dec</span>
            </span>
            <span className="text-right leading-[1.2]">
              <span className="flex items-center justify-end gap-[2px] text-[10.5px] font-bold">
                <Star size={10} strokeWidth={3} className="fill-current" /> {r}
              </span>
              <span className="block text-[8.5px] text-muted">{n} reviews</span>
            </span>
          </Card>
        ))}
      </div>
      <Card tint="#D8F5EC" className="mt-[10px] flex items-center gap-[7px] text-[10.5px] font-bold">
        <Check size={13} strokeWidth={3.4} /> Verified reviews from real bookings
      </Card>
    </Screen>
  );
}

export function VenuesScreen() {
  const venues = [
    { t: "Skyline Terrace", k: "Rooftop", g: "#FF9A5C" },
    { t: "The Grand Hall", k: "Banquet", g: "#CDBEF7" },
    { t: "Palm Cove Resort", k: "Resort", g: "#8FD9B6" },
  ];
  return (
    <Screen>
      <Head caps="Marketplace" title="Book venues" />
      <div className="mt-[9px] flex flex-wrap gap-[5px]">
        <Pill tint="#2B1719" className="text-white">Rooftops</Pill>
        <Pill>Banquets</Pill>
        <Pill>Resorts</Pill>
        <Pill>Party halls</Pill>
      </div>
      <div className="mt-[10px] space-y-[9px]">
        {venues.map((v, i) => (
          <Card key={v.t} className="!p-0 overflow-hidden">
            <div
              className="relative h-[78px] border-b-2 border-ink"
              style={{
                background: `linear-gradient(160deg, ${v.g}, #1F0B0C 140%)`,
              }}
            >
              <span className="absolute inset-x-[10px] bottom-[8px] flex items-end gap-[4px]">
                {[22, 34, 18, 40, 28, 16, 30].map((h, k) => (
                  <i
                    key={k}
                    className="block flex-1 rounded-t-[3px] bg-night/70"
                    style={{ height: h - i * 3 }}
                  />
                ))}
              </span>
              <span className="absolute left-[8px] top-[8px]">
                <Pill tint="#fff">{v.k}</Pill>
              </span>
            </div>
            <div className="flex items-center justify-between px-[10px] py-[7px]">
              <span className="text-[11.5px] font-bold">{v.t}</span>
              <span className="flex items-center gap-[3px] text-[9.5px] text-muted">
                <MapPin size={10} strokeWidth={2.6} /> Bengaluru
              </span>
            </div>
          </Card>
        ))}
      </div>
    </Screen>
  );
}

export function AgencyScreen() {
  const stages = [
    { t: "Concept", d: true },
    { t: "Vendors", d: true },
    { t: "Decor", d: false },
    { t: "Coordination", d: false },
  ];
  return (
    <Screen dark className="!bg-night text-paper">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-nightmuted">Invytt Agency</span>
        <SoonPill />
      </div>
      <p className="mt-[6px] font-display text-[30px] leading-[1]">
        We handle <span className="italic text-peach">it all.</span>
      </p>
      <div className="mt-[12px] rounded-[16px] border-2 border-ink bg-paper p-[10px] text-ink ">
        <Caps>Your event</Caps>
        <p className="mt-[2px] font-display text-[19px] leading-[1.05]">Meera &amp; Kabir&rsquo;s sangeet</p>
        <p className="text-[10px] text-muted">Sat 12 Dec · 120 guests</p>
        <div className="mt-[9px] space-y-[6px]">
          {stages.map((s, i) => (
            <div key={s.t} className="flex items-center gap-[8px]">
              <span
                className={`flex h-[20px] w-[20px] shrink-0 items-center justify-center rounded-full border-2 border-ink text-[9px] font-bold ${
                  s.d ? "bg-statusgreen text-white" : i === 2 ? "bg-coral text-white" : "bg-white"
                }`}
              >
                {s.d ? <Check size={10} strokeWidth={4} /> : i + 1}
              </span>
              <span className="flex-1 text-[11.5px] font-bold">{s.t}</span>
              <Pill tint={s.d ? "#D8F5EC" : i === 2 ? "#FFD6A5" : "#F3E6E2"}>
                {s.d ? "Done" : i === 2 ? "In progress" : "Next"}
              </Pill>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-[10px] flex items-center gap-[8px] rounded-[16px] border-2 border-ink bg-night2 p-[9px] ">
        <Av i={10} s={30} />
        <span className="leading-[1.25]">
          <span className="block text-[11px] font-bold">Your event lead</span>
          <span className="block text-[9.5px] text-nightmuted">Decor mood board is ready to review</span>
        </span>
      </div>
      <Btn tint="#FBF6F4" light={false} className="absolute inset-x-[14px] bottom-[14px] ">
        <Sparkles size={13} strokeWidth={2.6} /> Plan with Invytt
      </Btn>
    </Screen>
  );
}

export function TicketsScreen() {
  const tiers = [
    { t: "Early Bird", p: "₹499", s: "38 of 50 sold", w: "76%", c: "#8FD9B6" },
    { t: "General", p: "₹799", s: "64 of 150 sold", w: "43%", c: "#CDBEF7" },
    { t: "VIP", p: "₹1,999", s: "9 of 20 sold", w: "45%", c: "#FFD6A5" },
  ];
  return (
    <Screen>
      <Head caps="Rooftop open air night" title="Tickets" />
      <div className="mt-[10px] space-y-[7px]">
        {tiers.map((t) => (
          <Card key={t.t} tint={t.c} className="!p-[9px]">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-[6px] text-[12px] font-bold">
                <Ticket size={14} strokeWidth={2.4} /> {t.t}
              </span>
              <span className="font-display text-[19px] leading-none">{t.p}</span>
            </div>
            <div className="mt-[6px] h-[9px] overflow-hidden rounded-full border-2 border-ink bg-white">
              <i className="block h-full bg-ink" style={{ width: t.w }} />
            </div>
            <p className="mt-[3px] text-[9.5px] font-bold">{t.s}</p>
          </Card>
        ))}
      </div>
      <div className="relative mt-[10px] flex overflow-hidden rounded-[16px] border-2 border-ink bg-white ">
        <div className="flex-1 p-[9px] leading-[1.25]">
          <Caps>Payout</Caps>
          <p className="font-display text-[22px] leading-[1.1]">₹1,08,031</p>
          <p className="text-[9.5px] text-muted">To your bank account</p>
        </div>
        <div className="flex w-[66px] items-center justify-center border-l-2 border-dashed border-ink/60 bg-paper2">
          <FauxQr size={46} seed={31} />
        </div>
      </div>
      <Btn className="absolute inset-x-[14px] bottom-[14px]">
        <CreditCard size={13} strokeWidth={2.6} /> Buy ticket · ₹799
      </Btn>
    </Screen>
  );
}

export function BookingsScreen() {
  const rows: { I: typeof Package; t: string; s: string; c: string; tag: ReactNode }[] = [
    { I: Camera, t: "Frame & Flash Studio", s: "Sat 12 Dec · Photography", c: "#BFDDFB", tag: <Pill tint="#D8F5EC">Confirmed</Pill> },
    { I: CakeSlice, t: "Chocolate truffle cake", s: "Arrives Fri 4 Dec", c: "#FFD6A5", tag: <Pill tint="#FFD6A5">On the way</Pill> },
    { I: Ticket, t: "Rooftop open air night", s: "2 × General", c: "#CDBEF7", tag: <Pill>Ticket</Pill> },
  ];
  return (
    <Screen tab="profile">
      <Head caps="Profile" title="My bookings" />
      <div className="mt-[10px] space-y-[7px]">
        {rows.map(({ I, t, s, c, tag }) => (
          <Card key={t} className="flex items-center gap-[8px] !p-[8px]">
            <span className="flex h-[36px] w-[36px] shrink-0 items-center justify-center rounded-[10px] border-2 border-ink" style={{ background: c }}>
              <I size={16} strokeWidth={2.3} />
            </span>
            <span className="min-w-0 flex-1 leading-[1.2]">
              <span className="block text-[11px] font-bold">{t}</span>
              <span className="block text-[9px] text-muted">{s}</span>
            </span>
            {tag}
          </Card>
        ))}
      </div>
      <Caps className="mt-[12px]">Saved</Caps>
      <div className="mt-[6px] grid grid-cols-2 gap-[8px]">
        <Card tint="#2B1719" className="text-paper !p-[9px]">
          <Wallet size={15} strokeWidth={2.3} />
          <p className="mt-[8px] text-[10.5px] font-bold">Visa ···· 4417</p>
          <p className="text-[9px] text-nightmuted">Default card</p>
        </Card>
        <Card tint="#F6C1D0" className="!p-[9px]">
          <MapPin size={15} strokeWidth={2.3} />
          <p className="mt-[8px] text-[10.5px] font-bold">Home</p>
          <p className="text-[9px] text-ink/70">Indiranagar</p>
        </Card>
      </div>
    </Screen>
  );
}

export const SOON_SCREENS: Record<SoonFeature["screen"], ReactNode> = {
  shop: <ShopScreen />,
  services: <ServicesScreen />,
  venues: <VenuesScreen />,
  agency: <AgencyScreen />,
  tickets: <TicketsScreen />,
  bookings: <BookingsScreen />,
};
