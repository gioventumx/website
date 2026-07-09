import Link from "next/link";
import { Breadcrumb, type Crumb } from "./Breadcrumb";
import { PostThumb } from "./PostThumb";
import { PostBody } from "./PostBody";
import { TableOfContents } from "./TableOfContents";
import { TagPills } from "./TagPills";
import { NewsletterAside } from "./NewsletterAside";
import { RelatedPosts } from "./RelatedPosts";
import { ArticleJsonLd } from "./ArticleJsonLd";
import {
  departamentoNombre,
  formatFecha,
  getAutorPorNombre,
  relatedPosts,
  type BlogPost,
} from "@/data/blog";
import type { Heading, PostFrontmatter } from "@/lib/blog";

function TitleAccent({ titulo, accent }: { titulo: string; accent?: string }) {
  if (accent && titulo.includes(accent)) {
    const [before, after] = titulo.split(accent);
    return (
      <>
        {before}
        <span className="font-accent">{accent}</span>
        {after}
      </>
    );
  }
  return <>{titulo}</>;
}

export function ArticleView({
  post,
  body,
  crumbs,
  frontmatter,
  headings,
  wordCount,
}: {
  post: BlogPost;
  body: string;
  crumbs: Crumb[];
  frontmatter: PostFrontmatter;
  headings: Heading[];
  wordCount: number;
}) {
  const related = relatedPosts(post, 4);
  const autor = getAutorPorNombre(post.autor);
  // Imagen destacada: frontmatter (autoritativo) con fallback al campo de listados.
  const image = frontmatter.image ?? post.imagen;
  const imageAlt = frontmatter.imageAlt ?? post.titulo;

  return (
    <>
      <ArticleJsonLd post={post} crumbs={crumbs} frontmatter={frontmatter} wordCount={wordCount} />

      <div className="container-x">
        <Breadcrumb items={crumbs} className="pt-6" />

        {/* Cabecera del post sobre brand-tint */}
        <header className="mt-4 rounded-block bg-brand-tint p-8 md:p-11">
          <span className="mb-4 inline-block rounded-full bg-brand px-3.5 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-white">
            {departamentoNombre(post.departamento)}
          </span>
          <h1 className="max-w-[820px] font-sans text-[clamp(1.9rem,4vw,2.9rem)] font-light leading-[1.12] tracking-[-0.01em] text-ink">
            <TitleAccent titulo={post.titulo} accent={post.tituloAccent} />
          </h1>
          <p className="mt-4 max-w-[720px] text-[1.05rem] text-ink-soft">{post.excerpt}</p>
          <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.85rem] text-muted">
            {autor ? (
              <Link
                href={`/blog/autor/${autor.slug}/`}
                className="font-semibold text-ink underline-offset-2 hover:text-brand hover:underline"
              >
                {autor.nombre}
              </Link>
            ) : (
              <span className="font-semibold text-ink">{post.autor}</span>
            )}
            <span aria-hidden>·</span>
            <time dateTime={post.fecha}>{formatFecha(post.fecha)}</time>
            <span aria-hidden>·</span>
            <span>{post.tiempoLectura} min de lectura</span>
          </div>
        </header>

        {/* Cuerpo + aside */}
        <div className="grid items-start gap-12 py-12 lg:grid-cols-[1fr_320px]">
          <article>
            <PostThumb
              src={image}
              alt={imageAlt}
              sizes="(max-width: 1024px) 100vw, 800px"
              priority
              className="mb-8 aspect-[16/10] w-full rounded-block"
            />
            <TableOfContents headings={headings} className="mb-8" />
            <PostBody markdown={body} />
            <TagPills tags={post.etiquetas} />

            {/* Aviso médico (YMYL) — presente en todas las notas */}
            <aside className="mt-10 rounded-block border border-line bg-brand-tint/40 p-5 text-[0.9rem] leading-relaxed text-ink-soft">
              <strong className="text-ink">Este contenido es informativo</strong> y no sustituye una
              consulta médica.{" "}
              <Link
                href="/dermatologia/"
                className="font-medium text-brand underline underline-offset-2 hover:text-brand-hover"
              >
                Agenda una valoración con nuestros dermatólogos.
              </Link>
            </aside>
          </article>

          <NewsletterAside />
        </div>
      </div>

      <RelatedPosts posts={related} />
    </>
  );
}
