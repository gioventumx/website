"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { MediaSurface } from "@/components/ui/MediaSurface";
import { BookingButton } from "@/components/booking/BookingButton";
import { tecnologia, type TechCard, type TechSize } from "@/data/tecnologia";

const HEIGHT: Record<TechSize, string> = {
  tall: "min-h-[320px]",
  mid: "min-h-[240px]",
  short: "min-h-[190px]",
};

export function TechShowcase() {
  const t = tecnologia;
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
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const renderCard = (card: TechCard) => {
    const i = t.cards.findIndex((c) => c.slug === card.slug);
    return (
      <div
        key={card.slug}
        className={[
          "transition-[opacity,transform] duration-700 ease-out motion-reduce:transition-none",
          visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
        ].join(" ")}
        style={{ transitionDelay: visible ? `${i * 120}ms` : "0ms" } as CSSProperties}
      >
        <MediaSurface
          as="image"
          src={card.image}
          overlay="ink"
          label={card.image ? undefined : "imagen"}
          className={`flex ${HEIGHT[card.size]} items-end rounded-card p-[18px] shadow-card`}
        >
          <span className="glass-dark rounded-full px-4 py-2 text-sm font-semibold text-white">
            {card.name}
          </span>
        </MediaSurface>
      </div>
    );
  };

  return (
    <section ref={sectionRef} id="tecnologia" className="bg-bg px-4 py-[clamp(48px,7vw,90px)] md:px-6">
      {/* Tarjeta blanca grande que flota sobre el fondo claro de la sección */}
      <div className="rounded-block bg-white p-[clamp(1.75rem,5vw,4.5rem)] shadow-card">
        <div className="grid items-center gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          {/* IZQUIERDA — texto */}
        <div>
          <span className="eyebrow">{t.eyebrow}</span>
          <h2 className="mt-3.5 font-sans text-[clamp(2rem,4vw,3rem)] font-light leading-[1.1] tracking-[-0.01em] text-ink">
            {t.titleTop}
            <span className="font-accent block text-brand">{t.titleAccent}</span>
          </h2>
          <p className="mb-7 mt-5 max-w-[420px] text-[1.02rem] leading-relaxed text-muted">
            {t.body}
          </p>
          <BookingButton variant="primary">{t.cta}</BookingButton>
        </div>

        {/* DERECHA — mosaico escalonado de 4 tarjetas.
            Móvil: 1 columna. Tablet+: 2 columnas. Desktop: la 2ª baja con offset. */}
        <div className="grid grid-cols-1 items-start gap-5 sm:grid-cols-2">
          <div className="grid gap-5">
            {[t.cards[0], t.cards[1]].map(renderCard)}
          </div>
          <div className="grid gap-5 lg:mt-[52px]">
            {[t.cards[2], t.cards[3]].map(renderCard)}
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
