"use client";

import { useState, useEffect, useCallback } from "react";

interface Submission {
  id: string;
  name: string;
  email: string;
  service: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export default function AdminMessagesPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const fetchSubmissions = useCallback(async () => {
    try {
      const res = await fetch("/api/contact/submissions");
      if (!res.ok) throw new Error();
      const data = await res.json();
      setSubmissions(data);
    } catch {
      setError("Erreur lors du chargement des messages.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSubmissions();
  }, [fetchSubmissions]);

  const toggleRead = async (id: string, currentRead: boolean) => {
    try {
      const res = await fetch(`/api/contact/submissions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read: !currentRead }),
      });
      if (!res.ok) throw new Error();
      setSubmissions((prev) =>
        prev.map((s) => (s.id === id ? { ...s, read: !currentRead } : s))
      );
    } catch {
      setError("Erreur lors de la mise à jour.");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/contact/submissions/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error();
      setSubmissions((prev) => prev.filter((s) => s.id !== id));
      setDeleteConfirmId(null);
      if (expandedId === id) setExpandedId(null);
    } catch {
      setError("Erreur lors de la suppression.");
    }
  };

  const unreadCount = submissions.filter((s) => !s.read).length;

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("fr-FR", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-[#6B6560]">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-[#2C2C2C]">Messages</h1>
          {unreadCount > 0 && (
            <span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#C9A96E] text-white">
              {unreadCount} non lu{unreadCount > 1 ? "s" : ""}
            </span>
          )}
        </div>
        <p className="mt-1 text-[#6B6560]">
          {submissions.length} message{submissions.length > 1 ? "s" : ""} au total.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
          {error}
        </div>
      )}

      {submissions.length === 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-[#E8E0D4] p-12 text-center">
          <svg className="mx-auto h-12 w-12 text-[#6B6560]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
          </svg>
          <p className="mt-4 text-[#6B6560]">Aucun message pour le moment.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-[#E8E0D4] overflow-hidden">
          {/* Table header */}
          <div className="hidden md:grid md:grid-cols-[1fr_1fr_1fr_140px_100px_80px] gap-4 px-6 py-3 bg-[#FAF7F2] border-b border-[#E8E0D4] text-xs font-medium text-[#6B6560] uppercase tracking-wider">
            <span>Nom</span>
            <span>Email</span>
            <span>Service</span>
            <span>Date</span>
            <span>Statut</span>
            <span>Actions</span>
          </div>

          {/* Rows */}
          {submissions.map((submission) => (
            <div key={submission.id} className="border-b border-[#E8E0D4] last:border-b-0">
              {/* Row */}
              <div
                className={`grid grid-cols-1 md:grid-cols-[1fr_1fr_1fr_140px_100px_80px] gap-2 md:gap-4 px-6 py-4 cursor-pointer hover:bg-[#FAF7F2]/50 transition-colors ${
                  !submission.read ? "bg-[#C9A96E]/5" : ""
                }`}
                onClick={() => setExpandedId(expandedId === submission.id ? null : submission.id)}
              >
                <span className={`text-sm ${!submission.read ? "font-semibold text-[#2C2C2C]" : "text-[#2C2C2C]"}`}>
                  {submission.name}
                </span>
                <span className="text-sm text-[#6B6560] truncate">{submission.email}</span>
                <span className="text-sm text-[#6B6560]">{submission.service || "—"}</span>
                <span className="text-xs text-[#6B6560]">{formatDate(submission.createdAt)}</span>
                <span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleRead(submission.id, submission.read);
                    }}
                    className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                      submission.read
                        ? "bg-[#E8E0D4]/50 text-[#6B6560] hover:bg-[#E8E0D4]"
                        : "bg-[#C9A96E]/20 text-[#C9A96E] hover:bg-[#C9A96E]/30"
                    }`}
                  >
                    {submission.read ? "Lu" : "Non lu"}
                  </button>
                </span>
                <span className="flex items-center">
                  {deleteConfirmId === submission.id ? (
                    <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                      <button
                        onClick={() => handleDelete(submission.id)}
                        className="text-xs text-red-600 hover:text-red-800 font-medium"
                      >
                        Oui
                      </button>
                      <span className="text-xs text-[#6B6560]">/</span>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="text-xs text-[#6B6560] hover:text-[#2C2C2C]"
                      >
                        Non
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirmId(submission.id);
                      }}
                      className="p-1 text-red-400 hover:text-red-600 transition-colors"
                      title="Supprimer"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </span>
              </div>

              {/* Expanded message */}
              {expandedId === submission.id && (
                <div className="px-6 py-4 bg-[#FAF7F2] border-t border-[#E8E0D4]">
                  <p className="text-sm font-medium text-[#2C2C2C] mb-2">Message :</p>
                  <p className="text-sm text-[#6B6560] whitespace-pre-wrap leading-relaxed">
                    {submission.message}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
