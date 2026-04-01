import Link from "next/link";
import { getContent, CONTACT_DEFAULTS, ContactContent } from "@/lib/content";

const footerLinks = [
  { href: "/mariage", label: "Mariage" },
  { href: "/drone", label: "Drone" },
  { href: "/contact", label: "Contact" },
  { href: "/mentions-legales", label: "Mentions légales" },
];

export default async function Footer() {
  const contact = await getContent<ContactContent>("content_contact", CONTACT_DEFAULTS);

  return (
    <footer className="bg-charcoal text-sand">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <p className="text-sm text-sand/70">
            &copy; {new Date().getFullYear()} Hortense de Ruidiaz
          </p>

          <nav>
            <ul className="flex flex-wrap justify-center gap-6">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-sand/70 transition-colors hover:text-gold">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="text-center text-sm text-sand/70 md:text-right">
            <p>{contact.location}</p>
            <a href={`mailto:${contact.email}`} className="transition-colors hover:text-gold">
              {contact.email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
