"use client";

import { useSyncExternalStore } from "react";

// Whether this visitor has joined the waitlist, shared by every form on the
// page (and across tabs) so the hero and the ticket never disagree. Kept in
// memory for this page view and in localStorage for later visits; if storage
// is blocked, the forms on this page still agree.

const KEY = "invytt-waitlist";
const listeners = new Set<() => void>();
let joinedNow = false;

function read() {
  if (joinedNow) return true;
  try {
    return localStorage.getItem(KEY) === "joined";
  } catch {
    return false;
  }
}

export function markJoined() {
  joinedNow = true;
  try {
    localStorage.setItem(KEY, "joined");
  } catch {
    /* storage blocked: the page still knows, a later visit won't */
  }
  listeners.forEach((l) => l());
}

/** Tests only: forget the visitor, as a fresh page would. */
export function resetJoined() {
  joinedNow = false;
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* nothing stored */
  }
}

function subscribeJoined(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** True once this visitor has joined from any form. False during SSR. */
export function useJoined() {
  return useSyncExternalStore(subscribeJoined, read, () => false);
}
