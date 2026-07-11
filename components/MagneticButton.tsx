"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

type Props = {
  children: React.ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

export default function MagneticButton({
  children,
  className = "",
  href,
  onClick,
  type = "button",
  disabled,
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3" });
      const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3" });
      const scaleTo = gsap.quickTo(el, "scale", { duration: 0.3, ease: "power3" });

      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect();
        xTo((e.clientX - rect.left - rect.width / 2) * 0.25);
        yTo((e.clientY - rect.top - rect.height / 2) * 0.35);
      };
      const onEnter = () => scaleTo(1.04);
      const onLeave = () => {
        xTo(0);
        yTo(0);
        scaleTo(1);
      };
      // GSAP's inline transform would otherwise silently override the
      // Tailwind `active:scale-95` press state, so handle it here too.
      const onDown = () => scaleTo(0.95);
      const onUp = () => scaleTo(1.04);

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
      el.addEventListener("pointerdown", onDown);
      el.addEventListener("pointerup", onUp);

      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.removeEventListener("pointerdown", onDown);
        el.removeEventListener("pointerup", onUp);
      };
    });

    return () => mm.revert();
  }, []);

  const sharedClass = `inline-flex items-center justify-center gap-2 active:scale-95 transition-transform duration-150 will-change-transform ${className}`;

  if (href) {
    return (
      <Link ref={ref} href={href} className={sharedClass}>
        {children}
      </Link>
    );
  }

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={sharedClass}
    >
      {children}
    </button>
  );
}
