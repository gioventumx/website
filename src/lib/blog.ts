// Lectura del CUERPO de los artículos (Markdown en content/blog/<slug>.md).
// SOLO servidor (usa fs). Los selectores puros viven en data/blog.ts para poder
// importarse también desde componentes cliente.

import fs from "node:fs";
import path from "node:path";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

/** Devuelve el Markdown del artículo, o "" si aún no existe el archivo. */
export function getPostBody(slug: string): string {
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  try {
    return fs.readFileSync(file, "utf8");
  } catch {
    return "";
  }
}
