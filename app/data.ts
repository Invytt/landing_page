import { LAUNCH_DATE_LABEL, LAUNCH_TARGET } from "@/lib/launch";

export const COMPANY = {
  legalName: "INVYTT PRIVATE LIMITED",
  email: "support@invytt.com",
  year: "2026",
};

export const EVENT = {
  name: "Invytt",
  tagline: "The all-in-one platform for hosting events.",
  dateLabel: "Coming soon",
  year: "2026",
  city: "India",
  dateRange: "Launching 2026",
  hours: "",
  venue: "",
  address: "",
  // Derived from launch_date.json — change the date/time there, not here.
  target: LAUNCH_TARGET,
  price: "Free to start",
};

export const MARQUEE = [
  "Founding-host badge",
  "Early-bird discount on vendor bookings",
  "Priority access to vetted vendors",
  "Exclusive invites to Invytt events",
];

// Repurposed for the "Who it's for" cards — everyday hosts and the events they throw.
export type Speaker = { name: string; role: string; img: string };

export const SPEAKERS: Speaker[] = [
  { name: "Sakshi", role: "Birthday bash for Sakshi", img: "/img1.webp" },
  { name: "The Mehtas", role: "Housewarming for The Mehtas", img: "/img2.webp" },
  { name: "The Sharmas", role: "Rooftop Diwali for The Sharmas", img: "/img3.webp" },
  { name: "The Crew", role: "Friday game night", img: "/img4.webp" },
  { name: "Riya & Karan", role: "Anniversary dinner for two", img: "/img5.webp" },
  { name: "Priya", role: "Baby shower event", img: "/img6.webp" },
];

// The FAQ, grouped by topic. The five original answers are kept word for word;
// FAQ (flat) feeds the FAQPage structured data in app/layout.tsx.
export type FaqItem = { q: string; a: string };
export type FaqGroup = { id: string; label: string; tint: string; items: FaqItem[] };

export const FAQ_GROUPS: FaqGroup[] = [
  {
    id: "basics",
    label: "The basics",
    tint: "#CDBEF7",
    items: [
      {
        q: "What is Invytt?",
        a: "An app for hosting anything from a dinner for six to Diwali for thirty. You create the event, invite people, plan the supplies, split the cost and run the party itself from one place.",
      },
      {
        q: "How is it different from group chats and spreadsheets?",
        a: "Everything lives in one place and talks to each other. Your guest count feeds your inventory estimate, which feeds your budget, which connects to vendors and cost-splitting. No copy-pasting between ten tools.",
      },
      {
        q: "How much does it cost?",
        a: "Invytt is free to start. Join the waitlist and we'll tell you everything that's included when we launch.",
      },
      {
        q: "When and where are you launching?",
        a: `We're launching in India on ${LAUNCH_DATE_LABEL}. The countdown at the top of this page is ticking towards it.`,
      },
      {
        q: "Which phones does it work on?",
        a: "Hosts use the Invytt app on iPhone and Android. Guests can reply from any phone or laptop browser.",
      },
    ],
  },
  {
    id: "hosting",
    label: "Hosting",
    tint: "#FFD6A5",
    items: [
      {
        q: "How long does it take to set up an event?",
        a: "A few minutes. Name it, set the date and place, pick an invite style, and share the link.",
      },
      {
        q: "What do the invites look like?",
        a: "There are ten styles to choose from: Poster, Ticket, Invitation, Editorial, Bento, Zine, Receipt, Thread, Calendar and Record. Pick one and make it yours.",
      },
      {
        q: "How does the AI inventory estimator work?",
        a: "It scales food, drink, and supply quantities to your confirmed guest count, then gives per item cost estimates so you stay on budget.",
      },
      {
        q: "Can I plan with co-hosts?",
        a: "Yes. Share the tasks, timeline and budget with your co-hosts and plan the event together.",
      },
      {
        q: "Can guests bring a +1?",
        a: "Yes. +1s are part of your guest list, so your headcount and supply estimates count them too.",
      },
    ],
  },
  {
    id: "guests",
    label: "Your guests",
    tint: "#8FD9B6",
    items: [
      {
        q: "Do my guests need to download the app to RSVP?",
        a: "No. Share one link, or let guests RSVP directly over WhatsApp no app required.",
      },
      {
        q: "What do guests see when they open the link?",
        a: "A web page with your invite, the date, the place and who's hosting, plus Going, Maybe and Can't buttons.",
      },
      {
        q: "How does replying from the link work?",
        a: "Guests pick Going, Maybe or Can't and confirm their phone number with a one-time code. No account, no password.",
      },
      {
        q: "What if a guest is already on Invytt?",
        a: "The link spots it and sends them to the app to reply, so their RSVP stays with their account.",
      },
    ],
  },
  {
    id: "party",
    label: "At the party",
    tint: "#FF9A5C",
    items: [
      {
        q: "What happens when the event goes live?",
        a: "The event chat gets a companion and a games room. The host companion helps you run the night; guests get a party companion of their own.",
      },
      {
        q: "What games are there, and who can start one?",
        a: "Eight: Find your match, Guest bingo, Pair-up roulette, Two truths and a lie, Who's most likely, Hot takes, Quick trivia and Tap race. Anyone who's going can start one, host or guest, and everyone plays from their own phone.",
      },
      {
        q: "Are game scores saved?",
        a: "No. The games are for the night: they live while the party does and nothing is kept afterwards.",
      },
      {
        q: "How does meeting someone by QR work?",
        a: "Every profile has a code. Point a phone camera at it and you're connected, with the party you met at remembered for you.",
      },
    ],
  },
  {
    id: "money",
    label: "Money & vendors",
    tint: "#F6C1D0",
    items: [
      {
        q: "Can I split costs with my guests?",
        a: "Yes. Collect contributions and split costs among guests right inside the event no more midnight UPI requests.",
      },
      {
        q: "How do I see who has paid?",
        a: "The group pot shows the total, each person's share, and who has paid and who hasn't yet.",
      },
      {
        q: "What kind of vendors can I book?",
        a: "Caterers, decorators, photographers, bartenders, DJs, and more with profiles, pricing, availability, and verified reviews.",
      },
      {
        q: "Is the vendor marketplace available at launch?",
        a: "It's coming soon. Early-access hosts get priority access to vetted vendors and an early-bird discount on bookings when it opens.",
      },
    ],
  },
  {
    id: "early",
    label: "Early access",
    tint: "#BFDDFB",
    items: [
      {
        q: "What do I get for joining the waitlist?",
        a: "A founding-host badge, an early-bird discount on vendor bookings, priority access to vetted vendors, and exclusive invites to Invytt events.",
      },
      {
        q: "Will you email me a lot?",
        a: "No spam. Just one email when we launch.",
      },
      {
        q: "I still have a question.",
        a: "Write to us at support@invytt.com and we'll get back to you.",
      },
    ],
  },
];

export const FAQ: FaqItem[] = FAQ_GROUPS.flatMap((g) => g.items);

// ── The five pillars. Copy is fixed: do not reword. ──────────────────────────
export type Pillar = {
  n: string;
  title: string;
  body: string;
  tint: string;
  screen: "rsvp" | "inventory" | "templates" | "vendors" | "planning";
  soon?: boolean;
};

export const PILLARS: Pillar[] = [
  {
    n: "01",
    title: "Guest RSVP Management",
    body: "Invites, guestlists, +1s, WhatsApp RSVPs, reminders, and cost-splitting all in one dashboard.",
    tint: "#CDBEF7",
    screen: "rsvp",
  },
  {
    n: "02",
    title: "Smart Inventory Management",
    body: "AI sizes food, drink, and supplies to your guest count with contributions and cost estimates.",
    tint: "#8FD9B6",
    screen: "inventory",
  },
  {
    n: "03",
    title: "Invitation Design & Templates",
    body: "Beautiful, customisable invites that feel personal ready in minutes.",
    tint: "#FFD6A5",
    screen: "templates",
  },
  {
    n: "04",
    title: "Vendor Marketplace",
    body: "Discover and book caterers, decorators, photographers, DJs, and more with verified reviews.",
    tint: "#BFDDFB",
    screen: "vendors",
    soon: true,
  },
  {
    n: "05",
    title: "Party Planning Management",
    body: "Tasks, timelines, and budgets in one hub co-plan with co-hosts.",
    tint: "#F6C1D0",
    screen: "planning",
  },
];

// ── The five steps. Copy is fixed: do not reword. ────────────────────────────
export type Step = {
  n: string;
  title: string;
  body: string;
  tint: string;
  screen: "create" | "share" | "inventory" | "vendors" | "split";
  soon?: boolean;
};

export const STEPS: Step[] = [
  {
    n: "1",
    title: "Create your event",
    body: "Pick a template, set the date and venue, design your invite. Ready in minutes.",
    tint: "#FFD6A5",
    screen: "create",
  },
  {
    n: "2",
    title: "Invite & coordinate",
    body: "Share one link, track RSVPs (even over WhatsApp), and manage +1s.",
    tint: "#CDBEF7",
    screen: "share",
  },
  {
    n: "3",
    title: "Plan your supplies",
    body: "Let AI size your food, drink, and supply list to your final guest count, and assign who brings what.",
    tint: "#8FD9B6",
    screen: "inventory",
  },
  {
    n: "4",
    title: "Book your vendors",
    body: "Browse vetted caterers, decorators, photographers, and DJs book and pay in-app.",
    tint: "#BFDDFB",
    screen: "vendors",
    soon: true,
  },
  {
    n: "5",
    title: "Split the bill",
    body: "Collect contributions and split costs with guests no more midnight UPI requests.",
    tint: "#F6C1D0",
    screen: "split",
  },
];

// The eight live games, named as in the app.
export const GAMES = [
  { title: "Find your match", blurb: "Find who holds your other half", meta: "4+ · 5 min", tint: "#CDBEF7" },
  { title: "Guest bingo", blurb: "Fill your card with real people", meta: "3+ · 10 min", tint: "#8FD9B6" },
  { title: "Pair-up roulette", blurb: "Spin, get paired, go chat", meta: "4+ · 4 min a round", tint: "#FFD6A5" },
  { title: "Two truths and a lie", blurb: "Spot the lie in each story", meta: "3–20 · 10 min", tint: "#F6C1D0" },
  { title: "Who\u2019s most likely", blurb: "Vote for who fits the prompt", meta: "3+ · 5 min", tint: "#BFDDFB" },
  { title: "Hot takes", blurb: "Agree or disagree, then debate", meta: "3+ · 5 min", tint: "#FF9A5C" },
  { title: "Quick trivia", blurb: "5 questions, points for speed", meta: "2+ · 3 min", tint: "#CDBEF7" },
  { title: "Tap race", blurb: "Wait for green, then tap", meta: "2+ · 1 min", tint: "#8FD9B6" },
];

// The ten tools a host juggles today (the problem scene).
export const TOOLS = [
  "Group chat",
  "Spreadsheet",
  "UPI requests",
  "Notes app",
  "Calendar",
  "Invite maker",
  "Google Form",
  "Vendor calls",
  "Reminders",
  "Photo album",
];

// ── What's coming after launch (the /coming-soon page) ────────────────────────
// Everything here is built into the app but held back from the first release.
// Copy follows the app's own wording where it has some.
export type SoonFeature = {
  id: string;
  group: "Marketplace" | "For hosts";
  title: string;
  line: string;
  points: string[];
  tint: string;
  screen: "shop" | "services" | "venues" | "agency" | "tickets" | "bookings";
};

export const SOON: SoonFeature[] = [
  {
    id: "shop",
    group: "Marketplace",
    title: "Shop",
    line: "Cakes, flowers, decor, gifts and everything in between.",
    points: ["Cakes, flowers, decor and gifts", "Cart and checkout in the app", "Reviews on every vendor"],
    tint: "#FFD6A5",
    screen: "shop",
  },
  {
    id: "services",
    group: "Marketplace",
    title: "Book a service",
    line: "Photographers, caterers, decorators and more.",
    points: ["Profiles and pricing", "Availability", "Verified reviews"],
    tint: "#BFDDFB",
    screen: "services",
  },
  {
    id: "venues",
    group: "Marketplace",
    title: "Book venues",
    line: "Rooftops, banquets, resorts and party halls.",
    points: ["Rooftops and banquets", "Resorts and party halls", "Landing city by city"],
    tint: "#CDBEF7",
    screen: "venues",
  },
  {
    id: "agency",
    group: "Marketplace",
    title: "Invytt Agency",
    line: "End-to-end event management by Invytt: concept, vendors, decor and coordination. We handle it all.",
    points: ["Concept", "Vendors", "Decor", "Coordination"],
    tint: "#FF9A5C",
    screen: "agency",
  },
  {
    id: "tickets",
    group: "For hosts",
    title: "Ticketed events",
    line: "Sell tickets to your public events, with tiers and payouts to you.",
    points: ["Early Bird, General and VIP tiers", "Guests buy in the app", "Payouts to you"],
    tint: "#F6C1D0",
    screen: "tickets",
  },
  {
    id: "bookings",
    group: "For hosts",
    title: "Bookings & payments",
    line: "Your bookings, tickets, payment methods and addresses, kept in your profile.",
    points: ["My bookings", "Ticket manager", "Saved payment methods and addresses"],
    tint: "#8FD9B6",
    screen: "bookings",
  },
];
