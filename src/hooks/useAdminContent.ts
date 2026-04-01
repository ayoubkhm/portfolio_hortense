"use client";
import { useState, useEffect, useCallback } from "react";

export function useAdminContent<T>(contentKey: string) {
  const [data, setData] = useState<T | null>(null);
  const [previousData, setPreviousData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch(`/api/content/${contentKey}`)
      .then((res) => res.json())
      .then((d) => setData(d as T))
      .catch(() => setError("Erreur lors du chargement."))
      .finally(() => setIsLoading(false));
  }, [contentKey]);

  const handleSave = useCallback(async () => {
    if (!data) return;
    setIsSaving(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`/api/content/${contentKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      setPreviousData(JSON.parse(JSON.stringify(data)));
      setSuccess("Contenu sauvegardé avec succès !");
      setTimeout(() => setSuccess(""), 3000);
    } catch {
      setError("Erreur lors de la sauvegarde.");
    } finally {
      setIsSaving(false);
    }
  }, [data, contentKey]);

  const handleRevert = useCallback(() => {
    if (previousData) {
      setData(JSON.parse(JSON.stringify(previousData)));
      setPreviousData(null);
    }
  }, [previousData]);

  const update = useCallback(<K extends keyof T>(key: K, value: T[K]) => {
    setData((prev) => (prev ? { ...prev, [key]: value } : prev));
  }, []);

  return {
    data,
    setData,
    previousData,
    isLoading,
    isSaving,
    success,
    error,
    handleSave,
    handleRevert,
    update,
  };
}
