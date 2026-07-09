import type { MetadataRoute } from "next";
import { posts, departamentos, categorias } from "@/data/blog";

// Dominio de producción (igual que metadataBase del layout). Trailing slash
// consistente con next.config (trailingSlash: true).
const SITE = "https://gioventu.com.mx";

export default function sitemap(): MetadataRoute.Sitemap {
  // Rutas estáticas que YA existen. Las páginas de servicio pendientes se dejan
  // comentadas: activar cada una cuando su page.tsx exista (para no listar 404).
  const staticEntries: MetadataRoute.Sitemap = [
    { url: `${SITE}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE}/dermatologia/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/depilacion-laser/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/wellness/`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE}/wellness/faciales/`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE}/blog/`, changeFrequency: "weekly", priority: 0.8 },
    // { url: `${SITE}/estetica/`,   changeFrequency: "monthly", priority: 0.9 },
    // { url: `${SITE}/conocenos/`,  changeFrequency: "monthly", priority: 0.7 },
  ];

  // Blog generado dinámicamente desde el catálogo: al agregar un post/categoría/
  // departamento en data/blog.ts, aparece solo aquí.
  const departamentoEntries: MetadataRoute.Sitemap = departamentos.map((d) => ({
    url: `${SITE}/blog/${d.slug}/`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  const categoriaEntries: MetadataRoute.Sitemap = categorias.map((c) => ({
    url: `${SITE}/blog/categoria/${c.slug}/`,
    changeFrequency: "weekly",
    priority: 0.5,
  }));

  const postEntries: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE}/blog/${p.slug}/`,
    lastModified: p.fecha,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // Nota: las ETIQUETAS no se incluyen — no tienen ruta indexable (a propósito).
  return [...staticEntries, ...departamentoEntries, ...categoriaEntries, ...postEntries];
}
