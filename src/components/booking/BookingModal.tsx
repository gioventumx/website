"use client";

import { useBooking } from "./BookingProvider";
import { Step1Service } from "./steps/Step1Service";
import { Step2Branch } from "./steps/Step2Branch";
import { Step3Details } from "./steps/Step3Details";
import { SuccessView } from "./steps/SuccessView";

export function BookingModal() {
  const { open, step, close, back, serviceLocked } = useBooking();

  // En el paso 2, si el servicio vino preseleccionado no hay paso 1 al que volver,
  // así que ocultamos "Atrás". En el paso 3 siempre se puede volver a la sucursal.
  const showBack = step === 3 || (step === 2 && !serviceLocked);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-hidden={!open}
      onClick={close}
      className={`fixed inset-0 z-[80] flex items-center justify-center p-4 transition-opacity duration-200 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-black/50" />

      <div
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="relative w-full max-w-lg rounded-block bg-white p-6 text-center shadow-2xl md:p-8"
      >
        {/* Barra superior: Atrás + Cerrar */}
        <div className="mb-3 flex items-center justify-between">
          {showBack ? (
            <button
              type="button"
              onClick={back}
              className="flex items-center gap-1 text-[0.85rem] font-medium text-muted transition-colors hover:text-brand"
            >
              <span aria-hidden>←</span> Atrás
            </button>
          ) : (
            <span />
          )}

          <button
            type="button"
            aria-label="Cerrar"
            onClick={close}
            className="-mr-2 -mt-2 flex h-11 w-11 items-center justify-center rounded-full text-[2rem] leading-none text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
          >
            ×
          </button>
        </div>

        {/* Título fijo del modal */}
        <h2 className="mb-5 font-accent text-[1.9rem] leading-none text-brand">Agenda tu Cita</h2>

        {step === 1 && <Step1Service />}
        {step === 2 && <Step2Branch />}
        {step === 3 && <Step3Details />}
        {step === "success" && <SuccessView />}
      </div>
    </div>
  );
}
