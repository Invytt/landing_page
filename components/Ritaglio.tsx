"use client";

/**
 * The Invytt first screen, after the "Ritaglio" paper-cut hero.
 *
 * A black field carries an oval tag, two huge words in a wide heavy face, one
 * line and a button. Beside it lies a party table made of cut paper, with six
 * loose pieces on it: a bunch of balloons, an invite envelope, a record, a
 * bottle, a disco ball and a cake. Everything here is drawn in code (no
 * pictures to download) and flat: no shadows anywhere.
 *
 * The paper moves in stop-motion. Nothing glides. `fps` times a second every
 * piece is put in a new place and held there: the envelope does laps and
 * turns at the edges, the bottle hops, the disco ball bobs and turns, the
 * record spins a notch at a time, and every so often a piece is lifted off
 * the table (it grows a little), carried a short way in steps and put down
 * again. A frame counter in the corner counts the poses. The asterisk turns
 * one notch at a time and the headline arrives as cut letters that land one
 * by one.
 *
 * The pointer is a hand: the piece under it lifts, and you can drag it and put
 * it down anywhere on the table (in steps too, with a paper tap when it
 * lands). Left alone for a few seconds, the animator puts it back.
 *
 * One file, React only, its CSS inside it. The typeface is Archivo (with its
 * width axis), self-hosted by the app as `--f-archivo`.
 *
 * Fills its container's width; height is var(--design-h, 100svh), never under
 * 640px. Responsive by container query: on a phone the table lies across the
 * top and the black field with the words sits under it. The scene pauses off
 * screen and in a hidden tab. Reduced motion: one finished frame, no entrance,
 * no loop; pieces can still be lifted and moved. Keyboard: every piece is a
 * button; focus lifts it, the arrow keys move it a step, Enter or Space makes
 * it hop. Sound: silent until the visitor interacts, when `sound` is false,
 * and when <html data-cd-mute="1">.
 */

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as RPointerEvent,
  type ReactNode,
} from "react";
import NextLink from "next/link";

type Link = { label: string; href: string };

type Props = {
  /** the oval tag, " / " breaks the line */
  tag?: string;
  line1?: string;
  line2?: string;
  lede?: string;
  cta?: string;
  ctaHref?: string;
  /** top-right outlined pill */
  ask?: Link;
  links?: Link[];
  /** colour of the oval tag and the brand's paper */
  accent?: string;
  /** poses a second, 6 to 14 */
  fps?: number;
  /** the wordmark picture (light, for the black field) */
  wordmark?: string;
  sound?: boolean;
};

/* Sound: a short burst of filtered noise, like a piece of card put down on a
   table. Silent when `sound` is false, when <html data-cd-mute="1">, and until
   the visitor has interacted. */
function useTap(on: boolean) {
  const ctx = useRef<AudioContext | null>(null);
  useEffect(() => () => void ctx.current?.close().catch(() => {}), []);
  return useCallback(
    (pitch: number, gain = 0.04) => {
      if (!on || typeof window === "undefined") return;
      if (document.documentElement.dataset.cdMute === "1") return;
      const ua = (navigator as unknown as { userActivation?: { hasBeenActive: boolean } }).userActivation;
      if (ua && !ua.hasBeenActive) return;
      try {
        const AC =
          window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AC) return;
        const a = (ctx.current ??= new AC());
        if (a.state === "suspended") void a.resume();
        const t = a.currentTime;
        const d = 0.045;
        const buf = a.createBuffer(1, Math.ceil(a.sampleRate * d), a.sampleRate);
        const ch = buf.getChannelData(0);
        for (let i = 0; i < ch.length; i++) ch[i] = Math.random() * 2 - 1;
        const n = a.createBufferSource();
        n.buffer = buf;
        const bp = a.createBiquadFilter();
        bp.type = "bandpass";
        bp.frequency.setValueAtTime(pitch, t);
        bp.frequency.exponentialRampToValueAtTime(pitch * 0.55, t + d);
        bp.Q.value = 0.9;
        const amp = a.createGain();
        amp.gain.setValueAtTime(0.0001, t);
        amp.gain.exponentialRampToValueAtTime(Math.min(gain, 0.06), t + 0.004);
        amp.gain.exponentialRampToValueAtTime(0.0001, t + d);
        n.connect(bp).connect(amp).connect(a.destination);
        n.start(t);
        n.stop(t + d + 0.01);
      } catch {
        /* no sound is fine */
      }
    },
    [on],
  );
}

/* ------------------------------------------------------------ paper shapes
   Scissor-cut outlines: a shape's edge wobbles a little, the same way every
   render (seeded), so nothing looks drawn with a compass. */
function seeded(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
function blob(cx: number, cy: number, rx: number, ry: number, seed: number, wobble = 0.035, n = 28) {
  const rnd = seeded(seed);
  const pts: string[] = [];
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2;
    const k = 1 + (rnd() - 0.5) * 2 * wobble;
    pts.push(`${(cx + Math.cos(a) * rx * k).toFixed(1)},${(cy + Math.sin(a) * ry * k).toFixed(1)}`);
  }
  return `M${pts.join("L")}Z`;
}
function poly(points: [number, number][], seed: number, jitter = 1.6) {
  const rnd = seeded(seed);
  return `M${points
    .map(([x, y]) => `${(x + (rnd() - 0.5) * 2 * jitter).toFixed(1)},${(y + (rnd() - 0.5) * 2 * jitter).toFixed(1)}`)
    .join("L")}Z`;
}

const C = {
  ink: "#0e0d0c",
  cream: "#f3ecdc",
  coral: "#d2402a",
  deep: "#a3301d",
  butter: "#f5c63c",
  lilac: "#cdbef7",
  mint: "#8fd9b6",
  sky: "#bfddfb",
  pink: "#f6c1d0",
  peach: "#ff9a5c",
};

/* Paper grain, laid over a piece with mix-blend so every colour gets fibres. */
function Grain({ id }: { id: string }) {
  return (
    <filter id={id} x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="3" stitchTiles="stitch" result="n" />
      <feColorMatrix in="n" values="0 0 0 0 .35  0 0 0 0 .3  0 0 0 0 .2  0 0 0 .38 -.12" result="g" />
      <feComposite in="g" in2="SourceGraphic" operator="in" result="gi" />
      <feMerge>
        <feMergeNode in="SourceGraphic" />
        <feMergeNode in="gi" />
      </feMerge>
    </filter>
  );
}

function Art({ vb, id, children }: { vb: string; id: string; children: ReactNode }) {
  return (
    <svg className="rtg-art" viewBox={vb} aria-hidden>
      <defs>
        <Grain id={`g-${id}`} />
      </defs>
      <g filter={`url(#g-${id})`}>{children}</g>
    </svg>
  );
}

/* The six pieces, each in its own viewBox (width x height = 1 : ratio). */
const ART: Record<Id, ReactNode> = {
  balloons: (
    <Art vb="0 0 200 190" id="balloons">
      <path d="M100 186 L72 104 M100 186 L102 86 M100 186 L134 108" stroke={C.cream} strokeWidth="2.4" fill="none" />
      <path d={blob(64, 70, 38, 46, 3)} fill={C.butter} />
      <path d={blob(140, 74, 36, 44, 7)} fill={C.lilac} />
      <path d={blob(102, 52, 40, 48, 11)} fill={C.mint} />
      <path d={poly([[60, 116], [70, 116], [65, 124]], 2, 1)} fill={C.butter} />
      <path d={poly([[134, 118], [144, 118], [139, 126]], 4, 1)} fill={C.lilac} />
      <path d={poly([[97, 100], [107, 100], [102, 108]], 6, 1)} fill={C.mint} />
      <path d={blob(88, 34, 8, 13, 21, 0.08)} fill={C.cream} opacity=".75" />
      <path d={blob(52, 54, 6, 10, 22, 0.08)} fill={C.cream} opacity=".7" />
    </Art>
  ),
  invite: (
    <Art vb="0 0 260 100" id="invite">
      <path d={poly([[6, 30], [44, 30]], 30, 0)} stroke={C.butter} strokeWidth="5" strokeLinecap="round" />
      <path d={poly([[14, 52], [40, 52]], 31, 0)} stroke={C.butter} strokeWidth="5" strokeLinecap="round" />
      <path d={poly([[4, 74], [36, 74]], 32, 0)} stroke={C.butter} strokeWidth="5" strokeLinecap="round" />
      <path d={poly([[58, 8], [252, 6], [254, 94], [60, 96]], 33)} fill={C.cream} />
      <path d={poly([[58, 8], [156, 58], [252, 6]], 34)} fill="#e6dcc6" />
      <path d={poly([[60, 96], [140, 50], [156, 58], [172, 50], [254, 94]], 35)} fill="#ece3cf" />
      <path
        d="M156 46 c-6-9-19-4-15 6 c3 7 15 13 15 13 s12-6 15-13 c4-10-9-15-15-6z"
        fill={C.coral}
      />
    </Art>
  ),
  record: (
    <Art vb="0 0 200 200" id="record">
      <path d={blob(100, 100, 96, 96, 41, 0.012, 40)} fill={C.ink} />
      {[82, 70, 58].map((r, i) => (
        <circle key={r} cx="100" cy="100" r={r} fill="none" stroke="#2a2724" strokeWidth={i === 1 ? 2.4 : 1.4} />
      ))}
      <path d={blob(100, 100, 34, 34, 43, 0.02, 32)} fill={C.coral} />
      <circle cx="100" cy="100" r="5" fill={C.ink} />
    </Art>
  ),
  bottle: (
    <Art vb="0 0 60 205" id="bottle">
      <path d={poly([[22, 2], [38, 2], [38, 16], [22, 16]], 51, 0.8)} fill={C.butter} />
      <path d={poly([[24, 16], [36, 16], [37, 54], [52, 80], [54, 200], [6, 200], [8, 80], [23, 54]], 52, 1.2)} fill={C.mint} />
      <path d={poly([[9, 104], [51, 104], [51, 150], [9, 150]], 53, 1)} fill={C.cream} />
      <path d={blob(30, 127, 9, 9, 54, 0.06, 16)} fill={C.coral} />
      <path d={poly([[13, 88], [18, 88], [17, 190], [12, 190]], 55, 0.8)} fill={C.cream} opacity=".45" />
    </Art>
  ),
  disco: (
    <Art vb="0 0 200 203" id="disco">
      <path d="M100 0 V22" stroke={C.cream} strokeWidth="3" />
      <path d={blob(100, 114, 86, 86, 61, 0.015, 40)} fill="#d9d2c4" />
      {Array.from({ length: 7 }, (_, r) =>
        Array.from({ length: 7 }, (_, c) => {
          const x = 36 + c * 19;
          const y = 50 + r * 19;
          const d = Math.hypot(x + 8 - 100, y + 8 - 114);
          if (d > 74) return null;
          const tones = [C.cream, C.sky, "#bdb5a6", C.lilac, "#ffffff", C.butter];
          return (
            <path
              key={`${r}-${c}`}
              d={poly([[x, y], [x + 16, y], [x + 16, y + 16], [x, y + 16]], 70 + r * 7 + c, 0.9)}
              fill={tones[(r * 3 + c * 2) % tones.length]}
            />
          );
        }),
      )}
      <path d={poly([[88, 22], [112, 22], [112, 32], [88, 32]], 62, 0.6)} fill={C.cream} />
    </Art>
  ),
  cake: (
    <Art vb="0 0 200 200" id="cake">
      <path d={blob(100, 100, 94, 94, 81, 0.03, 36)} fill={C.pink} />
      <path d={blob(100, 100, 76, 76, 82, 0.025, 36)} fill={C.cream} />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i / 12) * Math.PI * 2;
        const x = 100 + Math.cos(a) * 85;
        const y = 100 + Math.sin(a) * 85;
        return <path key={i} d={blob(x, y, 7, 7, 90 + i, 0.08, 12)} fill={C.cream} />;
      })}
      {Array.from({ length: 5 }, (_, i) => {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const x = 100 + Math.cos(a) * 40;
        const y = 100 + Math.sin(a) * 40;
        return (
          <g key={i}>
            <path d={blob(x, y, 7.5, 7.5, 110 + i, 0.06, 14)} fill={[C.lilac, C.mint, C.sky, C.peach, C.butter][i]} />
            <path d={blob(x, y, 3.2, 3.2, 120 + i, 0.1, 10)} fill={C.coral} />
          </g>
        );
      })}
      {[
        [80, 70, 20],
        [124, 128, 60],
        [70, 124, 110],
        [128, 74, 150],
        [100, 100, 30],
      ].map(([x, y, r], i) => (
        <rect key={i} x={x - 6} y={y - 1.6} width="12" height="3.2" rx="1.6" fill={[C.coral, C.butter, C.mint, C.lilac, C.coral][i]} transform={`rotate(${r} ${x} ${y})`} />
      ))}
    </Art>
  ),
};

/* The table the pieces lie on: coral paper, a bunting string along the top,
   a cream place-mat strip and a scatter of confetti. Portrait (2 : 3),
   anchored to the top, so the wide crop on a phone keeps the bunting. */
function Table() {
  const flags = Array.from({ length: 9 }, (_, i) => i);
  const flagTones = [C.butter, C.cream, C.lilac, C.mint, C.sky, C.peach];
  const confetti: [number, number, number, string, "r" | "c"][] = [
    [160, 330, 20, C.butter, "r"],
    [840, 300, -30, C.cream, "r"],
    [880, 560, 45, C.mint, "c"],
    [110, 760, 15, C.lilac, "r"],
    [520, 690, -20, C.butter, "c"],
    [905, 980, 70, C.cream, "r"],
    [70, 1120, -40, C.mint, "r"],
    [600, 1320, 30, C.lilac, "c"],
    [330, 1440, -10, C.butter, "r"],
    [940, 1410, 20, C.sky, "c"],
    [430, 260, 60, C.sky, "c"],
  ];
  return (
    <svg className="rtg-table" viewBox="0 0 1000 1500" preserveAspectRatio="xMidYMin slice" aria-hidden>
      <defs>
        <Grain id="g-table" />
      </defs>
      <g filter="url(#g-table)">
        <rect width="1000" height="1500" fill={C.coral} />
        {/* a slightly darker cut along the edges, like a second sheet under it */}
        <path d={poly([[0, 1180], [1000, 1150], [1000, 1500], [0, 1500]], 201, 6)} fill="#c33a25" />
        {/* the cream table runner across the lower third */}
        <path d={poly([[0, 1040], [1000, 1010], [1000, 1090], [0, 1122]], 202, 4)} fill={C.cream} />
        {Array.from({ length: 10 }, (_, i) => (
          <path key={i} d={poly([[i * 100 + 20, 1050 - i * 3], [i * 100 + 60, 1049 - i * 3], [i * 100 + 60, 1080 - i * 3], [i * 100 + 20, 1081 - i * 3]], 210 + i, 2)} fill={i % 2 ? C.butter : C.coral} />
        ))}
        {/* bunting along the top */}
        <path d="M-10 70 Q500 150 1010 70" stroke={C.cream} strokeWidth="6" fill="none" />
        {flags.map((i) => {
          const x = 30 + i * 112;
          const t = x / 1000;
          const y = 70 + 4 * 80 * t * (1 - t) - 2;
          return <path key={i} d={poly([[x, y], [x + 78, y + 3], [x + 40, y + 98]], 230 + i, 2.5)} fill={flagTones[i % flagTones.length]} />;
        })}
        {confetti.map(([x, y, r, fill, kind], i) =>
          kind === "c" ? (
            <path key={i} d={blob(x, y, 13, 13, 260 + i, 0.08, 12)} fill={fill} />
          ) : (
            <path key={i} d={poly([[x - 22, y - 7], [x + 22, y - 7], [x + 22, y + 7], [x - 22, y + 7]], 280 + i, 1.5)} fill={fill} transform={`rotate(${r} ${x} ${y})`} />
          ),
        )}
      </g>
    </svg>
  );
}

/* Three square stills for the list under the words. */
const STILLS: Record<"invites" | "supplies" | "pot", ReactNode> = {
  invites: (
    <svg viewBox="0 0 60 60" aria-hidden>
      <rect width="60" height="60" fill={C.lilac} />
      <path d={poly([[10, 18], [50, 17], [51, 44], [11, 45]], 301)} fill={C.cream} />
      <path d={poly([[10, 18], [30, 32], [50, 17]], 302)} fill="#e6dcc6" />
      <path d="M30 27 c-2-3-6-1.4-5 2 c1 2.4 5 4.4 5 4.4 s4-2 5-4.4 c1-3.4-3-5-5-2z" fill={C.coral} />
    </svg>
  ),
  supplies: (
    <svg viewBox="0 0 60 60" aria-hidden>
      <rect width="60" height="60" fill={C.mint} />
      <path d={poly([[14, 14], [46, 13], [47, 48], [15, 49]], 311)} fill={C.cream} />
      {[21, 29, 37].map((y, i) => (
        <g key={y}>
          <path d={blob(20, y, 2.6, 2.6, 312 + i, 0.1, 10)} fill={i === 2 ? "#c9c0ad" : C.coral} />
          <path d={poly([[25, y - 1.4], [41, y - 1.6], [41, y + 1.4], [25, y + 1.6]], 315 + i, 0.4)} fill="#bdb5a6" />
        </g>
      ))}
    </svg>
  ),
  pot: (
    <svg viewBox="0 0 60 60" aria-hidden>
      <rect width="60" height="60" fill={C.butter} />
      <path d={blob(24, 34, 13, 13, 321, 0.04, 20)} fill={C.cream} />
      <path d={blob(37, 28, 13, 13, 322, 0.04, 20)} fill={C.coral} />
      <path d={poly([[33, 25], [41, 25], [41, 27.5], [33, 27.5]], 323, 0.3)} fill={C.cream} />
      <path d={poly([[33, 29.5], [41, 29.5], [41, 32], [33, 32]], 324, 0.3)} fill={C.cream} />
    </svg>
  ),
};

/* ------------------------------------------------------------- the pieces
   Where each cut-out lies on the table (its centre, in % of the table) and how
   wide it is (in % of the table's width), for the tall table (desktop) and
   the wide one (phone). One unit of movement below, "u", is 1% of the
   table's width. */
type Id = "balloons" | "bottle" | "invite" | "record" | "disco" | "cake";
type Spot = { x: number; y: number; w: number };
type Piece = { id: Id; label: string; ratio: number; tall: Spot; wide: Spot };

const PIECES: Piece[] = [
  { id: "balloons", label: "the balloons", ratio: 0.95, tall: { x: 21, y: 15.5, w: 34 }, wide: { x: 13, y: 34, w: 20 } },
  { id: "cake", label: "the cake", ratio: 1, tall: { x: 70, y: 89, w: 29 }, wide: { x: 91, y: 80, w: 17 } },
  { id: "record", label: "the record", ratio: 1, tall: { x: 29, y: 62, w: 40 }, wide: { x: 20, y: 74, w: 25 } },
  { id: "disco", label: "the disco ball", ratio: 1.015, tall: { x: 77, y: 60, w: 25 }, wide: { x: 73, y: 77, w: 15 } },
  { id: "invite", label: "the invite", ratio: 0.385, tall: { x: 50, y: 38.5, w: 47 }, wide: { x: 50, y: 49, w: 31 } },
  { id: "bottle", label: "the bottle", ratio: 3.41, tall: { x: 72, y: 20.5, w: 10.5 }, wide: { x: 86, y: 34, w: 6.5 } },
];

type Pose = { dx: number; dy: number; rot: number; lift: number; flip: boolean };

const BOB = [0, -0.5, -0.8, -0.5, 0, 0.3];
const SWAY = [0, 1.5, 3, 1.5, 0, -1.5, -3, -1.5];
const HOP_Y = [-1.2, -2.6, -3.4, -3.6, -3, -1.8, -0.6, 0];
const HOP_R = [-2, -3, -2, 0, 2, 3, 1, 0];
const CARRY = 14; // how far the disco ball is carried, in u

/* Every piece's pose at pose number f (ambient) and fs (the performance, which
   waits while a visitor is touching things). `lane` is how far the invite
   goes each side of the middle. All of it moves "on twos": a pose is held for
   two ticks, as on an animation table. */
function poseOf(id: Id, f: number, fs: number, lane: number): Pose {
  const two = Math.floor(f / 2);
  if (id === "invite") {
    const ph = f % 144;
    let x = lane;
    let flip = false;
    let moving = true;
    if (ph < 60) x = lane - (Math.floor(ph / 2) * 2 * (2 * lane)) / 60;
    else if (ph < 72) {
      x = -lane;
      flip = ph >= 66;
      moving = false;
    } else if (ph < 132) {
      x = -lane + (Math.floor((ph - 72) / 2) * 2 * (2 * lane)) / 60;
      flip = true;
    } else {
      x = lane;
      flip = ph < 138;
      moving = false;
    }
    const flutter = two % 2 === 0 ? 1 : -1;
    return { dx: x, dy: moving ? flutter * 0.45 : 0, rot: moving ? flutter * 3 : 0, lift: 0, flip };
  }
  if (id === "record") {
    const k = Math.floor(f / 3);
    return { dx: Math.round(Math.sin(k / 13) * 6) / 2, dy: Math.round(Math.cos(k / 17) * 4) / 2, rot: (k * 7.5) % 360, lift: 0, flip: false };
  }
  if (id === "cake") return { dx: 0, dy: BOB[Math.floor(f / 3) % 6] * 0.6, rot: -(Math.floor(f / 3) * 4) % 360, lift: 0, flip: false };
  if (id === "balloons") return { dx: 0, dy: BOB[Math.floor(f / 3) % 6], rot: SWAY[Math.floor(f / 4) % 8], lift: 0, flip: false };
  if (id === "bottle") {
    const i = f % 48;
    return i < 8 ? { dx: 0, dy: HOP_Y[i], rot: HOP_R[i], lift: 0.35, flip: false } : { dx: 0, dy: 0, rot: 0, lift: 0, flip: false };
  }
  /* the disco ball: it bobs and turns, and twice in the loop it is lifted,
     carried in steps and put down again */
  const ph = fs % 192;
  const bob = BOB[two % 6];
  const turn = (two * 6) % 360;
  const go = (from: number, start: number) => {
    const k = Math.min(12, Math.floor((ph - start) / 2) + 1);
    return from + ((from === 0 ? -CARRY : CARRY) * k) / 12;
  };
  if (ph < 80) return { dx: 0, dy: bob, rot: turn, lift: 0, flip: false };
  if (ph < 84) return { dx: 0, dy: 0, rot: turn, lift: (ph - 79) / 4, flip: false };
  if (ph < 108) return { dx: go(0, 84), dy: 0, rot: turn, lift: 1, flip: false };
  if (ph < 112) return { dx: -CARRY, dy: 0, rot: turn, lift: 1 - (ph - 107) / 4, flip: false };
  if (ph < 152) return { dx: -CARRY, dy: bob, rot: turn, lift: 0, flip: false };
  if (ph < 156) return { dx: -CARRY, dy: 0, rot: turn, lift: (ph - 151) / 4, flip: false };
  if (ph < 180) return { dx: go(-CARRY, 156), dy: 0, rot: turn, lift: 1, flip: false };
  if (ph < 184) return { dx: 0, dy: 0, rot: turn, lift: 1 - (ph - 179) / 4, flip: false };
  return { dx: 0, dy: bob, rot: turn, lift: 0, flip: false };
}

const r2 = (n: number) => Math.round(n * 100) / 100;

/* Black or cream ink, whichever reads on the tag's colour. */
const inkOn = (hex: string) => {
  const h = hex.replace("#", "");
  const f = h.length === 3 ? h.split("").map((c) => c + c).join("") : h.padEnd(6, "0").slice(0, 6);
  const n = parseInt(f, 16);
  if (!Number.isFinite(n)) return "#f3ecdc";
  const l = (0.299 * ((n >> 16) & 255) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  return l > 0.62 ? "#0e0d0c" : "#f3ecdc";
};

/* The cut letters' own slant as they fall, by position in the word. */
const TILT = [-9, 7, -6, 10, -8, 6, -10, 8];

type Live = { ox: number; oy: number; tx: number; ty: number; lift: number; hover: boolean; focus: boolean; drag: boolean; hop: number; home: boolean };

const FILMS = [
  { n: "01", title: "Invites & RSVPs", meta: "Replies even over WhatsApp", key: "invites" as const, href: "#features" },
  { n: "02", title: "Supplies", meta: "Sized to your guest list", key: "supplies" as const, href: "#how-it-works" },
  { n: "03", title: "Group pot", meta: "Split it, no chasing", key: "pot" as const, href: "#how-it-works" },
];

const STAR = "M43 2h14l-2 33 28-18 7 12-30 15 30 15-7 12-28-18 2 33H43l2-33-28 18-7-12 30-15-30-15 7-12 28 18z";

export default function Ritaglio({
  tag = "The party / planning app",
  line1 = "plans",
  line2 = "Made",
  lede = "Invites, RSVPs, AI supply lists, vendors and cost-splitting in one app. You bring the people, Invytt brings the rest.",
  cta = "Get early access",
  ctaHref = "#tickets",
  ask = { label: "Get early access", href: "#tickets" },
  links = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
    { label: "FAQ", href: "#faq" },
    { label: "Coming soon", href: "/coming-soon" },
  ],
  accent = "#d2402a",
  fps = 12,
  wordmark = "/wordmark-silver.webp",
  sound = true,
}: Props) {
  const tap = useTap(sound);
  const root = useRef<HTMLDivElement>(null);
  // phones: the three films are a swipeable strip, with dots under it
  const reel = useRef<HTMLUListElement>(null);
  const [film, setFilm] = useState(0);
  const onReel = useCallback(() => {
    const ul = reel.current;
    if (!ul) return;
    const items = Array.from(ul.children) as HTMLElement[];
    let best = 0;
    let gap = Infinity;
    items.forEach((li, i) => {
      const d = Math.abs(li.offsetLeft - ul.offsetLeft - ul.scrollLeft - parseFloat(getComputedStyle(ul).scrollPaddingLeft || "0"));
      if (d < gap) {
        gap = d;
        best = i;
      }
    });
    setFilm(best);
  }, []);
  const toFilm = useCallback((i: number) => {
    const ul = reel.current;
    const li = ul?.children[i] as HTMLElement | undefined;
    if (!ul || !li) return;
    const pad = parseFloat(getComputedStyle(ul).scrollPaddingLeft || "0");
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    ul.scrollTo({ left: li.offsetLeft - ul.offsetLeft - pad, behavior: still ? "auto" : "smooth" });
  }, []);
  const sheet = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const nodes = useRef<Partial<Record<Id, HTMLButtonElement | null>>>({});
  const live = useRef<Record<Id, Live>>(
    Object.fromEntries(
      PIECES.map((p) => [p.id, { ox: 0, oy: 0, tx: 0, ty: 0, lift: 0, hover: false, focus: false, drag: false, hop: 0, home: false }]),
    ) as Record<Id, Live>,
  );
  const clock = useRef({ f: 30, fs: 30, touched: -1e9 });
  const grab = useRef<{ id: Id; px: number; py: number; ox: number; oy: number } | null>(null);
  const paintRef = useRef<() => void>(() => {});
  const rate = Math.max(6, Math.min(14, fps));

  /* Put every piece where pose f says, plus what the visitor did to it.
     Flat: a lifted piece rises and grows a little; there is no shadow. */
  const paint = useCallback(() => {
    const el = sheet.current;
    if (!el) return;
    const W = el.offsetWidth || 1;
    const H = el.offsetHeight || 1;
    const u = W / 100;
    const wide = W / H > 0.95;
    const { f, fs } = clock.current;
    for (const p of PIECES) {
      const node = nodes.current[p.id];
      if (!node) continue;
      const s = live.current[p.id];
      const spot = wide ? p.wide : p.tall;
      const pose = poseOf(p.id, f, fs, wide ? 30 : 22);
      const hop = s.hop > 0 ? HOP_Y[8 - s.hop] : 0;
      const lift = Math.max(pose.lift, s.lift);
      /* keep the piece on the table */
      const maxY = (100 * H) / W;
      const cx = Math.max(3, Math.min(97, spot.x + pose.dx + s.ox));
      const cy = Math.max(3, Math.min(maxY - 3, (spot.y / 100) * maxY + pose.dy + s.oy));
      const x = (cx - spot.x) * u;
      const y = (cy - (spot.y / 100) * maxY + hop - lift * 1.1) * u;
      const k = 1 + lift * 0.08;
      node.style.transform = `translate(-50%, -50%) translate(${r2(x)}px, ${r2(y)}px)`;
      node.style.zIndex = String(lift > 0.05 ? 20 : 0);
      node.dataset.lifted = lift > 0.05 ? "true" : "false";
      const art = node.firstElementChild as HTMLElement | null;
      if (art) art.style.transform = `rotate(${r2(pose.rot + (s.hop > 0 ? HOP_R[8 - s.hop] : 0))}deg) scale(${pose.flip ? -k : k}, ${k})`;
    }
    if (count.current) count.current.textContent = String((f % 2880) + 1).padStart(4, "0");
  }, []);
  paintRef.current = paint;

  /* One pose: move the visitor's pieces a step, then paint. */
  const tick = useCallback(
    (now: number) => {
      const c = clock.current;
      c.f += 1;
      const quiet = now - c.touched > 6000;
      if (quiet) c.fs += 1;
      for (const p of PIECES) {
        const s = live.current[p.id];
        if (s.drag) {
          s.ox = s.tx;
          s.oy = s.ty;
        } else if (quiet && (s.ox !== 0 || s.oy !== 0)) {
          /* the animator puts it back, a step at a time */
          const d = Math.hypot(s.ox, s.oy);
          const step = Math.min(d, 2.2);
          s.ox = d <= 2.2 ? 0 : s.ox - (s.ox / d) * step;
          s.oy = d <= 2.2 ? 0 : s.oy - (s.oy / d) * step;
          s.home = d > 2.2;
        } else s.home = false;
        const want = s.drag || s.hover || s.focus || s.home ? 1 : 0;
        s.lift = want > s.lift ? Math.min(1, s.lift + 0.5) : Math.max(0, s.lift - 0.34);
        if (s.hop > 0) s.hop -= 1;
      }
      paint();
    },
    [paint],
  );

  /* The clock: `rate` poses a second, only while the hero is on screen. */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    paint();
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ro = new ResizeObserver(() => paintRef.current());
    if (sheet.current) ro.observe(sheet.current);
    if (calm) {
      el.dataset.calm = "true";
      return () => ro.disconnect();
    }
    let raf = 0;
    let last = 0;
    let seen = true;
    const loop = (t: number) => {
      raf = requestAnimationFrame(loop);
      if (t - last < 1000 / rate) return;
      last = t - ((t - last) % (1000 / rate));
      tick(performance.now());
    };
    const run = () => {
      cancelAnimationFrame(raf);
      const on = seen && !document.hidden;
      el.dataset.live = on ? "true" : "false";
      if (on) raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([e]) => {
      seen = e.isIntersecting;
      run();
    });
    io.observe(el);
    document.addEventListener("visibilitychange", run);
    run();
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", run);
    };
  }, [paint, tick, rate]);

  const calmNow = () => root.current?.dataset.calm === "true";
  const touch = () => {
    clock.current.touched = performance.now();
  };
  /* With reduced motion there is no clock: a touch shows straight away. */
  const settle = (id: Id) => {
    if (!calmNow()) return;
    const s = live.current[id];
    s.ox = s.tx;
    s.oy = s.ty;
    s.lift = s.drag || s.hover || s.focus ? 1 : 0;
    paint();
  };

  const onDown = (id: Id) => (e: RPointerEvent<HTMLButtonElement>) => {
    const s = live.current[id];
    e.currentTarget.setPointerCapture(e.pointerId);
    grab.current = { id, px: e.clientX, py: e.clientY, ox: s.ox, oy: s.oy };
    s.drag = true;
    s.tx = s.ox;
    s.ty = s.oy;
    touch();
    tap(2600, 0.03);
    settle(id);
  };
  const onMove = (id: Id) => (e: RPointerEvent<HTMLButtonElement>) => {
    const g = grab.current;
    if (!g || g.id !== id) return;
    const el = sheet.current;
    if (!el) return;
    const u = el.getBoundingClientRect().width / 100 || 1;
    const s = live.current[id];
    s.tx = g.ox + (e.clientX - g.px) / u;
    s.ty = g.oy + (e.clientY - g.py) / u;
    touch();
    settle(id);
  };
  const onUp = (id: Id) => () => {
    const s = live.current[id];
    if (!s.drag) return;
    s.drag = false;
    s.ox = s.tx;
    s.oy = s.ty;
    grab.current = null;
    touch();
    tap(1700, 0.045);
    settle(id);
  };
  const onKey = (id: Id) => (e: KeyboardEvent<HTMLButtonElement>) => {
    const s = live.current[id];
    const by: Record<string, [number, number]> = { ArrowLeft: [-3, 0], ArrowRight: [3, 0], ArrowUp: [0, -3], ArrowDown: [0, 3] };
    const d = by[e.key];
    if (d) {
      e.preventDefault();
      s.ox = s.tx = Math.max(-80, Math.min(80, s.ox + d[0]));
      s.oy = s.ty = Math.max(-140, Math.min(140, s.oy + d[1]));
      touch();
      tap(2200, 0.03);
      settle(id);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      s.hop = 8;
      touch();
      tap(1700, 0.045);
      settle(id);
    }
  };
  const hover = (id: Id, on: boolean) => () => {
    live.current[id].hover = on;
    settle(id);
  };
  const focus = (id: Id, on: boolean) => () => {
    live.current[id].focus = on;
    settle(id);
  };

  const tagLines = tag.split(" / ");
  let n = 0;
  const word = (w: string, row: number) => (
    <span className="rtg-row" key={row}>
      {Array.from(w).map((ch, i) => {
        const k = n++;
        return (
          <span key={i} className="rtg-ch" style={{ "--rtg-i": k, "--rtg-t": `${TILT[k % TILT.length]}deg` } as CSSProperties}>
            {ch === " " ? " " : ch}
          </span>
        );
      })}
    </span>
  );

  return (
    <div ref={root} className="rtg-root" data-live="false" style={{ "--rtg-accent": accent, "--rtg-on": inkOn(accent) } as CSSProperties}>
      <style>{css}</style>

      {/* the black field */}
      <div className="rtg-field">
        <svg className="rtg-mark" viewBox="0 0 100 100" aria-hidden>
          <path d={STAR} />
        </svg>

        <header className="rtg-nav">
          <NextLink className="rtg-brand" href="/" aria-label="Invytt home">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={wordmark} alt="Invytt" width={520} height={207} draggable={false} />
          </NextLink>
          <nav aria-label="Main">
            {links.map((l) => (
              <NextLink key={l.href} href={l.href}>
                {l.label}
              </NextLink>
            ))}
          </nav>
          <a className="rtg-ask" href={ask.href}>
            {ask.label}
          </a>
        </header>

        <div className="rtg-main">
          <p className="rtg-tag">
            {tagLines.map((l, i) => (
              <span key={i}>{l}</span>
            ))}
          </p>
          <h1 className="rtg-h" aria-label={`${line1} ${line2}`}>
            <span aria-hidden className="rtg-rows">
              {word(line1, 0)}
              {word(line2, 1)}
            </span>
            <svg className="rtg-star" viewBox="0 0 100 100" aria-hidden>
              <path d={STAR} />
            </svg>
          </h1>
          <div className="rtg-under">
            <p className="rtg-lede">{lede}</p>
            <a id="hero-cta" className="rtg-cta" href={ctaHref}>
              <svg viewBox="0 0 12 12" aria-hidden>
                <path d="M2 5.1h5.6L5.1 2.6l1.1-1.1L10.6 6l-4.4 4.5-1.1-1.1 2.5-2.5H2z" />
              </svg>
              {cta}
            </a>
          </div>
        </div>

        <div className="rtg-reel">
        <ul ref={reel} onScroll={onReel} className="rtg-films" aria-label="Inside the app">
          {FILMS.map((f) => (
            <li key={f.n}>
              <a href={f.href}>
                <span className="rtg-still">{STILLS[f.key]}</span>
                <span>
                  <em>{f.n}</em>
                  <b>{f.title}</b>
                  <small>{f.meta}</small>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <div className="rtg-dots" role="group" aria-label="Show a film">
          {FILMS.map((f, i) => (
            <button
              key={f.n}
              type="button"
              aria-label={`${f.title}, ${i + 1} of ${FILMS.length}`}
              aria-current={film === i ? "true" : undefined}
              onClick={() => toFilm(i)}
            >
              <span />
            </button>
          ))}
        </div>
        </div>
      </div>

      {/* the party on the table */}
      <div className="rtg-pic">
        <div ref={sheet} className="rtg-sheet">
          <Table />
          {PIECES.map((p) => (
            <button
              key={p.id}
              ref={(el) => {
                nodes.current[p.id] = el;
              }}
              type="button"
              className="rtg-piece"
              aria-label={`Move ${p.label}`}
              style={
                {
                  "--rtg-x": `${p.tall.x}%`,
                  "--rtg-y": `${p.tall.y}%`,
                  "--rtg-w": `${p.tall.w}%`,
                  "--rtg-mx": `${p.wide.x}%`,
                  "--rtg-my": `${p.wide.y}%`,
                  "--rtg-mw": `${p.wide.w}%`,
                  aspectRatio: `1 / ${p.ratio}`,
                } as CSSProperties
              }
              onPointerDown={onDown(p.id)}
              onPointerMove={onMove(p.id)}
              onPointerUp={onUp(p.id)}
              onPointerCancel={onUp(p.id)}
              onPointerEnter={hover(p.id, true)}
              onPointerLeave={hover(p.id, false)}
              onFocus={focus(p.id, true)}
              onBlur={focus(p.id, false)}
              onKeyDown={onKey(p.id)}
            >
              {ART[p.id]}
            </button>
          ))}
          <p className="rtg-slate" aria-hidden>
            <b>Rooftop dinner</b>
            <span>
              frame <span ref={count}>0031</span>
            </span>
            <i>{rate} fps</i>
          </p>
        </div>
      </div>
    </div>
  );
}

const css = `
.rtg-root {
  --rtg-black: #0e0d0c;
  --rtg-cream: #f3ecdc;
  --rtg-dim: rgba(243, 236, 220, .6);
  --rtg-line: rgba(243, 236, 220, .16);
  --rtg-butter: #f5c63c;
  container-type: inline-size;
  position: relative; isolation: isolate; overflow: hidden;
  width: 100%; height: var(--design-h, 100svh); min-height: 640px;
  background: var(--rtg-black); color: var(--rtg-cream);
  font-family: var(--f-archivo), "Helvetica Neue", Arial, sans-serif; font-stretch: 100%;
  -webkit-font-smoothing: antialiased; text-rendering: optimizeLegibility;
}
.rtg-root *, .rtg-root *::before, .rtg-root *::after { box-sizing: border-box; }
.rtg-root a { color: inherit; text-decoration: none; }
.rtg-root p, .rtg-root h1, .rtg-root ul { margin: 0; }
.rtg-root ul { padding: 0; }

/* ---- the table */
.rtg-pic { position: absolute; z-index: 1; top: 0; right: 0; bottom: 0; width: 40cqi; overflow: hidden; background: #d2402a; }
.rtg-sheet { position: absolute; inset: 0; }
.rtg-table { position: absolute; inset: 0; width: 100%; height: 100%; display: block; user-select: none; }
.rtg-piece {
  position: absolute; left: var(--rtg-x); top: var(--rtg-y); width: var(--rtg-w);
  margin: 0; padding: 0; border: 0; background: none; color: inherit; font: inherit;
  transform: translate(-50%, -50%);
  cursor: grab; touch-action: none; -webkit-tap-highlight-color: transparent; outline: none;
}
.rtg-piece:active { cursor: grabbing; }
.rtg-piece:focus-visible::after { content: ""; position: absolute; inset: -6px; border: 2px dashed var(--rtg-black); border-radius: 10px; }
.rtg-art { display: block; width: 100%; height: 100%; overflow: visible; pointer-events: none; user-select: none; }
.rtg-slate {
  position: absolute; left: 1.5cqi; bottom: 1.5cqi; z-index: 30;
  display: flex; align-items: baseline; gap: .8cqi; padding: .5cqi .9cqi .45cqi;
  background: var(--rtg-cream); color: var(--rtg-black);
  font-size: max(10px, .76cqi); font-weight: 500; letter-spacing: .08em; text-transform: uppercase; font-variant-numeric: tabular-nums;
  transform: rotate(-2deg); pointer-events: none; white-space: nowrap;
}
.rtg-slate b { font-stretch: 125%; font-weight: 500; }
.rtg-slate i { font-style: normal; opacity: .55; }

/* ---- the black field */
.rtg-field { position: absolute; z-index: 2; overflow: hidden; top: 0; left: 0; bottom: 0; right: 40cqi; display: flex; flex-direction: column; padding: 0 3.3cqi; pointer-events: none; }
.rtg-nav, .rtg-tag, .rtg-h, .rtg-under, .rtg-films, .rtg-dots { pointer-events: auto; }
.rtg-reel { display: contents; }
.rtg-dots { display: none; }
.rtg-mark { position: absolute; right: -7cqi; bottom: -9cqi; width: 34cqi; height: 34cqi; fill: #161513; pointer-events: none; z-index: -1; }

.rtg-nav { display: flex; align-items: center; gap: 2.4cqi; height: 6cqi; flex: none; }
.rtg-brand { display: inline-flex; align-items: center; margin-right: auto; }
.rtg-brand img { display: block; height: max(28px, 2.3cqi); width: auto; }
.rtg-nav nav { display: flex; gap: 2.2cqi; font-size: max(12px, .92cqi); font-weight: 500; color: var(--rtg-dim); }
.rtg-nav nav a { transition: color .15s; white-space: nowrap; }
.rtg-nav nav a:hover { color: var(--rtg-cream); }
.rtg-ask { font-size: max(12px, .92cqi); font-weight: 500; padding: .62cqi 1.15cqi .58cqi; border: 1px solid rgba(243, 236, 220, .34); border-radius: 99px; transition: background .15s, color .15s; white-space: nowrap; }
.rtg-ask:hover { background: var(--rtg-cream); color: var(--rtg-black); }
.rtg-root a:focus-visible { outline: 2px solid var(--rtg-butter); outline-offset: 3px; }

.rtg-main { flex: 1 1 auto; min-height: 0; display: flex; flex-direction: column; justify-content: center; padding-bottom: 1cqi; }
.rtg-tag {
  align-self: flex-start; display: grid; place-items: center; margin-left: .4cqi !important;
  padding: 1.75cqi 3.3cqi 1.6cqi; border-radius: 50%;
  background: var(--rtg-accent); color: var(--rtg-on);
  font-stretch: 125%; font-weight: 500; font-size: max(10px, .86cqi); line-height: 1.2; letter-spacing: .05em; text-transform: uppercase; text-align: center;
  transform: rotate(-4deg);
}
.rtg-tag span { display: block; white-space: nowrap; }

.rtg-h {
  position: relative; align-self: flex-start; margin-top: 2.6cqi !important;
  font-stretch: 125%; font-weight: 900; line-height: .92; letter-spacing: -.035em;
  font-size: min(12.4cqi, calc(var(--design-h, 100svh) * .2));
}
.rtg-rows { display: block; }
.rtg-row { display: block; white-space: nowrap; }
.rtg-ch {
  /* cut from cream paper: the same grain as the pieces, clipped to the letter */
  padding: .16em 0 .24em; margin: -.16em 0 -.24em;
  color: transparent; -webkit-text-fill-color: transparent; background-color: var(--rtg-cream);
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='140' height='140'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 .35  0 0 0 0 .3  0 0 0 0 .2  0 0 0 .5 -.17'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>");
  -webkit-background-clip: text; background-clip: text;
}
.rtg-ch { display: inline-block; transform-origin: 50% 80%; animation: rtg-show .02s linear both, rtg-land .42s steps(5, jump-end) both; animation-delay: calc(.25s + var(--rtg-i) * .085s); }
@keyframes rtg-show { from { opacity: 0; } to { opacity: 1; } }
@keyframes rtg-land { from { transform: translate(.06em, -.5em) rotate(var(--rtg-t)); } to { transform: none; } }
.rtg-star { position: absolute; left: calc(100% + .9cqi); top: -.2em; width: .34em; height: .34em; fill: var(--rtg-butter); animation: rtg-spin 4.8s steps(12) infinite; }
@keyframes rtg-spin { to { transform: rotate(360deg); } }
.rtg-root[data-live="false"] .rtg-star { animation-play-state: paused; }

.rtg-under { display: flex; align-items: center; gap: 2.4cqi; margin-top: 2.9cqi; }
.rtg-lede { max-width: 30cqi; font-size: max(13px, 1.16cqi); line-height: 1.42; font-weight: 400; color: rgba(243, 236, 220, .78); text-wrap: pretty; }
.rtg-cta {
  flex: none; display: inline-flex; align-items: center; gap: .7cqi; margin: 0; cursor: pointer;
  padding: 1.05cqi 1.7cqi 1cqi 1.45cqi; border: 0; border-radius: 99px;
  background: var(--rtg-cream); color: var(--rtg-black) !important;
  font: inherit; font-stretch: 125%; font-weight: 500; font-size: max(13px, 1.02cqi); letter-spacing: -.005em; white-space: nowrap;
  transition: transform .16s steps(2), background .15s;
}
.rtg-cta svg { width: .85cqi; height: .85cqi; min-width: 10px; min-height: 10px; fill: currentColor; }
.rtg-cta:hover { transform: rotate(-2.5deg) translateY(-2px); background: #fff; }
.rtg-cta:active { transform: rotate(0deg) translateY(1px); }

.rtg-films { flex: none; list-style: none; display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid var(--rtg-line); margin: 0 0 2.6cqi !important; }
.rtg-films li { padding: 1.5cqi 1.4cqi 0 0; min-width: 0; }
.rtg-films li + li { padding-left: 1.4cqi; border-left: 1px solid var(--rtg-line); }
.rtg-films a { display: flex; align-items: center; gap: 1cqi; }
.rtg-still { flex: none; display: block; width: 4.4cqi; height: 4.4cqi; min-width: 40px; min-height: 40px; transform: rotate(-2deg); transition: transform .16s steps(2); }
.rtg-still svg { display: block; width: 100%; height: 100%; }
.rtg-films li:nth-child(2) .rtg-still { transform: rotate(1.5deg); }
.rtg-films a:hover .rtg-still { transform: rotate(3deg) scale(1.06); }
.rtg-films a > span:last-child { display: grid; gap: .22cqi; min-width: 0; }
.rtg-films em { font-style: normal; font-size: max(10px, .72cqi); font-weight: 500; letter-spacing: .08em; color: var(--rtg-butter); font-variant-numeric: tabular-nums; }
.rtg-films b { font-stretch: 125%; font-weight: 500; font-size: max(12px, 1cqi); letter-spacing: -.005em; white-space: nowrap; }
.rtg-films small { font-size: max(10px, .8cqi); color: var(--rtg-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

/* ---- tablet: the list keeps its titles and drops the small print */
@container (max-width: 1040px) {
  .rtg-films small { display: none; }
  .rtg-films li { padding-right: .8cqi; }
  .rtg-films li + li { padding-left: 1cqi; }
  .rtg-nav nav { gap: 1.8cqi; }
  .rtg-nav nav a:last-child { display: none; }
  .rtg-under { flex-direction: column; align-items: flex-start; gap: 2cqi; }
  .rtg-lede { max-width: 44cqi; }
}

/* ---- phone: the table lies across the top, the words under it */
@container (max-width: 700px) {
  /* the words flow under the table instead of being pinned to the screen's
     height, so short phones grow the hero rather than stack text on text */
  .rtg-field { position: relative; top: auto; bottom: auto; min-height: max(640px, var(--design-h, 100svh)); }
  .rtg-pic { left: 0; right: 0; top: 15cqi; bottom: auto; width: auto; height: 85cqi; }
  .rtg-piece { left: var(--rtg-mx); top: var(--rtg-my); width: var(--rtg-mw); }
  .rtg-slate { left: auto; right: 3.5cqi; bottom: 3.5cqi; gap: 2cqi; padding: 1.4cqi 2.4cqi 1.2cqi; font-size: 2.6cqi; transform: rotate(1.5deg); }
  .rtg-field { right: 0; padding: 0 5.2cqi; }
  .rtg-mark { right: -22cqi; bottom: -20cqi; width: 80cqi; height: 80cqi; }
  .rtg-nav { height: 15cqi; gap: 3cqi; }
  .rtg-nav nav { display: none; }
  .rtg-brand img { height: 8cqi; }
  .rtg-ask { font-size: 3.3cqi; padding: 1.9cqi 3.4cqi 1.7cqi; }
  .rtg-main { justify-content: flex-start; padding-top: 79cqi; padding-bottom: 6cqi; }
  .rtg-tag { font-size: 2.45cqi; padding: 4.3cqi 8cqi 3.9cqi; margin-left: 0 !important; position: relative; z-index: 40; }
  .rtg-h { margin-top: 4.2cqi !important; font-size: min(20.6cqi, calc(var(--design-h, 100svh) * .105)); }
  .rtg-star { left: auto; right: -.5cqi; top: .1em; width: .36em; height: .36em; }
  .rtg-under { flex-direction: column; align-items: flex-start; gap: 4.6cqi; margin-top: 5cqi; }
  .rtg-lede { max-width: none; font-size: 3.85cqi; line-height: 1.4; }
  .rtg-cta { font-size: 3.9cqi; gap: 2.2cqi; padding: 3.5cqi 5.6cqi 3.3cqi 4.8cqi; }
  .rtg-cta svg { width: 3cqi; height: 3cqi; }
  /* a swipeable strip: one film at a time, the next one peeking in */
  .rtg-films {
    display: flex; gap: 4cqi; overflow-x: auto; overscroll-behavior-x: contain;
    scroll-snap-type: x mandatory; scrollbar-width: none;
    margin: 0 -5.2cqi 7cqi !important; padding: 0 5.2cqi; scroll-padding: 0 5.2cqi;
    border-top: 0;
  }
  .rtg-films::-webkit-scrollbar { display: none; }
  .rtg-films li { flex: 0 0 80%; scroll-snap-align: start; padding: 3.6cqi 0 0; border-top: 1px solid var(--rtg-line); }
  .rtg-films li + li { padding-left: 0; border-left: 0; }
  /* the dots sit on the strip's top edge, at the right, so they take no height */
  .rtg-reel { display: block; position: relative; }
  .rtg-dots { display: flex; gap: 0; position: absolute; right: -2cqi; bottom: 100%; }
  .rtg-dots button { display: grid; place-items: center; width: 8cqi; height: 8cqi; min-width: 32px; min-height: 32px; padding: 0; border: 0; background: none; cursor: pointer; }
  .rtg-dots span { display: block; width: 2cqi; height: 2cqi; border-radius: 99px; background: rgba(243, 236, 220, .35); transition: width .2s, background .2s; }
  .rtg-dots [aria-current] span { width: 6cqi; background: var(--rtg-butter); }
  .rtg-films a { gap: 3.4cqi; }
  .rtg-still { width: 12cqi; height: 12cqi; }
  .rtg-films a > span:last-child { grid-template-columns: auto 1fr; column-gap: 2.4cqi; row-gap: .6cqi; align-items: baseline; }
  .rtg-films em { font-size: 2.8cqi; }
  .rtg-films b { font-size: 3.9cqi; }
  .rtg-films small { display: block; grid-column: 1 / -1; font-size: 3.1cqi; }
}

/* the hero is full-width, so the viewport stands in for its own width here */
@media (max-width: 700px) {
  .rtg-root { height: auto; }
}

@media (prefers-reduced-motion: reduce) {
  .rtg-ch, .rtg-star { animation: none !important; }
  .rtg-cta, .rtg-still, .rtg-dots span { transition: none !important; }
}
`;
