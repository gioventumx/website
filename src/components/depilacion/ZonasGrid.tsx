"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { MediaSurface } from "@/components/ui/MediaSurface";
import { BookingButton } from "@/components/booking/BookingButton";
import { useBooking } from "@/components/booking/BookingProvider";
import { depilacion } from "@/data/depilacion";

// Encabezado + 4 tarjetas oscuras (media+overlay) con título serif itálico y hover
// que levanta. Entrada al scroll con stagger; respeta reduced-motion.
export function ZonasGrid() {
  const z = depilacion.zonas;
  // El servicio (Depilación Láser) lo infiere la ruta; cada zona pasa su nombre.
  const { openBooking } = useBooking();
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
          <span className="eyebrow">{z.eyebrow}</span>
          <h2 className="mt-3 font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.14] tracking-[-0.01em] text-ink">
            {z.titleTop} <span className="font-accent text-brand">{z.titleAccent}</span>
          </h2>
          <p className="mx-auto mt-4 max-w-[620px] text-muted">{z.body}</p>
          <div className="mt-6 flex justify-center">
            <BookingButton variant="primary">{z.cta}</BookingButton>
          </div>
        </div>

        {/* zonas 4 → 2 → 1 */}
        <div className="grid grid-cols-1 gap-5 min-[560px]:grid-cols-2 lg:grid-cols-4">
          {z.items.map((zona, i) => (
            <div
              key={zona.slug}
              className={[
                "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
                visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
              ].join(" ")}
              style={{ transitionDelay: visible ? `${i * 80}ms` : "0ms" } as CSSProperties}
            >
              <button
                type="button"
                onClick={() => openBooking({ treatment: zona.title })}
                aria-label={`Agendar: ${zona.title}`}
                className="block w-full rounded-card text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
              >
                <MediaSurface
                  as="image"
                  src={zona.image}
                  overlay="ink"
                  label={zona.image ? undefined : "imagen"}
                  className="group flex min-h-[360px] flex-col justify-end rounded-card p-[22px] shadow-card transition-transform duration-300 ease-out hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <h3 className="font-accent text-[1.5rem] italic leading-tight text-white">
                    {zona.title}
                  </h3>
                  <span className="mt-1 block text-[0.9rem] font-semibold text-brand-tint">
                    {zona.lead}
                  </span>
                  <p className="mt-1.5 text-[0.85rem] leading-relaxed text-brand-tint">{zona.body}</p>
                </MediaSurface>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
