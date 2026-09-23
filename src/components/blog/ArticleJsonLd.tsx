import {
  categoriaNombre,
  getAutorPorNombre,
  getMedicalReview,
  type BlogPost,
  type MedicalReviewer,
} from "@/data/blog";
import type { PostFrontmatter } from "@/lib/blog";
import type { Crumb } from "./Breadcrumb";

// JSON-LD para SEO. Emite:
//  · BlogPosting (headline, autor Person, imagen ImageObject, wordCount, idioma…)
//  · BreadcrumbList
//  · FAQPage        (solo si el frontmatter trae faq con al menos una entrada)
//  · MedicalWebPage (solo en notas con revisión médica — ver getMedicalReview)
const SITE = "https://gioventu.com.mx"; // igual que metadataBase (layout)
const LANG = "es-MX";

// Person de la revisora médica (reviewedBy). Datos de MEDICAL_REVIEWER (data/blog.ts).
// Sin sameAs/url: no hay perfil público.
function reviewerPerson(r: MedicalReviewer) {
  return {
    "@type": "Person",
    name: r.name,
    jobTitle: r.jobTitle,
    alumniOf: { "@type": "CollegeOrUniversity", name: r.alumniOf },
    knowsAbout: r.knowsAbout,
    identifier: [
      { "@type": "PropertyValue", name: "Cédula profesional", value: r.cedulaProfesional },
      { "@type": "PropertyValue", name: "Cédula de especialidad", value: r.cedulaEspecialidad },
    ],
  };
}

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

  // Revisión POR NOTA: null si la nota no está "revisado" (o sin revisor/fecha).
  const review = getMedicalReview(frontmatter);

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
    // reviewedBy solo en notas revisadas por el revisor médico.
    ...(review ? { reviewedBy: reviewerPerson(review.reviewer) } : {}),
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

  // MedicalWebPage: página de salud REVISADA por un médico. Solo en notas revisadas.
  // lastReviewed = reviewedDate (misma fecha que la línea visible), NO dateModified.
  const medicalWebPage = review
    ? {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        inLanguage: LANG,
        "@id": url,
        url,
        name: post.titulo,
        lastReviewed: review.reviewedDate,
        reviewedBy: reviewerPerson(review.reviewer),
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
