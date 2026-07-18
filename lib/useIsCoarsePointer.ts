"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(hover: none), (pointer: coarse)";

function subscribe(callback: () => void) {
  const mql = window.matchMedia(QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

// True for touchscreens (and anything without real hover support) — used to
// skip mouse-only effects like the 3D tilt on TestimonialCard, since touch
// devices fire synthetic mousemove events on tap/swipe with no matching
// mouseleave to reset the transform, leaving the card stuck mid-tilt.
export function useIsCoarsePointer(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
