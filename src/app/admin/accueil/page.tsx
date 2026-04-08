import BlockBasedAdminPage from "@/components/admin/BlockBasedAdminPage";

export default function AdminAccueilPage() {
  return (
    <BlockBasedAdminPage
      contentKey="content_homepage"
      title="Page d'accueil"
      subtitle="Glissez-déposez les blocs pour réordonner. Cliquez pour éditer."
      previewHref="/"
    />
  );
}
