"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { testimonials } from "@/lib/testimonials";
import TestimonialCard from "./TestimonialCard";

// A fixed, varied rotation per card index — a scattered photo-pile feel
// instead of a uniform grid. Straightens on hover for a tactile touch.
const TILTS = [-3, 2, -1.5, 3, -2.5, 1.5];

export default function ScatteredReviewWall({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // IntersectionObserver watches real rendered geometry instead of a
    // scroll-position calculated ahead of time, so it can't go stale.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setShown(true);
      },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);

    // Last-resort fail-safe only — a short timeout here would reveal the
    // review cards a fixed time after page load regardless of scroll position.
    const fallback = window.setTimeout(() => setShown(true), 15000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  // Hover straighten/lift still uses GSAP quickTo — it's a lightweight,
  // user-triggered interaction, not something that needs to guarantee it
  // fires on its own the way the entrance reveal does.
  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const cards = el.querySelectorAll<HTMLElement>("[data-review-card]");

    const cleanups: (() => void)[] = [];
    cards.forEach((card, i) => {
      const tilt = TILTS[i % TILTS.length];
      const onEnter = () => gsap.to(card, { rotate: 0, scale: 1.03, duration: 0.35, ease: "power3.out" });
      const onLeave = () => gsap.to(card, { rotate: tilt, scale: 1, duration: 0.4, ease: "power3.out" });
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [reduced]);

  return (
    <div ref={ref} className={`grid md:grid-cols-3 gap-8 ${className}`}>
      {testimonials.map((t, i) => {
        const tilt = TILTS[i % TILTS.length];
        const active = reduced || shown;
        return (
          <div
            key={t.name}
            data-review-card
            className="will-change-transform"
            style={{
              opacity: active ? 1 : 0,
              transform: active
                ? `rotate(${tilt}deg) scale(1) translateY(0)`
                : `rotate(${tilt + (i % 2 === 0 ? -12 : 12)}deg) scale(0.92) translateY(60px)`,
              transitionProperty: "opacity, transform",
              transitionDuration: reduced ? "500ms" : "800ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: `${i * 0.15}s`,
            }}
          >
            <TestimonialCard testimonial={t} />
          </div>
        );
      })}
    </div>
  );
}
