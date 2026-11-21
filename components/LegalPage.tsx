import Link from "next/link";
import type { ReactNode } from "react";
import { LifeBuoy, ScrollText, ShieldCheck, type LucideIcon } from "lucide-react";
import Marquee from "@/components/Marquee";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollProgress from "@/components/site/ScrollProgress";
import { Scallop } from "@/components/ui/kit";
import LegalToc from "@/components/LegalToc";

type Kind = "help" | "privacy" | "terms";

type LegalPageProps = {
  title: string;
  summary: string;
  updated: string;
  /** which page this is; picks its icon, tint and the current tab */
  kind: Kind;
  children: ReactNode;
};

const PAGES: { kind: Kind; label: string; href: string; Icon: LucideIcon; tint: string }[] = [
  { kind: "help", label: "Help & FAQ", href: "/help", Icon: LifeBuoy, tint: "#8FD9B6" },
  { kind: "privacy", label: "Privacy policy", href: "/privacy", Icon: ShieldCheck, tint: "#CDBEF7" },
  { kind: "terms", label: "Terms of service", href: "/terms", Icon: ScrollText, tint: "#FFD6A5" },
];

/** The shared layout for Help, Privacy and Terms, in the site's Ember style. */
export default function LegalPage({ title, summary, updated, kind, children }: LegalPageProps) {
  const page = PAGES.find((p) => p.kind === kind)!;
  return (
    <>
      <ScrollProgress />
      <Marquee />
      <Nav base="/" />
      <main className="relative overflow-x-clip bg-paper text-ink">
        {/* ── header ── */}
        <header className="on-night dots-night relative isolate bg-night pb-24 pt-36 text-paper sm:pt-40">
          <span
            aria-hidden
            className="pointer-events-none absolute right-[-10%] top-0 -z-10 h-[60vh] w-[60vh] rounded-full opacity-35"
            style={{ background: `radial-gradient(circle, ${page.tint} 0%, color-mix(in srgb, ${page.tint} 45%, transparent) 30%, color-mix(in srgb, ${page.tint} 12%, transparent) 55%, transparent 72%)` }}
          />
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <p className="eyebrow flex items-center gap-3 text-peach">
                  <span aria-hidden className="h-[2px] w-8 bg-current" />
                  Invytt legal
                </p>
                <h1 className="display mt-5 text-[clamp(3rem,8vw,6rem)]">{title}</h1>
                <p className="mt-5 max-w-2xl text-lg leading-relaxed text-nightmuted">{summary}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {updated.split(" · ").map((u) => (
                    <li key={u} className="rounded-full border-2 border-paper/25 px-3.5 py-1 text-sm font-semibold text-paper">
                      {u}
                    </li>
                  ))}
                </ul>
              </div>
              <span
                aria-hidden
                className="flex h-28 w-28 shrink-0 rotate-[-8deg] items-center justify-center rounded-[30px] border-2 border-ink text-ink sm:h-32 sm:w-32"
                style={{ background: page.tint }}
              >
                <page.Icon size={52} strokeWidth={2} />
              </span>
            </div>

            {/* the three pages, as tabs */}
            <nav aria-label="Legal pages" className="mt-10 flex flex-wrap gap-2.5">
              {PAGES.map((p) => {
                const on = p.kind === kind;
                return (
                  <Link
                    key={p.kind}
                    href={p.href}
                    aria-current={on ? "page" : undefined}
                    className={`inline-flex items-center gap-2 rounded-full border-2 border-ink px-4 py-2 text-[15px] font-bold transition-transform hover:-translate-y-0.5 ${
                      on ? "text-ink " : "bg-night2 text-paper"
                    }`}
                    style={on ? { background: p.tint } : undefined}
                  >
                    <p.Icon size={16} strokeWidth={2.4} />
                    {p.label}
                  </Link>
                );
              })}
            </nav>
          </div>
          <Scallop color="var(--color-paper)" at="bottom" />
        </header>

        {/* ── body ── */}
        <div className="dots mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[240px_1fr] lg:gap-16">
          <LegalToc tint={page.tint} />
          <article
            id="legal-article"
            className={`legal-content min-w-0 max-w-[72ch] text-base leading-[1.8] text-ink/85 sm:text-[1.0625rem] ${
              kind === "help" ? "legal-faq" : ""
            }`}
          >
            {children}
          </article>
        </div>

        <div className="mx-auto max-w-6xl px-5 pb-20 sm:px-8">
          <div className="stk flex flex-col gap-2 rounded-[24px] bg-white p-6 text-sm leading-6 text-muted sm:p-7 lg:ml-[calc(240px+4rem)] lg:max-w-[72ch]">
            <p className="font-bold text-ink">INVYTT PRIVATE LIMITED · support@invytt.com</p>
            <p>PLOT NO-M-118, BARAMUNDA H.B COLONY, Baramunda Colony, Bhubaneswar, Khorda- 751003, Orissa</p>
          </div>
        </div>
      </main>
      <Footer base="/" />
    </>
  );
}
