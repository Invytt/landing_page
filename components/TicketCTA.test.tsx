import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

// Stub heavy children so the test focuses on the form behaviour.
vi.mock("@/components/ui/background-beams", () => ({
  BackgroundBeams: () => <div data-testid="beams" />,
}));
vi.mock("@/components/Countdown", () => ({
  default: () => <div data-testid="countdown" />,
}));

import TicketCTA from "@/components/TicketCTA";

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_SUBSCRIBE_URL", "https://x.test/subscribe");
});

describe("TicketCTA waitlist form", () => {
  it("shows success state on 201", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse(201, { success: true, message: "You're on the list!" }),
      ),
    );
    const user = userEvent.setup();
    render(<TicketCTA />);

    await user.type(screen.getByPlaceholderText("you@email.com"), "a@b.com");
    await user.click(screen.getByRole("button", { name: /get early access/i }));

    expect(await screen.findByText("You're on the list!")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /you're in/i }),
    ).toBeDisabled();
  });

  it("shows duplicate state on 409", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () =>
        jsonResponse(409, { alreadyExists: true, message: "Already on it." }),
      ),
    );
    const user = userEvent.setup();
    render(<TicketCTA />);

    await user.type(screen.getByPlaceholderText("you@email.com"), "a@b.com");
    await user.click(screen.getByRole("button", { name: /get early access/i }));

    expect(await screen.findByText("Already on it.")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /already joined/i }),
    ).toBeInTheDocument();
  });

  it("shows error state on failure", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => {
        throw new Error("offline");
      }),
    );
    const user = userEvent.setup();
    render(<TicketCTA />);

    await user.type(screen.getByPlaceholderText("you@email.com"), "a@b.com");
    await user.click(screen.getByRole("button", { name: /get early access/i }));

    expect(await screen.findByText(/network error/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /try again/i }),
    ).toBeInTheDocument();
  });
});
