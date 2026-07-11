// Config y tipos del formulario de agendamiento.
// El objeto `BookingData` es la fuente única de verdad del flujo (3 pasos) y
// queda listo para conectar después el envío por correo (Resend) + evento de
// conversión sin rehacer el formulario.

// BranchKey vive en types.ts (fuente única del tipo); se re-exporta aquí para no
// romper los múltiples `import { BranchKey } from "@/data/booking"` existentes.
import type { BranchKey } from "./types";
export type { BranchKey };

export type ServiceOption =
  | "Dermatología"
  | "Medicina Estética"
  | "Wellness Spa"
  | "Faciales"
  | "Masajes"
  | "Depilación Láser"
  | "Otro";

// Servicio inferido por LANDING (pathname → servicio). Cualquier apertura del modal
// en esa ruta preselecciona el servicio y salta el paso 1. El Home y el hub /wellness/
// NO están aquí a propósito: sí preguntan el servicio.
export const landingServices: Record<string, ServiceOption> = {
  "/dermatologia/": "Dermatología",
  "/estetica/": "Medicina Estética",
  "/wellness/faciales/": "Faciales",
  "/wellness/masajes/": "Masajes",
  "/depilacion-laser/": "Depilación Láser",
};

/** Servicio de la landing actual (normaliza trailing slash). Null = pregunta servicio. */
export function getLandingService(pathname: string): ServiceOption | null {
  const p = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return landingServices[p] ?? null;
}

/**
 * Lee y valida ?suc= de un query string. Robusto al orden y a otros parámetros
 * (gclid, utm_*): usa URLSearchParams. Normaliza a minúsculas y valida contra la
 * whitelist; cualquier valor inválido/ausente → null (no rompe nada).
 */
export function parseBranch(search: string): BranchKey | null {
  const raw = new URLSearchParams(search).get("suc")?.trim().toLowerCase();
  return raw === "antigua" || raw === "cuspide" ? raw : null;
}

export type BookingStep = 1 | 2 | 3 | "success";

export type BookingData = {
  service: ServiceOption | null;
  /** Texto libre cuando service === "Otro" */
  serviceOther: string;
  branch: BranchKey | null;
  /** Tratamiento específico (ej. "Melasma") cuando se abre desde una tarjeta. El
   *  servicio sigue siendo la categoría; el tratamiento es el detalle. Vacío si se
   *  abrió desde un CTA genérico. */
  treatment: string;
  name: string;
  phone: string;
  /** Origen de campaña (ej. ?suc= de la landing) para medición del lead. */
  source: string;
};

export const emptyBooking: BookingData = {
  service: null,
  serviceOther: "",
  branch: null,
  treatment: "",
  name: "",
  phone: "",
  source: "",
};

export const bookingServices: ServiceOption[] = [
  "Dermatología",
  "Medicina Estética",
  "Wellness Spa",
  "Otro",
];

/** Etiqueta del servicio para mensajes; si es "Otro" usa el texto libre. */
export function serviceLabel(data: BookingData): string {
  if (data.service === "Otro") {
    const other = data.serviceOther.trim();
    return other ? `Otro: ${other}` : "Otro";
  }
  return data.service ?? "-";
}

export type BranchConfig = {
  name: string;
  address: string;
  /** Horario de atención (texto para mostrar). */
  hours: string;
  /** Número de WhatsApp con lada de país (52) para el link wa.me */
  wa: string;
};

export const bookingBranches: Record<BranchKey, BranchConfig> = {
  antigua: {
    name: "Gioventù Plaza Antigua",
    address:
      "Plaza Antigua 1, Av. Dr. Jiménez Cantú 212, Hacienda de Valle Escondido, 52938, Estado de México.",
    hours: "Lun–Vie 10:30–19:30 · Sáb 10:30–15:30",
    wa: "525561496600",
  },
  cuspide: {
    name: "Gioventù Plaza Cúspide",
    address:
      "Av. Lomas Verdes 1200, Local 53 C, Lomas Verdes, 53125, Estado de México.",
    hours: "Lun–Vie 10:00–19:00 · Sáb 9:00–14:00",
    wa: "525540583256",
  },
};

/** Construye el link de WhatsApp con el mensaje pre-armado a partir del estado. */
export function buildWhatsAppUrl(data: BookingData): string | null {
  if (!data.branch) return null;
  const branch = bookingBranches[data.branch];
  // NO incluye el origen de campaña: es atribución interna (la paciente vería
  // "Origen: dermatologia:antigua" en su chat). El `source` va solo al evento de
  // conversión / dataLayer (ver fireBookingConversion). `Servicio:` y `Tratamiento:`
  // son líneas condicionales: el servicio es la categoría, el tratamiento el detalle.
  const text = [
    "Hola, me interesa agendar una cita.",
    data.service ? `Servicio: ${serviceLabel(data)}.` : null,
    data.treatment ? `Tratamiento: ${data.treatment}.` : null,
    `Sucursal: ${branch.name}.`,
    `Nombre: ${data.name}.`,
    `Teléfono: ${data.phone}.`,
  ]
    .filter(Boolean)
    .join(" ");
  return `https://wa.me/${branch.wa}?text=${encodeURIComponent(text)}`;
}

/**
 * Evento de conversión del lead. Se dispara al ENVIAR (cuando abrimos WhatsApp con los
 * datos completos) — la única acción que la web puede observar; no sabemos si el
 * usuario manda el mensaje en WhatsApp. Empuja a dataLayer para GTM/GA4.
 * TODO: conectar el ID/conversión real de Ads cuando esté disponible.
 */
export function fireBookingConversion(data: BookingData): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({
    event: "booking_whatsapp",
    service: serviceLabel(data),
    treatment: data.treatment || "",
    branch: data.branch ?? "",
    source: data.source || "",
  });
}

/**
 * Evento de LLAMADA (bottom nav móvil). SEPARADO de booking_whatsapp: es su propio
 * evento con su propio source. Debe empujarse SÍNCRONO en el handler del clic, ANTES
 * de disparar el `tel:` (o justo tras elegir sucursal, antes de marcar). NO crea la
 * conversión de Ads: solo emite el evento; la conversión se configura en GTM/Ads.
 */
export function fireCallConversion(branch: BranchKey, source = "bottomnav-telefono"): void {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] };
  w.dataLayer = w.dataLayer ?? [];
  w.dataLayer.push({ event: "booking_call", branch, source });
}
