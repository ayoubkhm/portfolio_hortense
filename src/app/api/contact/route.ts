import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendContactNotification } from "@/lib/email";
import { checkRateLimit } from "@/lib/rate-limit";
import { VALID_SERVICES } from "@/lib/categories";
import { RATE_LIMITS } from "@/lib/rate-limits-config";
import { getClientIp } from "@/lib/request-utils";

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request);

    const allowed = await checkRateLimit(`contact:${ip}`, RATE_LIMITS.CONTACT_FORM.max, RATE_LIMITS.CONTACT_FORM.windowMs);
    if (!allowed) {
      return NextResponse.json(
        { error: "Trop de soumissions. Réessayez dans quelques minutes." },
        { status: 429 }
      );
    }

    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Corps de la requête invalide." }, { status: 400 });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const phone = typeof body.phone === "string" ? body.phone.trim() : "";
    const service = typeof body.service === "string" ? body.service.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    const errors: Record<string, string> = {};
    if (!name) errors.name = "Le nom est requis.";
    if (!email) errors.email = "L'email est requis.";
    else if (!EMAIL_REGEX.test(email)) errors.email = "Adresse email invalide.";
    if (!service) errors.service = "La prestation est requise.";
    else if (!VALID_SERVICES.includes(service as (typeof VALID_SERVICES)[number])) errors.service = "Prestation invalide.";
    if (!message) errors.message = "Le message est requis.";

    if (Object.keys(errors).length > 0) {
      return NextResponse.json({ error: "Validation échouée.", errors }, { status: 400 });
    }

    const submission = await prisma.contactSubmission.create({
      data: { name, email, phone, service, message },
    });

    // Fire-and-forget email notification
    sendContactNotification({ name, email, phone: phone || undefined, service, message }).catch(console.error);

    return NextResponse.json({ success: true, id: submission.id }, { status: 201 });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Erreur interne du serveur." }, { status: 500 });
  }
}
