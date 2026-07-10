import Link from "next/link";
import { MediaSurface } from "@/components/ui/MediaSurface";
import { BookingButton } from "@/components/booking/BookingButton";
import { conocenos } from "@/data/conocenos";

// Hero de /conocenos/: mismo bloque redondeado + media/overlay que el de Derma, con
// BREADCRUMB (navegación + SEO) en lugar de eyebrow. Sin features ni notificación.
export function ConocenosHero() {
  const h = conocenos.hero;
  const crumbs = conocenos.breadcrumb;

  return (
    <section className="px-4 pb-4 md:px-6 md:pb-6">
      <MediaSurface
        as="image"
        priority
        src={h.image}
        overlay="ink"
        label={h.image ? undefined : "imagen / video de fondo (TODO)"}
        className="flex min-h-[calc(100dvh_-_90px)] flex-col rounded-block md:min-h-[calc(100dvh_-_98px)]"
      >
        <div className="container-x flex w-full flex-1 items-center justify-center py-[clamp(70px,9vh,120px)]">
          <div className="max-w-[820px] text-center">
            {/* Breadcrumb — reemplaza al eyebrow. Enlaces reales para SEO. */}
            <nav aria-label="Ruta de navegación">
              <ol className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-[0.72rem] font-semibold uppercase tracking-[0.2em]">
                {crumbs.map((c, i) => {
                  const last = i === crumbs.length - 1;
                  return (
                    <li key={c.label} className="flex items-center gap-x-2">
                      {c.href && !last ? (
                        <Link href={c.href} className="text-brand-tint/80 transition-colors hover:text-white">
                          {c.label}
                        </Link>
                      ) : (
                        <span aria-current="page" className="text-white">
                          {c.label}
                        </span>
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

            <h1 className="mt-[18px] font-sans text-[clamp(2rem,4vw,3rem)] font-light leading-[1.06] tracking-[-0.015em]">
              {h.titleTop}
              <span className="font-accent block text-brand-tint">{h.titleAccent}</span>
            </h1>

            <p className="mx-auto mb-8 mt-[22px] max-w-[560px] text-[1.05rem] text-brand-tint">{h.body}</p>

            <BookingButton variant="light">{h.cta}</BookingButton>
          </div>
        </div>
      </MediaSurface>
    </section>
  );
}
