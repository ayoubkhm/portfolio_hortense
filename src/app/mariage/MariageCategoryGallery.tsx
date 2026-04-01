"use client";

import { useState, useCallback, useEffect, useRef } from "react";
import Image from "next/image";

interface CategoryData {
  title: string;
  cover: string;
  images: { src: string; alt: string }[];
}

const categories: CategoryData[] = [
  {
    title: "Préparatifs",
    cover: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80",
    images: [
      { src: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800&q=80", alt: "Préparatifs mariée" },
      { src: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=800&q=80", alt: "Maquillage mariée" },
      { src: "https://images.unsplash.com/photo-1595407753234-0882f1e77954?w=800&q=80", alt: "Robe de mariée" },
      { src: "https://images.unsplash.com/photo-1519657337289-077653f724ed?w=800&q=80", alt: "Détails préparatifs" },
      { src: "https://images.unsplash.com/photo-1594552072238-5765e9b3dcac?w=800&q=80", alt: "Chaussures mariée" },
      { src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800&q=80", alt: "Bouquet mariée" },
    ],
  },
  {
    title: "Photos de couple",
    cover: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
    images: [
      { src: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", alt: "Couple mariage" },
      { src: "https://images.unsplash.com/photo-1606800052052-a08af7148866?w=800&q=80", alt: "Couple au coucher de soleil" },
      { src: "https://images.unsplash.com/photo-1529636798458-92182e662485?w=800&q=80", alt: "Couple en promenade" },
      { src: "https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=800&q=80", alt: "Portrait couple" },
      { src: "https://images.unsplash.com/photo-1545232979-8bf68ee9b1af?w=800&q=80", alt: "Couple enlacé" },
      { src: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80", alt: "Couple romantique" },
      { src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=800&q=80", alt: "Couple main dans la main" },
      { src: "https://images.unsplash.com/photo-1591604129939-f1efa4d99f7e?w=800&q=80", alt: "Couple forêt" },
    ],
  },
  {
    title: "Cérémonie",
    cover: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80",
    images: [
      { src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", alt: "Cérémonie mariage" },
      { src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&q=80", alt: "Allée cérémonie" },
      { src: "https://images.unsplash.com/photo-1507504031003-b417219a0fde?w=800&q=80", alt: "Échange de voeux" },
      { src: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&q=80", alt: "Alliances" },
      { src: "https://images.unsplash.com/photo-1478146059778-26028b07395a?w=800&q=80", alt: "Sortie des mariés" },
      { src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80", alt: "Lieu de cérémonie" },
      { src: "https://images.unsplash.com/photo-1460978812857-470ed1c77af0?w=800&q=80", alt: "Cérémonie en plein air" },
    ],
  },
  {
    title: "Photos de groupe",
    cover: "https://images.unsplash.com/photo-1529543544282-ea99407407c1?w=800&q=80",
    images: [
      { src: "https://images.unsplash.com/photo-1529543544282-ea99407407c1?w=800&q=80", alt: "Photo de groupe mariage" },
      { src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?w=800&q=80", alt: "Famille mariés" },
      { src: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&q=80", alt: "Amis des mariés" },
      { src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=800&q=80", alt: "Groupe célébration" },
      { src: "https://images.unsplash.com/photo-1522057306606-8d84b0f4d7c5?w=800&q=80", alt: "Témoins et mariés" },
      { src: "https://images.unsplash.com/photo-1528495612343-9ca9f4a4de28?w=800&q=80", alt: "Lancé de bouquet" },
    ],
  },
  {
    title: "Cocktail",
    cover: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80",
    images: [
      { src: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80", alt: "Cocktail mariage" },
      { src: "https://images.unsplash.com/photo-1470338745628-171cf53de3a8?w=800&q=80", alt: "Verres de champagne" },
      { src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80", alt: "Décoration table" },
      { src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80", alt: "Fleurs table" },
      { src: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80", alt: "Repas mariage" },
      { src: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&q=80", alt: "Cocktail détails" },
      { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80", alt: "Apéritif mariage" },
    ],
  },
  {
    title: "Soirée",
    cover: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&q=80",
    images: [
      { src: "https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?w=800&q=80", alt: "Soirée dansante" },
      { src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80", alt: "Piste de danse" },
      { src: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80", alt: "Première danse" },
      { src: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&q=80", alt: "DJ mariage" },
      { src: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=800&q=80", alt: "Fête mariage" },
      { src: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80", alt: "Célébration soirée" },
    ],
  },
];

export default function MariageCategoryGallery() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const activeCategory = categories.find((c) => c.title === openCategory);
  const images = activeCategory?.images ?? [];

  const closePopover = useCallback(() => {
    setOpenCategory(null);
    setSelectedIndex(0);
  }, []);

  const goToImage = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setSelectedIndex(index);
      setTimeout(() => setIsTransitioning(false), 300);
    },
    [isTransitioning]
  );

  const nextImage = useCallback(() => {
    goToImage((selectedIndex + 1) % images.length);
  }, [selectedIndex, images.length, goToImage]);

  const prevImage = useCallback(() => {
    goToImage((selectedIndex - 1 + images.length) % images.length);
  }, [selectedIndex, images.length, goToImage]);

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

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (!openCategory) return;
      if (e.key === "Escape") closePopover();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [openCategory, closePopover, nextImage, prevImage]);

  useEffect(() => {
    document.body.style.overflow = openCategory ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [openCategory]);

  return (
    <>
      {/* Vignettes grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((cat, i) => (
          <button
            key={cat.title}
            onClick={() => {
              setOpenCategory(cat.title);
              setSelectedIndex(0);
            }}
            className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl"
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <Image
              src={cat.cover}
              alt={cat.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 group-hover:from-black/70" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <h3 className="font-serif text-xl text-white text-left tracking-wide">
                {cat.title}
              </h3>
              <p className="text-white/50 text-xs mt-1.5 text-left uppercase tracking-[0.2em]">
                {cat.images.length} photos
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Studio Modal */}
      {activeCategory && images.length > 0 && (
        <div className="fixed inset-0 z-50 studio-modal-enter">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/95 backdrop-blur-md"
            onClick={closePopover}
          />

          {/* Modal shell */}
          <div className="relative z-10 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between px-6 md:px-10 py-5">
              <div className="flex items-center gap-5">
                <h3 className="font-serif text-xl md:text-2xl text-white/90 tracking-wide">
                  {activeCategory.title}
                </h3>
                <div className="hidden sm:block h-4 w-px bg-white/20" />
                <span className="hidden sm:block text-white/30 text-xs uppercase tracking-[0.25em] font-sans">
                  {selectedIndex + 1} sur {images.length}
                </span>
              </div>
              <button
                onClick={closePopover}
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
                    className={`max-w-full max-h-full object-contain rounded-lg shadow-2xl transition-opacity duration-300 ${
                      isTransitioning ? "opacity-0" : "opacity-100"
                    }`}
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
      )}
    </>
  );
}
