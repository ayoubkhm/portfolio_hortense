"use client";

import { useEffect, useState } from "react";

const DEFAULT_VIDEO = "/uploads/hero-video.mp4";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  subSubtitle?: string;
}

export default function HeroSection({
  title = "Hortense de Ruidiaz",
  subtitle = "Photographie et prises de vues aériennes par drone à Bordeaux",
  subSubtitle = "Pour les professionnels et les particuliers",
}: HeroSectionProps) {
  const [showChevron, setShowChevron] = useState(true);
  const [videoSrc, setVideoSrc] = useState(DEFAULT_VIDEO);

  useEffect(() => {
    const handleScroll = () => {
      setShowChevron(window.scrollY < 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetch("/api/settings/hero-video")
      .then((res) => res.json())
      .then((data) => {
        if (data.path) setVideoSrc(data.path);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        key={videoSrc}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/40" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 text-center">
        <h1 className="font-serif text-5xl font-bold text-white md:text-7xl">
          {title}
        </h1>

        <p className="mt-4 text-lg tracking-wide text-sand md:text-xl">
          {subtitle}
        </p>
        <p className="mt-2 text-base tracking-wide text-sand/80 md:text-lg">
          {subSubtitle}
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
