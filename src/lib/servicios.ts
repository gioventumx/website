// Lectura del CUERPO del contenido profundo (Markdown en content/servicios/<slug>.md,
// para ui/StickyContent). SOLO servidor (usa fs). Mismo patrón que lib/blog.ts, pero
// sin frontmatter todavía — no hace falta hasta que el contenido lo pida.

import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content", "servicios");

/** Cuerpo Markdown del servicio. Vacío si no hay archivo (ej. Estética, que no usa
 *  StickyContent, o un servicio sin contenido escrito todavía). */
export function getServicioBody(slug: string): string {
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  try {
    return fs.readFileSync(file, "utf8").trim();
  } catch {
    return "";
  }
}
