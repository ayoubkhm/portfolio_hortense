import BlockBasedAdminPage from "@/components/admin/BlockBasedAdminPage";

export default function AdminMariagePage() {
  return (
    <BlockBasedAdminPage
      contentKey="content_mariage"
      title="Page Mariage"
      subtitle="Glissez-déposez les blocs pour réordonner. Cliquez pour éditer."
      previewHref="/mariage"
    />
  );
}
