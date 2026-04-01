"use client";

import { useState, useRef, useCallback } from "react";
import { PARENT_CATEGORIES, SUB_CATEGORIES } from "@/lib/categories";

const NEW_SUBCATEGORY_VALUE = "__new__";

interface MediaUploaderProps {
  onUpload: () => void;
}

export default function MediaUploader({ onUpload }: MediaUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [parentCategory, setParentCategory] = useState("mariage");
  const [subCategory, setSubCategory] = useState("");
  const [isNewSub, setIsNewSub] = useState(false);
  const [newSubName, setNewSubName] = useState("");
  const [alt, setAlt] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setError("");
    setSuccess("");
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFile(droppedFile);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) handleFile(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setError("Veuillez sélectionner un fichier.");
      return;
    }

    // Build category string: "mariage" or "mariage/preparatifs"
    let actualSub = isNewSub ? newSubName.trim() : subCategory;
    // Strip any non-alphanumeric/dash/space characters (including accented letters)
    actualSub = actualSub.replace(/[^a-zA-ZÀ-ÿ0-9\s-]/g, "");
    const category = actualSub
      ? `${parentCategory}/${actualSub.toLowerCase().replace(/\s+/g, "-")}`
      : parentCategory;

    setIsUploading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", category);
      if (alt.trim()) formData.append("alt", alt.trim());

      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur lors de l'upload.");
        return;
      }

      setSuccess("Média ajouté avec succès !");
      setFile(null);
      setAlt("");
      setSubCategory("");
      setIsNewSub(false);
      setNewSubName("");
      if (inputRef.current) inputRef.current.value = "";
      onUpload();
    } catch {
      setError("Erreur de connexion au serveur.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-[#E8E0D4] p-6">
      <h2 className="text-lg font-semibold text-[#2C2C2C] mb-4">
        Ajouter un média
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
            isDragging
              ? "border-[#C9A96E] bg-[#C9A96E]/5"
              : file
              ? "border-[#8A9A7B] bg-[#8A9A7B]/5"
              : "border-[#E8E0D4] hover:border-[#C9A96E] hover:bg-[#FAF7F2]"
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif,video/mp4,video/webm"
            onChange={handleInputChange}
            className="hidden"
          />
          {file ? (
            <div>
              <p className="text-[#2C2C2C] font-medium">{file.name}</p>
              <p className="text-sm text-[#6B6560] mt-1">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          ) : (
            <div>
              <svg className="mx-auto h-12 w-12 text-[#6B6560]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 16v-8m0 0l-3 3m3-3l3 3M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5" />
              </svg>
              <p className="mt-2 text-[#6B6560]">
                Glissez un fichier ici ou cliquez pour parcourir
              </p>
              <p className="text-xs text-[#6B6560]/60 mt-1">
                JPEG, PNG, WebP, AVIF, MP4, WebM (max 50MB)
              </p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label htmlFor="parent-category" className="block text-sm font-medium text-[#2C2C2C] mb-1">
              Catégorie
            </label>
            <select
              id="parent-category"
              value={parentCategory}
              onChange={(e) => {
                setParentCategory(e.target.value);
                setSubCategory("");
                setIsNewSub(false);
                setNewSubName("");
              }}
              className="w-full px-3 py-2 rounded-lg border border-[#E8E0D4] bg-white text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
            >
              {PARENT_CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="sub-category" className="block text-sm font-medium text-[#2C2C2C] mb-1">
              Sous-catégorie <span className="text-[#6B6560] text-xs font-normal">(optionnel)</span>
            </label>
            <select
              id="sub-category"
              value={isNewSub ? NEW_SUBCATEGORY_VALUE : subCategory}
              onChange={(e) => {
                if (e.target.value === NEW_SUBCATEGORY_VALUE) {
                  setIsNewSub(true);
                  setSubCategory("");
                } else {
                  setIsNewSub(false);
                  setNewSubName("");
                  setSubCategory(e.target.value);
                }
              }}
              className="w-full px-3 py-2 rounded-lg border border-[#E8E0D4] bg-white text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
            >
              <option value="">— Aucune —</option>
              {(SUB_CATEGORIES[parentCategory] || []).map((sub) => (
                <option key={sub.value} value={sub.value}>
                  {sub.label}
                </option>
              ))}
              <option value={NEW_SUBCATEGORY_VALUE}>+ Créer une nouvelle...</option>
            </select>
            {isNewSub && (
              <input
                type="text"
                value={newSubName}
                onChange={(e) => setNewSubName(e.target.value)}
                placeholder="Nom de la nouvelle sous-catégorie"
                className="w-full mt-2 px-3 py-2 rounded-lg border border-[#C9A96E] bg-[#FAF7F2] text-[#2C2C2C] placeholder-[#6B6560]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent text-sm"
                autoFocus
              />
            )}
          </div>
          <div>
            <label htmlFor="alt" className="block text-sm font-medium text-[#2C2C2C] mb-1">
              Texte alternatif
            </label>
            <input
              id="alt"
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Description de l'image"
              className="w-full px-3 py-2 rounded-lg border border-[#E8E0D4] bg-white text-[#2C2C2C] placeholder-[#6B6560]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="p-3 rounded-lg bg-[#8A9A7B]/10 border border-[#8A9A7B]/30 text-[#8A9A7B] text-sm">
            {success}
          </div>
        )}

        <button
          type="submit"
          disabled={isUploading || !file}
          className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-[#C9A96E] text-white font-medium hover:bg-[#b8984f] focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? "Upload en cours..." : "Ajouter le média"}
        </button>
      </form>
    </div>
  );
}
