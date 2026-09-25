import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { JoinCta } from "@/components/JoinCta";
import { PageHead } from "@/components/PageHead";
import { PRICE, WEB_URL, withShare } from "@/lib/site";

export const metadata: Metadata = withShare("/como-funciona", {
  title: "Cómo funciona",
  description:
    "Paso a paso de la red de vendedores de Electrificarte: te registras, activamos tu cuenta, recibes contactos de personas interesadas en tus modelos y cierras directo con ellas.",
});

const STEPS = [
  {
    title: "Te registras",
    text: [
      "Completas un formulario corto con tus datos y los de tu punto de venta, y eliges las marcas que vendes. Son las marcas por las que te van a llegar contactos.",
    ],
    list: ["Nombre, apellido y RUT", "Email y teléfono móvil", "Punto de venta, región y comuna", "Marcas con que trabajas"],
  },
  {
    title: "Pagas la suscripción con Webpay",
    text: [
      `Al terminar el registro pasas directo a Webpay (Transbank). Con el descuento de lanzamiento pagas ${PRICE.launch} al mes los primeros ${PRICE.launchMonths} meses; desde el cuarto mes, ${PRICE.list} al mes.`,
      "No hay contrato de permanencia ni comisión por venta.",
    ],
  },
  {
    title: "Activamos tu cuenta",
    text: [
      "El equipo de Electrificarte revisa tu información y activa tu cuenta. Te escribimos por WhatsApp o email para darte acceso a tu panel de vendedor y explicarte cómo funciona.",
    ],
  },
  {
    title: "Recibes contactos interesados",
    text: [
      "Cuando una persona muestra interés en un modelo de las marcas que vendes, te avisamos por WhatsApp y la ves en tu panel, con el modelo que le interesa.",
      "La cantidad depende de la demanda del momento por esos modelos y de tu zona: no hay un número fijo al mes.",
    ],
  },
  {
    title: "Haces tu propuesta y cierras directo",
    text: [
      "Le haces llegar tu propuesta a la persona. Desde ahí conversan directo, por WhatsApp, y el trato se cierra entre ustedes.",
      "Electrificarte no media el cierre ni se queda con parte de la venta. Otros vendedores de la red también pueden hacerle una propuesta: la decisión es de la persona.",
    ],
  },
];

const ROLES = {
  electrificarte: [
    "Atrae a personas que están eligiendo su auto electrificado en electrificarte.com",
    "Te avisa cuando alguien se interesa por un modelo de tus marcas",
    "Te da acceso a tu panel de vendedor",
    "Resuelve tus dudas sobre la red y tu suscripción",
  ],
  tu: [
    "Contactas a la persona y le haces tu propuesta",
    "Defines precio, condiciones y entrega",
    "Coordinas la prueba de manejo, si la pide",
    "Cierras la venta, sin comisión para Electrificarte",
  ],
};

export default function ComoFuncionaPage() {
  return (
    <div className="page">
      <PageHead
        crumb="Cómo funciona"
        title="Cómo funciona la red de vendedores"
        lead="Electrificarte genera la demanda desde su sitio y tú la conviertes en ventas. Este es el camino completo, desde el registro hasta el cierre."
        actions={
          <>
            <Link href="/unirse" className="btn btn--primary btn--lg">
              Quiero sumarme
              <Icon name="arrow_forward" className="arrow" />
            </Link>
            <Link href="/preguntas-frecuentes" className="btn btn--secondary btn--lg">
              Preguntas frecuentes
            </Link>
          </>
        }
      />

      <section className="section" aria-labelledby="pasos-title">
        <div className="wrap">
          <h2 id="pasos-title" className="sr-only">Paso a paso</h2>
          <ol className="timeline">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <div className="timeline__head">
                  <span className="step__n">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="t-h3">{s.title}</h3>
                </div>
                <div className="timeline__body">
                  {s.text.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                  {s.list && (
                    <ul className="checklist checklist--sm">
                      {s.list.map((item) => (
                        <li key={item}>
                          <Icon name="check" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--subtle" aria-labelledby="roles-title">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head__text">
              <h2 id="roles-title" className="t-h2">Qué hace cada uno</h2>
              <p className="t-lead">Electrificarte conecta. La venta es tuya, de principio a fin.</p>
            </div>
          </div>
          <div className="fit">
            <div className="fit__col">
              <h3 className="t-h3">Electrificarte</h3>
              <ul>
                {ROLES.electrificarte.map((r) => (
                  <li key={r}>
                    <Icon name="check" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
            <div className="fit__col">
              <h3 className="t-h3">Tú</h3>
              <ul>
                {ROLES.tu.map((r) => (
                  <li key={r}>
                    <Icon name="check" />
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="origen-title">
        <div className="wrap split">
          <div>
            <h2 id="origen-title" className="t-h2">De dónde vienen los contactos</h2>
            <p className="t-lead">
              De personas que usan electrificarte.com para elegir su próximo auto electrificado: 100%
              eléctrico o híbrido en cualquiera de sus variantes.
            </p>
            <div className="split__actions">
              <a href={WEB_URL} target="_blank" rel="noopener noreferrer" className="link-arrow">
                Conocer electrificarte.com
                <Icon name="north_east" />
              </a>
            </div>
          </div>
          <ul className="rows">
            <li>
              <Icon name="directions_car" />
              <div>
                <p className="step__title">Catálogo y comparador</p>
                <p className="step__text">Fichas de modelos, comparador de versiones y calculadora de ahorro.</p>
              </div>
            </li>
            <li>
              <Icon name="mark_email_read" />
              <div>
                <p className="step__title">Lista de espera de ofertas</p>
                <p className="step__text">Personas que dejan sus datos y el modelo que les interesa para recibir ofertas.</p>
              </div>
            </li>
            <li>
              <Icon name="forum" />
              <div>
                <p className="step__title">Asesoría por WhatsApp</p>
                <p className="step__text">Personas que deciden qué comprar con un asesor, según su uso y su presupuesto.</p>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <JoinCta />
    </div>
  );
}
