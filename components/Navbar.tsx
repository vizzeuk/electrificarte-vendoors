"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { NAV_LINKS } from "@/lib/site";

// Solo el home abre con una banda oscura (foto): ahí la navegación parte transparente.
const DARK_HERO_PATHS = /^\/$/;

function subscribeScroll(onChange: () => void) {
  window.addEventListener("scroll", onChange, { passive: true });
  return () => window.removeEventListener("scroll", onChange);
}
const getScrolled = () => window.scrollY > 24;
const getServerScrolled = () => false;

/** Navegación del sistema de diseño v1 (misma pieza que electrificarteweb, sin menús). */
export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const scrolled = useSyncExternalStore(subscribeScroll, getScrolled, getServerScrolled);

  // Bloquea el scroll del fondo mientras el menú móvil está abierto.
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const transparent = DARK_HERO_PATHS.test(pathname) && !scrolled && !mobileOpen;
  const close = () => setMobileOpen(false);
  const isCurrent = (href: string) => (href.startsWith("/#") ? false : pathname === href);

  return (
    <>
      <header className={`nav${transparent ? " theme-dark" : ""}`}>
        <div className="wrap nav__in">
          <div className="nav__left">
            <Link href="/" aria-label="Electrificarte Vendedores, inicio" className="nav__brand" onClick={close}>
              <Logo className="h-[14px] sm:h-[17px]" />
              <span className="nav__tag">Vendedores</span>
            </Link>
            <nav className="nav__links" aria-label="Navegación principal">
              {NAV_LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="nav__link"
                  aria-current={isCurrent(l.href) ? "page" : undefined}
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="nav__right">
            <Link href="/unirse" className="btn btn--primary btn--sm nav__cta">
              Quiero sumarme
            </Link>
            <button
              type="button"
              className="btn btn--quiet btn--icon nav__menu-btn"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
            >
              <Icon name={mobileOpen ? "close" : "menu"} />
            </button>
          </div>
        </div>
      </header>

      <div id="mobile-nav" className={`mnav${mobileOpen ? " is-open" : ""}`} hidden={!mobileOpen}>
        <ul>
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} onClick={close}>
                {l.label}
                <Icon name="chevron_right" />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mnav__cta">
          <Link href="/unirse" className="btn btn--primary btn--lg" onClick={close}>
            Quiero sumarme
          </Link>
        </div>
      </div>
    </>
  );
}
