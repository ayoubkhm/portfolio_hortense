"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { HomepageContent } from "@/lib/content";
import TextField from "@/components/admin/fields/TextField";
import TextAreaField from "@/components/admin/fields/TextAreaField";
import ParagraphsField from "@/components/admin/fields/ParagraphsField";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default function AdminAccueilPage() {
  const [data, setData] = useState<HomepageContent | null>(null);
  const [previousData, setPreviousData] = useState<HomepageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Hero video state
  const [videoPath, setVideoPath] = useState("/uploads/hero-video.mp4");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploadingVideo, setIsUploadingVideo] = useState(false);
  const [videoSuccess, setVideoSuccess] = useState("");
  const [videoError, setVideoError] = useState("");
  const videoInputRef = useRef<HTMLInputElement>(null);

  // Service page images (synced from mariage/drone hero backgrounds)
  const [serviceImages, setServiceImages] = useState<Record<string, string>>({});

  useEffect(() => {
    Promise.all([
      fetch("/api/content/content_homepage").then((r) => r.json()),
      fetch("/api/settings/hero-video").then((r) => r.json()),
      fetch("/api/content/content_mariage").then((r) => r.json()),
      fetch("/api/content/content_drone").then((r) => r.json()),
    ])
      .then(([content, video, mariage, drone]) => {
        setData(content);
        if (video.path) setVideoPath(video.path);
        setServiceImages({
          "/mariage": mariage.heroBackgroundImage || "",
          "/drone": drone.heroBackgroundImage || "",
        });
      })
      .catch(() => setError("Erreur lors du chargement."))
      .finally(() => setIsLoading(false));
  }, []);

  const handleVideoFile = (f: File) => {
    if (!["video/mp4", "video/webm"].includes(f.type)) {
      setVideoError("Formats acceptés : MP4, WebM.");
      return;
    }
    if (f.size > 50 * 1024 * 1024) {
      setVideoError("Fichier trop volumineux (max 50 MB).");
      return;
    }
    setVideoFile(f);
    setVideoError("");
    setVideoSuccess("");
  };

  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); }, []);
  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) handleVideoFile(f);
  }, []);

  const handleVideoUpload = async () => {
    if (!videoFile) return;
    setIsUploadingVideo(true);
    setVideoError("");
    setVideoSuccess("");
    try {
      const formData = new FormData();
      formData.append("file", videoFile);
      const res = await fetch("/api/settings/hero-video", { method: "POST", body: formData });
      const d = await res.json();
      if (!res.ok) { setVideoError(d.error || "Erreur."); return; }
      setVideoPath(d.path);
      setVideoSuccess("Vidéo mise à jour !");
      setVideoFile(null);
      if (videoInputRef.current) videoInputRef.current.value = "";
      setTimeout(() => setVideoSuccess(""), 3000);
    } catch { setVideoError("Erreur de connexion."); }
    finally { setIsUploadingVideo(false); }
  };

  const handleSave = async () => {
    if (!data) return;
    setIsSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch("/api/content/content_homepage", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setPreviousData(JSON.parse(JSON.stringify(data)));
      setSuccess("Contenu sauvegardé avec succès !");
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Erreur lors de la sauvegarde.");
    } finally {
      setIsSaving(false);
    }
  };

  const update = <K extends keyof HomepageContent>(key: K, value: HomepageContent[K]) => {
    setData((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const handleRevert = () => {
    if (previousData) {
      setData(JSON.parse(JSON.stringify(previousData)));
      setPreviousData(null);
    }
  };

  const updateService = (index: number, field: string, value: string) => {
    if (!data) return;
    const services = [...data.services];
    services[index] = { ...services[index], [field]: value };
    update("services", services);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#6B6560]">Chargement...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
        Impossible de charger le contenu.
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Page d'accueil"
        subtitle="Gérez le contenu de la page d'accueil."
        previewHref="/"
        isSaving={isSaving}
        onSave={handleSave}
        onRevert={previousData ? handleRevert : null}
      />

      {success && (
        <div className="p-3 rounded-lg bg-[#8A9A7B]/10 border border-[#8A9A7B]/30 text-[#8A9A7B] text-sm">
          {success}
        </div>
      )}
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Hero */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E0D4] p-6 space-y-4">
        <h2 className="text-lg font-semibold text-[#2C2C2C]">Hero</h2>
        <TextField label="Titre principal" value={data.heroTitle} onChange={(v) => update("heroTitle", v)} />
        <TextField label="Sous-titre" value={data.heroSubtitle} onChange={(v) => update("heroSubtitle", v)} />
        <TextField label="Sous-sous-titre" value={data.heroSubSubtitle} onChange={(v) => update("heroSubSubtitle", v)} />

        {/* Hero video */}
        <div className="pt-4 border-t border-[#E8E0D4] space-y-3">
          <p className="text-sm font-medium text-[#2C2C2C]">Vidéo de fond</p>
          <video key={videoPath} controls muted className="w-full max-w-md rounded-lg border border-[#E8E0D4]">
            <source src={videoPath} />
          </video>
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => videoInputRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all max-w-md ${
              isDragging ? "border-[#C9A96E] bg-[#C9A96E]/5" : videoFile ? "border-[#8A9A7B] bg-[#8A9A7B]/5" : "border-[#E8E0D4] hover:border-[#C9A96E]"
            }`}
          >
            <input ref={videoInputRef} type="file" accept="video/mp4,video/webm" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleVideoFile(f); }} className="hidden" />
            {videoFile ? (
              <p className="text-[#2C2C2C] text-sm">{videoFile.name} ({(videoFile.size / 1024 / 1024).toFixed(1)} MB)</p>
            ) : (
              <p className="text-[#6B6560] text-sm">Glissez une vidéo ici ou cliquez — MP4/WebM, max 50 MB</p>
            )}
          </div>
          {videoError && <p className="text-red-600 text-sm">{videoError}</p>}
          {videoSuccess && <p className="text-[#8A9A7B] text-sm">{videoSuccess}</p>}
          {videoFile && (
            <button
              onClick={handleVideoUpload}
              disabled={isUploadingVideo}
              className="bg-[#C9A96E] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#b8984f] disabled:opacity-50"
            >
              {isUploadingVideo ? "Upload..." : "Remplacer la vidéo"}
            </button>
          )}
        </div>
      </div>

      {/* A propos */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E0D4] p-6 space-y-4">
        <h2 className="text-lg font-semibold text-[#2C2C2C]">À propos</h2>
        <TextField label="Titre de la section" value={data.aboutHeading} onChange={(v) => update("aboutHeading", v)} />
        <ParagraphsField label="Paragraphes" value={data.aboutParagraphs} onChange={(v) => update("aboutParagraphs", v)} />
        <TextField label="Image portrait (chemin)" value={data.aboutPortraitImage} onChange={(v) => update("aboutPortraitImage", v)} placeholder="/uploads/hortense-portrait.jpg" />
        {data.aboutPortraitImage && (
          <div className="mt-2">
            <p className="text-xs text-[#6B6560] mb-1">Aperçu :</p>
            <img src={data.aboutPortraitImage} alt="Portrait" className="w-32 h-32 object-cover rounded-lg border border-[#E8E0D4]" />
          </div>
        )}
      </div>

      {/* Services */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E0D4] p-6 space-y-4">
        <h2 className="text-lg font-semibold text-[#2C2C2C]">Services</h2>
        <TextField label="Titre de la section" value={data.servicesHeading} onChange={(v) => update("servicesHeading", v)} />
        {data.services.map((service, i) => {
          const pageLink = service.href === "/mariage" ? "/admin/mariage" : service.href === "/drone" ? "/admin/drone" : "#";
          const pageName = service.href === "/mariage" ? "Mariage" : service.href === "/drone" ? "Drone" : "la page";
          return (
            <div key={i} className="p-4 rounded-lg border border-[#E8E0D4] bg-[#FAF7F2] space-y-3">
              <p className="text-sm font-medium text-[#6B6560]">Service {i + 1}</p>
              <TextField label="Titre" value={service.title} onChange={(v) => updateService(i, "title", v)} />
              <TextAreaField label="Description" value={service.description} onChange={(v) => updateService(i, "description", v)} />
              {/* Image preview (read-only, synced from the service page hero) */}
              <div>
                <p className="text-sm font-medium text-[#2C2C2C] mb-1">Image du service</p>
                {(serviceImages[service.href] || service.imageSrc) && (
                  <div className="relative w-full max-w-sm aspect-[16/9] rounded-lg overflow-hidden border border-[#E8E0D4] bg-[#FAF7F2] mb-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={serviceImages[service.href] || service.imageSrc} alt={service.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <p className="text-xs text-[#6B6560]">
                  Cette image correspond à l&apos;image de fond de la page {pageName}.{" "}
                  <a href={pageLink} className="text-[#C9A96E] hover:underline font-medium">
                    Modifier dans {pageName} →
                  </a>
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
