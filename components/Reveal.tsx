"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Variant = "rise" | "wipe" | "pop";

export default function Reveal({
  children,
  variant = "rise",
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
}) {
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

    // Last-resort fail-safe only — IntersectionObserver is reliable, so this
    // should never actually fire in normal use. Keep it long: a short timeout
    // here reveals every section a fixed time after page load regardless of
    // scroll position, which defeats the whole point of a scroll reveal.
    const fallback = window.setTimeout(() => setShown(true), 15000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  const active = reduced || shown;
  const baseStyle: React.CSSProperties = {
    transitionDelay: delay ? `${delay}s` : undefined,
  };

  let style: React.CSSProperties;

  if (variant === "wipe") {
    style = {
      ...baseStyle,
      // clip-path alone drives the visual sweep, but pairing it with opacity
      // is a deliberate safety net: clip-path doesn't reliably keep
      // IntersectionObserver from reporting stale/incorrect intersection in
      // every browser, whereas opacity is the same battle-tested mechanism
      // the rise/pop variants already rely on without issue.
      clipPath: active ? "inset(0 0 0 0%)" : "inset(0 0 0 100%)",
      opacity: active ? 1 : 0,
      transitionProperty: "clip-path, opacity",
      transitionDuration: reduced ? "500ms" : "1000ms",
      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    };
  } else if (variant === "pop") {
    style = {
      ...baseStyle,
      opacity: active ? 1 : 0,
      transform: active ? "scale(1) rotate(0deg)" : "scale(0.85) rotate(-2deg)",
      transitionProperty: "opacity, transform",
      transitionDuration: reduced ? "500ms" : "650ms",
      transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
    };
  } else {
    style = {
      ...baseStyle,
      opacity: active ? 1 : 0,
      transform: active ? "translateY(0)" : "translateY(56px)",
      transitionProperty: "opacity, transform",
      transitionDuration: reduced ? "500ms" : "850ms",
      transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
    };
  }

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}
