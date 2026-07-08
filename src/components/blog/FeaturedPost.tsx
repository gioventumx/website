import Link from "next/link";
import { PostThumb } from "./PostThumb";
import { departamentoNombre, type BlogPost } from "@/data/blog";

// Artículo destacado del índice (imagen + cuerpo, lado a lado; apila en móvil).
export function FeaturedPost({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className="group grid overflow-hidden rounded-block border border-line bg-white shadow-card md:grid-cols-[1.3fr_1fr]"
    >
      <PostThumb
        src={post.imagen}
        sizes="(max-width: 900px) 100vw, 55vw"
        className="min-h-[240px] w-full md:min-h-[340px]"
      />
      <div className="flex flex-col justify-center p-8 md:p-10">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] text-brand">
          {departamentoNombre(post.departamento)}
        </span>
        <h2 className="mt-2.5 font-sans text-[clamp(1.5rem,2.8vw,2rem)] font-normal leading-[1.15] text-ink">
          {post.titulo}
        </h2>
        <p className="mt-3 text-[0.95rem] text-muted">{post.excerpt}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-[0.9rem] font-semibold text-brand">
          Leer artículo
          <span
            aria-hidden
            className="transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
          >
            →
          </span>
        </span>
      </div>
    </Link>
  );
}
