"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { depilacion } from "@/data/depilacion";

// 4 tarjetas claras con entrada al scroll (fade + subida, stagger). Mismo patrón
// de IntersectionObserver que PadecimientosGrid; respeta reduced-motion.
export function FeaturesGrid() {
  const items = depilacion.features;
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
              {/* Placeholder de icono (TODO: icono real por feature) */}
              <span className="mb-4 block h-10 w-10 rounded-[11px] bg-brand-tint" aria-hidden />
              <h3 className="text-[1.05rem] font-semibold text-ink">{item.title}</h3>
              <p className="mt-2 text-[0.9rem] leading-relaxed text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
