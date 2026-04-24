"use client";

import { useState, useEffect, useCallback } from "react";

interface GoogleReview {
  id: string;
  externalId: string;
  authorName: string;
  authorPhoto: string;
  authorUrl: string;
  rating: number;
  text: string;
  language: string;
  publishedAt: string;
  hidden: boolean;
  createdAt: string;
}

export default function AdminGoogleReviewsPage() {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [error, setError] = useState("");
  const [syncMessage, setSyncMessage] = useState("");

  const fetchReviews = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/google-reviews");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch {
      setError("Erreur lors du chargement des avis.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const toggleHidden = async (id: string, currentHidden: boolean) => {
    try {
      const res = await fetch(`/api/admin/google-reviews/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hidden: !currentHidden }),
      });
      if (!res.ok) throw new Error();
      setReviews((prev) =>
        prev.map((r) => (r.id === id ? { ...r, hidden: !currentHidden } : r))
      );
    } catch {
      setError("Erreur lors de la mise à jour.");
    }
  };

  const handleSync = async () => {
    setIsSyncing(true);
    setSyncMessage("");
    setError("");
    try {
      const res = await fetch("/api/admin/google-reviews", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Erreur");
      setSyncMessage(
        `Sync OK : ${data.fetched} récupérés, ${data.inserted} nouveaux, ${data.skipped} déjà en DB.`
      );
      await fetchReviews();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur lors de la sync.");
    } finally {
      setIsSyncing(false);
    }
  };

  const visibleCount = reviews.filter((r) => !r.hidden).length;
  const hiddenCount = reviews.length - visibleCount;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#6B6560]">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-semibold text-[#2C2C2C]">Avis Google</h1>
          <p className="mt-1 text-[#6B6560]">
            {reviews.length} avis au total — {visibleCount} affichés sur le site
            {hiddenCount > 0 ? `, ${hiddenCount} masqués` : ""}.
          </p>
          <p className="mt-2 text-xs text-[#6B6560]">
            Sync auto toutes les heures. Cliquez sur « Sync maintenant » pour forcer une mise à jour.
          </p>
        </div>
        <button
          onClick={handleSync}
          disabled={isSyncing}
          className="px-4 py-2 text-sm rounded-lg bg-[#C9A96E] text-white hover:bg-[#b8984f] disabled:opacity-50 transition-colors"
        >
          {isSyncing ? "Sync en cours..." : "Sync maintenant"}
        </button>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}
      {syncMessage && (
        <div className="p-3 rounded-lg bg-green-50 border border-green-200 text-green-700 text-sm">
          {syncMessage}
        </div>
      )}

      {reviews.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-[#E8E0D4] p-12 text-center">
          <p className="text-[#6B6560]">
            Aucun avis pour le moment. Cliquez sur « Sync maintenant » pour récupérer les avis depuis Google.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {reviews.map((r) => (
            <article
              key={r.id}
              className={`bg-white rounded-xl shadow-sm border p-6 transition-opacity ${
                r.hidden ? "border-[#E8E0D4] opacity-50" : "border-[#E8E0D4]"
              }`}
            >
              <div className="flex items-start gap-4">
                {r.authorPhoto ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={r.authorPhoto}
                    alt=""
                    className="w-12 h-12 rounded-full object-cover shrink-0"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#2C2C2C] font-serif shrink-0">
                    {r.authorName.charAt(0)}
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <p className="font-semibold text-[#2C2C2C]">{r.authorName}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="flex" aria-label={`${r.rating} sur 5`}>
                          {[1, 2, 3, 4, 5].map((n) => (
                            <svg
                              key={n}
                              className={`w-3.5 h-3.5 ${
                                n <= r.rating ? "text-[#C9A96E]" : "text-[#E8E0D4]"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.376 2.455a1 1 0 00-.363 1.118l1.287 3.967c.3.921-.755 1.688-1.539 1.118l-3.376-2.454a1 1 0 00-1.176 0l-3.376 2.454c-.784.57-1.838-.197-1.539-1.118l1.287-3.967a1 1 0 00-.363-1.118L2.05 9.394c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
                            </svg>
                          ))}
                        </span>
                        <span className="text-xs text-[#6B6560]">
                          {new Date(r.publishedAt).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleHidden(r.id, r.hidden)}
                      className={`text-xs px-3 py-1.5 rounded-lg transition-colors ${
                        r.hidden
                          ? "bg-[#C9A96E]/20 text-[#C9A96E] hover:bg-[#C9A96E]/30"
                          : "bg-[#E8E0D4]/50 text-[#6B6560] hover:bg-[#E8E0D4]"
                      }`}
                    >
                      {r.hidden ? "Réafficher" : "Masquer"}
                    </button>
                  </div>

                  <p className="mt-3 text-sm text-[#2C2C2C] leading-relaxed whitespace-pre-wrap">
                    {r.text}
                  </p>

                  {r.authorUrl && (
                    <a
                      href={r.authorUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-block text-xs text-[#6B6560] hover:text-[#C9A96E] transition-colors"
                    >
                      Voir le profil Google →
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
