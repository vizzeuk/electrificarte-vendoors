import { ICON_CODEPOINTS } from "@/lib/icon-codepoints";

interface IconProps {
  name: string;
  className?: string;
}

/**
 * Ícono Material Symbols (peso 300), copiado de electrificarteweb. Renderiza el CODEPOINT y
 * no el nombre: mientras la fuente carga el DOM no contiene la palabra ("menu", "mail"…),
 * así que no hay texto feo que mostrar. La fuente es un subset (app/fonts/): un ícono que no
 * está en lib/icon-codepoints.ts no se dibuja. Se usa suelto, del color del texto; el tamaño
 * lo pone el CSS del componente que lo contiene.
 */
export function Icon({ name, className }: IconProps) {
  const codepoint = ICON_CODEPOINTS[name];
  if (!codepoint) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[Icon] "${name}" no está en la fuente subseteada (lib/icon-codepoints.ts).`);
    }
    return <span aria-hidden className={className} />;
  }
  return (
    <span aria-hidden translate="no" className={`material-symbols-outlined${className ? ` ${className}` : ""}`}>
      {codepoint}
    </span>
  );
}
