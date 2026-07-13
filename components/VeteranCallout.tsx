import { ShieldCheck } from "lucide-react";
import RevealStagger from "./RevealStagger";
import SplitText from "./SplitText";

export default function VeteranCallout() {
  return (
    <section className="relative bg-racing-red py-14 md:py-16 overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-3 checker-invert" />
      <div className="absolute bottom-0 inset-x-0 h-3 checker-invert" />
      <RevealStagger
        stagger={0.15}
        className="container-edge flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-center"
      >
        <span className="inline-block animate-idle-float motion-reduce:animate-none shrink-0">
          <ShieldCheck size={44} className="text-cream" />
        </span>
        <div>
          <h2 className="font-display text-2xl md:text-4xl uppercase text-cream">
            <SplitText>Veteran Discount Available</SplitText>
          </h2>
          <p className="text-cream/85 mt-1">
            A small thank-you from our family business to yours. Ask about it when you request your quote.
          </p>
        </div>
      </RevealStagger>
    </section>
  );
}
