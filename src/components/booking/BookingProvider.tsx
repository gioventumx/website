"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  emptyBooking,
  type BookingData,
  type BookingStep,
  type BranchKey,
  type ServiceOption,
} from "@/data/booking";
import { lockLenis, unlockLenis } from "@/lib/lenis";
import { BookingModal } from "./BookingModal";

type BookingContextValue = {
  open: boolean;
  step: BookingStep;
  data: BookingData;
  openBooking: () => void;
  close: () => void;
  back: () => void;
  next: () => void;
  selectService: (service: ServiceOption) => void;
  selectBranch: (branch: BranchKey) => void;
  setField: (field: "name" | "phone" | "serviceOther", value: string) => void;
  submit: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking debe usarse dentro de <BookingProvider>");
  return ctx;
}

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<BookingStep>(1);
  const [data, setData] = useState<BookingData>(emptyBooking);

  const openBooking = useCallback(() => {
    setData(emptyBooking);
    setStep(1);
    setOpen(true);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const back = useCallback(() => {
    setStep((s) => (s === 3 ? 2 : s === 2 ? 1 : s));
  }, []);

  const next = useCallback(() => {
    setStep((s) => (s === 1 ? 2 : s === 2 ? 3 : s));
  }, []);

  const selectService = useCallback((service: ServiceOption) => {
    setData((d) => ({ ...d, service }));
    // "Otro" requiere que el usuario escriba el detalle antes de avanzar
    if (service !== "Otro") setStep(2);
  }, []);

  const selectBranch = useCallback((branch: BranchKey) => {
    setData((d) => ({ ...d, branch }));
    setStep(3);
  }, []);

  const setField = useCallback((field: "name" | "phone" | "serviceOther", value: string) => {
    setData((d) => ({ ...d, [field]: value }));
  }, []);

  const submit = useCallback(() => {
    // TODO: enviar a Resend + evento de conversión (usar `data`)
    setStep("success");
  }, []);

  // Cierre con Esc + bloqueo de scroll del body mientras el modal está abierto
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    lockLenis();
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      unlockLenis();
    };
  }, [open]);

  const value = useMemo<BookingContextValue>(
    () => ({
      open,
      step,
      data,
      openBooking,
      close,
      back,
      next,
      selectService,
      selectBranch,
      setField,
      submit,
    }),
    [open, step, data, openBooking, close, back, next, selectService, selectBranch, setField, submit]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal />
    </BookingContext.Provider>
  );
}
