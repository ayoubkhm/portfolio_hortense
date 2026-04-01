import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const token = request.cookies.get("admin_session")?.value;
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

export async function GET(request: NextRequest) {
  try {
    const authenticated = await isAuthenticated(request);
    if (!authenticated) {
      return NextResponse.json(
        { error: "Non autorisé." },
        { status: 401 }
      );
    }

    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ submissions }, { status: 200 });
  } catch (error) {
    console.error("GET /api/contact/submissions error:", error);
    return NextResponse.json(
      { error: "Erreur lors de la récupération des soumissions." },
      { status: 500 }
    );
  }
}
