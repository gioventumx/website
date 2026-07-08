import Link from "next/link";
import { departamentos, categorias } from "@/data/blog";

// Filtros en 2 niveles. Nivel 1 = departamentos, nivel 2 = categorías. TODOS son
// ENLACES a páginas indexables (no hay filtro de etiquetas: las etiquetas no tienen
// página). `activeDept` / `activeCat` resaltan el chip de la página actual.
type Props = { activeDept?: string; activeCat?: string };

const chipBase =
  "rounded-full border px-4 py-2 text-[0.85rem] font-medium transition-colors";
const chipOn = "border-brand bg-brand text-white";
const chipOff = "border-line bg-white text-ink hover:border-brand hover:text-brand";

export function BlogFilters({ activeDept, activeCat }: Props) {
  const todos = !activeDept && !activeCat;

  return (
    <div className="my-8 border-y border-line py-5">
      {/* Nivel 1 — Departamentos (con página indexable) */}
      <div className="mb-3 flex flex-wrap items-center justify-center gap-2.5">
        <span className="mr-1 self-center text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">
          Área
        </span>
        <Link href="/blog/" className={`${chipBase} ${todos ? chipOn : chipOff}`}>
          Todos
        </Link>
        {departamentos.map((d) => (
          <Link
            key={d.slug}
            href={`/blog/${d.slug}/`}
            className={`${chipBase} ${activeDept === d.slug ? chipOn : chipOff}`}
          >
            {d.nombre}
          </Link>
        ))}
      </div>

      {/* Nivel 2 — Categorías (con página indexable) */}
      <div className="flex flex-wrap items-center justify-center gap-2.5">
        <span className="mr-1 self-center text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-muted">
          Tema
        </span>
        {categorias.map((c) => (
          <Link
            key={c.slug}
            href={`/blog/categoria/${c.slug}/`}
            className={`${chipBase} text-[0.8rem] ${activeCat === c.slug ? chipOn : chipOff}`}
          >
            {c.nombre}
          </Link>
        ))}
      </div>
    </div>
  );
}
