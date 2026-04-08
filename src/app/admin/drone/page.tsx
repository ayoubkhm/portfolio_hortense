import BlockBasedAdminPage from "@/components/admin/BlockBasedAdminPage";

export default function AdminDronePage() {
  return (
    <BlockBasedAdminPage
      contentKey="content_drone"
      title="Page Drone"
      subtitle="Glissez-déposez les blocs pour réordonner. Cliquez pour éditer."
      previewHref="/drone"
    />
  );
}
