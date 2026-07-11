"use client";

import { BranchChoice } from "@/components/booking/BranchChoice";
import { useBooking } from "../BookingProvider";

export function Step2Branch() {
  const { selectBranch, data } = useBooking();

  return (
    <div>
      <h2 className="font-sans text-2xl font-light text-ink">Elige tu sucursal</h2>
      <p className="mt-1 text-[0.9rem] text-muted">
        Pasa el cursor para ver la ubicación exacta.
      </p>

      {/* Selector presentacional compartido. La lógica (selectBranch → avance de paso)
          se queda AQUÍ, sin cambios: onSelect es exactamente el selectBranch de antes. */}
      <div className="mt-6">
        <BranchChoice onSelect={selectBranch} activeKey={data.branch} />
      </div>
    </div>
  );
}
