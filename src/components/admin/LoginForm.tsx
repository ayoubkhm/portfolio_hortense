"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Erreur de connexion.");
        return;
      }

      router.push("/admin/gallery");
    } catch {
      setError("Erreur de connexion au serveur.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-[#E8E0D4] mb-2">
          Mot de passe
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Entrez le mot de passe"
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
    </form>
  );
}
