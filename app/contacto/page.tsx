import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PageHead } from "@/components/PageHead";
import { IconWhatsApp } from "@/components/SocialIcons";
import { CONTACT, WEB_URL, withShare } from "@/lib/site";

export const metadata: Metadata = withShare("/contacto", {
  title: "Contacto",
  description:
    "Escríbele al equipo de vendedores de Electrificarte: vendedores@electrificarte.com o WhatsApp. Resolvemos dudas sobre la red, tu suscripción y tu cuenta.",
});

export default function ContactoPage() {
  return (
    <div className="page">
      <PageHead
        compact
        crumb="Contacto"
        title="Hablemos"
        lead="¿Tienes dudas sobre la red, tu suscripción o tu cuenta? Escríbenos por el canal que te acomode."
      />

      <section className="section">
        <div className="wrap">
          <div className="channels">
            <div className="card channel">
              <Icon name="mail" />
              <h2 className="channel__title">Email del equipo de vendedores</h2>
              <p className="channel__text">Para dudas sobre la red, tu registro, pagos o cancelaciones.</p>
              <p className="channel__value">{CONTACT.email}</p>
              <a href={`mailto:${CONTACT.email}`} className="btn btn--primary">
                Escribir un email
              </a>
            </div>

            <div className="card channel">
              <IconWhatsApp size={24} />
              <h2 className="channel__title">WhatsApp</h2>
              <p className="channel__text">Para una consulta rápida con el equipo de Electrificarte.</p>
              <p className="channel__value">{CONTACT.whatsappLabel}</p>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--secondary">
                Abrir WhatsApp
              </a>
            </div>

            <div className="card channel">
              <Icon name="public" />
              <h2 className="channel__title">Formulario de electrificarte.com</h2>
              <p className="channel__text">
                Si buscas un auto para ti, o tu consulta no es sobre la red de vendedores, usa el contacto
                de la web principal.
              </p>
              <p className="channel__value">electrificarte.com/contacto</p>
              <a href={CONTACT.webContact} target="_blank" rel="noopener noreferrer" className="btn btn--secondary">
                Ir al formulario
                <Icon name="north_east" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section section--subtle">
        <div className="wrap cta-row">
          <div>
            <h2 className="t-h2">Antes de escribir</h2>
            <p>Puede que tu pregunta ya tenga respuesta: cómo llegan los contactos, cuánto cuesta, cómo cancelar.</p>
          </div>
          <div className="cta-row__actions">
            <Link href="/preguntas-frecuentes" className="btn btn--secondary btn--lg">
              Ver preguntas frecuentes
            </Link>
            <a href={WEB_URL} target="_blank" rel="noopener noreferrer" className="btn btn--quiet btn--lg">
              Ir a electrificarte.com
              <Icon name="north_east" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
