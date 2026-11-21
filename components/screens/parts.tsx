/* eslint-disable @next/next/no-img-element */
import {
  Compass,
  Home,
  Plus,
  Ticket,
  User,
  type LucideIcon,
} from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

/* Building blocks for the app screens shown inside phone frames.
   Everything is laid out for a 278 x 600 screen; the Phone scales it. */

export const INK = "#2B1719";

export function Av({
  i,
  s = 24,
  className,
  style,
}: {
  i: number;
  s?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <img
      src={`/avatars/index${((i - 1) % 12) + 1}.webp`}
      alt=""
      width={s}
      height={s}
      loading="lazy"
      className={cn("shrink-0 rounded-full border-[1.5px] border-ink bg-white", className)}
      style={{ width: s, height: s, ...style }}
    />
  );
}

export function AvStack({ ids, s = 22 }: { ids: number[]; s?: number }) {
  return (
    <span className="flex">
      {ids.map((id, k) => (
        <Av key={id} i={id} s={s} style={{ marginLeft: k ? -s * 0.32 : 0 }} />
      ))}
    </span>
  );
}

export function StatusBar({ dark = false }: { dark?: boolean }) {
  return (
    <div
      className={cn(
        "flex h-[40px] items-center justify-between px-[22px] pt-[6px] text-[11px] font-bold",
        dark ? "text-white" : "text-ink",
      )}
    >
      <span>9:41</span>
      <span className="flex items-center gap-[4px]">
        <span className="flex items-end gap-[1.5px]">
          {[4, 6, 8, 10].map((h) => (
            <i key={h} className="w-[2.5px] rounded-sm bg-current" style={{ height: h }} />
          ))}
        </span>
        <span className="ml-[2px] flex h-[10px] w-[20px] items-center rounded-[3px] border-[1.5px] border-current p-[1px]">
          <i className="h-full w-[70%] rounded-[1px] bg-current" />
        </span>
      </span>
    </div>
  );
}

const TABS: { id: string; label: string; Icon: LucideIcon }[] = [
  { id: "home", label: "Home", Icon: Home },
  { id: "explore", label: "Explore", Icon: Compass },
  { id: "plans", label: "Plans", Icon: Ticket },
  { id: "profile", label: "Profile", Icon: User },
];

export function TabBar({ active }: { active?: string }) {
  const item = (t: (typeof TABS)[number]) => (
    <span
      key={t.id}
      className={cn(
        "flex w-[46px] flex-col items-center gap-[2px] text-[9px] font-bold",
        active === t.id ? "text-coral" : "text-muted",
      )}
    >
      <t.Icon size={18} strokeWidth={2.2} />
      {t.label}
    </span>
  );
  return (
    <div className="absolute inset-x-0 bottom-0 z-20 flex h-[62px] items-start justify-between border-t-2 border-ink bg-white px-[14px] pt-[8px]">
      {item(TABS[0])}
      {item(TABS[1])}
      <span className="-mt-[22px] flex h-[42px] w-[42px] items-center justify-center rounded-full border-2 border-ink bg-coral text-white ">
        <Plus size={22} strokeWidth={2.6} />
      </span>
      {item(TABS[2])}
      {item(TABS[3])}
    </div>
  );
}

/** A full screen: status bar, scroll area, optional tab bar. */
export function Screen({
  children,
  tab,
  className,
  dark,
  bar = true,
}: {
  children: ReactNode;
  tab?: string;
  className?: string;
  dark?: boolean;
  bar?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative h-[600px] w-[278px] select-none overflow-hidden bg-paper font-body text-ink",
        className,
      )}
    >
      <StatusBar dark={dark} />
      <div className="px-[14px]">{children}</div>
      {bar && tab && <TabBar active={tab} />}
    </div>
  );
}

/** Sticker card inside a screen. */
export function Card({
  children,
  tint = "#fff",
  className,
  style,
}: {
  children: ReactNode;
  tint?: string;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={cn(
        "rounded-[16px] border-2 border-ink p-[10px]",
        className,
      )}
      style={{ background: tint, ...style }}
    >
      {children}
    </div>
  );
}

export function Pill({
  children,
  tint = "#fff",
  className,
}: {
  children: ReactNode;
  tint?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-[4px] whitespace-nowrap rounded-full border-[1.5px] border-ink px-[8px] py-[2px] text-[9.5px] font-bold leading-[1.4]",
        className,
      )}
      style={{ background: tint }}
    >
      {children}
    </span>
  );
}

export function Caps({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "text-[9px] font-bold uppercase tracking-[0.16em] text-muted",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function Title({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("font-display text-[26px] leading-[1.05] tracking-[-0.01em]", className)}>
      {children}
    </p>
  );
}

export function Btn({
  children,
  tint = "#D2402A",
  className,
  light = true,
}: {
  children: ReactNode;
  tint?: string;
  className?: string;
  light?: boolean;
}) {
  return (
    <span
      className={cn(
        "flex h-[40px] items-center justify-center gap-[6px] rounded-full border-2 border-ink text-[12.5px] font-bold",
        light ? "text-white" : "text-ink",
        className,
      )}
      style={{ background: tint }}
    >
      {children}
    </span>
  );
}

/** A QR-looking grid. Decorative: it does not encode anything. */
export function FauxQr({ size = 120, seed = 7 }: { size?: number; seed?: number }) {
  const n = 21;
  const cells: boolean[] = [];
  let s = seed * 9301 + 49297;
  for (let i = 0; i < n * n; i++) {
    s = (s * 9301 + 49297) % 233280;
    cells.push(s / 233280 > 0.52);
  }
  const finder = (r: number, c: number) =>
    (r < 7 && c < 7) || (r < 7 && c >= n - 7) || (r >= n - 7 && c < 7);
  const u = size / n;
  const eye = (x: number, y: number) => (
    <g key={`${x}-${y}`}>
      <rect x={x * u} y={y * u} width={7 * u} height={7 * u} rx={u * 1.6} fill={INK} />
      <rect x={(x + 1) * u} y={(y + 1) * u} width={5 * u} height={5 * u} rx={u} fill="#fff" />
      <rect x={(x + 2) * u} y={(y + 2) * u} width={3 * u} height={3 * u} rx={u * 0.7} fill="#D2402A" />
    </g>
  );
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden>
      {cells.map((on, i) => {
        const r = Math.floor(i / n);
        const c = i % n;
        if (!on || finder(r, c)) return null;
        return (
          <rect
            key={i}
            x={c * u + 0.4}
            y={r * u + 0.4}
            width={u - 0.8}
            height={u - 0.8}
            rx={u * 0.3}
            fill={INK}
          />
        );
      })}
      {eye(0, 0)}
      {eye(n - 7, 0)}
      {eye(0, n - 7)}
    </svg>
  );
}
