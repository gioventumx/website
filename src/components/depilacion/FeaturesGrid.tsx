"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { depilacion, type BenefitIcon } from "@/data/depilacion";

// Íconos de las tarjetas de beneficios. Mismo estilo que HeroFeatures del sitio:
// viewBox 24, fill none, stroke currentColor, strokeWidth 1.5 (se hereda del <svg>).
const icons: Record<BenefitIcon, ReactNode> = {
  // Escudo médico con check (eficacia de grado médico).
  shield: (
    <>
      <path d="M12 3l7 3v5c0 4.4-3 7.6-7 9-4-1.4-7-4.6-7-9V6l7-3z" />
      <path d="M9 12l2 2 4-4" />
    </>
  ),
  // Gota (piel libre de irritación).
  droplet: <path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z" />,
  // Diana/objetivo (resultados definitivos).
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.5" />
    </>
  ),
  // Rostro tranquilo (experiencia sin dolor).
  smile: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M8.5 14c.9 1.1 2.1 1.7 3.5 1.7s2.6-.6 3.5-1.7" />
      <path d="M9 9.5h.01M15 9.5h.01" />
    </>
  ),
};

// 4 tarjetas claras con entrada al scroll (fade + subida, stagger). Mismo patrón
// de IntersectionObserver que PadecimientosGrid; respeta reduced-motion.
export function FeaturesGrid() {
  const items = depilacion.features;
  const head = depilacion.featuresHead;
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
        {/* Encabezado de sección (titulada, como las demás): así deja de leerse como
            un apéndice del hero y pasa a ser la sección "Beneficios". */}
        <div className="mx-auto mb-11 max-w-[720px] text-center">
          <span className="eyebrow">{head.eyebrow}</span>
          <h2 className="mt-3 font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.14] tracking-[-0.01em] text-ink">
            {head.titleTop} <span className="font-accent text-brand">{head.titleAccent}</span>
          </h2>
        </div>

        {/* features 4 → 2 → 1 */}
        <div className="grid grid-cols-1 gap-[22px] min-[560px]:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <div
              key={item.title}
              className={[
                "rounded-card border border-line bg-white p-[26px] transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              ].join(" ")}
              style={{ transitionDelay: visible ? `${i * 80}ms` : "0ms" } as CSSProperties}
            >
              {/* Ícono real por feature (badge de marca + ícono stroke, estilo del sitio). */}
              <span
                aria-hidden
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-[11px] bg-brand-tint text-brand"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  {icons[item.icon]}
                </svg>
              </span>
              <h3 className="text-[1.05rem] font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
