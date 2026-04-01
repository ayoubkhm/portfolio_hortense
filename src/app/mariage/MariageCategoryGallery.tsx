"use client";

import { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { categories } from "./mariage-categories-data";
import MariageStudioModal from "./MariageStudioModal";

export default function MariageCategoryGallery() {
  const [openCategory, setOpenCategory] = useState<string | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const activeCategory = categories.find((c) => c.title === openCategory);
  const images = activeCategory?.images ?? [];

  const closePopover = useCallback(() => {
    setOpenCategory(null);
    setSelectedIndex(0);
  }, []);

  const nextImage = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation
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

  // Lock body scroll when modal is open
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
        <MariageStudioModal
          category={activeCategory}
          images={images}
          selectedIndex={selectedIndex}
          onClose={closePopover}
          onSelectIndex={setSelectedIndex}
        />
      )}
    </>
  );
}
