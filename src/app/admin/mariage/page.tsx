"use client";

import { useState, useEffect } from "react";
import type { MariageContent } from "@/lib/content";
import TextField from "@/components/admin/fields/TextField";
import ParagraphsField from "@/components/admin/fields/ParagraphsField";
import BackgroundImageField from "@/components/admin/fields/BackgroundImageField";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default function AdminMariagePage() {
  const [data, setData] = useState<MariageContent | null>(null);
  const [previousData, setPreviousData] = useState<MariageContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/content/content_mariage")
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
      const res = await fetch("/api/content/content_mariage", {
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

  const handleRevert = () => {
    if (previousData) {
      setData(JSON.parse(JSON.stringify(previousData)));
      setPreviousData(null);
    }
  };

  const update = <K extends keyof MariageContent>(key: K, value: MariageContent[K]) => {
    setData((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  const updateVideoEmbed = (index: number, field: "src" | "title", value: string) => {
    if (!data) return;
    const videoEmbeds = [...data.videoEmbeds];
    videoEmbeds[index] = { ...videoEmbeds[index], [field]: value };
    update("videoEmbeds", videoEmbeds);
  };

  const addVideoEmbed = () => {
    if (!data) return;
    update("videoEmbeds", [...data.videoEmbeds, { src: "", title: "" }]);
  };

  const removeVideoEmbed = (index: number) => {
    if (!data) return;
    update("videoEmbeds", data.videoEmbeds.filter((_, i) => i !== index));
  };

  const updatePlan = (index: number, field: string, value: unknown) => {
    if (!data) return;
    const plans = [...data.pricingPlans];
    plans[index] = { ...plans[index], [field]: value };
    update("pricingPlans", plans);
  };

  const updatePlanFeature = (planIndex: number, featureIndex: number, value: string) => {
    if (!data) return;
    const plans = [...data.pricingPlans];
    const features = [...plans[planIndex].features];
    features[featureIndex] = value;
    plans[planIndex] = { ...plans[planIndex], features };
    update("pricingPlans", plans);
  };

  const addPlanFeature = (planIndex: number) => {
    if (!data) return;
    const plans = [...data.pricingPlans];
    plans[planIndex] = { ...plans[planIndex], features: [...plans[planIndex].features, ""] };
    update("pricingPlans", plans);
  };

  const removePlanFeature = (planIndex: number, featureIndex: number) => {
    if (!data) return;
    const plans = [...data.pricingPlans];
    plans[planIndex] = {
      ...plans[planIndex],
      features: plans[planIndex].features.filter((_, i) => i !== featureIndex),
    };
    update("pricingPlans", plans);
  };

  const addPlan = () => {
    if (!data) return;
    update("pricingPlans", [
      ...data.pricingPlans,
      { title: "", price: "", features: [""], highlighted: false },
    ]);
  };

  const removePlan = (index: number) => {
    if (!data) return;
    update("pricingPlans", data.pricingPlans.filter((_, i) => i !== index));
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
        title="Page Mariage"
        subtitle="Gérez le contenu de la page mariage."
        previewHref="/mariage"
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
        <TextField label="Titre" value={data.heroTitle} onChange={(v) => update("heroTitle", v)} />
        <TextField label="Sous-titre" value={data.heroSubtitle} onChange={(v) => update("heroSubtitle", v)} />
        <BackgroundImageField label="Image de fond" value={data.heroBackgroundImage} onChange={(v) => update("heroBackgroundImage", v)} recommendedSize="1920 x 1080 px (16:9, paysage)" />
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E0D4] p-6 space-y-4">
        <h2 className="text-lg font-semibold text-[#2C2C2C]">Description</h2>
        <ParagraphsField label="Paragraphes" value={data.descriptionParagraphs} onChange={(v) => update("descriptionParagraphs", v)} />
      </div>

      {/* Videos */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E0D4] p-6 space-y-4">
        <h2 className="text-lg font-semibold text-[#2C2C2C]">Vidéos</h2>
        {data.videoEmbeds.map((video, i) => (
          <div key={i} className="p-4 rounded-lg border border-[#E8E0D4] bg-[#FAF7F2] space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#6B6560]">Vidéo {i + 1}</p>
              <button
                type="button"
                onClick={() => removeVideoEmbed(i)}
                className="text-red-500 hover:text-red-700 text-sm transition-colors"
              >
                Supprimer
              </button>
            </div>
            <TextField label="URL d'intégration" value={video.src} onChange={(v) => updateVideoEmbed(i, "src", v)} placeholder="https://www.youtube.com/embed/..." />
            <TextField label="Titre" value={video.title} onChange={(v) => updateVideoEmbed(i, "title", v)} />
          </div>
        ))}
        <button
          type="button"
          onClick={addVideoEmbed}
          className="px-4 py-2 text-sm rounded-lg bg-[#C9A96E] text-white hover:bg-[#b8984f] transition-colors"
        >
          + Ajouter une vidéo
        </button>
      </div>

      {/* Tarifs */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E0D4] p-6 space-y-4">
        <h2 className="text-lg font-semibold text-[#2C2C2C]">Tarifs</h2>
        {data.pricingPlans.map((plan, i) => (
          <div key={i} className="p-4 rounded-lg border border-[#E8E0D4] bg-[#FAF7F2] space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-[#6B6560]">Formule {i + 1}</p>
              <button
                type="button"
                onClick={() => removePlan(i)}
                className="text-red-500 hover:text-red-700 text-sm transition-colors"
              >
                Supprimer
              </button>
            </div>
            <TextField label="Titre" value={plan.title} onChange={(v) => updatePlan(i, "title", v)} />
            <TextField label="Prix" value={plan.price} onChange={(v) => updatePlan(i, "price", v)} />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={plan.highlighted || false}
                onChange={(e) => updatePlan(i, "highlighted", e.target.checked)}
                className="rounded border-[#E8E0D4] text-[#C9A96E] focus:ring-[#C9A96E]"
              />
              <label className="text-sm text-[#2C2C2C]">Mise en avant</label>
            </div>
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C] mb-2">Inclus</label>
              {plan.features.map((feature, fi) => (
                <div key={fi} className="flex items-center gap-2 mb-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => updatePlanFeature(i, fi, e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg border border-[#E8E0D4] bg-white text-[#2C2C2C] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => removePlanFeature(i, fi)}
                    className="p-1 text-red-500 hover:text-red-700 transition-colors"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addPlanFeature(i)}
                className="text-sm text-[#C9A96E] hover:text-[#b8984f] transition-colors"
              >
                + Ajouter une caractéristique
              </button>
            </div>
          </div>
        ))}
        <button
          type="button"
          onClick={addPlan}
          className="px-4 py-2 text-sm rounded-lg bg-[#C9A96E] text-white hover:bg-[#b8984f] transition-colors"
        >
          + Ajouter une formule
        </button>
      </div>

      {/* CTA */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E0D4] p-6 space-y-4">
        <h2 className="text-lg font-semibold text-[#2C2C2C]">Appel à l&apos;action</h2>
        <TextField label="Titre" value={data.ctaTitle} onChange={(v) => update("ctaTitle", v)} />
        <TextField label="Sous-titre" value={data.ctaSubtitle} onChange={(v) => update("ctaSubtitle", v)} />
        <TextField label="Texte du bouton" value={data.ctaButtonText} onChange={(v) => update("ctaButtonText", v)} />
      </div>

      {/* Plaquette */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E0D4] p-6 space-y-4">
        <h2 className="text-lg font-semibold text-[#2C2C2C]">Plaquette</h2>
        <TextField label="Chemin du PDF" value={data.brochurePath} onChange={(v) => update("brochurePath", v)} placeholder="/uploads/plaquette-mariage.pdf" />
        {data.brochurePath && (
          <p className="text-xs text-[#6B6560]">
            Fichier actuel : <a href={data.brochurePath} target="_blank" rel="noopener noreferrer" className="text-[#C9A96E] underline">{data.brochurePath}</a>
          </p>
        )}
      </div>
    </div>
  );
}
