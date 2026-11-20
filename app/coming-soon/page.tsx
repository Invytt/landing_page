import type { Metadata } from "next";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/site/SmoothScroll";
import ScrollProgress from "@/components/site/ScrollProgress";
import Cursor from "@/components/site/Cursor";
import SoonHero from "@/components/soon/SoonHero";
import Track from "@/components/soon/Track";
import Marketplace from "@/components/soon/Marketplace";
import Agency from "@/components/soon/Agency";
import ForHosts from "@/components/soon/ForHosts";
import SoonCTA from "@/components/soon/SoonCTA";

const SOON_DESC =
  "What comes after launch on Invytt: a marketplace to shop, book services and venues, Invytt Agency to run the whole event for you, ticketed events, and bookings and payments in your profile.";

export const metadata: Metadata = {
  title: "Coming soon",
  description: SOON_DESC,
  alternates: { canonical: "/coming-soon" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Invytt",
    title: "Coming soon on Invytt — the next chapter of every party",
    description:
      "A marketplace for everything the party needs, Invytt Agency, ticketed events and more.",
    url: "/coming-soon",
    images: [
      {
        url: "/og-coming-soon.png",
        width: 1200,
        height: 630,
        alt: "The silver Invytt wordmark with the line: The next chapter of every party, and stickers for Shop, Book a service, Book venues, Invytt Agency and Ticketed events",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@invyttt",
    title: "Coming soon on Invytt — the next chapter of every party",
    description:
      "A marketplace for everything the party needs, Invytt Agency, ticketed events and more.",
    images: ["/og-coming-soon.png"],
  },
};

export default function ComingSoon() {
  return (
    <>
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      <Marquee />
      <Nav base="/" soon />
      <main className="relative">
        <SoonHero />
        <Track />
        <Marketplace />
        <Agency />
        <ForHosts />
        <SoonCTA />
      </main>
      <Footer base="/" soon />
    </>
  );
}
