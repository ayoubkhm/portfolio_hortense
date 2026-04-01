"use client";

import { useState, useEffect } from "react";
import type { ContactContent } from "@/lib/content";
import TextField from "@/components/admin/fields/TextField";

export default function AdminContactPage() {
  const [data, setData] = useState<ContactContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/content/content_contact")
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
      const res = await fetch("/api/content/content_contact", {
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

  const update = <K extends keyof ContactContent>(key: K, value: ContactContent[K]) => {
    setData((prev) => (prev ? { ...prev, [key]: value } : prev));
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
          <h1 className="text-2xl font-semibold text-[#2C2C2C]">Page Contact</h1>
          <p className="mt-1 text-[#6B6560]">Gérez le contenu de la page contact.</p>
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

      {/* Coordonnees */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E0D4] p-6 space-y-4">
        <h2 className="text-lg font-semibold text-[#2C2C2C]">Coordonnées</h2>
        <TextField label="Email" value={data.email} onChange={(v) => update("email", v)} />
        <TextField label="Téléphone" value={data.phone} onChange={(v) => update("phone", v)} />
        <TextField label="Localisation" value={data.location} onChange={(v) => update("location", v)} />
        <TextField label="Texte de disponibilité" value={data.availabilityText} onChange={(v) => update("availabilityText", v)} />
      </div>

      {/* Reseaux sociaux */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E0D4] p-6 space-y-4">
        <h2 className="text-lg font-semibold text-[#2C2C2C]">Réseaux sociaux</h2>
        <TextField label="Instagram (URL)" value={data.instagramUrl} onChange={(v) => update("instagramUrl", v)} placeholder="https://instagram.com/..." />
        <TextField label="Facebook (URL)" value={data.facebookUrl} onChange={(v) => update("facebookUrl", v)} placeholder="https://facebook.com/..." />
        <TextField label="LinkedIn (URL)" value={data.linkedinUrl} onChange={(v) => update("linkedinUrl", v)} placeholder="https://linkedin.com/in/..." />
      </div>
    </div>
  );
}
