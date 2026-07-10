import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArchiveListing } from "@/components/blog/ArchiveListing";
import { categorias, getCategoria, postsByCategoria } from "@/data/blog";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return categorias.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cat = getCategoria(slug);
  if (!cat) return {};
  return pageMetadata({
    title: `${cat.nombre} — Blog | Gioventù`,
    description: `Artículos sobre ${cat.nombre}: causas, señales y tratamientos explicados por el equipo de Gioventù.`,
    path: `/blog/categoria/${cat.slug}/`,
    // Sin posts publicados → noindex (categoría vacía no se indexa).
    noindex: postsByCategoria(cat.slug).length === 0,
  });
}

export default async function BlogCategoriaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const cat = getCategoria(slug);
  if (!cat) notFound();

  return (
    <ArchiveListing
      crumbs={[
        { label: "Inicio", href: "/" },
        { label: "Blog", href: "/blog/" },
        { label: cat.nombre },
      ]}
      seccionLabel="Tema"
      seccionNombre={cat.nombre}
      posts={postsByCategoria(cat.slug)}
      activeCat={cat.slug}
    />
  );
}
