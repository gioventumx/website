"use client";

import { useState } from "react";
import { ReviewCard } from "@/components/home/ReviewCard";
import { CasoExitoCard } from "@/components/estetica/CasoExitoCard";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import { GoogleRatingScore } from "@/components/ui/GoogleRating";
import { testimoniosEstetica } from "@/data/testimonios-estetica";
import { casosExitoEstetica } from "@/data/casos-exito-estetica";
import { home } from "@/data/home";
import type { Review, CasoExito } from "@/data/types";

type GridItem = { kind: "review"; data: Review } | { kind: "caso"; data: CasoExito };

// El masonry es CSS columns (`columns-*`): el navegador reparte los items por
// altura acumulada, no por índice — no hay fórmula que prediga en qué columna
// cae cada uno sin medir el render real. Estos índices se ajustaron a mano
// contra el layout actual (7 reseñas) para que los 2 casos queden arriba y en
// columnas distintas sin scroll; si cambia el largo de las reseñas o el número
// de casos, hay que volver a medir (ver measure.mjs usado para calibrar esto).
const CASO_INSERT_POSITIONS = [0, 3];

function buildGrid(reviews: Review[], casos: CasoExito[]): GridItem[] {
  const items: GridItem[] = reviews.map((data) => ({ kind: "review", data }));
  casos.forEach((data, i) => {
    const pos = Math.min(CASO_INSERT_POSITIONS[i] ?? items.length, items.length);
    items.splice(pos, 0, { kind: "caso", data });
  });
  return items;
}

// Mismo masonry y encabezado (score Google) que Dermatología, con las reseñas propias
// de Medicina Estética, intercaladas con casos de éxito (antes/después) cuando existan.
export function Testimonios() {
  const t = home.testimonials;
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null);

  const items = buildGrid(testimoniosEstetica.reviews, casosExitoEstetica);

  return (
    <section id="testimonios" className="md:scroll-mt-[96px] bg-bg pb-[clamp(30px,4vw,48px)] pt-[clamp(12px,2vw,28px)]">
      <div className="container-x">
        <div className="mx-auto mb-10 max-w-[640px] text-center md:mb-12">
          <span className="eyebrow">{t.eyebrow}</span>

          <GoogleRatingScore />

          <h2 className="mt-5 font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.14] tracking-[-0.01em]">
            {t.titleTop} <span className="font-accent text-brand">{t.titleAccent}</span>
          </h2>
          <p className="mt-4 text-[1.02rem] text-muted">{t.body}</p>
        </div>

        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3">
          {items.map((item) =>
            item.kind === "review" ? (
              <ReviewCard key={item.data.author} review={item.data} />
            ) : (
              <CasoExitoCard
                key={item.data.paciente}
                caso={item.data}
                onOpen={(src, alt) => setLightbox({ src, alt })}
              />
            )
          )}
        </div>
      </div>

      <ImageLightbox
        src={lightbox?.src ?? null}
        alt={lightbox?.alt ?? ""}
        onClose={() => setLightbox(null)}
      />
    </section>
  );
}
