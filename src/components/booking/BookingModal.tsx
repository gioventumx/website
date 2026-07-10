"use client";

import { useBooking } from "./BookingProvider";
import { Step1Service } from "./steps/Step1Service";
import { Step2Branch } from "./steps/Step2Branch";
import { Step3Details } from "./steps/Step3Details";
import { SuccessView } from "./steps/SuccessView";

export function BookingModal() {
  const { open, step, close, back, serviceLocked, branchLocked } = useBooking();

  // Ocultamos "Atrás" solo cuando el paso previo realmente se saltó:
  //  · Paso 2 con servicio bloqueado (no hubo paso 1).
  //  · Paso 3 solo si servicio Y sucursal vinieron bloqueados (se abrió directo en
  //    datos). Si únicamente la sucursal vino de ?suc= (Home/hub), el paso 1 sí se
  //    mostró, así que "Atrás" vuelve a servicio.
  const showBack =
    (step === 2 && !serviceLocked) || (step === 3 && !(serviceLocked && branchLocked));

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
        className="relative w-full max-w-lg rounded-block bg-white p-8 text-center shadow-2xl md:p-11"
      >
        {/* Atrás y Cerrar en absoluto (esquinas): no ocupan flujo, así el contenido
            no se empuja hacia abajo y queda centrado en el modal. */}
        {showBack && (
          <button
            type="button"
            onClick={back}
            className="absolute left-5 top-5 flex items-center gap-1 text-[0.85rem] font-medium text-muted transition-colors hover:text-brand"
          >
            <span aria-hidden>←</span> Atrás
          </button>
        )}
        <button
          type="button"
          aria-label="Cerrar"
          onClick={close}
          className="absolute right-4 top-4 flex h-14 w-14 items-center justify-center rounded-full text-[2.9rem] leading-none text-ink/60 transition-colors hover:bg-ink/5 hover:text-ink"
        >
          ×
        </button>

        {/* Título fijo del modal + línea separadora corta y centrada */}
        <h2 className="font-accent text-[2.5rem] leading-none text-brand">Agenda tu Cita</h2>
        <div aria-hidden className="mx-auto mb-6 mt-4 h-px w-12 bg-line" />

        {step === 1 && <Step1Service />}
        {step === 2 && <Step2Branch />}
        {step === 3 && <Step3Details />}
        {step === "success" && <SuccessView />}
      </div>
    </div>
  );
}
