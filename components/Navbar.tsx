"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = !scrolled;

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        transparent
          ? "bg-transparent border-b border-transparent"
          : "bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm shadow-black/5",
      ].join(" ")}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" aria-label="Electrificarte Vendedores - Inicio">
          <img
            src="/logo-electrificarte.png"
            alt="Electrificarte"
            className={[
              "h-7 md:h-8 w-auto object-contain transition-all duration-300",
              transparent ? "" : "brightness-0",
            ].join(" ")}
          />
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { href: "#como-funciona", label: "Cómo funciona" },
            { href: "#precios",       label: "Precios" },
            { href: "#faq",           label: "FAQ" },
          ].map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={[
                "text-sm font-medium transition-colors",
                transparent
                  ? "text-white/70 hover:text-white"
                  : "text-gray-600 hover:text-gray-900",
              ].join(" ")}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <Link
          href="/unirse"
          className="bg-primary hover:bg-primary-dark text-black font-bold text-sm px-5 py-2.5 rounded-xl transition-colors shadow-[0_4px_20px_rgba(0,229,229,0.25)]"
        >
          Quiero sumarme
        </Link>
      </div>
    </header>
  );
}
