"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { REGIONES } from "@/lib/regiones-chile";

const BRANDS = [
  "Tesla","BYD","Volvo","MG","Dongfeng","Haval","JAC","Toyota","Hyundai",
  "Mazda","Suzuki","Link&CO","Smart","Nammi","Ford","Geely","Riddara",
  "Peugeot","Renault","Citroen","Jeep","RAM","Chevrolet","Neta","Deepal",
  "Avatr","GWM",
];

// ── RUT formatting ───────────────────────────────────────────────────────────
function formatRut(value: string) {
  const clean = value.replace(/[^0-9kK]/g, "").toUpperCase();
  if (clean.length <= 1) return clean;
  const body = clean.slice(0, -1);
  const dv   = clean.slice(-1);
  const formatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${formatted}-${dv}`;
}

// ── Validación real de RUT chileno (Módulo 11) ───────────────────────────────
function validateRut(rut: string): boolean {
  const clean = rut.replace(/[^0-9kK]/g, "").toUpperCase();
  if (clean.length < 2) return false;
  const body = clean.slice(0, -1);
  const dv   = clean.slice(-1);
  let sum = 0;
  let multiplier = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }
  const remainder = sum % 11;
  const expected = remainder === 0 ? "0" : remainder === 1 ? "K" : String(11 - remainder);
  return dv === expected;
}

// ── Normalización de teléfono +56 ────────────────────────────────────────────
function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  // Quita prefijo 56 si ya está
  const stripped = digits.startsWith("56") && digits.length > 9 ? digits.slice(2) : digits;
  return stripped.slice(0, 9);
}

export default function UnirsePage() {
  const [loading,   setLoading]   = useState(false);
  const [error,     setError]     = useState<string | null>(null);
  const [descuento, setDescuento] = useState(false);
  const [brands,    setBrands]    = useState<string[]>([]);
  const [rutError,  setRutError]  = useState(false);
  const [form, setForm] = useState({
    nombre: "", apellido: "", rut: "", email: "",
    telefono: "", concesionario: "", region: "", comuna: "",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    if (name === "rut") {
      const formatted = formatRut(value);
      setForm((f) => ({ ...f, rut: formatted }));
      if (rutError && formatted.length > 3) setRutError(!validateRut(formatted));
    } else if (name === "telefono") {
      setForm((f) => ({ ...f, telefono: normalizePhone(value) }));
    } else if (name === "region") {
      setForm((f) => ({ ...f, region: value, comuna: "" }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  const comunasDeRegion = REGIONES.find((r) => r.region === form.region)?.comunas ?? [];

  function handlePhoneDisplay(raw: string): string {
    return raw ? `+56 ${raw}` : "";
  }

  function toggleBrand(brand: string) {
    setBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setError(null);

    // Validar RUT antes de enviar
    if (!validateRut(form.rut)) {
      setRutError(true);
      return;
    }
    if (brands.length === 0) return;
    if (form.telefono.length !== 9) {
      setError("El teléfono debe tener exactamente 9 dígitos después del +56.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/unirse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          telefono: `+56${form.telefono}`,
          marcas: brands,
          descuento,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Error al enviar");
      // Redirigir a Reveniu
      window.location.href = json.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error. Intenta nuevamente.");
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />

      {/* ── Hero — negro ────────────────────────────────────── */}
      <section className="bg-black pt-20 pb-0 overflow-hidden relative">
        <div
          className="absolute inset-0 opacity-[0.025] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.15) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="pb-8"
          >
            <p className="text-primary text-[11px] font-bold uppercase tracking-widest mb-4">
              Red exclusiva · Vendedores
            </p>
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-5"
              style={{ fontFamily: "var(--font-space), sans-serif" }}
            >
              Empieza a recibir leads{" "}
              <span className="text-primary">en menos de 24 horas</span>
            </h1>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {[
                { icon: "schedule",  label: "Activación en 24 h" },
                { icon: "lock",      label: "Sin permanencia" },
                { icon: "verified",  label: "Leads con intención real" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5 text-white/50 text-xs">
                  <span className="material-symbols-outlined text-primary text-[14px]">{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Steps strip */}
          <div className="border-t border-white/10 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { n: "01", icon: "edit_note",       title: "Completa el formulario",    desc: "Cuéntanos con qué marcas trabajas y dónde está tu concesionario." },
              { n: "02", icon: "payments",         title: "Activa tu cuenta",          desc: "Elige si quieres el descuento de lanzamiento del 50%." },
              { n: "03", icon: "mark_email_read",  title: "Recibe tus primeros leads", desc: "En menos de 24 horas comenzamos a enviarte contactos calificados." },
            ].map((s, i, arr) => (
              <div key={s.n} className="flex items-start gap-3 relative">
                {i < arr.length - 1 && (
                  <div className="hidden sm:block absolute right-0 top-4 w-px h-full border-r border-white/10" />
                )}
                <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-[14px]">{s.icon}</span>
                </div>
                <div>
                  <p className="text-white/30 text-[9px] font-bold tracking-widest mb-0.5">{s.n}</p>
                  <h3 className="text-white text-sm font-bold leading-snug mb-0.5">{s.title}</h3>
                  <p className="text-white/40 text-xs leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formulario + sidebar — blanco ───────────────────── */}
      <main className="flex-1 bg-gray-50 py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">

            {/* ── Sidebar ───────────────────────────────── */}
            <aside className="lg:col-span-4 space-y-5 lg:sticky lg:top-28 lg:self-start order-2 lg:order-1">

              {/* What you get */}
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2 text-sm">
                  <span className="material-symbols-outlined text-primary text-[18px]">verified</span>
                  Qué incluye tu suscripción
                </h3>
                <ul className="space-y-2.5">
                  {[
                    "Leads calificados con intención real de compra",
                    "Entrega en tiempo real por WhatsApp",
                    "Acceso al panel de seguimiento",
                    "Sin comisión por venta cerrada",
                    "Soporte prioritario de lunes a viernes",
                    "Cancela cuando quieras, sin penalidades",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <span className="material-symbols-outlined text-primary text-[14px] mt-0.5 flex-shrink-0">check_circle</span>
                      <span className="text-sm text-gray-500">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing */}
              <div className="bg-black rounded-2xl p-6 border border-primary/20 shadow-[0_0_40px_rgba(0,229,229,0.06)]">
                <div className="flex items-baseline justify-between mb-1">
                  <span className="text-white/50 text-sm">Precio referencial</span>
                  <span className="text-white/30 text-sm line-through">$25.980</span>
                </div>
                {descuento ? (
                  <>
                    <div className="flex items-baseline justify-between">
                      <span className="text-white font-bold text-sm">3 meses con descuento</span>
                      <span
                        className="text-3xl font-black text-primary"
                        style={{ fontFamily: "var(--font-space), sans-serif" }}
                      >
                        $12.990
                      </span>
                    </div>
                    <p className="text-[10px] text-primary/60 mt-1 uppercase tracking-wide">50% dcto · Solo por tiempo limitado</p>
                  </>
                ) : (
                  <>
                    <div className="flex items-baseline justify-between">
                      <span className="text-white font-bold text-sm">Precio mensual</span>
                      <span
                        className="text-3xl font-black text-white"
                        style={{ fontFamily: "var(--font-space), sans-serif" }}
                      >
                        $25.980
                      </span>
                    </div>
                    <p className="text-[10px] text-white/30 mt-1 uppercase tracking-wide">+ IVA · Cancela cuando quieras</p>
                  </>
                )}
              </div>

            </aside>

            {/* ── Form ──────────────────────────────────── */}
            <div className="lg:col-span-8 order-1 lg:order-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">

                  {/* Datos personales */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                    <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-black flex items-center justify-center">1</span>
                      Datos personales
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Nombre" name="nombre" value={form.nombre} onChange={handleChange} placeholder="Juan" required />
                      <Field label="Apellido" name="apellido" value={form.apellido} onChange={handleChange} placeholder="Pérez" required />

                      {/* RUT con validación */}
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1.5">
                          RUT <span className="text-red-500">*</span>
                        </label>
                        <input
                          name="rut"
                          value={form.rut}
                          onChange={(e) => {
                            handleChange(e);
                            setRutError(false);
                          }}
                          onBlur={() => {
                            if (form.rut.length > 3) setRutError(!validateRut(form.rut));
                          }}
                          placeholder="12.345.678-9"
                          required
                          className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 transition-colors ${
                            rutError
                              ? "border-red-400 focus:border-red-400 focus:ring-red-200"
                              : "border-gray-200 focus:border-primary focus:ring-primary/20"
                          }`}
                        />
                        {rutError && (
                          <p className="text-red-500 text-xs mt-1">RUT inválido. Verifica el dígito verificador.</p>
                        )}
                      </div>

                      <Field label="Email" name="email" type="email" value={form.email} onChange={handleChange} placeholder="juan@concesionaria.cl" required />

                      {/* Teléfono con prefijo +56 */}
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1.5">
                          Número de teléfono <span className="text-red-500">*</span>
                        </label>
                        <div className="flex">
                          <span className="inline-flex items-center px-3 py-3 bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl text-sm text-gray-600 font-medium select-none">
                            +56
                          </span>
                          <input
                            name="telefono"
                            type="tel"
                            value={form.telefono}
                            onChange={handleChange}
                            placeholder="9 1234 5678"
                            required
                            maxLength={9}
                            inputMode="numeric"
                            className="flex-1 bg-gray-50 border border-gray-200 rounded-r-xl px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
                          />
                        </div>
                        {form.telefono.length > 0 && form.telefono.length !== 9 && (
                          <p className="text-orange-500 text-xs mt-1">Deben ser exactamente 9 dígitos.</p>
                        )}
                        {form.telefono.length === 9 && (
                          <p className="text-green-600 text-xs mt-1">{handlePhoneDisplay(form.telefono)}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Concesionario */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                    <h2 className="font-bold text-gray-900 mb-5 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-black flex items-center justify-center">2</span>
                      Tu concesionario
                    </h2>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <Field label="Nombre del concesionario" name="concesionario" value={form.concesionario} onChange={handleChange} placeholder="Nombre del concesionario donde trabajas" required />
                      </div>

                      {/* Región */}
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1.5">
                          Región <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            name="region"
                            value={form.region}
                            onChange={handleChange}
                            required
                            className={`w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors pr-10 ${!form.region ? "text-gray-400" : "text-gray-900"}`}
                          >
                            <option value="" disabled>Selecciona la región</option>
                            {REGIONES.map((r) => (
                              <option key={r.region} value={r.region} className="text-gray-900">{r.region}</option>
                            ))}
                          </select>
                          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </span>
                        </div>
                      </div>

                      {/* Comuna */}
                      <div>
                        <label className="block text-gray-700 text-sm font-medium mb-1.5">
                          Comuna <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select
                            name="comuna"
                            value={form.comuna}
                            onChange={handleChange}
                            required
                            disabled={!form.region}
                            className={`w-full appearance-none bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors pr-10 ${!form.comuna ? "text-gray-400" : "text-gray-900"} ${!form.region ? "opacity-50 cursor-not-allowed" : ""}`}
                          >
                            <option value="" disabled>
                              {form.region ? "Selecciona la comuna" : "Primero elige la región"}
                            </option>
                            {comunasDeRegion.map((c) => (
                              <option key={c} value={c} className="text-gray-900">{c}</option>
                            ))}
                          </select>
                          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Marcas */}
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 md:p-8">
                    <h2 className="font-bold text-gray-900 mb-1 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-primary/15 border border-primary/30 text-primary text-xs font-black flex items-center justify-center">3</span>
                      Marcas con las que trabajas
                      <span className="text-red-500 ml-0.5">*</span>
                    </h2>
                    <p className="text-gray-400 text-xs mb-5">Selecciona todas las que correspondan</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                      {BRANDS.map((brand) => {
                        const selected = brands.includes(brand);
                        return (
                          <button
                            key={brand}
                            type="button"
                            onClick={() => toggleBrand(brand)}
                            className={[
                              "px-3 py-2 rounded-xl border text-sm font-medium transition-all text-left",
                              selected
                                ? "bg-primary/10 border-primary/50 text-primary"
                                : "bg-gray-50 border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-100",
                            ].join(" ")}
                          >
                            <span className={`inline-block w-3.5 h-3.5 rounded-sm border mr-2 align-middle transition-colors ${selected ? "bg-primary border-primary" : "border-gray-300"}`} />
                            {brand}
                          </button>
                        );
                      })}
                    </div>
                    {brands.length === 0 && (
                      <p className="text-xs text-gray-400 mt-3">Selecciona al menos una marca para continuar</p>
                    )}
                  </div>

                  {/* Descuento */}
                  <div
                    className={[
                      "rounded-2xl border-2 p-6 md:p-8 transition-all cursor-pointer",
                      descuento
                        ? "bg-primary/5 border-primary/40 shadow-[0_0_32px_rgba(0,229,229,0.08)]"
                        : "bg-white border-gray-100 shadow-sm hover:border-gray-200",
                    ].join(" ")}
                    onClick={() => setDescuento((v) => !v)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={[
                        "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all",
                        descuento ? "border-primary bg-primary" : "border-gray-300 bg-white",
                      ].join(" ")}>
                        {descuento && (
                          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                            <path d="M2 5l2.5 2.5 3.5-4" stroke="#000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-sm mb-1">
                          ¿Quieres acceder al descuento del 50% por los primeros 3 meses?
                        </p>
                        <p className="text-gray-500 text-sm">
                          Precio referencial: <span className="line-through text-gray-400">$25.980</span>{" "}
                          · Precio con descuento:{" "}
                          <span className="text-primary font-bold">$12.990</span>
                        </p>
                      </div>
                      {!descuento && (
                        <span className="hidden sm:inline-flex items-center gap-1.5 bg-primary/10 border border-primary/30 text-primary text-xs font-semibold px-3 py-1.5 rounded-full flex-shrink-0">
                          ¡Sí! Dame el descuento
                        </span>
                      )}
                      {descuento && (
                        <span className="hidden sm:inline-flex items-center gap-1.5 bg-primary text-black text-xs font-bold px-3 py-1.5 rounded-full flex-shrink-0">
                          ✓ Descuento aplicado
                        </span>
                      )}
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-600 text-sm bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
                  )}

                  <button
                    type="submit"
                    disabled={loading || brands.length === 0 || rutError}
                    className="w-full bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed text-black font-bold py-4 rounded-xl transition-all text-base shadow-[0_4px_20px_rgba(0,229,229,0.25)] hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="40 20" />
                        </svg>
                        Procesando...
                      </>
                    ) : (
                      <>
                        Continuar al pago
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                      </>
                    )}
                  </button>

                  <p className="text-center text-gray-400 text-xs">
                    Serás redirigido a WebPay para completar el pago de forma segura. Al enviar, aceptas los términos de la red de vendedores Electrificarte.
                  </p>

                </form>
              </motion.div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

/* ── Shared input component ───────────────────────────────────────────────── */
function Field({
  label, name, value, onChange, placeholder, required = false, type = "text",
}: {
  label: string; name: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string; required?: boolean; type?: string;
}) {
  return (
    <div>
      <label className="block text-gray-700 text-sm font-medium mb-1.5">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-colors"
      />
    </div>
  );
}
