"use client";

import Link from "next/link";
import { useState } from "react";

export type CrossSellVertical = { label: string; href: string; image: string };

// Sección de cross-sell: mismo peso visual que el ClosingCTA (bloque grande con
// imagen de fondo + overlay plano), pero ofrece OTRAS verticales en vez de agendar.
// Al hacer hover/focus sobre cada botón, la imagen de fondo cambia (crossfade) a la
// de esa vertical. Reposo / touch: imagen neutra por defecto. Reutilizable por props.
type Props = {
  title: string;
  body: string;
  verticals: CrossSellVertical[];
  /** Imagen neutra por defecto (reposo / touch). Si no, usa la primera vertical. */
  defaultImage?: string;
};

export function CrossSell({ title, body, verticals, defaultImage }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const base = defaultImage ?? verticals[0]?.image;

  return (
    <section className="px-4 pb-4 md:px-6 md:pb-6">
      <div className="relative isolate overflow-hidden rounded-block bg-brand-deep text-center">
        {/* Capa base (reposo / touch) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={base}
          alt=""
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* Capas por vertical: crossfade al hover/focus del botón correspondiente */}
        {verticals.map((v, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={v.href}
            src={v.image}
            alt=""
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-out motion-reduce:transition-none ${
              active === i ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
        {/* Overlay plano (sin gradiente) */}
        <div aria-hidden className="absolute inset-0 bg-black/50" />

        {/* Contenido */}
        <div className="relative z-10 container-x max-w-[620px] py-[clamp(44px,6vw,72px)]">
          <h2 className="font-sans text-[clamp(1.8rem,3.4vw,2.4rem)] font-light leading-[1.18] text-white">
            {title}
          </h2>
          <p className="mx-auto mb-7 mt-[18px] max-w-[460px] text-brand-tint">{body}</p>
          <div className="flex flex-wrap justify-center gap-3.5">
            {verticals.map((v, i) => (
              <Link
                key={v.href}
                href={v.href}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className="btn btn-light"
              >
                {v.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
