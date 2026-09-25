"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/Icon";
import { REGIONES } from "@/lib/regiones-chile";
import { PRICE } from "@/lib/site";

// Los valores viajan tal cual a n8n (campo `marcas`): no renombrar sin avisar a quien lee la tabla.
const BRANDS = [
  "Tesla", "BYD", "Volvo", "MG", "Dongfeng", "Haval", "JAC", "Toyota", "Hyundai",
  "Mazda", "Suzuki", "Link&CO", "Smart", "Nammi", "Ford", "Geely", "Riddara",
  "Peugeot", "Renault", "Citroen", "Jeep", "RAM", "Chevrolet", "Neta", "Deepal",
  "Avatr", "GWM",
].sort((a, b) => a.localeCompare(b, "es"));

// ── RUT ──────────────────────────────────────────────────────────────────────
function formatRut(value: string) {
  const clean = value.replace(/[^0-9kK]/g, "").toUpperCase();
  if (clean.length <= 1) return clean;
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);
  return `${body.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}-${dv}`;
}

/** Validación real de RUT chileno (módulo 11). */
function validateRut(rut: string): boolean {
  const clean = rut.replace(/[^0-9kK]/g, "").toUpperCase();
  if (clean.length < 2) return false;
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);
  if (!/^\d+$/.test(body)) return false;
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

// ── Teléfono: 9 dígitos después del +56 ──────────────────────────────────────
function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  const stripped = digits.startsWith("56") && digits.length > 9 ? digits.slice(2) : digits;
  return stripped.slice(0, 9);
}

type FormState = {
  nombre: string;
  apellido: string;
  rut: string;
  email: string;
  telefono: string;
  /** Rotulado "Punto de venta" en pantalla. La clave se llama así porque n8n la lee: no cambiar. */
  concesionario: string;
  region: string;
  comuna: string;
};
type FieldName = keyof FormState | "marcas";
type Errors = Partial<Record<FieldName, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FIELD_ORDER: FieldName[] = ["nombre", "apellido", "rut", "email", "telefono", "concesionario", "region", "comuna", "marcas"];

function validate(form: FormState, brands: string[]): Errors {
  const e: Errors = {};
  if (!form.nombre.trim()) e.nombre = "Escribe tu nombre.";
  if (!form.apellido.trim()) e.apellido = "Escribe tu apellido.";
  if (!form.rut) e.rut = "Escribe tu RUT.";
  else if (!validateRut(form.rut)) e.rut = "RUT inválido. Revisa el dígito verificador.";
  if (!form.email.trim()) e.email = "Escribe tu email.";
  else if (!EMAIL_RE.test(form.email.trim())) e.email = "Revisa el formato del email.";
  if (!form.telefono) e.telefono = "Escribe tu teléfono.";
  else if (form.telefono.length !== 9) e.telefono = "Deben ser 9 dígitos después del +56.";
  if (form.concesionario.trim().length < 2) e.concesionario = "Escribe el nombre de tu punto de venta.";
  if (!form.region) e.region = "Elige tu región.";
  if (!form.comuna) e.comuna = "Elige tu comuna.";
  if (brands.length === 0) e.marcas = "Elige al menos una marca.";
  return e;
}

const EMPTY: FormState = {
  nombre: "", apellido: "", rut: "", email: "",
  telefono: "", concesionario: "", region: "", comuna: "",
};

export function JoinForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [brands, setBrands] = useState<string[]>([]);
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const errors = validate(form, brands);
  const show = (name: FieldName) => (submitted || touched[name] ? errors[name] : undefined);
  const comunas = REGIONES.find((r) => r.region === form.region)?.comunas ?? [];

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setForm((f) => {
      if (name === "rut") return { ...f, rut: formatRut(value) };
      if (name === "telefono") return { ...f, telefono: normalizePhone(value) };
      if (name === "region") return { ...f, region: value, comuna: "" };
      return { ...f, [name]: value };
    });
  }

  function blur(name: FieldName) {
    setTouched((t) => ({ ...t, [name]: true }));
  }

  function toggleBrand(brand: string) {
    setBrands((prev) => (prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]));
    setTouched((t) => ({ ...t, marcas: true }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitted(true);

    const first = FIELD_ORDER.find((f) => errors[f]);
    if (first) {
      const el = formRef.current?.querySelector<HTMLElement>(first === "marcas" ? "[name='marcas']" : `[name='${first}']`);
      el?.focus();
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
          // El descuento de lanzamiento se aplica siempre. El monto cobrado lo define el plan
          // de Reveniu (REVENIU_VENDOR_PLAN_ID), no este flag: queda como registro para n8n.
          descuento: true,
        }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error ?? "No pudimos procesar tu registro.");

      // POST directo a Webpay con el token de Reveniu (sin pasar por una página de Reveniu).
      const { completionUrl, securityToken } = json;
      const wpForm = document.createElement("form");
      wpForm.method = "POST";
      wpForm.action = completionUrl;
      const tkInput = document.createElement("input");
      tkInput.type = "hidden";
      tkInput.name = "TBK_TOKEN";
      tkInput.value = securityToken;
      wpForm.appendChild(tkInput);
      document.body.appendChild(wpForm);
      wpForm.submit();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Ocurrió un error. Intenta nuevamente.");
      setLoading(false);
    }
  }

  const inputProps = (name: keyof FormState) => ({
    id: name,
    name,
    value: form[name],
    onChange: handleChange,
    onBlur: () => blur(name),
    "aria-invalid": show(name) ? true : undefined,
    "aria-describedby": show(name) ? `${name}-error` : undefined,
    className: "input",
  });

  const fieldError = (name: FieldName) =>
    show(name) ? (
      <p id={`${name}-error`} className="field__error">
        {show(name)}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="form" aria-label="Registro de vendedor">
      {/* 1. Datos personales */}
      <fieldset className="card fieldset">
        <legend className="sr-only">Tus datos</legend>
        <div className="fieldset__head">
          <span className="step__n">01</span>
          <div>
            <h2 className="t-h3">Tus datos</h2>
            <p>Los usamos para activar tu cuenta y escribirte.</p>
          </div>
        </div>
        <div className="form-grid">
          <label className="field" htmlFor="nombre">
            <span className="field__label">Nombre</span>
            <input {...inputProps("nombre")} autoComplete="given-name" placeholder="Juan" maxLength={80} />
            {fieldError("nombre")}
          </label>
          <label className="field" htmlFor="apellido">
            <span className="field__label">Apellido</span>
            <input {...inputProps("apellido")} autoComplete="family-name" placeholder="Pérez" maxLength={80} />
            {fieldError("apellido")}
          </label>
          <label className="field" htmlFor="rut">
            <span className="field__label">RUT</span>
            <input {...inputProps("rut")} placeholder="12.345.678-9" maxLength={12} autoComplete="off" />
            {fieldError("rut")}
          </label>
          <label className="field" htmlFor="email">
            <span className="field__label">Email</span>
            <input {...inputProps("email")} type="email" autoComplete="email" placeholder="nombre@correo.cl" />
            {fieldError("email")}
          </label>
          <div className="field">
            <label className="field__label" htmlFor="telefono">Teléfono móvil</label>
            <div className="input-group">
              <span className="input-group__prefix">+56</span>
              <input
                {...inputProps("telefono")}
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                placeholder="9 1234 5678"
              />
            </div>
            {show("telefono") ? (
              fieldError("telefono")
            ) : (
              <p className="field__hint">Te avisamos por WhatsApp a este número.</p>
            )}
          </div>
        </div>
      </fieldset>

      {/* 2. Punto de venta */}
      <fieldset className="card fieldset">
        <legend className="sr-only">Tu punto de venta</legend>
        <div className="fieldset__head">
          <span className="step__n">02</span>
          <div>
            <h2 className="t-h3">Tu punto de venta</h2>
            <p>Dónde vendes, para ubicarte en la red.</p>
          </div>
        </div>
        <div className="form-grid">
          <label className="field span-2" htmlFor="concesionario">
            <span className="field__label">Punto de venta</span>
            <input {...inputProps("concesionario")} placeholder="Nombre del punto de venta donde trabajas" maxLength={120} />
            {fieldError("concesionario")}
          </label>
          <label className="field" htmlFor="region">
            <span className="field__label">Región</span>
            <span className="select-wrap">
              <select {...inputProps("region")}>
                <option value="" disabled>
                  Elige la región
                </option>
                {REGIONES.map((r) => (
                  <option key={r.region} value={r.region}>
                    {r.region}
                  </option>
                ))}
              </select>
              <Icon name="expand_more" />
            </span>
            {fieldError("region")}
          </label>
          <label className="field" htmlFor="comuna">
            <span className="field__label">Comuna</span>
            <span className="select-wrap">
              <select {...inputProps("comuna")} disabled={!form.region}>
                <option value="" disabled>
                  {form.region ? "Elige la comuna" : "Primero elige la región"}
                </option>
                {comunas.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
              <Icon name="expand_more" />
            </span>
            {fieldError("comuna")}
          </label>
        </div>
      </fieldset>

      {/* 3. Marcas */}
      <fieldset
        className="card fieldset"
        aria-invalid={show("marcas") ? true : undefined}
        aria-describedby={show("marcas") ? "marcas-error" : undefined}
      >
        <legend className="sr-only">Marcas que vendes</legend>
        <div className="fieldset__head">
          <span className="step__n">03</span>
          <div>
            <h2 className="t-h3">Marcas que vendes</h2>
            <p>Elige todas las que correspondan. Te llegan contactos interesados en modelos de estas marcas.</p>
          </div>
        </div>
        <div className="opts">
          {BRANDS.map((brand) => (
            <label key={brand} className="opt">
              <input
                type="checkbox"
                name="marcas"
                value={brand}
                checked={brands.includes(brand)}
                onChange={() => toggleBrand(brand)}
              />
              <span className="box">
                <Icon name="check" />
              </span>
              {brand}
            </label>
          ))}
        </div>
        <div className="opts-foot">
          {show("marcas") ? (
            <p id="marcas-error" className="field__error">{show("marcas")}</p>
          ) : (
            <p className="field__hint">
              {brands.length === 0
                ? "Elige al menos una marca."
                : `${brands.length} ${brands.length === 1 ? "marca elegida" : "marcas elegidas"}.`}
            </p>
          )}
          <p className="field__hint">
            ¿No está tu marca? <Link href="/contacto" className="link">Escríbenos</Link>
          </p>
        </div>
      </fieldset>

      {error && (
        <div className="alert" role="alert">
          <Icon name="error" />
          <div>
            <p>{error}</p>
            <p>Si el problema sigue, escríbenos a vendedores@electrificarte.com.</p>
          </div>
        </div>
      )}

      <div className="card total-line" aria-label="Total de la suscripción">
        <div>
          <p className="total-line__title">Suscripción mensual</p>
          <p className="t-small">
            {PRICE.discount} de descuento de lanzamiento aplicado los primeros {PRICE.launchMonths} meses
          </p>
        </div>
        <div className="total-line__price">
          <span className="price-was">{PRICE.list}</span>
          <span className="price">{PRICE.launch}</span>
          <span className="t-label">al mes</span>
        </div>
      </div>

      <div className="form__submit">
        <button type="submit" className="btn btn--primary btn--lg btn--block" disabled={loading}>
          {loading ? (
            <>
              <Icon name="progress_activity" className="animate-spin" />
              Procesando…
            </>
          ) : (
            <>
              Continuar al pago
              <Icon name="arrow_forward" className="arrow" />
            </>
          )}
        </button>
        <p className="form__legal">
          Pasarás a Webpay (Transbank) para pagar de forma segura. Al continuar aceptas los{" "}
          <Link href="/terminos">términos</Link> y la <Link href="/privacidad">política de privacidad</Link>.
        </p>
      </div>
    </form>
  );
}
