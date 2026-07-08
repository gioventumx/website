"use client";

import type { ReactNode } from "react";
import type { ServiceOption } from "@/data/booking";
import { useBooking } from "./BookingProvider";

type Variant = "primary" | "outline" | "light";

type Props = {
  variant?: Variant;
  /** Preselecciona el servicio y arranca en el paso 2 (ej. en /dermatologia/). */
  service?: ServiceOption;
  className?: string;
  children: ReactNode;
};

export function BookingButton({ variant = "primary", service, className = "", children }: Props) {
  const { openBooking } = useBooking();
  return (
    <button
      type="button"
      onClick={() => openBooking(service ? { service } : undefined)}
      className={`btn btn-${variant} ${className}`.trim()}
    >
      {children}
    </button>
  );
}
