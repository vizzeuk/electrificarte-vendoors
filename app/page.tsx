"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const faqs = [
  {
    q: "¿Cuántos leads puedo recibir al mes?",
    a: "Varía según la disponibilidad de tu zona y la demanda del momento. Todos los leads son personas que completaron el formulario con intención real de compra — no enviamos contactos sin calificar.",
  },
  {
    q: "¿Los leads ya están precalificados?",
    a: "Sí. Antes de enviarte el lead, validamos que el contacto tenga intención real de compra, que sea del segmento correcto y que no haya sido atendido previamente por otro vendedor de la red.",
  },
  {
    q: "¿Puedo cancelar en cualquier momento?",
    a: "Sí, sin penalidades. Solo debes avisar con 10 días de anticipación antes de tu próximo ciclo de facturación.",
  },
  {
    q: "¿Necesito experiencia vendiendo autos eléctricos?",
    a: "No es obligatorio, pero te recomendamos al menos familiarizarte con los modelos más consultados. Tenemos una guía de onboarding que te deja listo en menos de 30 minutos.",
  },
  {
    q: "¿Cómo se entrega el lead?",
    a: "Te llegará en tiempo real por WhatsApp y correo con nombre, teléfono, modelo de interés y presupuesto aproximado. Nada más que necesites.",
  },
];

function FAQItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-gray-200">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left gap-4"
      >
        <span className="text-gray-900 font-medium text-base">{q}</span>
        <span className={`text-primary transition-transform duration-200 flex-shrink-0 ${open ? "rotate-45" : ""}`}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 4v12M4 10h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            style={{ overflow: "hidden" }}
          >
            <p className="pb-5 text-gray-500 text-sm leading-relaxed">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Benefit icons (SVG inline) ─────────────────────────────────────────── */
function IconTarget() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="9" />
      <circle cx="11" cy="11" r="5" />
      <circle cx="11" cy="11" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
function IconBolt() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 2L4 13h7l-2 7 9-11h-7l2-7z" />
    </svg>
  );
}
function IconBan() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="11" cy="11" r="9" />
      <path d="M4.5 4.5l13 13" />
    </svg>
  );
}
function IconShield() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M11 2L3 6v5c0 4.4 3.4 8.5 8 9.5 4.6-1 8-5.1 8-9.5V6L11 2z" />
      <path d="M8 11l2 2 4-4" />
    </svg>
  );
}

export default function HomePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Navbar />
      <main className="flex-1">

        {/* ── HERO — fondo negro ──────────────────────────────── */}
        <section className="relative min-h-screen flex items-center overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
            <div className="absolute top-0 right-0 w-[600px] h-[500px] bg-primary/5 rounded-full blur-[160px]" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[300px] bg-primary/5 rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 pt-24 pb-16 md:pt-28 md:pb-20 w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Copy */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <h1
                  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-4"
                  style={{ fontFamily: "var(--font-space), sans-serif" }}
                >
                  Vende más autos eléctricos{" "}
                  <span className="text-primary">sin buscar clientes</span>
                </h1>

                <p className="text-base md:text-lg text-white/60 mb-7 max-w-xl leading-relaxed">
                  Únete a la red de vendedores de Electrificarte y recibe leads calificados de personas que ya quieren comprar. Sin gestionar publicidad, sin perder tiempo.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/unirse"
                    className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-black font-bold px-8 py-4 rounded-xl transition-all text-lg shadow-[0_6px_32px_rgba(0,229,229,0.30)] hover:shadow-[0_8px_40px_rgba(0,229,229,0.45)] hover:scale-[1.02] active:scale-[0.99]"
                  >
                    Quiero sumarme
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </Link>
                  <a
                    href="#como-funciona"
                    className="inline-flex items-center justify-center gap-2 border border-white/20 hover:border-white/50 hover:bg-white/5 text-white font-medium px-8 py-4 rounded-xl transition-all"
                  >
                    Cómo funciona
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </a>
                </div>
              </motion.div>

              {/* Video placeholder — solo desktop */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-full"
              >
                <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 shadow-[0_8px_48px_rgba(0,229,229,0.12)] bg-white/5 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-primary/15 border border-primary/30 flex items-center justify-center mx-auto mb-3">
                      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                        <path d="M8 5l10 6-10 6V5z" fill="#00E5E5" />
                      </svg>
                    </div>
                    <p className="text-white/30 text-sm">Video próximamente</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── STATS BAR — blanco ──────────────────────────────── */}
        <section className="bg-white border-b border-gray-100 py-8">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x md:divide-gray-100">
              {[
                { value: "3×",    label: "más cierres mensuales" },
                { value: "120+",  label: "modelos disponibles" },
                { value: "24h",   label: "entrega del lead" },
                { value: "100%",  label: "leads con intención" },
              ].map((s) => (
                <div key={s.value} className="text-center md:px-8">
                  <p
                    className="text-3xl font-black text-primary mb-1"
                    style={{ fontFamily: "var(--font-space), sans-serif" }}
                  >
                    {s.value}
                  </p>
                  <p className="text-gray-500 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CÓMO FUNCIONA — roadmap ─────────────────────────── */}
        <section id="como-funciona" className="py-24 bg-white overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <FadeIn className="text-center mb-20">
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">El proceso</p>
              <h2
                className="text-3xl md:text-4xl font-black text-gray-900"
                style={{ fontFamily: "var(--font-space), sans-serif" }}
              >
                Tan simple como recibir y cerrar
              </h2>
            </FadeIn>

            {/* Desktop roadmap */}
            <div className="hidden md:block">
              {/* Track line */}
              <div className="relative flex items-start justify-between gap-0">
                {/* Connecting dashed road behind the nodes */}
                <div className="absolute top-8 left-[calc(16.66%)] right-[calc(16.66%)] h-px border-t-2 border-dashed border-primary/30 z-0" />

                {[
                  {
                    step: "01",
                    icon: "groups",
                    color: "from-primary/20 to-primary/5",
                    title: "Los clientes llegan solos",
                    desc: "Electrificarte atrae compradores a través de su plataforma. Comparan, configuran su búsqueda y manifiestan interés.",
                    tag: "Tráfico orgánico",
                  },
                  {
                    step: "02",
                    icon: "send",
                    color: "from-primary/30 to-primary/10",
                    title: "Te enviamos el lead",
                    desc: "Recibes en tiempo real por WhatsApp: nombre, teléfono, modelo de interés y presupuesto. Nada más.",
                    tag: "Tiempo real · 24h",
                  },
                  {
                    step: "03",
                    icon: "handshake",
                    color: "from-primary/20 to-primary/5",
                    title: "Tú cierras la venta",
                    desc: "Te comunicas directo con el cliente. La relación y la comisión son 100% tuyas.",
                    tag: "100% tu comisión",
                  },
                ].map((item, i) => (
                  <FadeIn key={item.step} delay={i * 0.15} className="flex-1 flex flex-col items-center z-10">
                    {/* Node */}
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} border-2 border-primary/40 flex items-center justify-center mb-6 shadow-[0_0_24px_rgba(0,229,229,0.15)]`}>
                      <span className="material-symbols-outlined text-primary text-[26px]">{item.icon}</span>
                    </div>
                    {/* Card */}
                    <div className="bg-gray-50 border border-gray-100 rounded-2xl p-6 mx-3 text-center">
                      <span className="inline-block bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3">{item.tag}</span>
                      <h3 className="text-gray-900 font-bold text-base mb-2">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </FadeIn>
                ))}
              </div>
            </div>

            {/* Mobile roadmap — vertical */}
            <div className="md:hidden relative pl-8">
              {/* Vertical line */}
              <div className="absolute left-4 top-4 bottom-4 w-px border-l-2 border-dashed border-primary/30" />

              {[
                {
                  step: "01",
                  icon: "groups",
                  title: "Los clientes llegan solos",
                  desc: "Electrificarte atrae compradores. Comparan, configuran y manifiestan interés.",
                  tag: "Tráfico orgánico",
                },
                {
                  step: "02",
                  icon: "send",
                  title: "Te enviamos el lead",
                  desc: "Recibes en tiempo real por WhatsApp con todos los datos del contacto.",
                  tag: "Tiempo real · 24h",
                },
                {
                  step: "03",
                  icon: "handshake",
                  title: "Tú cierras la venta",
                  desc: "La relación y la comisión son 100% tuyas.",
                  tag: "100% tu comisión",
                },
              ].map((item, i) => (
                <FadeIn key={item.step} delay={i * 0.12} className="relative mb-8 last:mb-0">
                  {/* Node dot */}
                  <div className="absolute -left-8 top-4 w-8 h-8 rounded-full bg-primary/15 border-2 border-primary/40 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-[14px]">{item.icon}</span>
                  </div>
                  <div className="bg-gray-50 border border-gray-100 rounded-2xl p-5">
                    <span className="inline-block bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-2">{item.tag}</span>
                    <h3 className="text-gray-900 font-bold mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEFICIOS — negro ──────────────────────────────── */}
        <section className="py-24 bg-black">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <FadeIn className="text-center mb-16">
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Ventajas</p>
              <h2
                className="text-3xl md:text-4xl font-black text-white"
                style={{ fontFamily: "var(--font-space), sans-serif" }}
              >
                Todo lo que ganas al unirte
              </h2>
            </FadeIn>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <IconTarget />,
                  title: "Leads precalificados",
                  desc: "Cada contacto ya completó el formulario con intención real. Sin curiosos, sin pérdida de tiempo.",
                },
                {
                  icon: <IconBolt />,
                  title: "Entrega en 24 horas",
                  desc: "El lead llega el mismo día en que el cliente se interesa. La ventana de cierre es máxima.",
                },
                {
                  icon: <IconBan />,
                  title: "Sin gestión de publicidad",
                  desc: "No necesitas invertir en Google Ads, redes sociales ni portales de autos. Nosotros lo hacemos.",
                },
                {
                  icon: <IconShield />,
                  title: "Red exclusiva y controlada",
                  desc: "Cupo limitado de vendedores por zona. Más leads para ti, menos competencia interna.",
                },
              ].map((b, i) => (
                <FadeIn key={b.title} delay={i * 0.1}>
                  <div className="flex gap-5 bg-white/5 border border-white/10 rounded-2xl p-6">
                    <span className="text-primary mt-0.5 flex-shrink-0">{b.icon}</span>
                    <div>
                      <h3 className="text-white font-bold mb-1">{b.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{b.desc}</p>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRECIOS — blanco ────────────────────────────────── */}
        <section id="precios" className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <FadeIn className="text-center mb-16">
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">Precio</p>
              <h2
                className="text-3xl md:text-4xl font-black text-gray-900"
                style={{ fontFamily: "var(--font-space), sans-serif" }}
              >
                Un plan simple y transparente
              </h2>
            </FadeIn>

            <FadeIn>
              <div className="relative bg-black border border-primary/20 rounded-3xl p-8 md:p-12 text-center shadow-[0_0_80px_rgba(0,229,229,0.08)]">
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-black text-xs font-black px-4 py-1 rounded-full uppercase tracking-wide">
                  Precio de lanzamiento
                </span>
                <div className="flex items-end justify-center gap-2 mb-2 flex-wrap">
                  <span className="text-white/30 text-lg sm:text-2xl line-through">$25.980</span>
                  <span
                    className="text-4xl sm:text-6xl font-black text-white"
                    style={{ fontFamily: "var(--font-space), sans-serif" }}
                  >
                    $12.990
                  </span>
                  <span className="text-white/50 text-sm sm:text-base mb-1 sm:mb-2">/mes</span>
                </div>
                <p className="text-white/40 text-xs sm:text-sm mb-8 md:mb-10">50% dcto · 3 primeros meses · Luego $25.980/mes · Cancela cuando quieras</p>

                <ul className="text-left max-w-sm mx-auto space-y-3 mb-10">
                  {[
                    "Leads calificados según disponibilidad de tu zona",
                    "Entrega en tiempo real por WhatsApp",
                    "Acceso al panel de seguimiento",
                    "Soporte prioritario",
                    "Sin contrato de permanencia",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3 text-white/70 text-sm">
                      <span className="text-primary mt-0.5 flex-shrink-0">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 7l4 4 6-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </span>
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/unirse"
                  className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-black font-bold px-10 py-4 rounded-xl transition-all text-base shadow-[0_4px_20px_rgba(0,229,229,0.25)] hover:scale-[1.02] active:scale-[0.99]"
                >
                  Comenzar ahora
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </Link>
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── FAQ — gris claro ────────────────────────────────── */}
        <section id="faq" className="py-24 bg-gray-50">
          <div className="max-w-2xl mx-auto px-4 md:px-8">
            <FadeIn className="text-center mb-12">
              <p className="text-primary text-sm font-semibold uppercase tracking-widest mb-3">FAQ</p>
              <h2
                className="text-3xl md:text-4xl font-black text-gray-900"
                style={{ fontFamily: "var(--font-space), sans-serif" }}
              >
                Preguntas frecuentes
              </h2>
            </FadeIn>

            <FadeIn>
              <div className="bg-white rounded-2xl border border-gray-100 px-6 md:px-8">
                {faqs.map((f, i) => (
                  <FAQItem
                    key={f.q}
                    q={f.q}
                    a={f.a}
                    open={openFaq === i}
                    onToggle={() => setOpenFaq(openFaq === i ? null : i)}
                  />
                ))}
              </div>
            </FadeIn>
          </div>
        </section>

        {/* ── FINAL CTA — negro ───────────────────────────────── */}
        <section className="py-24 bg-black">
          <div className="max-w-3xl mx-auto px-4 md:px-8 text-center">
            <FadeIn>
              <h2
                className="text-3xl md:text-5xl font-black text-white mb-6"
                style={{ fontFamily: "var(--font-space), sans-serif" }}
              >
                ¿Listo para recibir tus{" "}
                <span className="text-primary">primeros leads?</span>
              </h2>
              <p className="text-white/50 text-lg mb-10 max-w-xl mx-auto">
                El mercado de autos eléctricos en Chile crece cada mes. Los vendedores que entren ahora capturan la demanda de los próximos años.
              </p>
              <Link
                href="/unirse"
                className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-black font-bold px-10 py-4 rounded-xl transition-all text-lg shadow-[0_6px_32px_rgba(0,229,229,0.30)] hover:shadow-[0_8px_40px_rgba(0,229,229,0.45)] hover:scale-[1.02] active:scale-[0.99]"
              >
                Quiero sumarme a la red
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M3 9h12M11 5l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
            </FadeIn>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
