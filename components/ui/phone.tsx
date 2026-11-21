"use client";

/* eslint-disable @next/next/no-img-element */
import { motion, type MotionValue } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { TOUCH_QUERY, useMedia } from "@/lib/perf";

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
const D = 22; // thickness, in proportion to a real phone of this size
const CORNER_STEPS = 10;

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
  // rounded, so the server's and the browser's inline styles print the same
  // numbers (unrounded floats caused a hydration mismatch on every phone)
  const r2 = (v: number) => Math.round(v * 100) / 100;
  return strips.map((s) => ({
    x: r2(s.x),
    y: r2(s.y),
    len: r2(s.len),
    tangent: r2(s.tangent),
    normal: r2(s.normal),
  }));
})();

/** Rim colour: lit from the top left, darker as it turns away. */
function rimShade(normal: number) {
  const lit = (Math.cos(((normal + 135) * Math.PI) / 180) + 1) / 2;
  const mix = (a: number, b: number) => Math.round(a + (b - a) * lit);
  const c = `rgb(${mix(46, 150)} ${mix(26, 114)} ${mix(28, 116)})`;
  const hi = `rgb(${mix(70, 214)} ${mix(48, 184)} ${mix(50, 184)})`;
  // a metal frame: rounded dark edges, flat sides, a thin highlight down the middle
  return `linear-gradient(to bottom, #120708 0%, ${c} 18%, ${c} 44%, ${hi} 50%, ${c} 56%, ${c} 82%, #120708 100%)`;
}

// centre of each button along the side; side -1 = left, 1 = right
const BUTTONS = [
  { side: -1, y: 133, len: 26 },
  { side: -1, y: 189, len: 46 },
  { side: 1, y: 185, len: 70 },
];

const KEY_OUT = 4; // how far a key stands out of the frame
const KEY_H = Math.round(D * 0.5); // key height across the frame

/** One side key, built as a small solid box with its own lit faces. */
function Key({ side, y, len, still }: { side: number; y: number; len: number; still: boolean }) {
  const face = (w: number, h: number, transform: string, background: string, radius = 1) => (
    <i
      aria-hidden
      className="absolute block"
      style={{
        left: -w / 2,
        top: -h / 2,
        width: w,
        height: h,
        transform,
        background,
        borderRadius: radius,
      }}
    />
  );
  return (
    <span className={cn("preserve-3d absolute block", still && "p3d")} style={{ left: side < 0 ? 0 : W, top: y, width: 0, height: 0 }}>
      {/* the face you press: brushed metal, brightest down its middle */}
      {face(
        KEY_H,
        len,
        `translateX(${side * KEY_OUT}px) rotateY(90deg)`,
        "linear-gradient(to right, #3a2224 0%, #8d6a6c 30%, #d8bfc0 50%, #8d6a6c 70%, #3a2224 100%)",
        2.5,
      )}
      {/* top and bottom ends */}
      {face(KEY_OUT, KEY_H, `translateX(${(side * KEY_OUT) / 2}px) translateY(${-len / 2}px) rotateX(90deg)`, "#5c3c3e")}
      {face(KEY_OUT, KEY_H, `translateX(${(side * KEY_OUT) / 2}px) translateY(${len / 2}px) rotateX(90deg)`, "#1a0b0c")}
      {/* the two long sides, facing the screen and the back */}
      {face(KEY_OUT, len, `translateX(${(side * KEY_OUT) / 2}px) translateZ(${KEY_H / 2}px)`, "linear-gradient(to bottom, #6e4c4e, #3a2224)")}
      {face(KEY_OUT, len, `translateX(${(side * KEY_OUT) / 2}px) translateZ(${-KEY_H / 2}px)`, "linear-gradient(to bottom, #3a2224, #1a0b0c)")}
      {/* a dark seam where the key meets the frame */}
      {face(KEY_H + 2, len + 2, `translateX(${side * 0.3}px) rotateY(90deg)`, "#0d0405", 3)}
    </span>
  );
}

/** The screen face: bezel, screen, camera notch and glass glare. */
function Face({ children, label }: { children: ReactNode; label?: string }) {
  return (
    <>
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
    </>
  );
}

/**
 * A phone that holds still, drawn flat: one face in one turned pose, with
 * the metal edge and side keys painted beside it. It reads as the same
 * phone, but it is a handful of elements instead of about sixty planes in
 * 3D, which is what lets a phone scroll a page full of them smoothly.
 */
function FlatPhone({ children, label, plate }: { children: ReactNode; label?: string; plate?: string }) {
  const EDGE = Math.round(D * 0.4); // how much of the edge shows at this angle
  return (
    <div
      className="absolute inset-0"
      style={{ transform: "perspective(1600px) rotateY(-16deg) rotateX(5deg)" }}
    >
      {plate && (
        <span
          aria-hidden
          className="absolute -inset-[26px] rounded-[70px] border-[3px] border-ink"
          style={{ background: plate, transform: "translate(14px, 10px)" }}
        />
      )}
      {/* the side key on the visible edge */}
      <span
        aria-hidden
        className="absolute rounded-[3px]"
        style={{
          left: W + EDGE - 3,
          top: BUTTONS[2].y - BUTTONS[2].len / 2 + 3,
          width: 6,
          height: BUTTONS[2].len,
          background: "linear-gradient(to right, #3a2224, #b9999a 55%, #5c3c3e)",
        }}
      />
      {/* the metal edge, showing to the right and below the face */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-[48px]"
        style={{
          transform: `translate(${EDGE}px, ${Math.round(EDGE / 3)}px)`,
          background: "linear-gradient(to right, #2e1a1c 0%, #6e4c4e 70%, #b9999a 88%, #4a2e30 100%)",
          boxShadow: "inset 0 0 0 1.5px #120708",
        }}
      />
      <div
        className="absolute inset-0 rounded-[48px] bg-ink p-[11px]"
        style={{
          boxShadow:
            "0 0 0 var(--pring-w, 0px) var(--pring, transparent), inset 0 0 0 2px rgb(255 255 255 / 0.1)",
        }}
      >
        <Face label={label}>{children}</Face>
      </div>
    </div>
  );
}

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
  // on phones and tablets a phone that is not being turned is drawn flat
  const touch = useMedia(TOUCH_QUERY);
  const still = rx === undefined && ry === undefined;
  const flat = touch === true && still;
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
        className="absolute inset-[1%]"
        style={{
          transform: "translate(7%, 5%)",
          // a soft gradient rather than a blur filter: it looks the same and
          // costs a phone nothing to draw
          background:
            "radial-gradient(closest-side, var(--pshadow-c, rgb(43 23 25 / 0.24)) 62%, transparent 100%)",
        }}
      />
      <div
        className={cn("absolute left-0 top-0 origin-top-left", !flat && "preserve-3d")}
        style={{ width: W, height: H, transform: "scale(var(--ps, 1))" }}
      >
        {flat ? (
          <FlatPhone label={label} plate={plate}>
            {children}
          </FlatPhone>
        ) : (
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
                className={cn("absolute block", still && "p3d")}
                style={{
                  left: st.x,
                  top: st.y,
                  width: st.len,
                  height: D,
                  marginLeft: -Math.round(st.len * 50) / 100,
                  marginTop: -D / 2,
                  transform: `rotateZ(${st.tangent}deg) rotateX(90deg)`,
                  background: rimShade(st.normal),
                }}
              />
            ))}
            {/* side buttons: small solid keys standing out of the frame */}
            {BUTTONS.map((b) => (
              <Key key={b.y} side={b.side} y={b.y} len={b.len} still={still} />
            ))}

            {/* back: coral plate, camera bump, wordmark */}
            <div
              aria-hidden
              className={cn(
                "backface-hidden absolute inset-0 overflow-hidden rounded-[48px] border-[3px] border-ink bg-coral",
                still && "p3d",
              )}
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
                src="/wordmark-ink.webp"
                alt=""
                loading="lazy"
                decoding="async"
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
              <Face label={label}>{children}</Face>
            </div>
          </div>
        </motion.div>
        )}
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
