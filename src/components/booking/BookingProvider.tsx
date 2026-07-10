"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import {
  emptyBooking,
  buildWhatsAppUrl,
  fireBookingConversion,
  getLandingService,
  parseBranch,
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
  /** Abre el modal. Con `service` preselecciona el servicio y arranca en el paso 2.
   *  Con `source` inyecta la atribución del origen (ej. desde la notificación). */
  openBooking: (opts?: { service?: ServiceOption; source?: string; treatment?: string }) => void;
  /** true si el servicio vino preseleccionado (oculta el "Atrás" en el paso 2). */
  serviceLocked: boolean;
  /** true si la sucursal vino de ?suc= (oculta el "Atrás" en el paso 3). */
  branchLocked: boolean;
  /** Abre el modal con una sucursal preseleccionada (el usuario aún puede cambiarla). */
  bookBranch: (branch: BranchKey) => void;
  /** Registra el origen de campaña (ej. ?suc=) para medición; se conserva entre reinicios. */
  setSource: (source: string) => void;
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
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<BookingStep>(1);
  const [data, setData] = useState<BookingData>(emptyBooking);
  const [serviceLocked, setServiceLocked] = useState(false);
  const [branchLocked, setBranchLocked] = useState(false);

  // Reinicia el formulario pero CONSERVA el origen de campaña (source).
  //  · Servicio: se infiere por RUTA (tiene prioridad); si la ruta no tiene servicio
  //    propio (Home, hub), usa el `service` explícito si se pasó, o pregunta (paso 1).
  //  · Sucursal: se lee de ?suc= (robusto a orden/otros params, minúsculas, whitelist).
  //  · Paso inicial: servicio + sucursal → 3 (datos) · solo servicio → 2 · resto → 1.
  const openBooking = useCallback(
    (opts?: { service?: ServiceOption; source?: string; treatment?: string }) => {
      const service = getLandingService(pathname) ?? opts?.service ?? null;
      const branch =
        typeof window !== "undefined" ? parseBranch(window.location.search) : null;
      // Partimos SIEMPRE de emptyBooking (treatment: ""), así un CTA genérico limpia
      // el tratamiento de una apertura anterior desde una tarjeta.
      setData((d) => ({
        ...emptyBooking,
        source: opts?.source ?? d.source,
        service,
        branch,
        treatment: opts?.treatment ?? "",
      }));
      setServiceLocked(service !== null);
      setBranchLocked(branch !== null);
      setStep(service && branch ? 3 : service ? 2 : 1);
      setOpen(true);
    },
    [pathname]
  );

  // Preselecciona sucursal y arranca en el paso 1 (servicio); la sucursal queda
  // marcada en el paso 2 y sigue siendo cambiable. No rompe el flujo de pasos.
  const bookBranch = useCallback((branch: BranchKey) => {
    setData((d) => ({ ...emptyBooking, source: d.source, branch }));
    setServiceLocked(false);
    setBranchLocked(false);
    setStep(1);
    setOpen(true);
  }, []);

  const setSource = useCallback((source: string) => {
    setData((d) => ({ ...d, source }));
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const back = useCallback(() => {
    // Si la sucursal vino de ?suc= (branchLocked), el paso 2 se saltó: desde datos se
    // vuelve directo a servicio (paso 1), no a la sucursal.
    setStep((s) => (s === 3 ? (branchLocked ? 1 : 2) : s === 2 ? 1 : s));
  }, [branchLocked]);

  const next = useCallback(() => {
    // Desde servicio: si la sucursal ya vino de ?suc=, saltamos el paso 2 → datos.
    setStep((s) => (s === 1 ? (branchLocked ? 3 : 2) : s === 2 ? 3 : s));
  }, [branchLocked]);

  const selectService = useCallback((service: ServiceOption) => {
    setData((d) => ({ ...d, service }));
    // "Otro" requiere que el usuario escriba el detalle antes de avanzar.
    // Si la sucursal ya vino de ?suc= (branchLocked), saltamos el paso 2 → datos.
    if (service !== "Otro") setStep(branchLocked ? 3 : 2);
  }, [branchLocked]);

  const selectBranch = useCallback((branch: BranchKey) => {
    setData((d) => ({ ...d, branch }));
    setStep(3);
  }, []);

  const setField = useCallback((field: "name" | "phone" | "serviceOther", value: string) => {
    setData((d) => ({ ...d, [field]: value }));
  }, []);

  const submit = useCallback(() => {
    // 1) PRIMERO abrir WhatsApp — debe ser lo primero del handler del clic, sin nada
    //    async antes, o Safari móvil rompe la ligadura con el gesto y bloquea el popup.
    const url = buildWhatsAppUrl(data);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
    // 2) DESPUÉS el evento de conversión (puede disparar tags de red vía dataLayer).
    fireBookingConversion(data);
    setStep("success");
  }, [data]);

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
      serviceLocked,
      branchLocked,
      bookBranch,
      setSource,
      close,
      back,
      next,
      selectService,
      selectBranch,
      setField,
      submit,
    }),
    [open, step, data, openBooking, serviceLocked, branchLocked, bookBranch, setSource, close, back, next, selectService, selectBranch, setField, submit]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
      <BookingModal />
    </BookingContext.Provider>
  );
}
