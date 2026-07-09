"use client";

import { useEffect } from "react";
import { useBooking } from "./BookingProvider";

/**
 * Registra el origen de campaña en el flujo de agendamiento para medición.
 * `base` es el contexto de la página (ej. "faciales", "masajes"); si llega ?suc=,
 * se agrega como `base:suc`. No renderiza nada.
 */
export function BookingSource({ suc, base }: { suc: string | null; base: string }) {
  const { setSource } = useBooking();

  useEffect(() => {
    setSource(suc ? `${base}:${suc}` : base);
  }, [suc, base, setSource]);

  return null;
}
