"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const footerLinks = [
  { href: "/mariage", label: "Mariage" },
  { href: "/drone", label: "Drone" },
  { href: "/contact", label: "Contact" },
  { href: "/mentions-legales", label: "Mentions légales" },
];

export default function Footer() {
  const [email, setEmail] = useState("contact@hortensederuidiaz.com");
  const [location, setLocation] = useState("Bordeaux, France");

  useEffect(() => {
    fetch("/api/content/content_contact")
      .then((res) => res.json())
      .then((data) => {
        if (data.email) setEmail(data.email);
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
            <p>{location}</p>
            <a href={`mailto:${email}`} className="transition-colors hover:text-gold">
              {email}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
