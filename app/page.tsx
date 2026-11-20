import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Pillars from "@/components/Pillars";
import Steps from "@/components/Steps";
import InsideApp from "@/components/InsideApp";
import PartyLive from "@/components/PartyLive";
import GuestWeb from "@/components/GuestWeb";
import About from "@/components/About";
import FaqSection from "@/components/FAQ";
import TicketCTA from "@/components/TicketCTA";
import Footer from "@/components/Footer";
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
