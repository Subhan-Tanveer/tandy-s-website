"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

/**
 * A looping accent video for a page-hero background. Unlike the Home hero's
 * video (preload="auto", plays immediately), this one only loads and plays
 * once its section actually scrolls into view — and pauses again when it
 * scrolls out — so a page with one of these isn't fetching/decoding video
 * the visitor may never scroll down to see.
 */
export default function BackgroundVideo({
  src,
  className = "",
}: {
  src: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onReady = () => setReady(true);
    if (video.readyState >= 1) onReady();
    else video.addEventListener("loadedmetadata", onReady);
    return () => video.removeEventListener("loadedmetadata", onReady);
  }, []);

  useEffect(() => {
    const el = ref.current;
    const video = videoRef.current;
    if (!el || !video || reduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [reduced]);

  return (
    <div ref={ref} className="absolute inset-0">
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        preload="metadata"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        } ${className}`}
      />
    </div>
  );
}
