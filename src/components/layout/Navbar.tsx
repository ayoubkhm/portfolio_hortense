"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/mariage", label: "Mariage" },
  { href: "/drone", label: "Drone" },
  { href: "/contact", label: "Contact" },
  { href: "/a-propos", label: "À propos" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  const showSolid = scrolled || menuOpen || !isHome;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        showSolid ? "bg-cream/95 backdrop-blur-sm shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className={`font-serif text-xl font-semibold transition-colors duration-300 ${
            showSolid ? "text-charcoal" : "text-white"
          }`}
        >
          Hortense de Ruidiaz
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors duration-300 ${
                  pathname === link.href
                    ? "text-gold"
                    : showSolid
                    ? "text-charcoal hover:text-gold"
                    : "text-white/90 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden relative z-50 flex flex-col items-center justify-center w-8 h-8"
          aria-label="Menu"
        >
          <span className={`block h-0.5 w-6 transition-all duration-300 ${showSolid ? "bg-charcoal" : "bg-white"} ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
          <span className={`block h-0.5 w-6 mt-1.5 transition-all duration-300 ${showSolid ? "bg-charcoal" : "bg-white"} ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-6 mt-1.5 transition-all duration-300 ${showSolid ? "bg-charcoal" : "bg-white"} ${menuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
        </button>
      </nav>

      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-cream shadow-lg transition-all duration-300 ${
          menuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <ul className="flex flex-col items-center gap-6 py-8">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`text-sm font-medium tracking-wide uppercase transition-colors ${
                  pathname === link.href ? "text-gold" : "text-charcoal hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
