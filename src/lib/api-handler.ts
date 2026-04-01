import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/api-auth";
import { checkRateLimit } from "@/lib/rate-limit";
import { logAudit } from "@/lib/audit";
import { getClientIp } from "@/lib/request-utils";

interface HandlerOptions {
  // Role check function (e.g., canEditContent). If undefined, any authenticated user can access.
  roleCheck?: (role: string) => boolean;
  // Rate limit config. If undefined, no rate limiting.
  rateLimit?: { key: string; max: number; windowMs: number };
  // Audit log config. If undefined, no audit logging.
  audit?: { action: string; resource: string };
}

type HandlerFn = (
  request: NextRequest,
  context: {
    admin: { id: string; email: string; name: string; role: string };
    params?: Record<string, string>;
  }
) => Promise<NextResponse>;

export function protectedHandler(handler: HandlerFn, options: HandlerOptions = {}) {
  return async (request: NextRequest, routeContext?: { params: Promise<Record<string, string>> }) => {
    try {
      // Auth
      const { error: authError, admin } = await requireAuth(request);
      if (authError) return authError;

      // Role check
      if (options.roleCheck && !options.roleCheck(admin!.role)) {
        return NextResponse.json({ error: "Accès insuffisant." }, { status: 403 });
      }

      // Rate limit (interpolate {adminId} in key)
      if (options.rateLimit) {
        const key = options.rateLimit.key.replace("{adminId}", admin!.id);
        const allowed = await checkRateLimit(key, options.rateLimit.max, options.rateLimit.windowMs);
        if (!allowed) {
          return NextResponse.json({ error: "Trop de requêtes. Réessayez plus tard." }, { status: 429 });
        }
      }

      // Resolve params if present
      const params = routeContext?.params ? await routeContext.params : undefined;

      // Execute handler
      const response = await handler(request, { admin: admin!, params });

      // Audit log (fire-and-forget, only on success)
      if (options.audit && response.status >= 200 && response.status < 300) {
        const ip = getClientIp(request);
        logAudit({
          adminId: admin!.id,
          adminEmail: admin!.email,
          action: options.audit.action,
          resource: options.audit.resource,
          ipAddress: ip,
        });
      }

      return response;
    } catch (error) {
      console.error("API error:", error);
      return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
    }
  };
}
