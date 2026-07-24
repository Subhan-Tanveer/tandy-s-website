import type { Metadata } from "next";
import { DollarSign, Clock, Gift, TrendingUp, Briefcase, Wrench } from "lucide-react";
import RevealStagger from "@/components/RevealStagger";
import ScrollRevealGsap from "@/components/ScrollRevealGsap";
import CareerApplicationForm from "@/components/CareerApplicationForm";
import SectionDivider from "@/components/SectionDivider";
import MarqueeTicker from "@/components/MarqueeTicker";
import SplitText from "@/components/SplitText";
import BackgroundVideo from "@/components/BackgroundVideo";

export const metadata: Metadata = {
  title: "Careers — Now Hiring in the DFW Area",
  description:
    "Tandy's Window Services is hiring Sales and Labor/Field Technician positions in the Dallas-Fort Worth area. Competitive pay, flexible schedules, bonuses, and growth opportunities.",
};

const PERKS = [
  { icon: DollarSign, label: "Competitive Pay" },
  { icon: Clock, label: "Flexible Schedules" },
  { icon: Gift, label: "Bonuses & Incentives" },
  { icon: TrendingUp, label: "Growth Opportunities" },
];

const POSITIONS = [
  {
    icon: Briefcase,
    title: "Sales Position",
    body:
      "Looking for outgoing, driven individuals who are confident talking to people and generating leads. Sales experience is a plus, but not required if you're hungry to learn and work hard.",
  },
  {
    icon: Wrench,
    title: "Labor / Field Technician",
    body:
      "Looking for dependable team members to help with window cleaning, power washing, soft washing, gutter cleaning, and exterior cleaning services. Must be reliable, professional, and comfortable working outdoors and on ladders.",
  },
];

export default function CareersPage() {
  return (
    <>
      <section className="relative bg-asphalt pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <BackgroundVideo src="/videos/careers-hero.mp4" className="opacity-40" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(18,17,16,0.55) 0%, rgba(18,17,16,0.92) 100%)" }}
        />
        <div className="absolute inset-0 checker-invert opacity-[0.04]" />
        <div className="relative container-edge text-center">
          <RevealStagger>
            <p className="font-display text-racing-red tracking-[0.3em] uppercase text-sm mb-3">
              Now Hiring
            </p>
            <h1 className="font-display text-5xl md:text-7xl uppercase text-cream mb-5">
              <SplitText>Join The Tandy&apos;s Team</SplitText>
            </h1>
            <p className="text-cream/70 max-w-2xl mx-auto text-lg">
              Tandy&apos;s Window Services is growing and looking for motivated people
              to join our team in the DFW area. We&apos;re currently hiring for both
              Sales and Labor/Field Technician positions.
            </p>
          </RevealStagger>
        </div>
      </section>

      <MarqueeTicker />
      <SectionDivider variant="invert" />

      <section className="bg-cream py-20 md:py-28 container-edge">
        <RevealStagger variant="wipe" className="max-w-2xl mx-auto text-center mb-14">
          <p className="font-display text-racing-red tracking-[0.3em] uppercase text-sm mb-3">
            What We Offer
          </p>
          <h2 className="font-display text-4xl md:text-6xl uppercase">
            <SplitText>Grow Your Career With Us</SplitText>
          </h2>
        </RevealStagger>

        <RevealStagger variant="pop" stagger={0.08} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
          {PERKS.map((perk) => (
            <div
              key={perk.label}
              className="bg-asphalt text-cream rounded-sm p-6 text-center border-2 border-transparent hover:border-racing-red transition-colors duration-300"
            >
              <perk.icon size={32} className="text-racing-red mx-auto mb-4" />
              <p className="font-display uppercase tracking-wide">{perk.label}</p>
            </div>
          ))}
        </RevealStagger>

        <RevealStagger variant="rise" stagger={0.15} className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {POSITIONS.map((position) => (
            <div key={position.title} className="bg-white/60 border-2 border-asphalt/10 rounded-sm p-8">
              <position.icon size={36} className="text-racing-red mb-4" />
              <h3 className="font-display text-2xl uppercase mb-3">{position.title}</h3>
              <p className="text-asphalt/75 text-base md:text-lg leading-relaxed">{position.body}</p>
            </div>
          ))}
        </RevealStagger>
      </section>

      <SectionDivider variant="normal" />

      <section className="bg-asphalt py-20 md:py-28 container-edge">
        <RevealStagger variant="wipe" className="max-w-2xl mx-auto text-center mb-12">
          <p className="font-display text-racing-red tracking-[0.3em] uppercase text-sm mb-3">
            Apply Now
          </p>
          <h2 className="font-display text-4xl md:text-6xl uppercase text-cream mb-4">
            <SplitText>Ready To Join Us?</SplitText>
          </h2>
          <p className="text-cream/70 text-lg">
            If you&apos;re hardworking, dependable, and want to be part of a company
            that takes pride in quality work, we&apos;d love to hear from you.
          </p>
        </RevealStagger>

        <ScrollRevealGsap className="max-w-2xl mx-auto bg-cream rounded-sm p-6 md:p-10">
          <CareerApplicationForm />
        </ScrollRevealGsap>
      </section>
    </>
  );
}
