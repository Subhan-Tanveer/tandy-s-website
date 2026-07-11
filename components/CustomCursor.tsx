"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * A small trailing checkered-flag glint that chases the real cursor with a
 * slight lag. Desktop/fine-pointer only, and never replaces the native
 * cursor — it's decoration, not a functional replacement, so precision
 * clicking and accessibility are unaffected.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      "(pointer: fine) and (prefers-reduced-motion: no-preference)",
      () => {
        const el = dotRef.current;
        if (!el) return;

        gsap.set(el, { xPercent: -50, yPercent: -50, opacity: 0 });

        const xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "power3" });
        const yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

        let shown = false;
        const onMove = (e: MouseEvent) => {
          if (!shown) {
            gsap.to(el, { opacity: 1, duration: 0.3 });
            shown = true;
          }
          xTo(e.clientX);
          yTo(e.clientY);
        };

        const onOver = (e: MouseEvent) => {
          const target = (e.target as HTMLElement)?.closest?.(
            "a, button, input, textarea, [role='button']"
          );
          gsap.to(el, {
            scale: target ? 2.2 : 1,
            duration: 0.35,
            ease: "power3.out",
          });
        };

        const onLeaveWindow = () => {
          gsap.to(el, { opacity: 0, duration: 0.3 });
          shown = false;
        };

        window.addEventListener("mousemove", onMove);
        window.addEventListener("mouseover", onOver);
        document.documentElement.addEventListener("mouseleave", onLeaveWindow);

        return () => {
          window.removeEventListener("mousemove", onMove);
          window.removeEventListener("mouseover", onOver);
          document.documentElement.removeEventListener(
            "mouseleave",
            onLeaveWindow
          );
        };
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="fixed left-0 top-0 z-[999] h-3 w-3 rounded-full checker-mini pointer-events-none opacity-0 will-change-transform hidden [@media(pointer:fine)]:block"
    />
  );
}
