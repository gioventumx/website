// Normalización de teléfono a E.164 (México) para Conversiones Avanzadas de Google Ads.
//
// ALCANCE: esto existe SOLO para el dato de usuario del dataLayer. El teléfono que se
// guarda y se envía (correo/CRM, mensaje de WhatsApp) sigue siendo el que teclea el
// usuario, sin tocar. No es un validador del formulario: la validación del paso 3 no
// depende de esta función y no debe endurecerse por ella.

/**
 * Normaliza un teléfono mexicano a E.164 (`+52##########`).
 *
 * Función pura, sin dependencias y sin efectos: nunca lanza. Devuelve `null` cuando el
 * número no encaja en ningún formato conocido — el llamador omite el dato de usuario y
 * el evento de conversión se dispara igual.
 *
 * Formatos aceptados (tras descartar todo lo que no sea dígito):
 *  · 10 dígitos            → `+52` + los 10        (lo que produce el formulario hoy)
 *  · 12 dígitos, inicia 52 → `+52` + los últimos 10 (ya trae lada de país)
 *  · 13 dígitos, inicia 521→ `+52` + los últimos 10 (formato viejo de WhatsApp: 52 + 1)
 *  · cualquier otro caso   → `null`
 */
export function normalizePhoneMX(raw: string): string | null {
  const digits = raw.replace(/\D/g, "");

  if (digits.length === 10) return `+52${digits}`;
  if (digits.length === 12 && digits.startsWith("52")) return `+52${digits.slice(-10)}`;
  if (digits.length === 13 && digits.startsWith("521")) return `+52${digits.slice(-10)}`;

  return null;
}
