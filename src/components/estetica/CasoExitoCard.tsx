import type { CasoExito } from "@/data/types";

export function CasoExitoCard({
  caso,
  onOpen,
}: {
  caso: CasoExito;
  onOpen: (src: string, alt: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(caso.image, caso.alt)}
      aria-label={`Ver antes y después de ${caso.paciente} — ${caso.tratamiento}`}
      className="group mb-5 block w-full break-inside-avoid rounded-card border border-line bg-white p-6 text-left transition-shadow duration-200 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        {/* Miniatura — ícono de expandir siempre visible como affordance de clic */}
        <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-[10px] sm:w-28">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={caso.image}
            alt={caso.alt}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
          />
          <span
            aria-hidden
            className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/50 text-white transition-colors group-hover:bg-black/70"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5">
              <path d="M9 3H3v6M15 3h6v6M9 21H3v-6M15 21h6v-6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>

        {/* Nombre / tratamiento — mismo estilo que la línea "Paciente · ★★★★★" de
            ReviewCard, sin inventar un rating. */}
        <div>
          <b className="block text-[0.9rem] text-ink">{caso.paciente}</b>
          <div className="text-[0.78rem] text-muted">{caso.tratamiento}</div>
        </div>
      </div>
    </button>
  );
}
