// Datos compartidos del sitio de vendedores: enlaces, precio y preguntas frecuentes.
// Todo el copy es verificable: no hay cifras de resultados (leads por mes, conversión,
// cantidad de vendedores) porque no existen datos publicados. No agregarlas a mano.

export const SITE_URL = "https://vendedores.electrificarte.com";
export const WEB_URL = "https://www.electrificarte.com";

export const CONTACT = {
  email: "vendedores@electrificarte.com",
  whatsapp: "https://wa.me/56932099250",
  whatsappLabel: "+56 9 3209 9250",
  webContact: `${WEB_URL}/contacto`,
};

export const SOCIALS = {
  instagram: "https://www.instagram.com/autos.electricos.con.francisco",
  tiktok: "https://www.tiktok.com/@autos_electricos_con_fco",
};

/** Precio de la suscripción. El monto que se cobra lo define el plan de Reveniu
 *  (REVENIU_VENDOR_PLAN_ID), no este archivo: si el plan cambia, actualizar acá. */
export const PRICE = {
  list: "$25.980",
  launch: "$12.990",
  discount: "50%",
  launchMonths: 3,
};

export const NAV_LINKS = [
  { href: "/como-funciona", label: "Cómo funciona" },
  { href: "/ventajas", label: "Ventajas" },
  { href: "/#precio", label: "Precio" },
  { href: "/contacto", label: "Contacto" },
];

/** Lo que incluye la suscripción (lo mismo que el sitio ya prometía antes del rediseño). */
export const INCLUDES = [
  "Contactos de personas interesadas en modelos de las marcas que vendes",
  "Aviso de cada contacto nuevo por WhatsApp",
  "Acceso a tu panel de vendedor",
  "Sin comisión por venta cerrada",
  "Soporte del equipo Electrificarte",
  "Sin contrato de permanencia",
];

export type Faq = { q: string; a: string };

export const FAQ_GROUPS: { title: string; items: Faq[] }[] = [
  {
    title: "Sobre la red",
    items: [
      {
        q: "¿Qué es la red de vendedores de Electrificarte?",
        a: "Es una suscripción mensual para vendedores oficiales de autos electrificados. Electrificarte genera demanda desde su sitio y tú recibes el contacto de personas interesadas en modelos específicos de las marcas con que trabajas.",
      },
      {
        q: "¿Quién puede sumarse?",
        a: "Vendedores oficiales que venden modelos electrificados: 100% eléctricos (EV) o híbridos en cualquiera de sus variantes (PHEV, HEV, MHEV y REEV). En el registro indicas tu punto de venta, tu región y comuna, y las marcas con que trabajas.",
      },
      {
        q: "¿Electrificarte participa en la venta?",
        a: "No. Electrificarte te conecta con la persona interesada. El precio, las condiciones y la entrega se conversan y se cierran directo entre ustedes; no mediamos el cierre ni cobramos comisión por la venta.",
      },
      {
        q: "¿Compito con otros vendedores?",
        a: "Sí. Una misma persona puede recibir propuestas de más de un vendedor de la red. Su decisión depende de lo que le ofrezcas.",
      },
    ],
  },
  {
    title: "Contactos",
    items: [
      {
        q: "¿De dónde vienen los contactos?",
        a: "De personas que usan electrificarte.com: revisan las fichas del catálogo, comparan modelos, se suman a la lista de espera para recibir ofertas o contratan la asesoría por WhatsApp para decidir qué auto comprar.",
      },
      {
        q: "¿Cómo me llegan?",
        a: "Te avisamos por WhatsApp y los ves en tu panel de vendedor, con el modelo que le interesa a cada persona. Desde ahí le haces llegar tu propuesta y la conversación sigue directo entre ustedes.",
      },
      {
        q: "¿Cuántos contactos voy a recibir?",
        a: "Depende de la demanda del momento por los modelos y marcas que vendes, y de tu zona. No prometemos una cantidad fija al mes.",
      },
    ],
  },
  {
    title: "Precio y pago",
    items: [
      {
        q: "¿Cuánto cuesta?",
        a: `${PRICE.launch} al mes los primeros ${PRICE.launchMonths} meses, con el ${PRICE.discount} de descuento de lanzamiento sobre el precio referencial de ${PRICE.list}. Desde el cuarto mes, ${PRICE.list} al mes.`,
      },
      {
        q: "¿Tengo que hacer algo para tener el descuento?",
        a: "No. El descuento de lanzamiento viene aplicado en el registro; no hay que marcar ninguna opción.",
      },
      {
        q: "¿Cómo se paga?",
        a: "Al terminar el registro pasas a Webpay (Transbank) para pagar con tu tarjeta. La suscripción se cobra de forma mensual.",
      },
      {
        q: "¿Puedo cancelar cuando quiera?",
        a: `Sí, sin penalidades ni permanencia. Solo avísanos con 10 días de anticipación antes de tu próximo ciclo de facturación, escribiendo a ${CONTACT.email}.`,
      },
      {
        q: "¿Cobran comisión por cada venta?",
        a: "No. Pagas solo la suscripción mensual; lo que ganes por la venta es tuyo.",
      },
    ],
  },
  {
    title: "Tu cuenta",
    items: [
      {
        q: "¿Qué necesito para registrarme?",
        a: "Nombre, apellido, RUT, email, teléfono, el punto de venta donde trabajas, tu región y comuna, y las marcas que vendes. Toma un par de minutos.",
      },
      {
        q: "¿Qué pasa después de pagar?",
        a: "El equipo de Electrificarte revisa tu información y activa tu cuenta. Te escribimos por WhatsApp o email para darte el acceso a tu panel y explicarte cómo funciona.",
      },
      {
        q: "Mi marca no aparece en el formulario, ¿qué hago?",
        a: `Escríbenos a ${CONTACT.email} y cuéntanos con qué marca trabajas.`,
      },
    ],
  },
];

/** Las preguntas que se muestran en el home (subconjunto de FAQ_GROUPS). */
export const HOME_FAQ: Faq[] = [
  FAQ_GROUPS[0].items[2],
  FAQ_GROUPS[1].items[0],
  FAQ_GROUPS[1].items[2],
  FAQ_GROUPS[2].items[3],
  FAQ_GROUPS[2].items[4],
];
