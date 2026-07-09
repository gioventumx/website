"use client";

import { bookingServices } from "@/data/booking";
import { useBooking } from "../BookingProvider";

export function Step1Service() {
  const { selectService, setField, next, data } = useBooking();

  const isOther = data.service === "Otro";
  const otherValid = data.serviceOther.trim().length > 0;

  return (
    <div>
      <h2 className="font-sans text-2xl font-light text-ink">¿Qué estás buscando?</h2>
      <p className="mt-1 text-[0.9rem] text-muted">Selecciona la especialidad que te interesa.</p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {bookingServices.map((service) => {
          const active = data.service === service;
          return (
            <button
              key={service}
              type="button"
              onClick={() => selectService(service)}
              className={`rounded-full border px-5 py-2.5 text-[0.92rem] font-medium transition-colors ${
                active
                  ? "border-brand bg-brand text-white"
                  : "border-line bg-white/60 text-ink hover:border-brand hover:text-brand"
              }`}
            >
              {service}
            </button>
          );
        })}
      </div>

      {/* Campo de texto libre cuando se elige "Otro" */}
      {isOther && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (otherValid) next();
          }}
          className="mt-5"
        >
          <label className="flex flex-col gap-1.5">
            <span className="text-[0.82rem] font-medium text-ink">Cuéntanos qué buscas</span>
            <input
              type="text"
              autoFocus
              value={data.serviceOther}
              onChange={(e) => setField("serviceOther", e.target.value)}
              placeholder="Describe el servicio que te interesa"
              className="rounded-full border border-line bg-white px-5 py-2.5 text-center text-[0.95rem] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-brand"
            />
          </label>

          <button
            type="submit"
            disabled={!otherValid}
            className="btn btn-primary mt-4 w-full disabled:cursor-not-allowed disabled:opacity-40"
          >
            Continuar
          </button>
        </form>
      )}
    </div>
  );
}
