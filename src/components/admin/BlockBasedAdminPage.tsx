"use client";

// Generic admin page for any block-based content key. Replaces the
// 100-line boilerplate that was duplicated across /admin/{mariage,drone,
// accueil,a-propos}/page.tsx — those become 10-line wrappers around this.

import { useState } from "react";
import { useAdminContent } from "@/hooks/useAdminContent";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import BlockListEditor from "@/components/admin/blocks/BlockListEditor";
import { AdminLoadingState, AdminErrorState } from "@/components/admin/AdminLoadingState";
import type { BlockPageContent, Block } from "@/lib/blocks/types";

interface BlockBasedAdminPageProps {
  contentKey: string;
  title: string;
  subtitle: string;
  previewHref: string;
}

export default function BlockBasedAdminPage({
  contentKey,
  title,
  subtitle,
  previewHref,
}: BlockBasedAdminPageProps) {
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
  } = useAdminContent<BlockPageContent>(contentKey);

  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  if (isLoading) return <AdminLoadingState />;
  if (!data) return <AdminErrorState />;

  const handleBlocksChange = (blocks: Block[]) => {
    setData({ ...data, blocks });
  };

  const anyExpanded = expandedIds.size > 0;
  const toggleAll = () => {
    setExpandedIds(anyExpanded ? new Set() : new Set(data.blocks.map((b) => b.id)));
  };
  const toggleAllLabel = anyExpanded ? "Tout fermer" : "Tout ouvrir";

  const toggleAllButton = (
    <button
      type="button"
      onClick={toggleAll}
      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-[#2C2C2C] bg-white border border-[#E8E0D4] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all"
      title={toggleAllLabel}
    >
      {anyExpanded ? (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 18.75 7.5-7.5 7.5 7.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 7.5-7.5 7.5 7.5" />
        </svg>
      ) : (
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 5.25-7.5 7.5-7.5-7.5" />
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 11.25-7.5 7.5-7.5-7.5" />
        </svg>
      )}
      <span className="hidden sm:inline">{toggleAllLabel}</span>
    </button>
  );

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title={title}
        subtitle={subtitle}
        previewHref={previewHref}
        isSaving={isSaving}
        onSave={handleSave}
        onRevert={previousData ? handleRevert : null}
        extraActions={toggleAllButton}
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

      <BlockListEditor
        blocks={data.blocks}
        onChange={handleBlocksChange}
        expandedIds={expandedIds}
        onExpandedChange={setExpandedIds}
      />
    </div>
  );
}
