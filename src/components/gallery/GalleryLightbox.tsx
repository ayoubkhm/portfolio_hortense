"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { useGallery } from "./GalleryContext";

interface GalleryLightboxProps {
  images: { src: string; alt: string }[];
}

export default function GalleryLightbox({ images }: GalleryLightboxProps) {
  const { isOpen, currentIndex, closeLightbox, next, prev, setTotal } =
    useGallery();

  useEffect(() => {
    setTotal(images.length);
  }, [images.length, setTotal]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      switch (e.key) {
        case "ArrowLeft":
          prev();
          break;
        case "ArrowRight":
          next();
          break;
        case "Escape":
          closeLightbox();
          break;
      }
    },
    [isOpen, prev, next, closeLightbox]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen || images.length === 0) return null;

  const currentImage = images[currentIndex];
  if (!currentImage) return null;

  return (
    <div
      className="lightbox-overlay fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={closeLightbox}
    >
      <button
        onClick={closeLightbox}
        className="absolute top-4 right-4 z-50 text-white hover:text-gold transition-colors duration-200"
        aria-label="Fermer"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); prev(); }}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:text-gold transition-colors duration-200"
          aria-label="Image précédente"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      <div
        className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={currentImage.src}
          alt={currentImage.alt}
          width={1200}
          height={800}
          className="max-w-full max-h-[85vh] object-contain"
          sizes="(max-width: 1280px) 100vw, 1280px"
          priority
        />
      </div>

      {images.length > 1 && (
        <button
          onClick={(e) => { e.stopPropagation(); next(); }}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:text-gold transition-colors duration-200"
          aria-label="Image suivante"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/70 text-sm font-sans">
        {currentIndex + 1} / {images.length}
      </div>
    </div>
  );
}
