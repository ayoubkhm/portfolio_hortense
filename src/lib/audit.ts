import { prisma } from "@/lib/db";

export function logAudit(params: {
  adminId: string;
  adminEmail: string;
  action: string;
  resource: string;
  details?: string;
  ipAddress?: string;
}) {
  prisma.auditLog
    .create({
      data: {
        adminId: params.adminId,
        adminEmail: params.adminEmail,
        action: params.action,
        resource: params.resource,
        details: params.details || "",
        ipAddress: params.ipAddress || "",
      },
    })
    .catch((error) => {
      console.error("Audit log error:", error);
    });
}
