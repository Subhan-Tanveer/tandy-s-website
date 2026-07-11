import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { services } from "@/lib/services";
import { SITE } from "@/lib/site";
import ServiceIcon from "@/components/ServiceIcon";
import Reveal from "@/components/Reveal";
import MagneticButton from "@/components/MagneticButton";
import SectionDivider from "@/components/SectionDivider";
import MarqueeTicker from "@/components/MarqueeTicker";
import SplitText from "@/components/SplitText";

export const metadata: Metadata = {
  title: "Window, Gutter & Solar Panel Cleaning Services",
  description:
    "Interior & exterior window cleaning, track & skylight cleaning, screen cleaning, gutter cleaning & flush, solar panel cleaning, power washing, light fixture & high dusting, glass railing, vent hood, and roof wash in Fort Worth, TX.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative bg-asphalt pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden">
        <div className="absolute inset-0 checker-invert opacity-[0.04]" />
        <div className="relative container-edge text-center">
          <Reveal variant="rise">
            <p className="font-display text-racing-red tracking-[0.3em] uppercase text-sm mb-3">
              What We Do
            </p>
            <h1 className="font-display text-5xl md:text-7xl uppercase text-cream mb-5">
              <SplitText>Our Services</SplitText>
            </h1>
            <p className="text-cream/70 max-w-2xl mx-auto text-lg">
              {services.length}{" "}
              services, one standard: old-fashioned craftsmanship on every job,
              every time. Take a look at what we do &mdash; then request a free quote.
            </p>
          </Reveal>
        </div>
      </section>

      <MarqueeTicker />
      <SectionDivider variant="invert" />

      <section className="bg-cream">
        {services.map((service, i) => (
          <div
            key={service.slug}
            id={service.slug}
            className={`container-edge py-16 md:py-20 grid md:grid-cols-2 gap-10 md:gap-16 items-center scroll-mt-24 ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            } ${i !== services.length - 1 ? "border-b border-asphalt/10" : ""}`}
          >
            <Reveal variant={i % 2 === 0 ? "rise" : "wipe"}>
              <div className="bg-asphalt text-cream rounded-sm p-10 md:p-14 flex items-center justify-center">
                <ServiceIcon name={service.icon} size={96} className="text-racing-red" />
              </div>
            </Reveal>
            <Reveal variant={i % 2 === 0 ? "wipe" : "rise"} delay={0.05}>
              <p className="font-display text-racing-red tracking-[0.2em] uppercase text-sm mb-2">
                Service {String(i + 1).padStart(2, "0")}
              </p>
              <h2 className="font-display text-3xl md:text-5xl uppercase mb-4">
                <SplitText>{service.title}</SplitText>
              </h2>
              <p className="text-asphalt/75 text-lg leading-relaxed mb-6">
                {service.long}
              </p>
              <MagneticButton
                href="/contact"
                className="bg-racing-red text-cream font-display tracking-wide uppercase px-6 py-3 rounded-sm border-2 border-racing-red hover:bg-transparent hover:text-racing-red"
              >
                Get a Quote
              </MagneticButton>
            </Reveal>
          </div>
        ))}
      </section>

      <SectionDivider variant="normal" />

      <section className="bg-racing-red py-16 md:py-20">
        <div className="container-edge flex flex-col md:flex-row items-center justify-center gap-6 text-center">
          <Reveal variant="pop">
            <h2 className="font-display text-3xl md:text-5xl uppercase text-cream mb-4">
              <SplitText>Ready to see the Tandy&apos;s difference?</SplitText>
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <MagneticButton
                href="/contact"
                className="bg-asphalt text-cream font-display text-xl tracking-wide uppercase px-8 py-4 rounded-sm border-2 border-asphalt hover:bg-transparent hover:text-asphalt"
              >
                Request a Free Quote
              </MagneticButton>
              <a
                href={SITE.phoneHref}
                className="group flex items-center gap-2 text-cream font-display text-xl tracking-wide uppercase hover:text-asphalt active:scale-95 transition-[color,transform] duration-300"
              >
                <Phone size={22} className="transition-transform duration-300 group-hover:-rotate-12 group-hover:scale-110" />
                {SITE.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
