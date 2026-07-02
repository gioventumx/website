"use client";

import type { ReactNode } from "react";
import { useBooking } from "./BookingProvider";

type Variant = "primary" | "outline" | "light";

type Props = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

export function BookingButton({ variant = "primary", className = "", children }: Props) {
  const { openBooking } = useBooking();
  return (
    <button
      type="button"
      onClick={openBooking}
      className={`btn btn-${variant} ${className}`.trim()}
    >
      {children}
    </button>
  );
}
