import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export const metadata: Metadata = {
  title: "Electrificarte Vendedores | Triplica tus ventas de autos eléctricos",
  description:
    "Únete a la red de vendedores de Electrificarte y recibe decenas de clientes calificados cada semana. Sin gestionar publicidad.",
  metadataBase: new URL("https://vendedores.electrificarte.cl"),
  openGraph: {
    title: "Electrificarte Vendedores",
    description: "Triplica tus ventas de autos eléctricos con leads calificados.",
    siteName: "Electrificarte Vendedores",
    locale: "es_CL",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${inter.variable} ${spaceGrotesk.variable}`}>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
