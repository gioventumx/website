import Link from "next/link";
import { MediaSurface } from "@/components/ui/MediaSurface";
import { destacados } from "@/data/destacados";

/**
 * Dos servicios destacados (tarjetas grandes lado a lado). Imagen a sangre con
 * overlay plano para legibilidad; hover eleva la tarjeta y mueve la flecha.
 * "Ver más" lleva a la página del servicio (no abre modal).
 */
export function Destacados() {
  return (
    <section className="bg-bg px-4 pb-10 pt-3 md:px-6 md:pb-12 md:pt-4">
      <div className="grid gap-5 md:grid-cols-2">
        {destacados.map((d) => (
          <Link key={d.slug} href={d.href} className="group block">
            <MediaSurface
              as="image"
              src={d.image}
              overlay="ink"
              label={d.image ? undefined : "imagen (TODO)"}
              className="flex min-h-[520px] flex-col justify-end rounded-block p-8 text-white transition-transform duration-300 ease-out group-hover:-translate-y-1.5 motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 max-[820px]:min-h-[420px] max-[820px]:p-7"
            >
              <h3 className="font-serif text-[clamp(1.9rem,3.2vw,2.7rem)] font-medium leading-[1.08]">
                {d.title}
              </h3>
              <p className="mt-2.5 max-w-[340px] text-[1rem] text-white/85">{d.hook}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[0.92rem] font-semibold text-white">
                Ver más
                <span
                  aria-hidden
                  className="text-[1.2em] transition-transform duration-200 group-hover:translate-x-1 motion-reduce:transition-none"
                >
                  ›
                </span>
              </span>
            </MediaSurface>
          </Link>
        ))}
      </div>
    </section>
  );
}
