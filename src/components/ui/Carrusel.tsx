"use client";

import { useEffect, useRef } from "react";
import { MediaSurface } from "@/components/ui/MediaSurface";
import { useBooking } from "@/components/booking/BookingProvider";
import type { ServiceOption } from "@/data/booking";

export type CarruselItem = {
  id: string;
  label: string;
  description: string;
  slug: string;
  image?: string;
};

type Props = {
  head: { titleTop: string; titleAccent: string; body: string };
  items: CarruselItem[];
  service: ServiceOption;
  /** eyebrow del label + id de ancla de la sección */
  eyebrow: string;
  id: string;
};

// Carrusel horizontal de servicios: tarjetas con el mismo formato visual que las
// cards de servicios del Home. Auto-desplazamiento lento y continuo (derecha→
// izquierda) vía scroll, y ARRASTRE con el mouse además del swipe táctil. Se pausa
// al hover; loop sin costura duplicando las tarjetas. Cada tarjeta abre el modal.
export function Carrusel({ head, items, service, eyebrow, id }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();
  const book = () => openBooking({ service });

  const loop = [...items, ...items];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SPEED = 0.4;

    let raf = 0;
    let paused = false;
    let dragging = false;
    let moved = false;
    let startX = 0;
    let startScroll = 0;

    const half = () => el.scrollWidth / 2;
    const wrap = () => {
      const h = half();
      if (h <= 0) return;
      if (el.scrollLeft >= h) el.scrollLeft -= h;
      else if (el.scrollLeft < 0) el.scrollLeft += h;
    };

    const tick = () => {
      if (!paused && !dragging && !reduce) {
        el.scrollLeft += SPEED;
        wrap();
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onEnter = () => (paused = true);
    const onLeave = () => (paused = false);

    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      dragging = true;
      moved = false;
      startX = e.clientX;
      startScroll = el.scrollLeft;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 3) moved = true;
      el.scrollLeft = startScroll - dx;
      wrap();
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      el.releasePointerCapture?.(e.pointerId);
      el.style.cursor = "";
    };
    const onClick = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("click", onClick, true);

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("click", onClick, true);
    };
  }, []);

  return (
    <section id={id} className="scroll-mt-[96px] bg-bg py-[clamp(40px,5vw,64px)]">
      <div className="container-x mb-8 max-w-[680px] text-center">
        <h2 className="mx-auto font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.14] tracking-[-0.01em] text-ink">
          {head.titleTop} <span className="font-accent text-brand">{head.titleAccent}</span>
        </h2>
        <p className="mt-4 text-muted">{head.body}</p>
      </div>

      <div
        ref={trackRef}
        className="flex cursor-grab select-none overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {loop.map((it, i) => (
          <Card key={`${it.id}-${i}`} item={it} eyebrow={eyebrow} onBook={book} aria={i < items.length} />
        ))}
      </div>
    </section>
  );
}

function Card({
  item,
  eyebrow,
  onBook,
  aria,
}: {
  item: CarruselItem;
  eyebrow: string;
  onBook: () => void;
  aria: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onBook}
      data-slug={item.slug}
      aria-hidden={aria ? undefined : true}
      tabIndex={aria ? undefined : -1}
      aria-label={aria ? `Agendar: ${item.label}` : undefined}
      className="group mr-5 block w-[290px] shrink-0 text-left"
      style={{ touchAction: "pan-y" }}
      draggable={false}
    >
      <MediaSurface
        as="image"
        src={item.image}
        overlay="none"
        className="relative flex min-h-[400px] flex-col justify-end overflow-hidden rounded-card p-5 shadow-card"
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-white via-white/70 to-transparent"
        />
        <span
          aria-hidden
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-ink shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
        >
          ↗
        </span>
        <div className="relative text-ink">
          <span className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-ink/60">
            {eyebrow}
          </span>
          <h3 className="mt-1 font-accent text-[1.7rem] leading-[1.1]">{item.label}</h3>
        </div>
      </MediaSurface>
    </button>
  );
}
