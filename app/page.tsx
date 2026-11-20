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
  PartyLive,
  Pillars,
  Steps,
  TicketCTA,
} from "@/components/site/lazy";
import Loader from "@/components/site/Loader";
import SmoothScroll from "@/components/site/SmoothScroll";
import ScrollProgress from "@/components/site/ScrollProgress";
import Cursor from "@/components/site/Cursor";

export default function Home() {
  return (
    <>
      <Loader />
      <SmoothScroll />
      <ScrollProgress />
      <Cursor />
      <Marquee />
      <Nav />
      <main className="relative">
        <Hero />
        <Problem />
        {/* The two anchors of the page: five pillars, then five steps. */}
        <Pillars />
        <Steps />
        <InsideApp />
        <PartyLive />
        <GuestWeb />
        <About />
        <FaqSection />
        <TicketCTA />
      </main>
      <Footer />
    </>
  );
}
