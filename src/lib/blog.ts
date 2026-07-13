// Lectura del CUERPO de los artículos (Markdown en content/blog/<slug>.md).
// SOLO servidor (usa fs). Los selectores puros viven en data/blog.ts para poder
// importarse también desde componentes cliente.

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

/** Una pregunta/respuesta del bloque FAQ (alimenta el schema FAQPage). */
export type PostFaq = { q: string; a: string };

/** Frontmatter YAML del artículo. Todo opcional: sin frontmatter, todo vacío. */
export type PostFrontmatter = {
  /** Ruta pública de la portada real, ej. "/blog/lunares-vs-verrugas.webp". */
  image?: string;
  /** Alt descriptivo PROPIO de la imagen (no el título). Alimenta og/schema. */
  imageAlt?: string;
  /** Fecha de última actualización real (ISO YYYY-MM-DD). */
  dateModified?: string;
  /** Preguntas frecuentes → FAQPage. Solo se emite si hay al menos una. */
  faq?: PostFaq[];
  /** "pendiente" = contenido médico sin validar por un profesional (marcador interno). */
  reviewStatus?: string;
};

/** Un encabezado del cuerpo para la tabla de contenidos. */
export type Heading = { id: string; text: string; level: 2 | 3 };

export type PostContent = {
  body: string;
  data: PostFrontmatter;
  wordCount: number;
  headings: Heading[];
};

/** Quita marcas Markdown inline del texto de un heading (negritas, código, links). */
function stripInline(md: string): string {
  return md
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // [texto](url) → texto
    .replace(/[*_`]+/g, "")
    .trim();
}

/**
 * Extrae H2/H3 del Markdown y les asigna el MISMO id que rehype-slug (github-slugger),
 * para que los enlaces del TOC (#id) coincidan con los ids que renderiza el cuerpo.
 */
function extractHeadings(body: string): Heading[] {
  const slugger = new GithubSlugger(); // un slugger por documento = ids únicos por post
  const out: Heading[] = [];
  let inFence = false;
  for (const raw of body.split("\n")) {
    if (/^\s*```/.test(raw)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;
    const m = /^(#{2,3})\s+(.*)$/.exec(raw);
    if (!m) continue;
    const text = stripInline(m[2]);
    if (!text) continue;
    out.push({ id: slugger.slug(text), text, level: m[1].length as 2 | 3 });
  }
  return out;
}

/** Cuenta palabras del cuerpo (sin sintaxis Markdown) para schema wordCount. */
function countWords(body: string): number {
  const plain = body
    .replace(/```[\s\S]*?```/g, " ") // bloques de código
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/[#>*_`~\-|]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return plain ? plain.split(" ").length : 0;
}

/** Lee y parsea el artículo: frontmatter + cuerpo + headings + wordCount. */
export function getPostContent(slug: string): PostContent {
  const file = path.join(CONTENT_DIR, `${slug}.md`);
  let raw = "";
  try {
    raw = fs.readFileSync(file, "utf8");
  } catch {
    return { body: "", data: {}, wordCount: 0, headings: [] };
  }
  const parsed = matter(raw);
  const body = parsed.content.trim();
  return {
    body,
    data: parsed.data as PostFrontmatter,
    wordCount: countWords(body),
    headings: extractHeadings(body),
  };
}
