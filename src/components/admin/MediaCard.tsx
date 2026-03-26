"use client";

import { useState } from "react";
import Image from "next/image";

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

const CATEGORY_LABELS: Record<string, string> = {
  mariage: "Mariage",
  "drone-immobilier": "Immobilier",
  "drone-chantier": "Chantier",
  "drone-evenement": "Evenement",
};

interface MediaCardProps {
  media: Media;
  onDelete: (id: string) => void;
}

export default function MediaCard({ media, onDelete }: MediaCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const isVideo = media.mimetype.startsWith("video/");

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/media/${media.id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        onDelete(media.id);
      } else {
        const data = await res.json();
        alert(data.error || "Erreur lors de la suppression.");
      }
    } catch {
      alert("Erreur de connexion au serveur.");
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="group relative rounded-lg overflow-hidden border border-[#E8E0D4] bg-[#FAF7F2]">
      <div className="aspect-square relative">
        {isVideo ? (
          <video
            src={media.filepath}
            className="w-full h-full object-cover"
            muted
            playsInline
          />
        ) : (
          <Image
            src={media.filepath}
            alt={media.alt || media.filename}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
          />
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
          <button
            onClick={() => setShowConfirm(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            title="Supprimer"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-2">
        <p className="text-xs text-[#2C2C2C] truncate" title={media.filename}>
          {media.filename}
        </p>
        <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-[#C9A96E]/10 text-[#C9A96E] font-medium">
          {CATEGORY_LABELS[media.category] || media.category}
        </span>
      </div>

      {/* Confirmation dialog */}
      {showConfirm && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center p-4 z-10">
          <div className="bg-white rounded-lg p-4 w-full max-w-xs text-center">
            <p className="text-sm text-[#2C2C2C] mb-3">
              Supprimer ce media ?
            </p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isDeleting}
                className="px-3 py-1.5 text-sm rounded-lg bg-[#E8E0D4] text-[#2C2C2C] hover:bg-[#d8d0c4] transition-colors disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-3 py-1.5 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {isDeleting ? "..." : "Supprimer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
