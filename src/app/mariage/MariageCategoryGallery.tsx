"use client";

import { useState, useEffect } from "react";
import MariageStudioModal from "./MariageStudioModal";

interface CategoryImage {
  src: string;
  alt: string;
}

interface Category {
  title: string;
  images: CategoryImage[];
}

export default function MariageCategoryGallery() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/content/content_mariage_gallery")
      .then((r) => r.json())
      .then((data) => {
        if (data.categories) setCategories(data.categories);
      })
      .catch(() => {});
  }, []);

  const activeCategory = categories.find((c) => c.title === openCategory);
  const images = activeCategory?.images ?? [];

  if (categories.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories
          .filter((cat) => cat.images.length > 0)
          .map((cat, i) => {
            // Cover = first image, served as a resized thumbnail for quality
            const coverSrc = cat.images[0].src;
            const cover = coverSrc.startsWith("/uploads/")
              ? `/api/thumb?src=${encodeURIComponent(coverSrc)}&w=800`
              : coverSrc;
            return (
              <button
                key={cat.title}
                onClick={() => setOpenCategory(cat.title)}
                className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-xl"
                style={{ animationDelay: `${i * 50}ms` }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cover}
                  alt={cat.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
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
            );
          })}
      </div>

      {activeCategory && images.length > 0 && (
        <MariageStudioModal
          category={activeCategory}
          images={images}
          onClose={() => setOpenCategory(null)}
        />
      )}
    </>
  );
}
