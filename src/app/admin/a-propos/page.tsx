import BlockBasedAdminPage from "@/components/admin/BlockBasedAdminPage";

export default function AdminAProposPage() {
  return (
    <BlockBasedAdminPage
      contentKey="content_apropos"
      title="Page À propos"
      subtitle="Glissez-déposez les blocs pour réordonner. Cliquez pour éditer."
      previewHref="/a-propos"
    />
  );
}
