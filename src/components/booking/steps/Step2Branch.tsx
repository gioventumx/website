"use client";

import { bookingBranches, type BranchKey } from "@/data/booking";
import { useBooking } from "../BookingProvider";

const order: BranchKey[] = ["antigua", "cuspide"];

export function Step2Branch() {
  const { selectBranch } = useBooking();

  return (
    <div>
      <h2 className="font-sans text-2xl font-light text-ink">Elige tu sucursal</h2>
      <p className="mt-1 text-[0.9rem] text-muted">
        Pasa el cursor para ver la ubicación exacta.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        {order.map((key) => {
          const branch = bookingBranches[key];
          return (
            <div key={key} className="group">
              <button
                type="button"
                onClick={() => selectBranch(key)}
                className="w-full rounded-card border border-line bg-white/60 p-5 text-center transition-colors hover:border-brand focus-visible:border-brand"
              >
                <span className="text-lg font-medium text-ink">{branch.name}</span>
              </button>
              {/* Dirección revelada al hover / focus */}
              <div className="grid grid-rows-[0fr] transition-all duration-300 group-hover:grid-rows-[1fr] group-focus-within:grid-rows-[1fr]">
                <p className="overflow-hidden px-5 text-[0.85rem] text-muted opacity-0 transition-opacity duration-300 group-hover:mt-2 group-hover:opacity-100 group-focus-within:mt-2 group-focus-within:opacity-100">
                  {branch.address}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
