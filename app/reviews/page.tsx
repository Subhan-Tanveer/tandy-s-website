import type { Metadata } from "next";
import { MessageCircleHeart, ExternalLink } from "lucide-react";
import { SITE } from "@/lib/site";
import Reveal from "@/components/Reveal";
import RevealStagger from "@/components/RevealStagger";
import StarRow from "@/components/StarRow";
import ScatteredReviewWall from "@/components/ScatteredReviewWall";
import Counter from "@/components/Counter";
import MagneticButton from "@/components/MagneticButton";
import SectionDivider from "@/components/SectionDivider";
import MarqueeTicker from "@/components/MarqueeTicker";
import SplitText from "@/components/SplitText";
import BackgroundVideo from "@/components/BackgroundVideo";

export const metadata: Metadata = {
  title: "Reviews — 5.0 Stars, 43 Google Reviews",
  description:
    "See why Fort Worth homeowners give Tandy's Window Services a perfect 5.0-star rating across 43 Google reviews.",
};

export default function ReviewsPage() {
  return (
    <>
      <section className="relative bg-asphalt pt-36 pb-20 md:pt-44 md:pb-24 overflow-hidden">
        <BackgroundVideo src="/videos/reviews-hero.mp4" className="opacity-40" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(18,17,16,0.55) 0%, rgba(18,17,16,0.92) 100%)" }}
        />
        <div className="absolute inset-0 checker-invert opacity-[0.04]" />
        <div className="relative container-edge text-center">
          <RevealStagger>
            <StarRow size={28} immediate className="justify-center mb-4" />
            <h1 className="font-display text-5xl md:text-7xl uppercase text-cream mb-6">
              <SplitText>What Fort Worth Is Saying</SplitText>
            </h1>
            <div className="flex items-center justify-center gap-10 md:gap-16">
              <div>
                <div className="font-display text-5xl md:text-6xl text-racing-red">
                  <Counter value={5.0} decimals={1} immediate delay={0.4} />
                </div>
                <p className="text-cream/60 text-xs md:text-sm uppercase tracking-wide mt-1">
                  Average Rating
                </p>
              </div>
              <div>
                <div className="font-display text-5xl md:text-6xl text-racing-red">
                  <Counter value={43} immediate delay={0.5} />
                </div>
                <p className="text-cream/60 text-xs md:text-sm uppercase tracking-wide mt-1">
                  Google Reviews
                </p>
              </div>
            </div>
          </RevealStagger>
        </div>
      </section>

      <MarqueeTicker />
      <SectionDivider variant="invert" />

      <section className="bg-cream py-20 md:py-28 container-edge">
        <Reveal variant="rise" className="max-w-2xl mx-auto text-center mb-6">
          <div className="inline-flex items-center gap-2 text-racing-red font-display uppercase tracking-wide mb-8">
            <MessageCircleHeart size={22} />
            The owner personally replies to every review
          </div>
        </Reveal>

        <ScatteredReviewWall className="mb-14" />

        <RevealStagger variant="pop" className="text-center">
          <p className="text-asphalt/70 mb-5 max-w-xl mx-auto">
            These are just a few of the 43 five-star reviews on Google. Read the
            full history &mdash; including the owner&apos;s personal replies &mdash;
            straight from the source.
          </p>
          <MagneticButton
            href={SITE.googleReviewsUrl}
            className="bg-asphalt text-cream font-display tracking-wide uppercase px-6 py-3.5 rounded-sm border-2 border-asphalt hover:bg-transparent hover:text-asphalt"
          >
            View All Reviews on Google <ExternalLink size={18} />
          </MagneticButton>
        </RevealStagger>
      </section>

      <SectionDivider variant="normal" />

      <section className="bg-racing-red py-16 md:py-20">
        <RevealStagger variant="wipe" className="container-edge text-center">
          <h2 className="font-display text-3xl md:text-5xl uppercase text-cream mb-4">
            <SplitText>Ready to Join Them?</SplitText>
          </h2>
          <p className="text-cream/85 mb-6 max-w-xl mx-auto">
            Old-fashioned service, a perfect track record, and a veteran discount
            when you need it.
          </p>
          <MagneticButton
            href="/contact"
            className="bg-asphalt text-cream font-display text-xl tracking-wide uppercase px-8 py-4 rounded-sm border-2 border-asphalt hover:bg-transparent hover:text-asphalt"
          >
            Request a Free Quote
          </MagneticButton>
        </RevealStagger>
      </section>
    </>
  );
}
