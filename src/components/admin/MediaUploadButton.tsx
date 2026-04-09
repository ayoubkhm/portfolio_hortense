"use client";

// Single source of truth for the "click to upload an image/video" button
// pattern. Replaces 4+ near-identical implementations spread across the
// admin (mariage gallery, drone gallery thumbnail, drone gallery video, etc.).
//
// Usage:
//   <MediaUploadButton accept="image" category="mariage" alt="Couverture"
//     onUploaded={(path) => setImage(path)} />
//
//   <MediaUploadButton accept="video" category="drone" label="Remplacer la vidéo"
//     size="md" onUploaded={(path) => setVideo(path)} />

import { useState, useRef, type ReactNode } from "react";

const MIME_TYPES: Record<MediaKind, string[]> = {
  image: ["image/jpeg", "image/png", "image/webp", "image/avif"],
  video: ["video/mp4", "video/webm"],
  pdf: ["application/pdf"],
};
const MAX_SIZES: Record<MediaKind, number> = {
  image: 10 * 1024 * 1024, // 10 MB
  video: 50 * 1024 * 1024, // 50 MB
  pdf: 20 * 1024 * 1024,   // 20 MB
};
const FRIENDLY_FORMATS: Record<MediaKind, string> = {
  image: "JPEG, PNG, WebP, AVIF",
  video: "MP4, WebM",
  pdf: "PDF",
};

type MediaKind = "image" | "video" | "pdf";

interface MediaUploadButtonProps {
  accept: MediaKind;
  category: string;
  alt?: string;
  onUploaded: (filepath: string) => void;
  /** Custom label, or function (uploading) => ReactNode for dynamic labels. */
  label?: ReactNode | ((uploading: boolean) => ReactNode);
  className?: string;
  variant?: "outlined" | "solid";
  size?: "sm" | "md";
  /** Hide the icon (text-only button) */
  noIcon?: boolean;
}

export default function MediaUploadButton({
  accept,
  category,
  alt = "",
  onUploaded,
  label,
  className = "",
  variant = "outlined",
  size = "md",
  noIcon = false,
}: MediaUploadButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const allowedTypes = MIME_TYPES[accept];
  const maxSize = MAX_SIZES[accept];
  const acceptAttr = allowedTypes.join(",");

  const handleFile = async (file: File) => {
    if (!allowedTypes.includes(file.type)) {
      setError(`Format non accepté. Acceptés : ${FRIENDLY_FORMATS[accept]}`);
      return;
    }
    if (file.size > maxSize) {
      setError(`Fichier trop volumineux (max ${maxSize / 1024 / 1024} MB)`);
      return;
    }
    setError("");
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("category", category);
      fd.append("alt", alt);
      const res = await fetch("/api/media", { method: "POST", body: fd });
      const data = await res.json();
      if (res.ok) onUploaded(data.media.filepath);
      else setError(data.error || "Erreur lors de l'upload.");
    } catch {
      setError("Erreur de connexion.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const defaultLabel = uploading
    ? "Upload en cours…"
    : accept === "image"
    ? "Uploader une image"
    : accept === "pdf"
    ? "Uploader un PDF"
    : "Uploader la vidéo";

  const labelContent =
    typeof label === "function" ? label(uploading) : label ?? defaultLabel;

  const sizing = size === "sm" ? "px-3 py-1.5 text-xs" : "px-4 py-2 text-sm";
  const visual =
    variant === "solid"
      ? "bg-[#C9A96E] text-white hover:bg-[#b8984f]"
      : "border border-[#C9A96E] text-[#C9A96E] hover:bg-[#C9A96E]/10";

  const iconClasses = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";

  const uploadIcon = (
    <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
    </svg>
  );
  const videoIcon = (
    <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  );
  const pdfIcon = (
    <svg className={iconClasses} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  );
  const icon = noIcon ? null : accept === "pdf" ? pdfIcon : accept === "video" ? videoIcon : uploadIcon;

  return (
    <div className="space-y-1">
      <input
        ref={inputRef}
        type="file"
        accept={acceptAttr}
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFile(f);
        }}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className={`inline-flex items-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${sizing} ${visual} ${className}`}
      >
        {icon}
        {labelContent}
      </button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
