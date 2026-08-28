import type { Servicio } from "@/data/servicios";

type Props = { queEsperar: NonNullable<Servicio["queEsperar"]> };

const LABELS = {
  duracion: "Duración",
  sesiones: "Sesiones",
  recuperacion: "Recuperación",
  permanencia: "Permanencia de resultados",
} as const;

// Sección "Qué esperar" — SOLO Estética. Panel claro con 4 datos fijos del proceso
// (duración/sesiones/recuperación/permanencia). Distinto a propósito de la barra
// compacta de Wellness: aquí es un panel a media página con más aire, no una barra
// pegada al hero.
export function QueEsperar({ queEsperar }: Props) {
  return (
    <section className="bg-bg px-4 py-[clamp(40px,6vw,64px)] md:px-6">
      <div className="rounded-block bg-white p-[clamp(1.75rem,5vw,3.5rem)] shadow-card">
        <div className="mx-auto mb-9 max-w-[560px] text-center">
          <span className="eyebrow">El proceso</span>
          <h2 className="mt-3 font-sans text-[clamp(1.9rem,3.6vw,2.6rem)] font-light leading-[1.14] tracking-[-0.01em] text-ink">
            Qué <span className="font-accent text-brand">esperar</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 min-[560px]:grid-cols-2 lg:grid-cols-4">
          {(Object.keys(LABELS) as Array<keyof typeof LABELS>).map((key) => (
            <div key={key} className="rounded-card border border-line p-5 text-center">
              <span className="text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-muted">
                {LABELS[key]}
              </span>
              <p className="mt-2 font-serif text-[1.15rem] font-medium text-ink">{queEsperar[key]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
