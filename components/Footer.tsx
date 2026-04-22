import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="flex flex-row items-start justify-between gap-6 md:items-center">
          {/* Logo */}
          <div>
            <img
              src="/logo-electrificarte.png"
              alt="Electrificarte"
              className="h-7 w-auto object-contain brightness-0 invert mb-2"
            />
            <p className="text-white/40 text-xs">
              Parte de Electrificarte S.P.A. · Santiago, Chile
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm text-white/50">
            <Link href="https://electrificarte.com" target="_blank" className="hover:text-white transition-colors">
              electrificarte.com
            </Link>
            <Link href="/unirse" className="hover:text-white transition-colors">
              Registro
            </Link>
            <a href="mailto:contacto@electrificarte.com" className="hover:text-white transition-colors">
              Contacto
            </a>
          </div>
        </div>

        <p className="text-center text-[10px] text-white/20 uppercase tracking-widest mt-8">
          Electrificarte S.P.A. &copy; {new Date().getFullYear()} · Todos los derechos reservados
        </p>
      </div>
    </footer>
  );
}
