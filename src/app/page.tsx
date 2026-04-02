import HeroSection from "@/components/home/HeroSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesPreview from "@/components/home/ServicesPreview";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import { getContent, HOMEPAGE_DEFAULTS, HomepageContent, MARIAGE_DEFAULTS, MariageContent, DRONE_DEFAULTS, DroneContent } from "@/lib/content";

export const dynamic = "force-dynamic";

export default async function Home() {
  const content = await getContent<HomepageContent>("content_homepage", HOMEPAGE_DEFAULTS);
  const mariageContent = await getContent<MariageContent>("content_mariage", MARIAGE_DEFAULTS);
  const droneContent = await getContent<DroneContent>("content_drone", DRONE_DEFAULTS);

  // Sync service images with their respective page hero backgrounds
  const services = content.services.map((s) => {
    if (s.href === "/mariage") return { ...s, imageSrc: mariageContent.heroBackgroundImage };
    if (s.href === "/drone") return { ...s, imageSrc: droneContent.heroBackgroundImage };
    return s;
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": "https://hortensederuidiaz.com/#organization",
        "name": "Hortense de Ruidiaz",
        "url": "https://hortensederuidiaz.com",
        "logo": {
          "@type": "ImageObject",
          "url": "https://hortensederuidiaz.com/uploads/hortense-portrait.jpg",
        },
        "description": "Photographe de mariage et opératrice drone certifiée CATS à Bordeaux",
        "email": "contact@hortensederuidiaz.com",
        "telephone": "+33616282270",
        "sameAs": ["https://www.linkedin.com/in/hortense-de-ruidiaz-a83266142/"],
        "founder": {
          "@type": "Person",
          "name": "Hortense de Ruidiaz",
          "jobTitle": "Photographe & Opératrice Drone",
        },
      },
      {
        "@type": "LocalBusiness",
        "@id": "https://hortensederuidiaz.com/#localbusiness",
        "name": "Hortense de Ruidiaz",
        "image": "https://hortensederuidiaz.com/uploads/hortense-portrait.jpg",
        "telephone": "+33616282270",
        "email": "contact@hortensederuidiaz.com",
        "priceRange": "€€",
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
        "areaServed": [
          { "@type": "City", "name": "Bordeaux" },
          { "@type": "AdministrativeArea", "name": "Gironde" },
          { "@type": "AdministrativeArea", "name": "Nouvelle-Aquitaine" },
        ],
        "openingHoursSpecification": {
          "@type": "OpeningHoursSpecification",
          "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          "opens": "09:00",
          "closes": "19:00",
        },
      },
      {
        "@type": "WebSite",
        "@id": "https://hortensederuidiaz.com/#website",
        "name": "Hortense de Ruidiaz",
        "url": "https://hortensederuidiaz.com",
        "publisher": { "@id": "https://hortensederuidiaz.com/#organization" },
      },
      {
        "@type": "WebPage",
        "@id": "https://hortensederuidiaz.com/#webpage",
        "url": "https://hortensederuidiaz.com",
        "name": "Photographe Mariage & Drone Bordeaux",
        "isPartOf": { "@id": "https://hortensederuidiaz.com/#website" },
        "about": { "@id": "https://hortensederuidiaz.com/#organization" },
        "datePublished": "2026-03-26",
        "dateModified": "2026-04-02",
      },
    ],
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
        services={services}
      />
      <TestimonialsSection />
    </main>
  );
}
