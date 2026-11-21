import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WaitlistForm from "@/components/WaitlistForm";

function jsonResponse(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

beforeEach(() => {
  vi.stubEnv("NEXT_PUBLIC_SUBSCRIBE_URL", "https://x.test/subscribe");
});

describe("WaitlistForm", () => {
  it("catches an incomplete email before sending it, and points at the fix", async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal("fetch", fetchMock);
    const user = userEvent.setup();
    render(<WaitlistForm />);

    const input = screen.getByPlaceholderText("you@email.com");
    await user.type(input, "asha@x");
    await user.click(screen.getByRole("button", { name: /get early access/i }));

    expect(fetchMock).not.toHaveBeenCalled();
    expect(screen.getByText(/check the part after the @/i)).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-invalid", "true");
    // the button still asks to join, not to "try again"
    expect(screen.getByRole("button", { name: /get early access/i })).toBeEnabled();

    // editing clears the complaint
    await user.type(input, ".com");
    expect(screen.queryByText(/check the part after the @/i)).not.toBeInTheDocument();
  });

  it("shows every form as joined once one of them succeeds", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => jsonResponse(201, { success: true, message: "You're on the list!" })),
    );
    const user = userEvent.setup();
    render(
      <>
        <WaitlistForm id="first" />
        <WaitlistForm id="second" />
      </>,
    );

    const [first] = screen.getAllByPlaceholderText("you@email.com");
    await user.type(first, "asha@gmail.com");
    await user.click(screen.getAllByRole("button", { name: /get early access/i })[0]);

    expect(await screen.findByText("You're on the list!")).toBeInTheDocument();
    const joinedButtons = screen.getAllByRole("button", { name: /you're in/i });
    expect(joinedButtons).toHaveLength(2);
    joinedButtons.forEach((b) => expect(b).toBeDisabled());
    expect(screen.getByText(/we'll email you when we launch/i)).toBeInTheDocument();
  });
});
