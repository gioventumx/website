// Notificación de social proof (variante hero + flotante). El copy entra por RUTA
// (cada vertical tendrá el suyo). Al hacer click abre el modal e inyecta `source`
// para atribución/medición (mismo patrón que BookingSource).

import type { ServiceOption } from "./booking";

export type NotifConfig = {
  title: string;
  body: string;
  /** source de atribución que se inyecta al abrir el modal. */
  source: string;
  /** servicio preseleccionado (opcional; salta al paso 2 en el modal). */
  service?: ServiceOption;
};

export const notifications: Record<string, NotifConfig> = {
  "/": {
    title: "Disponibilidad limitada esta semana",
    body: "Nuestros especialistas atienden por cita. Reserva la tuya.",
    source: "home:notificacion",
  },
  "/dermatologia/": {
    title: "Disponibilidad limitada esta semana",
    body: "Nuestros dermatólogos atienden por cita. Reserva tu valoración.",
    source: "dermatologia:notificacion",
    service: "Dermatología",
  },
  "/estetica/": {
    title: "Disponibilidad limitada esta semana",
    body: "Nuestros especialistas atienden por cita. Reserva tu valoración.",
    source: "estetica:notificacion",
    service: "Medicina Estética",
  },
  "/wellness/faciales/": {
    title: "Disponibilidad limitada esta semana",
    body: "Nuestras cosmetólogas atienden por cita. Reserva tu facial.",
    source: "faciales:notificacion",
    service: "Wellness Spa",
  },
  "/wellness/": {
    title: "Disponibilidad limitada esta semana",
    body: "Reserva tu experiencia de wellness por cita.",
    source: "wellness:notificacion",
    service: "Wellness Spa",
  },
  "/wellness/masajes/": {
    title: "Disponibilidad limitada esta semana",
    body: "Nuestros masajistas atienden por cita. Reserva tu masaje.",
    source: "masajes:notificacion",
    service: "Wellness Spa",
  },
};

/** Config de la ruta actual (normaliza trailing slash). Fallback: Home. */
export function getNotification(pathname: string): NotifConfig {
  const p = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return notifications[p] ?? notifications["/"];
}
