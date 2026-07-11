const DEFAULT_ITEMS = [
  "5.0 STARS ON GOOGLE",
  "43 FIVE-STAR REVIEWS",
  "VETERAN DISCOUNTS AVAILABLE",
  "OLD-FASHIONED 1950'S SERVICE",
  "FORT WORTH, TX",
  "FREE QUOTES, NO GIMMICKS",
];

export default function MarqueeTicker({
  items = DEFAULT_ITEMS,
  className = "",
}: {
  items?: string[];
  className?: string;
}) {
  const loop = [...items, ...items];

  return (
    <div
      className={`relative overflow-hidden bg-asphalt py-3 border-y-2 border-racing-red/40 ${className}`}
      aria-hidden="true"
    >
      <div className="flex whitespace-nowrap animate-marquee motion-reduce:animate-none will-change-transform">
        {loop.map((item, i) => (
          <span
            key={i}
            className="font-display text-cream/80 text-sm md:text-base tracking-[0.3em] uppercase mx-6 flex items-center gap-6 shrink-0"
          >
            {item}
            <span className="text-racing-red">&#10022;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
