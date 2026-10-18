import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

type LegalPageProps = {
  title: string;
  summary: string;
  updated: string;
  children: ReactNode;
};

export default function LegalPage({
  title,
  summary,
  updated,
  children,
}: LegalPageProps) {
  return (
    <main className="min-h-screen overflow-x-hidden bg-bg text-paper">
      <div className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
        <nav className="flex items-center justify-between border-b border-black/10 pb-6 text-sm">
          <Link href="/" aria-label="Invytt home" className="inline-flex items-center">
            <Image
              src="/logo.png"
              alt="Invytt"
              width={1024}
              height={1024}
              priority
              className="-my-10 -ml-4 h-36 w-36 object-contain"
            />
          </Link>
          <div className="hidden gap-4 text-black/60 sm:flex">
            <Link href="/help" className="transition hover:text-black">
              Help &amp; FAQ
            </Link>
            <Link href="/privacy" className="transition hover:text-black">
              Privacy
            </Link>
            <Link href="/terms" className="transition hover:text-black">
              Terms
            </Link>
          </div>
          <details className="relative sm:hidden">
            <summary
              aria-label="Open legal navigation"
              className="flex h-10 w-10 cursor-pointer list-none flex-col items-center justify-center gap-1.5 rounded-full text-black/70 [&::-webkit-details-marker]:hidden"
            >
              <span className="block h-0.5 w-6 rounded-full bg-current" />
              <span className="block h-0.5 w-6 rounded-full bg-current" />
              <span className="block h-0.5 w-6 rounded-full bg-current" />
            </summary>
            <div className="absolute right-0 top-12 z-10 grid min-w-44 gap-1 rounded-2xl border border-black/10 bg-bg p-2 text-sm font-medium text-black/70 shadow-lg shadow-black/10">
              <Link href="/help" className="rounded-xl px-3 py-2 hover:bg-black/5 hover:text-black">
                Help &amp; FAQ
              </Link>
              <Link href="/privacy" className="rounded-xl px-3 py-2 hover:bg-black/5 hover:text-black">
                Privacy
              </Link>
              <Link href="/terms" className="rounded-xl px-3 py-2 hover:bg-black/5 hover:text-black">
                Terms
              </Link>
            </div>
          </details>
        </nav>

        <header className="border-b border-black/10 py-12 sm:py-16">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/50">
            Invytt legal
          </p>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight sm:text-6xl">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-black/70">{summary}</p>
          <p className="mt-6 max-w-2xl text-sm leading-6 text-black/60">{updated}</p>
        </header>

        <article className="legal-content prose prose-lg mx-auto w-full max-w-[72ch] break-words py-8 text-base leading-7 text-black/85 prose-headings:font-display prose-headings:text-black prose-headings:tracking-tight prose-h2:mb-5 prose-h2:mt-16 prose-h2:text-xl prose-h2:leading-tight prose-h3:mb-3 prose-h3:mt-10 prose-h3:text-base prose-h3:leading-snug prose-p:my-6 prose-p:leading-7 prose-ul:my-6 prose-ul:pl-6 prose-ol:my-6 prose-ol:pl-6 prose-li:my-3 prose-li:pl-2 prose-li:leading-7 prose-li:marker:text-black/50 prose-a:font-medium prose-a:text-black prose-a:underline prose-a:decoration-black/35 prose-a:underline-offset-4 prose-strong:text-black prose-em:text-black/70 sm:py-14 sm:text-[1.0625rem] sm:leading-[1.8] sm:prose-h2:text-2xl sm:prose-h3:text-lg sm:prose-p:leading-[1.8] sm:prose-li:leading-[1.75]">
          {children}
        </article>

        <footer className="border-t border-black/10 py-8 text-sm leading-6 text-black/60">
          <p>INVYTT PRIVATE LIMITED · support@invytt.com</p>
          <p className="mt-2">PLOT NO-M-118, BARAMUNDA H.B COLONY, Baramunda Colony, Bhubaneswar, Khorda- 751003, Orissa</p>
        </footer>
      </div>
    </main>
  );
}
