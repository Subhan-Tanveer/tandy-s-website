"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Same "fade + rise into view" reveal as Reveal.tsx, but driven by GSAP's
 * own ScrollTrigger instead of a plain IntersectionObserver. ScrollTrigger
 * is what already drives the Hero pin, the How It Works line-draw, and the
 * About page parallax — it's built to stay in sync with GSAP ScrollSmoother,
 * which the raw browser IntersectionObserver isn't guaranteed to be. Use
 * this for content (like the quote form) that must both reliably render
 * AND animate in at the right scroll position.
 */
export default function ScrollRevealGsap({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(el, { opacity: 0, y: 40 });

      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 92%",
        once: true,
        onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }),
      });

      // Fail-safe: if the trigger never fires (e.g. the element is already
      // above the fold at mount and ScrollTrigger's initial refresh missed
      // it), don't let it stay invisible forever.
      const fallback = window.setTimeout(() => {
        if (!trigger.isActive && gsap.getProperty(el, "opacity") === 0) {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
        }
      }, 15000);

      return () => {
        trigger.kill();
        window.clearTimeout(fallback);
      };
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(el, { opacity: 1, y: 0 });
    });

    return () => mm.revert();
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
