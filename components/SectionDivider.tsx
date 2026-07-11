/**
 * A skewed checkered-flag strip marking the transition between two sections
 * with contrasting backgrounds, instead of a hard horizontal cut. Reuses the
 * site's checker/checker-invert texture so every divider reads as the same
 * motif rather than a one-off shape.
 */
export default function SectionDivider({
  variant = "normal",
  className = "",
}: {
  variant?: "normal" | "invert";
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`relative w-full h-5 md:h-7 ${
        variant === "invert" ? "checker-invert" : "checker"
      } ${className}`}
      style={{ clipPath: "polygon(0 35%, 100% 0%, 100% 100%, 0% 65%)" }}
    />
  );
}
