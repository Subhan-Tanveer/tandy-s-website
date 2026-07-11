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

    // Hard fail-safe: content must never be able to stay invisible forever.
    // Plain CSS transitions driven by React state (below) can't get stuck
    // the way a JS-ticker-driven tween library can if its ticker stalls.
    const fallback = window.setTimeout(() => setShown(true), 1200);

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
      clipPath: active ? "inset(0 0 0 0%)" : "inset(0 0 0 100%)",
      transitionProperty: "clip-path",
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
