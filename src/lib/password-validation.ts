export function validatePassword(password: string): string | null {
  if (password.length < 10) return "Le mot de passe doit contenir au moins 10 caractères.";
  if (!/[A-Z]/.test(password)) return "Le mot de passe doit contenir au moins une majuscule.";
  if (!/[a-z]/.test(password)) return "Le mot de passe doit contenir au moins une minuscule.";
  if (!/\d/.test(password)) return "Le mot de passe doit contenir au moins un chiffre.";
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) return "Le mot de passe doit contenir au moins un caractère spécial.";
  return null;
}
