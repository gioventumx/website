import Link from "next/link";

export type Crumb = { label: string; href?: string };

// Breadcrumb semántico (nav > ol). El último elemento es la página actual.
export function Breadcrumb({ items, className = "" }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="Ruta de navegación" className={className}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.8rem] text-muted">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${c.label}-${i}`} className="flex items-center gap-x-2">
              {c.href && !last ? (
                <Link href={c.href} className="transition-colors hover:text-brand">
                  {c.label}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? "text-ink" : ""}>
                  {c.label}
                </span>
              )}
              {!last && (
                <span aria-hidden className="text-muted/50">
                  ›
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
