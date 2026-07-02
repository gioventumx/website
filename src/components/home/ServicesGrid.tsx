"use client";

import { useEffect, useRef } from "react";
import { ServiceCard } from "./ServiceCard";
import { services } from "@/data/services";
import { home } from "@/data/home";

const SPEED = 0.5; // px por frame (~30px/s): marquee lento y elegante
const BOOST_SPEED = 4; // empujón notorio al entrar en pantalla
const BOOST_MS = 1100; // duración del empujón inicial

export function ServicesGrid() {
  const s = home.services;
  const sectionRef = useRef<HTMLElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const paused = useRef(false); // hover / touch activo
  const manualUntil = useRef(0); // pausa breve tras usar las flechas
  const boostUntil = useRef(0); // ventana del empujón inicial
  const boosted = useRef(false); // el empujón solo ocurre una vez

  // Auto-desplazamiento continuo con loop imperceptible (tarjetas duplicadas).
  // Movimiento autónomo por tiempo (rAF), NO ligado al scroll de la página.
  useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const step = () => {
      if (!paused.current && Date.now() >= manualUntil.current) {
        const speed = Date.now() < boostUntil.current ? BOOST_SPEED : SPEED;
        el.scrollLeft += speed;
        // el primer clon marca la distancia exacta de un set → reset sin salto
        const firstClone = el.children[services.length] as HTMLElement | undefined;
        const resetPoint = firstClone ? firstClone.offsetLeft : el.scrollWidth / 2;
        if (el.scrollLeft >= resetPoint) el.scrollLeft -= resetPoint;
      }
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  // Empujón inicial la primera vez que la sección entra en el viewport
  useEffect(() => {
    const target = sectionRef.current;
    if (!target) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !boosted.current) {
            boosted.current = true;
            boostUntil.current = Date.now() + BOOST_MS;
            io.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );
    io.observe(target);
    return () => io.disconnect();
  }, []);

  const scroll = (dir: 1 | -1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
    manualUntil.current = Date.now() + 1500; // respeta la navegación manual
  };

  return (
    <section ref={sectionRef} id="servicios" className="px-4 py-12 md:px-6 md:py-16">
      <div className="rounded-block bg-brand-deep p-6 text-white md:p-12">
        {/* Encabezado: título a la izquierda, apoyo a la derecha */}
        <div className="mb-8 flex flex-col gap-4 md:mb-10 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.14] tracking-[-0.01em]">
              {s.titleTop}
              <span className="font-accent block text-brand-tint">{s.titleAccent}</span>
            </h2>
          </div>
          <p className="max-w-[360px] text-[0.95rem] leading-relaxed text-white/70 md:text-right">
            {s.body}
          </p>
        </div>

        {/* Carrusel horizontal con scroll-snap + auto-desplazamiento.
            Se duplican las tarjetas para el loop; los clones van aria-hidden. */}
        <div
          ref={scroller}
          data-lenis-prevent
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
          onTouchStart={() => (paused.current = true)}
          onTouchEnd={() => {
            paused.current = false;
            manualUntil.current = Date.now() + 800;
          }}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth -my-8 py-8 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {services.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
          {services.map((service) => (
            <ServiceCard key={`clone-${service.slug}`} service={service} clone />
          ))}
        </div>

        {/* Controles: flechas circulares, centradas y accesibles por teclado */}
        <div className="mt-8 flex justify-center gap-3">
          <button
            type="button"
            aria-label="Ver servicios anteriores"
            onClick={() => scroll(-1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white hover:text-ink focus-visible:bg-white focus-visible:text-ink"
          >
            ←
          </button>
          <button
            type="button"
            aria-label="Ver más servicios"
            onClick={() => scroll(1)}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white transition-colors hover:bg-white hover:text-ink focus-visible:bg-white focus-visible:text-ink"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
