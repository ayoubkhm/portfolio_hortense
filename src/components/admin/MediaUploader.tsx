"use client";

import { useState, useRef, useCallback } from "react";

const CATEGORIES = [
  { value: "mariage", label: "Mariage" },
  { value: "drone-immobilier", label: "Drone Immobilier" },
  { value: "drone-chantier", label: "Drone Chantier" },
  { value: "drone-evenement", label: "Drone Evenement" },
];

interface MediaUploaderProps {
  onUpload: () => void;
}

export default function MediaUploader({ onUpload }: MediaUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [category, setCategory] = useState(CATEGORIES[0].value);
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
      setError("Veuillez selectionner un fichier.");
      return;
    }

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

      setSuccess("Media ajoute avec succes !");
      setFile(null);
      setAlt("");
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
        Ajouter un media
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

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-[#2C2C2C] mb-1">
              Categorie
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-[#E8E0D4] bg-white text-[#2C2C2C] focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
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
          {isUploading ? "Upload en cours..." : "Ajouter le media"}
        </button>
      </form>
    </div>
  );
}
