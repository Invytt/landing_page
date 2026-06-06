import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";

// Heavy / canvas children stubbed so we can assert layout classes in jsdom.
vi.mock("@/components/ui/text-hover-effect", () => ({
  TextHoverEffect: () => <div data-testid="wordmark" />,
}));
vi.mock("@/components/ui/draggable-card", () => ({
  DraggableCardContainer: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
  DraggableCardBody: ({
    children,
    className,
  }: {
    children: React.ReactNode;
    className?: string;
  }) => <div className={className}>{children}</div>,
}));
vi.mock("@xyflow/react", () => ({
  ReactFlow: ({ children }: { children?: React.ReactNode }) => (
    <div>{children}</div>
  ),
  Background: () => null,
  Controls: () => null,
  Handle: () => null,
  Position: { Top: "top", Bottom: "bottom" },
  useNodesState: (n: unknown) => [n, () => {}, () => {}],
  useEdgesState: (e: unknown) => [e, () => {}, () => {}],
}));

import Hero from "@/components/Hero";
import FeaturedIn from "@/components/FeaturedIn";
import Partners from "@/components/Partners";
import FaqSection from "@/components/FAQ";
import Footer from "@/components/Footer";
import About from "@/components/About";
import ExpandableSteps from "@/components/expandable-card-demo-standard";

// A responsive element should declare a mobile-first base AND a breakpoint
// variant — guards against regressions to desktop-only or mobile-only layouts.
function expectResponsive(cls: string, base: RegExp, variant: RegExp) {
  expect(cls).toMatch(base);
  expect(cls).toMatch(variant);
}

describe("responsive layout", () => {
  it("Hero heading stacks on mobile/tablet, inlines on lg+", () => {
    const { container } = render(<Hero />);
    const h1 = container.querySelector("h1")!;
    expectResponsive(h1.className, /flex-col/, /lg:flex-row/);
  });

  it("FeaturedIn is a swipe carousel on mobile/tablet, bento grid on lg+", () => {
    const { container } = render(<FeaturedIn />);
    expect(container.querySelector("section")!.className).toMatch(
      /min-h-screen/,
    );
    // mobile + tablet: horizontal snap carousel, hidden from lg up
    const carousel = container.querySelector(".overflow-x-auto")!;
    expect(carousel.className).toMatch(/snap-x/);
    expect(carousel.className).toMatch(/lg:hidden/);
    // lg+: bento grid (hidden below lg, 6-col grid from lg up)
    expect(container.innerHTML).toMatch(/hidden[^"]*lg:grid/);
    expect(container.innerHTML).toMatch(/grid-cols-6/);
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
    // brand block spans full width below lg
    expect(container.innerHTML).toMatch(/col-span-2 lg:col-span-1/);
  });

  it("Partners problem section fills the viewport and chips wrap", () => {
    const { container } = render(<Partners />);
    expect(container.querySelector("section")!.className).toMatch(
      /min-h-screen/,
    );
    expect(container.innerHTML).toMatch(/flex-wrap/);
  });

  it("About uses a static grid on mobile/tablet and the draggable pile on lg+", () => {
    const { container } = render(<About />);
    const cards = Array.from(container.querySelectorAll("div")).map(
      (d) => d.className,
    );
    // mobile + tablet: static 2-col grid, hidden from lg up
    expect(cards.some((c) => c.includes("grid-cols-2"))).toBe(true);
    expect(cards.some((c) => c.includes("lg:hidden"))).toBe(true);
    // lg+: scattered pile hidden below lg, flex from lg up
    expect(
      cards.some((c) => c.includes("hidden") && c.includes("lg:flex")),
    ).toBe(true);
    // desktop overlay text must let pointer events through to draggable cards
    expect(container.innerHTML).toMatch(/pointer-events-none/);
  });

  it("How-it-works steps: stack on mobile/tablet, ReactFlow on lg+", () => {
    const { container } = render(<ExpandableSteps />);
    // mobile + tablet stack
    expect(container.innerHTML).toMatch(/lg:hidden/);
    // desktop-only canvas wrapper
    expect(container.innerHTML).toMatch(/hidden[^"]*lg:block/);
  });
});
