"use client";

import { useState, useEffect } from "react";
import type { AdminUser, ThemeColors } from "@/types";

const ROLE_OPTIONS = [
  { value: "lecteur", label: "Lecteur", desc: "Consultation uniquement" },
  { value: "createur", label: "Créateur", desc: "Modification du contenu et médias" },
  { value: "proprietaire", label: "Propriétaire", desc: "Accès complet" },
];

const DEFAULT_COLORS: ThemeColors = {
  cream: "#FAF7F2",
  sand: "#E8E0D4",
  charcoal: "#2C2C2C",
  warmgray: "#6B6560",
  sage: "#8A9A7B",
  gold: "#C9A96E",
};

const COLOR_LABELS: Record<keyof ThemeColors, string> = {
  cream: "Fond principal (Cream)",
  sand: "Fond secondaire (Sand)",
  charcoal: "Texte principal (Charcoal)",
  warmgray: "Texte secondaire (Warm Gray)",
  sage: "Accent vert (Sage)",
  gold: "Accent doré (Gold)",
};

export default function AdminSettingsPage() {
  // Theme colors
  const [colors, setColors] = useState<ThemeColors>(DEFAULT_COLORS);
  const [isSavingColors, setIsSavingColors] = useState(false);
  const [colorSuccess, setColorSuccess] = useState("");
  const [colorError, setColorError] = useState("");

  // Current user role
  const [currentRole, setCurrentRole] = useState("");

  // Users
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);
  const [newUser, setNewUser] = useState({ email: "", name: "", password: "", role: "lecteur" });
  const [isAddingUser, setIsAddingUser] = useState(false);
  const [userError, setUserError] = useState("");
  const [userSuccess, setUserSuccess] = useState("");
  const [editPasswordId, setEditPasswordId] = useState<string | null>(null);
  const [newPassword, setNewPassword] = useState("");
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    // Load current user role
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((data) => setCurrentRole(data.role || ""))
      .catch(() => {});

    // Load colors
    fetch("/api/content/content_theme")
      .then((r) => r.json())
      .then((data) => {
        if (data && data.cream) setColors({ ...DEFAULT_COLORS, ...data });
      })
      .catch(() => {});

    // Load users
    fetch("/api/admin/users")
      .then((r) => r.json())
      .then((data) => setUsers(data.admins || []))
      .catch(() => {})
      .finally(() => setIsLoadingUsers(false));
  }, []);

  // --- Colors ---
  const handleSaveColors = async () => {
    setIsSavingColors(true);
    setColorError("");
    setColorSuccess("");
    try {
      const res = await fetch("/api/content/content_theme", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(colors),
      });
      if (!res.ok) throw new Error();
      setColorSuccess("Couleurs sauvegardées ! Rechargez le site pour voir les changements.");
      setTimeout(() => setColorSuccess(""), 5000);
    } catch {
      setColorError("Erreur lors de la sauvegarde.");
    } finally {
      setIsSavingColors(false);
    }
  };

  const handleResetColors = () => {
    setColors(DEFAULT_COLORS);
  };

  const updateColor = (key: keyof ThemeColors, value: string) => {
    setColors((prev) => ({ ...prev, [key]: value }));
  };

  // --- Users ---
  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingUser(true);
    setUserError("");
    setUserSuccess("");
    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      if (!res.ok) { setUserError(data.error); return; }
      setUsers((prev) => [...prev, data.admin]);
      setNewUser({ email: "", name: "", password: "", role: "lecteur" });
      setUserSuccess("Utilisateur ajouté !");
      setTimeout(() => setUserSuccess(""), 3000);
    } catch {
      setUserError("Erreur de connexion.");
    } finally {
      setIsAddingUser(false);
    }
  };

  const handleChangePassword = async (id: string) => {
    if (!newPassword || newPassword.length < 8) {
      setUserError("Le mot de passe doit contenir au moins 8 caractères.");
      return;
    }
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: newPassword }),
      });
      if (!res.ok) { const d = await res.json(); setUserError(d.error); return; }
      setEditPasswordId(null);
      setNewPassword("");
      setUserSuccess("Mot de passe modifié !");
      setTimeout(() => setUserSuccess(""), 3000);
    } catch {
      setUserError("Erreur.");
    }
  };

  const handleChangeRole = async (id: string, role: string) => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role }),
      });
      if (!res.ok) { const d = await res.json(); setUserError(d.error); return; }
      setUsers((prev) => prev.map((u) => u.id === id ? { ...u, role } : u));
      setUserSuccess("Rôle modifié !");
      setTimeout(() => setUserSuccess(""), 3000);
    } catch {
      setUserError("Erreur.");
    }
  };

  const handleDeleteUser = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) { setUserError(data.error); return; }
      setUsers((prev) => prev.filter((u) => u.id !== id));
      setDeleteConfirmId(null);
      setUserSuccess("Utilisateur supprimé.");
      setTimeout(() => setUserSuccess(""), 3000);
    } catch {
      setUserError("Erreur.");
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#2C2C2C]">Paramètres</h1>
        <p className="mt-1 text-[#6B6560]">Configuration générale du site.</p>
      </div>

      {/* Theme Colors */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E0D4] p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#2C2C2C]">Couleurs du site</h2>
            <p className="text-sm text-[#6B6560] mt-1">Personnalisez la palette de couleurs. Les changements s&apos;appliquent après rechargement.</p>
          </div>
          <button
            onClick={handleResetColors}
            className="text-xs text-[#6B6560] hover:text-[#2C2C2C] px-3 py-1.5 rounded-lg border border-[#E8E0D4] hover:border-[#6B6560] transition-all"
          >
            Réinitialiser
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {(Object.keys(DEFAULT_COLORS) as (keyof ThemeColors)[]).map((key) => (
            <div key={key} className="flex items-center gap-3 p-3 rounded-lg border border-[#E8E0D4] bg-[#FAF7F2]">
              <input
                type="color"
                value={colors[key]}
                onChange={(e) => updateColor(key, e.target.value)}
                className="w-10 h-10 rounded-lg border border-[#E8E0D4] cursor-pointer shrink-0"
                style={{ padding: 0 }}
              />
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-[#2C2C2C] truncate">{COLOR_LABELS[key]}</p>
                <input
                  type="text"
                  value={colors[key]}
                  onChange={(e) => updateColor(key, e.target.value)}
                  className="w-full text-xs text-[#6B6560] bg-transparent border-none p-0 focus:outline-none font-mono"
                />
              </div>
              {colors[key] !== DEFAULT_COLORS[key] && (
                <div
                  className="w-5 h-5 rounded border border-[#E8E0D4] shrink-0 cursor-pointer"
                  style={{ backgroundColor: DEFAULT_COLORS[key] }}
                  title={`Défaut : ${DEFAULT_COLORS[key]}`}
                  onClick={() => updateColor(key, DEFAULT_COLORS[key])}
                />
              )}
            </div>
          ))}
        </div>

        {/* Preview */}
        <div className="p-4 rounded-lg border border-[#E8E0D4]">
          <p className="text-xs text-[#6B6560] mb-3">Aperçu</p>
          <div className="rounded-lg overflow-hidden" style={{ backgroundColor: colors.cream }}>
            <div className="p-4" style={{ backgroundColor: colors.charcoal }}>
              <span className="font-serif text-lg" style={{ color: colors.cream }}>Hortense de Ruidiaz</span>
              <span className="ml-4 text-sm" style={{ color: colors.gold }}>MARIAGE</span>
              <span className="ml-3 text-sm" style={{ color: colors.sand }}>DRONE</span>
            </div>
            <div className="p-6 space-y-2" style={{ backgroundColor: colors.cream }}>
              <h3 className="font-serif text-xl" style={{ color: colors.charcoal }}>Titre de section</h3>
              <p className="text-sm" style={{ color: colors.warmgray }}>Texte de paragraphe avec la couleur warmgray.</p>
              <div className="flex gap-3 mt-3">
                <span className="px-4 py-1.5 rounded-full text-white text-sm font-medium" style={{ backgroundColor: colors.gold }}>Bouton Gold</span>
                <span className="px-4 py-1.5 rounded-full text-white text-sm font-medium" style={{ backgroundColor: colors.sage }}>Bouton Sage</span>
              </div>
            </div>
            <div className="p-3 text-center text-xs" style={{ backgroundColor: colors.sand, color: colors.warmgray }}>
              Footer avec fond Sand
            </div>
          </div>
        </div>

        {colorError && <p className="text-red-600 text-sm">{colorError}</p>}
        {colorSuccess && <p className="text-[#8A9A7B] text-sm">{colorSuccess}</p>}

        <button
          onClick={handleSaveColors}
          disabled={isSavingColors}
          className="bg-[#C9A96E] text-white px-6 py-2.5 rounded-lg hover:bg-[#b8984f] transition-all disabled:opacity-50 font-medium text-sm"
        >
          {isSavingColors ? "Sauvegarde..." : "Sauvegarder les couleurs"}
        </button>
      </div>

      {/* User Management */}
      <div className="bg-white rounded-xl shadow-sm border border-[#E8E0D4] p-6 space-y-5">
        <div>
          <h2 className="text-lg font-semibold text-[#2C2C2C]">Gestion des utilisateurs</h2>
          <p className="text-sm text-[#6B6560] mt-1">Gérez les comptes administrateurs du site.</p>
        </div>

        {userError && <p className="text-red-600 text-sm">{userError}</p>}
        {userSuccess && <p className="text-[#8A9A7B] text-sm">{userSuccess}</p>}

        {/* Existing users */}
        {isLoadingUsers ? (
          <p className="text-[#6B6560] text-sm">Chargement...</p>
        ) : (
          <div className="space-y-3">
            {users.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 rounded-lg border border-[#E8E0D4] bg-[#FAF7F2]">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-[#2C2C2C]">{user.name || "Sans nom"}</p>
                    <span className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      user.role === "proprietaire" ? "bg-[#C9A96E]/20 text-[#C9A96E]" :
                      user.role === "createur" ? "bg-[#8A9A7B]/20 text-[#8A9A7B]" :
                      "bg-[#6B6560]/15 text-[#6B6560]"
                    }`}>
                      {ROLE_OPTIONS.find(r => r.value === user.role)?.label || user.role}
                    </span>
                  </div>
                  <p className="text-sm text-[#6B6560]">{user.email}</p>
                  {currentRole === "proprietaire" && (
                    <select
                      value={user.role}
                      onChange={(e) => handleChangeRole(user.id, e.target.value)}
                      className="mt-1 text-xs px-2 py-1 rounded border border-[#E8E0D4] bg-white text-[#2C2C2C] focus:ring-1 focus:ring-[#C9A96E] focus:outline-none"
                    >
                      {ROLE_OPTIONS.map((r) => (
                        <option key={r.value} value={r.value}>{r.label} — {r.desc}</option>
                      ))}
                    </select>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {currentRole !== "proprietaire" ? null : editPasswordId === user.id ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Nouveau mot de passe (min 8)"
                        className="px-3 py-1.5 text-sm rounded-lg border border-[#E8E0D4] focus:ring-2 focus:ring-[#C9A96E] focus:outline-none"
                      />
                      <button
                        onClick={() => handleChangePassword(user.id)}
                        className="px-3 py-1.5 text-sm bg-[#C9A96E] text-white rounded-lg hover:bg-[#b8984f]"
                      >
                        OK
                      </button>
                      <button
                        onClick={() => { setEditPasswordId(null); setNewPassword(""); }}
                        className="px-2 py-1.5 text-sm text-[#6B6560] hover:text-[#2C2C2C]"
                      >
                        Annuler
                      </button>
                    </div>
                  ) : deleteConfirmId === user.id ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-red-600">Supprimer ?</span>
                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Confirmer
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-2 py-1.5 text-sm text-[#6B6560] hover:text-[#2C2C2C]"
                      >
                        Non
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => { setEditPasswordId(user.id); setNewPassword(""); setUserError(""); }}
                        className="p-2 text-[#6B6560] hover:text-[#C9A96E] transition-colors"
                        title="Changer le mot de passe"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => { setDeleteConfirmId(user.id); setUserError(""); }}
                        className="p-2 text-[#6B6560] hover:text-red-600 transition-colors"
                        title="Supprimer"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                        </svg>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add new user — only for proprietaire */}
        {currentRole === "proprietaire" && (
          <div className="pt-4 border-t border-[#E8E0D4]">
            <p className="text-sm font-medium text-[#2C2C2C] mb-3">Ajouter un administrateur</p>
            <form onSubmit={handleAddUser} className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser((p) => ({ ...p, name: e.target.value }))}
                placeholder="Nom"
                className="px-3 py-2 rounded-lg border border-[#E8E0D4] text-sm focus:ring-2 focus:ring-[#C9A96E] focus:outline-none"
              />
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser((p) => ({ ...p, email: e.target.value }))}
                placeholder="Email"
                required
                className="px-3 py-2 rounded-lg border border-[#E8E0D4] text-sm focus:ring-2 focus:ring-[#C9A96E] focus:outline-none"
              />
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser((p) => ({ ...p, password: e.target.value }))}
                placeholder="Mot de passe (min 8)"
                required
                minLength={8}
                className="px-3 py-2 rounded-lg border border-[#E8E0D4] text-sm focus:ring-2 focus:ring-[#C9A96E] focus:outline-none"
              />
              <select
                value={newUser.role}
                onChange={(e) => setNewUser((p) => ({ ...p, role: e.target.value }))}
                className="px-3 py-2 rounded-lg border border-[#E8E0D4] text-sm focus:ring-2 focus:ring-[#C9A96E] focus:outline-none"
              >
                {ROLE_OPTIONS.map((r) => (
                  <option key={r.value} value={r.value}>{r.label}</option>
                ))}
              </select>
              <button
                type="submit"
                disabled={isAddingUser}
                className="bg-[#C9A96E] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#b8984f] disabled:opacity-50 font-medium"
              >
                {isAddingUser ? "Ajout..." : "Ajouter"}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
