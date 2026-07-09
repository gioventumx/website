"use client";

import { useEffect } from "react";
import { useBooking } from "@/components/booking/BookingProvider";

/**
 * Registra el origen de campaña en el flujo de agendamiento para medición.
 * Deriva de ?suc= (sucursal/campaña). No renderiza nada.
 */
export function BookingSource({ suc }: { suc: string | null }) {
  const { setSource } = useBooking();

  useEffect(() => {
    setSource(suc ? `faciales:${suc}` : "faciales");
  }, [suc, setSource]);

  return null;
}
