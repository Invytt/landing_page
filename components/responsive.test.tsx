import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";

import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import Steps from "@/components/Steps";
import InsideApp from "@/components/InsideApp";
import PartyLive from "@/components/PartyLive";
import About from "@/components/About";
import FaqSection from "@/components/FAQ";
import Footer from "@/components/Footer";
import { GAMES, PILLARS, SPEAKERS, STEPS } from "@/app/data";

// Headlines are split into one element per word, so compare their text with
// the whitespace collapsed.
const text = (el: Element | null) => (el?.textContent ?? "").replace(/\s+/g, " ").trim();

// A responsive element should declare a mobile-first base AND a breakpoint
// variant: guards against regressions to desktop-only or mobile-only layouts.
function expectResponsive(cls: string, base: RegExp, variant: RegExp) {
  expect(cls).toMatch(base);
  expect(cls).toMatch(variant);
}

describe("the two anchors of the page keep their words", () => {
  it("shows all five pillars, word for word", () => {
    const { container } = render(<Pillars />);
    expect(text(container.querySelector("h2"))).toBe("Five pillars. One platform.");
    expect(PILLARS).toHaveLength(5);
    expect(PILLARS.map((p) => p.title)).toEqual([
      "Guest RSVP Management",
      "Smart Inventory Management",
      "Invitation Design & Templates",
      "Vendor Marketplace",
      "Party Planning Management",
    ]);
    for (const p of PILLARS) {
      expect(screen.getAllByText(p.title).length).toBeGreaterThan(0);
      expect(screen.getAllByText(p.body).length).toBeGreaterThan(0);
    }
  });

  it("shows all five steps in order, word for word", () => {
    const { container } = render(<Steps />);
    expect(text(container.querySelector("h2"))).toBe("From idea to last guest, in one app.");
    const list = container.querySelector("ol")!;
    const titles = within(list).getAllByRole("heading", { level: 3 }).map((h) => h.textContent);
    expect(titles).toEqual([
      "Create your event",
      "Invite & coordinate",
      "Plan your supplies",
      "Book your vendors",
      "Split the bill",
    ]);
    for (const s of STEPS) {
      expect(within(list).getByText(s.body)).toBeInTheDocument();
    }
  });

  it("marks only the marketplace pillar and step as coming soon", () => {
    expect(PILLARS.filter((p) => p.soon).map((p) => p.title)).toEqual(["Vendor Marketplace"]);
    expect(STEPS.filter((s) => s.soon).map((s) => s.title)).toEqual(["Book your vendors"]);
  });
});

describe("responsive layout", () => {
  it("Hero has one headline and stacks to two columns on lg+", () => {
    const { container } = render(<Hero />);
    expect(container.querySelectorAll("h1")).toHaveLength(1);
    expect(text(container.querySelector("h1"))).toBe("Every good plan starts with an invite");
    const grid = container.querySelector(".grid")!;
    expect(grid.className).toMatch(/lg:grid-cols-/);
  });

  it("Pillars are a swipe carousel on mobile/tablet and a pinned scene on lg+", () => {
    // a phone builds only the carousel
    const { container, unmount } = render(<Pillars />);
    const carousel = container.querySelector(".overflow-x-auto")!;
    expect(carousel.className).toMatch(/snap-x/);
    expect(carousel.parentElement!.className).toMatch(/lg:hidden/);
    expect(container.innerHTML).not.toMatch(/sticky/);
    unmount();

    // a desktop builds only the pinned scene
    const real = window.matchMedia;
    window.matchMedia = ((q: string) => ({ ...real(q), matches: q.includes("min-width: 1024px") })) as typeof window.matchMedia;
    try {
      const wide = render(<Pillars />).container;
      expect(wide.innerHTML).toMatch(/hidden[^"]*lg:block/);
      expect(wide.innerHTML).toMatch(/sticky/);
      expect(wide.querySelector(".overflow-x-auto")).toBeNull();
    } finally {
      window.matchMedia = real;
    }
  });

  it("Steps stack on mobile/tablet and alternate sides on lg+", () => {
    const { container } = render(<Steps />);
    const row = container.querySelector("ol > li")!;
    expectResponsive(row.className, /grid/, /lg:grid-cols-2/);
  });

  it("the app tour is a swipe carousel on mobile/tablet and a pinned fan on lg+", () => {
    const { container } = render(<InsideApp />);
    const carousel = container.querySelector(".overflow-x-auto")!;
    expect(carousel.className).toMatch(/snap-x/);
    expect(carousel.parentElement!.className).toMatch(/lg:hidden/);
    // the feature wall: one column, then two, then four
    const wall = container.querySelector("ul.grid")!;
    expectResponsive(wall.className, /sm:grid-cols-2/, /lg:grid-cols-4/);
    expect(wall.querySelectorAll("li")).toHaveLength(12);
  });

  it("lists all eight games as plain text", () => {
    render(<PartyLive />);
    expect(GAMES).toHaveLength(8);
    for (const g of GAMES) {
      expect(screen.getAllByText(g.title).length).toBeGreaterThan(0);
    }
  });

  it("Who it's for is a grid on mobile/tablet and a loose board on lg+", () => {
    const { container } = render(<About />);
    const board = container.querySelector(".grid")!;
    expectResponsive(board.className, /sm:grid-cols-2/, /lg:block/);
    for (const s of SPEAKERS) {
      expect(screen.getByText(s.role)).toBeInTheDocument();
    }
  });

  it("FAQ uses a single column on mobile/tablet and two on lg+", () => {
    const { container } = render(<FaqSection />);
    const grid = container.querySelector(".grid")!;
    expect(grid.className).toMatch(/lg:grid-cols-/);
  });

  it("Footer collapses link columns on mobile/tablet, expands on lg+", () => {
    const { container } = render(<Footer />);
    const grid = container.querySelector(".grid")!;
    expectResponsive(grid.className, /grid-cols-2/, /lg:grid-cols-/);
  });
});

describe("FAQ topics", () => {
  it("switches topic and keeps every original answer word for word", async () => {
    const { FAQ_GROUPS, FAQ } = await import("@/app/data");
    const { fireEvent } = await import("@testing-library/react");
    render(<FaqSection />);
    expect(screen.getAllByRole("tab")).toHaveLength(FAQ_GROUPS.length);
    const party = screen.getByRole("tab", { name: /at the party/i });
    fireEvent.click(party);
    expect(party).toHaveAttribute("aria-selected", "true");
    const original = [
      "How is it different from group chats and spreadsheets?",
      "Do my guests need to download the app to RSVP?",
      "How does the AI inventory estimator work?",
      "Can I split costs with my guests?",
      "What kind of vendors can I book?",
    ];
    for (const q of original) expect(FAQ.some((f) => f.q === q)).toBe(true);
    expect(FAQ.find((f) => f.q === original[1])!.a).toBe(
      "No. Share one link, or let guests RSVP directly over WhatsApp no app required.",
    );
  });
});

describe("coming soon page", () => {
  it("lists every upcoming feature once, with no section links that only work on the home page", async () => {
    const { SOON } = await import("@/app/data");
    const { default: ForHosts } = await import("@/components/soon/ForHosts");
    const { default: Nav } = await import("@/components/Nav");
    expect(new Set(SOON.map((f) => f.id)).size).toBe(SOON.length);
    render(<ForHosts />);
    expect(SOON.map((f) => f.id)).not.toContain("globe");
    expect(SOON.map((f) => f.id)).not.toContain("calendar");
    for (const t of ["Ticketed events", "Bookings & payments"]) {
      expect(screen.getByRole("heading", { name: t })).toBeInTheDocument();
    }
    const { container } = render(<Nav base="/" />);
    for (const a of container.querySelectorAll("nav[aria-label='Primary'] a")) {
      expect(a.getAttribute("href")).toMatch(/^\/#/);
    }
  });
});

describe("the mingle section", () => {
  it("names the problem and every icebreaker, using the app's own game names", async () => {
    const { default: Mingle } = await import("@/components/Mingle");
    const { ICEBREAKERS, MINGLE_PAINS } = await import("@/app/data");
    const { container } = render(<Mingle />);
    expect(text(container.querySelector("h2"))).toBe("Everyone came. Nobody mingled.");
    for (const p of MINGLE_PAINS) expect(screen.getByText(p.title)).toBeInTheDocument();
    for (const b of ICEBREAKERS) {
      expect(screen.getByRole("heading", { level: 3, name: b.title })).toBeInTheDocument();
    }
    // the four games are real Invytt Games
    const games = ICEBREAKERS.filter((b) => b.meta.startsWith("Invytt Games")).map((b) => b.title);
    expect(games).toHaveLength(4);
    for (const g of games) expect(GAMES.some((x) => x.title === g)).toBe(true);
    // both views of the room are reachable
    expect(screen.getByRole("button", { name: "Without Invytt" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "With Invytt" })).toBeInTheDocument();
  });
});
