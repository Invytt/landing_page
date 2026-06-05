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
        {/* stacked panels: platform pins, how-it-works slides up and covers it. */}
        <div className="relative">
          <div className="sticky top-0">
            <FeaturedIn />
          </div>
          <div
            id="how-it-works"
            data-nav-light
            className="relative z-10 overflow-hidden rounded-t-[2.5rem] sticky top-0"
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
