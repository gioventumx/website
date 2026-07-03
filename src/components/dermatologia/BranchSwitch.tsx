"use client";

import { bookingBranches, type BranchKey } from "@/data/booking";
import { useBooking } from "@/components/booking/BookingProvider";

/**
 * Tarjetas de sucursal. Recibe las branches ya filtradas por el server (según
 * ?suc=). "Agenda una valoración" abre el modal con esa sucursal preseleccionada
 * (el usuario aún puede cambiarla dentro del modal).
 */
export function BranchSwitch({ branches }: { branches: BranchKey[] }) {
  const { bookBranch } = useBooking();
  const single = branches.length === 1;

  return (
    <div className={`grid gap-6 ${single ? "mx-auto max-w-[560px]" : "md:grid-cols-2"}`}>
      {branches.map((key) => {
        const b = bookingBranches[key];
        const maps = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `${b.name} ${b.address}`
        )}`;
        return (
          <div
            key={key}
            className="rounded-block border border-line bg-white p-7 shadow-card md:p-8"
          >
            <span className="eyebrow">Sucursal</span>
            <h3 className="mt-2 font-accent text-[1.5rem] italic text-ink">{b.name}</h3>

            <p className="mt-4 flex gap-2 text-[0.9rem] leading-relaxed text-muted">
              <span aria-hidden>📍</span>
              {b.address}
            </p>
            <p className="mt-2 flex gap-2 text-[0.9rem] text-muted">
              <span aria-hidden>🕐</span>
              {b.hours}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a href={maps} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
                Cómo llegar
              </a>
              <button type="button" onClick={() => bookBranch(key)} className="btn btn-primary">
                Agenda una valoración
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
