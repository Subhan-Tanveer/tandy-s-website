"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, ChevronDown } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useIsMobile } from "@/lib/useIsMobile";
import { SITE, HERO_VIDEO } from "@/lib/site";
import MagneticButton from "./MagneticButton";
import Counter from "./Counter";
import StarRow from "./StarRow";
import { SunRays, Skyline, Squeegee } from "./HeroArt";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
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
  // playable; if the file is missing or fails, the illustrated scene below
  // just stays put — nothing breaks.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => {
      video.pause();
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
  }, [videoSrc]);

  // Scroll-scrubbed reveal (the site's signature moment) — drives the
  // illustrated squeegee wipe and, once loaded, the real video's currentTime
  // in lockstep, so either one scrubs identically with scroll position.
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const stage = stageRef.current;
    if (!wrapper || !stage) return;

    if (reduced) {
      stage.style.setProperty("--wipe", "100");
      const video = videoRef.current;
      if (video && video.duration) video.currentTime = video.duration;
      return;
    }

    stage.style.setProperty("--wipe", "0");
    stage.style.setProperty("--parallax-bg", "0");
    stage.style.setProperty("--parallax-mid", "0");

    const ctx = gsap.context(() => {
      const st = ScrollTrigger.create({
        trigger: wrapper,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6,
        pin: stage,
        pinSpacing: false,
        onUpdate: (self) => {
          const p = self.progress;
          stage.style.setProperty("--wipe", String(Math.min(100, p * 118)));
          stage.style.setProperty("--parallax-bg", String(p * 30));
          stage.style.setProperty("--parallax-mid", String(p * -50));

          const video = videoRef.current;
          if (video && video.duration) {
            video.currentTime = p * video.duration;
          }
        },
      });
      return () => st.kill();
    }, wrapper);

    return () => ctx.revert();
  }, [reduced]);

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
    <section
      ref={wrapperRef}
      className={`relative bg-asphalt ${reduced ? "h-screen" : "h-[280vh]"}`}
    >
      <div
        ref={stageRef}
        className="h-screen w-full overflow-hidden bg-asphalt grain"
        style={{ "--wipe": 0, "--parallax-bg": 0, "--parallax-mid": 0 } as React.CSSProperties}
      >
        {/* real footage, once loaded — crossfades in over the illustrated scene */}
        <video
          ref={videoRef}
          key={videoSrc}
          src={videoSrc}
          muted
          playsInline
          preload="auto"
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* illustrated fallback scene — stays visible until real footage is ready */}
        <div
          className={`absolute inset-0 transition-opacity duration-700 ${
            videoReady ? "opacity-0" : "opacity-100"
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-[#3a1210] via-asphalt-soft to-asphalt" />

          <div
            className="absolute inset-0 opacity-70"
            style={{ transform: "translateY(calc(var(--parallax-bg) * -1px))" }}
          >
            <SunRays className="absolute -top-[10%] left-1/2 -translate-x-1/2 w-[140%] max-w-none" />
          </div>

          <div
            className="absolute inset-x-0 bottom-[18%]"
            style={{ transform: "translateY(calc(var(--parallax-mid) * 1px))" }}
          >
            <Skyline className="w-full h-32 md:h-48 opacity-80" />
          </div>

          {/* grime overlay wiped away by scroll */}
          <div
            className="absolute inset-0 grain"
            style={{
              background:
                "linear-gradient(135deg, rgba(60,50,40,0.88), rgba(20,18,16,0.94))",
              clipPath:
                "polygon(calc(var(--wipe) * 1%) 0%, 100% 0%, 100% 100%, calc(var(--wipe) * 1% - 16%) 100%)",
            }}
          />

          {/* squeegee riding the wipe edge */}
          <div
            className="absolute top-1/2 hidden sm:block will-change-transform"
            style={{
              left: "calc(var(--wipe) * 1%)",
              transform: "translate(-50%, -55%) rotate(14deg)",
            }}
          >
            <Squeegee className="w-10 md:w-14 h-auto drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]" />
          </div>
        </div>

        <div className="absolute top-0 inset-x-0 h-4 md:h-6 checker z-10" />
        <div className="absolute bottom-0 inset-x-0 h-4 md:h-6 checker z-10" />

        {/* headline content, always legible regardless of wipe/video state */}
        <div className="relative z-10 h-full flex flex-col items-center justify-start text-center px-6 pt-36 pb-8 md:pt-40">
          <div
            ref={badgeRef}
            className="flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full border border-mustard/50 bg-black/30 backdrop-blur-sm will-change-transform"
          >
            <StarRow size={14} immediate delay={0.25} />
            <span className="text-cream text-sm md:text-base tracking-wide">
              {SITE.rating.toFixed(1)} stars &middot; {SITE.reviewCount} Google reviews
            </span>
          </div>

          <h1
            ref={headlineRef}
            className="font-display text-cream text-[13vw] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] uppercase max-w-5xl will-change-transform"
          >
            Fort Worth&apos;s <span className="text-racing-red">5-Star</span> Window Cleaning
          </h1>
          <p
            ref={subRef}
            className="font-display text-mustard text-xl md:text-3xl tracking-wide uppercase mt-4 will-change-transform"
          >
            Old-Fashioned Service Since Day One
          </p>
          <p
            ref={quoteRef}
            className="text-cream/70 max-w-xl mt-4 text-base md:text-lg will-change-transform"
          >
            &ldquo;{SITE.tagline}&rdquo;
          </p>

          <div ref={ctaRef} className="flex flex-col sm:flex-row items-center gap-4 mt-8">
            <MagneticButton
              href="/contact"
              className="bg-racing-red text-cream font-display text-xl md:text-2xl tracking-wide uppercase px-8 py-4 rounded-sm border-2 border-racing-red hover:bg-transparent hover:text-racing-red active:scale-95"
            >
              Request a Free Quote
            </MagneticButton>
            <MagneticButton
              href={SITE.phoneHref}
              className="text-cream font-display text-xl md:text-2xl tracking-wide uppercase px-8 py-4 border-2 border-cream/40 rounded-sm hover:border-racing-red hover:text-racing-red active:scale-95"
            >
              <Phone size={20} className="text-racing-red" />
              {SITE.phone}
            </MagneticButton>
          </div>

          <div ref={statsRef} className="grid grid-cols-3 gap-6 md:gap-16 mt-12">
            <div>
              <div className="font-display text-4xl md:text-5xl text-racing-red">
                <Counter value={5.0} decimals={1} immediate delay={1.7} />
              </div>
              <p className="text-cream/60 text-xs md:text-sm uppercase tracking-wide mt-1">
                Google Rating
              </p>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl text-racing-red">
                <Counter value={43} immediate delay={1.8} />
              </div>
              <p className="text-cream/60 text-xs md:text-sm uppercase tracking-wide mt-1">
                5-Star Reviews
              </p>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl text-racing-red">
                <Counter value={13} immediate delay={1.9} />
              </div>
              <p className="text-cream/60 text-xs md:text-sm uppercase tracking-wide mt-1">
                Services Offered
              </p>
            </div>
          </div>

          <div
            ref={scrollCueRef}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-cream/50 animate-bounce"
          >
            <span className="text-xs uppercase tracking-widest">Scroll</span>
            <ChevronDown size={18} />
          </div>
        </div>
      </div>
    </section>
  );
}
