"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Phone, ChevronDown } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useIsMobile } from "@/lib/useIsMobile";
import { SITE, HERO_VIDEO } from "@/lib/site";
import MagneticButton from "./MagneticButton";
import Counter from "./Counter";
import StarRow from "./StarRow";
import QuoteForm from "./QuoteForm";
import { SunRays, Skyline } from "./HeroArt";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const quoteRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const scrollCueRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);
  // Pick the lighter mobile clip on small screens, per the mobile
  // performance guardrail (swap to a lighter source on small screens).
  const isMobile = useIsMobile();
  const videoSrc = isMobile ? HERO_VIDEO.mobile : HERO_VIDEO.desktop;

  // Real footage takes over from the illustrated fallback the moment it's
  // playable, then autoplays on a loop — no scroll involvement. If the file
  // is missing or fails, the illustrated scene just stays put.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => {
      if (reduced) video.pause();
      else video.play().catch(() => {});
      setVideoReady(true);
    };
    const onError = () => setVideoReady(false);

    // The video can finish loading (and fire loadedmetadata) before this
    // effect runs and attaches its listener — preload="auto" starts
    // fetching the instant the element mounts, and a fast/cached load can
    // beat React's post-paint effect timing. Check readyState directly so
    // that race can't leave the fallback scene showing forever.
    if (video.readyState >= 1) {
      onReady();
    } else {
      video.addEventListener("loadedmetadata", onReady);
    }
    video.addEventListener("error", onError);
    return () => {
      video.removeEventListener("loadedmetadata", onReady);
      video.removeEventListener("error", onError);
    };
  }, [videoSrc, reduced]);

  // Sequenced entrance: badge -> headline -> subhead -> quote -> CTAs -> stats -> scroll cue.
  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add(
      {
        reduced: "(prefers-reduced-motion: reduce)",
        full: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { reduced: isReduced } = context.conditions as {
          reduced: boolean;
        };
        const targets = [
          badgeRef.current,
          headlineRef.current,
          subRef.current,
          quoteRef.current,
          ctaRef.current,
          statsRef.current,
          scrollCueRef.current,
        ].filter(Boolean);

        if (isReduced) {
          gsap.set(targets, { opacity: 1, y: 0, clearProps: "transform" });
          return;
        }

        gsap.set(targets, { opacity: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "power3.out", duration: 0.8 },
          delay: 0.15,
        });

        tl.fromTo(badgeRef.current, { opacity: 0, y: -16 }, { opacity: 1, y: 0, duration: 0.6 })
          .fromTo(headlineRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0 }, "-=0.35")
          .fromTo(subRef.current, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.45")
          .fromTo(quoteRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
          .fromTo(
            ctaRef.current ? Array.from(ctaRef.current.children) : [],
            { opacity: 0, y: 20, scale: 0.94 },
            { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.12 },
            "-=0.3"
          )
          .fromTo(
            statsRef.current ? Array.from(statsRef.current.children) : [],
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
            "-=0.25"
          )
          .fromTo(scrollCueRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.1");
      }
    );

    return () => mm.revert();
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-asphalt grain">
      <div className="absolute top-0 inset-x-0 h-4 md:h-6 checker z-10" />

      {/* Grid layout: video left, form right (stacks on mobile) */}
      <div className="relative h-full grid md:grid-cols-2 gap-0 md:min-h-screen">

        {/* LEFT SIDE: Video + fallback */}
        <div className="relative h-screen md:h-auto order-2 md:order-1">
          {/* real footage */}
          <video
            ref={videoRef}
            key={videoSrc}
            src={videoSrc}
            muted
            loop
            playsInline
            preload="auto"
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
              videoReady ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* illustrated fallback scene */}
          <div
            className={`absolute inset-0 transition-opacity duration-700 ${
              videoReady ? "opacity-0" : "opacity-100"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-[#3a1210] via-asphalt-soft to-asphalt" />
            <SunRays className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[140%] max-w-none opacity-70" />
            <Skyline className="absolute inset-x-0 bottom-[18%] w-full h-32 md:h-48 opacity-80" />
          </div>
        </div>

        {/* RIGHT SIDE: Form + Headline (stacks on top on mobile) */}
        <div className="relative z-10 order-1 md:order-2 bg-asphalt md:bg-transparent h-auto md:h-screen flex flex-col items-center justify-center px-6 py-12 md:py-0 md:px-8 md:pr-10">
          <div className="w-full max-w-md">
            {/* Badge + Headline for mobile/small screens */}
            <div
              ref={badgeRef}
              className="flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full border border-mustard/50 bg-black/30 backdrop-blur-sm will-change-transform w-fit"
            >
              <StarRow size={12} immediate delay={0.25} />
              <span className="text-cream text-sm tracking-wide">
                {SITE.rating.toFixed(1)} stars • {SITE.reviewCount} reviews
              </span>
            </div>

            <h1
              ref={headlineRef}
              className="font-display text-cream text-4xl md:text-5xl leading-tight uppercase mb-3 will-change-transform"
            >
              Fort Worth&apos;s <span className="text-racing-red">5-Star</span> Window Cleaning
            </h1>

            <p
              ref={subRef}
              className="font-display text-mustard text-lg md:text-xl tracking-wide uppercase mb-2 will-change-transform"
            >
              Old-Fashioned Service Since Day One
            </p>

            <p
              ref={quoteRef}
              className="text-cream/70 text-sm md:text-base mb-8 will-change-transform"
            >
              &ldquo;{SITE.tagline}&rdquo;
            </p>

            {/* The Form */}
            <div ref={ctaRef} className="will-change-transform">
              <QuoteForm />
            </div>

            {/* Stats below form */}
            <div ref={statsRef} className="grid grid-cols-3 gap-4 mt-8 text-center">
              <div>
                <div className="font-display text-3xl text-racing-red">
                  <Counter value={5.0} decimals={1} immediate delay={1.7} />
                </div>
                <p className="text-cream/60 text-xs uppercase tracking-wide mt-1">
                  Rating
                </p>
              </div>
              <div>
                <div className="font-display text-3xl text-racing-red">
                  <Counter value={43} immediate delay={1.8} />
                </div>
                <p className="text-cream/60 text-xs uppercase tracking-wide mt-1">
                  Reviews
                </p>
              </div>
              <div>
                <div className="font-display text-3xl text-racing-red">
                  <Counter value={13} immediate delay={1.9} />
                </div>
                <p className="text-cream/60 text-xs uppercase tracking-wide mt-1">
                  Services
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-4 md:h-6 checker z-10" />

      {/* Scroll cue only on desktop */}
      <div
        ref={scrollCueRef}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-1 text-cream/50 animate-bounce z-20"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <ChevronDown size={18} />
      </div>
    </section>
  );
}
