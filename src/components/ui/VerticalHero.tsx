import { MediaSurface } from "@/components/ui/MediaSurface";
import { BookingButton } from "@/components/booking/BookingButton";
import { Stars } from "@/components/ui/Stars";
import { HeroFeatures } from "@/components/home/HeroFeatures";
import { HeroNotification } from "@/components/home/HeroNotification";
import type { ServiceOption } from "@/data/booking";
import type { Feature } from "@/data/types";

export type VerticalHeroData = {
  eyebrow: string;
  titleTop: string;
  titleAccent: string;
  body: string;
  cta: string;
  image?: string;
  rating: { value: string; text: string };
  features: Feature[];
};

// Hero reutilizable de vertical (misma estructura que el de Dermatología, pero con
// EYEBROW en vez de breadcrumb): bloque redondeado + media/overlay + notificación +
// features al fondo. `service` preselecciona el servicio del modal.
export function VerticalHero({ hero, service }: { hero: VerticalHeroData; service: ServiceOption }) {
  return (
    <section className="px-4 pb-4 md:px-6 md:pb-6">
      <MediaSurface
        as="image"
        src={hero.image}
        overlay="ink"
        label={hero.image ? undefined : "imagen / video de fondo (TODO)"}
        className="flex min-h-[calc(100dvh_-_90px)] flex-col rounded-block md:min-h-[calc(100dvh_-_98px)]"
      >
        <HeroNotification />

        <div className="container-x flex w-full flex-1 items-center py-[clamp(70px,9vh,120px)]">
          <div className="max-w-[960px]">
            <span className="eyebrow on-dark">{hero.eyebrow}</span>

            <h1 className="mt-4 font-sans text-[clamp(2rem,4vw,3rem)] font-light leading-[1.02] tracking-[-0.015em]">
              {hero.titleTop}
              <span className="font-accent block text-[1.04em] text-brand-tint">{hero.titleAccent}</span>
            </h1>

            <p className="mb-8 mt-[22px] max-w-[560px] text-[1.05rem] text-brand-tint">{hero.body}</p>

            <div className="flex flex-wrap items-center gap-3.5">
              <BookingButton variant="light" service={service}>
                {hero.cta}
              </BookingButton>
              <div className="flex items-center gap-2.5 text-[0.85rem] text-brand-tint">
                <Stars rating={5} />
                <span>
                  <b className="text-white">{hero.rating.value}</b> {hero.rating.text}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0">
          <HeroFeatures features={hero.features} />
        </div>
      </MediaSurface>
    </section>
  );
}
