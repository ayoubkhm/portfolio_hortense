"use client";

import { useState, useEffect, useCallback } from "react";
import MediaCard from "./MediaCard";

interface Media {
  id: string;
  filename: string;
  filepath: string;
  mimetype: string;
  category: string;
  alt: string;
  sortOrder: number;
  featured: boolean;
  createdAt: string;
}

const CATEGORY_TABS = [
  { value: "", label: "Tous" },
  { value: "mariage", label: "Mariage" },
  { value: "drone-immobilier", label: "Drone Immobilier" },
  { value: "drone-chantier", label: "Drone Chantier" },
  { value: "drone-evenement", label: "Drone Evenement" },
];

interface MediaGridProps {
  refreshKey: number;
}

export default function MediaGrid({ refreshKey }: MediaGridProps) {
  const [media, setMedia] = useState<Media[]>([]);
  const [activeCategory, setActiveCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchMedia = useCallback(async () => {
    setIsLoading(true);
    try {
      const url = activeCategory
        ? `/api/media?category=${encodeURIComponent(activeCategory)}`
        : "/api/media";
      const res = await fetch(url);
      const data = await res.json();
      if (res.ok) {
        setMedia(data.media);
      }
    } catch (err) {
      console.error("Failed to fetch media:", err);
    } finally {
      setIsLoading(false);
    }
  }, [activeCategory]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia, refreshKey]);

  const handleDelete = (id: string) => {
    setMedia((prev) => prev.filter((m) => m.id !== id));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#E8E0D4] p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h2 className="text-lg font-semibold text-[#2C2C2C]">
          Galerie ({media.length})
        </h2>
        <div className="flex flex-wrap gap-2">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveCategory(tab.value)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                activeCategory === tab.value
                  ? "bg-[#C9A96E] text-white"
                  : "bg-[#FAF7F2] text-[#6B6560] hover:bg-[#E8E0D4]"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin h-8 w-8 border-2 border-[#C9A96E] border-t-transparent rounded-full" />
        </div>
      ) : media.length === 0 ? (
        <div className="text-center py-12">
          <svg className="mx-auto h-12 w-12 text-[#E8E0D4]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
          </svg>
          <p className="mt-2 text-[#6B6560]">Aucun media dans cette categorie</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {media.map((item) => (
            <MediaCard key={item.id} media={item} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
