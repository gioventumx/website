"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { MediaSurface } from "@/components/ui/MediaSurface";
import { Button } from "@/components/ui/Button";
import {
  blogMeta,
  departamentoNombre,
  getAllPostsSorted,
  postsByDepartamento,
} from "@/data/blog";

// Sección de blog reutilizable. Sin props = últimos 3 de todo el blog (Home).
// Con `departamento` filtra a ese departamento; `ctaHref` cambia el destino del botón.
type Props = { departamento?: string; ctaHref?: string };

export function Blog({ departamento, ctaHref = "/blog/" }: Props = {}) {
  const b = blogMeta;
  // Últimos 3 artículos (selectores puros, sin fs → seguros en cliente).
  const posts = (departamento ? postsByDepartamento(departamento) : getAllPostsSorted()).slice(0, 3);
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // Entrada al hacer scroll (una sola vez); con reduced-motion aparece directo.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="blog" className="bg-bg px-6 pb-[clamp(64px,9vw,110px)] pt-[clamp(32px,4.5vw,55px)] md:px-10">
      <div className="container-x">
        {/* Encabezado: título + apoyo a la izquierda; botón "Ver blog" arriba a la derecha */}
        <div className="mb-10 flex flex-col gap-6 md:mb-12 md:flex-row md:items-end md:justify-between md:gap-10">
          <div className="max-w-[560px]">
            <span className="eyebrow">{b.eyebrow}</span>
            <h2 className="mt-3 font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.12] tracking-[-0.01em] text-ink">
              {b.titleTop} <span className="font-accent text-brand">{b.titleAccent}</span>
            </h2>
            <p className="mt-4 max-w-[480px] text-[0.95rem] leading-relaxed text-muted">
              {b.body}
            </p>
          </div>
          <Button variant="outline" href={ctaHref} className="shrink-0">
            {b.cta}
          </Button>
        </div>

        {/* Tarjetas: 1 col móvil, 2 tablet, 3 desktop */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <div
              key={post.slug}
              className={[
                "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              ].join(" ")}
              style={{ transitionDelay: visible ? `${i * 120}ms` : "0ms" } as CSSProperties}
            >
              <Link href={`/blog/${post.slug}/`} className="group block h-full">
                <article className="flex h-full flex-col overflow-hidden rounded-card bg-white shadow-card transition-[transform,box-shadow] duration-500 ease-out group-hover:-translate-y-1.5 group-hover:shadow-xl motion-reduce:transition-none motion-reduce:group-hover:translate-y-0">
                  {/* Portada (placeholder mientras no haya imagen) */}
                  <MediaSurface
                    as="image"
                    src={post.imagen}
                    overlay="none"
                    label={post.imagen ? undefined : "imagen"}
                    className="aspect-[16/10] w-full"
                  />

                  <div className="flex flex-1 flex-col p-5">
                    <span className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-brand">
                      {departamentoNombre(post.departamento)}
                    </span>
                    <h3 className="mt-2 font-sans text-[1.15rem] font-medium leading-snug text-ink">
                      {post.titulo}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[0.9rem] leading-relaxed text-muted">
                      {post.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-brand">
                      Leer más
                      <span className="transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none">
                        →
                      </span>
                    </span>
                  </div>
                </article>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
