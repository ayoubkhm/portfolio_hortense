"use client";

interface AdminPageHeaderProps {
  title: string;
  subtitle: string;
  previewHref: string;
  isSaving: boolean;
  onSave: () => void;
  onRevert: (() => void) | null; // null = no previous state to revert to
}

export default function AdminPageHeader({
  title,
  subtitle,
  previewHref,
  isSaving,
  onSave,
  onRevert,
}: AdminPageHeaderProps) {
  return (
    <div className="sticky top-0 z-30 bg-[#FAF7F2]/95 backdrop-blur-sm border-b border-[#E8E0D4] -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 mb-6">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <h1 className="text-xl font-semibold text-[#2C2C2C] truncate">{title}</h1>
          <p className="text-sm text-[#6B6560] hidden sm:block">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {/* Revert button */}
          {onRevert && (
            <button
              onClick={onRevert}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-[#6B6560] hover:text-[#2C2C2C] hover:bg-[#E8E0D4] transition-all"
              title="Revenir à la version précédente"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
              </svg>
              <span className="hidden sm:inline">Annuler</span>
            </button>
          )}
          {/* Preview button */}
          <a
            href={previewHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm text-[#2C2C2C] bg-white border border-[#E8E0D4] hover:border-[#C9A96E] hover:text-[#C9A96E] transition-all"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <span className="hidden sm:inline">Aperçu</span>
          </a>
          {/* Save button */}
          <button
            onClick={onSave}
            disabled={isSaving}
            className="flex items-center gap-1.5 bg-[#C9A96E] text-white px-4 py-2 rounded-lg hover:bg-[#b8984f] transition-all disabled:opacity-50 font-medium text-sm"
          >
            {isSaving ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span className="hidden sm:inline">Sauvegarde...</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                Sauvegarder
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
