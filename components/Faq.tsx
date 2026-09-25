import { Icon } from "@/components/Icon";
import type { Faq } from "@/lib/site";

/** Acordeón de preguntas con <details> nativo: funciona sin JavaScript y con teclado. */
export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div>
      {items.map((f) => (
        <details key={f.q} className="qa">
          <summary>
            {f.q}
            <Icon name="add" />
          </summary>
          <p className="qa__a">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
