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
    imagen: "/blog-thumbs/lunares-vs-verrugas.webp",
    destacado: true,
  },
  {
    slug: "rejuvenecimiento-facial",
    titulo: "Rejuvenecimiento facial: los tratamientos más efectivos",
    tituloAccent: "los tratamientos más efectivos",
    excerpt:
      "HIFU, toxina botulínica, bioestimuladores y PDRN: los tratamientos no invasivos que regeneran tu piel y te hacen lucir más joven sin cirugía.",
    departamento: "medicina-estetica",
    categoriaPrincipal: "rejuvenecimiento",
    categoriasSecundarias: [],
    etiquetas: ["colágeno", "ácido hialurónico", "antiedad"],
    autor: "Equipo Gioventù",
    fecha: "2026-05-10",
    tiempoLectura: 6,
    imagen: "/blog-thumbs/rejuvenecimiento-facial.webp",
  },
  {
    slug: "causas-flacidez",
    titulo: "Causas de la flacidez y cómo eliminarla",
    tituloAccent: "cómo eliminarla",
    excerpt:
      "El colágeno se vence con la edad, el sol y los cambios de peso. Descubre qué causa la flacidez y qué tratamientos de grado médico sí la reafirman.",
    departamento: "medicina-estetica",
    categoriaPrincipal: "flacidez",
    categoriasSecundarias: ["rejuvenecimiento"],
    etiquetas: ["radiofrecuencia", "colágeno", "reafirmación"],
    autor: "Equipo Gioventù",
    fecha: "2026-05-03",
    tiempoLectura: 5,
    imagen: "/blog-thumbs/causas-flacidez.webp",
  },
  {
    slug: "rosacea-sintomas-causas",
    titulo: "Rosácea: síntomas y causas para el cuidado de tu piel",
    tituloAccent: "síntomas y causas",
    excerpt:
      "Enrojecimiento persistente, brotes y arañitas: reconoce los síntomas y detonantes de la rosácea y aprende cómo controlarla con criterio médico.",
    departamento: "dermatologia",
    categoriaPrincipal: "rosacea",
    categoriasSecundarias: [],
    etiquetas: ["enrojecimiento facial", "piel sensible", "brotes"],
    autor: "Andrea Ríos",
    fecha: "2026-04-28",
    tiempoLectura: 4,
    imagen: "/blog-thumbs/rosacea-sintomas-causas.webp",
  },
  {
    slug: "depilacion-laser-guia",
    titulo: "¿Cuáles son los 5 tipos de depilación? Guía completa",
    tituloAccent: "5 tipos de depilación",
    excerpt:
      "Láser, cera, rastrillo, crema o hilo: comparamos los 5 tipos de depilación más populares para que elijas el método más seguro para tu piel.",
    departamento: "wellness",
    categoriaPrincipal: "depilacion",
    categoriasSecundarias: [],
    etiquetas: ["láser diodo", "vello", "sesiones"],
    autor: "Equipo Gioventù",
    fecha: "2026-04-20",
    tiempoLectura: 7,
    imagen: "/blog-thumbs/depilacion-laser-guia.webp",
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
    imagen: "/blog-thumbs/manchas-melasma.webp",
  },
  {
    slug: "que-es-celulitis",
    titulo: "¿Qué es la celulitis y por qué sale? Guía completa",
    tituloAccent: "por qué sale",
    excerpt:
      "Piel de naranja: por qué aparece, sus 5 causas, los 3 tipos que existen y los tratamientos que de verdad suavizan y reafirman la piel.",
    departamento: "wellness",
    categoriaPrincipal: "celulitis",
    categoriasSecundarias: [],
    etiquetas: ["piel de naranja", "circulación", "tratamiento corporal"],
    autor: "Equipo Gioventù",
    fecha: "2026-04-06",
    tiempoLectura: 5,
    imagen: "/blog-thumbs/que-es-celulitis.webp",
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
