import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";

// URL del checkout de Reveniu para la suscripción de vendedores
const VENDOR_CHECKOUT_URL =
  process.env.VENDOR_CHECKOUT_URL ??
  "https://app.reveniu.com/checkout-custom-link/HWentiqCA9HLbkzJOhE7wpmNUxj6p1D5";

const bodySchema = z.object({
  nombre:        z.string().min(1).max(80),
  apellido:      z.string().min(1).max(80),
  rut:           z.string().min(5).max(15),
  email:         z.string().email(),
  telefono:      z.string().min(11).max(13), // +56XXXXXXXXX
  concesionario: z.string().min(2).max(120),
  region:        z.string().min(2).max(80),
  comuna:        z.string().min(2).max(80),
  marcas:        z.array(z.string()).min(1),
  descuento:     z.boolean().optional(),
});

export async function POST(req: NextRequest) {
  let raw: unknown;
  try {
    raw = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json({ error: "Datos inválidos" }, { status: 400 });
  }
  const data = parsed.data;

  // Token de sesión: vincula el formulario al checkout de Reveniu.
  // Se guarda como cookie corta y se verifica en /gracias.
  const sessionToken = crypto.randomUUID();

  // Notificar a n8n con los datos del vendedor (bloqueante — necesitamos saber si falla)
  const webhookUrl = process.env.N8N_VENDOR_WEBHOOK_URL;
  if (webhookUrl) {
    try {
      const webhookRes = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, sessionToken, source: "vendedores" }),
      });
      if (!webhookRes.ok) {
        console.error("n8n vendor webhook respondió", webhookRes.status, await webhookRes.text());
      }
    } catch (err) {
      console.error("n8n vendor webhook error:", err);
    }
  } else {
    console.warn("N8N_VENDOR_WEBHOOK_URL no está configurado — datos del vendedor no notificados");
  }

  // Construye la URL de retorno que Reveniu usará tras el pago exitoso
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://vendedores.electrificarte.com";
  const successUrl = `${baseUrl}/gracias?token=${sessionToken}`;

  const res = NextResponse.json({ checkoutUrl: VENDOR_CHECKOUT_URL });

  // Cookie que valida la página /gracias (2 horas)
  res.cookies.set("ev_vendor_session", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 2,
    path: "/",
  });

  // Cookie de display (nombre para mostrar en /gracias)
  res.cookies.set("ev_vendor_name", data.nombre, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 2,
    path: "/",
  });

  // Silencia el warning de successUrl no usado — se configurará en el plan de Reveniu
  void successUrl;

  return res;
}
