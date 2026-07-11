"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function RevealStagger({
  children,
  className = "",
  childSelector = ":scope > *",
  stagger = 0.12,
}: {
  children: React.ReactNode;
  className?: string;
  childSelector?: string;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  const reduced = useReducedMotion();

  // Set the initial hidden state and wire up the trigger once on mount.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLElement>(childSelector);
    items.forEach((item) => {
      item.style.transitionProperty = "opacity, transform";
      item.style.transitionDuration = reduced ? "500ms" : "800ms";
      item.style.transitionTimingFunction = "cubic-bezier(0.16, 1, 0.3, 1)";
      item.style.opacity = "0";
      item.style.transform = reduced ? "none" : "translateY(48px) scale(0.96)";
    });

    // IntersectionObserver watches real rendered geometry instead of a
    // scroll-position calculated ahead of time, so it can't go stale.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setShown(true);
      },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);

    // Hard fail-safe: content must never be able to stay invisible forever.
    // Plain CSS transitions driven by React state can't get stuck the way a
    // JS-ticker-driven tween library can if its ticker stalls.
    const fallback = window.setTimeout(() => setShown(true), 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childSelector]);

  // Apply the visible state (with per-item stagger) once triggered.
  useEffect(() => {
    const el = ref.current;
    if (!el || !shown) return;

    const items = el.querySelectorAll<HTMLElement>(childSelector);
    items.forEach((item, i) => {
      item.style.transitionDelay = `${i * (reduced ? 0.06 : stagger)}s`;
      item.style.opacity = "1";
      item.style.transform = "translateY(0) scale(1)";
    });
  }, [shown, childSelector, stagger, reduced]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
