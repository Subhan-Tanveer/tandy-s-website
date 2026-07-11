export function SunRays({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 800"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid slice"
    >
      <g stroke="#e2a530" strokeWidth="3" opacity="0.35">
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          const x2 = 400 + Math.cos(angle) * 480;
          const y2 = 400 + Math.sin(angle) * 480;
          return <line key={i} x1="400" y1="400" x2={x2} y2={y2} />;
        })}
      </g>
      <circle cx="400" cy="400" r="150" fill="#c8202f" opacity="0.5" />
      <circle cx="400" cy="400" r="110" fill="#e2a530" opacity="0.45" />
    </svg>
  );
}

export function Skyline({ className = "" }: { className?: string }) {
  const buildings = [
    { x: 0, w: 60, h: 120 },
    { x: 55, w: 40, h: 190 },
    { x: 90, w: 55, h: 90 },
    { x: 140, w: 70, h: 230 },
    { x: 205, w: 45, h: 140 },
    { x: 245, w: 60, h: 170 },
    { x: 300, w: 50, h: 100 },
    { x: 345, w: 65, h: 210 },
    { x: 405, w: 45, h: 130 },
    { x: 445, w: 60, h: 165 },
    { x: 500, w: 50, h: 95 },
    { x: 545, w: 70, h: 200 },
    { x: 610, w: 45, h: 145 },
    { x: 650, w: 60, h: 180 },
    { x: 705, w: 55, h: 110 },
    { x: 755, w: 45, h: 155 },
  ];
  return (
    <svg
      viewBox="0 0 800 240"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMax slice"
    >
      {buildings.map((b, i) => (
        <rect
          key={i}
          x={b.x}
          y={240 - b.h}
          width={b.w}
          height={b.h}
          fill="#121110"
        />
      ))}
    </svg>
  );
}

export function HotRod({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 200"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMax meet"
    >
      {/* checkered ground shadow */}
      <ellipse cx="200" cy="172" rx="150" ry="12" fill="#000" opacity="0.25" />

      {/* body */}
      <path
        d="M30,150
           L45,120
           Q70,95 120,95
           L150,95
           Q170,55 220,52
           Q260,50 280,80
           L300,95
           Q330,95 355,120
           L365,150
           Z"
        fill="#c8202f"
        stroke="#121110"
        strokeWidth="4"
      />

      {/* windshield */}
      <path
        d="M165,92 Q182,62 218,58 Q245,56 262,80 L255,92 Z"
        fill="#f4ecd8"
        opacity="0.9"
      />

      {/* side checker stripe */}
      <rect x="70" y="128" width="90" height="10" fill="#f4ecd8" />
      <rect x="70" y="128" width="10" height="10" fill="#121110" />
      <rect x="90" y="128" width="10" height="10" fill="#121110" />
      <rect x="110" y="128" width="10" height="10" fill="#121110" />
      <rect x="130" y="128" width="10" height="10" fill="#121110" />
      <rect x="150" y="128" width="10" height="10" fill="#121110" />

      {/* bumper */}
      <rect x="20" y="140" width="20" height="10" rx="3" fill="#c9ccd1" />
      <rect x="360" y="140" width="20" height="10" rx="3" fill="#c9ccd1" />

      {/* wheels */}
      <circle cx="110" cy="160" r="28" fill="#121110" />
      <circle cx="110" cy="160" r="12" fill="#c9ccd1" />
      <circle cx="290" cy="160" r="28" fill="#121110" />
      <circle cx="290" cy="160" r="12" fill="#c9ccd1" />
    </svg>
  );
}

export function Squeegee({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 220"
      className={className}
      aria-hidden="true"
    >
      <rect x="34" y="10" width="12" height="140" rx="5" fill="#8c1420" />
      <rect x="10" y="150" width="60" height="16" rx="4" fill="#121110" />
      <rect x="6" y="164" width="68" height="10" rx="3" fill="#c9ccd1" />
    </svg>
  );
}
