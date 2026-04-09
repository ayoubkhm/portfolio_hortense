import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import PublicShell from "@/components/layout/PublicShell";
import { getContent } from "@/lib/content";

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

const SEO_DEFAULTS = {
  siteTitle: "Photographe Mariage & Drone Bordeaux | Hortense de Ruidiaz",
  siteDescription:
    "Photographe mariage & opératrice drone certifiée CATS à Bordeaux. Reportages photo et vidéo, vues aériennes. Devis gratuit en 24h.",
  ogImage: "/uploads/d7409ce5fcdb1328b9bf9f56513f81df.jpg",
};

export async function generateMetadata(): Promise<Metadata> {
  const seo = await getContent("content_seo", SEO_DEFAULTS);
  const base = "https://hortensederuidiaz.fr";
  const ogImageUrl = seo.ogImage.startsWith("http")
    ? seo.ogImage
    : `${base}${seo.ogImage}`;

  return {
    title: {
      default: seo.siteTitle,
      template: "%s — Hortense de Ruidiaz",
    },
    description: seo.siteDescription,
    metadataBase: new URL(base),
    ...(process.env.GSC_VERIFICATION
      ? { verification: { google: process.env.GSC_VERIFICATION } }
      : {}),
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: "Hortense de Ruidiaz",
      title: seo.siteTitle,
      description: seo.siteDescription,
      url: base,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: "Hortense de Ruidiaz — Photographe & Drone Bordeaux",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
    },
    alternates: {
      canonical: base,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.GA_ID || "";
  const gadsId = process.env.GADS_ID || "";

  return (
    <html lang="fr">
      <head>
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://player.vimeo.com" />
        {/* Google Analytics (GA4) + Google Ads via gtag.js */}
        {(gaId || gadsId) && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaId || gadsId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: [
                  `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());`,
                  gaId ? `gtag('config','${gaId}');` : "",
                  gadsId ? `gtag('config','${gadsId}');` : "",
                ].join(""),
              }}
            />
          </>
        )}
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} font-sans antialiased bg-cream text-charcoal`}
      >
        <PublicShell>{children}</PublicShell>
      </body>
    </html>
  );
}
