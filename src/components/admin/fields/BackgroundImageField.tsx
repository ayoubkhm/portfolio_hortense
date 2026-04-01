"use client";

import { useState, useRef } from "react";

interface BackgroundImageFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  recommendedSize?: string;
}

export default function BackgroundImageField({
  label,
  value,
  onChange,
  recommendedSize = "1920 x 1080 px",
}: BackgroundImageFieldProps) {
  const [mode, setMode] = useState<"url" | "upload">(
    value.startsWith("/uploads") ? "upload" : "url"
  );
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp", "image/avif"];
    if (!allowedTypes.includes(file.type)) {
      setUploadError("Formats acceptés : JPEG, PNG, WebP, AVIF");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setUploadError("Fichier trop volumineux (max 10 MB)");
      return;
    }

    setIsUploading(true);
    setUploadError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("category", "mariage");
      formData.append("alt", "Image de fond");

      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        setUploadError(data.error || "Erreur lors de l'upload.");
        return;
      }

      onChange(data.media.filepath);
    } catch {
      setUploadError("Erreur de connexion.");
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="block text-sm font-medium text-[#2C2C2C]">{label}</label>
        <div className="flex rounded-lg border border-[#E8E0D4] overflow-hidden text-xs">
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-3 py-1.5 transition-colors ${
              mode === "url"
                ? "bg-[#2C2C2C] text-white"
                : "bg-white text-[#6B6560] hover:bg-[#FAF7F2]"
            }`}
          >
            URL
          </button>
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-3 py-1.5 transition-colors ${
              mode === "upload"
                ? "bg-[#2C2C2C] text-white"
                : "bg-white text-[#6B6560] hover:bg-[#FAF7F2]"
            }`}
          >
            Upload
          </button>
        </div>
      </div>

      <p className="text-xs text-[#6B6560]">
        Taille recommandée : <strong>{recommendedSize}</strong> — format paysage, haute résolution pour un rendu optimal.
      </p>

      {mode === "url" ? (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="https://images.unsplash.com/..."
          className="w-full px-3 py-2 rounded-lg border border-[#E8E0D4] bg-white text-[#2C2C2C] placeholder-[#6B6560]/50 focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent text-sm"
        />
      ) : (
        <div className="space-y-2">
          <div
            onClick={() => inputRef.current?.click()}
            className="border-2 border-dashed border-[#E8E0D4] rounded-lg p-4 text-center cursor-pointer hover:border-[#C9A96E] hover:bg-[#FAF7F2] transition-all"
          >
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/avif"
              onChange={handleFileChange}
              className="hidden"
            />
            {isUploading ? (
              <p className="text-[#6B6560] text-sm">Upload en cours...</p>
            ) : (
              <p className="text-[#6B6560] text-sm">
                Cliquez pour choisir une image — JPEG, PNG, WebP (max 10 MB)
              </p>
            )}
          </div>
          {uploadError && (
            <p className="text-red-600 text-xs">{uploadError}</p>
          )}
        </div>
      )}

      {/* Preview */}
      {value && (
        <div className="mt-2">
          <p className="text-xs text-[#6B6560] mb-1">Aperçu :</p>
          <div className="relative w-full max-w-md aspect-[16/9] rounded-lg overflow-hidden border border-[#E8E0D4] bg-[#FAF7F2]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={value}
              alt="Aperçu image de fond"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-xs text-[#6B6560]/60 mt-1 truncate max-w-md">{value}</p>
        </div>
      )}
    </div>
  );
}
