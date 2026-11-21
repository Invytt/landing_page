"use client";

import { useId, useRef, useState } from "react";
import { INVALID_EMAIL_MESSAGE, isEmail, subscribe } from "@/lib/waitlist";
import { markJoined, useJoined } from "@/lib/waitlist-joined";
import { cn } from "@/lib/utils";

export type SubmitState = "idle" | "loading" | "success" | "duplicate" | "invalid" | "error";

const BUTTON_LABEL: Record<SubmitState | "joined", string> = {
  idle: "Get early access",
  loading: "Joining…",
  success: "You're in ✓",
  duplicate: "Already joined",
  // the fix is in the field, not in pressing the button again
  invalid: "Get early access",
  error: "Try again",
  joined: "You're in ✓",
};

/**
 * The waitlist email form. Checks the address with the server's own rule,
 * posts to the Supabase `subscribe` function through lib/waitlist, and reports
 * each state change to the parent. Once the visitor joins from any form, every
 * form on the page shows them as joined.
 */
export default function WaitlistForm({
  onState,
  night = false,
  className,
  id: wrapperId,
  hint = "A welcome email now, and one more when we launch. No spam.",
}: {
  onState?: (s: SubmitState) => void;
  night?: boolean;
  className?: string;
  id?: string;
  hint?: string;
}) {
  const id = useId();
  const statusId = `${id}-status`;
  const input = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("");
  const [state, setState] = useState<SubmitState>("idle");
  const [message, setMessage] = useState("");
  const joinedElsewhere = useJoined() && (state === "idle" || state === "invalid" || state === "error");
  const shown = joinedElsewhere ? "joined" : state;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (state === "loading" || state === "success" || joinedElsewhere) return;
    if (!isEmail(email)) {
      setState("invalid");
      setMessage(INVALID_EMAIL_MESSAGE);
      onState?.("invalid");
      input.current?.focus();
      return;
    }
    setState("loading");
    setMessage("");
    const result = await subscribe(
      email,
      process.env.NEXT_PUBLIC_SUBSCRIBE_URL as string,
    );
    setState(result.state);
    setMessage(result.message);
    if (result.state === "success" || result.state === "duplicate") markJoined();
    onState?.(result.state);
  };

  const disabled = state === "loading" || state === "success" || joinedElsewhere;

  return (
    <div id={wrapperId} className={className}>
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
          ref={input}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            // editing is the fix: drop the complaint until the next submit
            if (state === "invalid") {
              setState("idle");
              setMessage("");
            }
          }}
          disabled={disabled}
          aria-invalid={state === "invalid" || undefined}
          aria-describedby={statusId}
          placeholder="you@email.com"
          autoComplete="email"
          className="min-w-0 flex-1 bg-transparent px-4 py-3 text-base text-ink placeholder:text-muted focus:outline-none disabled:opacity-60 sm:px-0"
        />
        <button
          type="submit"
          disabled={disabled}
          className={cn(
            "stk-btn shrink-0 !shadow-none hover:!translate-x-0 hover:!translate-y-0 active:!translate-x-0 active:!translate-y-0 active:scale-[0.97]",
            shown === "success" || shown === "joined"
              ? "bg-going text-goingtext"
              : state === "duplicate"
                ? "bg-sand text-ink"
                : "bg-coral text-white hover:bg-deep",
          )}
        >
          {BUTTON_LABEL[shown]}
        </button>
      </form>
      <p
        id={statusId}
        role="status"
        className={cn(
          "mt-3 text-sm font-semibold",
          state === "error" || state === "invalid"
            ? night
              ? "text-peach"
              : "text-deep"
            : shown === "success" || shown === "duplicate" || shown === "joined"
              ? night
                ? "text-mint"
                : "text-goingtext"
              : night
                ? "text-nightmuted"
                : "text-muted",
        )}
      >
        {joinedElsewhere ? "You're on the list. We'll email you when we launch." : message || hint}
      </p>
    </div>
  );
}
