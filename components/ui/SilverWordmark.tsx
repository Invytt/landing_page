/* eslint-disable @next/next/no-img-element */
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * The silver Invytt wordmark, as the app's splash screen shows it: it lands
 * large and settles, and a band of light sweeps across the silver every few
 * seconds. No dark halo or shadow behind it. Plain CSS, so it costs nothing
 * at runtime.
 */
export default function SilverWordmark({
  className,
  land = true,
  delay = 0.9,
  priority = false,
}: {
  /** set the width here, e.g. "w-40" */
  className?: string;
  /** play the landing on first paint */
  land?: boolean;
  /** seconds before the first sweep */
  delay?: number;
  priority?: boolean;
}) {
  return (
    <span
      className={cn("silver isolate", land && "landed", className)}
      style={{ ["--mark" as string]: "url(/wordmark-silver.webp)", ["--shine-delay" as string]: `${delay}s` } as CSSProperties}
    >
      <img
        src="/wordmark-silver.webp"
        alt="Invytt"
        width={520}
        height={207}
        fetchPriority={priority ? "high" : undefined}
        loading={priority ? undefined : "lazy"}
        decoding="async"
        className="relative block h-auto w-full"
      />
      <span aria-hidden className="silver-shine" />
    </span>
  );
}
