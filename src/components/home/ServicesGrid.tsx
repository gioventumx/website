"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ServiceCard } from "./ServiceCard";
import { services } from "@/data/services";
import { home } from "@/data/home";

export function ServicesGrid() {
  const s = home.services;
  const sectionRef = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  // Animación de entrada (fade + subida con stagger) al llegar a la sección.
  // Se dispara una sola vez; con reduced-motion aparecen directamente.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="servicios" className="px-6 py-12 md:px-10 md:py-16">
      {/* Encabezado: título a la izquierda, apoyo a la derecha */}
      <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.14] tracking-[-0.01em] text-ink">
            {s.titleTop}
            <span className="font-accent block text-brand">{s.titleAccent}</span>
          </h2>
        </div>
        <p className="max-w-[360px] text-[0.95rem] leading-relaxed text-muted md:text-right">
          {s.body}
        </p>
      </div>

      {/* Grid fija: 1 columna en móvil, 2 en tablet, 4 en desktop */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => (
          <div
            key={service.slug}
            className={[
              "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            ].join(" ")}
            style={{ transitionDelay: visible ? `${i * 120}ms` : "0ms" } as CSSProperties}
          >
            <ServiceCard service={service} />
          </div>
        ))}
      </div>
    </section>
  );
}
