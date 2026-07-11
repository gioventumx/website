"use client";

import { bookingBranches, type BranchKey } from "@/data/booking";

const order: BranchKey[] = ["antigua", "cuspide"];

type Props = {
  /** Se llama con la key al elegir una sucursal. TODA la lógica vive en el caller. */
  onSelect: (key: BranchKey) => void;
  /** Marca visualmente la sucursal activa (aria-pressed). Opcional. */
  activeKey?: BranchKey | null;
  /** Variante compacta (menos padding, nombre más chico) SOLO para la hoja de llamada
   *  del bottom nav. Default = tamaño de siempre → el Step2Branch del booking (móvil y
   *  desktop) no cambia en nada. */
  compact?: boolean;
};

/**
 * Selector PRESENTACIONAL de sucursal (dos tarjetas, dirección revelada al
 * hover/focus). Solo renderiza y expone `onSelect` — cero lógica de negocio.
 * Lo comparten el paso de agenda (Step2Branch → selectBranch + avance de paso) y la
 * hoja de llamada del bottom nav (→ evento + tel:). Cada caller pone su propia lógica;
 * este componente no cambia de comportamiento entre ellos.
 */
export function BranchChoice({ onSelect, activeKey = null, compact = false }: Props) {
  return (
    <div className={`flex flex-col ${compact ? "gap-3" : "gap-4"}`}>
      {order.map((key) => {
        const branch = bookingBranches[key];
        const active = activeKey === key;
        return (
          <div key={key} className="group">
            <button
              type="button"
              onClick={() => onSelect(key)}
              aria-pressed={active}
              className={`w-full rounded-card border text-center transition-colors focus-visible:border-brand ${
                compact ? "p-3.5" : "p-5"
              } ${
                active
                  ? "border-brand bg-brand-tint"
                  : "border-line bg-white/60 hover:border-brand"
              }`}
            >
              <span className={`font-medium text-ink ${compact ? "text-base" : "text-lg"}`}>
                {branch.name}
              </span>
            </button>
            {/* Dirección. MÓVIL (base): SIEMPRE visible y compacta (hover=tap no sirve).
                DESKTOP (md:): hover/focus-reveal EXACTO como hoy — los valores md: igualan
                las clases originales, así el selector del booking en desktop no cambia. */}
            <div className="grid grid-rows-[1fr] transition-all duration-300 md:grid-rows-[0fr] md:group-hover:grid-rows-[1fr] md:group-focus-within:grid-rows-[1fr]">
              <p className="mt-1 overflow-hidden px-5 text-[0.8rem] text-muted opacity-100 transition-opacity duration-300 md:mt-0 md:text-[0.85rem] md:opacity-0 md:group-hover:mt-2 md:group-hover:opacity-100 md:group-focus-within:mt-2 md:group-focus-within:opacity-100">
                {branch.address}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
