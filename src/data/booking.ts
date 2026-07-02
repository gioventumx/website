// Config y tipos del formulario de agendamiento.
// El objeto `BookingData` es la fuente única de verdad del flujo (3 pasos) y
// queda listo para conectar después el envío por correo (Resend) + evento de
// conversión sin rehacer el formulario.

export type ServiceOption =
  | "Dermatología"
  | "Medicina Estética"
  | "Wellness Spa"
  | "Otro";

export type BranchKey = "antigua" | "cuspide";

export type BookingStep = 1 | 2 | 3 | "success";

export type BookingData = {
  service: ServiceOption | null;
  /** Texto libre cuando service === "Otro" */
  serviceOther: string;
  branch: BranchKey | null;
  name: string;
  phone: string;
};

export const emptyBooking: BookingData = {
  service: null,
  serviceOther: "",
  branch: null,
  name: "",
  phone: "",
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
  /** Número de WhatsApp con lada de país (52) para el link wa.me */
  wa: string;
};

export const bookingBranches: Record<BranchKey, BranchConfig> = {
  antigua: {
    name: "Gioventù Plaza Antigua",
    address:
      "Plaza Antigua 1, Av. Dr. Jiménez Cantú 212, Hacienda de Valle Escondido, 52938, Estado de México.",
    wa: "525561496600",
  },
  cuspide: {
    name: "Gioventù Plaza Cúspide",
    address:
      "Av. Lomas Verdes 1200, Local 53 C, Lomas Verdes, 53125, Estado de México.",
    wa: "525540583256",
  },
};

/** Construye el link de WhatsApp con el mensaje pre-armado a partir del estado. */
export function buildWhatsAppUrl(data: BookingData): string | null {
  if (!data.branch) return null;
  const branch = bookingBranches[data.branch];
  const text =
    `Hola, me interesa agendar una cita. ` +
    `Servicio: ${serviceLabel(data)}. ` +
    `Sucursal: ${branch.name}. ` +
    `Nombre: ${data.name}. ` +
    `Teléfono: ${data.phone}.`;
  return `https://wa.me/${branch.wa}?text=${encodeURIComponent(text)}`;
}
