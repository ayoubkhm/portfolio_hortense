import { prisma } from "./db";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "admin_session";
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24h

export async function verifyAdmin(
  email: string,
  password: string
): Promise<{ valid: boolean; adminName?: string }> {
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) return { valid: false };

  const isValid = await bcrypt.compare(password, admin.password);
  if (!isValid) return { valid: false };

  return { valid: true, adminName: admin.name };
}

export async function createSession(): Promise<string> {
  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + SESSION_DURATION);

  await prisma.session.create({
    data: { token, expiresAt },
  });

  return token;
}

export async function validateSession(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token) return false;

  const session = await prisma.session.findUnique({ where: { token } });
  if (!session || session.expiresAt < new Date()) {
    if (session) {
      await prisma.session.delete({ where: { token } });
    }
    return false;
  }
  return true;
}

export async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (token) {
    await prisma.session.deleteMany({ where: { token } });
    cookieStore.delete(SESSION_COOKIE);
  }
}

export function setSessionCookie(token: string) {
  return {
    name: SESSION_COOKIE,
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict" as const,
    maxAge: SESSION_DURATION / 1000,
    path: "/",
  };
}

export async function createPasswordResetToken(email: string): Promise<string | null> {
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) return null;

  const token = crypto.randomBytes(32).toString("hex");
  const expiresAt = new Date(Date.now() + 60 * 60 * 1000); // 1h

  await prisma.passwordReset.create({
    data: { email, token, expiresAt },
  });

  return token;
}

export async function resetPassword(token: string, newPassword: string): Promise<boolean> {
  const reset = await prisma.passwordReset.findUnique({ where: { token } });
  if (!reset || reset.used || reset.expiresAt < new Date()) return false;

  const hashedPassword = await bcrypt.hash(newPassword, 10);
  await prisma.admin.update({
    where: { email: reset.email },
    data: { password: hashedPassword },
  });

  await prisma.passwordReset.update({
    where: { token },
    data: { used: true },
  });

  return true;
}
