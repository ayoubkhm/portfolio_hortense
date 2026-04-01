import { prisma } from "@/lib/db";

interface AuditParams {
  adminId: string;
  adminEmail: string;
  action: string;
  resource: string;
  details?: string;
  ipAddress?: string;
}

/**
 * Log an admin action. Fire-and-forget but logs failures prominently.
 */
export function logAudit(params: AuditParams) {
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
      // Log prominently — audit failures are security-relevant
      console.error(
        `[SECURITY] Audit log FAILED — action=${params.action} admin=${params.adminEmail} resource=${params.resource}`,
        error
      );
    });
}

/**
 * Awaitable version for critical operations where audit must succeed.
 */
export async function logAuditStrict(params: AuditParams): Promise<void> {
  await prisma.auditLog.create({
    data: {
      adminId: params.adminId,
      adminEmail: params.adminEmail,
      action: params.action,
      resource: params.resource,
      details: params.details || "",
      ipAddress: params.ipAddress || "",
    },
  });
}
