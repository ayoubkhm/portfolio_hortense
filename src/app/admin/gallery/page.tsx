"use client";

import { useState } from "react";
import MariageGalleryAdmin from "./MariageGalleryAdmin";
import DroneGalleryAdmin from "./DroneGalleryAdmin";

const TABS = [
  { key: "mariage", label: "Mariage" },
  { key: "drone", label: "Drone" },
] as const;

type Tab = (typeof TABS)[number]["key"];

export default function AdminGalleryPage() {
  const [tab, setTab] = useState<Tab>("mariage");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#2C2C2C]">Galerie</h1>
        <p className="mt-1 text-[#6B6560]">
          Gérez les photos mariage (catégories) et drone.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#E8E0D4]">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-6 py-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
              tab === t.key
                ? "border-[#C9A96E] text-[#C9A96E]"
                : "border-transparent text-[#6B6560] hover:text-[#2C2C2C]"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "mariage" && <MariageGalleryAdmin />}
      {tab === "drone" && <DroneGalleryAdmin />}
    </div>
  );
}
