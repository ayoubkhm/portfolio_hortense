"use client";

import { trackEvent } from "@/lib/gtag";
import type { ReactNode } from "react";

interface Props {
  href: string;
  className?: string;
  children: ReactNode;
}

export default function TrackedDownloadLink({ href, className, children }: Props) {
  return (
    <a
      href={href}
      download
      className={className}
      onClick={() => {
        trackEvent({ action: "file_download", category: "brochure", label: href });
      }}
    >
      {children}
    </a>
  );
}
