"use client";

import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

interface MariageStudioModalProps {
  category: { title: string; images: { src: string; alt: string }[] };
  images: { src: string; alt: string }[];
  onClose: () => void;
}

/**
 * Category modal: vertical-scroll masonry of every image in the category,
 * with a click-to-enlarge lightbox. Replaced the previous one-big-image +
 * thumbnail-carousel flow because Hortense wanted to see an overview of her
 * work per category rather than browsing photo-by-photo.
 */
export default function MariageStudioModal({
  category,
  images,
  onClose,
}: MariageStudioModalProps) {
  // null = masonry view; number = that image is enlarged in the lightbox.
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const prevLightbox = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);
  const nextLightbox = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  // Keyboard: ESC closes lightbox first, otherwise the modal. Arrows navigate
  // the lightbox when it's open.
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (lightboxIndex !== null) closeLightbox();
        else onClose();
      } else if (lightboxIndex !== null) {
        if (e.key === "ArrowRight") nextLightbox();
        if (e.key === "ArrowLeft") prevLightbox();
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [lightboxIndex, onClose, closeLightbox, prevLightbox, nextLightbox]);

  // Lock body scroll while the modal is open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const thumb = (src: string, w: number) =>
    src.startsWith("/uploads/") ? `/api/thumb?src=${encodeURIComponent(src)}&w=${w}` : src;

  const lightbox = lightboxIndex !== null ? images[lightboxIndex] : null;

  return (
    <div className="fixed inset-0 z-50 studio-modal-enter">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />

      {/* Modal shell — fills the viewport; the masonry scrolls inside */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 md:px-10 py-5 shrink-0">
          <div className="flex items-center gap-5">
            <h3 className="font-serif text-xl md:text-2xl text-white/90 tracking-wide">
              {category.title}
            </h3>
            <div className="hidden sm:block h-4 w-px bg-white/20" />
            <span className="hidden sm:block text-white/30 text-xs uppercase tracking-[0.25em] font-sans">
              {images.length} photos
            </span>
          </div>
          <button
            onClick={onClose}
            className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300"
          >
            <span className="text-xs uppercase tracking-[0.15em] hidden sm:inline">Fermer</span>
            <svg
              className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Masonry — CSS columns preserve each image's natural aspect ratio.
            break-inside-avoid keeps photos from splitting across columns.
            Capped at 4 columns max (Hortense's call) and wrapped in max-w-6xl
            so images stay at a comfortable size on large screens. */}
        <div className="flex-1 min-h-0 overflow-y-auto px-4 md:px-10 pb-10">
          <div className="max-w-6xl mx-auto columns-2 sm:columns-3 md:columns-4 gap-2">
            {images.map((img, idx) => (
              <button
                key={img.src}
                onClick={() => setLightboxIndex(idx)}
                className="mb-2 block w-full break-inside-avoid overflow-hidden rounded-md bg-white/5 group"
                aria-label={`Agrandir : ${img.alt}`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={thumb(img.src, 800)}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox overlay — rendered on top of the masonry when an image is clicked */}
      {lightbox && lightboxIndex !== null && (
        <div
          className="absolute inset-0 z-20 flex flex-col bg-black/95 backdrop-blur-md"
          onClick={closeLightbox}
        >
          {/* Lightbox header */}
          <div className="flex items-center justify-between px-6 md:px-10 py-5 shrink-0">
            <span className="text-white/30 text-xs uppercase tracking-[0.25em] font-sans">
              {lightboxIndex + 1} sur {images.length}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300"
            >
              <span className="text-xs uppercase tracking-[0.15em] hidden sm:inline">Retour</span>
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Big image + prev/next */}
          <div
            className="relative flex-1 min-h-0 flex items-center justify-center px-4 md:px-20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={prevLightbox}
              className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
              aria-label="Image précédente"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="relative w-full max-w-5xl mx-auto flex flex-col items-center">
              <div className="relative w-full flex items-center justify-center" style={{ height: "min(72vh, 800px)" }}>
                <Image
                  key={lightbox.src}
                  src={lightbox.src}
                  alt={lightbox.alt}
                  width={1600}
                  height={1100}
                  className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                  sizes="(max-width: 1280px) 90vw, 1200px"
                  priority
                />
              </div>
              <p className="mt-4 text-white/30 text-sm font-sans tracking-wide text-center">
                {lightbox.alt}
              </p>
            </div>

            <button
              onClick={nextLightbox}
              className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
              aria-label="Image suivante"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
