// Per-type editors for each block type. Each editor takes the block's
// data and an onChange callback. The dispatcher BlockEditor at the bottom
// switches by type.

"use client";

import TextField from "@/components/admin/fields/TextField";
import TextAreaField from "@/components/admin/fields/TextAreaField";
import ParagraphsField from "@/components/admin/fields/ParagraphsField";
import BackgroundImageField from "@/components/admin/fields/BackgroundImageField";
import HeroVideoUploadField from "./HeroVideoUploadField";
import MediaUploadButton from "@/components/admin/MediaUploadButton";
import { getLockedRenderer } from "@/lib/blocks/locked-renderers";
import type {
  Block,
  HeroBlock,
  VideoHeroBlock,
  ParagraphsBlock,
  GalleryBlock,
  VideosBlock,
  PricingBlock,
  PricingPlan,
  FaqBlock,
  SummaryBlock,
  StepsBlock,
  CertificationsBlock,
  CtaBlock,
  ImageTextBlock,
  QuoteBlock,
  LinkCardsBlock,
  TestimonialsBlock,
  GoogleReviewsBlock,
  CrossLinkBlock,
  LockedBlock,
} from "@/lib/blocks/types";

// Generic helper props
type EditorProps<B extends Block> = {
  data: B["data"];
  onChange: (data: B["data"]) => void;
};

// ─── Hero ────────────────────────────────────────────────────────────────────
function HeroEditor({ data, onChange }: EditorProps<HeroBlock>) {
  return (
    <div className="space-y-4">
      <TextField label="Titre" value={data.title} onChange={(v) => onChange({ ...data, title: v })} />
      <TextField label="Sous-titre" value={data.subtitle || ""} onChange={(v) => onChange({ ...data, subtitle: v })} />
      <BackgroundImageField label="Image de fond" value={data.backgroundImage} onChange={(v) => onChange({ ...data, backgroundImage: v })} recommendedSize="1920 x 1080 px (16:9)" />
    </div>
  );
}

// ─── Video Hero ──────────────────────────────────────────────────────────────
function VideoHeroEditor({ data, onChange }: EditorProps<VideoHeroBlock>) {
  const buttons = data.buttons || [];
  const updateButton = (i: number, field: "label" | "href" | "variant", value: string) => {
    const next = [...buttons];
    next[i] = { ...next[i], [field]: value };
    onChange({ ...data, buttons: next });
  };
  const addButton = () =>
    onChange({ ...data, buttons: [...buttons, { label: "Bouton", href: "/", variant: "solid" }] });
  const removeButton = (i: number) =>
    onChange({ ...data, buttons: buttons.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-4">
      <TextField label="Titre principal" value={data.title} onChange={(v) => onChange({ ...data, title: v })} />
      <TextField label="Sous-titre" value={data.subtitle || ""} onChange={(v) => onChange({ ...data, subtitle: v })} />
      <TextField label="Sous-sous-titre" value={data.subSubtitle || ""} onChange={(v) => onChange({ ...data, subSubtitle: v })} />

      {/* Boutons */}
      <div>
        <p className="text-sm font-medium text-[#2C2C2C] mb-2">Boutons d&apos;action</p>
        {buttons.map((btn, i) => (
          <div key={i} className="p-3 rounded-lg border border-[#E8E0D4] bg-[#FAF7F2] space-y-2 mb-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-medium text-[#6B6560]">Bouton {i + 1}</p>
              <button type="button" onClick={() => removeButton(i)} className="text-red-500 hover:text-red-700 text-xs">
                Supprimer
              </button>
            </div>
            <TextField label="Label" value={btn.label} onChange={(v) => updateButton(i, "label", v)} />
            <TextField label="Lien" value={btn.href} onChange={(v) => updateButton(i, "href", v)} placeholder="/mariage" />
            <div>
              <label className="block text-xs font-medium text-[#2C2C2C] mb-1">Style</label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => updateButton(i, "variant", "solid")}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${btn.variant === "solid" ? "bg-[#2C2C2C] text-white border-[#2C2C2C]" : "bg-white text-[#6B6560] border-[#E8E0D4]"}`}
                >
                  Plein
                </button>
                <button
                  type="button"
                  onClick={() => updateButton(i, "variant", "outline")}
                  className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${btn.variant === "outline" ? "bg-[#2C2C2C] text-white border-[#2C2C2C]" : "bg-white text-[#6B6560] border-[#E8E0D4]"}`}
                >
                  Contour
                </button>
              </div>
            </div>
          </div>
        ))}
        <button type="button" onClick={addButton} className="px-3 py-1.5 text-xs rounded-lg bg-[#C9A96E] text-white hover:bg-[#b8984f]">
          + Ajouter un bouton
        </button>
      </div>

      {/* Vidéo upload */}
      <div className="pt-4 border-t border-[#E8E0D4]">
        <HeroVideoUploadField />
      </div>
    </div>
  );
}

// ─── Paragraphs ──────────────────────────────────────────────────────────────
function ParagraphsEditor({ data, onChange }: EditorProps<ParagraphsBlock>) {
  return (
    <ParagraphsField label="Paragraphes" value={data.paragraphs} onChange={(v) => onChange({ ...data, paragraphs: v })} />
  );
}

// ─── Gallery (only heading editable; photos managed externally) ─────────────
function GalleryEditor({ data, onChange }: EditorProps<GalleryBlock>) {
  return (
    <div className="space-y-3">
      <TextField label="Titre de la section" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      <div>
        <label className="block text-sm font-medium text-[#2C2C2C] mb-2">Galerie à afficher</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onChange({ ...data, galleryRef: "mariage" })}
            className={`px-4 py-2 text-sm rounded-lg border transition-all ${data.galleryRef === "mariage" ? "bg-[#2C2C2C] text-white border-[#2C2C2C]" : "bg-white text-[#6B6560] border-[#E8E0D4] hover:border-[#C9A96E]"}`}
          >
            Mariage
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...data, galleryRef: "drone" })}
            className={`px-4 py-2 text-sm rounded-lg border transition-all ${data.galleryRef === "drone" ? "bg-[#2C2C2C] text-white border-[#2C2C2C]" : "bg-white text-[#6B6560] border-[#E8E0D4] hover:border-[#C9A96E]"}`}
          >
            Drone
          </button>
        </div>
      </div>
      <p className="text-xs text-[#6B6560] bg-[#FAF7F2] border border-[#E8E0D4] rounded-lg p-3">
        ℹ️ La gestion des photos se fait depuis{" "}
        <a href="/admin/gallery" className="text-[#C9A96E] underline font-medium">
          /admin/gallery
        </a>
        {data.galleryRef === "drone"
          ? " — sélectionnez la catégorie « drone » pour gérer ces photos."
          : " — gérez les catégories de la galerie mariage."}
      </p>
    </div>
  );
}

// ─── Videos ──────────────────────────────────────────────────────────────────
function VideosEditor({ data, onChange }: EditorProps<VideosBlock>) {
  const updateVideo = (i: number, field: "src" | "title", value: string) => {
    const videos = [...data.videos];
    videos[i] = { ...videos[i], [field]: value };
    onChange({ ...data, videos });
  };
  const addVideo = () => onChange({ ...data, videos: [...data.videos, { src: "", title: "" }] });
  const removeVideo = (i: number) => onChange({ ...data, videos: data.videos.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-4">
      <TextField label="Titre de la section" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      {data.videos.map((video, i) => (
        <div key={i} className="p-4 rounded-lg border border-[#E8E0D4] bg-[#FAF7F2] space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#6B6560]">Vidéo {i + 1}</p>
            <button type="button" onClick={() => removeVideo(i)} className="text-red-500 hover:text-red-700 text-sm">
              Supprimer
            </button>
          </div>
          <TextField label="URL d'intégration" value={video.src} onChange={(v) => updateVideo(i, "src", v)} placeholder="https://www.youtube.com/embed/..." />
          <TextField label="Titre" value={video.title} onChange={(v) => updateVideo(i, "title", v)} />
        </div>
      ))}
      <button type="button" onClick={addVideo} className="px-4 py-2 text-sm rounded-lg bg-[#C9A96E] text-white hover:bg-[#b8984f]">
        + Ajouter une vidéo
      </button>
    </div>
  );
}

// ─── Pricing ─────────────────────────────────────────────────────────────────
function PricingEditor({ data, onChange }: EditorProps<PricingBlock>) {
  const updatePlan = <K extends keyof PricingPlan>(i: number, field: K, value: PricingPlan[K]) => {
    const plans = [...data.plans];
    plans[i] = { ...plans[i], [field]: value };
    onChange({ ...data, plans });
  };
  const addPlan = () => onChange({ ...data, plans: [...data.plans, { title: "", price: "", features: [""], highlighted: false }] });
  const removePlan = (i: number) => onChange({ ...data, plans: data.plans.filter((_, idx) => idx !== i) });
  const addFeature = (planIdx: number) => {
    const plans = [...data.plans];
    plans[planIdx] = { ...plans[planIdx], features: [...plans[planIdx].features, ""] };
    onChange({ ...data, plans });
  };
  const updateFeature = (planIdx: number, fIdx: number, value: string) => {
    const plans = [...data.plans];
    const features = [...plans[planIdx].features];
    features[fIdx] = value;
    plans[planIdx] = { ...plans[planIdx], features };
    onChange({ ...data, plans });
  };
  const removeFeature = (planIdx: number, fIdx: number) => {
    const plans = [...data.plans];
    plans[planIdx] = { ...plans[planIdx], features: plans[planIdx].features.filter((_, i) => i !== fIdx) };
    onChange({ ...data, plans });
  };

  return (
    <div className="space-y-4">
      <TextField label="Titre de la section" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      <TextField label="Sous-titre" value={data.subtitle} onChange={(v) => onChange({ ...data, subtitle: v })} />
      {data.plans.map((plan, i) => (
        <div key={i} className="p-4 rounded-lg border border-[#E8E0D4] bg-[#FAF7F2] space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#6B6560]">Formule {i + 1}</p>
            <button type="button" onClick={() => removePlan(i)} className="text-red-500 hover:text-red-700 text-sm">
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
                  onChange={(e) => updateFeature(i, fi, e.target.value)}
                  className="flex-1 px-3 py-2 rounded-lg border border-[#E8E0D4] bg-white text-[#2C2C2C] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => removeFeature(i, fi)}
                  className="p-1 text-red-500 hover:text-red-700"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
            <button type="button" onClick={() => addFeature(i)} className="text-sm text-[#C9A96E] hover:text-[#b8984f]">
              + Ajouter une caractéristique
            </button>
          </div>
        </div>
      ))}
      <button type="button" onClick={addPlan} className="px-4 py-2 text-sm rounded-lg bg-[#C9A96E] text-white hover:bg-[#b8984f]">
        + Ajouter une formule
      </button>
      <div className="pt-4 mt-4 border-t border-[#E8E0D4] space-y-3">
        <p className="text-sm font-medium text-[#2C2C2C]">Plaquette PDF (optionnel)</p>
        <div className="flex items-center gap-3">
          <MediaUploadButton
            accept="pdf"
            category="brochure"
            onUploaded={(path) => onChange({ ...data, brochurePath: path })}
            label={data.brochurePath ? "Remplacer le PDF" : "Uploader un PDF"}
            variant="solid"
            size="sm"
          />
          {data.brochurePath && (
            <span className="text-xs text-[#2C2C2C]/60 truncate max-w-xs">{data.brochurePath.split("/").pop()}</span>
          )}
        </div>
        <TextField label="Texte du bouton" value={data.brochureLabel || ""} onChange={(v) => onChange({ ...data, brochureLabel: v })} placeholder="Télécharger la plaquette" />
      </div>
    </div>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────
function FaqEditor({ data, onChange }: EditorProps<FaqBlock>) {
  const updateItem = (i: number, field: "question" | "answer", value: string) => {
    const items = [...data.items];
    items[i] = { ...items[i], [field]: value };
    onChange({ ...data, items });
  };
  const addItem = () => onChange({ ...data, items: [...data.items, { question: "", answer: "" }] });
  const removeItem = (i: number) => onChange({ ...data, items: data.items.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-4">
      <TextField label="Titre de la section" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      {data.items.map((item, i) => (
        <div key={i} className="p-4 rounded-lg border border-[#E8E0D4] bg-[#FAF7F2] space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#6B6560]">Question {i + 1}</p>
            <button type="button" onClick={() => removeItem(i)} className="text-red-500 hover:text-red-700 text-sm">
              Supprimer
            </button>
          </div>
          <TextField label="Question" value={item.question} onChange={(v) => updateItem(i, "question", v)} />
          <TextAreaField label="Réponse" value={item.answer} onChange={(v) => updateItem(i, "answer", v)} rows={3} />
        </div>
      ))}
      <button type="button" onClick={addItem} className="px-4 py-2 text-sm rounded-lg bg-[#C9A96E] text-white hover:bg-[#b8984f]">
        + Ajouter une question
      </button>
    </div>
  );
}

// ─── Summary ─────────────────────────────────────────────────────────────────
function SummaryEditor({ data, onChange }: EditorProps<SummaryBlock>) {
  return (
    <div className="space-y-4">
      <TextField label="Titre de la section" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      <ParagraphsField label="Points clés" value={data.items} onChange={(v) => onChange({ ...data, items: v })} />
    </div>
  );
}

// ─── Steps ───────────────────────────────────────────────────────────────────
function StepsEditor({ data, onChange }: EditorProps<StepsBlock>) {
  const updateStep = (i: number, field: "title" | "description", value: string) => {
    const steps = [...data.steps];
    steps[i] = { ...steps[i], [field]: value };
    onChange({ ...data, steps });
  };
  const addStep = () => onChange({ ...data, steps: [...data.steps, { title: "", description: "" }] });
  const removeStep = (i: number) => onChange({ ...data, steps: data.steps.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-4">
      <TextField label="Titre de la section" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      <TextField label="Sous-titre" value={data.subtitle} onChange={(v) => onChange({ ...data, subtitle: v })} />
      {data.steps.map((step, i) => (
        <div key={i} className="p-4 rounded-lg border border-[#E8E0D4] bg-[#FAF7F2] space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#6B6560]">Étape {i + 1}</p>
            <button type="button" onClick={() => removeStep(i)} className="text-red-500 hover:text-red-700 text-sm">
              Supprimer
            </button>
          </div>
          <TextField label="Titre" value={step.title} onChange={(v) => updateStep(i, "title", v)} />
          <TextAreaField label="Description" value={step.description} onChange={(v) => updateStep(i, "description", v)} />
        </div>
      ))}
      <button type="button" onClick={addStep} className="px-4 py-2 text-sm rounded-lg bg-[#C9A96E] text-white hover:bg-[#b8984f]">
        + Ajouter une étape
      </button>
    </div>
  );
}

// ─── Certifications ──────────────────────────────────────────────────────────
function CertificationsEditor({ data, onChange }: EditorProps<CertificationsBlock>) {
  const updateItem = (i: number, field: "title" | "description", value: string) => {
    const items = [...data.items];
    items[i] = { ...items[i], [field]: value };
    onChange({ ...data, items });
  };
  const addItem = () => onChange({ ...data, items: [...data.items, { title: "", description: "" }] });
  const removeItem = (i: number) => onChange({ ...data, items: data.items.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-4">
      <TextField label="Titre de la section" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      {data.items.map((item, i) => (
        <div key={i} className="p-4 rounded-lg border border-[#E8E0D4] bg-[#FAF7F2] space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#6B6560]">Certification {i + 1}</p>
            <button type="button" onClick={() => removeItem(i)} className="text-red-500 hover:text-red-700 text-sm">
              Supprimer
            </button>
          </div>
          <TextField label="Titre" value={item.title} onChange={(v) => updateItem(i, "title", v)} />
          <TextAreaField label="Description" value={item.description} onChange={(v) => updateItem(i, "description", v)} />
        </div>
      ))}
      <button type="button" onClick={addItem} className="px-4 py-2 text-sm rounded-lg bg-[#C9A96E] text-white hover:bg-[#b8984f]">
        + Ajouter une certification
      </button>
    </div>
  );
}

// ─── CTA ─────────────────────────────────────────────────────────────────────
function CtaEditor({ data, onChange }: EditorProps<CtaBlock>) {
  const currentStyle = data.style || "dark";
  return (
    <div className="space-y-4">
      <TextField label="Titre" value={data.title} onChange={(v) => onChange({ ...data, title: v })} />
      <TextField label="Sous-titre" value={data.subtitle || ""} onChange={(v) => onChange({ ...data, subtitle: v })} />
      <TextField label="Texte du bouton" value={data.buttonText} onChange={(v) => onChange({ ...data, buttonText: v })} />
      <TextField label="Lien du bouton" value={data.buttonHref} onChange={(v) => onChange({ ...data, buttonHref: v })} placeholder="/contact" />
      <div>
        <label className="block text-sm font-medium text-[#2C2C2C] mb-2">Style visuel</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onChange({ ...data, style: "dark" })}
            className={`px-4 py-2 text-sm rounded-lg border transition-all ${currentStyle === "dark" ? "bg-[#2C2C2C] text-white border-[#2C2C2C]" : "bg-white text-[#6B6560] border-[#E8E0D4] hover:border-[#C9A96E]"}`}
          >
            Sombre (pleine largeur)
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...data, style: "light" })}
            className={`px-4 py-2 text-sm rounded-lg border transition-all ${currentStyle === "light" ? "bg-[#2C2C2C] text-white border-[#2C2C2C]" : "bg-white text-[#6B6560] border-[#E8E0D4] hover:border-[#C9A96E]"}`}
          >
            Clair (subtil)
          </button>
        </div>
        <p className="text-xs text-[#6B6560] mt-2">
          Sombre = bandeau charcoal pleine largeur (CTA principal). Clair = section discrète sur fond cream (CTA secondaire).
        </p>
      </div>
    </div>
  );
}

// ─── Link cards ──────────────────────────────────────────────────────────────
function LinkCardsEditor({ data, onChange }: EditorProps<LinkCardsBlock>) {
  const updateCard = (i: number, field: "title" | "description" | "href" | "linkLabel", value: string) => {
    const cards = [...data.cards];
    cards[i] = { ...cards[i], [field]: value };
    onChange({ ...data, cards });
  };
  const addCard = () => onChange({ ...data, cards: [...data.cards, { title: "", description: "", href: "", linkLabel: "Découvrir" }] });
  const removeCard = (i: number) => onChange({ ...data, cards: data.cards.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-4">
      <TextField label="Titre de la section" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      {data.cards.map((card, i) => (
        <div key={i} className="p-4 rounded-lg border border-[#E8E0D4] bg-[#FAF7F2] space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#6B6560]">Card {i + 1}</p>
            <button type="button" onClick={() => removeCard(i)} className="text-red-500 hover:text-red-700 text-sm">
              Supprimer
            </button>
          </div>
          <TextField label="Titre" value={card.title} onChange={(v) => updateCard(i, "title", v)} />
          <TextAreaField label="Description" value={card.description} onChange={(v) => updateCard(i, "description", v)} rows={2} />
          <TextField label="Lien" value={card.href} onChange={(v) => updateCard(i, "href", v)} placeholder="/mariage" />
          <TextField label="Texte du lien" value={card.linkLabel} onChange={(v) => updateCard(i, "linkLabel", v)} placeholder="Découvrir" />
        </div>
      ))}
      <button type="button" onClick={addCard} className="px-4 py-2 text-sm rounded-lg bg-[#C9A96E] text-white hover:bg-[#b8984f]">
        + Ajouter une card
      </button>
    </div>
  );
}

// ─── Image + texte ───────────────────────────────────────────────────────────
function ImageTextEditor({ data, onChange }: EditorProps<ImageTextBlock>) {
  return (
    <div className="space-y-4">
      <BackgroundImageField label="Image" value={data.image} onChange={(v) => onChange({ ...data, image: v })} recommendedSize="1200 x 900 px (4:3)" />
      <TextField label="Texte alternatif de l'image" value={data.imageAlt || ""} onChange={(v) => onChange({ ...data, imageAlt: v })} placeholder="Description de l'image pour le SEO et l'accessibilité" />
      <TextField label="Titre (optionnel)" value={data.heading || ""} onChange={(v) => onChange({ ...data, heading: v })} />
      <ParagraphsField label="Paragraphes" value={data.paragraphs} onChange={(v) => onChange({ ...data, paragraphs: v })} />
      <div>
        <label className="block text-sm font-medium text-[#2C2C2C] mb-2">Position de l&apos;image</label>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onChange({ ...data, imagePosition: "left" })}
            className={`px-4 py-2 text-sm rounded-lg border transition-all ${data.imagePosition === "left" ? "bg-[#2C2C2C] text-white border-[#2C2C2C]" : "bg-white text-[#6B6560] border-[#E8E0D4] hover:border-[#C9A96E]"}`}
          >
            Gauche
          </button>
          <button
            type="button"
            onClick={() => onChange({ ...data, imagePosition: "right" })}
            className={`px-4 py-2 text-sm rounded-lg border transition-all ${data.imagePosition === "right" ? "bg-[#2C2C2C] text-white border-[#2C2C2C]" : "bg-white text-[#6B6560] border-[#E8E0D4] hover:border-[#C9A96E]"}`}
          >
            Droite
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Testimonials ────────────────────────────────────────────────────────────
function TestimonialsEditor({ data, onChange }: EditorProps<TestimonialsBlock>) {
  const updateItem = (i: number, field: "quote" | "author" | "detail", value: string) => {
    const items = [...data.items];
    items[i] = { ...items[i], [field]: value };
    onChange({ ...data, items });
  };
  const addItem = () => onChange({ ...data, items: [...data.items, { quote: "", author: "", detail: "" }] });
  const removeItem = (i: number) => onChange({ ...data, items: data.items.filter((_, idx) => idx !== i) });

  return (
    <div className="space-y-4">
      <TextField label="Titre de la section" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      <TextField label="Sous-titre (optionnel)" value={data.subheading || ""} onChange={(v) => onChange({ ...data, subheading: v })} />
      {data.items.map((item, i) => (
        <div key={i} className="p-4 rounded-lg border border-[#E8E0D4] bg-[#FAF7F2] space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-[#6B6560]">Témoignage {i + 1}</p>
            <button type="button" onClick={() => removeItem(i)} className="text-red-500 hover:text-red-700 text-sm">
              Supprimer
            </button>
          </div>
          <TextAreaField label="Citation" value={item.quote} onChange={(v) => updateItem(i, "quote", v)} rows={4} />
          <TextField label="Auteur" value={item.author} onChange={(v) => updateItem(i, "author", v)} placeholder="Camille & Julien" />
          <TextField label="Détail (optionnel)" value={item.detail || ""} onChange={(v) => updateItem(i, "detail", v)} placeholder="Mariage à Saint-Émilion, 2025" />
        </div>
      ))}
      <button type="button" onClick={addItem} className="px-4 py-2 text-sm rounded-lg bg-[#C9A96E] text-white hover:bg-[#b8984f]">
        + Ajouter un témoignage
      </button>
    </div>
  );
}

// ─── Google Reviews (config seulement — les avis viennent de la DB) ────────
function GoogleReviewsEditor({ data, onChange }: EditorProps<GoogleReviewsBlock>) {
  return (
    <div className="space-y-4">
      <div className="p-3 rounded-lg bg-[#FAF7F2] border border-[#E8E0D4] text-xs text-[#6B6560] leading-relaxed">
        Les avis sont synchronisés automatiquement depuis votre fiche Google Business Profile (toutes les heures).
        Pour gérer les avis individuels (masquer, sync immédiate), allez dans <strong>Admin → Avis Google</strong>.
      </div>
      <TextField label="Titre de la section" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} />
      <TextField label="Sous-titre (optionnel)" value={data.subheading || ""} onChange={(v) => onChange({ ...data, subheading: v })} />
      <TextField
        label="URL de votre fiche Google (lien « Voir sur Google »)"
        value={data.gbpUrl}
        onChange={(v) => onChange({ ...data, gbpUrl: v })}
        placeholder="https://maps.google.com/?cid=..."
      />
      <div>
        <label className="block text-sm font-medium text-[#2C2C2C] mb-2">
          Note minimale à afficher
        </label>
        <select
          value={data.minRating ?? ""}
          onChange={(e) => onChange({ ...data, minRating: e.target.value ? Number(e.target.value) : undefined })}
          className="w-full px-3 py-2 rounded-lg border border-[#E8E0D4] bg-white text-[#2C2C2C]"
        >
          <option value="">Tous les avis</option>
          <option value="3">3 étoiles et plus</option>
          <option value="4">4 étoiles et plus</option>
          <option value="5">5 étoiles uniquement</option>
        </select>
      </div>
    </div>
  );
}

// ─── Cross-link (bandeau renvoi vers une autre page) ────────────────────────
function CrossLinkEditor({ data, onChange }: EditorProps<CrossLinkBlock>) {
  return (
    <div className="space-y-4">
      <TextField label="Titre" value={data.heading} onChange={(v) => onChange({ ...data, heading: v })} placeholder="Besoin de vues aériennes ?" />
      <TextAreaField label="Description" value={data.description} onChange={(v) => onChange({ ...data, description: v })} rows={2} placeholder="Sublimez votre mariage avec des prises de vue drone." />
      <TextField label="Lien" value={data.href} onChange={(v) => onChange({ ...data, href: v })} placeholder="/drone" />
      <TextField label="Texte du bouton" value={data.linkText} onChange={(v) => onChange({ ...data, linkText: v })} placeholder="Découvrir les prestations drone" />
    </div>
  );
}

// ─── Locked (read-only — must contact dev to edit) ──────────────────────────
function LockedEditor({ data }: EditorProps<LockedBlock>) {
  const renderer = getLockedRenderer(data.rendererKey);
  return (
    <div className="space-y-3">
      <div className="flex items-start gap-3 p-4 rounded-lg bg-[#FAF7F2] border border-[#E8E0D4]">
        <svg className="w-5 h-5 text-[#6B6560] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-[#2C2C2C]">
            {renderer?.label || `Section non modifiable (${data.rendererKey})`}
          </p>
          <p className="text-xs text-[#6B6560] mt-1 leading-relaxed">
            {renderer?.description ||
              "Cette section est gérée directement dans le code par le développeur."}
          </p>
          <p className="text-xs text-[#6B6560] mt-2 italic">
            Pour modifier le contenu de cette section, contactez le développeur. Vous pouvez la déplacer ou la supprimer ci-dessus.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Quote ───────────────────────────────────────────────────────────────────
function QuoteEditor({ data, onChange }: EditorProps<QuoteBlock>) {
  return (
    <div className="space-y-4">
      <TextAreaField label="Citation" value={data.text} onChange={(v) => onChange({ ...data, text: v })} rows={4} />
      <TextField label="Auteur (optionnel)" value={data.author || ""} onChange={(v) => onChange({ ...data, author: v })} />
      <TextField label="Rôle (optionnel)" value={data.role || ""} onChange={(v) => onChange({ ...data, role: v })} placeholder="ex : Mariée, juin 2025" />
    </div>
  );
}

// ─── Dispatcher ──────────────────────────────────────────────────────────────
export default function BlockEditor({
  block,
  onChange,
}: {
  block: Block;
  onChange: (data: Block["data"]) => void;
}) {
  // The discriminated union narrows correctly inside each case so the typed
  // editors get the right data shape and onChange signature.
  switch (block.type) {
    case "hero":
      return <HeroEditor data={block.data} onChange={onChange as (d: HeroBlock["data"]) => void} />;
    case "video-hero":
      return <VideoHeroEditor data={block.data} onChange={onChange as (d: VideoHeroBlock["data"]) => void} />;
    case "paragraphs":
      return <ParagraphsEditor data={block.data} onChange={onChange as (d: ParagraphsBlock["data"]) => void} />;
    case "gallery":
      return <GalleryEditor data={block.data} onChange={onChange as (d: GalleryBlock["data"]) => void} />;
    case "videos":
      return <VideosEditor data={block.data} onChange={onChange as (d: VideosBlock["data"]) => void} />;
    case "pricing":
      return <PricingEditor data={block.data} onChange={onChange as (d: PricingBlock["data"]) => void} />;
    case "faq":
      return <FaqEditor data={block.data} onChange={onChange as (d: FaqBlock["data"]) => void} />;
    case "summary":
      return <SummaryEditor data={block.data} onChange={onChange as (d: SummaryBlock["data"]) => void} />;
    case "steps":
      return <StepsEditor data={block.data} onChange={onChange as (d: StepsBlock["data"]) => void} />;
    case "certifications":
      return <CertificationsEditor data={block.data} onChange={onChange as (d: CertificationsBlock["data"]) => void} />;
    case "cta":
      return <CtaEditor data={block.data} onChange={onChange as (d: CtaBlock["data"]) => void} />;
    case "image-text":
      return <ImageTextEditor data={block.data} onChange={onChange as (d: ImageTextBlock["data"]) => void} />;
    case "quote":
      return <QuoteEditor data={block.data} onChange={onChange as (d: QuoteBlock["data"]) => void} />;
    case "link-cards":
      return <LinkCardsEditor data={block.data} onChange={onChange as (d: LinkCardsBlock["data"]) => void} />;
    case "testimonials":
      return <TestimonialsEditor data={block.data} onChange={onChange as (d: TestimonialsBlock["data"]) => void} />;
    case "google-reviews":
      return <GoogleReviewsEditor data={block.data} onChange={onChange as (d: GoogleReviewsBlock["data"]) => void} />;
    case "cross-link":
      return <CrossLinkEditor data={block.data} onChange={onChange as (d: CrossLinkBlock["data"]) => void} />;
    case "locked":
      return <LockedEditor data={block.data} onChange={onChange as (d: LockedBlock["data"]) => void} />;
  }
}
