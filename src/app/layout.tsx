import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import PublicShell from "@/components/layout/PublicShell";
import { SEO_DEFAULTS, BASE_URL, getOgImageUrl } from "@/lib/metadata";

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

export async function generateMetadata(): Promise<Metadata> {
  const ogImageUrl = await getOgImageUrl();

  return {
    title: {
      default: SEO_DEFAULTS.siteTitle,
      template: "%s — Hortense de Ruidiaz",
    },
    description: SEO_DEFAULTS.siteDescription,
    metadataBase: new URL(BASE_URL),
    ...(process.env.GSC_VERIFICATION
      ? { verification: { google: process.env.GSC_VERIFICATION } }
      : {}),
    openGraph: {
      type: "website",
      locale: "fr_FR",
      siteName: "Hortense de Ruidiaz",
      title: SEO_DEFAULTS.siteTitle,
      description: SEO_DEFAULTS.siteDescription,
      url: BASE_URL,
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
      canonical: BASE_URL,
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
