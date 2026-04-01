import Image from "next/image";
import { useRef, useEffect } from "react";
import type { CategoryData } from "./mariage-categories-data";

interface MariageStudioModalProps {
  category: CategoryData;
  images: { src: string; alt: string }[];
  selectedIndex: number;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export default function MariageStudioModal({
  category,
  images,
  selectedIndex,
  onClose,
  onSelectIndex,
}: MariageStudioModalProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const isTransitioningRef = useRef(false);

  // Scroll active thumbnail into view
  useEffect(() => {
    if (!carouselRef.current) return;
    const active = carouselRef.current.children[selectedIndex] as HTMLElement;
    if (active) {
      active.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  }, [selectedIndex]);

  const goToImage = (index: number) => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    onSelectIndex(index);
    setTimeout(() => {
      isTransitioningRef.current = false;
    }, 300);
  };

  const prevImage = () => {
    goToImage((selectedIndex - 1 + images.length) % images.length);
  };

  const nextImage = () => {
    goToImage((selectedIndex + 1) % images.length);
  };

  return (
    <div className="fixed inset-0 z-50 studio-modal-enter">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/95 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal shell */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between px-6 md:px-10 py-5">
          <div className="flex items-center gap-5">
            <h3 className="font-serif text-xl md:text-2xl text-white/90 tracking-wide">
              {category.title}
            </h3>
            <div className="hidden sm:block h-4 w-px bg-white/20" />
            <span className="hidden sm:block text-white/30 text-xs uppercase tracking-[0.25em] font-sans">
              {selectedIndex + 1} sur {images.length}
            </span>
          </div>
          <button
            onClick={onClose}
            className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300"
          >
            <span className="text-xs uppercase tracking-[0.15em] hidden sm:inline">Fermer</span>
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Main image area */}
        <div className="relative flex-1 min-h-0 flex items-center justify-center px-4 md:px-20">
          {/* Prev */}
          <button
            onClick={prevImage}
            className="absolute left-3 md:left-8 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
            aria-label="Image précédente"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Image container with crossfade */}
          <div className="relative w-full max-w-4xl mx-auto flex flex-col items-center">
            <div className="relative w-full flex items-center justify-center" style={{ height: "min(58vh, 600px)" }}>
              <Image
                key={images[selectedIndex].src}
                src={images[selectedIndex].src}
                alt={images[selectedIndex].alt}
                width={1200}
                height={800}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-opacity duration-300"
                sizes="(max-width: 1280px) 85vw, 1000px"
                priority
              />
            </div>

            {/* Caption */}
            <p className="mt-4 text-white/30 text-sm font-sans tracking-wide text-center">
              {images[selectedIndex].alt}
            </p>

            {/* Progress bar */}
            <div className="mt-3 flex gap-1.5 justify-center">
              {images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToImage(idx)}
                  className="group/dot p-1"
                  aria-label={`Photo ${idx + 1}`}
                >
                  <div
                    className={`h-0.5 rounded-full transition-all duration-500 ${
                      idx === selectedIndex
                        ? "w-8 bg-gold"
                        : "w-3 bg-white/15 group-hover/dot:bg-white/30"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Next */}
          <button
            onClick={nextImage}
            className="absolute right-3 md:right-8 top-1/2 -translate-y-1/2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 border border-white/10 text-white/50 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all duration-300 backdrop-blur-sm"
            aria-label="Image suivante"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Thumbnail carousel */}
        <div className="py-4 md:py-5 px-4 md:px-10">
          <div
            ref={carouselRef}
            className="flex gap-2.5 overflow-x-auto scrollbar-hide justify-center"
          >
            {images.map((img, idx) => (
              <button
                key={img.src}
                onClick={() => goToImage(idx)}
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
                {idx === selectedIndex && (
                  <div className="absolute inset-0 border-2 border-gold/30 rounded-lg" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
