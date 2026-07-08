import Link from "next/link";
import { PostThumb } from "./PostThumb";
import { departamentoNombre, formatFecha, type BlogPost } from "@/data/blog";

// Tarjeta del grid del índice / archivos. Enlaza a /blog/<slug>/.
export function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/blog/${post.slug}/`}
      className="group block overflow-hidden rounded-card border border-line bg-white transition-transform duration-300 ease-out hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      <PostThumb
        src={post.imagen}
        sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
        className="aspect-[16/10] w-full"
      />
      <div className="p-5">
        <span className="text-[0.66rem] font-semibold uppercase tracking-[0.12em] text-brand">
          {departamentoNombre(post.departamento)}
        </span>
        <h3 className="mt-1.5 font-sans text-[1.08rem] font-medium leading-snug text-ink transition-colors group-hover:text-brand">
          {post.titulo}
        </h3>
        <p className="mt-2 line-clamp-2 text-[0.86rem] leading-relaxed text-muted">{post.excerpt}</p>
        <span className="mt-3 block text-[0.76rem] text-muted">{formatFecha(post.fecha)}</span>
      </div>
    </Link>
  );
}
