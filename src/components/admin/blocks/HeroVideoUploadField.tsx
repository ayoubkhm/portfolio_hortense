"use client";

// Upload field for the home page hero video. Wraps /api/settings/hero-video
// (the existing endpoint that stores the video path in a SiteSetting), so the
// video file lives outside the block data — preserving backwards compat with
// the original upload flow.

import { useState, useEffect, useRef, useCallback } from "react";

const DEFAULT_VIDEO = "/uploads/hero-video.mp4";

export default function HeroVideoUploadField() {
  const [videoPath, setVideoPath] = useState(DEFAULT_VIDEO);
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/settings/hero-video")
      .then((r) => r.json())
      .then((d) => {
        if (d.path) setVideoPath(d.path);
      })
      .catch(() => {});
  }, []);

  const handleFile = (f: File) => {
    if (!["video/mp4", "video/webm"].includes(f.type)) {
      setError("Formats acceptés : MP4, WebM.");
      return;
    }
    if (f.size > 50 * 1024 * 1024) {
      setError("Fichier trop volumineux (max 50 MB).");
      return;
    }
    setVideoFile(f);
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
    const f = e.dataTransfer.files[0];
    if (f) handleFile(f);
  }, []);

  const handleUpload = async () => {
    if (!videoFile) return;
    setIsUploading(true);
    setError("");
    setSuccess("");
    try {
      const formData = new FormData();
      formData.append("file", videoFile);
      const res = await fetch("/api/settings/hero-video", { method: "POST", body: formData });
      const d = await res.json();
      if (!res.ok) {
        setError(d.error || "Erreur lors de l'upload.");
        return;
      }
      setVideoPath(d.path);
      setSuccess("Vidéo mise à jour !");
      setVideoFile(null);
      if (inputRef.current) inputRef.current.value = "";
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Erreur de connexion.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-3">
      <p className="text-sm font-medium text-[#2C2C2C]">Vidéo de fond</p>
      <p className="text-xs text-[#6B6560]">
        Cette vidéo est partagée pour tous les blocs « Hero vidéo » du site (stockée séparément).
      </p>
      <video key={videoPath} controls muted className="w-full max-w-md rounded-lg border border-[#E8E0D4]">
        <source src={videoPath} />
      </video>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all max-w-md ${
          isDragging ? "border-[#C9A96E] bg-[#C9A96E]/5" : videoFile ? "border-[#8A9A7B] bg-[#8A9A7B]/5" : "border-[#E8E0D4] hover:border-[#C9A96E]"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="video/mp4,video/webm"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
          className="hidden"
        />
        {videoFile ? (
          <p className="text-[#2C2C2C] text-sm">
            {videoFile.name} ({(videoFile.size / 1024 / 1024).toFixed(1)} MB)
          </p>
        ) : (
          <p className="text-[#6B6560] text-sm">
            Glissez une vidéo ici ou cliquez — MP4/WebM, max 50 MB
          </p>
        )}
      </div>
      {error && <p className="text-red-600 text-sm">{error}</p>}
      {success && <p className="text-[#8A9A7B] text-sm">{success}</p>}
      {videoFile && (
        <button
          type="button"
          onClick={handleUpload}
          disabled={isUploading}
          className="bg-[#C9A96E] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#b8984f] disabled:opacity-50"
        >
          {isUploading ? "Upload en cours..." : "Remplacer la vidéo"}
        </button>
      )}
    </div>
  );
}
