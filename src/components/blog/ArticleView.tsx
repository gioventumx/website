import { Breadcrumb, type Crumb } from "./Breadcrumb";
import { PostThumb } from "./PostThumb";
import { PostBody } from "./PostBody";
import { TagPills } from "./TagPills";
import { NewsletterAside } from "./NewsletterAside";
import { RelatedPosts } from "./RelatedPosts";
import { ArticleJsonLd } from "./ArticleJsonLd";
import { departamentoNombre, formatFecha, relatedPosts, type BlogPost } from "@/data/blog";

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
}: {
  post: BlogPost;
  body: string;
  crumbs: Crumb[];
}) {
  const related = relatedPosts(post, 4);

  return (
    <>
      <ArticleJsonLd post={post} crumbs={crumbs} />

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
            <span className="font-semibold text-ink">{post.autor}</span>
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
              src={post.imagen}
              alt={post.titulo}
              sizes="(max-width: 1024px) 100vw, 800px"
              priority
              className="mb-8 aspect-[16/10] w-full rounded-block"
            />
            <PostBody markdown={body} />
            <TagPills tags={post.etiquetas} />
          </article>

          <NewsletterAside />
        </div>
      </div>

      <RelatedPosts posts={related} />
    </>
  );
}
