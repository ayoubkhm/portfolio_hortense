"use client";

import { useState, useEffect } from "react";
import type { DroneContent } from "@/lib/content";
import TextField from "@/components/admin/fields/TextField";
import TextAreaField from "@/components/admin/fields/TextAreaField";
import ParagraphsField from "@/components/admin/fields/ParagraphsField";

export default function AdminDronePage() {
  const [data, setData] = useState<DroneContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/content/content_drone")
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
      const res = await fetch("/api/content/content_drone", {
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

  const update = <K extends keyof DroneContent>(key: K, value: DroneContent[K]) => {
    setData((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const updateStep = (index: number, field: "title" | "description", value: string) => {
    if (!data) return;
    const steps = [...data.processSteps];
    steps[index] = { ...steps[index], [field]: value };
    update("processSteps", steps);
  };

  const addStep = () => {
    if (!data) return;
    update("processSteps", [...data.processSteps, { title: "", description: "" }]);
  };

  const removeStep = (index: number) => {
    if (!data) return;
    update("processSteps", data.processSteps.filter((_, i) => i !== index));
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
          <h1 className="text-2xl font-semibold text-[#2C2C2C]">Page Drone</h1>
          <p className="mt-1 text-[#6B6560]">Gérez le contenu de la page drone.</p>
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
        <TextField label="Titre" value={data.heroTitle} onChange={(v) => update("heroTitle", v)} />
        <TextField label="Sous-titre" value={data.heroSubtitle} onChange={(v) => update("heroSubtitle", v)} />
        <TextField label="Image de fond (URL)" value={data.heroBackgroundImage} onChange={(v) => update("heroBackgroundImage", v)} />
        {data.heroBackgroundImage && (
          <div className="mt-2">
            <p className="text-xs text-[#6B6560] mb-1">Aperçu :</p>
            <img src={data.heroBackgroundImage} alt="Hero" className="w-full max-w-md h-32 object-cover rounded-lg border border-[#E8E0D4]" />
          </div>
        )}
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E0D4] p-6 space-y-4">
        <h2 className="text-lg font-semibold text-[#2C2C2C]">Description</h2>
        <ParagraphsField label="Paragraphes" value={data.descriptionParagraphs} onChange={(v) => update("descriptionParagraphs", v)} />
      </div>

      {/* Certification */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E0D4] p-6 space-y-4">
        <h2 className="text-lg font-semibold text-[#2C2C2C]">Certification</h2>
        <TextAreaField label="Texte certification CATS" value={data.catsCertificationText} onChange={(v) => update("catsCertificationText", v)} rows={3} />
      </div>

      {/* Processus */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E0D4] p-6 space-y-4">
        <h2 className="text-lg font-semibold text-[#2C2C2C]">Processus</h2>
        {data.processSteps.map((step, i) => (
          <div key={i} className="p-4 rounded-lg border border-[#E8E0D4] bg-[#FAF7F2] space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#6B6560]">Étape {i + 1}</p>
              <button
                type="button"
                onClick={() => removeStep(i)}
                className="text-red-500 hover:text-red-700 text-sm transition-colors"
              >
                Supprimer
              </button>
            </div>
            <TextField label="Titre" value={step.title} onChange={(v) => updateStep(i, "title", v)} />
            <TextAreaField label="Description" value={step.description} onChange={(v) => updateStep(i, "description", v)} />
          </div>
        ))}
        <button
          type="button"
          onClick={addStep}
          className="px-4 py-2 text-sm rounded-lg bg-[#C9A96E] text-white hover:bg-[#b8984f] transition-colors"
        >
          + Ajouter une étape
        </button>
      </div>

      {/* CTA */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E0D4] p-6 space-y-4">
        <h2 className="text-lg font-semibold text-[#2C2C2C]">Appel à l&apos;action</h2>
        <TextField label="Titre" value={data.ctaTitle} onChange={(v) => update("ctaTitle", v)} />
        <TextField label="Sous-titre" value={data.ctaSubtitle} onChange={(v) => update("ctaSubtitle", v)} />
        <TextField label="Texte du bouton" value={data.ctaButtonText} onChange={(v) => update("ctaButtonText", v)} />
      </div>
    </div>
  );
}
