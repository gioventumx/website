// Rutas "verticales": su header muestra un ÍNDICE DE ANCLAS a las secciones de la
// misma página (en vez de los links de vertical, que se mueven al toggle menu).
// El resto de páginas (Home, blog, etc.) no están aquí → header normal.

// Cada ítem del menú de vertical es un ancla a una sección (`id` → #id) o un enlace
// a una página (`href`). El hub /wellness/ no tiene secciones, así que usa `href`.
export type Anchor = { label: string; id?: string; href?: string };

export const verticalNav: Record<string, { anchors: Anchor[] }> = {
  // Hub Wellness: el menú lleva a las páginas hijas (no a anclas de la misma página).
  "/wellness/": {
    anchors: [
      { label: "Faciales", href: "/wellness/faciales/" },
      { label: "Masajes", href: "/wellness/masajes/" },
    ],
  },
  "/dermatologia/": {
    anchors: [
      { id: "tratamientos", label: "Tratamientos" },
      { id: "testimonios", label: "Testimonios" },
      { id: "preguntas", label: "Preguntas" },
    ],
  },
  "/wellness/faciales/": {
    anchors: [
      { id: "faciales", label: "Faciales disponibles" },
      { id: "testimonios", label: "Testimonios" },
      { id: "preguntas", label: "Preguntas" },
    ],
  },
  "/wellness/masajes/": {
    anchors: [
      { id: "masajes", label: "Masajes disponibles" },
      { id: "testimonios", label: "Testimonios" },
      { id: "preguntas", label: "Preguntas" },
    ],
  },
};

/** Normaliza el pathname a con trailing slash (config de rutas usa trailing slash). */
export function getVertical(pathname: string) {
  const p = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return verticalNav[p] ?? null;
}
