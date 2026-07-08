import type { Metadata } from "next";
import { BlogFilters } from "@/components/blog/BlogFilters";
import { FeaturedPost } from "@/components/blog/FeaturedPost";
import { PostCard } from "@/components/blog/PostCard";
import { blogMeta, featuredPost, getAllPostsSorted } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog — Crónicas de tu piel | Gioventù",
  description:
    "Tratamientos que sí funcionan, señales que no debes ignorar y todo lo que necesitas saber para cuidar tu piel. Dermatología, medicina estética y wellness por Gioventù.",
  alternates: { canonical: "/blog/" },
};

export default function BlogIndexPage() {
  const featured = featuredPost();
  const rest = getAllPostsSorted().filter((p) => p.slug !== featured.slug);

  return (
    <div className="container-x pb-20">
      {/* Cabecera */}
      <div className="pt-16 text-center">
        <span className="eyebrow">{blogMeta.eyebrow}</span>
        <h1 className="mt-3 font-sans text-[clamp(2.2rem,4.5vw,3.2rem)] font-light leading-[1.1] tracking-[-0.01em] text-ink">
          {blogMeta.titleTop} <span className="font-accent text-brand">{blogMeta.titleAccent}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-[600px] text-muted">{blogMeta.body}</p>
      </div>

      <BlogFilters />

      <FeaturedPost post={featured} />

      <div className="mt-11 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
