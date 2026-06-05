import { describe, it, expect, beforeEach } from "vitest";
import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Nav from "@/components/Nav";

beforeEach(() => {
  Object.defineProperty(window, "scrollY", { value: 0, writable: true, configurable: true });
});

function setScroll(y: number) {
  (window as unknown as { scrollY: number }).scrollY = y;
  act(() => {
    window.dispatchEvent(new Event("scroll"));
  });
}

describe("Nav", () => {
  it("renders all primary links", () => {
    render(<Nav />);
    const nav = screen.getByRole("navigation", { name: /primary/i });
    for (const label of ["Features", "Who it's for", "How it works", "FAQ"]) {
      expect(nav).toHaveTextContent(label);
    }
  });

  it("hides on scroll down, shows on scroll up", async () => {
    const { container } = render(<Nav />);
    const header = container.querySelector("header")!;

    setScroll(400); // down past threshold
    await waitFor(() => expect(header.className).toMatch(/translate-y-\[-150%\]/));

    setScroll(100); // back up
    await waitFor(() => expect(header.className).toMatch(/translate-y-0/));
  });

  it("toggles the mobile menu", async () => {
    const user = userEvent.setup();
    render(<Nav />);
    const toggle = screen.getByRole("button", { name: /open menu/i });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    await user.click(toggle);
    expect(
      screen.getByRole("button", { name: /close menu/i }),
    ).toHaveAttribute("aria-expanded", "true");
  });
});
