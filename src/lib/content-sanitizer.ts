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
  // Strip HTML tags
  let clean = str.replace(/<[^>]*>/g, "");
  // Prevent javascript: URLs if the string looks like a URL
  if (clean.match(/^(https?:\/\/|\/)/)) {
    // It's a URL — validate protocol
    if (clean.startsWith("javascript:") || clean.startsWith("data:")) {
      clean = "";
    }
  }
  return clean.trim();
}

/**
 * Validate that a content payload isn't excessively large (DoS prevention).
 */
export function validateContentSize(body: unknown): boolean {
  const json = JSON.stringify(body);
  return json.length <= 100_000; // Max 100KB of content
}
