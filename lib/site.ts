export const SITE = {
  name: "Tandy's Window Services",
  tagline: "Bringing back the 1950's work ethic, when service meant something.",
  phone: "(469) 405-8713",
  phoneHref: "tel:+14694058713",
  city: "Fort Worth, TX 76116",
  facebook: "https://facebook.com/61585672082823",
  instagram: "https://instagram.com/tandyswindowservices",
  googleReviewsUrl:
    "https://www.google.com/search?q=Tandy%27s+Window+Services+Fort+Worth+reviews",
  rating: 5.0,
  reviewCount: 43,
} as const;

// Drop the generated clips in public/videos/ using these exact filenames and
// the hero automatically switches from the illustrated fallback scene to the
// real scroll-scrubbed video — no other code changes needed.
export const HERO_VIDEO = {
  desktop: "/videos/hero.mp4",
  mobile: "/videos/hero-mobile.mp4",
} as const;

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/reviews", label: "Reviews" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;
