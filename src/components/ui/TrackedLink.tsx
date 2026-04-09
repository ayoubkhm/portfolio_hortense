"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/gtag";
import type { ReactNode } from "react";

interface Props {
  href: string;
  className?: string;
  children: ReactNode;
  eventAction?: string;
  eventCategory?: string;
  eventLabel?: string;
}

export default function TrackedLink({
  href,
  className,
  children,
  eventAction = "cta_click",
  eventCategory = "engagement",
  eventLabel,
}: Props) {
  return (
    <Link
      href={href}
      className={className}
      onClick={() => {
        trackEvent({
          action: eventAction,
          category: eventCategory,
          label: eventLabel || href,
        });
      }}
    >
      {children}
    </Link>
  );
}
