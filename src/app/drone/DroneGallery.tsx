"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { getPlaceholders, PlaceholderImage } from "@/lib/placeholders";

interface DroneItem extends PlaceholderImage {
  video?: string; // URL de la vidéo courte (~30s) — à fournir par Hortense
}

// Combine all drone images and associate videos when available
function getDroneItems(): DroneItem[] {
  const immobilier = getPlaceholders("drone-immobilier");
  const chantier = getPlaceholders("drone-chantier");
  const evenement = getPlaceholders("drone-evenement");
  const all = [...immobilier, ...chantier, ...evenement];
  // Associer la vidéo d'exemple à la première image — à remplacer quand Hortense fournira les vidéos individuelles
  if (all.length > 0) {
    all[0] = { ...all[0], video: "/uploads/hero-video.mp4" };
  }
  return all;
}

export default function DroneGallery() {
  const items = getDroneItems();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selected = selectedIndex !== null ? items[selectedIndex] : null;

  const close = useCallback(() => setSelectedIndex(null), []);

  const next = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev + 1) % items.length : null
    );
  }, [items.length]);

  const prev = useCallback(() => {
    setSelectedIndex((prev) =>
      prev !== null ? (prev - 1 + items.length) % items.length : null
    );
  }, [items.length]);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [selectedIndex, close, next, prev]);

  useEffect(() => {
    document.body.style.overflow = selectedIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  return (
    <>
      {/* Masonry grid */}
      <div className="masonry-grid">
        {items.map((img, idx) => (
          <button
            key={img.src}
            onClick={() => setSelectedIndex(idx)}
            className="masonry-grid-item group w-full text-left"
          >
            <div className="relative overflow-hidden rounded-lg cursor-pointer">
              <Image
                src={img.src}
                alt={img.alt}
                width={800}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                {/* Play icon on hover */}
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex h-14 w-14 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border border-white/30">
                  <svg className="h-6 w-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          </button>
        ))}

        {items.length === 0 && (
          <p className="text-center text-warmgray py-12">
            Aucune image pour le moment.
          </p>
        )}
      </div>

      {/* Studio Modal with video */}
      {selected && selectedIndex !== null && (
        <div className="fixed inset-0 z-50 studio-modal-enter">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            onClick={close}
          />

          {/* Modal shell */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-10 py-5">
              <div className="flex items-center gap-5">
                <h3 className="font-serif text-xl md:text-2xl text-white/90 tracking-wide">
                  {selected.alt}
                </h3>
                <div className="hidden sm:block h-4 w-px bg-white/20" />
                <span className="hidden sm:block text-white/30 text-xs uppercase tracking-[0.25em] font-sans">
                  {selectedIndex + 1} sur {items.length}
                </span>
              </div>
              <button
                onClick={close}
                className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300"
              >
                <span className="text-xs uppercase tracking-[0.15em] hidden sm:inline">Fermer</span>
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Video area */}
            <div className="relative flex-1 min-h-0 flex items-center justify-center px-4 md:px-20">
              {/* Prev */}
              <button
                onClick={prev}
                className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                aria-label="Précédent"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
                {selected.video ? (
                  /* Real video player */
                  <div className="w-full aspect-video rounded-lg overflow-hidden shadow-2xl bg-black">
                    <video
                      key={selected.video}
                      controls
                      autoPlay
                      muted
                      playsInline
                      className="w-full h-full object-contain"
                    >
                      <source src={selected.video} type="video/mp4" />
                    </video>
                  </div>
                ) : (
                  /* Placeholder — image with "video coming soon" overlay */
                  <div className="relative w-full rounded-lg overflow-hidden shadow-2xl" style={{ maxHeight: "60vh" }}>
                    <Image
                      src={selected.src}
                      alt={selected.alt}
                      width={1200}
                      height={800}
                      className="w-full h-auto object-contain"
                      sizes="(max-width: 1280px) 85vw, 1000px"
                      priority
                    />
                    <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center gap-4">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
                        <svg className="h-9 w-9 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="text-white/70 text-sm font-sans tracking-wide">
                        Vidéo bientôt disponible
                      </p>
                    </div>
                  </div>
                )}

                {/* Caption */}
                <p className="mt-4 text-white/30 text-sm font-sans tracking-wide text-center">
                  {selected.alt}
                </p>
              </div>

              {/* Next */}
              <button
                onClick={next}
                className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
                aria-label="Suivant"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Thumbnail strip */}
            <div className="py-4 md:py-5 px-4 md:px-10">
              <div className="flex gap-2.5 overflow-x-auto scrollbar-hide justify-center">
                {items.map((img, idx) => (
                  <button
                    key={img.src}
                    onClick={() => setSelectedIndex(idx)}
                    className={`relative shrink-0 rounded-lg overflow-hidden transition-all duration-300 ${
                      idx === selectedIndex
                        ? "w-24 h-16 md:w-28 md:h-[4.5rem] ring-2 ring-gold/80 ring-offset-2 ring-offset-black opacity-100 scale-105"
                        : "w-20 h-14 md:w-24 md:h-16 opacity-30 hover:opacity-60 hover:scale-[1.02]"
                    }`}
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="112px"
                    />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
