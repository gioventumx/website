"use client";

import { useEffect, useRef } from "react";
import { MediaSurface } from "@/components/ui/MediaSurface";
import { useBooking } from "@/components/booking/BookingProvider";
import { faciales, type FacialPieza } from "@/data/faciales";

// Carrusel de faciales: tarjetas con el mismo formato visual que las cards de
// servicios del Home. Auto-desplazamiento lento y continuo (derecha→izquierda) vía
// scroll, y ARRASTRE con el mouse (drag) además del swipe táctil nativo. Se pausa al
// hover y mientras arrastras. Loop sin costura duplicando las tarjetas.
export function FacialesCarrusel() {
  const p = faciales;
  const trackRef = useRef<HTMLDivElement>(null);
  const { openBooking } = useBooking();
  const book = () => openBooking({ service: "Wellness Spa" });

  const loop = [...p.bento, ...p.bento];

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SPEED = 0.4; // px por frame ≈ 24px/s (lento)

    let raf = 0;
    let paused = false; // hover
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

    // Drag SOLO con mouse; en touch se usa el swipe nativo del scroll.
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
    // Si hubo arrastre, cancela el click (para no abrir el modal sin querer).
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
    <section id="faciales" className="scroll-mt-[96px] bg-bg py-[clamp(40px,5vw,64px)]">
      <div className="container-x mb-8 max-w-[680px] text-center">
        <h2 className="mx-auto font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.14] tracking-[-0.01em] text-ink">
          {p.bentoHead.titleTop} <span className="font-accent text-brand">{p.bentoHead.titleAccent}</span>
        </h2>
        <p className="mt-4 text-muted">{p.bentoHead.body}</p>
      </div>

      {/* Track scrolleable (auto + drag). Sin data-lenis-prevent: el wheel vertical
          sigue moviendo la página; el arrastre horizontal se maneja con pointer. */}
      <div
        ref={trackRef}
        className="flex cursor-grab select-none overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {loop.map((f, i) => (
          <FacialCard key={`${f.id}-${i}`} facial={f} onBook={book} aria={i < p.bento.length} />
        ))}
      </div>
    </section>
  );
}

// Tarjeta con el mismo formato visual que ServiceCard del Home. Abre el modal.
function FacialCard({
  facial,
  onBook,
  aria,
}: {
  facial: FacialPieza;
  onBook: () => void;
  aria: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onBook}
      data-slug={facial.slug}
      aria-hidden={aria ? undefined : true}
      tabIndex={aria ? undefined : -1}
      aria-label={aria ? `Agendar: ${facial.label}` : undefined}
      className="group mr-5 block w-[290px] shrink-0 text-left"
      // Permite scroll vertical de la página en touch; el horizontal lo hace el track.
      style={{ touchAction: "pan-y" }}
      draggable={false}
    >
      <MediaSurface
        as="image"
        src={facial.image}
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
            Facial
          </span>
          <h3 className="mt-1 font-accent text-[1.7rem] leading-[1.1]">{facial.label}</h3>
        </div>
      </MediaSurface>
    </button>
  );
}
