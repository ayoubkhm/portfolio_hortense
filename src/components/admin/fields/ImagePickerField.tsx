"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface ImagePickerFieldProps {
  label: string;
  value: string;
  onChange: (path: string) => void;
  category?: string;
}

export default function ImagePickerField({
  label,
  value,
  onChange,
  category,
}: ImagePickerFieldProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);
      if (category) formData.append("category", category);

      const res = await fetch("/api/media", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur lors de l'upload.");
        return;
      }

      onChange(data.filepath || data.path || data.url);
    } catch {
      setError("Erreur de connexion au serveur.");
    } finally {
      setIsUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
        {label}
      </label>
      <div className="flex items-start gap-4">
        {/* Image preview */}
        <div className="w-32 h-32 rounded-lg border border-[#E8E0D4] bg-[#FAF7F2] overflow-hidden flex items-center justify-center flex-shrink-0">
          {value ? (
            <Image
              src={value}
              alt={label}
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          ) : (
            <svg className="w-10 h-10 text-[#6B6560]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
            </svg>
          )}
        </div>

        {/* Controls */}
        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isUploading}
            className="px-4 py-2 text-sm rounded-lg bg-[#C9A96E] text-white hover:bg-[#b8984f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? "Upload en cours..." : "Changer l'image"}
          </button>
          {value && (
            <p className="text-xs text-[#6B6560] break-all max-w-[200px]">
              {value}
            </p>
          )}
          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}
        </div>
      </div>
    </div>
  );
}
