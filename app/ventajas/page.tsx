import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { JoinCta } from "@/components/JoinCta";
import { PageHead } from "@/components/PageHead";
import { PRICE, withShare } from "@/lib/site";

export const metadata: Metadata = withShare("/ventajas", {
  title: "Ventajas",
  description:
    "Por qué sumarte a la red de vendedores oficiales de Electrificarte: contactos interesados en modelos específicos, sin publicidad, sin comisión por venta y sin permanencia.",
});

const BENEFITS = [
  {
    icon: "person_search",
    title: "Personas que ya eligieron un modelo",
    text: "Cada contacto llega con el modelo que le interesa. Conversas con alguien que ya mostró interés por un auto concreto.",
  },
  {
    icon: "block",
    title: "Sin gestionar publicidad",
    text: "Electrificarte atrae la demanda desde su sitio. Tú no tienes que armar campañas ni pagar por clics.",
  },
  {
    icon: "handshake",
    title: "La venta es tuya",
    text: "Precio, condiciones y entrega los defines tú. El trato se cierra directo entre tú y la persona.",
  },
  {
    icon: "receipt_long",
    title: "Sin comisión por venta",
    text: "Pagas una suscripción mensual y nada más. Lo que ganes por cada auto vendido es tuyo.",
  },
  {
    icon: "bolt",
    title: "Especializado en electrificados",
    text: "Solo autos con batería: 100% eléctricos e híbridos (EV, PHEV, HEV, MHEV y REEV). Un público que está buscando un auto con batería.",
  },
  {
    icon: "event",
    title: "Mes a mes, sin permanencia",
    text: "Cancelas cuando quieras avisando 10 días antes de tu próximo ciclo de facturación.",
  },
];

const FOR_WHO = {
  si: [
    <>Eres <strong>vendedor oficial</strong> de una o más marcas con modelos electrificados.</>,
    <>Quieres sumar clientes a los que ya atiendes en tu punto de venta.</>,
    <>Te acomoda <strong>contactar rápido</strong> y hacer tu propuesta por WhatsApp.</>,
  ],
  no: [
    <>Vendes solo autos 100% a combustión, sin ningún tipo de batería.</>,
    <>Buscas que otro cierre la venta por ti: acá el trato lo cierras tú.</>,
    <>Necesitas una cantidad garantizada de contactos al mes.</>,
  ],
};

export default function VentajasPage() {
  return (
    <div className="page">
      <PageHead
        crumb="Ventajas"
        title="Por qué sumarte a la red"
        lead={`Contactos de personas interesadas en los autos electrificados que vendes, por ${PRICE.launch} al mes los primeros ${PRICE.launchMonths} meses. Sin publicidad, sin comisión y sin permanencia.`}
        actions={
          <>
            <Link href="/unirse" className="btn btn--primary btn--lg">
              Quiero sumarme
              <Icon name="arrow_forward" className="arrow" />
            </Link>
            <Link href="/como-funciona" className="btn btn--secondary btn--lg">
              Cómo funciona
            </Link>
          </>
        }
      />

      <section className="section" aria-labelledby="ventajas-title">
        <div className="wrap">
          <h2 id="ventajas-title" className="sr-only">Ventajas</h2>
          <div className="trust trust--3 trust--grid">
            {BENEFITS.map((b) => (
              <div key={b.title} className="trust__item">
                <Icon name={b.icon} />
                <h3 className="trust__title">{b.title}</h3>
                <p className="trust__text">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--subtle" aria-labelledby="para-quien-title">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head__text">
              <h2 id="para-quien-title" className="t-h2">¿Es para ti?</h2>
              <p className="t-lead">La red funciona mejor para un tipo de vendedor. Mejor saberlo antes de pagar.</p>
            </div>
          </div>
          <div className="fit">
            <div className="fit__col">
              <h3 className="t-h3">Es para ti si</h3>
              <ul>
                {FOR_WHO.si.map((item, i) => (
                  <li key={i}>
                    <Icon name="check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="fit__col fit__col--no">
              <h3 className="t-h3">No es para ti si</h3>
              <ul>
                {FOR_WHO.no.map((item, i) => (
                  <li key={i}>
                    <Icon name="close" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <JoinCta />
    </div>
  );
}
