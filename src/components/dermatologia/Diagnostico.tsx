import { BookingButton } from "@/components/booking/BookingButton";
import type { Servicio } from "@/data/servicios";

type Props = { diagnostico: NonNullable<Servicio["diagnostico"]> };

// Diagnóstico — SOLO Dermatología. A propósito NO reusa ClosingCTA: ese componente
// es un banner corto (imagen a sangre + 1 línea + CTA), pensado para cerrar página.
// Este bloque va a media página y necesita explicar de verdad "cómo se ve, cuándo
// revisarse" — más texto del que cabe en un banner. Sin imagen a propósito (18
// páginas no escalan si cada una pide su propia foto de diagnóstico): una sola
// columna de texto ancha, fondo claro, para que tampoco se confunda con el cierre.
export function Diagnostico({ diagnostico }: Props) {
  return (
    <section className="bg-bg px-4 py-[clamp(48px,7vw,80px)] md:px-6">
      <div className="container-x mx-auto max-w-[640px] text-center">
        <span className="eyebrow">Diagnóstico</span>
        <h2 className="mt-3 font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.14] tracking-[-0.01em] text-ink">
          {diagnostico.titulo}
        </h2>
        <p className="mt-4 text-[1rem] leading-relaxed text-ink-soft">{diagnostico.body}</p>
        <BookingButton service="Dermatología" className="mt-7">
          {diagnostico.cta}
        </BookingButton>
      </div>
    </section>
  );
}
