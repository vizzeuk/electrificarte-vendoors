import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Electrificarte Vendedores: recibe clientes interesados en los autos electrificados que vendes";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Vista previa al compartir el sitio (WhatsApp, LinkedIn, redes). Mismo estilo que la de
 * electrificarte.com: fondo Tinta, logo en Niebla, una sola barra Glaciar, sin glow ni degradados.
 * Satori (next/og) no soporta .webp: el logo va en PNG.
 */
const logo = `data:image/png;base64,${readFileSync(join(process.cwd(), "public/brand/electrificarte-lockup-papel.png")).toString("base64")}`;

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ height: "100%", width: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 96px", backgroundColor: "#0F1716", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width={480} height={64} alt="Electrificarte" />
          <div style={{ display: "flex", marginLeft: 24, padding: "6px 14px", borderRadius: 4, backgroundColor: "#CAEFEA", color: "#0F1716", fontSize: 24, fontWeight: 700 }}>
            Vendedores
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 62, fontWeight: 700, color: "#F2F7F6", marginTop: 56, maxWidth: 980, lineHeight: 1.05, letterSpacing: "-0.02em" }}>
          Vende más autos electrificados sin salir a buscar clientes.
        </div>
        <div style={{ display: "flex", fontSize: 30, color: "#B4BDBC", marginTop: 24, maxWidth: 980 }}>
          Recibe contactos de personas interesadas en los modelos que vendes. $12.990 al mes los primeros 3 meses.
        </div>
        <div style={{ display: "flex", marginTop: 48, height: 8, width: 160, backgroundColor: "#CAEFEA", borderRadius: 4 }} />
      </div>
    ),
    { ...size },
  );
}
