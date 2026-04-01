import { NextRequest } from "next/server";

export function getClientIp(request: NextRequest): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export function normalizeEmail(email: string): string {
  const [localPart, domain] = email.toLowerCase().split("@");
  if (!localPart || !domain) return email.toLowerCase();
  // Remove plus addressing (user+tag@domain → user@domain)
  const cleanLocal = localPart.split("+")[0];
  return `${cleanLocal}@${domain}`;
}
