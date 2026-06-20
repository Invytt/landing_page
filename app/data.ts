export const COMPANY = {
  legalName: "Invytt Technology Private Limited",
  email: "events@invytt.com",
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
  target: "2026-08-01T09:00:00+05:30",
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
  { name: "Sakshi", role: "Birthday bash for Sakshi", img: "/img1.png" },
  { name: "The Mehtas", role: "Housewarming for The Mehtas", img: "/img2.png" },
  { name: "The Sharmas", role: "Rooftop Diwali for The Sharmas", img: "/img3.png" },
  { name: "The Crew", role: "Friday game night", img: "/img4.png" },
  { name: "Riya & Karan", role: "Anniversary dinner for two", img: "/img5.png" },
  { name: "Priya", role: "Baby shower event", img: "/img6.png" },
];

export const FAQ = [
  {
    q: "How is it different from group chats and spreadsheets?",
    a: "Everything lives in one place and talks to each other. Your guest count feeds your inventory estimate, which feeds your budget, which connects to vendors and cost-splitting. No copy-pasting between ten tools.",
  },
  {
    q: "Do my guests need to download the app to RSVP?",
    a: "No. Share one link, or let guests RSVP directly over WhatsApp no app required.",
  },
  {
    q: "How does the AI inventory estimator work?",
    a: "It scales food, drink, and supply quantities to your confirmed guest count, then gives per item cost estimates so you stay on budget.",
  },
  {
    q: "Can I split costs with my guests?",
    a: "Yes. Collect contributions and split costs among guests right inside the event no more midnight UPI requests.",
  },
  {
    q: "What kind of vendors can I book?",
    a: "Caterers, decorators, photographers, bartenders, DJs, and more with profiles, pricing, availability, and verified reviews.",
  }
];
