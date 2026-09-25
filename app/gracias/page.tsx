import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { Icon } from "@/components/Icon";
import { IconWhatsApp } from "@/components/SocialIcons";
import { CONTACT, withShare } from "@/lib/site";

export const metadata: Metadata = withShare("/gracias", {
  title: "Registro recibido",
  description: "Recibimos tu registro en la red de vendedores de Electrificarte.",
  robots: { index: false, follow: false },
});

const NEXT_STEPS = [
  {
    title: "Revisa tu correo",
    text: "Te llega la confirmación del pago de tu suscripción.",
  },
  {
    title: "Revisamos tu información",
    text: "El equipo de Electrificarte revisa tus datos y activa tu cuenta.",
  },
  {
    title: "Te escribimos",
    text: "Te contactamos por WhatsApp o email para darte acceso a tu panel y explicarte cómo te llegan los contactos.",
  },
];

/**
 * Página de gracias tras el pago. La lee el SERVIDOR: la cookie `ev_vendor_session` es
 * httpOnly (la deja /api/unirse), así que el navegador no puede leerla con document.cookie.
 * La versión anterior la buscaba en el cliente y siempre mostraba "Acceso no válido".
 */
export default async function GraciasPage() {
  const store = await cookies();
  const session = store.get("ev_vendor_session")?.value;
  const nombre = store.get("ev_vendor_name")?.value;

  if (!session) {
    return (
      <div className="page">
        <section className="section">
          <div className="wrap">
            <div className="state">
              <Icon name="info" className="state__mark" />
              <h1 className="t-h1">Esta página es para después del pago</h1>
              <p className="t-lead">
                Se muestra al terminar el registro y el pago de la suscripción. Si ya pagaste y llegaste acá
                por otro camino, escríbenos y lo revisamos.
              </p>
              <div className="page-head__actions">
                <Link href="/unirse" className="btn btn--primary btn--lg">
                  Ir al registro
                  <Icon name="arrow_forward" className="arrow" />
                </Link>
                <Link href="/contacto" className="btn btn--secondary btn--lg">
                  Contactar al equipo
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page">
      <section className="section">
        <div className="wrap">
          <div className="state">
            <Icon name="check_circle" className="state__mark" />
            <h1 className="t-h1">
              {nombre ? `Te damos la bienvenida, ${nombre}` : "Te damos la bienvenida a la red"}
            </h1>
            <p className="t-lead">
              Recibimos tu registro en la red de vendedores oficiales de Electrificarte. Ahora el equipo
              revisa tu información y activa tu cuenta.
            </p>
          </div>
        </div>
      </section>

      <section className="section section--subtle" aria-labelledby="pasos-title">
        <div className="wrap">
          <h2 id="pasos-title" className="t-h2">
            Qué pasa ahora
          </h2>
          <ol className="steps-row mt-12">
            {NEXT_STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="step__n">{String(i + 1).padStart(2, "0")}</span>
                <p className="step__title">{s.title}</p>
                <p className="step__text">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap cta-row">
          <div>
            <h2 className="t-h3">¿Tienes una pregunta?</h2>
            <p>
              Escríbenos a{" "}
              <a className="link" href={`mailto:${CONTACT.email}`}>
                {CONTACT.email}
              </a>{" "}
              o por WhatsApp.
            </p>
          </div>
          <div className="cta-row__actions">
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--secondary"
            >
              <IconWhatsApp />
              Escribir por WhatsApp
            </a>
            <Link href="/" className="btn btn--quiet">
              Volver al inicio
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
