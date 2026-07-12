"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import ServiceIcon from "./ServiceIcon";
import type { Service } from "@/lib/services";

export default function ServiceCard({
  service,
  index = 0,
  featured = false,
}: {
  service: Service;
  index?: number;
  featured?: boolean;
}) {
  const cardRef = useRef<HTMLAnchorElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const card = cardRef.current;
    const icon = iconRef.current;
    if (!card || !icon) return;

    const mm = gsap.matchMedia();

    mm.add("(pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const rotateX = gsap.quickTo(card, "rotationX", { duration: 0.4, ease: "power3" });
      const rotateY = gsap.quickTo(card, "rotationY", { duration: 0.4, ease: "power3" });
      const lift = gsap.quickTo(card, "y", { duration: 0.4, ease: "power3" });

      gsap.set(card, { transformPerspective: 700, transformOrigin: "center" });

      const onMove = (e: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        rotateY(px * 14);
        rotateX(py * -14);
      };

      const onEnter = () => {
        lift(-6);
        gsap.to(icon, { rotate: -12, scale: 1.15, duration: 0.35, ease: "back.out(2)" });
      };

      const onLeave = () => {
        rotateX(0);
        rotateY(0);
        lift(0);
        gsap.to(icon, { rotate: 0, scale: 1, duration: 0.4, ease: "power3.out" });
      };

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mouseleave", onLeave);

      return () => {
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <Link
      ref={cardRef}
      href={`/services#${service.slug}`}
      className={`group relative bg-asphalt text-cream rounded-sm border-2 border-transparent hover:border-racing-red active:scale-[0.97] transition-[border-color,transform] duration-300 overflow-hidden will-change-transform h-full flex flex-col justify-center ${
        featured ? "p-8 md:p-10" : "p-6"
      }`}
    >
      {service.image ? (
        <>
          <Image
            src={service.image}
            alt={service.title}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover opacity-40 group-hover:opacity-55 transition-opacity duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/70 to-asphalt/20" />
        </>
      ) : (
        <div
          className={`absolute -right-6 -top-6 rounded-full bg-racing-red/10 group-hover:bg-racing-red/25 transition-colors duration-500 ${
            featured ? "w-36 h-36" : "w-24 h-24"
          }`}
        />
      )}
      <div ref={iconRef} className="mb-4 relative z-10 inline-block will-change-transform">
        <span
          className="inline-block animate-idle-float motion-reduce:animate-none"
          style={{ animationDelay: `${(index % 4) * 0.3}s` }}
        >
          <ServiceIcon
            name={service.icon}
            size={featured ? 44 : 32}
            className="text-racing-red"
          />
        </span>
      </div>
      <h3
        className={`font-display uppercase tracking-wide mb-2 relative z-10 ${
          featured ? "text-2xl md:text-3xl" : "text-xl"
        }`}
      >
        {service.title}
      </h3>
      <p className={`text-cream/60 relative z-10 ${featured ? "text-base md:text-lg max-w-md" : "text-sm"}`}>
        {featured ? service.long : service.short}
      </p>
    </Link>
  );
}
