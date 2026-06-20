import { LayoutTextFlip } from "@/components/ui/layout-text-flip";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-screen flex-col overflow-hidden bg-black text-white">
      {/* background video */}
      <video
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/vid1-poster.webp"
      >
        <source src="/vid1.webm" type="video/webm" />
        <source src="/vid1.mp4" type="video/mp4" />
      </video>
      {/* gradient overlay for contrast */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/40 to-black/20" />

      {/* centered hero copy */}
      <div className="relative z-30 flex flex-1 flex-col items-center justify-end gap-5 px-6 pb-28 text-center sm:gap-6 sm:pb-44">
        <h1 className="reveal flex flex-col items-center justify-center gap-x-2 gap-y-1 font-display lg:flex-row lg:flex-wrap">
          <LayoutTextFlip
            text="Host your"
            words={["birthday", "housewarming", "special day", ]}
          />
        </h1>

        <p
          className="reveal mt-1 max-w-xl text-base text-white/80 sm:text-lg md:text-xl"
          style={{ animationDelay: "0.15s" }}
        >
          Invites, RSVPs, AI inventory planning, a vendor marketplace, and
          cost-splitting all in one app. You bring the people, Invytt brings
          the rest.
        </p>

        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button
            render={<a href="#tickets" />}
            nativeButton={false}
            size="lg"
            className="reveal h-12 gap-2 rounded-full bg-white px-9 text-base font-semibold text-black shadow-lg shadow-black/20 transition-all hover:bg-black hover:text-white hover:shadow-black/40"
            style={{ animationDelay: "0.3s" }}
          >
            Join the waitlist today
            <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" />
          </Button>

          <Button
            render={
              <a
                href="https://events.invytt.com"
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            nativeButton={false}
            size="lg"
            className="reveal h-12 gap-2 rounded-full bg-black px-9 text-base font-semibold text-white shadow-lg shadow-black/20 transition-all hover:bg-white hover:text-black hover:shadow-black/40"
            style={{ animationDelay: "0.45s" }}
          >
            Explore early event program
            <ArrowRight className="size-4 transition-transform group-hover/button:translate-x-0.5" />
          </Button>
        </div>
      </div>

      {/* scroll cue */}
      <a
        href="#problem"
        aria-label="Scroll to see more"
        className="absolute inset-x-0 bottom-6 z-30 mx-auto flex w-fit animate-bounce text-white/70 transition hover:text-white"
      >
        <ChevronDown className="size-8" />
      </a>
    </section>
  );
}
