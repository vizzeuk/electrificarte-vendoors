import Link from "next/link";
import { Icon } from "@/components/Icon";
import { PRICE } from "@/lib/site";

/** Llamada final (bloque Glaciar: el único de la página). Nunca oscura: el footer ya lo es. */
export function JoinCta({
  title = "Súmate a la red de vendedores",
  text = `${PRICE.launch} al mes los primeros ${PRICE.launchMonths} meses, sin permanencia. El registro toma un par de minutos.`,
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="section">
      <div className="wrap">
        <div className="soft-block cta-row">
          <div>
            <h2 className="t-h2">{title}</h2>
            <p>{text}</p>
          </div>
          <div className="cta-row__actions">
            <Link href="/unirse" className="btn btn--primary btn--lg">
              Quiero sumarme
              <Icon name="arrow_forward" className="arrow" />
            </Link>
            <Link href="/contacto" className="btn btn--secondary btn--lg">
              Tengo una pregunta
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
