import { MediaSurface } from "@/components/ui/MediaSurface";
import { BookingButton } from "@/components/booking/BookingButton";
import { Stars } from "@/components/ui/Stars";
import { GoogleRatingInline } from "@/components/ui/GoogleRating";
import { HeroNotification } from "@/components/home/HeroNotification";
import { HeroFeatures } from "@/components/home/HeroFeatures";
import { home } from "@/data/home";

export function Hero() {
  const h = home.hero;

  return (
    <section className="px-4 pb-4 md:px-6 md:pb-6">
      <MediaSurface
        as="video"
        src={h.video}
        overlay="ink"
        className="flex min-h-[calc(100dvh_-_90px)] flex-col rounded-block md:min-h-[calc(100dvh_-_98px)]"
      >
        <HeroNotification />

        <div className="container-x flex w-full flex-1 items-center py-[clamp(70px,9vh,120px)]">
          <div className="max-w-[960px]">
          <span className="eyebrow on-dark">{h.eyebrow}</span>

          <h1 className="mt-[18px] font-sans text-[clamp(2.4rem,5.2vw,4rem)] font-light leading-[0.95] tracking-[-0.015em]">
            {h.titleTop}
            <span className="font-accent block text-[1.04em] text-brand-tint">
              {h.titleAccent}
            </span>
          </h1>

          <p className="mb-8 mt-[22px] max-w-[560px] text-[1.05rem] text-brand-tint">{h.body}</p>

          <div className="flex flex-wrap items-center gap-3.5">
            <BookingButton variant="light">{h.cta.label}</BookingButton>
            <div className="flex items-center gap-2.5 text-[0.85rem] text-brand-tint">
              <Stars rating={5} />
              <GoogleRatingInline />
            </div>
          </div>
          </div>
        </div>

        {/* Features ancladas al fondo del hero (md+), fuera del flujo, para que el
            bloque de texto pueda centrarse en el eje vertical completo. En móvil
            fluyen en el documento (debajo del texto) para no encimarse. */}
        <div className="md:absolute md:inset-x-0 md:bottom-0">
          <HeroFeatures />
        </div>
      </MediaSurface>
    </section>
  );
}
