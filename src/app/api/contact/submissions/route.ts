import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { protectedHandler } from "@/lib/api-handler";
import { canManageMessages } from "@/lib/roles";

export const GET = protectedHandler(
  async () => {
    const submissions = await prisma.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ submissions }, { status: 200 });
  },
  {
    roleCheck: canManageMessages,
    audit: { action: "VIEW_SUBMISSIONS", resource: "contact" },
  }
);
