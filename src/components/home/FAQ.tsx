"use client";

import { useState } from "react";
import { MediaSurface } from "@/components/ui/MediaSurface";
import { faq as homeFaq, type FaqItem } from "@/data/faq";

type Props = {
  /** Preguntas a mostrar. Por defecto usa el FAQ del Home. */
  items?: FaqItem[];
  eyebrow?: string;
  titleTop?: string;
  titleAccent?: string;
  imageLabel?: string;
};

export function FAQ({
  items = homeFaq,
  eyebrow = "Preguntas frecuentes",
  titleTop = "Resolvemos",
  titleAccent = "tus dudas",
  imageLabel = "imagen — clínica / equipo",
}: Props = {}) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-bg px-4 py-12 md:px-6 md:py-16">
      <div className="container-x grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-20">
        {/* IZQUIERDA — texto arriba, imagen abajo (pegada al borde inferior) */}
        <div className="flex flex-col">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-3 font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.14] tracking-[-0.01em] text-ink">
            {titleTop} <span className="font-accent text-brand">{titleAccent}</span>
          </h2>
          <MediaSurface
            as="image"
            label={imageLabel}
            className="mt-10 aspect-[4/3] rounded-card md:mt-auto"
          />
        </div>

        {/* Acordeón accesible (esquema claro) */}
        <div className="self-start rounded-block bg-white p-6 shadow-card md:p-8 [&>div:last-child]:border-b-0">
          {items.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={i} className="border-b border-line">
                <h3>
                  <button
                    type="button"
                    id={`faq-header-${i}`}
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    onClick={() => setOpenIndex(isOpen ? -1 : i)}
                    className="flex w-full items-center justify-between gap-6 py-5 text-left text-[1.05rem] font-medium text-ink transition-colors hover:text-brand"
                  >
                    <span>{item.q}</span>
                    <span
                      aria-hidden
                      className={`shrink-0 text-2xl font-light leading-none text-brand transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>
                </h3>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-header-${i}`}
                  hidden={!isOpen}
                  className="pb-5 pr-8 text-[0.92rem] leading-relaxed text-muted"
                >
                  {item.a}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
