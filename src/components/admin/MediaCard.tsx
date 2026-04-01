"use client";

import { useState } from "react";
import Image from "next/image";
import type { Media } from "@/types";

const PARENT_CATEGORIES = [
  { value: "mariage", label: "Mariage" },
  { value: "drone", label: "Drone" },
  { value: "autre", label: "Autre" },
];

const SUB_CATEGORIES: Record<string, { value: string; label: string }[]> = {
  mariage: [
    { value: "preparatifs", label: "Préparatifs" },
    { value: "photos-de-couple", label: "Photos de couple" },
    { value: "ceremonie", label: "Cérémonie" },
    { value: "photos-de-groupe", label: "Photos de groupe" },
    { value: "cocktail", label: "Cocktail" },
    { value: "soiree", label: "Soirée" },
    { value: "video", label: "Vidéo" },
  ],
  drone: [
    { value: "immobilier", label: "Immobilier" },
    { value: "architecture", label: "Architecture" },
    { value: "chantier", label: "Suivi de chantier" },
    { value: "evenement", label: "Événement" },
    { value: "paysage", label: "Paysage" },
    { value: "sport", label: "Sport" },
  ],
  autre: [
    { value: "portrait", label: "Portrait" },
    { value: "video", label: "Vidéo" },
    { value: "document", label: "Document" },
  ],
};

function formatCategory(category: string): string {
  const parts = category.split("/");
  const labels: Record<string, string> = { mariage: "Mariage", drone: "Drone", autre: "Autre" };
  const parent = labels[parts[0]] || parts[0];
  if (parts.length > 1) {
    const sub = parts[1].replace(/-/g, " ").replace(/^\w/, (c) => c.toUpperCase());
    return `${parent} · ${sub}`;
  }
  return parent;
}

function parseCategory(category: string) {
  const parts = category.split("/");
  return { parent: parts[0] || "mariage", sub: parts[1] || "" };
}

interface MediaCardProps {
  media: Media;
  onDelete: (id: string) => void;
  onUpdate?: (id: string, updated: Partial<Media>) => void;
}

export default function MediaCard({ media, onDelete, onUpdate }: MediaCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const parsed = parseCategory(media.category);
  const [editParent, setEditParent] = useState(parsed.parent);
  const [editSub, setEditSub] = useState(parsed.sub);
  const [editAlt, setEditAlt] = useState(media.alt);

  const isVideo = media.mimetype.startsWith("video/");

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/media/${media.id}`, { method: "DELETE" });
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

  const handleSaveEdit = async () => {
    setIsSaving(true);
    const newCategory = editSub ? `${editParent}/${editSub}` : editParent;
    try {
      const res = await fetch(`/api/media/${media.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: newCategory, alt: editAlt }),
      });
      if (res.ok) {
        const data = await res.json();
        onUpdate?.(media.id, data.media);
        setShowEdit(false);
      } else {
        const data = await res.json();
        alert(data.error || "Erreur.");
      }
    } catch {
      alert("Erreur de connexion.");
    } finally {
      setIsSaving(false);
    }
  };

  const openEdit = () => {
    const p = parseCategory(media.category);
    setEditParent(p.parent);
    setEditSub(p.sub);
    setEditAlt(media.alt);
    setShowEdit(true);
  };

  return (
    <div className="group relative rounded-lg overflow-hidden border border-[#E8E0D4] bg-[#FAF7F2]">
      <div className="aspect-square relative">
        {isVideo ? (
          <div className="relative w-full h-full">
            <video src={media.filepath} className="w-full h-full object-cover" muted playsInline />
            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 text-white text-[10px] font-medium px-2 py-1 rounded">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
              Vidéo
            </div>
          </div>
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
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center gap-2">
          <button
            onClick={openEdit}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-white hover:bg-[#FAF7F2] text-[#2C2C2C] rounded-lg"
            title="Modifier"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
            </svg>
          </button>
          <button
            onClick={() => setShowConfirm(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
            title="Supprimer"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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
          {formatCategory(media.category)}
        </span>
      </div>

      {/* Edit panel */}
      {showEdit && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center p-3 z-10">
          <div className="bg-white rounded-lg p-4 w-full max-w-xs space-y-3">
            <p className="text-sm font-semibold text-[#2C2C2C]">Modifier</p>

            <div>
              <label className="text-xs font-medium text-[#6B6560] mb-1 block">Catégorie</label>
              <select
                value={editParent}
                onChange={(e) => { setEditParent(e.target.value); setEditSub(""); }}
                className="w-full px-2 py-1.5 text-sm rounded border border-[#E8E0D4] focus:ring-1 focus:ring-[#C9A96E] focus:outline-none"
              >
                {PARENT_CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value}>{c.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-[#6B6560] mb-1 block">Sous-catégorie</label>
              <select
                value={editSub}
                onChange={(e) => setEditSub(e.target.value)}
                className="w-full px-2 py-1.5 text-sm rounded border border-[#E8E0D4] focus:ring-1 focus:ring-[#C9A96E] focus:outline-none"
              >
                <option value="">— Aucune —</option>
                {(SUB_CATEGORIES[editParent] || []).map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-[#6B6560] mb-1 block">Texte alternatif</label>
              <input
                type="text"
                value={editAlt}
                onChange={(e) => setEditAlt(e.target.value)}
                className="w-full px-2 py-1.5 text-sm rounded border border-[#E8E0D4] focus:ring-1 focus:ring-[#C9A96E] focus:outline-none"
                placeholder="Description du média"
              />
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setShowEdit(false)}
                className="flex-1 px-3 py-1.5 text-sm rounded-lg bg-[#E8E0D4] text-[#2C2C2C] hover:bg-[#d8d0c4]"
              >
                Annuler
              </button>
              <button
                onClick={handleSaveEdit}
                disabled={isSaving}
                className="flex-1 px-3 py-1.5 text-sm rounded-lg bg-[#C9A96E] text-white hover:bg-[#b8984f] disabled:opacity-50"
              >
                {isSaving ? "..." : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {showConfirm && (
        <div className="absolute inset-0 bg-black/70 flex items-center justify-center p-4 z-10">
          <div className="bg-white rounded-lg p-4 w-full max-w-xs text-center">
            <p className="text-sm text-[#2C2C2C] mb-3">Supprimer ce média ?</p>
            <div className="flex gap-2 justify-center">
              <button
                onClick={() => setShowConfirm(false)}
                disabled={isDeleting}
                className="px-3 py-1.5 text-sm rounded-lg bg-[#E8E0D4] text-[#2C2C2C] hover:bg-[#d8d0c4] disabled:opacity-50"
              >
                Annuler
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="px-3 py-1.5 text-sm rounded-lg bg-red-600 text-white hover:bg-red-700 disabled:opacity-50"
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
