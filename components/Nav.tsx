"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Phone, Menu, X } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";
import MagneticButton from "./MagneticButton";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const solid = scrolled || open;
  // Only the homepage hero has the checkered strip riding the very top edge
  // of the viewport, so only it needs the extra top clearance in the nav.
  const isHome = pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,backdrop-filter,box-shadow] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        solid
          ? "bg-asphalt/95 backdrop-blur-sm shadow-[0_2px_0_0_var(--color-racing-red)]"
          : "bg-transparent"
      }`}
    >
      <div
        className={`container-edge flex items-center justify-between transition-[padding] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isHome
            ? solid
              ? "pt-7 pb-3"
              : "pt-10 pb-4"
            : solid
              ? "py-2"
              : "py-4"
        }`}
      >
        <Link href="/" className="flex items-center gap-2 group" aria-label="Tandy's Window Services home">
          <Image
            src="/brand/tandys-logo.png"
            alt="Tandy's Window Services"
            width={56}
            height={56}
            priority
            className="h-12 w-12 md:h-14 md:w-14 rounded-full transition-transform duration-300 group-hover:scale-105"
          />
          <span className="hidden sm:flex flex-col leading-none">
            <span className="font-badge text-xl md:text-2xl tracking-wide text-cream group-hover:text-racing-red transition-colors duration-300">
              TANDY&apos;S
            </span>
            <span className="font-display text-xs md:text-sm text-racing-red tracking-[0.2em] uppercase mt-1">
              Window Services
            </span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`group/link relative font-display text-lg tracking-wide uppercase transition-colors duration-300 ${
                pathname === link.href
                  ? "text-racing-red"
                  : "text-cream hover:text-racing-red"
              }`}
            >
              {link.label}
              <span
                className={`absolute left-0 -bottom-1 h-[2px] w-full bg-racing-red origin-center transition-transform duration-300 ease-out ${
                  pathname === link.href
                    ? "scale-x-100"
                    : "scale-x-0 group-hover/link:scale-x-100"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-2 text-cream font-display text-lg tracking-wide hover:text-racing-red active:scale-95 transition-[color,transform] duration-300"
          >
            <Phone size={18} className="text-racing-red" />
            {SITE.phone}
          </a>
          <MagneticButton
            href="/contact"
            className="bg-racing-red text-cream font-display tracking-wide uppercase text-lg px-5 py-2.5 rounded-sm hover:bg-cream hover:text-racing-red border-2 border-racing-red active:scale-95"
          >
            Free Quote
          </MagneticButton>
        </div>

        <button
          className="md:hidden text-cream p-2 active:scale-90 transition-transform duration-200"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          open ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="container-edge flex flex-col gap-1 pb-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-display text-2xl tracking-wide uppercase py-2 border-b border-cream/10 active:translate-x-1 transition-transform duration-150 ${
                pathname === link.href ? "text-racing-red" : "text-cream"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-2 text-cream font-display text-xl tracking-wide py-3 active:scale-95 transition-transform duration-150"
          >
            <Phone size={20} className="text-racing-red" />
            {SITE.phone}
          </a>
          <Link
            href="/contact"
            className="bg-racing-red text-cream font-display tracking-wide uppercase text-xl px-5 py-3 rounded-sm text-center mt-2 active:scale-95 transition-transform duration-150"
          >
            Free Quote
          </Link>
        </nav>
      </div>
    </header>
  );
}
