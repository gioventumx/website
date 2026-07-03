// Sección "Blog" del Home — 3 artículos destacados.
// Título, extracto e imagen son PLACEHOLDERS: reemplazar por los artículos reales.
// Cada tarjeta enlaza a /blog/[slug]/ (las páginas de artículo aún no existen).

export type BlogPost = {
  slug: string;
  /** TODO: categoría/etiqueta real. */
  category: string;
  /** TODO: título real del artículo. */
  title: string;
  /** TODO: extracto corto (1–2 líneas). */
  excerpt: string;
  /** TODO: ruta de imagen de portada, ej. "/blog/mi-articulo.png". Vacío = placeholder. */
  image?: string;
};

export const blog = {
  eyebrow: "Nuestro Blog",
  titleTop: "Crónicas de tu",
  titleAccent: "piel",
  body: "Lo que pocos te dicen sobre tu piel: tratamientos que sí funcionan, señales que no debes ignorar y todo lo que necesitas saber para cuidarla.",
  cta: "Ver blog",
  posts: [
    {
      slug: "articulo-1",
      category: "Dermatología",
      title: "Título del artículo 1",
      excerpt: "Extracto breve del artículo que resume de qué trata en una o dos líneas.",
      image: undefined,
    },
    {
      slug: "articulo-2",
      category: "Medicina Estética",
      title: "Título del artículo 2",
      excerpt: "Extracto breve del artículo que resume de qué trata en una o dos líneas.",
      image: undefined,
    },
    {
      slug: "articulo-3",
      category: "Wellness",
      title: "Título del artículo 3",
      excerpt: "Extracto breve del artículo que resume de qué trata en una o dos líneas.",
      image: undefined,
    },
  ] satisfies BlogPost[],
};
