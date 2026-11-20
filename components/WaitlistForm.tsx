"use client";

import { useId, useState } from "react";
import { subscribe } from "@/lib/waitlist";
import { cn } from "@/lib/utils";

export type SubmitState = "idle" | "loading" | "success" | "duplicate" | "error";

const BUTTON_LABEL: Record<SubmitState, string> = {
  idle: "Get early access",
  loading: "Joining…",
  success: "You're in ✓",
  duplicate: "Already joined",
  error: "Try again",
};

/**
 * The waitlist email form. Posts to the Supabase `subscribe` function through
 * lib/waitlist and reports each state change to the parent.
 */
export default function WaitlistForm({
  onState,
  night = false,
  className,
  hint = "No spam — just one email when we launch.",
}: {
  onState?: (s: SubmitState) => void;
  night?: boolean;
  className?: string;
  hint?: string;
}) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "loading" || state === "success") return;
    setState("loading");
    setMessage("");
    const result = await subscribe(
      email,
      process.env.NEXT_PUBLIC_SUBSCRIBE_URL as string,
    );
    setState(result.state);
    setMessage(result.message);
    onState?.(result.state);
  };

  const disabled = state === "loading" || state === "success";

  return (
    <div className={className}>
      <form
        onSubmit={handleSubmit}
        className={cn(
          "flex w-full flex-col gap-2 rounded-[28px] border-2 border-ink bg-white p-1.5 sm:flex-row sm:items-center sm:rounded-full sm:pl-5",
          night ? "shadow-[5px_5px_0_#000]" : "shadow-[5px_5px_0_var(--color-ink)]",
        )}
      >
        <label className="sr-only" htmlFor={id}>
          Email address
        </label>
        <input
          id={id}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={disabled}
          placeholder="you@email.com"
          autoComplete="email"
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base text-ink placeholder:text-muted/70 focus:outline-none disabled:opacity-60 sm:px-0"
        />
        <button
          type="submit"
          disabled={disabled}
          className={cn(
            "stk-btn shrink-0 !shadow-none hover:!translate-x-0 hover:!translate-y-0 active:!translate-x-0 active:!translate-y-0 active:scale-[0.97]",
            state === "success"
              ? "bg-going text-goingtext"
              : state === "duplicate"
                ? "bg-sand text-ink"
                : "bg-coral text-white hover:bg-deep",
          )}
        >
          {BUTTON_LABEL[state]}
        </button>
      </form>
      <p
        role="status"
        className={cn(
          "mt-3 text-sm font-semibold",
          state === "error"
            ? night
              ? "text-peach"
              : "text-deep"
            : state === "success" || state === "duplicate"
              ? night
                ? "text-mint"
                : "text-goingtext"
              : night
                ? "text-nightmuted"
                : "text-muted",
        )}
      >
        {message || hint}
      </p>
    </div>
  );
}
