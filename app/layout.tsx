import type { Metadata } from "next";
import localFont from "next/font/local";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

// Cabinet Grotesk (títulos) y Switzer (todo lo demás), de Fontshare. No se versionan
// (licencia ITF FFL): scripts/fetch-fonts.mjs las baja a app/fonts/fontshare/ en predev/prebuild.
const cabinet = localFont({
  src: [
    { path: "./fonts/fontshare/CabinetGrotesk-700.woff2", weight: "700" },
    { path: "./fonts/fontshare/CabinetGrotesk-800.woff2", weight: "800" },
  ],
  variable: "--font-cabinet",
  display: "swap",
});

const switzer = localFont({
  src: [
    { path: "./fonts/fontshare/Switzer-400.woff2", weight: "400" },
    { path: "./fonts/fontshare/Switzer-500.woff2", weight: "500" },
    { path: "./fonts/fontshare/Switzer-600.woff2", weight: "600" },
    { path: "./fonts/fontshare/Switzer-700.woff2", weight: "700" },
  ],
  variable: "--font-switzer",
  display: "swap",
});

// Material Symbols: subset self-hosted copiado de electrificarteweb (ver components/Icon.tsx).
const materialSymbols = localFont({
  src: "./fonts/material-symbols-outlined.woff2",
  variable: "--font-symbols",
  display: "block",
  weight: "100 700",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Electrificarte Vendedores | Recibe clientes interesados en autos electrificados",
    template: "%s | Electrificarte Vendedores",
  },
  description:
    "Súmate a la red de vendedores oficiales de Electrificarte y recibe contactos de personas interesadas en los modelos electrificados que vendes. Suscripción mensual, sin permanencia.",
  openGraph: {
    title: "Electrificarte Vendedores",
    description:
      "Recibe contactos de personas interesadas en los autos electrificados que vendes. Tú haces la propuesta y cierras directo con el cliente.",
    siteName: "Electrificarte Vendedores",
    locale: "es_CL",
    type: "website",
    url: "/",
  },
  // La imagen sale de app/opengraph-image.tsx (Next la agrega sola a og:image y twitter:image).
  twitter: {
    card: "summary_large_image",
    title: "Electrificarte Vendedores",
    description: "Recibe contactos de personas interesadas en los autos electrificados que vendes.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-CL" className={`${cabinet.variable} ${switzer.variable} ${materialSymbols.variable}`}>
      <body className="flex min-h-svh flex-col">
        <Navbar />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
