import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import PublicShell from "@/components/layout/PublicShell";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hortense de Ruidiaz | Photographe & Opératrice Drone — Bordeaux",
    template: "%s | Hortense de Ruidiaz",
  },
  description:
    "Photographe de mariage et opératrice drone à Bordeaux. Capturer vos plus beaux moments avec authenticité et créativité.",
  metadataBase: new URL("https://hortensederuidiaz.com"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Hortense de Ruidiaz",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-cream text-charcoal`}
      >
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
