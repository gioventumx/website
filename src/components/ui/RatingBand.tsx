import { Stars } from "@/components/ui/Stars";
import { GoogleRatingInline } from "@/components/ui/GoogleRating";

export type RatingStat = { value: string; label: string };

type Props = {
  /** Datos de confianza propios del servicio (ej. "+10 años", "Certificados COFEPRIS"). */
  stats: RatingStat[];
};

// Banda compacta de confianza: rating de Google (dinámico por sucursal, mismo dato
// que el hero) + stats propios del servicio. Sección 3 en los 3 templates de servicio,
// siempre en el mismo lugar (justo debajo de "qué es esto"), solo cambian los `stats`.
export function RatingBand({ stats }: Props) {
  return (
    <section className="border-y border-line bg-surface">
      <div className="container-x flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-6 md:py-7">
        <div className="flex items-center gap-2 text-[0.9rem] text-ink-soft">
          <Stars rating={5} className="text-[1rem]" />
          <GoogleRatingInline variant="light" />
        </div>
        {stats.map((s) => (
          <div key={s.label} className="flex items-baseline gap-1.5 text-[0.9rem] text-ink-soft">
            <span className="font-serif text-[1.3rem] font-medium text-ink">{s.value}</span>
            {s.label}
          </div>
        ))}
      </div>
    </section>
  );
}
