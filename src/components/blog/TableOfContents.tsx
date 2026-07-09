import type { Heading } from "@/lib/blog";

// Tabla de contenidos del artículo. Enlaces a los ids que rehype-slug pone en los
// H2/H3 del cuerpo; el clic lo suaviza SmoothScroll (a[href^="#"]) con offset de
// header. Se oculta si hay menos de 2 encabezados (no aporta en notas cortas).
// El posicionamiento/margen lo controla quien lo usa vía `className` (va arriba del
// cuerpo del artículo, en todos los tamaños).
export function TableOfContents({
  headings,
  className = "",
}: {
  headings: Heading[];
  className?: string;
}) {
  if (headings.length < 2) return null;
  return (
    <nav
      aria-label="Contenido del artículo"
      className={`rounded-block border border-line bg-brand-tint/40 p-5 ${className}`}
    >
      <p className="mb-3 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-brand">
        En este artículo
      </p>
      <ol className="space-y-1.5 text-[0.9rem]">
        {headings.map((h) => (
          <li key={h.id} className={h.level === 3 ? "ml-4" : ""}>
            <a
              href={`#${h.id}`}
              className="text-ink-soft underline-offset-2 transition-colors hover:text-brand hover:underline"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
