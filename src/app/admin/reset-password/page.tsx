"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

function ResetForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token") || "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    if (password !== confirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur.");
        return;
      }

      setSuccess(true);
      setTimeout(() => router.push("/admin/login"), 3000);
    } catch {
      setError("Erreur de connexion au serveur.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#2C2C2C] px-4">
        <div className="text-center">
          <p className="text-red-400">Lien invalide. Veuillez refaire une demande de réinitialisation.</p>
          <a href="/admin/login" className="mt-4 inline-block text-[#C9A96E] hover:underline">
            Retour à la connexion
          </a>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#2C2C2C] px-4">
        <div className="text-center space-y-4">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#8A9A7B]/20">
            <svg className="h-8 w-8 text-[#8A9A7B]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-[#FAF7F2] font-semibold">Mot de passe réinitialisé !</p>
          <p className="text-[#6B6560] text-sm">Redirection vers la connexion...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#2C2C2C] px-4">
      <div className="w-full max-w-sm space-y-8">
        <div className="text-center">
          <h1 className="font-serif text-2xl text-[#FAF7F2]">Nouveau mot de passe</h1>
          <p className="mt-2 text-sm text-[#6B6560]">Choisissez un nouveau mot de passe (min. 8 caractères)</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="new-password" className="block text-sm font-medium text-[#E8E0D4] mb-2">
              Nouveau mot de passe
            </label>
            <input
              id="new-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg bg-[#3a3a3a] border border-[#6B6560] text-[#FAF7F2] placeholder-[#6B6560] focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>
          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-[#E8E0D4] mb-2">
              Confirmer le mot de passe
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              required
              minLength={8}
              disabled={isLoading}
              className="w-full px-4 py-3 rounded-lg bg-[#3a3a3a] border border-[#6B6560] text-[#FAF7F2] placeholder-[#6B6560] focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent transition-all disabled:opacity-50"
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-red-900/30 border border-red-700/50 text-red-300 text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-lg bg-[#C9A96E] text-[#2C2C2C] font-semibold hover:bg-[#b8984f] focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 focus:ring-offset-[#2C2C2C] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Réinitialisation..." : "Réinitialiser"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#2C2C2C]">
        <p className="text-[#6B6560]">Chargement...</p>
      </div>
    }>
      <ResetForm />
    </Suspense>
  );
}
