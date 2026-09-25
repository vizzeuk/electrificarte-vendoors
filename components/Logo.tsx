interface LogoProps {
  /** "wordmark" = solo la palabra (navegación). "lockup" = con tagline (footer). */
  variant?: "wordmark" | "lockup";
  className?: string;
}

/**
 * Logo monocromo del sistema de diseño v1. Se dibuja como máscara CSS (.logo en brand.css),
 * así que toma el color del texto: Tinta sobre claro, Niebla sobre oscuro. Nunca en color.
 * El alto (o el ancho) lo define quien lo usa.
 */
export function Logo({ variant = "wordmark", className }: LogoProps) {
  return (
    <span
      role="img"
      aria-label="Electrificarte"
      className={`logo${variant === "lockup" ? " logo--lockup" : ""}${className ? ` ${className}` : ""}`}
    />
  );
}
