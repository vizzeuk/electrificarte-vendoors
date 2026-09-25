import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { PageHead } from "@/components/PageHead";
import { CONTACT, PRICE, WEB_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Condiciones de la suscripción a la red de vendedores de Electrificarte y enlace a los términos y condiciones de electrificarte.com.",
};

export default function TerminosPage() {
  return (
    <div className="page">
      <PageHead
        compact
        crumb="Términos y condiciones"
        title="Términos y condiciones"
        lead="Los términos y condiciones de Electrificarte están publicados en la web principal. Acá resumimos lo que este sitio informa sobre la suscripción de vendedores."
        actions={
          <a href={`${WEB_URL}/terminos`} target="_blank" rel="noopener noreferrer" className="btn btn--secondary btn--lg">
            Leer los términos en electrificarte.com
            <Icon name="north_east" />
          </a>
        }
      />

      <section className="section">
        <div className="wrap prose">
          <h2>La suscripción</h2>
          <ul>
            <li>
              Es una suscripción mensual para vendedores oficiales de autos electrificados (100% eléctricos e
              híbridos en cualquiera de sus variantes).
            </li>
            <li>
              Con el descuento de lanzamiento cuesta {PRICE.launch} al mes los primeros {PRICE.launchMonths} meses.
              Desde el cuarto mes, {PRICE.list} al mes.
            </li>
            <li>El pago se hace con Webpay (Transbank) al terminar el registro y se cobra de forma mensual.</li>
            <li>No hay contrato de permanencia ni comisión por venta.</li>
          </ul>

          <h2>Activación de la cuenta</h2>
          <p>
            Después del pago, el equipo de Electrificarte revisa la información del registro y activa la cuenta.
          </p>

          <h2>Los contactos y la venta</h2>
          <p>
            Electrificarte entrega el contacto de personas interesadas en modelos de las marcas que el vendedor
            registró. La cantidad depende de la demanda del momento y no está garantizada. El precio, las
            condiciones y el cierre de cada venta se acuerdan directo entre el vendedor y la persona;
            Electrificarte no media ese cierre.
          </p>

          <h2>Cancelación</h2>
          <p>
            Puedes cancelar sin penalidades avisando con 10 días de anticipación antes de tu próximo ciclo de
            facturación, escribiendo a <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          </p>

          <h2>Documento completo</h2>
          <p>
            Este resumen no reemplaza los <a href={`${WEB_URL}/terminos`} target="_blank" rel="noopener noreferrer">términos
            y condiciones de electrificarte.com</a>. Si tienes dudas, escríbenos a{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
