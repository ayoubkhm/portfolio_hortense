import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { requireAuth } from "@/lib/api-auth";

export async function GET(request: NextRequest) {
  try {
    const { error: authError } = await requireAuth(request);
    if (authError) return authError;

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
