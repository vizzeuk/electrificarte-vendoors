import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import crypto from "crypto";

const REVENIU_API = process.env.REVENIU_API_BASE ?? "https://production.reveniu.com/api/v1";

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

  const orderId = crypto.randomUUID();
  const planId = Number(process.env.REVENIU_VENDOR_PLAN_ID);

  if (!planId) {
    console.error("Falta REVENIU_VENDOR_PLAN_ID en variables de entorno");
    return NextResponse.json({ error: "Configuración de pago no disponible" }, { status: 500 });
  }

  // ── 1. Crear transacción en Reveniu ────────────────────────────────────────
  let completionUrl: string;
  let securityToken: string;
  try {
    const reveniuRes = await fetch(`${REVENIU_API}/subscriptions/`, {
      method: "POST",
      headers: {
        "Reveniu-Secret-Key": process.env.REVENIU_API_KEY ?? "",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan_id: planId,
        external_id: orderId,
        field_values: { email: data.email, name: `${data.nombre} ${data.apellido}` },
      }),
    });
    if (!reveniuRes.ok) {
      console.error("Reveniu respondió", reveniuRes.status, await reveniuRes.text());
      return NextResponse.json({ error: "No se pudo iniciar el pago" }, { status: 502 });
    }
    const json = await reveniuRes.json();
    completionUrl = json.completion_url;
    securityToken = json.security_token;
    if (!completionUrl || !securityToken) {
      return NextResponse.json({ error: "Respuesta de pago incompleta" }, { status: 502 });
    }
  } catch (err) {
    console.error("Error llamando a Reveniu:", err);
    return NextResponse.json({ error: "No se pudo iniciar el pago" }, { status: 502 });
  }

  // ── 2. Notificar a n8n con orderId como external_id ────────────────────────
  const webhookUrl = process.env.N8N_VENDOR_WEBHOOK_URL;
  if (webhookUrl) {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, orderId, status: "pendiente", source: "vendedores" }),
    }).catch((err) => console.error("n8n vendor webhook error:", err));
  } else {
    console.warn("N8N_VENDOR_WEBHOOK_URL no está configurado");
  }

  // ── 3. Cookie + respuesta ──────────────────────────────────────────────────
  const res = NextResponse.json({ completionUrl, securityToken });

  res.cookies.set("ev_vendor_session", orderId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 2,
    path: "/",
  });
  res.cookies.set("ev_vendor_name", data.nombre, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 2,
    path: "/",
  });

  return res;
}
