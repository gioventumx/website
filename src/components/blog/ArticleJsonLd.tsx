import { categoriaNombre, getAutorPorNombre, type BlogPost } from "@/data/blog";
import type { PostFrontmatter } from "@/lib/blog";
import type { Crumb } from "./Breadcrumb";

// JSON-LD para SEO. Emite:
//  · BlogPosting (headline, autor Person, imagen ImageObject, wordCount, idioma…)
//  · BreadcrumbList
//  · FAQPage        (solo si el frontmatter trae faq con al menos una entrada)
//  · MedicalWebPage (solo cuando haya REVISOR médico configurado — hoy no)
const SITE = "https://gioventu.com.mx"; // igual que metadataBase (layout)
const LANG = "es-MX";

// ── E-E-A-T · Revisor médico ────────────────────────────────────────────────
// TODO(revisor médico): cuando tengamos NOMBRE + CÉDULA PROFESIONAL de la
// dermatóloga que revisa el contenido, rellena esta constante. Mientras sea null
// NO se emite `reviewedBy` ni `MedicalWebPage` (evitamos schema falso en YMYL).
// Forma esperada:
//   { name: "Dra. Nombre Apellido", jobTitle: "Dermatóloga",
//     cedula: "0000000", url: `${SITE}/conocenos/` }
const MEDICAL_REVIEWER: {
  name: string;
  jobTitle: string;
  cedula: string;
  url?: string;
} | null = null;

export function ArticleJsonLd({
  post,
  crumbs,
  frontmatter,
  wordCount,
}: {
  post: BlogPost;
  crumbs: Crumb[];
  frontmatter: PostFrontmatter;
  wordCount: number;
}) {
  const url = `${SITE}/blog/${post.slug}/`;
  const image = frontmatter.image ?? post.imagen;
  const imageAlt = frontmatter.imageAlt;
  const dateModified = frontmatter.dateModified ?? post.fecha;

  // Autor: si está en el catálogo → Person con su página de autor; si no, solo nombre.
  const autor = getAutorPorNombre(post.autor);
  const author = autor
    ? { "@type": "Person", name: autor.nombre, url: `${SITE}/blog/autor/${autor.slug}/` }
    : { "@type": "Person", name: post.autor };

  const reviewer = MEDICAL_REVIEWER;

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    inLanguage: LANG,
    headline: post.titulo,
    description: post.excerpt,
    datePublished: post.fecha,
    dateModified,
    wordCount,
    author,
    publisher: {
      "@type": "Organization",
      name: "Gioventù",
      logo: { "@type": "ImageObject", url: `${SITE}/favicon-gioventu.webp` },
    },
    ...(image
      ? {
          image: {
            "@type": "ImageObject",
            url: `${SITE}${image}`,
            ...(imageAlt ? { caption: imageAlt } : {}),
          },
        }
      : {}),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.etiquetas.join(", "),
    articleSection: categoriaNombre(post.categoriaPrincipal),
    // reviewedBy se completa solo cuando haya revisor médico configurado.
    ...(reviewer
      ? {
          reviewedBy: {
            "@type": "Person",
            name: reviewer.name,
            jobTitle: reviewer.jobTitle,
            identifier: reviewer.cedula,
            ...(reviewer.url ? { url: reviewer.url } : {}),
          },
        }
      : {}),
  };

  const breadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      ...(c.href ? { item: `${SITE}${c.href}` } : {}),
    })),
  };

  // FAQPage: solo si hay preguntas reales (nunca placeholders).
  const faq = (frontmatter.faq ?? []).filter((f) => f.q?.trim() && f.a?.trim());
  const faqPage =
    faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          inLanguage: LANG,
          mainEntity: faq.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  // MedicalWebPage: página de salud REVISADA por un médico. Solo con revisor.
  const medicalWebPage =
    reviewer
      ? {
          "@context": "https://schema.org",
          "@type": "MedicalWebPage",
          inLanguage: LANG,
          "@id": url,
          url,
          name: post.titulo,
          lastReviewed: dateModified,
          reviewedBy: {
            "@type": "Person",
            name: reviewer.name,
            jobTitle: reviewer.jobTitle,
            identifier: reviewer.cedula,
            ...(reviewer.url ? { url: reviewer.url } : {}),
          },
        }
      : null;

  const graph = [blogPosting, breadcrumbList, faqPage, medicalWebPage].filter(Boolean);

  return (
    <>
      {graph.map((node, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </>
  );
}
