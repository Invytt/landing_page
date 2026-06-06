import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { COMPANY, LEGAL } from "@/app/data";
import { LEGAL_CONTENT } from "@/app/legal/content";

export function generateStaticParams() {
  return LEGAL.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = LEGAL_CONTENT[slug];
  if (!doc) return { title: "Legal — Invytt" };
  return { title: `${doc.title} — Invytt` };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = LEGAL_CONTENT[slug];
  if (!doc) notFound();

  return (
    <main className="min-h-screen bg-[#1a1a1a] px-5 py-16 text-white">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="font-display text-2xl font-extrabold tracking-tight text-white transition hover:text-accent"
        >
          invytt
        </Link>

        <h1 className="mt-10 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
          {doc.title}
        </h1>
        <p className="mt-2 text-sm text-white/40">Last updated: {doc.updated}</p>

        <div className="mt-10 flex flex-col gap-10">
          {doc.body.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-semibold text-white sm:text-xl">
                {section.heading}
              </h2>
              <div className="mt-3 flex flex-col gap-3">
                {section.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm leading-relaxed text-white/70">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <p className="mt-14 border-t border-white/10 pt-6 text-xs text-white/40">
          © {COMPANY.legalName}, {COMPANY.year}
        </p>
      </div>
    </main>
  );
}
