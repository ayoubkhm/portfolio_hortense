"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const footerLinks = [
  { href: "/mariage", label: "Mariage" },
  { href: "/drone", label: "Drone" },
  { href: "/contact", label: "Contact" },
  { href: "/a-propos", label: "À propos" },
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-confidentialite", label: "Politique de confidentialité" },
];

export default function Footer() {
  const [email, setEmail] = useState("contact@hortensederuidiaz.fr");
  const [phone, setPhone] = useState("06 16 28 22 70");
  const [location, setLocation] = useState("Bordeaux, France");

  useEffect(() => {
    fetch("/api/content/content_contact")
      .then((res) => res.json())
      .then((data) => {
        if (data.email) setEmail(data.email);
        if (data.phone) setPhone(data.phone);
        if (data.location) setLocation(data.location);
      })
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-charcoal text-sand">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
          <p className="text-sm text-sand/70">
            &copy; {new Date().getFullYear()} Hortense de Ruidiaz
            <span className="block text-xs text-sand/50 md:inline md:ml-2">
              · SIRET 104 029 111 00010
            </span>
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

          <div className="space-y-1 text-center text-sm text-sand/70 md:text-right">
            <p>{location}</p>
            <a href={`tel:+33${phone.replace(/\s/g, "").replace(/^0/, "")}`} className="block transition-colors hover:text-gold">
              {phone}
            </a>
            <a href={`mailto:${email}`} className="block transition-colors hover:text-gold">
              {email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
