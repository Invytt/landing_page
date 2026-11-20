import { Spark } from "@/components/ui/kit";

/**
 * The app's loading card, shown once per visit. The reveal is pure CSS
 * (see .loader in globals.css), so it never blocks the page on JavaScript.
 */
export default function Loader() {
  return (
    <div
      aria-hidden
      className="loader dots fixed inset-0 z-[100] flex items-center justify-center bg-paper"
    >
      <div className="relative">
        <Spark className="absolute -left-10 -top-8 h-7 w-7 text-coral spin-slow" />
        <Spark className="absolute -bottom-6 -right-9 h-5 w-5 text-ink spin-slow" />
        <div
          className="stk-lg w-[min(78vw,300px)] rounded-[26px] bg-white p-6 text-center"
          style={{ animation: "ldtilt 2.4s ease-in-out infinite" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/wordmark-ink.webp" alt="" width={360} height={154} className="mx-auto h-auto w-36" />
          <p className="mt-4 font-display text-2xl italic text-coral">Setting the table…</p>
          <div className="relative mt-5 h-3 overflow-hidden rounded-full border-2 border-ink bg-tint">
            <i
              className="absolute top-0 h-full w-2/5 rounded-full bg-coral"
              style={{ animation: "ldslide 1.1s ease-in-out infinite" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
