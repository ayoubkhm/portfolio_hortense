import { prisma } from "./db";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24h

/** Hash a session token before storing/looking up in the DB. */
function hashToken(token: string): string {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export async function verifyAdmin(
  email: string,
  password: string
): Promise<{ valid: boolean; adminId?: string; adminName?: string; role?: string }> {
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) return { valid: false };

  const isValid = await bcrypt.compare(password, admin.password);
  if (!isValid) return { valid: false };

  return { valid: true, adminId: admin.id, adminName: admin.name, role: admin.role };
}

export async function createSession(adminId: string): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  await prisma.session.create({
    data: { token: tokenHash, adminId, expiresAt },
  });

  return token; // Return plain token to set in cookie
}

export async function validateSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;

  const tokenHash = hashToken(token);
  const session = await prisma.session.findUnique({ where: { token: tokenHash } });
  if (!session || session.expiresAt < new Date()) {
    if (session) {
      await prisma.session.delete({ where: { token: tokenHash } });
    }
    return false;
  }
  return true;
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    const tokenHash = hashToken(token);
    await prisma.session.deleteMany({ where: { token: tokenHash } });
    cookieStore.delete(SESSION_COOKIE);
  }
}

export function setSessionCookie(token: string) {
  return {
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    // Note: cookies are not marked secure in local dev (HTTP). Set FORCE_SECURE_COOKIES=true to override.
    secure: process.env.NODE_ENV === "production" || process.env.FORCE_SECURE_COOKIES === "true",
    sameSite: "strict" as const,
    maxAge: SESSION_DURATION / 1000,
    path: "/",
  };
}

export async function createPasswordResetToken(email: string): Promise<string | null> {
  const admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin) {
    // Constant-time: simulate the work that would happen for a valid email
    await new Promise(resolve => setTimeout(resolve, 50));
    return null;
  }

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1h

  await prisma.passwordReset.create({
    data: { email, token: hashToken(token), expiresAt },
  });

  return token;
}

export async function resetPassword(token: string, newPassword: string): Promise<boolean> {
  try {
    const tokenHash = hashToken(token);
    return await prisma.$transaction(async (tx) => {
      const reset = await tx.passwordReset.findUnique({ where: { token: tokenHash } });
      if (!reset || reset.used || reset.expiresAt < new Date()) return false;

      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await tx.passwordReset.update({
        where: { token: tokenHash },
        data: { used: true },
      });

      await tx.admin.update({
        where: { email: reset.email },
        data: { password: hashedPassword },
      });

      return true;
    });
  } catch {
    return false;
  }
}

export async function getSessionAdmin(token: string): Promise<{
  id: string;
  email: string;
  name: string;
  role: string;
} | null> {
  const tokenHash = hashToken(token);
  const session = await prisma.session.findUnique({ where: { token: tokenHash } });
  if (!session || session.expiresAt < new Date()) {
    if (session) await prisma.session.delete({ where: { token: tokenHash } });
    return null;
  }
  if (!session.adminId) return null;
  const admin = await prisma.admin.findUnique({
    where: { id: session.adminId },
    select: { id: true, email: true, name: true, role: true },
  });
  return admin;
}
