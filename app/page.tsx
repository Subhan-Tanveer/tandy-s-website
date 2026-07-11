import Hero from "@/components/Hero";
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
