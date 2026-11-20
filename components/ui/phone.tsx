"use client";

/* eslint-disable @next/next/no-img-element */
import { motion, type MotionValue } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Angle = number | MotionValue<number>;

/* ── A phone with real thickness ──────────────────────────────────────────
   Built from CSS 3D planes: the screen face, a coral back, and a rim of
   narrow strips standing at right angles around the rounded outline, so the
   phone shows its edge and then its back as it turns. Everything is laid out
   at 300 x 622 and scaled with --ps. The phone keeps its own perspective, so
   whatever wraps it can fade, move or scale it freely.                     */

const W = 300;
const H = 622;
const R = 48; // corner radius
const D = 9; // thickness: a slim phone, not a slab
const CORNER_STEPS = 7;

type Strip = { x: number; y: number; len: number; tangent: number; normal: number };

/** The rim, as strips around the rounded rectangle (screen coordinates). */
const RIM: Strip[] = (() => {
  const strips: Strip[] = [
    { x: W / 2, y: 0, len: W - 2 * R + 1, tangent: 0, normal: -90 },
    { x: W, y: H / 2, len: H - 2 * R + 1, tangent: 90, normal: 0 },
    { x: W / 2, y: H, len: W - 2 * R + 1, tangent: 0, normal: 90 },
    { x: 0, y: H / 2, len: H - 2 * R + 1, tangent: 90, normal: 180 },
  ];
  const corners: [number, number, number][] = [
    [R, R, 180],
    [W - R, R, 270],
    [W - R, H - R, 0],
    [R, H - R, 90],
  ];
  const step = 90 / CORNER_STEPS;
  const rad = (d: number) => (d * Math.PI) / 180;
  for (const [cx, cy, from] of corners) {
    for (let k = 0; k < CORNER_STEPS; k++) {
      const mid = from + step * (k + 0.5);
      const r = R * Math.cos(rad(step / 2));
      strips.push({
        x: cx + r * Math.cos(rad(mid)),
        y: cy + r * Math.sin(rad(mid)),
        len: 2 * R * Math.sin(rad(step / 2)) + 1.2,
        tangent: mid + 90,
        normal: mid,
      });
    }
  }
  return strips;
})();

/** Rim colour: lit from the top left, darker as it turns away. */
function rimShade(normal: number) {
  const lit = (Math.cos(((normal + 135) * Math.PI) / 180) + 1) / 2;
  const mix = (a: number, b: number) => Math.round(a + (b - a) * lit);
  const c = `rgb(${mix(38, 140)} ${mix(20, 104)} ${mix(22, 106)})`;
  return `linear-gradient(to bottom, #120708 0%, ${c} 30%, ${c} 70%, #120708 100%)`;
}

const BUTTONS = [
  { x: -1.5, y: 133, len: 26 },
  { x: -1.5, y: 189, len: 46 },
  { x: W + 1.5, y: 185, len: 70 },
];

export function Phone({
  children,
  className,
  style,
  label,
  rx,
  ry,
  sway = false,
  plate,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  label?: string;
  /** tilt forward and back, in degrees */
  rx?: Angle;
  /** turn left and right, in degrees */
  ry?: Angle;
  /** rock gently on its own, so the edge shows even when nothing moves it */
  sway?: boolean;
  /** colour of a card set behind the phone that turns with it */
  plate?: string;
}) {
  return (
    <div
      role={label ? "img" : undefined}
      aria-label={label}
      className={cn("relative shrink-0", className)}
      style={{
        width: `calc(${W}px * var(--ps, 1))`,
        height: `calc(${H}px * var(--ps, 1))`,
        perspective: 1600,
        ...style,
      }}
    >
      {/* soft shadow on the page. It sits outside the 3D scene, so a phone
          tilted far back can never cut into it. */}
      <span
        aria-hidden
        className="absolute inset-[6%] rounded-[16%/8%]"
        style={{
          transform: "translate(7%, 5%)",
          background: "var(--pshadow-c, rgb(43 23 25 / 0.24))",
          filter: "blur(calc(18px * var(--ps, 1)))",
        }}
      />
      <div
        className="preserve-3d absolute left-0 top-0 origin-top-left"
        style={{ width: W, height: H, transform: "scale(var(--ps, 1))" }}
      >
        <motion.div className="preserve-3d absolute inset-0" style={{ rotateX: rx, rotateY: ry }}>
          <div className={cn("preserve-3d absolute inset-0", sway && "phone-sway")}>
            {/* a coloured card a little way behind the phone, turning with it */}
            {plate && (
              <span
                aria-hidden
                className="absolute -inset-[26px] rounded-[70px] border-[3px] border-ink"
                style={{ background: plate, transform: `translateZ(${-D / 2 - 14}px)` }}
              />
            )}
            {/* rim */}
            {RIM.map((st, i) => (
              <i
                key={i}
                aria-hidden
                className="absolute block"
                style={{
                  left: st.x,
                  top: st.y,
                  width: st.len,
                  height: D,
                  marginLeft: -st.len / 2,
                  marginTop: -D / 2,
                  transform: `rotateZ(${st.tangent}deg) rotateX(90deg)`,
                  background: rimShade(st.normal),
                }}
              />
            ))}
            {/* side buttons, standing just proud of the rim */}
            {BUTTONS.map((b) => (
              <i
                key={b.y}
                aria-hidden
                className="absolute block rounded-[2px]"
                style={{
                  left: b.x,
                  top: b.y,
                  width: b.len,
                  height: D * 0.7,
                  marginLeft: -b.len / 2,
                  marginTop: -D * 0.35,
                  transform: "rotateZ(90deg) rotateX(90deg)",
                  background: "linear-gradient(to bottom, #2b1719, #7a5658, #2b1719)",
                }}
              />
            ))}

            {/* back: coral plate, camera bump, wordmark */}
            <div
              aria-hidden
              className="backface-hidden absolute inset-0 overflow-hidden rounded-[48px] border-[3px] border-ink bg-coral"
              style={{ transform: `rotateY(180deg) translateZ(${D / 2}px)` }}
            >
              <span className="dots absolute inset-0 opacity-60" />
              <span className="absolute left-[22px] top-[22px] grid h-[92px] w-[92px] grid-cols-2 place-items-center gap-1 rounded-[28px] border-[3px] border-ink bg-night p-2 shadow-[3px_3px_0_#2B1719]">
                {[0, 1, 2].map((k) => (
                  <i
                    key={k}
                    className="block h-[30px] w-[30px] rounded-full border-[3px] border-[#5a3a3c] bg-[radial-gradient(circle_at_35%_35%,#4b3a6b,#0b0405_60%)]"
                  />
                ))}
                <i className="block h-[10px] w-[10px] rounded-full bg-sand" />
              </span>
              <img
                src="/wordmark-ink.png"
                alt=""
                width={700}
                height={299}
                className="absolute left-1/2 top-1/2 h-auto w-[50%] -translate-x-1/2 -translate-y-1/2 opacity-90"
              />
            </div>

            {/* front: bezel and screen */}
            <div
              className="backface-hidden absolute inset-0 rounded-[48px] bg-ink p-[11px]"
              style={{
                transform: `translateZ(${D / 2}px)`,
                boxShadow:
                  "0 0 0 var(--pring-w, 0px) var(--pring, transparent), inset 0 0 0 2px rgb(255 255 255 / 0.1)",
              }}
            >
              <div
                aria-hidden={label ? true : undefined}
                className="relative h-full w-full overflow-hidden rounded-[38px] bg-paper text-ink"
              >
                {children}
                <span
                  aria-hidden
                  className="absolute left-1/2 top-[9px] z-30 h-[22px] w-[82px] -translate-x-1/2 rounded-full bg-ink"
                />
              </div>
              {/* glass glare */}
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-[48px]"
                style={{
                  background:
                    "linear-gradient(120deg, rgb(255 255 255 / 0.16) 0%, rgb(255 255 255 / 0.04) 26%, transparent 42%)",
                }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/** A browser window frame for the guest web page. */
export function Browser({
  children,
  url,
  className,
}: {
  children: ReactNode;
  url: string;
  className?: string;
}) {
  return (
    <div className={cn("stk-lg overflow-hidden rounded-[22px] bg-white", className)}>
      <div className="flex items-center gap-2 border-b-2 border-ink bg-paper2 px-4 py-2.5">
        <span aria-hidden className="h-3 w-3 rounded-full border-2 border-ink bg-coral" />
        <span aria-hidden className="h-3 w-3 rounded-full border-2 border-ink bg-sand" />
        <span aria-hidden className="h-3 w-3 rounded-full border-2 border-ink bg-mint" />
        <span className="ml-3 min-w-0 flex-1 break-all rounded-full border-2 border-ink bg-white px-3 py-1 text-xs font-semibold text-muted">
          {url}
        </span>
      </div>
      {children}
    </div>
  );
}
