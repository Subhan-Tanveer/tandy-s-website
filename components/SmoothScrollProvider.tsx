"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { scrollSmootherRef } from "@/lib/scrollSmoother";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function SmoothScrollProvider() {
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const smoother = ScrollSmoother.create({
        wrapper: "#smooth-wrapper",
        content: "#smooth-content",
        smooth: 1.3,
        smoothTouch: 0.1,
        effects: true,
        normalizeScroll: true,
      });
      scrollSmootherRef.current = smoother;

      return () => {
        scrollSmootherRef.current = null;
        smoother.kill();
      };
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      ScrollTrigger.refresh();
    });

    // Custom web fonts (headline text especially) can swap in after initial
    // paint and reflow the page, shifting where every ScrollTrigger below
    // that text actually sits. Same for late-loading images/iframes. Refresh
    // once things have genuinely settled so triggers aren't left stale from
    // fallback-font measurements — otherwise a section can scroll into view
    // but never fire because the trigger's calculated position is off.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready?.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      mm.revert();
      window.removeEventListener("load", refresh);
    };
  }, []);

  return null;
}
