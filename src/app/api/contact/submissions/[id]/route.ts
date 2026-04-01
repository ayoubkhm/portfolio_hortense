import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { canManageMessages } from "@/lib/roles";
import { protectedHandler } from "@/lib/api-handler";

export const PATCH = protectedHandler(
  async (request, { params }) => {
    const id = params?.id;

    const submission = await prisma.contactSubmission.findUnique({
      where: { id },
    });
    if (!submission) {
      return NextResponse.json(
        { error: "Soumission introuvable." },
        { status: 404 }
      );
    }

    const body = await request.json();
    const { read } = body;

    const updated = await prisma.contactSubmission.update({
      where: { id },
      data: { read: Boolean(read) },
    });

    return NextResponse.json({ submission: updated }, { status: 200 });
  },
  {
    roleCheck: canManageMessages,
    audit: { action: "UPDATE_SUBMISSION", resource: "contact" },
  }
);

export const DELETE = protectedHandler(
  async (_request, { params }) => {
    const id = params?.id;

    const submission = await prisma.contactSubmission.findUnique({
      where: { id },
    });
    if (!submission) {
      return NextResponse.json(
        { error: "Soumission introuvable." },
        { status: 404 }
      );
    }

    await prisma.contactSubmission.delete({ where: { id } });

    return NextResponse.json({ success: true }, { status: 200 });
  },
  {
    roleCheck: canManageMessages,
    audit: { action: "DELETE_SUBMISSION", resource: "contact" },
  }
);
