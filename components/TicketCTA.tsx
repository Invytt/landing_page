"use client";

import { useState } from "react";
import Countdown from "./Countdown";
import { MARQUEE } from "@/app/data";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { Reveal } from "@/components/Reveal";
import { subscribe } from "@/lib/waitlist";
import { createAvatar } from "@dicebear/core";
import { lorelei } from "@dicebear/collection";

type SubmitState = "idle" | "loading" | "success" | "duplicate" | "error";

const BUTTON_LABEL: Record<SubmitState, string> = {
  idle: "Get early access",
  loading: "Joining…",
  success: "You're in ✓",
  duplicate: "Already joined",
  error: "Try again",
};

const PEOPLE = [
  { seed: "ava", bg: "b6e3f4" },
  { seed: "milo", bg: "ffd5dc" },
  { seed: "juno", bg: "c0aede" },
  { seed: "remy", bg: "ffdfbf" },
  { seed: "nova", bg: "d1f4d0" },
] as const;

const AVATARS = PEOPLE.map((p) =>
  createAvatar(lorelei, {
    seed: p.seed,
    backgroundColor: [p.bg],
    radius: 50,
    beardProbability: 0,
  }).toDataUri(),
);

export default function TicketCTA() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "loading" || state === "success") return;
    setState("loading");
    setMessage("");
    const result = await subscribe(
      email,
      process.env.NEXT_PUBLIC_SUBSCRIBE_URL as string,
    );
    setState(result.state);
    setMessage(result.message);
  };

  const disabled = state === "loading" || state === "success";

  return (
    <section id="tickets" className="border-t border-white/10 relative flex min-h-screen flex-col overflow-hidden bg-[#1a1a1a] text-white">
      <BackgroundBeams />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-5 py-20 text-center sm:py-28">
        <Reveal>
          <div className="mb-4 flex items-center justify-center gap-3 sm:mb-6 sm:gap-4">
            <span className="h-px w-8 bg-white/15 sm:w-12" />
            <p className="text-sm uppercase tracking-[0.2em] text-accent sm:text-base">
              Early access
            </p>
            <span className="h-px w-8 bg-white/15 sm:w-12" />
          </div>
          <h2 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl md:text-7xl">
            Ready to host without the chaos?
          </h2>
          <p className="mx-auto mt-5 max-w-md text-base text-white/70 sm:mt-6 sm:text-lg">
            Join the hosts building their next event on Invytt. Drop your email
            and we&apos;ll let you know the moment it&apos;s live.
          </p>
        </Reveal>

        <p className="mt-8 mb-3 text-xs uppercase tracking-[0.2em] text-white/40 sm:mt-10">
          Launching in
        </p>
        <Countdown />

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex w-full max-w-md items-center gap-2 rounded-full border border-white/15 bg-white/5 p-1.5 pl-6 transition focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/40 sm:mt-10"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={disabled}
            placeholder="you@email.com"
            className="min-w-0 flex-1 bg-transparent py-3 text-base text-white transition placeholder:text-white/40 focus:outline-none disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={disabled}
            className="shrink-0 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-accent disabled:cursor-not-allowed disabled:opacity-70"
          >
            {BUTTON_LABEL[state]}
          </button>
        </form>
        <p
          className={`mt-3 text-xs ${
            state === "error"
              ? "text-red-400"
              : state === "success" || state === "duplicate"
                ? "text-accent"
                : "text-white/40"
          }`}
        >
          {message || "No spam — just one email when we launch."}
        </p>

        <p className="mt-8 mb-3 text-xs uppercase tracking-[0.2em] text-white/40">
          Early-access perks
        </p>
        <Reveal className="flex flex-wrap justify-center gap-2">
          {MARQUEE.map((perk) => (
            <span
              key={perk}
              className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs text-white/70 transition duration-200 hover:-translate-y-0.5 hover:border-accent/60 hover:bg-accent/10 hover:text-white sm:text-sm"
            >
              {perk}
            </span>
          ))}
        </Reveal>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <div className="flex -space-x-2">
            {AVATARS.map((src, i) => (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img
                key={i}
                src={src}
                alt=""
                className="h-8 w-8 rounded-full bg-white/10 ring-2 ring-[#1a1a1a]"
              />
            ))}
          </div>
          <p className="text-sm text-white/60">
            Join the{" "}
            <span className="font-semibold text-white">everyday hosts</span>{" "}
            already in line
          </p>
        </div>
      </div>
    </section>
  );
}
