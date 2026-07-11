"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import Reveal from "./Reveal";
import QualitySeal from "./QualitySeal";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger);

export default function AboutTeaser() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const sealRef = useRef<HTMLDivElement>(null);
  const [sealShown, setSealShown] = useState(false);
  const reduced = useReducedMotion();

  // Continuous scroll-linked parallax — fine to keep on GSAP's scrub tween,
  // since it re-evaluates on every scroll event rather than needing to fire
  // once at a precise moment.
  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    const seal = sealRef.current;
    if (!section || !bg || !seal || reduced) return;

    const ctx = gsap.context(() => {
      gsap.to(bg, {
        yPercent: 20,
        scale: 1.15,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
      });
      gsap.to(seal, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true },
      });
    }, section);

    return () => ctx.revert();
  }, [reduced]);

  // One-shot pop-in: plain CSS transition driven by React state, so it can't
  // get stuck the way a JS-ticker-driven tween can if its ticker stalls.
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) setSealShown(true);
      },
      { threshold: 0.05, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(section);

    const fallback = window.setTimeout(() => setSealShown(true), 1200);

    return () => {
      observer.disconnect();
      window.clearTimeout(fallback);
    };
  }, []);

  const sealActive = reduced || sealShown;

  return (
    <section ref={sectionRef} className="relative bg-cream py-28 md:py-40 overflow-hidden">
      <div
        ref={bgRef}
        className="absolute -inset-y-1/4 inset-x-0 checker opacity-[0.06] will-change-transform"
        aria-hidden="true"
      />

      <div
        ref={sealRef}
        className="hidden md:block absolute top-10 right-[8%] w-36 h-36 lg:w-44 lg:h-44 will-change-transform"
        style={{
          opacity: sealActive ? 1 : 0,
          transform: sealActive ? "scale(1) rotate(0deg)" : "scale(0.5) rotate(-35deg)",
          transitionProperty: "opacity, transform",
          transitionDuration: reduced ? "500ms" : "900ms",
          transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        <QualitySeal className="w-full h-full" />
      </div>

      <div className="relative container-edge max-w-3xl mx-auto text-center">
        <Reveal variant="rise">
          <p className="font-display text-racing-red tracking-[0.3em] uppercase text-sm mb-4">
            Our Story
          </p>
          <h2 className="font-display text-4xl md:text-6xl uppercase mb-6">
            <SplitText>Bringing Back the 1950&apos;s Work Ethic</SplitText>
          </h2>
          <p className="text-asphalt/75 text-lg leading-relaxed mb-8">
            We won&apos;t leave a customer&apos;s home until they&apos;re completely satisfied &mdash;
            that&apos;s not a slogan, it&apos;s how every job gets run. One-of-a-kind branding, old-school
            standards, and a crew that treats your home like it&apos;s theirs.
          </p>
          <Link
            href="/about"
            className="inline-flex items-center gap-2 font-display uppercase tracking-wide text-lg text-racing-red hover:gap-4 transition-all duration-300"
          >
            Meet the Crew <ArrowRight size={20} />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
