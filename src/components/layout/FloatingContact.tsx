"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FloatingContact() {
  const pathname = usePathname();

  if (pathname === "/contact" || pathname.startsWith("/admin")) return null;

  return (
    <Link
      href="/contact"
      aria-label="Nous contacter"
      className="fixed bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-gold text-white shadow-lg transition-transform duration-300 hover:scale-110 hover:shadow-xl"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
      </svg>
    </Link>
  );
}
