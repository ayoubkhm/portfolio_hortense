"use client";

// Drone gallery admin: list of items, each = thumbnail + video + alt.
// Drag-and-drop to reorder, upload media via /api/media.
//
// The model is intentionally different from the mariage gallery: no categories,
// just a flat list, but each item carries an associated video that opens in a
// modal on the public /drone page.

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
  rectSortingStrategy,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import type { DroneGalleryContent, DroneGalleryItem } from "@/lib/content";
import { useAdminContent } from "@/hooks/useAdminContent";
import { newBlockId } from "@/lib/blocks/types";
import { useSortableStyle } from "@/lib/hooks/useSortableStyle";
import { useBackfillIds } from "@/lib/hooks/useBackfillIds";
import DragHandle from "@/components/ui/DragHandle";
import DeleteButton from "@/components/ui/DeleteButton";
import { AdminLoadingState, AdminErrorState } from "@/components/admin/AdminLoadingState";
import MediaUploadButton from "@/components/admin/MediaUploadButton";

// ─── Helpers ─────────────────────────────────────────────────────────────────
function ensureIds(content: DroneGalleryContent): DroneGalleryContent {
  return {
    ...content,
    items: content.items.map((it) => ({ ...it, id: it.id || newBlockId() })),
  };
}

// ─── Sortable grid tile (compact view) ──────────────────────────────────────
function SortableGridTile({
  item,
  onClick,
  onDelete,
}: {
  item: DroneGalleryItem;
  onClick: () => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging, style } = useSortableStyle(item.id);

  const hasVideo = item.video && item.video.trim() !== "";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group relative rounded-lg overflow-hidden border ${
        isDragging ? "border-[#C9A96E] shadow-lg ring-2 ring-[#C9A96E]/30" : "border-[#E8E0D4]"
      }`}
    >
      {/* Drag handle = the whole image */}
      <div
        {...attributes}
        {...listeners}
        className="cursor-grab active:cursor-grabbing"
      >
        {item.thumbnail ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={item.thumbnail} alt={item.alt} className="w-full aspect-[4/3] object-cover" />
        ) : (
          <div className="w-full aspect-[4/3] bg-[#FAF7F2] flex items-center justify-center">
            <svg className="w-10 h-10 text-[#6B6560]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Z" />
            </svg>
          </div>
        )}
      </div>

      {/* Video status badge — top-left */}
      <div
        className={`absolute top-2 left-2 inline-flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider shadow-sm ${
          hasVideo
            ? "bg-green-100 text-green-800 border border-green-300"
            : "bg-amber-100 text-amber-800 border border-amber-300"
        }`}
      >
        {hasVideo ? (
          <>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
            </svg>
            Vidéo
          </>
        ) : (
          <>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
            </svg>
            Manquante
          </>
        )}
      </div>

      {/* Delete button — top-right */}
      <DeleteButton
        onDelete={onDelete}
        confirmMessage="Supprimer cet item ?"
        variant="filled"
        size="sm"
        icon="x"
        stopPropagation
        className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100"
        title="Supprimer"
      />

      {/* Edit button — appears on hover, click to switch to list view */}
      <button
        type="button"
        onClick={onClick}
        className="absolute inset-x-0 bottom-0 px-3 py-2 bg-gradient-to-t from-black/90 via-black/60 to-transparent text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-between"
      >
        <span className="truncate flex-1 text-left">{item.alt || "(sans légende)"}</span>
        <svg className="w-3.5 h-3.5 ml-2 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
        </svg>
      </button>
    </div>
  );
}

// ─── Sortable item card ──────────────────────────────────────────────────────
function SortableDroneItemCard({
  item,
  onUpdate,
  onDelete,
}: {
  item: DroneGalleryItem;
  onUpdate: (it: DroneGalleryItem) => void;
  onDelete: () => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging, style } = useSortableStyle(item.id);

  const hasVideo = item.video && item.video.trim() !== "";

  return (
    <div
      ref={setNodeRef}
      style={style}
      data-item-id={item.id}
      className={`bg-white rounded-xl border overflow-hidden scroll-mt-24 ${
        isDragging ? "border-[#C9A96E] shadow-lg" : "border-[#E8E0D4] shadow-sm"
      }`}
    >
      <div className="flex items-start gap-4 p-4">
        {/* Drag handle */}
        <DragHandle {...attributes} {...listeners} className="mt-1" />

        {/* Thumbnail */}
        <div className="shrink-0 space-y-2">
          {item.thumbnail ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={item.thumbnail}
              alt={item.alt}
              className="w-32 h-24 object-cover rounded-lg border border-[#E8E0D4]"
            />
          ) : (
            <div className="w-32 h-24 rounded-lg border border-dashed border-[#E8E0D4] bg-[#FAF7F2] flex items-center justify-center">
              <svg className="w-7 h-7 text-[#6B6560]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
              </svg>
            </div>
          )}
          <MediaUploadButton
            accept="image"
            category="drone"
            alt={item.alt}
            size="sm"
            label={(uploading) => (uploading ? "Upload…" : "Changer l'image")}
            onUploaded={(path) => onUpdate({ ...item, thumbnail: path })}
          />
        </div>

        {/* Right side: alt + video */}
        <div className="flex-1 min-w-0 space-y-3">
          {/* Alt text */}
          <div>
            <label className="block text-xs font-medium text-[#2C2C2C] mb-1">Légende</label>
            <input
              type="text"
              value={item.alt}
              onChange={(e) => onUpdate({ ...item, alt: e.target.value })}
              placeholder="Ex: Survol du Cap-Ferret"
              className="w-full px-3 py-2 rounded-lg border border-[#E8E0D4] bg-white text-[#2C2C2C] text-sm focus:outline-none focus:ring-2 focus:ring-[#C9A96E]"
            />
          </div>

          {/* Video */}
          <div>
            <label className="block text-xs font-medium text-[#2C2C2C] mb-1">Vidéo associée</label>
            {hasVideo ? (
              <div className="space-y-2">
                <video
                  key={item.video}
                  controls
                  muted
                  className="w-full max-w-md rounded-lg border border-[#E8E0D4] bg-black"
                >
                  <source src={item.video} />
                </video>
                <div className="flex items-center gap-2">
                  <MediaUploadButton
                    accept="video"
                    category="drone"
                    alt={item.alt}
                    label={(uploading) => (uploading ? "Upload de la vidéo…" : "Remplacer la vidéo")}
                    onUploaded={(path) => onUpdate({ ...item, video: path })}
                  />
                  <button
                    type="button"
                    onClick={() => onUpdate({ ...item, video: "" })}
                    className="px-3 py-2 text-xs text-red-600 hover:text-red-700 hover:underline transition-colors"
                  >
                    Retirer la vidéo
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-start gap-2 p-3 rounded-lg border border-amber-200 bg-amber-50">
                  <svg className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                  </svg>
                  <p className="text-xs text-amber-800">
                    <strong>Vidéo manquante.</strong> En attendant, le site affichera l&apos;image avec un placeholder « Vidéo bientôt disponible ».
                  </p>
                </div>
                <MediaUploadButton
                  accept="video"
                  category="drone"
                  alt={item.alt}
                  label={(uploading) => (uploading ? "Upload de la vidéo…" : "Uploader la vidéo")}
                  onUploaded={(path) => onUpdate({ ...item, video: path })}
                />
              </div>
            )}
          </div>
        </div>

        {/* Delete */}
        <DeleteButton
          onDelete={onDelete}
          confirmMessage="Supprimer cet item ? Cette action est irréversible (jusqu'à annulation ou rechargement)."
          title="Supprimer cet item"
        />
      </div>
    </div>
  );
}

// ─── Main editor ─────────────────────────────────────────────────────────────
export default function DroneGalleryAdmin() {
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
  } = useAdminContent<DroneGalleryContent>("content_drone_gallery");

  // Vue mode : "list" = cards détaillées éditables / "grid" = mosaïque compacte
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");

  // Backfill missing ids as soon as data loads (avoids ephemeral id race in dnd-kit)
  useBackfillIds(
    data,
    (d) => d.items.some((it) => !it.id),
    ensureIds,
    setData
  );

  // Switch to list view + scroll to a specific item (after a frame so the
  // list has time to render the card before we try to find it).
  const switchToListAndScroll = (itemId: string) => {
    setViewMode("list");
    requestAnimationFrame(() => {
      const el = document.querySelector(`[data-item-id="${itemId}"]`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
        // Highlight briefly
        el.classList.add("ring-2", "ring-[#C9A96E]");
        setTimeout(() => el.classList.remove("ring-2", "ring-[#C9A96E]"), 1500);
      }
    });
  };

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  if (isLoading) return <AdminLoadingState />;
  if (!data) return <AdminErrorState />;

  // Block render until backfill is done (avoids unstable ids in dnd-kit)
  const allIdsPresent = data.items.every((it) => it.id);
  if (!allIdsPresent) {
    return <AdminLoadingState message="Préparation de l'éditeur..." />;
  }

  const items = data.items;
  const itemsWithoutVideo = items.filter((it) => !it.video || it.video.trim() === "").length;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIdx = items.findIndex((it) => it.id === active.id);
    const newIdx = items.findIndex((it) => it.id === over.id);
    if (oldIdx === -1 || newIdx === -1) return;
    setData({ ...data, items: arrayMove(items, oldIdx, newIdx) });
  };

  const updateItem = (updated: DroneGalleryItem) => {
    setData({
      ...data,
      items: items.map((it) => (it.id === updated.id ? updated : it)),
    });
  };

  const removeItem = (id: string) => {
    setData({ ...data, items: items.filter((it) => it.id !== id) });
  };

  const addItem = () => {
    const newItem: DroneGalleryItem = {
      id: newBlockId(),
      thumbnail: "",
      video: "",
      alt: "",
    };
    setData({ ...data, items: [...items, newItem] });
  };

  return (
    <div className="space-y-6">
      {/* Save/Revert bar */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <a href="/drone" target="_blank" className="text-sm text-[#C9A96E] hover:underline">
            Voir la page drone →
          </a>
        </div>
        <div className="flex items-center gap-2">
          {/* View mode toggle */}
          <div className="flex rounded-lg border border-[#E8E0D4] overflow-hidden">
            <button
              type="button"
              onClick={() => setViewMode("list")}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${
                viewMode === "list"
                  ? "bg-[#2C2C2C] text-white"
                  : "bg-white text-[#6B6560] hover:bg-[#FAF7F2]"
              }`}
              title="Vue liste détaillée"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
              <span className="hidden sm:inline">Liste</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium transition-colors ${
                viewMode === "grid"
                  ? "bg-[#2C2C2C] text-white"
                  : "bg-white text-[#6B6560] hover:bg-[#FAF7F2]"
              }`}
              title="Vue grille compacte"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25A2.25 2.25 0 0 1 13.5 18v-2.25Z" />
              </svg>
              <span className="hidden sm:inline">Grille</span>
            </button>
          </div>

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

      {/* Stats / hint */}
      <div className="space-y-1">
        <p className="text-sm text-[#6B6560]">
          Glissez-déposez les items pour réordonner. Chaque item est composé d&apos;une <strong>image</strong> (miniature) et d&apos;une <strong>vidéo</strong> qui s&apos;ouvre dans la modale au click sur la page drone.
        </p>
        {itemsWithoutVideo > 0 && (
          <p className="text-xs text-amber-700">
            ⚠️ {itemsWithoutVideo} item(s) sans vidéo — à compléter pour un rendu optimal.
          </p>
        )}
      </div>

      {/* Items list */}
      {items.length === 0 ? (
        <div className="p-12 rounded-xl border-2 border-dashed border-[#E8E0D4] text-center">
          <p className="text-sm text-[#6B6560]">
            Aucun item drone pour le moment. Cliquez sur « Ajouter un item » ci-dessous pour commencer.
          </p>
        </div>
      ) : viewMode === "list" ? (
        // ─── Vue liste détaillée ─────────────────────────────────────────────
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map((it) => it.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-3">
              {items.map((it) => (
                <SortableDroneItemCard
                  key={it.id}
                  item={it}
                  onUpdate={updateItem}
                  onDelete={() => removeItem(it.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      ) : (
        // ─── Vue grille compacte ─────────────────────────────────────────────
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
          <SortableContext items={items.map((it) => it.id)} strategy={rectSortingStrategy}>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {items.map((it) => (
                <SortableGridTile
                  key={it.id}
                  item={it}
                  onClick={() => switchToListAndScroll(it.id)}
                  onDelete={() => removeItem(it.id)}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}

      {/* Add item */}
      <button
        type="button"
        onClick={addItem}
        className="w-full py-4 rounded-xl border-2 border-dashed border-[#E8E0D4] text-[#C9A96E] hover:border-[#C9A96E] hover:bg-[#C9A96E]/5 transition-all text-sm font-medium"
      >
        + Ajouter un item drone
      </button>
    </div>
  );
}
