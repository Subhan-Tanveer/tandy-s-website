"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
  type ReactElement,
  type ReactNode,
} from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

function wrapWord(word: string, key: string) {
  return (
    <span key={key} className="inline-block overflow-hidden pb-[0.15em] -mb-[0.15em] align-bottom">
      <span data-word className="inline-block will-change-transform">
        {word}
      </span>
    </span>
  );
}

/**
 * Splits its text into per-word spans, each masked inside an overflow-hidden
 * wrapper, and reveals them with a rising stagger as they scroll into view.
 * A single non-string child (e.g. a colored `<span>` highlighting one word)
 * is treated as one reveal unit so its styling survives.
 */
export default function SplitText({
  children,
  className = "",
  stagger = 0.035,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [shown, setShown] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    words.forEach((w) => {
      w.style.transitionProperty = "opacity, transform";
      w.style.transitionDuration = reduced ? "400ms" : "700ms";
      w.style.transitionTimingFunction = "cubic-bezier(0.16, 1, 0.3, 1)";
      w.style.opacity = "0";
      w.style.transform = reduced ? "none" : "translateY(105%)";
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
    const fallback = window.setTimeout(() => setShown(true), 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, [reduced]);

  useEffect(() => {
    const el = ref.current;
    if (!el || !shown) return;

    const words = el.querySelectorAll<HTMLElement>("[data-word]");
    words.forEach((w, i) => {
      w.style.transitionDelay = `${delay + i * (reduced ? 0.02 : stagger)}s`;
      w.style.opacity = "1";
      w.style.transform = "translateY(0)";
    });
  }, [shown, stagger, delay, reduced]);

  const rendered: ReactNode[] = [];

  Children.forEach(children, (child, ci) => {
    if (typeof child === "string") {
      const parts = child.split(" ");
      parts.forEach((word, i) => {
        if (word === "") {
          if (i < parts.length - 1) rendered.push(" ");
          return;
        }
        rendered.push(wrapWord(word, `w-${ci}-${i}`));
        if (i < parts.length - 1) rendered.push(" ");
      });
    } else if (isValidElement(child)) {
      const element = child as ReactElement<{ children?: ReactNode }>;
      const text = typeof element.props.children === "string" ? element.props.children : "";
      rendered.push(cloneElement(element, { key: `e-${ci}` }, wrapWord(text, `e-${ci}-w`)));
    } else {
      rendered.push(child);
    }
  });

  return (
    <span ref={ref} className={className}>
      {rendered}
    </span>
  );
}
