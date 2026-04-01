"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [forgotMode, setForgotMode] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur de connexion.");
        return;
      }

      router.push("/admin/accueil");
    } catch {
      setError("Erreur de connexion au serveur.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setForgotSuccess("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur.");
        return;
      }

      setForgotSuccess(data.message);
    } catch {
      setError("Erreur de connexion au serveur.");
    } finally {
      setIsLoading(false);
    }
  };

  if (forgotMode) {
    return (
      <form onSubmit={handleForgotPassword} className="w-full max-w-sm space-y-6">
        <p className="text-sm text-[#E8E0D4]/70">
          Entrez votre email, vous recevrez un lien pour réinitialiser votre mot de passe.
        </p>
        <div>
          <label htmlFor="forgot-email" className="block text-sm font-medium text-[#E8E0D4] mb-2">
            Email
          </label>
          <input
            id="forgot-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="votre@email.com"
            required
            disabled={isLoading}
            className="w-full px-4 py-3 rounded-lg bg-[#3a3a3a] border border-[#6B6560] text-[#FAF7F2] placeholder-[#6B6560] focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent transition-all disabled:opacity-50"
          />
        </div>
        {error && (
          <div className="p-3 rounded-lg bg-red-900/30 border border-red-700/50 text-red-300 text-sm">
            {error}
          </div>
        )}
        {forgotSuccess && (
          <div className="p-3 rounded-lg bg-[#8A9A7B]/20 border border-[#8A9A7B]/40 text-[#8A9A7B] text-sm">
            {forgotSuccess}
          </div>
        )}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 rounded-lg bg-[#C9A96E] text-[#2C2C2C] font-semibold hover:bg-[#b8984f] focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:ring-offset-2 focus:ring-offset-[#2C2C2C] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Envoi..." : "Envoyer le lien"}
        </button>
        <button
          type="button"
          onClick={() => { setForgotMode(false); setError(""); setForgotSuccess(""); }}
          className="w-full text-sm text-[#C9A96E] hover:text-[#E8E0D4] transition-colors"
        >
          Retour à la connexion
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={handleLogin} className="w-full max-w-sm space-y-6">
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-[#E8E0D4] mb-2">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="votre@email.com"
          required
          disabled={isLoading}
          className="w-full px-4 py-3 rounded-lg bg-[#3a3a3a] border border-[#6B6560] text-[#FAF7F2] placeholder-[#6B6560] focus:outline-none focus:ring-2 focus:ring-[#C9A96E] focus:border-transparent transition-all disabled:opacity-50"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-[#E8E0D4] mb-2">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Votre mot de passe"
          required
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
        {isLoading ? "Connexion..." : "Se connecter"}
      </button>
      <button
        type="button"
        onClick={() => { setForgotMode(true); setError(""); }}
        className="w-full text-sm text-[#6B6560] hover:text-[#C9A96E] transition-colors"
      >
        Mot de passe oublié ?
      </button>
    </form>
  );
}
