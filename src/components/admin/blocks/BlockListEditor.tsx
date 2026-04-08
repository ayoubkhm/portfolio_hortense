"use client";

// Drag-and-drop list editor for blocks. Each block is a collapsible card with:
// - drag handle (left)
// - block type label + summary line
// - expand/collapse toggle
// - delete button
// - body: per-type editor form (when expanded)
//
// Plus an "+ Add block" menu at the bottom that lets the user pick a block
// type to insert.

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
} from "@dnd-kit/sortable";
import type { Block, BlockType } from "@/lib/blocks/types";
import { newBlockId } from "@/lib/blocks/types";
import { BLOCK_REGISTRY, getBlockMeta } from "@/lib/blocks/registry";
import { listLockedRenderers, getLockedRenderer } from "@/lib/blocks/locked-renderers";
import { useSortableStyle } from "@/lib/hooks/useSortableStyle";
import DragHandle from "@/components/ui/DragHandle";
import DeleteButton from "@/components/ui/DeleteButton";
import BlockEditor from "./BlockEditors";

interface BlockListEditorProps {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
  expandedIds: Set<string>;
  onExpandedChange: (ids: Set<string>) => void;
}

// ─── Sortable card wrapper ───────────────────────────────────────────────────
function SortableBlockCard({
  block,
  onUpdate,
  onDelete,
  isExpanded,
  onToggleExpand,
}: {
  block: Block;
  onUpdate: (data: Block["data"]) => void;
  onDelete: () => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}) {
  const { attributes, listeners, setNodeRef, isDragging, style } = useSortableStyle(block.id);

  // Locked blocks have their meta in a separate registry; everything else is in BLOCK_REGISTRY
  const label =
    block.type === "locked"
      ? getLockedRenderer(block.data.rendererKey)?.label || "Section non modifiable"
      : getBlockMeta(block.type).label;
  const isLocked = block.type === "locked";
  const summary = getBlockSummary(block);

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-xl border transition-all ${
        isDragging ? "border-[#C9A96E] shadow-lg" : "border-[#E8E0D4] shadow-sm"
      }`}
    >
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3">
        {/* Drag handle */}
        <DragHandle {...attributes} {...listeners} />

        {/* Type label + summary */}
        <button
          type="button"
          onClick={onToggleExpand}
          className="flex-1 min-w-0 text-left"
        >
          <div className="flex items-center gap-2">
            {isLocked && (
              <svg className="w-3.5 h-3.5 text-[#6B6560]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
            )}
            <span className={`text-xs font-semibold uppercase tracking-wider ${isLocked ? "text-[#6B6560]" : "text-[#C9A96E]"}`}>
              {label}
            </span>
          </div>
          {summary && (
            <p className="text-sm text-[#2C2C2C] truncate mt-0.5">{summary}</p>
          )}
        </button>

        {/* Expand/collapse toggle */}
        <button
          type="button"
          onClick={onToggleExpand}
          className="p-1.5 rounded-lg text-[#6B6560] hover:text-[#2C2C2C] hover:bg-[#FAF7F2] transition-colors"
          title={isExpanded ? "Replier" : "Déplier"}
        >
          <svg className={`w-5 h-5 transition-transform ${isExpanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </button>

        {/* Delete */}
        <DeleteButton
          onDelete={onDelete}
          confirmMessage={`Supprimer ce bloc « ${label} » ? Cette action est irréversible (jusqu'à ce que vous annuliez ou rechargiez la page).`}
          title="Supprimer ce bloc"
        />
      </div>

      {/* Body (editor) */}
      {isExpanded && (
        <div className="px-4 pb-4 pt-2 border-t border-[#E8E0D4]">
          <BlockEditor block={block} onChange={onUpdate} />
        </div>
      )}
    </div>
  );
}

// ─── Add block menu ──────────────────────────────────────────────────────────
function AddBlockMenu({
  onAdd,
  onAddLocked,
}: {
  onAdd: (type: BlockType) => void;
  onAddLocked: (rendererKey: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const lockedRenderers = listLockedRenderers();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border-2 border-dashed border-[#E8E0D4] text-[#6B6560] hover:border-[#C9A96E] hover:text-[#C9A96E] hover:bg-[#FAF7F2] transition-all font-medium"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Ajouter un bloc
      </button>

      {isOpen && (
        <>
          {/* Backdrop pour fermer en cliquant ailleurs */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute z-20 top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-xl border border-[#E8E0D4] overflow-hidden max-h-[60vh] overflow-y-auto">
            {/* Editable blocks */}
            <div className="px-3 pt-3 pb-1">
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6560]">Blocs éditables</p>
            </div>
            <div className="px-2 pb-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {BLOCK_REGISTRY.map((meta) => (
                <button
                  key={meta.type}
                  type="button"
                  onClick={() => {
                    onAdd(meta.type);
                    setIsOpen(false);
                  }}
                  className="text-left p-3 rounded-lg hover:bg-[#FAF7F2] transition-colors border border-transparent hover:border-[#E8E0D4]"
                >
                  <p className="text-sm font-semibold text-[#2C2C2C]">{meta.label}</p>
                  <p className="text-xs text-[#6B6560] mt-1 leading-snug">{meta.description}</p>
                </button>
              ))}
            </div>

            {/* Locked / non-editable sections */}
            {lockedRenderers.length > 0 && (
              <>
                <div className="px-3 pt-3 pb-1 border-t border-[#E8E0D4]">
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#6B6560] flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                    </svg>
                    Sections non modifiables
                  </p>
                </div>
                <div className="px-2 pb-2 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {lockedRenderers.map((renderer) => (
                    <button
                      key={renderer.key}
                      type="button"
                      onClick={() => {
                        onAddLocked(renderer.key);
                        setIsOpen(false);
                      }}
                      className="text-left p-3 rounded-lg hover:bg-[#FAF7F2] transition-colors border border-transparent hover:border-[#E8E0D4]"
                    >
                      <p className="text-sm font-semibold text-[#2C2C2C]">{renderer.label}</p>
                      <p className="text-xs text-[#6B6560] mt-1 leading-snug">{renderer.description}</p>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}

// ─── Main editor ─────────────────────────────────────────────────────────────
export default function BlockListEditor({
  blocks,
  onChange,
  expandedIds,
  onExpandedChange,
}: BlockListEditorProps) {
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = blocks.findIndex((b) => b.id === active.id);
    const newIndex = blocks.findIndex((b) => b.id === over.id);
    if (oldIndex === -1 || newIndex === -1) return;
    onChange(arrayMove(blocks, oldIndex, newIndex));
  };

  const updateBlock = (id: string, data: Block["data"]) => {
    onChange(
      blocks.map((b) => (b.id === id ? ({ ...b, data } as Block) : b))
    );
  };

  const deleteBlock = (id: string) => {
    onChange(blocks.filter((b) => b.id !== id));
    // Also remove from expanded set so we don't keep stale entries
    if (expandedIds.has(id)) {
      const next = new Set(expandedIds);
      next.delete(id);
      onExpandedChange(next);
    }
  };

  const addBlock = (type: BlockType) => {
    const meta = getBlockMeta(type);
    const newBlock = {
      id: newBlockId(),
      type,
      data: meta.defaultData(),
    } as Block;
    onChange([...blocks, newBlock]);
    // Auto-expand the newly created block
    const next = new Set(expandedIds);
    next.add(newBlock.id);
    onExpandedChange(next);
  };

  const addLockedBlock = (rendererKey: string) => {
    const newBlock: Block = {
      id: newBlockId(),
      type: "locked",
      data: { rendererKey },
    };
    onChange([...blocks, newBlock]);
    // Auto-expand so user immediately sees the "non modifiable" message
    const next = new Set(expandedIds);
    next.add(newBlock.id);
    onExpandedChange(next);
  };

  const toggleExpand = (id: string) => {
    const next = new Set(expandedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    onExpandedChange(next);
  };

  return (
    <div className="space-y-4">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={blocks.map((b) => b.id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {blocks.map((block) => (
              <SortableBlockCard
                key={block.id}
                block={block}
                isExpanded={expandedIds.has(block.id)}
                onToggleExpand={() => toggleExpand(block.id)}
                onUpdate={(data) => updateBlock(block.id, data)}
                onDelete={() => deleteBlock(block.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <AddBlockMenu onAdd={addBlock} onAddLocked={addLockedBlock} />
    </div>
  );
}

// ─── Helper : extract a one-line summary from a block for the card header ──
function getBlockSummary(block: Block): string {
  switch (block.type) {
    case "hero":
      return block.data.title;
    case "video-hero":
      return block.data.title;
    case "paragraphs":
      return block.data.paragraphs[0]?.slice(0, 80) || "(vide)";
    case "gallery":
      return block.data.heading;
    case "videos":
      return `${block.data.heading} — ${block.data.videos.length} vidéo(s)`;
    case "pricing":
      return `${block.data.heading} — ${block.data.plans.length} formule(s)`;
    case "faq":
      return `${block.data.heading} — ${block.data.items.length} question(s)`;
    case "summary":
      return `${block.data.heading} — ${block.data.items.length} point(s)`;
    case "steps":
      return `${block.data.heading} — ${block.data.steps.length} étape(s)`;
    case "certifications":
      return `${block.data.heading} — ${block.data.items.length} certification(s)`;
    case "cta":
      return block.data.title;
    case "image-text":
      return block.data.heading || block.data.paragraphs[0]?.slice(0, 80) || "(vide)";
    case "quote":
      return block.data.text.slice(0, 80);
    case "link-cards":
      return `${block.data.heading} — ${block.data.cards.length} card(s)`;
    case "testimonials":
      return `${block.data.heading} — ${block.data.items.length} témoignage(s)`;
    case "locked": {
      const renderer = getLockedRenderer(block.data.rendererKey);
      return renderer?.label || `Section : ${block.data.rendererKey}`;
    }
  }
}
