"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { MediaSurface } from "@/components/ui/MediaSurface";
import { estetica } from "@/data/estetica";

// Sección de 4 tarjetas de beneficios: imagen arriba + título + texto. Tarjetas claras
// con borde; entrada al scroll (fade + subida, stagger). Va entre la intro y los
// servicios. Mismo IntersectionObserver que el resto; respeta reduced-motion.
export function BeneficiosGrid() {
  const b = estetica.beneficios;
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

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
    <section ref={sectionRef} className="bg-bg px-6 py-[clamp(60px,8vw,100px)] md:px-10">
      <div className="container-x">
        <div className="mx-auto mb-11 max-w-[720px] text-center">
          <span className="eyebrow">{b.eyebrow}</span>
          <h2 className="mt-3 font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.14] tracking-[-0.01em] text-ink">
            {b.titleTop} <span className="font-accent text-brand">{b.titleAccent}</span>
          </h2>
        </div>

        {/* beneficios 4 → 2 → 1 */}
        <div className="grid grid-cols-1 gap-6 min-[560px]:grid-cols-2 lg:grid-cols-4">
          {b.items.map((item, i) => (
            <article
              key={item.slug}
              className={[
                "flex flex-col overflow-hidden rounded-card border border-line bg-white transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              ].join(" ")}
              style={{ transitionDelay: visible ? `${i * 80}ms` : "0ms" } as CSSProperties}
            >
              {/* Imagen arriba (placeholder mientras no haya asset real) */}
              <MediaSurface
                as="image"
                src={item.image}
                overlay="none"
                label={item.image ? undefined : "imagen"}
                className="aspect-[4/3] w-full"
              />
              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-[1.05rem] font-semibold leading-snug text-ink">{item.title}</h3>
                <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{item.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
