import { categoriaNombre, type BlogPost } from "@/data/blog";
import type { Crumb } from "./Breadcrumb";

// JSON-LD para SEO: BlogPosting (headline, autor, fecha, imagen) + BreadcrumbList.
const SITE = "https://gioventu.com.mx"; // igual que metadataBase (layout)

export function ArticleJsonLd({ post, crumbs }: { post: BlogPost; crumbs: Crumb[] }) {
  const url = `${SITE}/blog/${post.slug}/`;

  const blogPosting = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.titulo,
    description: post.excerpt,
    datePublished: post.fecha,
    dateModified: post.fecha,
    author: { "@type": "Person", name: post.autor },
    publisher: {
      "@type": "Organization",
      name: "Gioventù",
      logo: { "@type": "ImageObject", url: `${SITE}/favicon-gioventu.webp` },
    },
    ...(post.imagen ? { image: [`${SITE}${post.imagen}`] } : {}),
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    keywords: post.etiquetas.join(", "),
    articleSection: categoriaNombre(post.categoriaPrincipal),
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

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPosting) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbList) }}
      />
    </>
  );
}
