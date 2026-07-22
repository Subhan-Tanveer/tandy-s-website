import Image from "next/image";
import Link from "next/link";
import { Phone, MapPin, ShieldCheck, Star } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";
import { FacebookIcon, InstagramIcon } from "./SocialIcons";
import RevealStagger from "./RevealStagger";

export default function Footer() {
  return (
    <footer className="relative bg-asphalt text-cream">
      <div className="h-3 checker" />
      <RevealStagger className="container-edge py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 mb-3">
            <Image
              src="/brand/tandys-logo.png"
              alt="Tandy's Window Services"
              width={56}
              height={56}
              className="h-12 w-12 md:h-14 md:w-14 shrink-0"
            />
            <div className="flex flex-col leading-none">
              <span className="font-badge text-4xl text-cream">TANDY&apos;S</span>
              <span
                className="font-badge text-2xl text-cream tracking-wide uppercase mt-0 origin-left w-fit block"
                style={{ transform: "scaleX(0.6637)" }}
              >
                Window Services
              </span>
            </div>
          </div>
          <p className="text-cream/70 max-w-sm mb-4">
            &ldquo;{SITE.tagline}&rdquo;
          </p>
          <div className="flex items-center gap-2 text-mustard font-display text-lg">
            <Star size={18} fill="currentColor" className="text-mustard" />
            {SITE.rating.toFixed(1)} stars &middot; {SITE.reviewCount} Google reviews
          </div>
          <div className="flex items-center gap-2 mt-2 text-cream/70">
            <ShieldCheck size={18} className="text-racing-red shrink-0" />
            Veteran discounts available
          </div>
        </div>

        <div>
          <h3 className="font-display text-xl uppercase tracking-wide text-racing-red mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="inline-block text-cream/80 hover:text-racing-red hover:translate-x-1 active:translate-x-0.5 transition-[color,transform] duration-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-xl uppercase tracking-wide text-racing-red mb-4">
            Get In Touch
          </h3>
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-2 text-cream/80 hover:text-racing-red hover:-translate-y-0.5 active:translate-y-0 transition-[color,transform] duration-300 mb-2 w-fit"
          >
            <Phone size={18} className="text-racing-red shrink-0" />
            {SITE.phone}
          </a>
          <div className="flex items-center gap-2 text-cream/80 mb-4">
            <MapPin size={18} className="text-racing-red shrink-0" />
            {SITE.city}
          </div>
          <div className="flex items-center gap-3">
            <a
              href={SITE.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tandy's Window Services on Facebook"
              className="p-2 rounded-full border border-cream/20 hover:border-racing-red hover:text-racing-red hover:-translate-y-0.5 active:scale-90 transition-[color,border-color,transform] duration-300"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Tandy's Window Services on Instagram"
              className="p-2 rounded-full border border-cream/20 hover:border-racing-red hover:text-racing-red hover:-translate-y-0.5 active:scale-90 transition-[color,border-color,transform] duration-300"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </RevealStagger>
      <div className="border-t border-cream/10 py-5">
        <div className="container-edge flex flex-col sm:flex-row justify-between gap-2 text-sm text-cream/50">
          <p>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <p>Fort Worth, TX &middot; Serving the surrounding area</p>
        </div>
      </div>
    </footer>
  );
}
