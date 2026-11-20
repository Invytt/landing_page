"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect, type ComponentType } from "react";

/**
 * Sections below the first screen arrive as finished HTML from the server
 * (so they read, index and lay out at once), but their scripts only start
 * as the visitor scrolls towards them. Until then they cost the phone
 * nothing.
 */
function near(id: string): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();
  const el = document.getElementById(id);
  // arrived by a link from another page: the section is not on screen yet,
  // so there is nothing to wait for
  if (!el || typeof IntersectionObserver === "undefined") return Promise.resolve();
  return new Promise((resolve) => {
    // a screen and a half ahead: the files are already fetched (at low
    // priority, after everything above), so starting takes a moment
    const io = new IntersectionObserver(
      (es) => {
        if (!es.some((e) => e.isIntersecting)) return;
        io.disconnect();
        resolve();
      },
      { rootMargin: "150% 0px" },
    );
    io.observe(el);
  });
}

function afterLoad(run: () => void): () => void {
  let timer = 0;
  const go = () => {
    timer = window.setTimeout(run, 600);
  };
  if (document.readyState === "complete") go();
  else window.addEventListener("load", go, { once: true });
  return () => {
    window.clearTimeout(timer);
    window.removeEventListener("load", go);
  };
}

/**
 * Holds a section's place while it is on its way: while its HTML is still
 * streaming in, or, arriving from another page on the site, until its file
 * is in.
 */
function SectionLoader() {
  return (
    <div role="status" aria-label="Loading" className="grid min-h-[60vh] place-items-center">
      <span aria-hidden className="spinner" />
    </div>
  );
}

/**
 * Each section gets its own Suspense boundary, so the rest of the page
 * hydrates (and responds) right away while the section waits its turn with
 * its server HTML in place.
 */
function later<P extends object>(id: string, load: () => Promise<{ default: ComponentType<P> }>) {
  const Section = dynamic(() => near(id).then(load));
  function Later(props: P) {
    // fetch the section's file once the page has finished loading, so it is
    // in hand by the time the visitor gets there
    useEffect(() => afterLoad(() => void load().catch(() => {})), []);
    return (
      <Suspense fallback={<SectionLoader />}>
        <Section {...props} />
      </Suspense>
    );
  }
  return Later;
}

/* home */
export const Pillars = later("features", () => import("@/components/Pillars"));
export const Steps = later("how-it-works", () => import("@/components/Steps"));
export const InsideApp = later("inside", () => import("@/components/InsideApp"));
export const PartyLive = later("live", () => import("@/components/PartyLive"));
export const GuestWeb = later("guests", () => import("@/components/GuestWeb"));
export const About = later("about", () => import("@/components/About"));
export const FaqSection = later("faq", () => import("@/components/FAQ"));
export const TicketCTA = later("tickets", () => import("@/components/TicketCTA"));

/* coming soon */
export const Marketplace = later("marketplace", () => import("@/components/soon/Marketplace"));
export const Agency = later("agency", () => import("@/components/soon/Agency"));
export const ForHosts = later("for-hosts", () => import("@/components/soon/ForHosts"));
export const SoonCTA = later("notify", () => import("@/components/soon/SoonCTA"));
