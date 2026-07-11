import Link from "next/link";
import { MediaSurface } from "@/components/ui/MediaSurface";
import type { Service } from "@/data/types";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link href={service.href} className="group block w-full">
      <MediaSurface
        as="image"
        src={service.image}
        overlay="none"
        className="relative flex min-h-[280px] flex-col justify-end overflow-hidden rounded-card p-5 shadow-card transition duration-[1200ms] ease-out group-hover:-translate-y-6 group-hover:shadow-xl motion-reduce:transition-none motion-reduce:group-hover:translate-y-0 md:min-h-[400px]"
      >
        {/* Degradado blanco SOLO detrás del texto (abajo) para asegurar lectura */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-white via-white/70 to-transparent"
        />

        {/* Botón circular con flecha diagonal, arriba a la derecha */}
        <span
          aria-hidden
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-ink shadow-sm transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
        >
          ↗
        </span>

        {/* Título abajo a la izquierda, sobre la imagen */}
        <div className="relative text-ink">
          <span className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-ink/60">
            {service.category}
          </span>
          <h3 className="font-accent mt-1 text-[1.7rem] leading-[1.1]">{service.title}</h3>
        </div>
      </MediaSurface>
    </Link>
  );
}
