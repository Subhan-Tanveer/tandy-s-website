"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { Star } from "lucide-react";

export default function StarRow({
  count = 5,
  size = 16,
  className = "",
  immediate = false,
  delay = 0,
}: {
  count?: number;
  size?: number;
  className?: string;
  immediate?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(immediate);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (immediate) return;

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
    // stars a fixed time after page load regardless of scroll position.
    const fallback = window.setTimeout(() => setShown(true), 15000);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [immediate]);

  return (
    <div ref={ref} className={`flex gap-1 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            opacity: reduced || shown ? 1 : 0,
            transform: reduced || shown ? "scale(1) rotate(0deg)" : "scale(0) rotate(-35deg)",
            transitionProperty: "opacity, transform",
            transitionDuration: reduced ? "300ms" : "450ms",
            transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
            transitionDelay: `${delay + (reduced ? i * 0.05 : i * 0.12)}s`,
          }}
        >
          <Star data-star size={size} fill="#e2a530" className="text-mustard" />
        </span>
      ))}
    </div>
  );
}
