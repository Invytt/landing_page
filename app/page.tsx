import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Footer from "@/components/Footer";
// below the first screen: HTML now, scripts as the visitor scrolls near
import {
  About,
  FaqSection,
  GuestWeb,
  InsideApp,
  Mingle,
  PartyLive,
  Pillars,
  Steps,
  TicketCTA,
} from "@/components/site/lazy";
import SmoothScroll from "@/components/site/SmoothScroll";
import ScrollProgress from "@/components/site/ScrollProgress";
import StickyJoin from "@/components/site/StickyJoin";

export default function Home() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-[100] focus:rounded-full focus:border-2 focus:border-ink focus:bg-paper focus:px-5 focus:py-3 focus:font-bold focus:text-ink"
      >
        Skip to content
      </a>
      <SmoothScroll />
      <ScrollProgress />
      <Marquee />
      <Nav />
      <main id="main" className="relative">
        <Hero />
        <Problem />
        {/* The two anchors of the page: five pillars, then five steps. */}
        <Pillars />
        <Steps />
        <InsideApp />
        {/* guests who don't mingle, and the icebreakers that fix it */}
        <Mingle />
        <PartyLive />
        <GuestWeb />
        <About />
        <FaqSection />
        <TicketCTA />
      </main>
      <Footer />
      <StickyJoin />
    </>
  );
}
