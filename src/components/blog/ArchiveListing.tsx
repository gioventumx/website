import { Breadcrumb, type Crumb } from "./Breadcrumb";
import { BlogFilters } from "./BlogFilters";
import { PostCard } from "./PostCard";
import { blogMeta, type BlogPost } from "@/data/blog";

// Listado de archivo reutilizado por /blog/[departamento]/ y /blog/categoria/[slug]/.
// Mantiene la IDENTIDAD del blog ("Crónicas de tu piel", igual que el índice) y añade
// un indicador de la sección actual (Departamento/Tema + nombre). Breadcrumb arriba,
// filtros con el chip activo y grid de artículos.
type Props = {
  crumbs: Crumb[];
  /** Etiqueta de la sección actual: "Departamento" | "Tema". */
  seccionLabel: string;
  /** Nombre de la sección actual: "Dermatología" | "Rosácea". */
  seccionNombre: string;
  posts: BlogPost[];
  activeDept?: string;
  activeCat?: string;
};

export function ArchiveListing({
  crumbs,
  seccionLabel,
  seccionNombre,
  posts,
  activeDept,
  activeCat,
}: Props) {
  return (
    <div className="container-x pb-20">
      <Breadcrumb items={crumbs} className="pt-6" />

      {/* Identidad del blog + indicador de sección (mismo título que el índice) */}
      <header className="mt-6 text-center">
        <span className="eyebrow">{blogMeta.eyebrow}</span>
        <h1 className="mt-3 font-sans text-[clamp(2.2rem,4.5vw,3.2rem)] font-light leading-[1.1] tracking-[-0.01em] text-ink">
          {blogMeta.titleTop} <span className="font-accent text-brand">{blogMeta.titleAccent}</span>
        </h1>
        <div className="mt-4 flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-[0.85rem]">
            <span className="text-[0.66rem] font-semibold uppercase tracking-[0.14em] text-brand">
              {seccionLabel}
            </span>
            <span className="font-medium text-ink">{seccionNombre}</span>
          </span>
        </div>
      </header>

      <BlogFilters activeDept={activeDept} activeCat={activeCat} />

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      ) : (
        <p className="py-16 text-center text-muted">
          Aún no hay artículos en esta sección. Vuelve pronto.
        </p>
      )}
    </div>
  );
}
