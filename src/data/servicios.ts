// ============================================================================
// PÁGINAS DE SERVICIO — datos (fuente de verdad). Mismo patrón que data/blog.ts:
// archivo PURO (sin fs) → seguro de importar también en componentes cliente. El
// CUERPO largo del contenido sticky vive en content/servicios/<slug>.md (Markdown,
// como el blog) y se lee aparte, en el servidor, cuando se construyan las páginas.
//
// REGLA CRÍTICA: `slug` y `path` son los de WordPress, TAL CUAL (ya tienen historial
// en Google). No se inventan ni se "limpian" — ver next.config.ts para los redirects
// legacy que dependen de esto.
//
// Por qué 3 especialidades con secciones distintas: cada template de servicio
// (Dermatología / Estética / Wellness) compone estos mismos campos en un orden y con
// unos bloques propios (ver componentes compartidos: RatingBand, StickyContent,
// TestimoniosMasonry, Carrusel, RelatedBlog). Los campos SOLO de una especialidad
// (diagnostico, queEsperar, datosCompactos) quedan opcionales — el template que no
// los usa simplemente no los lee.
// ============================================================================

export type Especialidad = "dermatologia" | "estetica" | "wellness";

/** Bajo qué hub de Wellness vive (define el segmento extra de la ruta: /wellness/faciales/<slug>/
 *  o /wellness/masajes/<slug>/). Solo aplica cuando especialidad === "wellness". */
export type Subvertical = "faciales" | "masajes";

export type RatingStat = { value: string; label: string };

/** Imagen de la columna sticky del contenido profundo (ver ui/StickyContent). */
export type ServicioImage = { src?: string; alt: string };

export type Servicio = {
  /** Slug real de WordPress (sin el prefijo de especialidad). */
  slug: string;
  /** Ruta completa y EXPLÍCITA (no derivada) — evita inventar nada con slugs
   *  mezclados (sustantivo/pregunta) y con el prefijo extra de wellness. */
  path: string;
  especialidad: Especialidad;
  /** Requerido cuando especialidad === "wellness". */
  subvertical?: Subvertical;

  titulo: string;
  excerpt: string;
  /** Nombre con artículo, en la forma gramatical correcta (ej. "la dermatitis",
   *  "los hilos tensores", "el Hollywood Peel"). Alimenta el H2 de "Qué es" en
   *  Dermatología — no se puede derivar de `titulo` sin arriesgar la concordancia
   *  de género/número. */
  nombreConArticulo: string;

  /** Sección 1 (Hero). En Dermatología es la OFERTA DE VALOR de Gioventù sobre el
   *  tratamiento (cómo lo atienden sus especialistas), no una definición clínica. */
  hero: {
    /** Override editorial. Sin especificar, usa `servicioEyebrow()` ("{Vertical} ·
     *  {titulo}") — SIEMPRE lleva el término de búsqueda. */
    eyebrow?: string;
    /** Override editorial del H1. Sin especificar, usa `servicioH1()` — SIEMPRE
     *  lleva el término de búsqueda (no inventar copy de marca sin keyword aquí). */
    titleTop?: string;
    /** Línea de valor, en acento (Playfair itálica), bajo el H1. */
    titleAccent?: string;
    body: string;
    cta?: string;
    /** TODO: imagen real de portada. Vacío = placeholder (MediaSurface). */
    image?: string;
  };

  /** "Qué es esto" (derma) / "Qué es y cómo funciona" (estética) / "Qué es y qué
   *  se siente" (wellness) — cuerpo del texto. El TÍTULO de la sección se arma con
   *  `servicioQueEsTitulo()`, no es un campo aparte (evita el título literal
   *  "Qué es esto" sin el nombre del servicio). */
  queEs: string;

  /** Alimenta RatingBand (banda de valoración), junto al rating de Google. */
  ratingStats: RatingStat[];

  /** SOLO Dermatología: cómo se ve, cuándo hay que revisarse. CTA a cita con el
   *  dermatólogo (usa BookingButton en el template, no un campo de href aquí). */
  diagnostico?: {
    titulo: string;
    body: string;
    cta: string;
  };

  /** Estética y Wellness: para quién es este tratamiento. */
  paraQuien?: string;

  /** SOLO Estética: qué esperar del proceso. */
  queEsperar?: {
    duracion: string;
    sesiones: string;
    recuperacion: string;
    permanencia: string;
  };

  /** SOLO Wellness: barra de datos compacta, justo debajo del hero. */
  datosCompactos?: {
    duracion: string;
    incluye: string;
    formato: string;
  };

  /** Imágenes del bloque de contenido profundo (ui/StickyContent). El texto en sí
   *  vive en content/servicios/<slug>.md, igual que el blog. Con 1 imagen: se queda
   *  fija mientras dura el scroll (mínimo por página). Con varias (solo donde el
   *  contenido lo amerite, ej. verrugas): cada una es sticky por turno y avanza a
   *  la siguiente según se scrollea — no hace falta cambiar el tipo para eso. */
  contenidoImagenes: ServicioImage[];

  /** Slugs curados de testimonios propios (opcional). Sin curar, el template cae al
   *  set de testimonios de la especialidad (mismo patrón que RelatedBlog con posts). */
  testimonios?: string[];

  /** Slugs curados de "tratamientos relacionados" (opcional). Sin curar, el template
   *  arma la lista automáticamente por especialidad/subvertical, excluyendo el actual. */
  relacionados?: string[];

  /** Borrador: se excluye del sitemap y de todos los listados; noindex. Mismo patrón
   *  que blog.ts. */
  draft?: boolean;
};

const VERTICAL_LABEL: Record<Especialidad, string> = {
  dermatologia: "Dermatología",
  estetica: "Medicina Estética",
  wellness: "Wellness",
};

// ── Títulos DINÁMICOS (H1 + H2 de sección) ──────────────────────────────────
// Centralizados aquí (no repetidos por template) para que los 3 templates —y las
// próximas 17 páginas— compartan el mismo criterio SEO sin depender de que cada
// autor lo recuerde: el H1 y los H2 de sección SIEMPRE llevan el término de
// búsqueda, nunca copy de marca genérico.

/** H1 del hero — SIEMPRE con el término de búsqueda. Derma antepone "Tratamiento
 *  de" (la intención de búsqueda es cómo tratar el padecimiento); Estética/Wellness
 *  usan el nombre del procedimiento tal cual (ya es el término que se busca). */
export function servicioH1(servicio: Servicio): string {
  if (servicio.hero.titleTop) return servicio.hero.titleTop;
  return servicio.especialidad === "dermatologia"
    ? `Tratamiento de ${servicio.titulo.toLowerCase()}`
    : servicio.titulo;
}

/** Eyebrow del hero — "{Vertical} · {Servicio}" por defecto, lleva el término también. */
export function servicioEyebrow(servicio: Servicio): string {
  return servicio.hero.eyebrow ?? `${VERTICAL_LABEL[servicio.especialidad]} · ${servicio.titulo}`;
}

/** Título de "Qué es". Distinto patrón por especialidad para no arriesgar
 *  concordancia de género/número (el/la, singular/plural) al derivarlo del nombre:
 *  en Estética/Wellness el nombre va PRIMERO como rótulo (no como sujeto de una
 *  oración conjugada), en Derma se apoya en `nombreConArticulo` (ya resuelto). */
export function servicioQueEsTitulo(servicio: Servicio): string {
  switch (servicio.especialidad) {
    case "dermatologia":
      return `Qué es ${servicio.nombreConArticulo}`;
    case "estetica":
      return `${servicio.titulo}: qué es y cómo funciona`;
    case "wellness":
      return `${servicio.titulo}: qué es y qué se siente`;
  }
}

/** Título de "Para quién es" (Estética + Wellness). Mismo patrón "rótulo primero"
 *  que servicioQueEsTitulo, por la misma razón de concordancia. */
export function servicioParaQuienTitulo(servicio: Servicio): string {
  return `${servicio.titulo}: ¿es para ti?`;
}

// 1 servicio de EJEMPLO por especialidad, para probar que los 3 templates renderizan
// (rutas, generateStaticParams, sitemap). `draft: true` a propósito: el copy es de
// prueba, no definitivo — no debe indexarse ni verse en listados hasta reemplazarlo
// por contenido real y quitar el draft.
export const servicios: Servicio[] = [
  {
    slug: "dermatitis",
    path: "/dermatologia/dermatitis/",
    especialidad: "dermatologia",
    titulo: "Dermatitis",
    nombreConArticulo: "la dermatitis",
    excerpt: "Diagnóstico y tratamiento de dermatitis con dermatólogos certificados.",
    hero: {
      // Sin titleTop: el H1 se deriva ("Tratamiento de dermatitis") vía servicioH1().
      titleAccent: "con diagnóstico certero",
      body: "Nuestros dermatólogos identifican el tipo de dermatitis y su desencadenante antes de tratarla, para un plan que sí resuelve el brote.",
      cta: "Agendar valoración",
    },
    queEs: "La dermatitis es la inflamación de la piel: enrojecimiento, comezón y resequedad que puede volverse crónica sin el diagnóstico correcto.",
    ratingStats: [
      { value: "+10 años", label: "de experiencia clínica" },
      { value: "100%", label: "dermatólogos certificados" },
    ],
    diagnostico: {
      titulo: "Cómo saber si es momento de revisarte",
      body: "Enrojecimiento persistente, comezón que no cede, piel agrietada o brotes que regresan son señal de que el padecimiento necesita un diagnóstico médico, no solo una crema de venta libre.",
      cta: "Agendar cita con el dermatólogo",
    },
    contenidoImagenes: [{ alt: "Consulta dermatológica" }],
    draft: true,
  },
  {
    slug: "hilos-tensores",
    path: "/estetica/hilos-tensores/",
    especialidad: "estetica",
    titulo: "Hilos tensores",
    nombreConArticulo: "los hilos tensores",
    excerpt: "Efecto lifting sin cirugía con hilos tensores de grado médico.",
    hero: {
      // Sin titleTop: el H1 se deriva ("Hilos tensores", el nombre tal cual) vía servicioH1().
      titleAccent: "efecto lifting sin cirugía",
      body: "Hilos de grado médico que reposicionan y estimulan colágeno para un efecto tensor natural, indicado por médicos estéticos.",
      cta: "Agendar valoración",
    },
    queEs: "Los hilos tensores son filamentos absorbibles que se insertan bajo la piel para levantar el tejido y estimular la producción natural de colágeno.",
    ratingStats: [
      { value: "4.7", label: "en Google" },
      { value: "+10 años", label: "de experiencia clínica" },
    ],
    paraQuien: "Para quien busca un efecto lifting visible sin pasar por quirófano, con piel que ya muestra flacidez leve a moderada.",
    queEsperar: {
      duracion: "45–60 minutos",
      sesiones: "1 sesión, mantenimiento anual",
      recuperacion: "1–3 días de sensibilidad leve",
      permanencia: "12–18 meses",
    },
    contenidoImagenes: [],
    draft: true,
  },
  {
    slug: "hollywood-peel",
    path: "/wellness/faciales/hollywood-peel/",
    especialidad: "wellness",
    subvertical: "faciales",
    titulo: "Hollywood Peel",
    nombreConArticulo: "el Hollywood Peel",
    excerpt: "Facial con láser y carbón activado: piel luminosa, sin tiempo de recuperación.",
    hero: {
      // Sin titleTop: el H1 se deriva ("Hollywood Peel", el nombre tal cual) vía servicioH1().
      titleAccent: "el facial de las estrellas",
      body: "Láser + carbón activado para piel luminosa y poros afinados, sin tiempo de recuperación. Ideal antes de un evento.",
      cta: "Agendar facial",
    },
    queEs: "El Hollywood Peel combina láser con una mascarilla de carbón activado: al retirarla arrastra impurezas y pareja el tono de la piel.",
    ratingStats: [
      { value: "4.7", label: "en Google" },
      { value: "0 días", label: "de recuperación" },
    ],
    paraQuien: "Para quien quiere un resultado inmediato antes de un evento, sin dolor ni tiempo de inactividad.",
    datosCompactos: {
      duracion: "45 minutos",
      incluye: "Láser + mascarilla de carbón activado",
      formato: "Sesión individual",
    },
    contenidoImagenes: [{ alt: "Aplicación de Hollywood Peel" }],
    draft: true,
  },
];

// ── Selectores PUROS (sin fs) ───────────────────────────────────────────────

/** Servicios PUBLICADOS (sin borradores) de una especialidad, en orden de catálogo. */
export function serviciosByEspecialidad(especialidad: Especialidad): Servicio[] {
  return servicios.filter((s) => s.especialidad === especialidad && !s.draft);
}

/** Servicios PUBLICADOS de un hub de Wellness (faciales o masajes). */
export function serviciosBySubvertical(subvertical: Subvertical): Servicio[] {
  return servicios.filter(
    (s) => s.especialidad === "wellness" && s.subvertical === subvertical && !s.draft
  );
}

/** Busca por `path` completo (único real): lo que resuelve cada page.tsx dinámico. */
export function getServicioByPath(path: string): Servicio | null {
  return servicios.find((s) => s.path === path) ?? null;
}

/** Relacionados: usa `relacionados` curado si existe; si no, cae a los demás
 *  servicios de la misma especialidad/subvertical (excluyendo el actual). */
export function relatedServicios(servicio: Servicio, limit = 4): Servicio[] {
  if (servicio.relacionados?.length) {
    return servicio.relacionados
      .map((slug) => servicios.find((s) => s.slug === slug && !s.draft))
      .filter((s): s is Servicio => Boolean(s))
      .slice(0, limit);
  }

  const pool =
    servicio.especialidad === "wellness" && servicio.subvertical
      ? serviciosBySubvertical(servicio.subvertical)
      : serviciosByEspecialidad(servicio.especialidad);

  return pool.filter((s) => s.slug !== servicio.slug).slice(0, limit);
}
