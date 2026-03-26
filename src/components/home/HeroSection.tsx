"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [showChevron, setShowChevron] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowChevron(window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80"
        alt="Photo de mariage"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className="font-serif text-5xl font-bold text-white md:text-7xl">
          Hortense de Ruidiaz
        </h1>

        <p className="mt-4 text-lg tracking-wide text-sand md:text-xl">
          Photographe &amp; Opératrice Drone — Bordeaux
        </p>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <a
            href="/mariage"
            className="inline-block rounded-full bg-gold px-8 py-3 text-sm font-semibold uppercase tracking-widest text-white transition-all duration-300 hover:bg-gold/80 hover:shadow-lg"
          >
            Mariage
          </a>
          <a
            href="/drone"
            className="inline-block rounded-full border-2 border-gold bg-transparent px-8 py-3 text-sm font-semibold uppercase tracking-widest text-gold transition-all duration-300 hover:bg-gold hover:text-white"
          >
            Drone
          </a>
        </div>
      </div>

      <div
        className={`absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transition-opacity duration-500 ${
          showChevron ? "opacity-100" : "opacity-0"
        }`}
      >
        <a
          href="#about"
          aria-label="Défiler vers le bas"
          className="flex flex-col items-center gap-1 text-white/80 transition-colors hover:text-white"
        >
          <span className="text-xs uppercase tracking-widest">Découvrir</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="h-6 w-6 animate-bounce"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
