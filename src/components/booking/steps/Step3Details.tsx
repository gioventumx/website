"use client";

import { useBooking } from "../BookingProvider";

export function Step3Details() {
  const { data, setField, submit } = useBooking();

  const nameValid = data.name.trim().length > 0;
  const phoneValid = /^\d{7,}$/.test(data.phone);
  const valid = nameValid && phoneValid;

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (valid) submit();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className="font-sans text-2xl font-light text-ink">Tus datos</h2>
      <p className="mt-1 text-[0.9rem] text-muted">Te contactamos para confirmar tu cita.</p>

      <div className="mt-6 flex flex-col gap-4">
        <label className="flex flex-col gap-1.5">
          <span className="text-[0.82rem] font-medium text-ink">Nombre</span>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setField("name", e.target.value)}
            placeholder="Tu nombre"
            className="rounded-full border border-line bg-white px-5 py-2.5 text-center text-[0.95rem] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-brand"
          />
        </label>

        <label className="flex flex-col gap-1.5">
          <span className="text-[0.82rem] font-medium text-ink">Teléfono</span>
          <input
            type="tel"
            inputMode="numeric"
            value={data.phone}
            onChange={(e) => setField("phone", e.target.value.replace(/\D/g, ""))}
            placeholder="10 dígitos"
            className="rounded-full border border-line bg-white px-5 py-2.5 text-center text-[0.95rem] text-ink outline-none transition-colors placeholder:text-muted/70 focus:border-brand"
          />
        </label>
      </div>

      <button
        type="submit"
        disabled={!valid}
        className="btn btn-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-40"
      >
        Enviar
      </button>
    </form>
  );
}
