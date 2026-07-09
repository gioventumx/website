// Rutas "verticales": su header muestra un ÍNDICE DE ANCLAS a las secciones de la
// misma página (en vez de los links de vertical, que se mueven al toggle menu).
// El resto de páginas (Home, blog, etc.) no están aquí → header normal.

export type Anchor = { id: string; label: string };

export const verticalNav: Record<string, { anchors: Anchor[] }> = {
  "/dermatologia/": {
    anchors: [
      { id: "tratamientos", label: "Tratamientos" },
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
