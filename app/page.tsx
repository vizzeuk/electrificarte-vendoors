import Image from "next/image";
import Link from "next/link";
import { FaqList } from "@/components/Faq";
import { Icon } from "@/components/Icon";
import { HOME_FAQ, INCLUDES, PRICE } from "@/lib/site";

const FACTS = [
  { num: PRICE.launch, label: `al mes los primeros ${PRICE.launchMonths} meses, con ${PRICE.discount} de descuento` },
  { num: "0%", label: "de comisión por venta cerrada" },
  { num: "5", label: "tecnologías: EV, PHEV, HEV, MHEV y REEV" },
  { num: "Mes a mes", label: "sin contrato de permanencia" },
];

const SOURCES = [
  {
    icon: "directions_car",
    title: "Catálogo de electrificarte.com",
    text: "Personas que revisan fichas de modelos, comparan versiones y calculan cuánto ahorran con un auto electrificado.",
  },
  {
    icon: "mark_email_read",
    title: "Lista de espera de ofertas",
    text: "Personas que dejan sus datos y el modelo que les interesa para recibir ofertas de vendedores oficiales.",
  },
  {
    icon: "forum",
    title: "Asesoría por WhatsApp",
    text: "Personas que están decidiendo qué auto comprar con la asesoría de Electrificarte, según su uso y su presupuesto.",
  },
];

const STEPS = [
  { title: "Te registras", text: "Completas tus datos, tu punto de venta y las marcas que vendes, y pagas la suscripción con Webpay." },
  { title: "Activamos tu cuenta", text: "El equipo de Electrificarte revisa tu información y te da acceso a tu panel de vendedor." },
  { title: "Recibes contactos", text: "Te avisamos por WhatsApp cuando hay personas interesadas en modelos de tus marcas." },
  { title: "Cierras directo", text: "Le haces llegar tu propuesta a la persona y el trato se conversa y cierra entre ustedes." },
];

const WHY = [
  { title: "Demanda que ya existe", text: "Personas que llegaron por un modelo específico. No tienes que invertir en publicidad para encontrarlas." },
  { title: "Tu propuesta, tus condiciones", text: "Tú decides qué ofrecer. Electrificarte no media el cierre ni se queda con parte de la venta." },
  { title: "Un precio fijo al mes", text: "Pagas la suscripción y nada más: sin comisión por venta y sin permanencia." },
];

export default function HomePage() {
  return (
    <>
      {/* Hero: banda oscura sobre foto, primario Glaciar. */}
      <section className="hero theme-dark">
        <div className="hero__media">
          <Image
            src="/imagen-hero3.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="hidden sm:block"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <Image
            src="/imagen-hero3-mobile.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="sm:hidden"
            style={{ objectFit: "cover", objectPosition: "70% center" }}
          />
        </div>
        <div className="hero__veil" />

        <div className="wrap hero__in">
          <h1 className="t-display hero__title">Vende más autos electrificados sin salir a buscar clientes</h1>
          <p className="hero__lead">
            Súmate a la red de vendedores oficiales de Electrificarte y recibe contactos de personas
            interesadas en los modelos que vendes. Tú haces la propuesta y cierras directo con ellas.
          </p>
          <div className="hero__actions">
            <Link href="/unirse" className="btn btn--primary btn--lg">
              Quiero sumarme
              <Icon name="arrow_forward" className="arrow" />
            </Link>
            <Link href="/como-funciona" className="btn btn--secondary btn--lg">
              Cómo funciona
            </Link>
          </div>

          <div className="facts">
            {FACTS.map((f) => (
              <div key={f.label} className="fact">
                <p className="fact__num">{f.num}</p>
                <p className="fact__label">{f.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* De dónde vienen los contactos */}
      <section className="section" aria-labelledby="origen-title">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head__text">
              <h2 id="origen-title" className="t-h2">Contactos que nacen en electrificarte.com</h2>
              <p className="t-lead">
                Electrificarte reúne a personas que están eligiendo su próximo auto electrificado en
                Chile. Cuando alguien muestra interés por un modelo de las marcas que vendes, te llega a ti.
              </p>
            </div>
          </div>
          <div className="trust trust--3">
            {SOURCES.map((s) => (
              <div key={s.title} className="trust__item">
                <Icon name={s.icon} />
                <h3 className="trust__title">{s.title}</h3>
                <p className="trust__text">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="section section--subtle" aria-labelledby="pasos-title">
        <div className="wrap">
          <div className="section-head">
            <div className="section-head__text">
              <h2 id="pasos-title" className="t-h2">Cómo funciona</h2>
              <p className="t-lead">Cuatro pasos entre el registro y tu próxima venta.</p>
            </div>
            <div className="section-head__side">
              <Link href="/como-funciona" className="link-arrow">
                Ver el detalle
                <Icon name="arrow_forward" />
              </Link>
            </div>
          </div>
          <ol className="steps-row steps-row--4">
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="step__n">{String(i + 1).padStart(2, "0")}</span>
                <p className="step__title">{s.title}</p>
                <p className="step__text">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Por qué sumarse */}
      <section className="section" aria-labelledby="ventajas-title">
        <div className="wrap split">
          <div>
            <h2 id="ventajas-title" className="t-h2">Por qué sumarte a la red</h2>
            <p className="t-lead">
              Menos tiempo buscando clientes y más tiempo conversando con quienes ya saben qué modelo quieren.
            </p>
            <div className="split__actions">
              <Link href="/ventajas" className="link-arrow">
                Todas las ventajas
                <Icon name="arrow_forward" />
              </Link>
            </div>
          </div>
          <ol className="rows">
            {WHY.map((w) => (
              <li key={w.title}>
                <Icon name="check" />
                <div>
                  <p className="step__title">{w.title}</p>
                  <p className="step__text">{w.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Precio: el bloque Glaciar de la página */}
      <section id="precio" className="section section--rule" aria-labelledby="precio-title">
        <div className="wrap">
          <div className="soft-block price-block">
            <div>
              <h2 id="precio-title" className="t-h3">Un solo plan, mes a mes</h2>
              <div className="price-block__was">
                <span className="price-was">{PRICE.list}</span>
                <span className="chip chip--solid">{PRICE.discount} de descuento de lanzamiento</span>
              </div>
              <p className="price-block__amount">{PRICE.launch}</p>
              <p className="price-block__per">
                al mes los primeros {PRICE.launchMonths} meses. Luego {PRICE.list} al mes.
              </p>
              <Link href="/unirse" className="btn btn--primary btn--lg">
                Quiero sumarme
                <Icon name="arrow_forward" className="arrow" />
              </Link>
              <p className="t-micro">El descuento viene aplicado. Pagas con Webpay y cancelas cuando quieras.</p>
            </div>
            <div>
              <h3 className="t-h3">Qué incluye</h3>
              <ul className="checklist">
                {INCLUDES.map((item) => (
                  <li key={item}>
                    <Icon name="check" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Preguntas frecuentes */}
      <section className="section section--rule" aria-labelledby="faq-title">
        <div className="wrap faq-2">
          <div className="faq-2__side">
            <h2 id="faq-title" className="t-h2">Preguntas frecuentes</h2>
            <p className="t-lead">Lo que más nos preguntan los vendedores antes de sumarse.</p>
            <Link href="/preguntas-frecuentes" className="link-arrow">
              Ver todas las preguntas
              <Icon name="arrow_forward" />
            </Link>
          </div>
          <FaqList items={HOME_FAQ} />
        </div>
      </section>
    </>
  );
}
