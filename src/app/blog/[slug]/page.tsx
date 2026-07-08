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
import { getPostBody } from "@/lib/blog";

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
    return {
      title: `${dep.nombre} — Blog | Gioventù`,
      description: `Artículos de ${dep.nombre}: guías, señales y tratamientos explicados por el equipo de Gioventù.`,
      alternates: { canonical: `/blog/${dep.slug}/` },
    };
  }

  const post = getPost(slug);
  if (post) {
    return {
      title: `${post.titulo} | Blog Gioventù`,
      description: post.excerpt,
      // Etiquetas SOLO como keywords (nunca ruta indexable).
      keywords: post.etiquetas,
      alternates: { canonical: `/blog/${post.slug}/` },
      openGraph: {
        type: "article",
        title: post.titulo,
        description: post.excerpt,
        url: `/blog/${post.slug}/`,
        publishedTime: post.fecha,
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
    const body = getPostBody(post.slug);
    const crumbs: Crumb[] = [
      { label: "Inicio", href: "/" },
      { label: "Blog", href: "/blog/" },
      { label: departamentoNombre(post.departamento), href: `/blog/${post.departamento}/` },
      {
        label: categoriaNombre(post.categoriaPrincipal),
        href: `/blog/categoria/${post.categoriaPrincipal}/`,
      },
    ];
    return <ArticleView post={post} body={body} crumbs={crumbs} />;
  }

  // 3) Ni departamento ni artículo → 404.
  notFound();
}
