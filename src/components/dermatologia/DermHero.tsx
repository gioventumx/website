import Link from "next/link";
import { MediaSurface } from "@/components/ui/MediaSurface";
import { BookingButton } from "@/components/booking/BookingButton";
import { Stars } from "@/components/ui/Stars";
import { HeroFeatures } from "@/components/home/HeroFeatures";
import { dermatologia } from "@/data/dermatologia";

// Mismo bloque redondeado + media/overlay + layout del hero del Home. Diferencia:
// arriba del título va un breadcrumb (navegación + SEO) en lugar del eyebrow.
export function DermHero() {
  const h = dermatologia.hero;
  const crumbs = dermatologia.breadcrumb;

  return (
    <section className="px-4 pb-4 md:px-6 md:pb-6">
      <MediaSurface
        as="video"
        src={h.video}
        overlay="ink"
        className="flex min-h-[calc(100dvh_-_90px)] flex-col rounded-block md:min-h-[calc(100dvh_-_98px)]"
      >
        <div className="container-x flex w-full flex-1 items-center py-[clamp(70px,9vh,120px)]">
          <div className="max-w-[960px]">
            {/* Breadcrumb — reemplaza al eyebrow. Enlaces reales para SEO. */}
            <nav aria-label="Ruta de navegación">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.72rem] font-semibold uppercase tracking-[0.2em]">
                {crumbs.map((c, i) => {
                  const last = i === crumbs.length - 1;
                  return (
                    <li key={c.href} className="flex items-center gap-x-2">
                      {last ? (
                        <span aria-current="page" className="text-white">
                          {c.label}
                        </span>
                      ) : (
                        <Link href={c.href} className="text-brand-tint/80 transition-colors hover:text-white">
                          {c.label}
                        </Link>
                      )}
                      {!last && (
                        <span aria-hidden className="text-brand-tint/50">
                          ›
                        </span>
                      )}
                    </li>
                  );
                })}
              </ol>
            </nav>

            <h1 className="mt-[18px] font-sans text-[clamp(2.4rem,5.2vw,4rem)] font-light leading-[0.95] tracking-[-0.015em]">
              {h.titleTop}
              <span className="font-accent block text-[1.04em] text-brand-tint">{h.titleAccent}</span>
            </h1>

            <p className="mb-8 mt-[22px] max-w-[560px] text-[1.05rem] text-brand-tint">{h.body}</p>

            <div className="flex flex-wrap items-center gap-3.5">
              <BookingButton variant="light" service="Dermatología">
                {h.cta}
              </BookingButton>
              <div className="flex items-center gap-2.5 text-[0.85rem] text-brand-tint">
                <Stars rating={5} />
                <span>
                  <b className="text-white">{h.rating.value}</b> {h.rating.text}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Features ancladas al fondo del hero, fuera del flujo (igual que el Home). */}
        <div className="absolute inset-x-0 bottom-0">
          <HeroFeatures features={h.features} />
        </div>
      </MediaSurface>
    </section>
  );
}
