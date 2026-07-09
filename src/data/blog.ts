// ============================================================================
// BLOG — datos y taxonomía (fuente de verdad).
//
// TAXONOMÍA
//   · Departamento (1 por post)  → página indexable /blog/[departamento]/
//   · Categoría principal (1)     → página indexable /blog/categoria/[slug]/ (define breadcrumb)
//   · Categorías secundarias (N)  → páginas indexables /blog/categoria/[slug]/
//   · Etiquetas (N)               → SIN página, SIN ruta. Solo metadata (keywords) y relación.
//
// Catálogos CERRADOS (departamentos/categorias): vocabulario controlado, sin duplicar.
// El CUERPO del artículo vive en content/blog/<slug>.md (Markdown) y se lee en lib/blog.ts.
// Este archivo es PURO (sin fs) → seguro de importar también en componentes cliente.
// ============================================================================

export type Departamento = { slug: string; nombre: string };
export type Categoria = { slug: string; nombre: string };
/**
 * Autor con página propia (/blog/autor/<slug>/) → entidad Person en el schema.
 * Redacción, NO médicos: sin credenciales ni cédula. La revisión médica es aparte
 * (reviewedBy, ver ArticleJsonLd). `post.autor` referencia el `nombre` de aquí; un
 * autor fuera del catálogo (ej. "Equipo Gioventù") se muestra sin enlace.
 */
export type Autor = { slug: string; nombre: string; rol: string; bio: string };

export type BlogPost = {
  slug: string;
  titulo: string;
  /** Porción del título en Playfair itálica (subcadena de `titulo`). Opcional. */
  tituloAccent?: string;
  excerpt: string;
  /** slug de un departamento del catálogo */
  departamento: string;
  /** slug de la categoría principal (catálogo) */
  categoriaPrincipal: string;
  /** slugs de categorías secundarias (catálogo) */
  categoriasSecundarias: string[];
  /** Texto libre. NO generan ruta: solo keywords/relación. */
  etiquetas: string[];
  autor: string;
  /** ISO YYYY-MM-DD */
  fecha: string;
  /** minutos de lectura */
  tiempoLectura: number;
  /** TODO: portada real (ej. "/blog/lunares-vs-verrugas.webp"). Vacío = placeholder. */
  imagen?: string;
  /** Marca el artículo destacado del índice. */
  destacado?: boolean;
};

// Cabecera del índice / sección del Home.
export const blogMeta = {
  eyebrow: "Blog",
  titleTop: "Crónicas de tu",
  titleAccent: "piel",
  body: "Lo que pocos te dicen sobre tu piel: tratamientos que sí funcionan, señales que no debes ignorar y todo lo que necesitas saber para cuidarla.",
  cta: "Ver blog",
};

export const departamentos: Departamento[] = [
  { slug: "dermatologia", nombre: "Dermatología" },
  { slug: "medicina-estetica", nombre: "Medicina Estética" },
  { slug: "wellness", nombre: "Wellness" },
];

export const autores: Autor[] = [
  {
    slug: "andrea-rios",
    nombre: "Andrea Ríos",
    rol: "Redactora de salud y bienestar",
    bio: "Redactora especializada en dermatología y medicina estética. Investiga y traduce el conocimiento del equipo médico de Gioventù a guías claras y accesibles. No sustituye el criterio clínico: los contenidos de salud son revisados por un dermatólogo de la clínica.",
  },
];

export const categorias: Categoria[] = [
  { slug: "lunares", nombre: "Lunares" },
  { slug: "verrugas", nombre: "Verrugas" },
  { slug: "manchas", nombre: "Manchas y melasma" },
  { slug: "rosacea", nombre: "Rosácea" },
  { slug: "acne", nombre: "Acné" },
  { slug: "rejuvenecimiento", nombre: "Rejuvenecimiento" },
  { slug: "depilacion", nombre: "Depilación" },
  { slug: "flacidez", nombre: "Flacidez" },
  { slug: "celulitis", nombre: "Celulitis" },
];

export const posts: BlogPost[] = [
  {
    slug: "lunares-vs-verrugas",
    titulo: "Lunares vs verrugas: cómo identificarlos y cuándo preocuparse",
    tituloAccent: "cómo identificarlos",
    excerpt:
      "Un lunar cambia de color, crece o sangra. Una verruga aparece en grupo y puede contagiarse. Aprender a diferenciarlos no es solo estética, es prevención.",
    departamento: "dermatologia",
    categoriaPrincipal: "lunares",
    categoriasSecundarias: ["verrugas"],
    etiquetas: ["diferencia lunar verruga", "regla ABCDE", "nevos", "cáncer de piel", "VPH"],
    autor: "Andrea Ríos",
    fecha: "2026-05-13",
    tiempoLectura: 5,
    imagen: "/derma-services/lunares.webp",
    destacado: true,
  },
  {
    slug: "rejuvenecimiento-facial",
    titulo: "Rejuvenecimiento facial: los tratamientos más efectivos",
    excerpt: "Todo lo que puedes hacer para recuperar una piel firme y luminosa.",
    departamento: "medicina-estetica",
    categoriaPrincipal: "rejuvenecimiento",
    categoriasSecundarias: [],
    etiquetas: ["colágeno", "ácido hialurónico", "antiedad"],
    autor: "Equipo Gioventù",
    fecha: "2026-05-10",
    tiempoLectura: 6,
    imagen: undefined,
  },
  {
    slug: "causas-flacidez",
    titulo: "Causas de la flacidez y cómo eliminarla",
    excerpt: "Guía de tratamientos efectivos para reafirmar la piel.",
    departamento: "medicina-estetica",
    categoriaPrincipal: "flacidez",
    categoriasSecundarias: ["rejuvenecimiento"],
    etiquetas: ["radiofrecuencia", "colágeno", "reafirmación"],
    autor: "Equipo Gioventù",
    fecha: "2026-05-03",
    tiempoLectura: 5,
    imagen: undefined,
  },
  {
    slug: "rosacea-sintomas-causas",
    titulo: "Rosácea: síntomas y causas para el cuidado de tu piel",
    excerpt: "Cómo reconocer la rosácea y qué hacer para controlarla.",
    departamento: "dermatologia",
    categoriaPrincipal: "rosacea",
    categoriasSecundarias: [],
    etiquetas: ["enrojecimiento facial", "piel sensible", "brotes"],
    autor: "Andrea Ríos",
    fecha: "2026-04-28",
    tiempoLectura: 4,
    imagen: undefined,
  },
  {
    slug: "depilacion-laser-guia",
    titulo: "Depilación láser: guía completa para una piel sana",
    excerpt: "Qué esperar, cómo prepararte y cuántas sesiones necesitas.",
    departamento: "wellness",
    categoriaPrincipal: "depilacion",
    categoriasSecundarias: [],
    etiquetas: ["láser diodo", "vello", "sesiones"],
    autor: "Equipo Gioventù",
    fecha: "2026-04-20",
    tiempoLectura: 7,
    imagen: undefined,
  },
  {
    slug: "manchas-melasma",
    titulo: "Manchas y melasma: por qué aparecen y cómo tratarlas",
    excerpt: "Causas del melasma y los tratamientos que sí funcionan.",
    departamento: "dermatologia",
    categoriaPrincipal: "manchas",
    categoriasSecundarias: [],
    etiquetas: ["hiperpigmentación", "protección solar", "láser"],
    autor: "Andrea Ríos",
    fecha: "2026-04-14",
    tiempoLectura: 6,
    imagen: undefined,
  },
  {
    slug: "que-es-celulitis",
    titulo: "¿Qué es la celulitis y por qué sale? Guía completa",
    excerpt: "Tipos, causas y tratamientos para mejorar su apariencia.",
    departamento: "wellness",
    categoriaPrincipal: "celulitis",
    categoriasSecundarias: [],
    etiquetas: ["piel de naranja", "circulación", "tratamiento corporal"],
    autor: "Equipo Gioventù",
    fecha: "2026-04-06",
    tiempoLectura: 5,
    imagen: undefined,
  },
];

// ── Selectores PUROS (sin fs) ───────────────────────────────────────────────

const MESES = [
  "enero", "febrero", "marzo", "abril", "mayo", "junio",
  "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
];

/** "2026-05-13" → "13 mayo, 2026" (sin usar Date). */
export function formatFecha(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  return `${d} ${MESES[m - 1]}, ${y}`;
}

/** Todos los posts, más recientes primero (ISO se ordena lexicográficamente). */
export function getAllPostsSorted(): BlogPost[] {
  return [...posts].sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
}

export function getPost(slug: string): BlogPost | null {
  return posts.find((p) => p.slug === slug) ?? null;
}

export function getDepartamento(slug: string): Departamento | null {
  return departamentos.find((d) => d.slug === slug) ?? null;
}

export function getCategoria(slug: string): Categoria | null {
  return categorias.find((c) => c.slug === slug) ?? null;
}

export function departamentoNombre(slug: string): string {
  return getDepartamento(slug)?.nombre ?? slug;
}

export function categoriaNombre(slug: string): string {
  return getCategoria(slug)?.nombre ?? slug;
}

export function getAutor(slug: string): Autor | null {
  return autores.find((a) => a.slug === slug) ?? null;
}

/** Resuelve el autor por su nombre (como aparece en `post.autor`). */
export function getAutorPorNombre(nombre: string): Autor | null {
  return autores.find((a) => a.nombre === nombre) ?? null;
}

export function postsByAutor(slug: string): BlogPost[] {
  const autor = getAutor(slug);
  if (!autor) return [];
  return getAllPostsSorted().filter((p) => p.autor === autor.nombre);
}

export function postsByDepartamento(slug: string): BlogPost[] {
  return getAllPostsSorted().filter((p) => p.departamento === slug);
}

/** Una categoría agrupa por principal O secundaria. */
export function postsByCategoria(slug: string): BlogPost[] {
  return getAllPostsSorted().filter(
    (p) => p.categoriaPrincipal === slug || p.categoriasSecundarias.includes(slug)
  );
}

export function featuredPost(): BlogPost {
  const all = getAllPostsSorted();
  return all.find((p) => p.destacado) ?? all[0];
}

/** Relacionados por afinidad de categoría/departamento/etiqueta (excluye el propio). */
export function relatedPosts(post: BlogPost, limit = 4): BlogPost[] {
  const cats = new Set([post.categoriaPrincipal, ...post.categoriasSecundarias]);
  const tags = new Set(post.etiquetas);
  const score = (p: BlogPost) => {
    let s = 0;
    if (cats.has(p.categoriaPrincipal)) s += 3;
    p.categoriasSecundarias.forEach((c) => cats.has(c) && (s += 1));
    if (p.departamento === post.departamento) s += 2;
    p.etiquetas.forEach((t) => tags.has(t) && (s += 1));
    return s;
  };
  return getAllPostsSorted()
    .filter((p) => p.slug !== post.slug)
    .map((p) => ({ p, s: score(p) }))
    .sort((a, b) => b.s - a.s)
    .slice(0, limit)
    .map((x) => x.p);
}
