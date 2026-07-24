"use client";

import { useRef } from "react";
import { Quote, Star } from "lucide-react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useIsCoarsePointer } from "@/lib/useIsCoarsePointer";
import type { Testimonial } from "@/lib/testimonials";

export default function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const coarsePointer = useIsCoarsePointer();

  function handleMove(e: React.MouseEvent) {
    if (reduced || coarsePointer || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    ref.current.style.transform = `perspective(800px) rotateX(${py * -8}deg) rotateY(${px * 8}deg) translateY(-4px)`;
  }

  function handleLeave() {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateY(0)";
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="bg-cream text-asphalt p-8 rounded-sm border-2 border-asphalt/10 shadow-[6px_6px_0_0_var(--color-asphalt)] transition-transform duration-300 will-change-transform h-full flex flex-col"
    >
      <Quote className="text-racing-red mb-4" size={28} fill="currentColor" />
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} size={16} fill="#e2a530" className="text-mustard" />
        ))}
      </div>
      <p className="text-asphalt/80 text-base md:text-lg leading-relaxed flex-1">&ldquo;{testimonial.quote}&rdquo;</p>
      <div className="mt-6 pt-4 border-t border-asphalt/10">
        <p className="font-display text-lg uppercase tracking-wide">{testimonial.name}</p>
        <p className="text-asphalt/50 text-base">{testimonial.meta}</p>
      </div>
    </div>
  );
}
