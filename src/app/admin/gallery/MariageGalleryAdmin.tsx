"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import type { MariageGalleryContent, MariageGalleryCategory, MariageGalleryImage } from "@/lib/content";
import { useAdminContent } from "@/hooks/useAdminContent";
import TextField from "@/components/admin/fields/TextField";
import { newBlockId } from "@/lib/blocks/types";
import { useSortableStyle } from "@/lib/hooks/useSortableStyle";
import { useBackfillIds } from "@/lib/hooks/useBackfillIds";
import DragHandle from "@/components/ui/DragHandle";
import DeleteButton from "@/components/ui/DeleteButton";
import { AdminLoadingState, AdminErrorState } from "@/components/admin/AdminLoadingState";
import MediaUploadButton from "@/components/admin/MediaUploadButton";

// ─── Helpers ─────────────────────────────────────────────────────────────────
/** Ensure every category and image has a stable id (generated if missing). */
function ensureIds(content: MariageGalleryContent): MariageGalleryContent {
  return {
    ...content,
    categories: content.categories.map((cat) => ({
      ...cat,
      id: cat.id || newBlockId(),
      images: cat.images.map((img) => ({ ...img, id: img.id || newBlockId() })),
    })),
  };
}

/** Cover of a category = first image, or undefined if empty. */
function coverOf(cat: MariageGalleryCategory): string | undefined {
  return cat.images[0]?.src;
}

// ─── Sortable photo card ─────────────────────────────────────────────────────
function SortablePhotoCard({
  image,
  onAltChange,
  onDelete,
}: {
  image: MariageGalleryImage;
  onAltChange: (alt: string) => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging, style } = useSortableStyle(image.id!);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative rounded-lg overflow-hidden border ${
        isDragging ? "border-[#C9A96E] shadow-lg" : "border-[#E8E0D4]"
      }`}
    >
      {/* Drag handle = the whole image (cursor-grab on hover) */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image.src} alt={image.alt} className="w-full aspect-[4/3] object-cover" />
      </div>

      {/* Delete button — top right corner, always visible */}
      <DeleteButton
        onDelete={onDelete}
        variant="filled"
        size="sm"
        icon="x"
        className="absolute top-2 right-2 z-10"
        title="Supprimer cette photo"
      />

      {/* Alt text input */}
      <input
        type="text"
        value={image.alt}
        onChange={(e) => onAltChange(e.target.value)}
        placeholder="Texte alternatif"
        className="w-full px-2 py-1 text-xs border-t border-[#E8E0D4] bg-white text-[#2C2C2C] focus:outline-none focus:ring-1 focus:ring-[#C9A96E]"
      />
    </div>
  );
}

// ─── Sortable category card ──────────────────────────────────────────────────
function SortableCategoryCard({
  category,
  isExpanded,
  onToggleExpand,
  onUpdate,
  onDelete,
}: {
  category: MariageGalleryCategory;
  isExpanded: boolean;
  onToggleExpand: () => void;
  onUpdate: (cat: MariageGalleryCategory) => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging, style } = useSortableStyle(category.id!);

  // Photo handlers (operate on this category only)
  const photoSensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handlePhotoDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = category.images.findIndex((img) => img.id === active.id);
    const newIdx = category.images.findIndex((img) => img.id === over.id);
    if (oldIdx === -1 || newIdx === -1) return;
    onUpdate({ ...category, images: arrayMove(category.images, oldIdx, newIdx) });
  };

  const updateImageAlt = (id: string, alt: string) => {
    onUpdate({
      ...category,
      images: category.images.map((img) => (img.id === id ? { ...img, alt } : img)),
    });
  };

  const removeImage = (id: string) => {
    onUpdate({
      ...category,
      images: category.images.filter((img) => img.id !== id),
    });
  };

  const addImage = (src: string) => {
    onUpdate({
      ...category,
      images: [...category.images, { id: newBlockId(), src, alt: category.title }],
    });
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-xl border overflow-hidden ${
        isDragging ? "border-[#C9A96E] shadow-lg" : "border-[#E8E0D4] shadow-sm"
      }`}
    >
      {/* Category header */}
      <div className="flex items-center gap-3 p-4">
        {/* Drag handle */}
        <DragHandle {...attributes} {...listeners} />

        {/* Cover thumbnail = first image of the category */}
        {coverOf(category) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverOf(category)}
            alt={category.title}
            className="w-16 h-12 object-cover rounded-lg border border-[#E8E0D4] shrink-0"
          />
        ) : (
          <div className="w-16 h-12 rounded-lg border border-dashed border-[#E8E0D4] bg-[#FAF7F2] shrink-0 flex items-center justify-center">
            <svg className="w-5 h-5 text-[#6B6560]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
            </svg>
          </div>
        )}

        {/* Title + count (clickable to expand) */}
        <button type="button" onClick={onToggleExpand} className="flex-1 text-left min-w-0">
          <h3 className="font-semibold text-[#2C2C2C] truncate">{category.title}</h3>
          <p className="text-xs text-[#6B6560]">{category.images.length} photos</p>
        </button>

        {/* Expand toggle */}
        <button
          type="button"
          onClick={onToggleExpand}
          className="p-1.5 rounded-lg text-[#6B6560] hover:text-[#2C2C2C] hover:bg-[#FAF7F2] transition-colors"
          title={isExpanded ? "Replier" : "Déplier"}
        >
          <svg
            className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        {/* Delete category */}
        <DeleteButton
          onDelete={onDelete}
          confirmMessage={`Supprimer la catégorie « ${category.title} » et ses ${category.images.length} photo(s) ?`}
          title="Supprimer cette catégorie"
        />
      </div>

      {/* Body — expanded */}
      {isExpanded && (
        <div className="border-t border-[#E8E0D4] p-6 space-y-6">
          {/* Title */}
          <TextField
            label="Nom de la catégorie"
            value={category.title}
            onChange={(v) => onUpdate({ ...category, title: v })}
          />

          {/* Photos */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[#2C2C2C]">Photos ({category.images.length})</h4>
            <p className="text-xs text-[#6B6560]">
              Glissez-déposez les photos pour réordonner. La <strong>première photo</strong> est utilisée comme couverture de la catégorie. Cliquez sur la croix en haut à droite pour supprimer.
            </p>

            {category.images.length > 0 && (
              <DndContext
                sensors={photoSensors}
                collisionDetection={closestCenter}
                onDragEnd={handlePhotoDragEnd}
              >
                <SortableContext
                  items={category.images.map((img) => img.id!)}
                  strategy={rectSortingStrategy}
                >
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {category.images.map((img) => (
                      <SortablePhotoCard
                        key={img.id}
                        image={img}
                        onAltChange={(alt) => updateImageAlt(img.id!, alt)}
                        onDelete={() => removeImage(img.id!)}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            )}

            {/* Upload button + URL input on the same line */}
            <div className="flex items-center gap-2 pt-2">
              <MediaUploadButton accept="image" category="mariage" alt={category.title} onUploaded={addImage} />
              <input
                type="text"
                placeholder="Ou coller une URL d'image et appuyer Entrée…"
                className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-[#E8E0D4] bg-white text-[#2C2C2C] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E]"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const val = (e.target as HTMLInputElement).value.trim();
                    if (val) {
                      addImage(val);
                      (e.target as HTMLInputElement).value = "";
                    }
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main editor ─────────────────────────────────────────────────────────────
export default function MariageGalleryAdmin() {
  const {
    data,
    setData,
    previousData,
    isLoading,
    isSaving,
    success,
    error,
    handleSave,
    handleRevert,
  } = useAdminContent<MariageGalleryContent>("content_mariage_gallery");

  const [expandedCatId, setExpandedCatId] = useState<string | null>(null);

  // Backfill missing ids as soon as data loads (avoids ephemeral id race
  // conditions in @dnd-kit). The hook handles the useEffect + idempotent
  // backfill internally.
  useBackfillIds(
    data,
    (d) => d.categories.some((c) => !c.id || c.images.some((i) => !i.id)),
    ensureIds,
    setData
  );

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  if (isLoading) return <AdminLoadingState />;
  if (!data) return <AdminErrorState />;

  // If backfill hasn't completed yet, hold off on rendering the sortable list.
  // The useEffect above will trigger setData(ensureIds(...)) which causes a
  // re-render with ids in place.
  const allIdsPresent = data.categories.every(
    (c) => c.id && c.images.every((i) => i.id)
  );
  if (!allIdsPresent) {
    return <AdminLoadingState message="Préparation de l'éditeur..." />;
  }

  // From here on, all categories and images have stable ids.
  const categories = data.categories;

  const handleCategoriesDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = categories.findIndex((c) => c.id === active.id);
    const newIdx = categories.findIndex((c) => c.id === over.id);
    if (oldIdx === -1 || newIdx === -1) return;
    setData({ ...data, categories: arrayMove(categories, oldIdx, newIdx) });
  };

  const updateCategory = (updated: MariageGalleryCategory) => {
    setData({
      ...data,
      categories: categories.map((c) => (c.id === updated.id ? updated : c)),
    });
  };

  const removeCategory = (id: string) => {
    setData({
      ...data,
      categories: categories.filter((c) => c.id !== id),
    });
    if (expandedCatId === id) setExpandedCatId(null);
  };

  const addCategory = () => {
    const newCat: MariageGalleryCategory = {
      id: newBlockId(),
      title: "Nouvelle catégorie",
      images: [],
    };
    setData({ ...data, categories: [...categories, newCat] });
    setExpandedCatId(newCat.id!);
  };

  return (
    <div className="space-y-6">
      {/* Save/Revert bar */}
      <div className="flex items-center justify-between">
        <a href="/mariage" target="_blank" className="text-sm text-[#C9A96E] hover:underline">
          Voir la page mariage →
        </a>
        <div className="flex gap-2">
          {previousData && (
            <button
              onClick={handleRevert}
              className="px-4 py-2 text-sm rounded-lg border border-[#E8E0D4] text-[#6B6560] hover:bg-[#FAF7F2]"
            >
              Annuler
            </button>
          )}
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="px-4 py-2 text-sm rounded-lg bg-[#C9A96E] text-white hover:bg-[#b8984f] disabled:opacity-50"
          >
            {isSaving ? "Sauvegarde..." : "Sauvegarder"}
          </button>
        </div>
      </div>

      {success && (
        <div className="p-3 rounded-lg bg-[#8A9A7B]/10 border border-[#8A9A7B]/30 text-[#8A9A7B] text-sm">
          {success}
        </div>
      )}
      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">{error}</div>
      )}

      <p className="text-sm text-[#6B6560]">
        Glissez-déposez les catégories pour réordonner. Cliquez pour déplier et éditer.
      </p>

      {/* Categories — sortable list */}
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleCategoriesDragEnd}>
        <SortableContext
          items={categories.map((c) => c.id!)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-4">
            {categories.map((cat) => (
              <SortableCategoryCard
                key={cat.id}
                category={cat}
                isExpanded={expandedCatId === cat.id}
                onToggleExpand={() =>
                  setExpandedCatId(expandedCatId === cat.id ? null : cat.id!)
                }
                onUpdate={updateCategory}
                onDelete={() => removeCategory(cat.id!)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      {/* Add category */}
      <button
        type="button"
        onClick={addCategory}
        className="w-full py-4 rounded-xl border-2 border-dashed border-[#E8E0D4] text-[#C9A96E] hover:border-[#C9A96E] hover:bg-[#C9A96E]/5 transition-all text-sm font-medium"
      >
        + Ajouter une catégorie
      </button>
    </div>
  );
}
