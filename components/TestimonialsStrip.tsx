import Link from "next/link";
import { SITE } from "@/lib/site";
import Reveal from "./Reveal";
import RevealStagger from "./RevealStagger";
import StarRow from "./StarRow";
import TestimonialsCarousel from "./TestimonialsCarousel";
import SplitText from "./SplitText";

export default function TestimonialsStrip() {
  return (
    <section className="relative bg-asphalt py-24 md:py-32 container-edge overflow-hidden">
      <div className="absolute inset-0 checker-invert opacity-[0.04]" />
      <RevealStagger className="relative max-w-2xl mx-auto text-center mb-16">
        <StarRow size={22} className="justify-center mb-3" />
        <h2 className="font-display text-4xl md:text-6xl uppercase text-cream">
          <SplitText>
            {`${SITE.rating.toFixed(1)} Stars.`} <span className="text-racing-red">{`${SITE.reviewCount} Reviews.`}</span>
          </SplitText>
        </h2>
        <p className="text-cream/60 mt-4">
          The owner personally replies to nearly every one &mdash; here&apos;s what customers are saying.
        </p>
      </RevealStagger>

      <Reveal variant="rise" delay={0.15} className="relative max-w-3xl mx-auto">
        <TestimonialsCarousel />
      </Reveal>

      <Reveal variant="pop" delay={0.2} className="relative text-center mt-12">
        <Link
          href="/reviews"
          className="font-display uppercase tracking-wide text-lg text-racing-red hover:text-cream transition-colors duration-300 underline underline-offset-4"
        >
          Read All Reviews
        </Link>
      </Reveal>
    </section>
  );
}
