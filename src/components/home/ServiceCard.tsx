import Link from "next/link";
import { MediaSurface } from "@/components/ui/MediaSurface";
import type { Service } from "@/data/types";

export function ServiceCard({ service, clone = false }: { service: Service; clone?: boolean }) {
  return (
    <Link
      href={service.href}
      aria-hidden={clone || undefined}
      tabIndex={clone ? -1 : undefined}
      className="group w-[80vw] shrink-0 snap-start sm:w-[46vw] md:w-[320px]"
    >
      <MediaSurface
        as="image"
        src={service.image}
        className="relative flex min-h-[400px] flex-col justify-end rounded-card p-5 shadow-card transition-[transform,box-shadow] duration-300 ease-out group-hover:-translate-y-2 group-hover:shadow-2xl motion-reduce:transition-none motion-reduce:group-hover:translate-y-0"
      >
        {/* Botón circular con flecha diagonal, arriba a la derecha */}
        <span
          aria-hidden
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-lg text-ink transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
        >
          ↗
        </span>

        {/* Título abajo a la izquierda, sobre la imagen */}
        <div className="text-white">
          <span className="text-[0.66rem] font-semibold uppercase tracking-[0.18em] text-white/70">
            {service.category}
          </span>
          <h3 className="font-accent mt-1 text-[1.7rem] leading-[1.1]">{service.title}</h3>
        </div>
      </MediaSurface>
    </Link>
  );
}
