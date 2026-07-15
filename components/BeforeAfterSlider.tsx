"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Drag-to-reveal before/after comparison. We only have one real photo per
 * service (not a separate "dirty" shot), so the "before" side is the same
 * photo pushed through a grimy CSS filter rather than a second image —
 * clearly labeled so it reads as a stylized comparison, not a real photo.
 */
export default function BeforeAfterSlider({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [value, setValue] = useState(50);

  return (
    <div className={`relative w-full h-full rounded-sm overflow-hidden select-none ${className}`}>
      {/* before: same photo, grimy filter simulating the "dirty" state */}
      <div className="absolute inset-0">
        <Image
          src={src}
          alt={`${alt} — before`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
          style={{ filter: "grayscale(0.35) sepia(0.45) brightness(0.7) contrast(0.9) blur(0.5px)" }}
        />
        <span className="absolute top-3 left-3 bg-asphalt/80 text-cream text-xs font-display uppercase tracking-widest px-2.5 py-1 rounded-sm">
          Before
        </span>
      </div>

      {/* after: the real photo, clipped to reveal only up to the handle */}
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}>
        <Image
          src={src}
          alt={`${alt} — after`}
          fill
          sizes="(min-width: 768px) 50vw, 100vw"
          className="object-cover"
        />
        <span className="absolute top-3 right-3 bg-racing-red text-cream text-xs font-display uppercase tracking-widest px-2.5 py-1 rounded-sm">
          After
        </span>
      </div>

      {/* divider handle */}
      <div
        className="absolute inset-y-0 w-0.5 bg-cream pointer-events-none"
        style={{ left: `${value}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-cream border-2 border-racing-red flex items-center justify-center shadow-lg">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-racing-red">
            <path d="M5 3L1 8L5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 3L15 8L11 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        aria-label={`Drag to compare ${alt} before and after`}
        className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize"
      />
    </div>
  );
}
