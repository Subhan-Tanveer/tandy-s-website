import Hero from "@/components/Hero";
import QuoteForm from "@/components/QuoteForm";
import ServicesGrid from "@/components/ServicesGrid";
import HowItWorks from "@/components/HowItWorks";
import AboutTeaser from "@/components/AboutTeaser";
import TestimonialsStrip from "@/components/TestimonialsStrip";
import VeteranCallout from "@/components/VeteranCallout";
import CtaQuoteSection from "@/components/CtaQuoteSection";
import SectionDivider from "@/components/SectionDivider";
import MarqueeTicker from "@/components/MarqueeTicker";

export default function Home() {
  return (
    <>
      <Hero />
      <section className="bg-asphalt py-16 md:py-20 container-edge">
        <div className="max-w-2xl mx-auto bg-cream rounded-sm p-8 md:p-12">
          <div className="mb-8 text-center">
            <p className="font-display text-racing-red tracking-[0.3em] uppercase text-lg md:text-2xl mb-3">
              Get Your Free Quote
            </p>
            <h2 className="font-display text-3xl md:text-5xl uppercase mb-3">
              Tell Us About Your Project
            </h2>
            <p className="text-asphalt/70 text-base md:text-lg">
              Fill out the form below and we'll get back to you within one business day.
            </p>
          </div>
          <QuoteForm />
        </div>
      </section>
      <MarqueeTicker />
      <SectionDivider variant="invert" />
      <ServicesGrid />
      <SectionDivider variant="normal" />
      <HowItWorks />
      <SectionDivider variant="invert" />
      <AboutTeaser />
      <SectionDivider variant="normal" />
      <TestimonialsStrip />
      <VeteranCallout />
      <MarqueeTicker items={["REQUEST YOUR FREE QUOTE TODAY", "(469) 405-8713", "SERVING FORT WORTH & SURROUNDING AREAS"]} />
      <CtaQuoteSection />
    </>
  );
}
