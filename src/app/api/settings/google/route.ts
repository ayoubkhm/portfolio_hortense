import { NextResponse } from "next/server";

function mask(val: string | undefined): string {
  if (!val) return "";
  if (val.length <= 6) return val;
  return val.slice(0, 4) + "••••" + val.slice(-4);
}

export async function GET() {
  return NextResponse.json({
    gaId: mask(process.env.GA_ID),
    gscProperty: process.env.GSC_PROPERTY || mask(process.env.GSC_VERIFICATION),
    gadsId: mask(process.env.GADS_ID),
    gbpUrl: process.env.GBP_URL || "",
  });
}
