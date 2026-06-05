import {
  Users,
  MailOpen,
  Sparkles,
  Store,
  ClipboardList,
  ArrowRight,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ScrollRevealText } from "@/components/ScrollRevealText";

export default function FeaturedIn() {
  return (
    <section
      id="features"
      className="flex min-h-screen flex-col justify-center border-t border-white/10 bg-[#1a1a1a] px-5 py-10 text-white sm:py-24"
    >
      <div className="mx-auto mb-6 w-full max-w-7xl sm:mb-12">
        <Reveal>
          <p className="mb-4 text-sm uppercase tracking-[0.2em] text-accent sm:mb-6">
            The platform
          </p>
        </Reveal>
        <ScrollRevealText
          text="Five pillars. One platform."
          className="flex max-w-3xl flex-wrap font-display text-4xl font-bold leading-tight tracking-tight md:text-6xl"
        />
        <Reveal>
          <p className="mt-4 hidden max-w-2xl text-base text-white/60 sm:mt-6 sm:block sm:text-lg">
            Every part of the hosting journey — from the moment you decide to
            throw something to the moment the last guest leaves — in a single
            mobile-first experience.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto grid w-full max-w-7xl auto-rows-auto grid-cols-2 gap-3 sm:auto-rows-[minmax(15rem,1fr)] sm:gap-5 md:grid-cols-6 md:grid-rows-4">
        {/* Guest RSVP Management — hero tile */}
        <div className="group flex min-h-[7.5rem] flex-col justify-between rounded-3xl sm:min-h-0 transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/30 bg-[#9b8cdb] p-4 text-white sm:p-7 md:p-8 md:col-span-3 md:col-start-1 md:row-span-2 md:row-start-1">
          <Users className="size-7 transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110" />
          <div>
            <h3 className="font-display text-lg font-medium leading-snug sm:text-2xl md:text-3xl">
              Guest RSVP Management
            </h3>
            <p className="mt-2 max-w-md text-xs leading-snug sm:mt-3 sm:text-sm sm:leading-relaxed text-white/85">
              Invites, guestlists, +1s, WhatsApp RSVPs, reminders, and
              cost-splitting — all in one dashboard.
            </p>
          </div>
        </div>

        {/* Smart Inventory — AI */}
        <div className="group flex min-h-[7.5rem] flex-col justify-between rounded-3xl sm:min-h-0 transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/30 bg-[#221c3a] p-4 text-white sm:p-7 md:p-8 md:col-span-3 md:col-start-4 md:row-span-2 md:row-start-1">
          <Sparkles className="size-7 transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110" />
          <div>
            <h3 className="font-display text-lg font-medium leading-snug sm:text-2xl md:text-3xl">
              Smart Inventory Management
            </h3>
            <p className="mt-2 max-w-md text-xs leading-snug sm:mt-3 sm:text-sm sm:leading-relaxed text-white/75">
              AI sizes food, drink, and supplies to your guest count — with
              contributions and cost estimates.
            </p>
          </div>
        </div>

        {/* Invitation Design */}
        <div className="group flex min-h-[7.5rem] flex-col justify-between rounded-3xl sm:min-h-0 transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/30 bg-[#f3b53f] p-4 text-black sm:p-7 md:p-8 md:col-span-2 md:col-start-1 md:row-span-2 md:row-start-3">
          <MailOpen className="size-7 transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110" />
          <div>
            <h3 className="font-display text-lg font-medium leading-snug sm:text-xl md:text-2xl">
              Invitation Design &amp; Templates
            </h3>
            <p className="mt-2 text-xs leading-snug sm:mt-3 sm:text-sm sm:leading-relaxed text-black/70">
              Beautiful, customisable invites that feel personal — ready in
              minutes.
            </p>
          </div>
        </div>

        {/* Vendor Marketplace */}
        <div className="group flex min-h-[7.5rem] flex-col justify-between rounded-3xl sm:min-h-0 transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/30 bg-[#e2703a] p-4 text-white sm:p-7 md:p-8 md:col-span-2 md:col-start-3 md:row-span-2 md:row-start-3">
          <Store className="size-7 transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110" />
          <div>
            <h3 className="font-display text-lg font-medium leading-snug sm:text-xl md:text-2xl">
              Vendor Marketplace
            </h3>
            <p className="mt-2 text-xs leading-snug sm:mt-3 sm:text-sm sm:leading-relaxed text-white/85">
              Discover and book caterers, decorators, photographers, DJs, and
              more — with verified reviews.
            </p>
          </div>
        </div>

        {/* Party Planning */}
        <div className="group flex min-h-[7.5rem] flex-col justify-between rounded-3xl sm:min-h-0 transition duration-300 ease-out hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/30 bg-[#fff7e9] p-4 text-black sm:p-7 md:p-8 col-span-2 sm:col-span-1 md:col-span-2 md:col-start-5 md:row-span-2 md:row-start-3">
          <ClipboardList className="size-7 transition-transform duration-300 ease-out group-hover:-rotate-6 group-hover:scale-110" />
          <div>
            <h3 className="font-display text-lg font-medium leading-snug sm:text-xl md:text-2xl">
              Party Planning Management
            </h3>
            <p className="mt-2 text-xs leading-snug sm:mt-3 sm:text-sm sm:leading-relaxed text-black/60">
              Tasks, timelines, and budgets in one hub — co-plan with co-hosts.
            </p>
          </div>
        </div>
      </div>

      <Reveal className="mx-auto mt-6 w-full max-w-7xl sm:mt-10">
        <a
          href="#tickets"
          className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-accent"
        >
          Get early access
          <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
        </a>
      </Reveal>
    </section>
  );
}
