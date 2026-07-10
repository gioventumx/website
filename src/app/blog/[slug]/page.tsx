import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchiveListing } from "@/components/blog/ArchiveListing";
import { ArticleView } from "@/components/blog/ArticleView";
import type { Crumb } from "@/components/blog/Breadcrumb";
import {
  departamentos,
  posts,
  getDepartamento,
  getPost,
  postsByDepartamento,
  departamentoNombre,
  categoriaNombre,
} from "@/data/blog";
import { getPostContent } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

// Un solo segmento dinámico resuelve DEPARTAMENTO o ARTÍCULO (evita el conflicto de
// tener /blog/[departamento]/ y /blog/[slug]/ al mismo nivel). Las categorías van
// bajo el prefijo estático /blog/categoria/.
export function generateStaticParams() {
  return [
    ...departamentos.map((d) => ({ slug: d.slug })),
    ...posts.map((p) => ({ slug: p.slug })),
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const dep = getDepartamento(slug);
  if (dep) {
    return pageMetadata({
      title: `${dep.nombre} — Blog | Gioventù`,
      description: `Artículos de ${dep.nombre}: guías, señales y tratamientos explicados por el equipo de Gioventù.`,
      path: `/blog/${dep.slug}/`,
    });
  }

  const post = getPost(slug);
  if (post) {
    const { data } = getPostContent(post.slug);
    // Imagen destacada de la nota como og:image (fallback al thumbnail del sitio).
    const image = data.image ?? post.imagen;
    const base = pageMetadata({
      title: `${post.titulo} | Blog Gioventù`,
      description: post.excerpt,
      path: `/blog/${post.slug}/`,
      image,
      imageAlt: data.imageAlt ?? post.titulo,
      type: "article",
      keywords: post.etiquetas,
      noindex: post.draft,
    });
    // Campos propios de artículo (el helper no los incluye).
    return {
      ...base,
      openGraph: {
        ...base.openGraph,
        type: "article",
        publishedTime: post.fecha,
        modifiedTime: data.dateModified ?? post.fecha,
        authors: [post.autor],
      },
    };
  }

  return {};
}

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // 1) ¿Es un departamento? → listado del departamento.
  const dep = getDepartamento(slug);
  if (dep) {
    return (
      <ArchiveListing
        crumbs={[
          { label: "Inicio", href: "/" },
          { label: "Blog", href: "/blog/" },
          { label: dep.nombre },
        ]}
        seccionLabel="Departamento"
        seccionNombre={dep.nombre}
        posts={postsByDepartamento(dep.slug)}
        activeDept={dep.slug}
      />
    );
  }

  // 2) ¿Es un artículo? → vista completa del post.
  const post = getPost(slug);
  if (post) {
    const { body, data, headings, wordCount } = getPostContent(post.slug);
    const crumbs: Crumb[] = [
      { label: "Inicio", href: "/" },
      { label: "Blog", href: "/blog/" },
      { label: departamentoNombre(post.departamento), href: `/blog/${post.departamento}/` },
      {
        label: categoriaNombre(post.categoriaPrincipal),
        href: `/blog/categoria/${post.categoriaPrincipal}/`,
      },
    ];
    return (
      <ArticleView
        post={post}
        body={body}
        crumbs={crumbs}
        frontmatter={data}
        headings={headings}
        wordCount={wordCount}
      />
    );
  }

  // 3) Ni departamento ni artículo → 404.
  notFound();
}
