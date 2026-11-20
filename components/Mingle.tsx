"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useInView } from "motion/react";
import { ArrowDown, DoorOpen, Megaphone, UsersRound } from "lucide-react";
import { BINGO_SQUARES, ICEBREAKERS, MINGLE_PAINS, type Icebreaker } from "@/app/data";
import { Eyebrow, Reveal, Scallop, Spark, Stamp, Sticker, Words } from "@/components/ui/kit";
import { Av } from "@/components/screens/parts";
import { cn } from "@/lib/utils";
import { useMedia } from "@/lib/perf";

/* ── The party floor: the same guests, before and after the icebreakers ── */

type P = [number, number]; // centre, in % of the floor

// Each spot is given twice: for a wide floor, then for a tall phone floor.
type Spot = { w: P; n: P };

// Asha (5) is the host. Everyone else came with their own circle, or alone.
const PEOPLE: { id: number; alone: Spot; mixed: Spot }[] = [
  // college friends
  { id: 1, alone: { w: [15, 27], n: [17, 17] }, mixed: { w: [13, 30], n: [15, 16] } },
  { id: 2, alone: { w: [27, 23], n: [37, 15] }, mixed: { w: [41, 24], n: [64, 16] } },
  { id: 3, alone: { w: [17, 43], n: [19, 29] }, mixed: { w: [16, 70], n: [14, 66] } },
  { id: 4, alone: { w: [29, 40], n: [39, 28] }, mixed: { w: [64, 72], n: [64, 41] } },
  // work friends
  { id: 6, alone: { w: [71, 24], n: [64, 41] }, mixed: { w: [73, 26], n: [15, 41] } },
  { id: 7, alone: { w: [83, 27], n: [83, 40] }, mixed: { w: [26, 32], n: [36, 17] } },
  { id: 8, alone: { w: [77, 40], n: [73, 52] }, mixed: { w: [24, 84], n: [25, 77] } },
  // family
  { id: 9, alone: { w: [43, 73], n: [33, 79] }, mixed: { w: [86, 31], n: [36, 42] } },
  { id: 10, alone: { w: [55, 75], n: [49, 80] }, mixed: { w: [77, 76], n: [85, 42] } },
  // only know the host
  { id: 11, alone: { w: [7, 84], n: [78, 76] }, mixed: { w: [54, 27], n: [85, 17] } },
  { id: 12, alone: { w: [93, 82], n: [90, 84] }, mixed: { w: [30, 73], n: [35, 64] } },
  // the host
  { id: 5, alone: { w: [50, 45], n: [27, 55] }, mixed: { w: [49, 52], n: [74, 67] } },
];

const HOST = 5;

// before: the circles people arrived in
const CIRCLES: { label: string; at: Spot; size: Spot }[] = [
  { label: "College friends", at: { w: [22, 34], n: [28, 22] }, size: { w: [28, 40], n: [50, 25] } },
  { label: "Work friends", at: { w: [77, 31], n: [74, 46] }, size: { w: [24, 38], n: [42, 23] } },
  { label: "Family", at: { w: [49, 74], n: [41, 80] }, size: { w: [22, 26], n: [36, 13] } },
];

// after: who got talking, and which icebreaker did it
const PAIRS: { ids: number[]; label: string; at: Spot; tint: string }[] = [
  { ids: [1, 7], label: "Find your match", at: { w: [19, 15], n: [26, 7] }, tint: "#CDBEF7" },
  { ids: [2, 11], label: "Guest bingo", at: { w: [47, 11], n: [75, 7] }, tint: "#8FD9B6" },
  { ids: [6, 9], label: "Pair-up roulette", at: { w: [79, 13], n: [26, 32] }, tint: "#FFD6A5" },
  { ids: [3, 12, 8], label: "Two truths and a lie", at: { w: [23, 58], n: [25, 56] }, tint: "#F6C1D0" },
  { ids: [4, 10], label: "Break the ice", at: { w: [71, 60], n: [75, 32] }, tint: "#BFDDFB" },
];

// the labels that name each group, before and after
const BEFORE: { text: string; at: Spot; tint: string; light?: boolean }[] = [
  { text: "College friends", at: { w: [22, 8], n: [28, 5] }, tint: "#fff" },
  { text: "Work friends", at: { w: [77, 8], n: [74, 31] }, tint: "#fff" },
  { text: "Family", at: { w: [49, 92], n: [41, 91] }, tint: "#fff" },
  { text: "Knows only the host", at: { w: [13, 70], n: [76, 66] }, tint: "#FFEAE5" },
  { text: "Knows only the host", at: { w: [86, 68], n: [82, 66] }, tint: "#FFEAE5" },
  { text: "Host, doing every introduction", at: { w: [50, 32], n: [27, 64] }, tint: "#D2402A", light: true },
];
const AFTER_HOST: { text: string; at: Spot; tint: string }[] = [
  { text: "Host, enjoying the party", at: { w: [49, 64], n: [74, 57] }, tint: "#8FD9B6" },
  { text: "Work the room: the host companion picked the games", at: { w: [49, 92], n: [50, 92] }, tint: "#fff" },
];

function Floor({ mixed, narrow }: { mixed: boolean; narrow: boolean }) {
  const at = (sp: Spot) => (narrow ? sp.n : sp.w);
  const posOf = (id: number) => at(PEOPLE.find((x) => x.id === id)!.mixed);
  return (
    <div
      aria-hidden
      className="dots relative h-[600px] overflow-hidden rounded-[28px] border-2 border-ink bg-white shadow-[6px_6px_0_var(--color-ink)] sm:h-[460px]"
      style={{ contain: "layout paint" }}
    >
      {/* before: the circles */}
      {CIRCLES.map((c) => (
        <div
          key={c.label}
          className="absolute rounded-full border-2 border-dashed border-ink/30 bg-tint/60 transition-opacity duration-500"
          style={{
            left: `${at(c.at)[0]}%`,
            top: `${at(c.at)[1]}%`,
            width: `${at(c.size)[0]}%`,
            height: `${at(c.size)[1]}%`,
            transform: "translate(-50%, -50%)",
            opacity: mixed ? 0 : 1,
          }}
        />
      ))}

      {/* after: lines between the people who got talking */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {PAIRS.flatMap((pr) =>
          pr.ids.slice(1).map((id, k) => {
            const a = posOf(pr.ids[k]);
            const b = posOf(id);
            return (
              <line
                key={`${pr.label}-${id}`}
                x1={a[0]}
                y1={a[1]}
                x2={b[0]}
                y2={b[1]}
                stroke="#D2402A"
                strokeWidth={3}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{
                  opacity: mixed ? 1 : 0,
                  transition: `opacity 0.4s ease ${mixed ? 0.9 : 0}s`,
                }}
              />
            );
          }),
        )}
      </svg>

      {/* the guests */}
      {PEOPLE.map((p, i) => {
        const [x, y] = at(mixed ? p.mixed : p.alone);
        return (
          <div
            key={p.id}
            className="absolute"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-50%, -50%)",
              transition: `left 0.9s cubic-bezier(0.7, 0, 0.3, 1) ${i * 0.04}s, top 0.9s cubic-bezier(0.7, 0, 0.3, 1) ${i * 0.04}s`,
            }}
          >
            <Av i={p.id} s={38} className={cn("shadow-[2px_2px_0_var(--color-ink)]", p.id === HOST && "ring-2 ring-coral ring-offset-2")} />
          </div>
        );
      })}

      {/* labels sit beside people, never on top of them */}
      {BEFORE.map((t, k) =>
        // on a phone the two people who only know the host share one label
        narrow && k === 4 ? null : (
          <Tag key={k} show={!mixed} at={at(t.at)} tint={t.tint} light={t.light}>
            {t.text}
          </Tag>
        ),
      )}
      {PAIRS.map((pr) => (
        <Tag key={pr.label} show={mixed} at={at(pr.at)} tint={pr.tint} delay={1}>
          {pr.label}
        </Tag>
      ))}
      {AFTER_HOST.map((t, k) => (
        <Tag key={t.text} show={mixed} at={at(t.at)} tint={t.tint} delay={1.1 + k * 0.1} wide={k === 1}>
          {t.text}
        </Tag>
      ))}
    </div>
  );
}

function Tag({
  children,
  at,
  show,
  tint,
  light = false,
  delay = 0,
  wide = false,
}: {
  children: ReactNode;
  at: P;
  show: boolean;
  tint: string;
  light?: boolean;
  delay?: number;
  /** may run across most of a phone's floor */
  wide?: boolean;
}) {
  return (
    <span
      className={cn(
        "absolute w-max rounded-full border-2 border-ink px-2.5 py-1 text-center text-[11px] font-bold leading-tight shadow-[2px_2px_0_var(--color-ink)] sm:max-w-none sm:whitespace-nowrap sm:text-xs",
        wide ? "max-w-[88%]" : "max-w-[44%]",
        light ? "text-white" : "text-ink",
      )}
      style={{
        left: `${at[0]}%`,
        top: `${at[1]}%`,
        background: tint,
        transform: `translate(-50%, -50%) scale(${show ? 1 : 0.6})`,
        opacity: show ? 1 : 0,
        transition: `opacity 0.35s ease ${show ? delay : 0}s, transform 0.35s ease ${show ? delay : 0}s`,
      }}
    >
      {children}
    </span>
  );
}

/* ── Small pictures of each icebreaker ────────────────────────────────── */

function Bubble({ children, me = false }: { children: ReactNode; me?: boolean }) {
  return (
    <span
      className={cn(
        "max-w-[85%] rounded-2xl border-2 border-ink px-3 py-1.5 text-xs font-semibold leading-snug",
        me ? "self-end rounded-br-md bg-coral text-white" : "self-start rounded-bl-md bg-white text-ink",
      )}
    >
      {children}
    </span>
  );
}

function Demo({ id }: { id: Icebreaker["id"] }) {
  switch (id) {
    case "match":
      return (
        <div className="flex flex-col items-center gap-3">
          <div className="flex items-center">
            <span className="h-14 w-7 rounded-l-full border-2 border-r-0 border-ink bg-lilac transition-transform duration-500 group-hover:translate-x-1.5" />
            <span className="mx-2 text-lg font-bold text-ink/40 transition-opacity duration-300 group-hover:opacity-0">+</span>
            <span className="h-14 w-7 rounded-r-full border-2 border-l-0 border-ink bg-lilac transition-transform duration-500 group-hover:-translate-x-1.5" />
          </div>
          <span className="rounded-full border-2 border-ink bg-white px-3 py-1 text-xs font-bold">
            &ldquo;How do you know the host?&rdquo;
          </span>
        </div>
      );
    case "bingo":
      return (
        <ul className="grid w-full max-w-[250px] grid-cols-3 gap-1">
          {BINGO_SQUARES.map((sq, k) => {
            const got = k === 0 || k === 4 || k === 6;
            return (
              <li
                key={sq}
                className={cn(
                  "flex min-h-[38px] items-center justify-center rounded-lg border-[1.5px] border-ink px-1 text-center text-[10px] font-bold leading-tight",
                  got ? "bg-going text-goingtext" : "bg-white text-ink",
                )}
              >
                {got ? `✓ ${sq}` : sq}
              </li>
            );
          })}
        </ul>
      );
    case "roulette":
      return (
        <div className="flex items-center gap-4">
          <span
            className="spin-slow block h-16 w-16 rounded-full border-2 border-ink"
            style={{
              background:
                "conic-gradient(#CDBEF7 0 60deg,#8FD9B6 60deg 120deg,#FFD6A5 120deg 180deg,#F6C1D0 180deg 240deg,#BFDDFB 240deg 300deg,#FF9A5C 300deg 360deg)",
              animationDuration: "9s",
            }}
          />
          <div className="flex flex-col items-start gap-2">
            <span className="flex items-center gap-1.5 rounded-full border-2 border-ink bg-white py-0.5 pl-0.5 pr-3 text-xs font-bold">
              <Av i={3} s={24} />
              <Av i={7} s={24} style={{ marginLeft: -10 }} /> You + Kabir
            </span>
            <span className="rounded-full border-2 border-ink bg-ink px-2.5 py-0.5 text-xs font-bold tabular-nums text-paper">
              4:00 to chat
            </span>
          </div>
        </div>
      );
    case "truths":
      return (
        <ul className="flex w-full max-w-[250px] flex-col gap-1.5">
          {["Has been on TV", "Can cook biryani", "Knows a magic trick"].map((t, k) => (
            <li
              key={t}
              className="flex items-center justify-between gap-2 rounded-xl border-2 border-ink bg-white px-3 py-1.5 text-xs font-bold"
            >
              <span>{t}</span>
              {k === 1 ? (
                <Stamp rotate={-6} className="!px-1.5 !py-0 !text-[10px]">
                  Lie
                </Stamp>
              ) : (
                <span className="text-[10px] font-semibold text-muted">{k === 0 ? "4 votes" : "2 votes"}</span>
              )}
            </li>
          ))}
        </ul>
      );
    case "ice":
      return (
        <div className="flex w-full max-w-[250px] flex-col gap-1.5">
          <Bubble me>Give me an icebreaker</Bubble>
          <Bubble>Ask them: what&rsquo;s the best thing you&rsquo;ve eaten this year?</Bubble>
        </div>
      );
    case "room":
      return (
        <div className="flex w-full max-w-[250px] flex-col gap-1.5">
          <Bubble me>How do I get people talking?</Bubble>
          <Bubble>Start Pair-up roulette: a new partner every 4 minutes.</Bubble>
        </div>
      );
  }
}

function IceCard({ b, i }: { b: Icebreaker; i: number }) {
  return (
    <Reveal delay={(i % 3) * 0.08} className="h-full">
      <article
        className="stk group flex h-full flex-col rounded-[26px] p-5 text-ink transition-transform duration-300 hover:-translate-y-1"
        style={{ background: b.tint } as CSSProperties}
      >
        <div className="flex h-[150px] items-center justify-center rounded-[18px] border-2 border-ink bg-paper/70 px-3">
          <Demo id={b.id} />
        </div>
        <h3 className="display mt-5 text-[2rem] leading-none">{b.title}</h3>
        <p className="mt-2 flex-1 text-[15px] leading-snug text-ink/80">{b.body}</p>
        <span className="mt-4 self-start rounded-full border-2 border-ink bg-white px-3 py-1 text-xs font-bold">{b.meta}</span>
      </article>
    </Reveal>
  );
}

const PAIN_ICONS = [UsersRound, Megaphone, DoorOpen];

export default function Mingle() {
  const floor = useRef<HTMLDivElement>(null);
  const seen = useInView(floor, { once: true, amount: 0.5 });
  const [mixed, setMixed] = useState(false);
  const touched = useRef(false);
  // a tall floor on phones, with its own arrangement
  const narrow = useMedia("(max-width: 639px)") === true;

  // play the change once, shortly after the floor comes into view
  useEffect(() => {
    if (!seen || touched.current) return;
    const id = window.setTimeout(() => !touched.current && setMixed(true), 1400);
    return () => window.clearTimeout(id);
  }, [seen]);

  const pick = (v: boolean) => {
    touched.current = true;
    setMixed(v);
  };

  return (
    <section id="mingle" className="dots relative isolate bg-paper pb-24 pt-28 lg:pb-32">
      <Scallop color="var(--color-paper2)" at="top" />

      <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
        <Eyebrow className="justify-center">The other problem</Eyebrow>
        <h2 className="display mt-4 text-[clamp(2.4rem,5.6vw,4.6rem)] text-ink">
          <Words text="Everyone came. *Nobody mingled.*" />
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          You got everyone through the door. Then they stood in the same little
          circles all night, and the people who only knew you ran out of
          things to say.
        </p>
      </div>

      {/* what it looks like without help */}
      <ul className="mx-auto mt-12 grid max-w-6xl gap-4 px-5 sm:grid-cols-3 sm:px-8">
        {MINGLE_PAINS.map((p, i) => {
          const Icon = PAIN_ICONS[i];
          return (
            <li key={p.title}>
              <Reveal delay={i * 0.08} className="h-full">
                <div className="stk-sm flex h-full gap-3 rounded-[22px] bg-white p-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-ink bg-tint">
                    <Icon size={18} strokeWidth={2.4} />
                  </span>
                  <span>
                    <span className="block text-base font-bold text-ink">{p.title}</span>
                    <span className="mt-1 block text-[15px] leading-snug text-muted">{p.body}</span>
                  </span>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>

      {/* the same room, before and after */}
      <div ref={floor} className="mx-auto mt-14 max-w-6xl px-5 sm:px-8">
        <div className="mb-5 flex flex-wrap items-center justify-center gap-2" role="group" aria-label="Show the party">
          {[
            { v: false, label: "Without Invytt" },
            { v: true, label: "With Invytt" },
          ].map((o) => (
            <button
              key={o.label}
              type="button"
              aria-pressed={mixed === o.v}
              onClick={() => pick(o.v)}
              className={cn(
                "rounded-full border-2 border-ink px-4 py-2 text-sm font-bold transition-colors duration-200",
                mixed === o.v ? "bg-ink text-paper shadow-[3px_3px_0_var(--color-coral)]" : "bg-white text-ink hover:bg-tint",
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
        <Floor mixed={mixed} narrow={narrow} />
        <p aria-live="polite" className="mx-auto mt-5 max-w-2xl text-center text-base font-semibold text-ink">
          {mixed
            ? "Same guests, same room. A few rounds in, everyone has talked to someone new, and the host is a guest again."
            : "Three circles, two people on the edges, and a host doing every introduction."}
        </p>
      </div>

      {/* the fixes */}
      <div className="mx-auto mt-24 max-w-6xl px-5 sm:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Sticker tint="#FF9A5C" rotate={-2}>
            <Spark className="h-3.5 w-3.5" /> The icebreakers
          </Sticker>
          <h3 className="display mt-5 text-[clamp(2rem,4.4vw,3.6rem)] text-ink">
            Six ways in, from the phone already in their hand.
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-lg leading-relaxed text-muted">
            Four games built to get strangers talking, and a companion in the
            event chat for guests and hosts. Nothing to set up, nothing to print.
          </p>
        </div>
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ICEBREAKERS.map((b, i) => (
            <li key={b.id}>
              <IceCard b={b} i={i} />
            </li>
          ))}
        </ul>
        <div className="mt-12 flex justify-center">
          <a
            href="#live"
            className="inline-flex items-center gap-2 text-base font-bold text-ink underline decoration-coral decoration-2 underline-offset-8"
          >
            See the party go live <ArrowDown size={18} strokeWidth={2.6} />
          </a>
        </div>
      </div>
    </section>
  );
}
