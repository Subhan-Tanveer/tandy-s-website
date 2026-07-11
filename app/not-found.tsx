"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Home } from "lucide-react";
import { SITE } from "@/lib/site";
import MagneticButton from "@/components/MagneticButton";
import { Squeegee } from "@/components/HeroArt";

export default function NotFound() {
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        reduced: "(prefers-reduced-motion: reduce)",
        full: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduced } = context.conditions as { reduced: boolean };

        if (reduced) {
          stage.style.setProperty("--wipe", "100");
          return;
        }

        stage.style.setProperty("--wipe", "0");
        const obj = { wipe: 0 };
        gsap.to(obj, {
          wipe: 100,
          duration: 1.6,
          delay: 0.4,
          ease: "power2.inOut",
          onUpdate: () => stage.style.setProperty("--wipe", String(obj.wipe)),
        });
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section className="relative min-h-[calc(100vh-4rem)] bg-asphalt flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 checker-invert opacity-[0.05]" />

      <div className="relative container-edge text-center py-24">
        <div
          ref={stageRef}
          className="relative inline-block"
          style={{ "--wipe": 0 } as React.CSSProperties}
        >
          <h1 className="font-display text-cream text-[28vw] sm:text-[16rem] leading-none uppercase select-none">
            40<span className="text-racing-red">4</span>
          </h1>

          {/* grime overlay, wiped away on load */}
          <div
            className="absolute inset-0 grain"
            style={{
              background: "linear-gradient(135deg, rgba(60,50,40,0.92), rgba(20,18,16,0.96))",
              clipPath:
                "polygon(calc(var(--wipe) * 1%) 0%, 100% 0%, 100% 100%, calc(var(--wipe) * 1% - 16%) 100%)",
            }}
          />

          <div
            className="absolute top-1/2 hidden sm:block"
            style={{
              left: "calc(var(--wipe) * 1%)",
              transform: "translate(-50%, -55%) rotate(14deg)",
            }}
          >
            <Squeegee className="w-10 md:w-16 h-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]" />
          </div>
        </div>

        <p className="font-display text-mustard text-xl md:text-3xl tracking-wide uppercase mt-6">
          Looks Like This Page Needs A Wash
        </p>
        <p className="text-cream/70 max-w-md mx-auto mt-4 text-base md:text-lg">
          We couldn&apos;t find that page &mdash; but we can still get your windows
          looking brand new.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <MagneticButton
            href="/"
            className="bg-racing-red text-cream font-display text-lg md:text-xl tracking-wide uppercase px-7 py-3.5 rounded-sm border-2 border-racing-red hover:bg-transparent hover:text-racing-red"
          >
            <Home size={18} />
            Back To Home
          </MagneticButton>
          <MagneticButton
            href={SITE.phoneHref}
            className="text-cream font-display text-lg md:text-xl tracking-wide uppercase px-7 py-3.5 border-2 border-cream/40 rounded-sm hover:border-racing-red hover:text-racing-red"
          >
            {SITE.phone}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
