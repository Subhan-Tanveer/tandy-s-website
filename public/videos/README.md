# Hero video clips

Drop the stitched hero clip(s) here using these exact filenames — the Hero
component automatically detects them and switches from the illustrated
fallback scene to the real scroll-scrubbed video, no code changes needed:

- `hero.mp4` — desktop/tablet clip (16:9)
- `hero-mobile.mp4` — optional lighter/vertical crop for phones (falls back
  to `hero.mp4` if you don't provide one)

Keep each file small (a few MB) and compressed (H.264, muted) — this video
gets scrubbed frame-by-frame on every scroll tick, so file size directly
affects how smooth it feels, especially on phones.
