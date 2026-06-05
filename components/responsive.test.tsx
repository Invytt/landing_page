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
  it("Hero heading stacks on mobile, inlines on sm+", () => {
    const { container } = render(<Hero />);
    const h1 = container.querySelector("h1")!;
    expectResponsive(h1.className, /flex-col/, /sm:flex-row/);
  });

  it("FeaturedIn bento is mobile-first 2-col, full grid on md+", () => {
    const { container } = render(<FeaturedIn />);
    expect(container.querySelector("section")!.className).toMatch(
      /min-h-screen/,
    );
    const grid = container.querySelector(".grid")!;
    expectResponsive(grid.className, /grid-cols-2/, /md:grid-cols-6/);
  });

  it("FAQ uses a single column on mobile and two on md+", () => {
    const { container } = render(<FaqSection />);
    const grid = container.querySelector(".grid")!;
    expect(grid.className).toMatch(/md:grid-cols-/);
  });

  it("Footer collapses link columns on mobile, expands on md+", () => {
    const { container } = render(<Footer />);
    const grid = container.querySelector(".grid")!;
    expectResponsive(grid.className, /grid-cols-2/, /md:grid-cols-/);
    // brand block spans full width on mobile
    expect(container.innerHTML).toMatch(/col-span-2 md:col-span-1/);
  });

  it("Partners problem section fills the viewport and chips wrap", () => {
    const { container } = render(<Partners />);
    expect(container.querySelector("section")!.className).toMatch(
      /min-h-screen/,
    );
    expect(container.innerHTML).toMatch(/flex-wrap/);
  });

  it("About cards shrink on mobile and the heading stays non-blocking", () => {
    const { container } = render(<About />);
    const cards = Array.from(container.querySelectorAll("div")).map(
      (d) => d.className,
    );
    expect(
      cards.some((c) => c.includes("w-40") && c.includes("sm:w-80")),
    ).toBe(true);
    // text overlay must let pointer events through to draggable cards
    expect(container.innerHTML).toMatch(/pointer-events-none/);
  });

  it("How-it-works steps: carousel on mobile, ReactFlow on md+", () => {
    const { container } = render(<ExpandableSteps />);
    // mobile-only carousel
    expect(container.innerHTML).toMatch(/md:hidden/);
    // desktop-only canvas wrapper
    expect(container.innerHTML).toMatch(/hidden[^"]*md:block/);
  });
});
