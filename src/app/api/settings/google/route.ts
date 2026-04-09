import { NextResponse } from "next/server";

// Expose Google env vars (read-only) so the admin settings page can display them.
// Values are partially masked for security.
function mask(val: string | undefined): string {
  if (!val) return "";
  if (val.length <= 6) return val;
  return val.slice(0, 4) + "••••" + val.slice(-4);
}

export async function GET() {
  return NextResponse.json({
    gaId: { raw: process.env.GA_ID || "", display: mask(process.env.GA_ID) },
    gscProperty: { raw: process.env.GSC_PROPERTY || process.env.GSC_VERIFICATION || "", display: process.env.GSC_PROPERTY || mask(process.env.GSC_VERIFICATION) },
    gadsId: { raw: process.env.GADS_ID || "", display: mask(process.env.GADS_ID) },
    gbpUrl: { raw: process.env.GBP_URL || "", display: process.env.GBP_URL || "" },
  });
}
