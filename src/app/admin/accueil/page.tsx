"use client";

import { useState, useEffect } from "react";
import type { HomepageContent } from "@/lib/content";
import TextField from "@/components/admin/fields/TextField";
import TextAreaField from "@/components/admin/fields/TextAreaField";
import ParagraphsField from "@/components/admin/fields/ParagraphsField";

export default function AdminAccueilPage() {
  const [data, setData] = useState<HomepageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/content/content_homepage")
      .then((res) => res.json())
      .then((d) => setData(d))
      .catch(() => setError("Erreur lors du chargement."))
      .finally(() => setIsLoading(false));
  }, []);

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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-[#2C2C2C]">Page d&apos;accueil</h1>
          <p className="mt-1 text-[#6B6560]">Gérez le contenu de la page d&apos;accueil.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#C9A96E] text-white px-6 py-2.5 rounded-lg hover:bg-[#b8984f] transition-all disabled:opacity-50 font-medium"
        >
          {isSaving ? "Sauvegarde..." : "Sauvegarder"}
        </button>
      </div>

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
        {data.services.map((service, i) => (
          <div key={i} className="p-4 rounded-lg border border-[#E8E0D4] bg-[#FAF7F2] space-y-3">
            <p className="text-sm font-medium text-[#6B6560]">Service {i + 1}</p>
            <TextField label="Titre" value={service.title} onChange={(v) => updateService(i, "title", v)} />
            <TextAreaField label="Description" value={service.description} onChange={(v) => updateService(i, "description", v)} />
            <TextField label="Image (URL)" value={service.imageSrc} onChange={(v) => updateService(i, "imageSrc", v)} />
          </div>
        ))}
      </div>
    </div>
  );
}
