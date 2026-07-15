import type { Metadata } from "next";
import { Phone, MapPin, ShieldCheck, Star } from "lucide-react";
import { SITE } from "@/lib/site";
import RevealStagger from "@/components/RevealStagger";
import ScrollRevealGsap from "@/components/ScrollRevealGsap";
import QuoteForm from "@/components/QuoteForm";
import { FacebookIcon, InstagramIcon } from "@/components/SocialIcons";
import SectionDivider from "@/components/SectionDivider";
import MarqueeTicker from "@/components/MarqueeTicker";
import SplitText from "@/components/SplitText";
import BackgroundVideo from "@/components/BackgroundVideo";

export const metadata: Metadata = {
  title: "Contact & Free Quote — Fort Worth Window Cleaning",
  description:
    "Request a free quote from Tandy's Window Services in Fort Worth, TX. Call (469) 405-8713 or send your details and we'll get right back to you.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative bg-asphalt pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden">
        <BackgroundVideo src="/videos/contact-hero.mp4" className="opacity-40" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(18,17,16,0.55) 0%, rgba(18,17,16,0.92) 100%)" }}
        />
        <div className="absolute inset-0 checker-invert opacity-[0.04]" />
        <div className="relative container-edge text-center">
          <RevealStagger>
            <p className="font-display text-racing-red tracking-[0.3em] uppercase text-sm mb-3">
              Get In Touch
            </p>
            <h1 className="font-display text-5xl md:text-7xl uppercase text-cream mb-5">
              <SplitText>Request Your Free Quote</SplitText>
            </h1>
            <p className="text-cream/70 max-w-2xl mx-auto text-lg">
              Tell us about your property and what you need cleaned. We&apos;ll follow
              up with a straightforward quote &mdash; old-fashioned service starts
              with a real answer, not a runaround.
            </p>
          </RevealStagger>
        </div>
      </section>

      <MarqueeTicker />
      <SectionDivider variant="invert" />

      <section className="bg-cream py-20 md:py-28 container-edge">
        <div className="grid lg:grid-cols-5 gap-10 md:gap-16">
          <ScrollRevealGsap className="lg:col-span-3 bg-white/60 rounded-sm p-6 md:p-10 border-2 border-asphalt/10">
            <QuoteForm />
          </ScrollRevealGsap>

          <RevealStagger variant="pop" delay={0.1} className="lg:col-span-2 space-y-8">
            <div>
              <h2 className="font-display text-2xl uppercase tracking-wide mb-4">
                Contact Details
              </h2>
              <a
                href={SITE.phoneHref}
                className="group flex items-center gap-3 text-lg mb-3 w-fit hover:text-racing-red active:scale-95 transition-[color,transform] duration-300"
              >
                <Phone size={22} className="text-racing-red shrink-0 transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
                {SITE.phone}
              </a>
              <div className="flex items-center gap-3 text-lg mb-3">
                <MapPin size={22} className="text-racing-red shrink-0" />
                {SITE.city}
              </div>
              <div className="flex items-center gap-3 text-lg mb-4">
                <Star size={22} fill="#e2a530" className="text-mustard shrink-0" />
                {SITE.rating.toFixed(1)} stars &middot; {SITE.reviewCount} Google reviews
              </div>
              <div className="flex items-center gap-3 text-asphalt/70">
                <ShieldCheck size={20} className="text-racing-red shrink-0" />
                Veteran discounts available &mdash; just ask
              </div>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tandy's Window Services on Facebook"
                className="p-3 rounded-full border-2 border-asphalt/15 hover:border-racing-red hover:text-racing-red transition-colors duration-300"
              >
                <FacebookIcon className="w-5 h-5" />
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Tandy's Window Services on Instagram"
                className="p-3 rounded-full border-2 border-asphalt/15 hover:border-racing-red hover:text-racing-red transition-colors duration-300"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>
            </div>

            <div>
              <h2 className="font-display text-2xl uppercase tracking-wide mb-4">
                Service Area
              </h2>
              <div className="rounded-sm overflow-hidden border-2 border-asphalt/10 aspect-video">
                <iframe
                  title="Tandy's Window Services area map — Dallas-Fort Worth, TX"
                  src="https://www.google.com/maps?q=Dallas-Fort+Worth,+TX&z=9&output=embed"
                  className="w-full h-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </RevealStagger>
        </div>
      </section>
    </>
  );
}
