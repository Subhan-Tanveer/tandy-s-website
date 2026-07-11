export default function QualitySeal({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <svg
        viewBox="0 0 200 200"
        className="absolute inset-0 w-full h-full animate-[spin_22s_linear_infinite] motion-reduce:animate-none"
        aria-hidden="true"
      >
        <defs>
          <path
            id="sealCircle"
            d="M 100,100 m -78,0 a 78,78 0 1,1 156,0 a 78,78 0 1,1 -156,0"
          />
        </defs>
        <circle cx="100" cy="100" r="94" fill="none" stroke="var(--color-racing-red)" strokeWidth="2" />
        <circle
          cx="100"
          cy="100"
          r="60"
          fill="none"
          stroke="var(--color-racing-red)"
          strokeWidth="2"
          strokeDasharray="4 5"
        />
        <text
          fill="var(--color-asphalt)"
          fontSize="11"
          letterSpacing="3"
          style={{ fontFamily: "var(--font-bebas)" }}
        >
          <textPath href="#sealCircle" startOffset="2%">
            QUALITY GUARANTEED • QUALITY GUARANTEED •
          </textPath>
        </text>
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className="font-badge text-xl text-racing-red leading-none">EST.</span>
        <span className="font-display text-3xl leading-none mt-0.5">1950&apos;S</span>
        <span className="font-display text-[9px] tracking-[0.2em] mt-1 text-asphalt/70">
          FORT WORTH, TX
        </span>
      </div>
    </div>
  );
}
