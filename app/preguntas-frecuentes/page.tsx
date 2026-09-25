import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/Faq";
import { Icon } from "@/components/Icon";
import { PageHead } from "@/components/PageHead";
import { IconWhatsApp } from "@/components/SocialIcons";
import { CONTACT, FAQ_GROUPS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Respuestas sobre la red de vendedores de Electrificarte: cómo llegan los contactos, cuánto cuesta, cómo se paga, cómo cancelar y qué pasa después del registro.",
};

export default function PreguntasFrecuentesPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_GROUPS.flatMap((g) =>
      g.items.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    ),
  };

  return (
    <div className="page">
      <PageHead
        compact
        crumb="Preguntas frecuentes"
        title="Preguntas frecuentes"
        lead="Todo lo que suelen preguntar los vendedores antes de sumarse a la red. Si no encuentras tu respuesta, escríbenos."
      />

      <section className="section">
        <div className="wrap faq-2">
          <aside className="help" aria-label="Ayuda">
            <h2 className="t-h3">¿Te quedó una duda?</h2>
            <p>Escríbenos y te responde el equipo de Electrificarte.</p>
            <div className="help__actions">
              <a href={`mailto:${CONTACT.email}`} className="btn btn--secondary btn--block">
                <Icon name="mail" />
                {CONTACT.email}
              </a>
              <a href={CONTACT.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn--secondary btn--block">
                <IconWhatsApp />
                Escribir por WhatsApp
              </a>
              <Link href="/unirse" className="link-arrow mt-3">
                Ir al registro
                <Icon name="arrow_forward" />
              </Link>
            </div>
          </aside>

          <div>
            {FAQ_GROUPS.map((g) => (
              <div key={g.title} className="faq-group">
                <h2 className="t-h3">{g.title}</h2>
                <FaqList items={g.items} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }}
      />
    </div>
  );
}
