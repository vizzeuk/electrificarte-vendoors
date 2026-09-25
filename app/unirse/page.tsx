import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { PageHead } from "@/components/PageHead";
import { JoinForm } from "@/components/JoinForm";
import { INCLUDES, PRICE, withShare } from "@/lib/site";

export const metadata: Metadata = withShare("/unirse", {
  title: "Súmate a la red",
  description: `Regístrate en la red de vendedores oficiales de Electrificarte: ${PRICE.launch} al mes los primeros ${PRICE.launchMonths} meses, sin permanencia. Pago con Webpay.`,
});

export default function UnirsePage() {
  return (
    <div className="page">
      <PageHead
        compact
        crumb="Súmate a la red"
        title="Súmate a la red de vendedores"
        lead="Completa tus datos, elige las marcas que vendes y paga la suscripción con Webpay. Después, el equipo revisa tu información y activa tu cuenta."
      />

      <section className="section section--subtle">
        <div className="wrap join">
          <JoinForm />

          <aside className="join__aside" aria-label="Resumen de la suscripción">
            <div className="card pricebox">
              <p className="pricebox__title">Suscripción mensual</p>
              <span className="chip chip--soft">Descuento de lanzamiento aplicado</span>
              <dl className="pricebox__rows">
                <div>
                  <dt>Precio referencial</dt>
                  <dd className="price-was">{PRICE.list} al mes</dd>
                </div>
                <div>
                  <dt>Descuento de lanzamiento</dt>
                  <dd>{PRICE.discount}</dd>
                </div>
                <div>
                  <dt>Desde el cuarto mes</dt>
                  <dd>{PRICE.list} al mes</dd>
                </div>
              </dl>
              <div className="pricebox__total">
                <div>
                  <p className="t-small">Primeros {PRICE.launchMonths} meses</p>
                  <p className="t-label">por mes</p>
                </div>
                <p className="price price--lg">{PRICE.launch}</p>
              </div>
              <p className="t-micro">Sin permanencia. Para cancelar, avísanos 10 días antes de tu próximo ciclo.</p>
            </div>

            <div className="card pricebox">
              <p className="pricebox__title">Qué incluye</p>
              <ul className="checklist checklist--sm mt-5">
                {INCLUDES.map((item) => (
                  <li key={item}>
                    <Icon name="check" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </div>
  );
}
