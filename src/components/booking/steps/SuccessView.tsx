"use client";

import { buildWhatsAppUrl } from "@/data/booking";
import { useBooking } from "../BookingProvider";

export function SuccessView() {
  const { data } = useBooking();

  const openWhatsApp = () => {
    const url = buildWhatsAppUrl(data);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex flex-col items-center py-4 text-center">
      {/* Palomita verde */}
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </span>

      <h2 className="mt-5 font-sans text-2xl font-light text-ink">¡Gracias por contactarnos!</h2>
      <p className="mt-2 max-w-xs text-[0.92rem] text-muted">
        Gracias por contactarnos, en un momento serás redirigido.
      </p>

      <button type="button" onClick={openWhatsApp} className="btn btn-primary mt-6 w-full">
        Continuar en WhatsApp
      </button>
    </div>
  );
}
