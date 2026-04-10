"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/gtag";
import type { ReactNode } from "react";

interface Props {
  href: string;
  className?: string;
  children: ReactNode;
  download?: boolean;
  eventAction?: string;
  eventCategory?: string;
  eventLabel?: string;
}

export default function TrackedLink({
  href,
  className,
  children,
  download = false,
  eventAction = "cta_click",
  eventCategory = "engagement",
  eventLabel,
}: Props) {
  const handleClick = () => {
    trackEvent({
      action: eventAction,
      category: eventCategory,
      label: eventLabel || href,
    });
  };

  if (download) {
    return (
      <a href={href} download className={className} onClick={handleClick} data-tracked>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={handleClick} data-tracked>
      {children}
    </Link>
  );
}
