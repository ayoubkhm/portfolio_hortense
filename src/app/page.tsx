import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import { getContent, HOMEPAGE_DEFAULTS, HomepageContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent<HomepageContent>("content_homepage", HOMEPAGE_DEFAULTS);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Hortense de Ruidiaz",
    "description": "Photographe de mariage et opératrice drone à Bordeaux",
    "url": "https://hortensederuidiaz.fr",
    "telephone": "+33616282270",
    "email": "contact@hortensederuidiaz.fr",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Bordeaux",
      "addressRegion": "Nouvelle-Aquitaine",
      "addressCountry": "FR",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 44.8378,
      "longitude": -0.5792,
    },
    "image": "https://hortensederuidiaz.fr/uploads/hortense-portrait.jpg",
    "priceRange": "€€",
    "openingHours": "Mo-Su 09:00-19:00",
    "areaServed": ["Bordeaux", "Gironde", "Nouvelle-Aquitaine"],
    "sameAs": ["https://www.linkedin.com/in/hortense-de-ruidiaz-a83266142/"],
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HeroSection
        title={content.heroTitle}
        subtitle={content.heroSubtitle}
        subSubtitle={content.heroSubSubtitle}
      />
      <AboutSection
        heading={content.aboutHeading}
        paragraphs={content.aboutParagraphs}
        portraitImage={content.aboutPortraitImage}
      />
      <ServicesPreview
        heading={content.servicesHeading}
        services={content.services}
      />
    </main>
  );
}
