import { Reveal } from "@/components/Reveal";
import { ScrollRevealText } from "@/components/ScrollRevealText";

export default function Partners() {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center border-t border-white/10 bg-[#1a1a1a] px-5 py-16 text-center text-white sm:py-24">
      <Reveal className="mb-6 flex items-center gap-3 sm:mb-8 sm:gap-4">
        <span className="h-px w-8 bg-white/15 sm:w-12" />
        <p className="text-sm uppercase tracking-[0.3em] text-accent sm:text-base">
          The problem
        </p>
        <span className="h-px w-8 bg-white/15 sm:w-12" />
      </Reveal>

      <ScrollRevealText
        text="Hosting today is fragmented and stressful."
        className="mx-auto flex max-w-3xl flex-wrap justify-center font-display text-[2rem] font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl"
      />
      <Reveal>
        <p className="mx-auto mt-5 max-w-2xl text-base text-white/60 sm:mt-6 sm:text-lg">
          Planning an event means juggling ten different tools that don&apos;t
          talk to each other and the host ends up doing the most work and
          enjoying it the least. Invytt replaces all of it.
        </p>
      </Reveal>
    </section>
  );
}
