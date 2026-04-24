import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { protectedHandler } from "@/lib/api-handler";
import { canEditContent } from "@/lib/roles";

export const PATCH = protectedHandler(
  async (request, { params }) => {
    const id = params?.id;
    if (!id) return NextResponse.json({ error: "id manquant" }, { status: 400 });

    const body = await request.json();
    const updateData: { hidden?: boolean } = {};
    if (typeof body.hidden === "boolean") updateData.hidden = body.hidden;

    if (Object.keys(updateData).length === 0) {
      return NextResponse.json({ error: "Rien à mettre à jour." }, { status: 400 });
    }

    try {
      const updated = await prisma.googleReview.update({
        where: { id },
        data: updateData,
      });
      return NextResponse.json({ review: updated });
    } catch {
      return NextResponse.json({ error: "Avis introuvable." }, { status: 404 });
    }
  },
  { roleCheck: canEditContent, audit: { action: "UPDATE_GOOGLE_REVIEW", resource: "google-reviews" } }
);
