"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

export default function Counter({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
  immediate = false,
  delay = 0,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  /** Play on mount instead of waiting for a scroll-into-view trigger — use this
   * for counters that live inside an already-visible pinned/sticky hero. */
  immediate?: boolean;
  /** Delay (seconds) before the count-up starts — use with `immediate` when the
   * counter is hidden behind a parent entrance timeline until later, so the
   * count-up is still visible once it fades in instead of finishing unseen. */
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      el.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
      return;
    }

    let played = false;
    let intervalId: number | undefined;
    const timers: number[] = [];

    // Driven by setInterval rather than a rAF-ticker-based tween — an
    // interval fires independently of any animation-frame/rendering
    // pipeline, so counting can't silently stall the way a JS-ticker-driven
    // tween library can if its ticker stalls.
    const play = () => {
      if (played) return;
      played = true;

      const totalDuration = 1600;
      const stepMs = 16;
      const steps = Math.max(1, Math.round(totalDuration / stepMs));
      let step = 0;

      const startTimer = window.setTimeout(() => {
        intervalId = window.setInterval(() => {
          step++;
          const t = Math.min(1, step / steps);
          const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
          const current = eased * value;
          el.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`;
          if (t >= 1) {
            el.textContent = `${prefix}${value.toFixed(decimals)}${suffix}`;
            if (intervalId) window.clearInterval(intervalId);
          }
        }, stepMs);
      }, delay * 1000);
      timers.push(startTimer);
    };

    if (immediate) {
      play();
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) play();
        },
        { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
      );
      observer.observe(el);

      // Hard fail-safe — content must never be able to stay at 0 forever.
      const fallback = window.setTimeout(play, 1200);
      timers.push(fallback);

      return () => {
        observer.disconnect();
        timers.forEach((t) => window.clearTimeout(t));
        if (intervalId) window.clearInterval(intervalId);
      };
    }

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [value, decimals, prefix, suffix, reduced, immediate, delay]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {(0).toFixed(decimals)}
      {suffix}
    </span>
  );
}
