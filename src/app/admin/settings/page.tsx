"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export default function AdminSettingsPage() {
  const [videoPath, setVideoPath] = useState("/uploads/hero-video.mp4");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetch("/api/settings/hero-video")
      .then((res) => res.json())
      .then((data) => {
        if (data.path) setVideoPath(data.path);
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, []);

  const handleFile = (f: File) => {
    const allowedTypes = ["video/mp4", "video/webm"];
    if (!allowedTypes.includes(f.type)) {
      setError("Type non autorisé. Formats acceptés : MP4, WebM.");
      return;
    }
    if (f.size > 50 * 1024 * 1024) {
      setError("Fichier trop volumineux (max 50 MB).");
      return;
    }
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

    setIsUploading(true);
    setError("");
    setSuccess("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/settings/hero-video", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur lors de l'upload.");
        return;
      }

      setVideoPath(data.path);
      setSuccess("Vidéo d'accueil mise à jour avec succès !");
      setFile(null);
      if (inputRef.current) inputRef.current.value = "";
    } catch {
      setError("Erreur de connexion au serveur.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#2C2C2C]">
          Paramètres du site
        </h1>
        <p className="mt-1 text-[#6B6560]">
          Configurez les éléments principaux de votre site.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-[#E8E0D4] p-6">
        <h2 className="text-lg font-semibold text-[#2C2C2C] mb-4">
          Vidéo d&apos;accueil
        </h2>

        {/* Current video preview */}
        <div className="mb-6">
          <p className="text-sm font-medium text-[#2C2C2C] mb-2">
            Vidéo actuelle
          </p>
          {isLoading ? (
            <div className="w-full max-w-xl h-64 bg-[#FAF7F2] rounded-lg flex items-center justify-center">
              <p className="text-[#6B6560] text-sm">Chargement...</p>
            </div>
          ) : (
            <div className="max-w-xl">
              <video
                key={videoPath}
                controls
                muted
                className="w-full rounded-lg border border-[#E8E0D4]"
              >
                <source src={videoPath} />
              </video>
              <p className="text-xs text-[#6B6560] mt-2">
                Chemin : {videoPath}
              </p>
            </div>
          )}
        </div>

        {/* Upload form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <p className="text-sm font-medium text-[#2C2C2C]">
            Remplacer la vidéo
          </p>

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
              accept="video/mp4,video/webm"
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
                <svg
                  className="mx-auto h-12 w-12 text-[#6B6560]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 16v-8m0 0l-3 3m3-3l3 3M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5"
                  />
                </svg>
                <p className="mt-2 text-[#6B6560]">
                  Glissez une vidéo ici ou cliquez pour parcourir
                </p>
                <p className="text-xs text-[#6B6560]/60 mt-1">
                  Formats acceptés : MP4, WebM — Taille max : 50 MB
                </p>
              </div>
            )}
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
            className="px-6 py-2.5 rounded-lg bg-[#C9A96E] text-white font-medium hover:bg-[#b8984f] focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isUploading ? "Upload en cours..." : "Remplacer la vidéo"}
          </button>
        </form>
      </div>
    </div>
  );
}
