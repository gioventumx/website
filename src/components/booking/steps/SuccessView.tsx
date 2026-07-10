"use client";

import { buildWhatsAppUrl } from "@/data/booking";
import { useBooking } from "../BookingProvider";

// Confirmación HONESTA: la web no sabe si el usuario mandó el mensaje en WhatsApp,
// solo que le abrimos WhatsApp con el texto listo. No damos por hecho el envío.
export function SuccessView() {
  const { data } = useBooking();

  const openWhatsApp = () => {
    const url = buildWhatsAppUrl(data);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col items-center py-4 text-center">
      {/* Burbuja de chat (WhatsApp), no una palomita de confirmación */}
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
        </svg>
      </span>

      <h2 className="mt-5 font-sans text-2xl font-light text-ink">
        Te abrimos WhatsApp con tu mensaje listo
      </h2>
      <p className="mt-2 max-w-xs text-[0.92rem] text-muted">
        Solo dale enviar en WhatsApp para confirmar tu cita. ¿No se abrió la ventana?
      </p>

      <button type="button" onClick={openWhatsApp} className="btn btn-primary mt-6 w-full">
        Reintentar en WhatsApp
      </button>
    </div>
  );
}
