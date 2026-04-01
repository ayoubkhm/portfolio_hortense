export type Role = "lecteur" | "createur" | "proprietaire";

export const ROLE_LABELS: Record<Role, string> = {
  lecteur: "Lecteur",
  createur: "Créateur",
  proprietaire: "Propriétaire",
};

export const ROLE_DESCRIPTIONS: Record<Role, string> = {
  lecteur: "Peut consulter l'admin mais ne peut rien modifier",
  createur: "Peut modifier le contenu, uploader des médias et gérer les messages",
  proprietaire: "Accès complet : contenu, médias, utilisateurs et paramètres",
};

export const ROLES_LIST: Role[] = ["lecteur", "createur", "proprietaire"];

export function canEditContent(role: string): boolean {
  return role === "createur" || role === "proprietaire";
}

export function canManageUsers(role: string): boolean {
  return role === "proprietaire";
}

export function canChangeSettings(role: string): boolean {
  return role === "proprietaire";
}

export function canManageMessages(role: string): boolean {
  return role === "createur" || role === "proprietaire";
}
