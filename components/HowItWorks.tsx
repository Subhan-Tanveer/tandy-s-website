"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { PhoneCall, Clock, Sparkles } from "lucide-react";
import RevealStagger from "./RevealStagger";
import SplitText from "./SplitText";

gsap.registerPlugin(ScrollTrigger, DrawSVGPlugin);

const STEPS = [
  {
    icon: PhoneCall,
    title: "Request Your Free Quote",
    body: "Tell us what needs cleaning — takes two minutes, no pressure, no gimmicks.",
  },
  {
    icon: Clock,
    title: "We Show Up On Time",
    body: "Old-fashioned punctuality. We treat your schedule like it matters, because it does.",
  },
  {
    icon: Sparkles,
    title: "Enjoy The Sparkle",
    body: "Streak-free glass, clear gutters, a spotless driveway — done right, guaranteed.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const path = pathRef.current;
    if (!section || !path) return;

    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.set(path, { drawSVG: "0%" });
      gsap.to(path, {
        drawSVG: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top 65%",
          end: "bottom 65%",
          scrub: 0.5,
        },
      });
    });

    mm.add("(prefers-reduced-motion: reduce)", () => {
      gsap.set(path, { drawSVG: "100%" });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-asphalt py-24 md:py-32 container-edge overflow-hidden"
    >
      <RevealStagger variant="wipe" className="max-w-2xl mx-auto text-center mb-16 md:mb-24">
        <p className="font-display text-racing-red tracking-[0.3em] uppercase text-sm mb-3">
          How It Works
        </p>
        <h2 className="font-display text-4xl md:text-6xl uppercase text-cream">
          <SplitText>Three Steps To Spotless</SplitText>
        </h2>
      </RevealStagger>

      <div className="relative max-w-5xl mx-auto">
        <svg
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
          className="hidden md:block absolute top-10 left-0 w-full h-4"
          aria-hidden="true"
        >
          <path
            ref={pathRef}
            d="M16,5 L84,5"
            stroke="var(--color-racing-red)"
            strokeWidth="0.6"
            fill="none"
            strokeLinecap="round"
            strokeDasharray="1 3"
          />
        </svg>

        <div className="grid md:grid-cols-3 gap-10 md:gap-6 relative">
          {STEPS.map((step, i) => (
            <RevealStagger key={step.title} variant="pop" delay={i * 0.15} stagger={0.1} className="text-center">
              <div className="relative mx-auto w-20 h-20 rounded-full bg-racing-red flex items-center justify-center mb-6">
                <step.icon size={30} className="text-cream" />
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-cream text-racing-red font-badge text-sm flex items-center justify-center">
                  {i + 1}
                </span>
              </div>
              <h3 className="font-display text-xl md:text-2xl uppercase text-cream mb-2">
                {step.title}
              </h3>
              <p className="text-cream/60 text-sm md:text-base max-w-xs mx-auto">
                {step.body}
              </p>
            </RevealStagger>
          ))}
        </div>
      </div>
    </section>
  );
}
