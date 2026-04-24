/**
 * Recursively sanitize content to prevent XSS.
 * Strips HTML tags from all string values and validates URLs.
 */
export function sanitizeContent(obj: unknown): unknown {
  if (typeof obj === "string") {
    return sanitizeString(obj);
  }
  if (Array.isArray(obj)) {
    return obj.map(sanitizeContent);
  }
  if (typeof obj === "object" && obj !== null) {
    const result: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(obj)) {
      result[key] = sanitizeContent(value);
    }
    return result;
  }
  // numbers, booleans, null — pass through
  return obj;
}

function sanitizeString(str: string): string {
  const clean = str.replace(/<[^>]*>/g, "").trim();
  // Block dangerous URI schemes regardless of where they appear — not just when
  // the string already looks like an http(s) URL. Admin-editable URL fields
  // (iframe src, anchor href) must never carry javascript:/data:/vbscript:.
  const lower = clean.toLowerCase();
  if (lower.startsWith("javascript:") || lower.startsWith("data:") || lower.startsWith("vbscript:")) {
    return "";
  }
  return clean;
}

/**
 * Validate that a content payload isn't excessively large (DoS prevention).
 */
export function validateContentSize(body: unknown): boolean {
  const json = JSON.stringify(body);
  return json.length <= 100_000; // Max 100KB of content
}
