// Shared loading / error placeholder for admin pages.
// Replaces the same `<div className="flex items-center justify-center h-64">…`
// boilerplate that was duplicated across 6+ admin pages.

interface MessageProps {
  message?: string;
}

export function AdminLoadingState({ message = "Chargement..." }: MessageProps) {
  return (
    <div className="flex items-center justify-center h-64">
      <p className="text-[#6B6560]">{message}</p>
    </div>
  );
}

export function AdminErrorState({ message = "Impossible de charger le contenu." }: MessageProps) {
  return (
    <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
      {message}
    </div>
  );
}
