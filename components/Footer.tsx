import Link from "next/link";
import { Icon } from "@/components/Icon";
import { Logo } from "@/components/Logo";
import { IconInstagram, IconTikTok, IconWhatsApp } from "@/components/SocialIcons";
import { CONTACT, SOCIALS, WEB_URL } from "@/lib/site";

type FooterLink = { label: string; href: string; external?: boolean };

const SECTIONS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Vendedores",
    links: [
      { label: "Cómo funciona", href: "/como-funciona" },
      { label: "Ventajas", href: "/ventajas" },
      { label: "Precio", href: "/#precio" },
      { label: "Preguntas frecuentes", href: "/preguntas-frecuentes" },
      { label: "Quiero sumarme", href: "/unirse" },
    ],
  },
  {
    title: "Electrificarte",
    links: [
      { label: "Web principal", href: WEB_URL, external: true },
      { label: "Catálogo de marcas", href: `${WEB_URL}/marcas`, external: true },
      { label: "Asesoría por WhatsApp", href: `${WEB_URL}/asesoria`, external: true },
      { label: "Contacto", href: CONTACT.webContact, external: true },
    ],
  },
  {
    title: "Contacto",
    links: [
      { label: "Email", href: `mailto:${CONTACT.email}`, external: true },
      { label: "WhatsApp", href: CONTACT.whatsapp, external: true },
      { label: "Página de contacto", href: "/contacto" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Términos y condiciones", href: "/terminos" },
      { label: "Privacidad", href: "/privacidad" },
    ],
  },
];

const SOCIAL_LINKS = [
  { icon: <IconInstagram />, href: SOCIALS.instagram, label: "Instagram" },
  { icon: <IconTikTok />, href: SOCIALS.tiktok, label: "TikTok" },
  { icon: <IconWhatsApp />, href: CONTACT.whatsapp, label: "WhatsApp" },
  { icon: <Icon name="mail" />, href: `mailto:${CONTACT.email}`, label: "email" },
];

/** Footer: la única banda oscura al final de cada página (la sección anterior nunca es oscura). */
export function Footer() {
  return (
    <footer className="footer theme-dark">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <Link href="/" aria-label="Electrificarte Vendedores, inicio" className="inline-block">
              <Logo variant="lockup" className="w-[232px]" />
            </Link>
            <p className="footer__about">
              La red de vendedores oficiales de Electrificarte: contactos de personas interesadas en
              autos electrificados en Chile, para que hagas tu propuesta y cierres directo con ellas.
            </p>
            <p className="footer__about mt-3">
              <a href={`mailto:${CONTACT.email}`} className="link">{CONTACT.email}</a>
            </p>
            <div className="socials">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={`Electrificarte en ${s.label}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {SECTIONS.map((section) => (
            <div key={section.title} className="footer__col">
              <h3>{section.title}</h3>
              <ul>
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target={link.href.startsWith("mailto:") ? undefined : "_blank"}
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link href={link.href}>{link.label}</Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer__bottom">
          <p>Electrificarte S.P.A. © {new Date().getFullYear()}, Santiago de Chile</p>
          <nav aria-label="Legal">
            <Link href="/terminos">Términos</Link>
            <Link href="/privacidad">Privacidad</Link>
            <a href={WEB_URL} target="_blank" rel="noopener noreferrer">electrificarte.com</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
