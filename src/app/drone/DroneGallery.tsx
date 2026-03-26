"use client";

import { useState } from "react";
import Image from "next/image";
import CategoryTabs from "@/components/gallery/CategoryTabs";
import { getPlaceholders, PlaceholderImage } from "@/lib/placeholders";

const categories = [
  { label: "Immobilier", value: "drone-immobilier" },
  { label: "Chantier", value: "drone-chantier" },
  { label: "Événements", value: "drone-evenement" },
];

export default function DroneGallery() {
  const [activeCategory, setActiveCategory] = useState(categories[0].value);
  const images: PlaceholderImage[] = getPlaceholders(activeCategory);

  return (
    <div>
      <CategoryTabs
        categories={categories}
        activeCategory={activeCategory}
        onChange={(value) => setActiveCategory(value)}
      />

      {/* Masonry grid */}
      <div className="masonry-grid mt-8">
        {images.map((img) => (
          <div key={img.src} className="masonry-grid-item group">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src={img.src}
                alt={img.alt}
                width={800}
                height={600}
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
            </div>
          </div>
        ))}
      </div>

      {images.length === 0 && (
        <p className="text-center text-warmgray py-12">
          Aucune image dans cette catégorie pour le moment.
        </p>
      )}
    </div>
  );
}