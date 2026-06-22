"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export default function GraciasPage() {
  const [nombre, setNombre] = useState<string | null>(null);
  const [valid,  setValid]  = useState<boolean | null>(null); // null = loading

  useEffect(() => {
    const session = getCookie("ev_vendor_session");
    const name    = getCookie("ev_vendor_name");
    setValid(!!session);
    setNombre(name);
  }, []);

  // Aún cargando (SSR → CSR hydration)
  if (valid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  // Sin cookie válida → no vino de un checkout legítimo
  if (!valid) {
    return (
      <>
        <Navbar />
        <main className="flex-1 bg-gray-50 min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 bg-red-50 border border-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <path d="M14 9v6M14 19h.01" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="14" cy="14" r="11" stroke="#EF4444" strokeWidth="2" />
              </svg>
            </div>
            <h1 className="text-2xl font-black text-gray-900 mb-3" style={{ fontFamily: "var(--font-space), sans-serif" }}>
              Acceso no válido
            </h1>
            <p className="text-gray-500 text-base mb-8">
              Esta página solo es accesible después de completar el pago. Si crees que es un error, contáctanos.
            </p>
            <Link
              href="/unirse"
              className="inline-flex items-center gap-2 bg-primary text-black font-bold px-6 py-3 rounded-xl text-sm"
            >
              Volver al formulario
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 bg-white min-h-screen">

        {/* Hero de confirmación */}
        <section className="bg-black pt-28 pb-20 relative overflow-hidden">
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{
              backgroundImage: "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/8 rounded-full blur-[120px] pointer-events-none" />

          <div className="max-w-3xl mx-auto px-4 md:px-8 text-center relative z-10">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Checkmark */}
              <div className="w-20 h-20 bg-primary/10 border-2 border-primary/30 rounded-full flex items-center justify-center mx-auto mb-8">
                <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                  <path d="M8 18l7 7 13-15" stroke="#00E5E5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>

              <p className="text-primary text-[11px] font-bold uppercase tracking-widest mb-4">
                Pago confirmado · Bienvenido a la red
              </p>
              <h1
                className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-5"
                style={{ fontFamily: "var(--font-space), sans-serif" }}
              >
                {nombre ? `¡Bienvenido${nombre ? `, ${nombre}` : ""}!` : "¡Tu suscripción está activa!"}
              </h1>
              <p className="text-white/60 text-lg max-w-xl mx-auto">
                Ya formas parte de la red exclusiva de vendedores de Electrificarte. En las próximas <strong className="text-white">24 horas</strong> te contactaremos para activar tu acceso al panel.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Próximos pasos */}
        <section className="py-16 md:py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            >
              <h2
                className="text-2xl font-black text-gray-900 text-center mb-10"
                style={{ fontFamily: "var(--font-space), sans-serif" }}
              >
                ¿Qué pasa ahora?
              </h2>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  {
                    icon: "mail",
                    title: "Revisa tu correo",
                    desc: "Te llegará la confirmación de pago y los datos de acceso a tu panel en las próximas horas.",
                  },
                  {
                    icon: "whatsapp",
                    title: "Te contactamos por WhatsApp",
                    desc: "Un miembro del equipo Electrificarte se pondrá en contacto para activar tu cuenta y explicarte el proceso.",
                  },
                  {
                    icon: "groups",
                    title: "Empieza a recibir leads",
                    desc: "Una vez activada tu cuenta, los primeros leads calificados llegarán directamente a tu WhatsApp.",
                  },
                ].map((step, i) => (
                  <div key={step.title} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
                    <div className="w-12 h-12 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <span className="material-symbols-outlined text-primary text-[22px]">{step.icon}</span>
                    </div>
                    <p className="text-white/30 text-xs font-bold tracking-widest mb-2 text-gray-400">{String(i + 1).padStart(2, "0")}</p>
                    <h3 className="font-bold text-gray-900 mb-2 text-sm">{step.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* CTA volver */}
        <section className="py-12 bg-white border-t border-gray-100">
          <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
            <p className="text-gray-500 text-sm mb-4">¿Tienes preguntas? Escríbenos a contacto@electrificarte.com</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-primary hover:text-primary-dark text-sm font-medium transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M10 7H4M6 4L3 7l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Volver al inicio
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
