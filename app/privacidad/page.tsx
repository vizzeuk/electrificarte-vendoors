import type { Metadata } from "next";
import { Icon } from "@/components/Icon";
import { PageHead } from "@/components/PageHead";
import { CONTACT, WEB_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacidad",
  description:
    "Qué datos pide el registro de vendedores de Electrificarte, para qué se usan y enlace a la política de privacidad de electrificarte.com.",
};

export default function PrivacidadPage() {
  return (
    <div className="page">
      <PageHead
        compact
        crumb="Privacidad"
        title="Privacidad"
        lead="La política de privacidad de Electrificarte está publicada en la web principal. Acá explicamos qué datos pide este sitio y para qué."
        actions={
          <a href={`${WEB_URL}/privacidad`} target="_blank" rel="noopener noreferrer" className="btn btn--secondary btn--lg">
            Leer la política en electrificarte.com
            <Icon name="north_east" />
          </a>
        }
      />

      <section className="section">
        <div className="wrap prose">
          <h2>Qué datos pedimos</h2>
          <p>El formulario de registro pide:</p>
          <ul>
            <li>Nombre, apellido y RUT.</li>
            <li>Email y teléfono móvil.</li>
            <li>Punto de venta, región y comuna.</li>
            <li>Las marcas con que trabajas.</li>
          </ul>

          <h2>Para qué los usamos</h2>
          <p>
            Para registrar tu suscripción, revisar y activar tu cuenta, escribirte por WhatsApp o email, y
            avisarte de contactos interesados en modelos de las marcas que vendes.
          </p>

          <h2>El pago</h2>
          <p>
            El pago se procesa con Reveniu y Webpay (Transbank). Los datos de tu tarjeta los ingresas en Webpay:
            este sitio no los recibe ni los guarda.
          </p>

          <h2>Cookies de este sitio</h2>
          <p>
            Al enviar el registro guardamos dos cookies por dos horas: un identificador del registro y tu
            nombre, para mostrarte la página de confirmación después del pago.
          </p>

          <h2>Tus datos</h2>
          <p>
            Para consultar o corregir tus datos, escríbenos a{" "}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>. El detalle completo está en la{" "}
            <a href={`${WEB_URL}/privacidad`} target="_blank" rel="noopener noreferrer">política de privacidad de
            electrificarte.com</a>.
          </p>
        </div>
      </section>
    </div>
  );
}
