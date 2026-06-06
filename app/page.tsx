import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import About from "@/components/About";
import FeaturedIn from "@/components/FeaturedIn";
import Partners from "@/components/Partners";
import FaqSection from "@/components/FAQ";
import TicketCTA from "@/components/TicketCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Marquee />
      <Nav />
      <main className="relative -mt-[68px]">
        <Hero />
        <div id="problem">
          <Partners />
        </div>
        {/* stacked panels: platform pins, how-it-works slides up and covers it.
            xs phones: panels fall back to normal flow (no sticky stack). */}
        <div className="relative">
          <div className="sticky top-0 max-[359.98px]:static">
            <FeaturedIn />
          </div>
          <div
            id="how-it-works"
            data-nav-light
            className="relative z-10 overflow-hidden rounded-t-[2.5rem] sticky top-0 max-[359.98px]:static"
          >
            <HowItWorks />
          </div>
        </div>
        <About />
        <FaqSection />
        <TicketCTA />
      </main>
      <Footer />
    </>
  );
}
