import { MediaSurface } from "@/components/ui/MediaSurface";
import { BookingButton } from "@/components/booking/BookingButton";
import { home } from "@/data/home";

/**
 * CTA de cierre del Home: bloque redondeado compacto con imagen de fondo
 * (placeholder por ahora), overlay para legibilidad y contenido centrado.
 */
export function ClosingCTA() {
  const b = home.band;

  return (
    <section className="px-4 pb-4 md:px-6 md:pb-6">
      <MediaSurface
        as="image"
        src={b.image}
        overlay="ink"
        label={b.image ? undefined : "imagen (TODO)"}
        className="rounded-block text-center"
      >
        <div className="container-x max-w-[620px] py-[clamp(44px,6vw,72px)]">
          <h2 className="font-sans text-[clamp(1.8rem,3.4vw,2.4rem)] font-light leading-[1.18] text-white">
            {b.titleTop}
            <span className="font-accent block text-brand-tint">{b.titleAccent}</span>
          </h2>
          <p className="mx-auto mb-7 mt-[18px] max-w-[420px] text-brand-tint">{b.body}</p>
          <BookingButton variant="light">{b.cta.label}</BookingButton>
        </div>
      </MediaSurface>
    </section>
  );
}
