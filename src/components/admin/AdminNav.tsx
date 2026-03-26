"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminNav() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="bg-[#2C2C2C] border-b border-[#6B6560]/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-semibold text-[#FAF7F2]">
              Dashboard
            </h1>
            <span className="text-xs text-[#C9A96E] bg-[#C9A96E]/10 px-2 py-1 rounded">
              Admin
            </span>
          </div>
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="px-4 py-2 text-sm text-[#E8E0D4] hover:text-[#FAF7F2] bg-[#6B6560]/20 hover:bg-[#6B6560]/40 rounded-lg transition-all disabled:opacity-50"
          >
            {isLoggingOut ? "Deconnexion..." : "Se deconnecter"}
          </button>
        </div>
      </div>
    </nav>
  );
}
