import { MediaSurface } from "@/components/ui/MediaSurface";
import { BookingButton } from "@/components/booking/BookingButton";
import { depilacion } from "@/data/depilacion";

// Mismo bloque redondeado media+overlay que /dermatologia/, pero sin la tira de
// HeroFeatures (en depilación las features son su propia sección).
export function DepilacionHero() {
  const h = depilacion.hero;

  return (
    <section className="px-4 pb-4 pt-2 md:px-6 md:pb-6">
      <MediaSurface
        as="image"
        priority
        src={h.image}
        overlay="ink"
        label={h.image ? undefined : "imagen / video — sesión de depilación láser (TODO)"}
        className="flex min-h-[74vh] items-center rounded-block"
      >
        <div className="container-x py-[clamp(48px,7vh,90px)]">
          <div className="max-w-[760px]">
            <span className="eyebrow on-dark">{h.eyebrow}</span>
            <h1 className="mt-4 font-sans text-[clamp(2.4rem,5vw,3.8rem)] font-light leading-[1.08] tracking-[-0.015em] text-white">
              {h.titleTop}
              <span className="font-accent block text-brand-tint">{h.titleAccent}</span>
            </h1>
            <p className="mb-8 mt-5 max-w-[520px] text-[1.05rem] text-brand-tint">{h.body}</p>
            <BookingButton variant="light">{h.cta}</BookingButton>
          </div>
        </div>
      </MediaSurface>
    </section>
  );
}
