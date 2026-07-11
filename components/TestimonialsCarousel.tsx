"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { testimonials } from "@/lib/testimonials";
import TestimonialCard from "./TestimonialCard";

const AUTOPLAY_MS = 6500;

export default function TestimonialsCarousel() {
  const count = testimonials.length;
  const trackRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hovering, setHovering] = useState(false);
  const reduced = useReducedMotion();

  const goTo = useCallback(
    (next: number) => {
      const wrapped = ((next % count) + count) % count;
      setIndex(wrapped);
    },
    [count]
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  // Slide the track to the active index.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const xPercent = -index * (100 / count);

    if (reduced) {
      gsap.set(track, { xPercent });
      return;
    }

    gsap.to(track, { xPercent, duration: 0.7, ease: "power3.inOut" });
  }, [index, count, reduced]);

  // Autoplay — pauses on hover/focus, respects reduced motion, and always
  // offers an explicit pause control per WCAG 2.2.2 (content that moves on
  // its own for more than 5s needs a way to stop it).
  useEffect(() => {
    if (reduced || !playing || hovering) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, AUTOPLAY_MS);
    return () => clearInterval(id);
  }, [reduced, playing, hovering, count]);

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  }

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) next();
      else prev();
    }
    touchStartX.current = null;
  }

  return (
    <div
      role="region"
      aria-roledescription="carousel"
      aria-label="Customer reviews"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={() => setHovering(false)}
      onKeyDown={handleKeyDown}
      className="relative"
    >
      <div
        className="overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ width: `${count * 100}%` }}
        >
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="shrink-0 px-2"
              style={{ width: `${100 / count}%` }}
              aria-hidden={i !== index}
            >
              <TestimonialCard testimonial={t} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          type="button"
          onClick={prev}
          aria-label="Previous review"
          className="p-2 rounded-full border-2 border-cream/20 text-cream hover:border-racing-red hover:text-racing-red active:scale-90 transition-colors duration-300"
        >
          <ChevronLeft size={20} />
        </button>

        <div className="flex items-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.name}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Show review from ${t.name}`}
              aria-current={i === index}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-racing-red" : "w-2.5 bg-cream/30 hover:bg-cream/50"
              }`}
            />
          ))}
        </div>

        <button
          type="button"
          onClick={next}
          aria-label="Next review"
          className="p-2 rounded-full border-2 border-cream/20 text-cream hover:border-racing-red hover:text-racing-red active:scale-90 transition-colors duration-300"
        >
          <ChevronRight size={20} />
        </button>

        {!reduced && (
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            aria-label={playing ? "Pause automatic slideshow" : "Play automatic slideshow"}
            aria-pressed={!playing}
            className="ml-2 p-2 rounded-full border-2 border-cream/20 text-cream hover:border-racing-red hover:text-racing-red active:scale-90 transition-colors duration-300"
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
          </button>
        )}
      </div>
    </div>
  );
}
