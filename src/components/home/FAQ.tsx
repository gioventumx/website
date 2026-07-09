"use client";

import { useState } from "react";
import { faq as homeFaq, type FaqItem } from "@/data/faq";

type Props = {
  /** Preguntas a mostrar. Por defecto usa el FAQ del Home. */
  items?: FaqItem[];
  eyebrow?: string;
  titleTop?: string;
  titleAccent?: string;
  /** Imagen de la columna izquierda. Por defecto /faqs.webp. */
  image?: string;
  /** id para anclar la sección (ej. "preguntas" en verticales). */
  id?: string;
  /** Envuelve la sección en una tarjeta con borde remarcado (sin fondo). */
  bordered?: boolean;
};

export function FAQ({
  items = homeFaq,
  eyebrow = "Preguntas frecuentes",
  titleTop = "Resolvemos",
  titleAccent = "tus dudas",
  image = "/faqs.webp",
  id,
  bordered = true,
}: Props = {}) {
  const [openIndex, setOpenIndex] = useState(0);

  // JSON-LD FAQPage: SOLO preguntas con respuesta real (excluye TODO/vacías). Si no
  // hay ninguna respuesta real, no se emite schema (ej. faciales/masajes por ahora).
  const schemaItems = items.filter((it) => {
    const a = it.a.trim();
    return a.length > 0 && !a.startsWith("TODO");
  });
  const faqSchema =
    schemaItems.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: schemaItems.map((it) => ({
            "@type": "Question",
            name: it.q,
            acceptedAnswer: { "@type": "Answer", text: it.a },
          })),
        }
      : null;

  return (
    <section id={id} className={`bg-bg px-4 py-12 md:px-6 md:py-16 ${id ? "scroll-mt-[96px]" : ""}`}>
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <div
        className={`grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-20 ${
          bordered
            ? "rounded-block border-2 border-line p-6 md:p-10 lg:p-14"
            : "container-x"
        }`}
      >
        {/* IZQUIERDA — texto arriba, imagen abajo (pegada al borde inferior) */}
        <div className="flex flex-col">
          <span className="eyebrow">{eyebrow}</span>
          <h2 className="mt-3 font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.14] tracking-[-0.01em] text-ink">
            {titleTop} <span className="font-accent text-brand">{titleAccent}</span>
          </h2>
          {/* Imagen completa (sin recorte ni fondo), pegada al fondo de la columna */}
          {image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={image}
              alt=""
              loading="lazy"
              decoding="async"
              // En la tarjeta con borde, margen negativo que cancela el padding
              // inferior → la imagen queda pegada al borde inferior de la tarjeta.
              className={`mt-10 w-full max-w-[400px] self-start object-contain object-bottom md:mt-auto ${
                bordered ? "md:-mb-10 lg:-mb-14" : ""
              }`}
            />
          )}
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
