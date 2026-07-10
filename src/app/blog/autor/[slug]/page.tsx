import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumb, type Crumb } from "@/components/blog/Breadcrumb";
import { PostCard } from "@/components/blog/PostCard";
import { autores, getAutor, postsByAutor } from "@/data/blog";
import { pageMetadata } from "@/lib/seo";

const SITE = "https://gioventu.com.mx";

export function generateStaticParams() {
  return autores.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const autor = getAutor(slug);
  if (!autor) return {};
  return pageMetadata({
    title: `${autor.nombre} — Autora | Blog Gioventù`,
    description: autor.bio,
    path: `/blog/autor/${autor.slug}/`,
  });
}

export default async function AutorPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const autor = getAutor(slug);
  if (!autor) notFound();

  const posts = postsByAutor(autor.slug);
  const url = `${SITE}/blog/autor/${autor.slug}/`;
  const crumbs: Crumb[] = [
    { label: "Inicio", href: "/" },
    { label: "Blog", href: "/blog/" },
    { label: autor.nombre },
  ];

  // Person + ProfilePage: entidad autor (E-E-A-T). Redacción, sin credenciales médicas.
  const person = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: autor.nombre,
    jobTitle: autor.rol,
    description: autor.bio,
    url,
    worksFor: { "@type": "Organization", name: "Gioventù", url: SITE },
  };
  const profilePage = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    inLanguage: "es-MX",
    "@id": url,
    url,
    mainEntity: { "@type": "Person", name: autor.nombre },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePage) }}
      />

      <div className="container-x pb-20">
        <Breadcrumb items={crumbs} className="pt-6" />

        <header className="mt-6 max-w-[720px]">
          <span className="text-[0.66rem] font-semibold uppercase tracking-[0.16em] text-brand">
            Autora
          </span>
          <h1 className="mt-2 font-sans text-[clamp(2rem,4vw,2.8rem)] font-light leading-[1.1] tracking-[-0.01em] text-ink">
            {autor.nombre}
          </h1>
          <p className="mt-1 text-[0.95rem] font-medium text-muted">{autor.rol}</p>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-ink-soft">{autor.bio}</p>
        </header>

        <h2 className="mt-12 mb-6 font-sans text-[1.4rem] font-medium text-ink">
          Artículos de {autor.nombre}
        </h2>
        {posts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        ) : (
          <p className="py-8 text-muted">Aún no hay artículos publicados.</p>
        )}
      </div>
    </>
  );
}
