"use client";

import { useState } from "react";
import MediaUploader from "@/components/admin/MediaUploader";
import MediaGrid from "@/components/admin/MediaGrid";

export default function AdminGalleryPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleRefresh = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-semibold text-[#2C2C2C]">
          Gestion de la galerie
        </h1>
        <p className="mt-1 text-[#6B6560]">
          Ajoutez, modifiez ou supprimez vos medias.
        </p>
      </div>
      <MediaUploader onUpload={handleRefresh} />
      <MediaGrid refreshKey={refreshKey} />
    </div>
  );
}
