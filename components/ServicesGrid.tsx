import { services } from "@/lib/services";
import RevealStagger from "./RevealStagger";
import ServiceCard from "./ServiceCard";
import SplitText from "./SplitText";

// Bento pattern: featured cards (index 0 and 5) span two columns, breaking
// the grid up into an asymmetric rhythm instead of a flat repeated template.
const FEATURED_INDICES = new Set([0, 5]);

export default function ServicesGrid() {
  return (
    <section className="relative bg-cream py-24 md:py-32 container-edge">
      <RevealStagger variant="wipe" className="max-w-2xl mx-auto text-center mb-16">
        <p className="font-display text-racing-red tracking-[0.3em] uppercase text-sm mb-3">
          What We Do
        </p>
        <h2 className="font-display text-4xl md:text-6xl uppercase">
          <SplitText>
            {`${services.length} Services.`} <span className="text-racing-red">Zero Shortcuts.</span>
          </SplitText>
        </h2>
      </RevealStagger>

      <RevealStagger variant="pop" stagger={0.06} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((service, i) => {
          const featured = FEATURED_INDICES.has(i);
          return (
            <div
              key={service.slug}
              className={featured ? "sm:col-span-2" : ""}
            >
              <ServiceCard service={service} index={i} featured={featured} />
            </div>
          );
        })}
      </RevealStagger>
    </section>
  );
}
