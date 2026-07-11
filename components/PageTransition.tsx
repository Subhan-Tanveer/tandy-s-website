"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { scrollSmootherRef } from "@/lib/scrollSmoother";

gsap.registerPlugin(ScrollTrigger);

const ENTER_DURATION = 0.35;
const HOLD_DURATION = 0.1;
const EXIT_DURATION = 0.4;
const SAFETY_RESET_MS = 4000;

/**
 * Full-screen curtain transition. The panel's resting/pre-hydration state is
 * "covering the whole screen" (no transform, matching `fixed inset-0`), so a
 * hard reload naturally shows the curtain covering the page first — there's
 * nothing to flash, that's just the design. Every time the pathname settles
 * (first load OR after a click-initiated nav swaps the route underneath),
 * the panel sweeps on from the left, holds covering the screen, then
 * continues right off-screen to reveal the page.
 */
export default function PageTransition() {
  const panelRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLSpanElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const isAnimating = useRef(false);
  const navigatedRef = useRef(false);
  const safetyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearSafetyTimer = () => {
    if (safetyTimer.current) {
      clearTimeout(safetyTimer.current);
      safetyTimer.current = null;
    }
  };

  const parkOffScreen = () => {
    const panel = panelRef.current;
    const logo = logoRef.current;
    if (!panel) return;
    gsap.killTweensOf([panel, logo]);
    gsap.set(panel, { xPercent: -100 });
    if (logo) gsap.set(logo, { opacity: 0 });
    isAnimating.current = false;
    clearSafetyTimer();
  };

  // Reveal step: runs on first mount (page load/reload) AND every time the
  // pathname actually changes after a click-initiated nav. In both cases the
  // panel is already covering the screen (xPercent 0) when this fires — on
  // first mount via the static default position, on nav via the click
  // handler's enter sweep — so this only ever has to do the "hold, then
  // sweep right to reveal" half.
  useEffect(() => {
    ScrollTrigger.refresh();

    if (navigatedRef.current) {
      const smoother = scrollSmootherRef.current;
      if (smoother) smoother.scrollTo(0, false);
      else window.scrollTo(0, 0);
      navigatedRef.current = false;
    }

    const panel = panelRef.current;
    const logo = logoRef.current;
    if (!panel) return;

    if (reduced) {
      parkOffScreen();
      return;
    }

    gsap.killTweensOf([panel, logo]);
    gsap.set(panel, { xPercent: 0 });

    gsap
      .timeline({ onComplete: parkOffScreen })
      .to(logo, { opacity: 1, duration: 0.12 })
      .to(panel, { xPercent: 100, duration: EXIT_DURATION, ease: "power2.inOut" }, `+=${HOLD_DURATION}`)
      .set(logo, { opacity: 0 });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const anchor = (e.target as HTMLElement)?.closest?.("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;

      const rawHref = anchor.getAttribute("href");
      if (!rawHref || rawHref.startsWith("#") || rawHref.startsWith("mailto:") || rawHref.startsWith("tel:")) {
        return;
      }

      let url: URL;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      if (url.pathname === pathname && !url.hash) return;
      if (isAnimating.current) {
        e.preventDefault();
        return;
      }

      e.preventDefault();
      const destination = url.pathname + url.search;

      if (reduced) {
        router.push(destination);
        return;
      }

      isAnimating.current = true;
      navigatedRef.current = true;
      clearSafetyTimer();
      // Backstop: if a route change never resolves (slow/failed nav), don't
      // leave every future click permanently blocked — force a reset.
      safetyTimer.current = setTimeout(parkOffScreen, SAFETY_RESET_MS);

      const panel = panelRef.current;
      gsap.killTweensOf(panel);
      gsap
        .timeline({ onComplete: () => router.push(destination) })
        .to(panel, { xPercent: 0, duration: ENTER_DURATION, ease: "power2.inOut" });
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, reduced, router]);

  useEffect(() => clearSafetyTimer, []);

  return (
    <div
      ref={panelRef}
      aria-hidden="true"
      className="fixed inset-0 z-[9999] bg-racing-red will-change-transform"
    >
      <div className="absolute left-0 top-0 h-full w-4 md:w-6 checker-invert" />
      <div className="absolute right-0 top-0 h-full w-4 md:w-6 checker-invert" />
      <div className="absolute inset-0 flex items-center justify-center">
        <span
          ref={logoRef}
          className="font-badge text-cream text-4xl md:text-6xl tracking-wide opacity-0"
        >
          TANDY&apos;S
        </span>
      </div>
    </div>
  );
}
