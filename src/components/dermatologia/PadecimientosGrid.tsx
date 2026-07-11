"use client";

import type { CSSProperties } from "react";
import { MediaSurface } from "@/components/ui/MediaSurface";
import { CarruselTrack, type CarruselItem } from "@/components/ui/Carrusel";
import { useBooking } from "@/components/booking/BookingProvider";
import { padecimientos, bentoLayout, type BentoPos } from "@/data/padecimientos";

// Todos los tratamientos (piezas kind:"treatment" del bento) → items del carrusel móvil.
const carruselItems: CarruselItem[] = bentoLayout
  .filter((piece) => piece.kind === "treatment")
  .map((piece) => ({
    id: piece.slug ?? piece.id,
    slug: piece.slug ?? piece.id,
    label: piece.label ?? "",
    description: piece.description ?? "",
    image: piece.image,
  }));

// ────────────────────────────────────────────────────────────────────────────
// BENTO — composición manual (posiciones EXACTAS por style inline).
// Grid 12 col × 10 fil (ver .bento-grid en globals.css). Cada pieza se coloca con
// gridColumn/gridRow concretos. El tamaño del título escala según el ÁREA de la
// pieza (grande/media/chica). Tres tipos: treatment · cta (índigo) · decor.
// ────────────────────────────────────────────────────────────────────────────

type Size = "grande" | "media" | "chica";

// Área = columnas × filas que ocupa la pieza. De ahí sale la escala de texto.
function sizeOf(col: string, row: string): Size {
  const [c1, c2] = col.split("/").map((s) => parseInt(s, 10));
  const [r1, r2] = row.split("/").map((s) => parseInt(s, 10));
  const area = (c2 - c1) * (r2 - r1);
  return area >= 9 ? "grande" : area >= 5 ? "media" : "chica";
}

// Título del tratamiento. En móvil queda en el tamaño "encogido" (estado estable
// con descripción visible). En desktop: grande por defecto y encoge al hover, para
// cederle protagonismo a la descripción. Las 3 variantes van LITERALES por tamaño
// (Tailwind debe verlas completas para generarlas: base · lg · lg:group-hover).
const titleClasses: Record<Size, string> = {
  grande:
    "text-[clamp(1.3rem,1.7vw,1.7rem)] lg:text-[clamp(1.6rem,2vw,2.2rem)] lg:group-hover:text-[clamp(1.3rem,1.7vw,1.7rem)]",
  media:
    "text-[clamp(1.1rem,1.35vw,1.3rem)] lg:text-[clamp(1.25rem,1.6vw,1.6rem)] lg:group-hover:text-[clamp(1.1rem,1.35vw,1.3rem)]",
  chica:
    "text-[clamp(1.05rem,1.2vw,1.2rem)] lg:text-[clamp(1.15rem,1.4vw,1.4rem)] lg:group-hover:text-[clamp(1.05rem,1.2vw,1.2rem)]",
};

// Tamaño de la descripción según la escala de la pieza (completa, sin truncar).
const descSize: Record<Size, string> = {
  grande: "text-[0.98rem]",
  media: "text-[0.88rem]",
  chica: "text-[0.84rem]",
};

// Piezas cuyo título se parte en 2 líneas con salto FIJO (por slug). El <br>
// mantiene la misma partición en normal y hover: solo cambia el tamaño, no el
// reacomodo del texto.
const forcedBreaks: Record<string, [string, string]> = {
  "ojeras-y-bolsas": ["Ojeras", "y bolsas"],
  "eliminacion-de-verrugas": ["Eliminación", "de verrugas"],
};

// Alturas mínimas en móvil (apilado); en desktop manda la fila del grid (lg:min-h-0).
const mobileMinH: Record<Size, string> = {
  grande: "min-h-[150px]",
  media: "min-h-[120px]",
  chica: "min-h-[104px]",
};

export function PadecimientosGrid() {
  const p = padecimientos;
  const { openBooking } = useBooking();
  // El servicio (Dermatología) lo infiere la ruta. Las piezas de tratamiento pasan su
  // nombre como `treatment`; el CTA del bento abre genérico (sin tratamiento).
  const book = (treatment?: string) => openBooking(treatment ? { treatment } : undefined);

  return (
    <section id="tratamientos" className="md:scroll-mt-[96px] bg-bg px-4 py-[clamp(40px,5vw,64px)] md:px-8">
      <div className="mx-auto mb-8 max-w-[680px] text-center">
        <h2 className="font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.14] tracking-[-0.01em] text-ink">
          {p.titleTop} <span className="font-accent text-brand">{p.titleAccent}</span>
        </h2>
        <p className="mt-4 text-muted">{p.body}</p>
      </div>

      {/* MÓVIL: carrusel con TODOS los tratamientos (mismo riel que Medicina Estética),
          full-bleed (-mx-4 contrarresta el px-4 de la sección). */}
      <div className="-mx-4 md:hidden">
        <CarruselTrack items={carruselItems} service="Dermatología" />
      </div>

      {/* DESKTOP: bento grid — igual que hoy (max-md:hidden solo oculta <768). */}
      <div className="bento-grid max-md:hidden">
        {bentoLayout.map((piece) => (
          <Piece key={piece.id} piece={piece} onBook={book} />
        ))}
      </div>
    </section>
  );
}

function Piece({ piece, onBook }: { piece: BentoPos; onBook: (treatment?: string) => void }) {
  // Posición EXACTA: valores concretos inline (no dependen del compilador).
  const style = { gridColumn: piece.col, gridRow: piece.row } as CSSProperties;

  // ── CTA especial — índigo pleno (#3336B8), sin imagen. Resalta del resto. ──
  if (piece.kind === "cta") {
    return (
      <div style={style}>
        <button
          type="button"
          onClick={() => onBook()}
          className={`group flex h-full w-full flex-col items-center justify-center gap-3 rounded-card bg-brand p-5 text-center shadow-card md:p-6 ${mobileMinH.grande} lg:min-h-0`}
        >
          <h3 className="font-accent text-[clamp(1.3rem,1.9vw,1.95rem)] italic leading-[1.14] text-white">
            {piece.label}
          </h3>
          <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-[0.82rem] font-semibold text-brand">
            Agenda ahora
            <span aria-hidden className="transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </span>
        </button>
      </div>
    );
  }

  // ── Decorativa — solo imagen + overlay (sin texto, sin CTA, sin hover). ──
  if (piece.kind === "decor") {
    return (
      <div style={style}>
        <MediaSurface
          as="image"
          src={piece.image}
          overlay="ink"
          className={`h-full rounded-card shadow-card ${mobileMinH.chica} lg:min-h-0`}
        />
      </div>
    );
  }

  // ── Tratamiento — imagen + overlay + nombre serif escalado + hover. ──
  const size = sizeOf(piece.col, piece.row);
  return (
    <div style={style}>
      <MediaSurface
        as="image"
        src={piece.image}
        overlay="ink"
        className={`group relative flex h-full flex-col justify-center rounded-card p-4 shadow-card md:p-5 ${mobileMinH[size]} lg:min-h-0`}
      >
        {/* Clic principal (toda la tarjeta). Hoy abre el modal; a futuro será
            <Link href={`/dermatologia/${piece.slug}/`}> a su página. */}
        <button
          type="button"
          onClick={() => onBook(piece.label)}
          data-slug={piece.slug}
          aria-label={`Agendar: ${piece.label}`}
          className="absolute inset-0 z-[1] rounded-card"
        />

        {/* Flecha circular (arriba-derecha) — mismo patrón que las cards del Home.
            Decorativa: aparece SOLO en hover (desktop) y queda siempre visible en
            móvil; el clic lo maneja la capa principal (abre el modal). */}
        <span
          aria-hidden
          className="pointer-events-none absolute right-3 top-3 z-[2] flex h-8 w-8 items-center justify-center rounded-full bg-white text-[0.95rem] leading-none text-ink shadow-sm transition-[opacity,transform] duration-300 ease-out opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none lg:opacity-0 lg:group-hover:opacity-100"
        >
          ↗
        </span>

        {/* Contenido: título (encoge al hover) + descripción (aparece/crece al hover;
            siempre visible en móvil). pointer-events-none → el clic pasa a la capa. */}
        <div className="pointer-events-none relative z-[2] flex flex-col">
          <span
            className={`font-accent italic leading-[1.12] text-white transition-[font-size] duration-300 ease-out motion-reduce:transition-none ${titleClasses[size]}`}
          >
            {piece.slug && forcedBreaks[piece.slug] ? (
              <>
                {forcedBreaks[piece.slug][0]}
                <br />
                {forcedBreaks[piece.slug][1]}
              </>
            ) : (
              piece.label
            )}
          </span>

          {/* Descripción colapsable (grid-rows 0fr→1fr). En reposo ocupa 0 de alto,
              así el título queda centrado; al hover se expande y empuja el título
              hacia arriba, dejando el hueco para el texto. En móvil siempre visible. */}
          <div className="grid grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none lg:grid-rows-[0fr] lg:group-hover:grid-rows-[1fr]">
            <div className="overflow-hidden">
              <p
                className={`pt-1.5 font-medium leading-snug text-white opacity-100 transition-opacity duration-300 ease-out motion-reduce:transition-none lg:opacity-0 lg:group-hover:opacity-100 ${descSize[size]}`}
              >
                {piece.description}
              </p>
            </div>
          </div>
        </div>
      </MediaSurface>
    </div>
  );
}
