import Link from "next/link";
import { Icon } from "@/components/Icon";

interface PageHeadProps {
  crumb: string;
  title: string;
  lead?: React.ReactNode;
  actions?: React.ReactNode;
  side?: React.ReactNode;
  compact?: boolean;
}

/** Encabezado de página interior: migas, título (sin eyebrow), bajada y columna lateral opcional. */
export function PageHead({ crumb, title, lead, actions, side, compact }: PageHeadProps) {
  return (
    <header className={`page-head${compact ? " page-head--compact" : ""}`}>
      <div className="wrap">
        <nav className="crumbs" aria-label="Migas de pan">
          <Link href="/">Inicio</Link>
          <Icon name="chevron_right" />
          <span aria-current="page">{crumb}</span>
        </nav>
        <div className="page-head__grid">
          <div>
            <h1 className="t-h1">{title}</h1>
            {lead && <p className="t-lead">{lead}</p>}
            {actions && <div className="page-head__actions">{actions}</div>}
          </div>
          {side && <div>{side}</div>}
        </div>
      </div>
    </header>
  );
}
