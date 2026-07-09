import Link from "next/link";
import { PostThumb } from "./PostThumb";
import { departamentoNombre, type BlogPost } from "@/data/blog";

// "Sigue leyendo" — artículos relacionados. Grid 4 → 2 → 1.
export function RelatedPosts({ posts }: { posts: BlogPost[] }) {
  if (posts.length === 0) return null;
  return (
    <section className="border-t border-line bg-white px-4 py-14 md:px-6">
      <div className="container-x">
        <h2 className="mb-7 font-sans text-[1.8rem] font-light text-ink">
          Sigue <span className="font-accent text-brand">leyendo</span>
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}/`}
              className="group block transition duration-[1200ms] ease-out hover:-translate-y-6 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
            >
              <PostThumb
                src={post.imagen}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                className="mb-3 aspect-[4/3] w-full rounded-card"
              />
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-brand">
                {departamentoNombre(post.departamento)}
              </span>
              <h3 className="mt-1 font-sans text-[0.98rem] font-medium leading-snug text-ink transition-colors group-hover:text-brand">
                {post.titulo}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
