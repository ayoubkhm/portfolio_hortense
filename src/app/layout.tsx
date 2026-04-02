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
    default: "Photographe Mariage & Drone Bordeaux | Hortense de Ruidiaz",
    template: "%s — Hortense de Ruidiaz",
  },
  description:
    "Photographe mariage & opératrice drone certifiée CATS à Bordeaux. Reportages photo et vidéo, vues aériennes. Devis gratuit en 24h.",
  metadataBase: new URL("https://hortensederuidiaz.com"),
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "Hortense de Ruidiaz",
    title: "Photographe Mariage & Drone Bordeaux | Hortense de Ruidiaz",
    description:
      "Photographe mariage & opératrice drone certifiée CATS à Bordeaux. Reportages photo et vidéo, vues aériennes.",
    url: "https://hortensederuidiaz.com",
    images: [
      {
        url: "https://hortensederuidiaz.com/uploads/hortense-portrait.jpg",
        width: 1200,
        height: 630,
        alt: "Hortense de Ruidiaz — Photographe & Drone Bordeaux",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
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
