"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Variant = "rise" | "wipe" | "pop";

function applyHiddenStyle(item: HTMLElement, variant: Variant, reduced: boolean) {
  item.style.transitionTimingFunction =
    variant === "pop" ? "cubic-bezier(0.34, 1.56, 0.64, 1)" : "cubic-bezier(0.16, 1, 0.3, 1)";

  if (variant === "wipe") {
    item.style.transitionProperty = "clip-path";
    item.style.transitionDuration = reduced ? "500ms" : "1000ms";
    item.style.clipPath = "inset(0 0 0 100%)";
    return;
  }

  item.style.transitionProperty = "opacity, transform";
  item.style.transitionDuration = variant === "pop" ? (reduced ? "500ms" : "650ms") : reduced ? "500ms" : "800ms";
  item.style.opacity = "0";
  if (reduced) {
    item.style.transform = "none";
  } else if (variant === "pop") {
    item.style.transform = "scale(0.85) rotate(-2deg)";
  } else {
    item.style.transform = "translateY(48px) scale(0.96)";
  }
}

function applyShownStyle(item: HTMLElement, variant: Variant) {
  if (variant === "wipe") {
    item.style.clipPath = "inset(0 0 0 0%)";
    return;
  }
  item.style.opacity = "1";
  item.style.transform = variant === "pop" ? "scale(1) rotate(0deg)" : "translateY(0) scale(1)";
}

export default function RevealStagger({
  children,
  className = "",
  childSelector = ":scope > *",
  variant = "rise",
  stagger = 0.12,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  childSelector?: string;
  variant?: Variant;
  stagger?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  const reduced = useReducedMotion();

  // Set the initial hidden state and wire up the trigger once on mount.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const items = el.querySelectorAll<HTMLElement>(childSelector);
    items.forEach((item) => applyHiddenStyle(item, variant, reduced));

    // IntersectionObserver watches real rendered geometry instead of a
    // scroll-position calculated ahead of time, so it can't go stale.
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setShown(true);
      },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(el);

    // Last-resort fail-safe only — IntersectionObserver is reliable, so this
    // should never actually fire in normal use. Keep it long: a short timeout
    // here reveals every section a fixed time after page load regardless of
    // scroll position, which defeats the whole point of a scroll reveal.
    const fallback = window.setTimeout(() => setShown(true), 15000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childSelector, variant]);

  // Apply the visible state (with per-item stagger) once triggered.
  useEffect(() => {
    const el = ref.current;
    if (!el || !shown) return;

    const items = el.querySelectorAll<HTMLElement>(childSelector);
    items.forEach((item, i) => {
      item.style.transitionDelay = `${delay + i * (reduced ? 0.06 : stagger)}s`;
      applyShownStyle(item, variant);
    });
  }, [shown, childSelector, stagger, delay, reduced, variant]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
