import type { Servicio } from "@/data/servicios";

type Props = { datos: NonNullable<Servicio["datosCompactos"]> };

const LABELS = { duracion: "Duración", incluye: "Incluye", formato: "Formato" } as const;

// Barra de datos compacta — SOLO Wellness, justo debajo del hero. Tira delgada de 3
// datos en línea (duración/incluye/formato). Distinta a propósito de RatingBand
// (que va más abajo, banda de confianza) y de QueEsperar de Estética (panel con
// tarjetas a media página): esta es solo texto en línea, sin tarjetas ni bordes.
export function DatosCompactos({ datos }: Props) {
  return (
    <div className="border-b border-line bg-surface">
      <div className="container-x flex flex-wrap items-center justify-center gap-x-8 gap-y-2 py-4 text-[0.88rem] text-ink-soft">
        {(Object.keys(LABELS) as Array<keyof typeof LABELS>).map((key) => (
          <span key={key}>
            <b className="font-semibold text-ink">{LABELS[key]}:</b> {datos[key]}
          </span>
        ))}
      </div>
    </div>
  );
}
