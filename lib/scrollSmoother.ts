import type { ScrollSmoother } from "gsap/ScrollSmoother";

/** Shared handle so other components (e.g. page transitions) can reset
 * scroll position without re-querying GSAP internals. */
export const scrollSmootherRef: { current: ScrollSmoother | null } = {
  current: null,
};
