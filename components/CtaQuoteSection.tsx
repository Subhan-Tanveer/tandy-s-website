import { Phone } from "lucide-react";
import { SITE } from "@/lib/site";
import Reveal from "./Reveal";
import RevealStagger from "./RevealStagger";
import QuoteForm from "./QuoteForm";
import SplitText from "./SplitText";

export default function CtaQuoteSection() {
  return (
    <section id="quote" className="relative bg-asphalt py-24 md:py-32">
      <div className="container-edge grid lg:grid-cols-2 gap-12 items-center">
        <RevealStagger>
          <p className="font-display text-racing-red tracking-[0.3em] uppercase text-sm mb-3">
            Ready When You Are
          </p>
          <h2 className="font-display text-4xl md:text-6xl uppercase text-cream mb-6">
            <SplitText>Get Your Free Quote</SplitText>
          </h2>
          <p className="text-cream/70 text-lg mb-8 max-w-md">
            Tell us a bit about your property and we&apos;ll get back to you with a
            straightforward quote &mdash; no pressure, no gimmicks.
          </p>
          <a
            href={SITE.phoneHref}
            className="group inline-flex items-center gap-3 font-display text-2xl md:text-3xl tracking-wide text-cream hover:text-racing-red active:scale-95 transition-[color,transform] duration-300"
          >
            <Phone size={26} className="text-racing-red transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
            {SITE.phone}
          </a>
        </RevealStagger>

        <Reveal variant="wipe" className="bg-cream rounded-sm p-6 md:p-8">
          <QuoteForm variant="compact" />
        </Reveal>
      </div>
    </section>
  );
}
