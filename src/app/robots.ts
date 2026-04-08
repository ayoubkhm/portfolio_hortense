import { MetadataRoute } from "next";

// TODO: Quand Hortense est déclarée auto-entrepreneur, remplacer Disallow: / par Allow: /
// et décommenter les règles AI crawlers + sitemap
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: "/",
      },
    ],
    // sitemap: "https://hortensederuidiaz.fr/sitemap.xml",
  };
}
