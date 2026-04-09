"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FloatingContact from "@/components/layout/FloatingContact";
import CookieBanner from "@/components/layout/CookieBanner";
import ThemeProvider from "@/components/layout/ThemeProvider";
import AutoTracker from "@/components/analytics/AutoTracker";

export default function PublicShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return <>{children}</>;
  }

  return (
    <>
      <ThemeProvider />
      <Navbar />
      {children}
      <Footer />
      <FloatingContact />
      <CookieBanner />
      <AutoTracker />
    </>
  );
}
