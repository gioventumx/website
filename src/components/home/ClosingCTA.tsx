import { MediaSurface } from "@/components/ui/MediaSurface";
import { BookingButton } from "@/components/booking/BookingButton";
import type { ServiceOption } from "@/data/booking";
import { home } from "@/data/home";

/**
 * CTA de cierre: bloque redondeado con imagen de fondo, overlay plano y CTA que abre
 * el modal de agenda.
 * `service` (opcional) preselecciona el servicio del modal.
 * `image` (opcional) sobreescribe la imagen de fondo por página.
 * `compact` = formato BANNER: mucho menos alto, contenido en fila (texto + botón).
 */
export function ClosingCTA({
  service,
  image,
  compact = false,
  body,
}: { service?: ServiceOption; image?: string; compact?: boolean; body?: string } = {}) {
  const b = home.band;
  const bg = image ?? b.image;
  const bodyText = body ?? b.body;

  // ── BANNER (compact): bajo, en fila en desktop ──
  if (compact) {
    return (
      <section className="px-4 py-2 md:px-6">
        <MediaSurface
          as="image"
          src={bg}
          overlay="ink"
          label={bg ? undefined : "imagen (TODO)"}
          className="mx-auto rounded-block md:w-3/5"
        >
          <div className="container-x flex flex-col items-center gap-5 py-[clamp(22px,3vw,36px)] text-center md:flex-row md:items-center md:justify-between md:gap-8 md:text-left">
            <div>
              <h2 className="font-sans text-[clamp(1.4rem,2.4vw,1.9rem)] font-light leading-[1.2] text-white">
                {b.titleTop} <span className="font-accent text-brand-tint">{b.titleAccent}</span>
              </h2>
              <p className="mt-2 max-w-[460px] text-[0.95rem] text-brand-tint">{bodyText}</p>
            </div>
            <BookingButton variant="light" service={service} className="shrink-0">
              {b.cta.label}
            </BookingButton>
          </div>
        </MediaSurface>
      </section>
    );
  }

  // ── DEFAULT: sección grande, contenido centrado ──
  return (
    <section className="px-4 pb-4 md:px-6 md:pb-6">
      <MediaSurface
        as="image"
        src={bg}
        overlay="ink"
        label={bg ? undefined : "imagen (TODO)"}
        className="rounded-block text-center"
      >
        <div className="container-x max-w-[620px] py-[clamp(44px,6vw,72px)]">
          <h2 className="font-sans text-[clamp(1.8rem,3.4vw,2.4rem)] font-light leading-[1.18] text-white">
            {b.titleTop}
            <span className="font-accent block text-brand-tint">{b.titleAccent}</span>
          </h2>
          <p className="mx-auto mb-7 mt-[18px] max-w-[420px] text-brand-tint">{bodyText}</p>
          <BookingButton variant="light" service={service}>
            {b.cta.label}
          </BookingButton>
        </div>
      </MediaSurface>
    </section>
  );
}
