import { PostCard } from "@/components/blog/PostCard";
import { Button } from "@/components/ui/Button";
import {
  blogMeta,
  getAllPostsSorted,
  getPost,
  postsByCategoria,
  postsByDepartamento,
  type BlogPost,
} from "@/data/blog";

// Sección "Blog relacionado" reutilizable — pensada para las páginas de tratamiento
// (depilación + las 14 de dermatología). Server component: sin estado ni efectos, se
// renderiza en el servidor (bueno para SEO/enlazado interno).
//
// El ENCABEZADO (eyebrow + título + apoyo + CTA) es SIEMPRE el mismo de la sección de
// blog del resto del sitio (blogMeta, igual que `home/Blog`): copy fijo, no custom por
// página. Lo ÚNICO configurable son los posts que muestra.
//
// Selección de posts (selectores PUROS de data/blog, sin fs → seguros en server):
//   1) `slugs` explícitos (máxima prioridad; permite curar la selección por página)
//   2) `categoria` (principal o secundaria)
//   3) `departamento`
//   4) relleno con los más recientes
// Siempre deduplica, excluye borradores y rellena hasta `limit`. Así una página sin
// posts propios (ej. depilación hoy) igual muestra 3 tarjetas con lo más relevante.
type Props = {
  /** Slugs concretos a destacar primero (curaduría por página). */
  slugs?: string[];
  /** Slug de categoría (ej. "depilacion"). */
  categoria?: string;
  /** Slug de departamento (ej. "dermatologia"). */
  departamento?: string;
  limit?: number;
  /** Destino del botón. Por defecto el índice del blog. */
  ctaHref?: string;
};

export function RelatedBlog({
  slugs,
  categoria,
  departamento,
  limit = 3,
  ctaHref = "/blog/",
}: Props = {}) {
  const b = blogMeta;

  const seen = new Set<string>();
  const chosen: BlogPost[] = [];
  const add = (p?: BlogPost | null) => {
    if (p && !p.draft && !seen.has(p.slug) && chosen.length < limit) {
      seen.add(p.slug);
      chosen.push(p);
    }
  };

  (slugs ?? []).forEach((s) => add(getPost(s)));
  if (categoria) postsByCategoria(categoria).forEach(add);
  if (departamento) postsByDepartamento(departamento).forEach(add);
  getAllPostsSorted().forEach(add);

  // Sin posts publicados → no renderiza nada (evita una sección vacía).
  if (chosen.length === 0) return null;

  return (
    <section className="bg-bg px-6 pb-[clamp(64px,9vw,110px)] pt-[clamp(32px,4.5vw,55px)] md:px-10">
      <div className="container-x">
        {/* Encabezado IDÉNTICO al de la sección de blog del resto del sitio (home/Blog). */}
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="max-w-[560px]">
            <span className="eyebrow">{b.eyebrow}</span>
            <h2 className="mt-3 font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.12] tracking-[-0.01em] text-ink">
              {b.titleTop} <span className="font-accent text-brand">{b.titleAccent}</span>
            </h2>
            <p className="mt-4 max-w-[480px] text-[0.95rem] leading-relaxed text-muted">
              {b.body}
            </p>
          </div>
          <Button variant="outline" href={ctaHref} className="shrink-0">
            {b.cta}
          </Button>
        </div>

        {/* Mismo grid y misma tarjeta (PostCard) que el índice /blog/. */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {chosen.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}
