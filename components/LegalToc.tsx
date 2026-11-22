"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

type Item = { id: string; text: string };

const slug = (t: string) =>
  t
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

/**
 * "On this page": built from the article's section headings, with the
 * current section highlighted as you read. Sticky beside the text on wide
 * screens, a fold-out list on phones.
 */
export default function LegalToc({ tint }: { tint: string }) {
  const [items, setItems] = useState<Item[]>([]);
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    const heads = Array.from(document.querySelectorAll<HTMLHeadingElement>("#legal-article h2"));
    const list = heads.map((h) => {
      if (!h.id) h.id = slug(h.textContent ?? "");
      return { id: h.id, text: h.textContent ?? "" };
    });
    setItems(list);
    if (!heads.length) return;
    const seen = new Map<string, boolean>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) seen.set(e.target.id, e.isIntersecting);
        // the last heading that has scrolled past the top band wins
        let current: string | null = list[0]?.id ?? null;
        for (const h of heads) if (h.getBoundingClientRect().top < window.innerHeight * 0.3) current = h.id;
        setActive(current);
      },
      { rootMargin: "0px 0px -60% 0px", threshold: [0, 1] },
    );
    heads.forEach((h) => io.observe(h));
    const onScroll = () => {
      let current: string | null = list[0]?.id ?? null;
      for (const h of heads) if (h.getBoundingClientRect().top < window.innerHeight * 0.3) current = h.id;
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!items.length) return <div className="hidden lg:block" />;

  const links = (
    <ol className="space-y-1">
      {items.map((it) => {
        const on = it.id === active;
        return (
          <li key={it.id}>
            <a
              href={`#${it.id}`}
              aria-current={on ? "location" : undefined}
              className={`block rounded-xl border-2 px-3 py-2 text-[15px] font-medium leading-snug transition-colors ${
                on ? "border-ink text-ink " : "border-transparent text-muted hover:text-ink"
              }`}
              style={on ? { background: tint } : undefined}
            >
              {it.text}
            </a>
          </li>
        );
      })}
    </ol>
  );

  return (
    <>
      {/* phones and tablets */}
      <details className="stk group rounded-[22px] bg-white p-4 lg:hidden">
        <summary className="flex cursor-pointer list-none items-center justify-between text-base font-medium text-ink">
          On this page
          <ChevronDown size={20} strokeWidth={2.6} className="transition-transform group-open:rotate-180" />
        </summary>
        <div className="mt-3">{links}</div>
      </details>
      {/* wide screens */}
      <aside className="hidden lg:block">
        <nav aria-label="On this page" className="no-scrollbar sticky top-36 max-h-[calc(100vh-11rem)] overflow-y-auto pb-2 pr-1">
          <p className="eyebrow mb-3 text-coral">On this page</p>
          {links}
        </nav>
      </aside>
    </>
  );
}
