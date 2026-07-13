import type { Metadata } from "next";
import { ShieldCheck, Award, HandHeart, Wrench } from "lucide-react";
import { SITE } from "@/lib/site";
import { services } from "@/lib/services";
import Reveal from "@/components/Reveal";
import RevealStagger from "@/components/RevealStagger";
import Counter from "@/components/Counter";
import MagneticButton from "@/components/MagneticButton";
import SectionDivider from "@/components/SectionDivider";
import MarqueeTicker from "@/components/MarqueeTicker";
import SplitText from "@/components/SplitText";

export const metadata: Metadata = {
  title: "About Us — Fort Worth's 5-Star Window Cleaning Team",
  description:
    "Tandy's Window Services brings back the 1950's work ethic to Fort Worth window cleaning — old-fashioned craftsmanship, a perfect 5.0 Google rating, and veteran discounts.",
};

const values = [
  {
    icon: HandHeart,
    title: "We Don't Leave Until You're Happy",
    body:
      "We won't consider a job finished until a customer is completely satisfied. That's the whole standard — not a slogan, how every job actually gets run from first knock to final walkthrough.",
    featured: true,
  },
  {
    icon: Wrench,
    title: "Old-Fashioned Craftsmanship",
    body:
      "Our branding is one of a kind, and so is the way we work — careful, hands-on, and unhurried on every pane.",
    featured: false,
  },
  {
    icon: ShieldCheck,
    title: "Veteran Discount",
    body:
      "Fort Worth has a big military and veteran community, and we're glad to say thank you with a discount on service.",
    featured: false,
  },
  {
    icon: Award,
    title: "A Perfect Track Record",
    body:
      "5.0 stars across 43 Google reviews, with the team personally thanking nearly every customer who leaves one.",
    featured: false,
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative bg-asphalt pt-36 pb-32 md:pt-44 md:pb-40 overflow-hidden">
        <div className="absolute inset-0 checker-invert opacity-[0.04]" />
        <span
          aria-hidden="true"
          className="absolute -top-6 -left-6 md:left-4 font-badge text-[38vw] md:text-[20rem] text-cream/[0.035] leading-none select-none pointer-events-none"
        >
          1950
        </span>

        <div className="relative container-edge grid md:grid-cols-2 gap-16 items-center">
          <RevealStagger>
            <p className="font-display text-racing-red tracking-[0.3em] uppercase text-sm mb-3">
              Our Story
            </p>
            <h1 className="font-display text-5xl md:text-7xl uppercase text-cream mb-6">
              <SplitText>1950&apos;s Work Ethic. Modern-Day Results.</SplitText>
            </h1>
            <p className="text-cream/70 text-lg leading-relaxed">
              We&apos;re a Fort Worth window cleaning company built on old-school
              standards &mdash; the kind where a handshake meant something and a job
              wasn&apos;t done until it was actually done right.
            </p>
          </RevealStagger>
          <Reveal variant="wipe" delay={0.1} className="md:pl-6">
            <blockquote className="bg-racing-red text-cream font-display text-2xl md:text-4xl uppercase leading-tight p-8 md:p-10 rounded-sm border-l-8 border-cream shadow-2xl md:-rotate-2 md:translate-x-6">
              &ldquo;{SITE.tagline}&rdquo;
            </blockquote>
          </Reveal>
        </div>
      </section>

      <MarqueeTicker />
      <SectionDivider variant="invert" />

      <section className="bg-cream py-20 md:py-28 container-edge">
        <div className="grid md:grid-cols-5 gap-10 md:gap-16 items-center max-w-5xl mx-auto">
          <RevealStagger className="md:col-span-3">
            <span className="font-badge text-racing-red text-7xl md:text-9xl leading-none block">
              &ldquo;
            </span>
            <p className="text-asphalt text-xl md:text-3xl font-display uppercase leading-snug -mt-8 md:-mt-12">
              We are a 1950&apos;s based window cleaning company, we pride ourselves
              on quality workmanship. Our company branding is one of a kind &amp; we
              will not leave a customer&apos;s home until they are completely
              satisfied.
            </p>
          </RevealStagger>

          <RevealStagger className="md:col-span-2 flex md:flex-col gap-6 md:gap-10 justify-center md:border-l md:border-asphalt/10 md:pl-10">
            <div>
              <div className="font-display text-4xl md:text-5xl text-racing-red">
                <Counter value={5.0} decimals={1} />
              </div>
              <p className="text-asphalt/60 text-xs md:text-sm uppercase tracking-wide mt-1">
                Google Rating
              </p>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl text-racing-red">
                <Counter value={43} />
              </div>
              <p className="text-asphalt/60 text-xs md:text-sm uppercase tracking-wide mt-1">
                5-Star Reviews
              </p>
            </div>
            <div>
              <div className="font-display text-4xl md:text-5xl text-racing-red">
                <Counter value={services.length} />
              </div>
              <p className="text-asphalt/60 text-xs md:text-sm uppercase tracking-wide mt-1">
                Services Offered
              </p>
            </div>
          </RevealStagger>
        </div>
      </section>

      <SectionDivider variant="normal" />

      <section className="bg-asphalt py-20 md:py-28 container-edge">
        <RevealStagger className="max-w-2xl mx-auto text-center mb-14">
          <p className="font-display text-racing-red tracking-[0.3em] uppercase text-sm mb-3">
            Meet The Crew
          </p>
          <h2 className="font-display text-4xl md:text-6xl uppercase text-cream mb-6">
            <SplitText>The Team Behind Every Job</SplitText>
          </h2>
          <p className="text-cream/70 text-lg leading-relaxed">
            Customers keep mentioning the same thing: showing up on time, treating
            every home with care, and doing the job right the first time. Team lead
            Loren and the crew have earned that reputation review after review &mdash;
            &ldquo;Loren and his team were so thorough and professional,&rdquo; as one
            customer put it.
          </p>
        </RevealStagger>

        <RevealStagger className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {values.map((v, i) => (
            <div
              key={v.title}
              className={`bg-cream text-asphalt rounded-sm border-2 border-transparent hover:border-racing-red transition-colors duration-300 ${
                v.featured ? "sm:col-span-2 p-8 md:p-10 flex flex-col justify-center" : "p-6"
              }`}
            >
              <span
                className="inline-block animate-idle-float motion-reduce:animate-none mb-4"
                style={{ animationDelay: `${i * 0.25}s` }}
              >
                <v.icon size={v.featured ? 40 : 32} className="text-racing-red" />
              </span>
              <h3 className={`font-display uppercase tracking-wide mb-2 ${v.featured ? "text-2xl md:text-3xl" : "text-lg"}`}>
                <SplitText stagger={0.02}>{v.title}</SplitText>
              </h3>
              <p className={`text-asphalt/70 ${v.featured ? "text-base md:text-lg max-w-md" : "text-sm"}`}>
                {v.body}
              </p>
            </div>
          ))}
        </RevealStagger>
      </section>

      <SectionDivider variant="invert" />

      <section className="bg-racing-red py-16 md:py-20">
        <RevealStagger className="container-edge text-center">
          <h2 className="font-display text-3xl md:text-5xl uppercase text-cream mb-6">
            <SplitText>Let&apos;s Give Your Home the 1950&apos;s Treatment</SplitText>
          </h2>
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
