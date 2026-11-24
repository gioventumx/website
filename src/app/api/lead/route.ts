import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { bookingBranches, type BranchKey } from "@/data/booking";
import { normalizePhoneMX } from "@/lib/phone";

// Notificación de leads por correo (best-effort). El canal REAL del lead es WhatsApp;
// este correo es una red de seguridad por si el mensaje de WhatsApp no llega. El cliente
// dispara este POST tras abrir WhatsApp y NUNCA espera la respuesta (ver submit() en
// BookingProvider), así que nada aquí puede frenar ni afectar la experiencia del usuario.
export const runtime = "nodejs";

const FROM = "Gioventù <noreply@gioventu.com.mx>";
// Destinatarios ÚNICOS de la notificación: todos los leads, de ambas sucursales, van a
// estas dos bandejas en un solo envío (sin CC/BCC). La sucursal se distingue por el ASUNTO.
const LEAD_RECIPIENTS = ["leads@scndal.com", "leads@gioventu.com.mx"];

// Etiqueta de sucursal para el CRM: contrato acordado ("Antigua"/"Cúspide", con acento
// y mayúscula), NO la key interna. El mapeo se hace aquí (servidor) para no depender de
// lo que mande el cliente.
const BRANCH_CRM_LABEL: Record<BranchKey, "Antigua" | "Cúspide"> = {
  antigua: "Antigua",
  cuspide: "Cúspide",
};

// Endpoint del CRM de SCNDAL. Va como constante y NO como variable de entorno: no es un
// secreto (el endpoint exige Bearer, ver CRM_WEBHOOK_SECRET abajo) y así hay una sola
// fuente de verdad, versionada y visible en el diff.
const CRM_WEBHOOK_URL = "https://api.scndal.com/leads/gioventu?source=website";

// Respond.io (bandeja única de WhatsApp): UNA sola llamada, el upsert del contacto por
// teléfono. El identificador va como `phone:+52XXXXXXXXXX` SIN codificar (así funciona en
// producción). Respond guarda los contactos de WhatsApp de este workspace como +52 + 10
// dígitos (sin el 1), así que el contacto creado aquí y el del chat son el mismo.
// Etiqueta y etapa de ciclo de vida NO se ponen desde aquí: las pone un workflow dentro de
// Respond a partir del campo `fuente` (llamarlas justo tras el upsert daba 449, el contacto
// aún se estaba procesando).
const RESPOND_UPSERT_URL = "https://api.respond.io/v2/contact/create_or_update/phone:";
const RESPOND_TIMEOUT_MS = 5_000;
// Valor del campo personalizado `fuente` para todo lead que entra por este formulario.
const RESPOND_SOURCE = "Formulario web";

/** Motivo de error de Respond, apto para logs: solo el `message`, con cualquier secuencia
 *  de 7+ dígitos y correos enmascarados (por si Respond eco-ea el identificador), recortado. */
async function respondErrorReason(res: Response): Promise<string> {
  try {
    const text = await res.text();
    let msg = text;
    try {
      const j = JSON.parse(text) as { message?: unknown };
      if (typeof j.message === "string") msg = j.message;
    } catch {
      /* no es JSON: usamos el texto */
    }
    return msg
      .replace(/\+?\d[\d\s-]{6,}\d/g, "[num]")
      .replace(/[^\s@]+@[^\s@]+/g, "[email]")
      .slice(0, 200);
  } catch {
    return "";
  }
}

/** POST a Respond: timeout de 5 s, SIN reintentos (un 429 se registra y ya), nunca lanza.
 *  Logs SIN PII: el status y el motivo enmascarado; jamás la URL (lleva el teléfono). */
async function respondPost(url: string, token: string, body: unknown): Promise<SendResult> {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(RESPOND_TIMEOUT_MS),
    });
    if (!res.ok) {
      const retryAfter = res.status === 429 ? res.headers.get("retry-after") : null;
      const reason = await respondErrorReason(res);
      console.error(
        "lead: Respond respondió con status",
        res.status,
        ...(retryAfter ? ["retry-after", retryAfter] : []),
        ...(reason ? ["motivo", reason] : [])
      );
      return { ok: false, error: `respond_${res.status}` };
    }
    return { ok: true };
  } catch (e) {
    const timedOut =
      e instanceof Error && (e.name === "TimeoutError" || e.name === "AbortError");
    console.error(
      "lead: excepción en Respond",
      timedOut ? "timeout" : e instanceof Error ? e.message : "desconocido"
    );
    return { ok: false, error: timedOut ? "respond_timeout" : "respond_threw" };
  }
}

// Valor del campo personalizado `sucursal` en Respond: EXACTO y SIN acento (lo lee la IA y
// las automatizaciones). Distinto a propósito de BRANCH_CRM_LABEL.
const BRANCH_RESPOND_LABEL: Record<BranchKey, "Antigua" | "Cuspide"> = {
  antigua: "Antigua",
  cuspide: "Cuspide",
};

// Lista blanca del campo personalizado `servicio` (tipo lista) en Respond: valores EXACTOS
// permitidos. Un valor fuera de lista puede hacer que Respond rechace TODA la llamada, así
// que lo que no coincida se omite.
const RESPOND_SERVICES = new Set([
  "Dermatología",
  "Medicina Estética",
  "Wellness Spa",
  "Faciales",
  "Masajes",
  "Depilación Láser",
  "Otro",
]);

/** Servicio para Respond: "Otro"/"Otro: <texto>" → "Otro" (NUNCA el texto libre); valor de
 *  la lista blanca → tal cual; "-", vacío o fuera de lista → null (se omite el campo). */
function respondService(service: string): string | null {
  if (service.startsWith("Otro")) return "Otro";
  return RESPOND_SERVICES.has(service) ? service : null;
}

// Rate limit en memoria por IP (ventana deslizante). Suficiente para el volumen de un
// endpoint interno de un centro; efectivo por instancia de función (Fluid Compute
// comparte memoria entre requests concurrentes de la misma instancia, no globalmente).
// Si el spam se vuelve un problema, migrar a Upstash Redis para un límite global exacto
// sin tocar el cliente.
const RATE_LIMIT = 5; // peticiones
const RATE_WINDOW_MS = 60_000; // por minuto
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // Poda oportunista para que el Map no crezca sin límite.
  if (hits.size > 5_000) {
    for (const [k, v] of hits) {
      if (v.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(k);
    }
  }
  return recent.length > RATE_LIMIT;
}

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  branch?: unknown;
  service?: unknown;
  treatment?: unknown;
  source?: unknown;
  gclid?: unknown;
};

type SendResult = { ok: boolean; error?: string };

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: LeadPayload;
  try {
    body = (await req.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  // Validación en servidor. No confiamos en el cliente.
  const name = typeof body.name === "string" ? body.name.trim() : "";
  const rawPhone = typeof body.phone === "string" ? body.phone : "";
  const phone = rawPhone.replace(/\D/g, ""); // solo dígitos
  const branch = body.branch;
  const service = typeof body.service === "string" ? body.service.trim() : "";
  const treatment =
    typeof body.treatment === "string" ? body.treatment.trim() : "";
  const source = typeof body.source === "string" ? body.source.trim() : "";
  // gclid es OPCIONAL: solo llega desde anuncios. Nunca operamos sobre él sin la guarda
  // de tipo; ausente → "" (nunca undefined, para mandarlo siempre como string al CRM).
  const gclid = typeof body.gclid === "string" ? body.gclid.trim() : "";

  const isBranch = branch === "antigua" || branch === "cuspide";
  if (!name || !service || !isBranch || phone.length !== 10) {
    // No incluir el valor de los campos en el error (evita reflejar PII).
    return NextResponse.json({ error: "validation" }, { status: 400 });
  }
  const branchKey = branch as BranchKey;

  const branchName = bookingBranches[branchKey].name;
  const when = new Intl.DateTimeFormat("es-MX", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "America/Mexico_City",
  }).format(new Date());

  // Wellness Spa genérico (sin faciales/masajes por ruta): versión corta para que
  // recepción lo distinga desde la bandeja sin abrir el correo.
  const serviceSubject =
    service === "Wellness Spa" ? "Wellness (Faciales o Masajes)" : service;
  // La sucursal va PRIMERO en el asunto: ya no se distingue por destinatario.
  const subject = `Nuevo lead · ${BRANCH_CRM_LABEL[branchKey]} · ${serviceSubject}`;
  // Solo para el correo: si el lead es "Wellness Spa" sin subservicio (viene de faciales
  // o masajes por ruta cuando sí se sabe), dejamos claro que no se especificó cuál.
  const serviceDisplay =
    service === "Wellness Spa"
      ? `${esc(service)} (Faciales o Masajes — no especificado)`
      : esc(service);
  const html = `
    <div style="font-family:system-ui,-apple-system,'Segoe UI',sans-serif;color:#1a1a1a;line-height:1.55;max-width:560px">
      <p style="background:#fff6e6;border:1px solid #f0d089;border-radius:8px;padding:12px 14px;margin:0 0 18px">
        <strong>Este lead debió llegar por WhatsApp.</strong> Si no llega el mensaje, contáctalo cuanto antes.
      </p>
      <h2 style="margin:0 0 14px;font-size:18px">Nuevo lead</h2>
      <table style="border-collapse:collapse;width:100%">
        <tbody>
          <tr><td style="padding:6px 10px 6px 0;color:#666">Nombre</td><td style="padding:6px 0"><strong>${esc(
            name
          )}</strong></td></tr>
          <tr><td style="padding:6px 10px 6px 0;color:#666">Teléfono</td><td style="padding:6px 0">
            <a href="tel:+52${phone}">${esc(phone)}</a>
            &nbsp;·&nbsp;
            <a href="https://wa.me/52${phone}">WhatsApp</a>
          </td></tr>
          <tr><td style="padding:6px 10px 6px 0;color:#666">Servicio</td><td style="padding:6px 0">${serviceDisplay}</td></tr>
          <tr><td style="padding:6px 10px 6px 0;color:#666">Tratamiento</td><td style="padding:6px 0">${
            treatment ? esc(treatment) : "No Especificado"
          }</td></tr>
          <tr><td style="padding:6px 10px 6px 0;color:#666">Sucursal</td><td style="padding:6px 0">${esc(
            branchName
          )}</td></tr>
          <tr><td style="padding:6px 10px 6px 0;color:#666">Origen</td><td style="padding:6px 0">${esc(
            source || "—"
          )}</td></tr>
          <tr><td style="padding:6px 10px 6px 0;color:#666">Fecha</td><td style="padding:6px 0">${esc(
            when
          )}</td></tr>
        </tbody>
      </table>
    </div>`;

  // Envío por correo (Resend). Autocontenido y SIN throw: siempre devuelve SendResult,
  // para que un fallo aquí no impida el envío al CRM.
  const sendEmail = async (): Promise<SendResult> => {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.error("lead: RESEND_API_KEY ausente");
      return { ok: false, error: "config" };
    }
    try {
      const resend = new Resend(apiKey);
      const { error } = await resend.emails.send({
        from: FROM,
        to: LEAD_RECIPIENTS,
        subject,
        html,
      });
      if (error) {
        // Log SIN PII: solo el motivo de Resend, nunca nombre ni teléfono.
        console.error("lead: fallo de Resend", error.name, error.message);
        return { ok: false, error: "resend" };
      }
      return { ok: true };
    } catch (e) {
      console.error(
        "lead: excepción en Resend",
        e instanceof Error ? e.message : "desconocido"
      );
      return { ok: false, error: "resend_threw" };
    }
  };

  // Envío al CRM de SCNDAL (webhook). Autocontenido y SIN throw. El body usa las keys
  // EXACTAS del contrato con el CRM (no cambiar). tratamiento/gclid van como "" si faltan
  // (nunca omitidos). telefono: 10 dígitos crudos, sin +52 (el CRM normaliza de su lado).
  // El endpoint exige "Authorization: Bearer <CRM_WEBHOOK_SECRET>". La variable NO lleva
  // prefijo NEXT_PUBLIC_ y solo se lee aquí (route handler, runtime nodejs): el secreto
  // nunca entra al bundle del cliente.
  const sendCrm = async (): Promise<SendResult> => {
    const secret = process.env.CRM_WEBHOOK_SECRET;
    // Si falta el secreto se envía IGUAL, sin la cabecera, y el CRM responde 401. A
    // propósito: un 401 en los logs es rastreable, un envío que nunca ocurrió no lo es.
    // No conviertas esto en un return temprano.
    if (!secret) {
      console.error("lead: CRM_WEBHOOK_SECRET ausente; se envía sin auth (se espera 401)");
    }
    try {
      const res = await fetch(CRM_WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(secret ? { Authorization: `Bearer ${secret}` } : {}),
        },
        body: JSON.stringify({
          nombre: name,
          telefono: phone,
          servicio: service,
          tratamiento: treatment,
          sucursal: BRANCH_CRM_LABEL[branchKey],
          gclid,
        }),
      });
      if (!res.ok) {
        console.error("lead: CRM respondió con status", res.status);
        return { ok: false, error: `crm_${res.status}` };
      }
      return { ok: true };
    } catch (e) {
      console.error(
        "lead: excepción en CRM",
        e instanceof Error ? e.message : "desconocido"
      );
      return { ok: false, error: "crm_threw" };
    }
  };

  // Respond.io: upsert del contacto. Autocontenido y SIN throw. Solo identidad + sucursal +
  // categoría de servicio (lista blanca) + fuente. NUNCA tratamiento, texto libre de
  // "Otro", origen de campaña ni ningún otro dato. Se espera (await, vía allSettled) antes de
  // responder: en Vercel lo no esperado puede no ejecutarse.
  const sendRespond = async (): Promise<SendResult> => {
    const token = process.env.RESPOND_IO_API_TOKEN;
    if (!token) {
      console.error("lead: RESPOND_IO_API_TOKEN ausente; se omite Respond");
      return { ok: false, error: "config" };
    }
    const e164 = normalizePhoneMX(phone);
    if (!e164) {
      console.error("lead: teléfono no normalizable a E.164; se omite Respond");
      return { ok: false, error: "respond_skipped" };
    }
    const sucursal = branchKey ? BRANCH_RESPOND_LABEL[branchKey] : undefined;
    const servicio = respondService(service);
    const customFields = [
      ...(sucursal ? [{ name: "sucursal", value: sucursal }] : []),
      ...(servicio ? [{ name: "servicio", value: servicio }] : []),
      { name: "fuente", value: RESPOND_SOURCE },
    ];
    return respondPost(`${RESPOND_UPSERT_URL}${e164}`, token, {
      firstName: name || "Lead web",
      phone: e164,
      countryCode: "MX",
      language: "es",
      custom_fields: customFields,
    });
  };

  // allSettled (NO all): correo, CRM y Respond arrancan a la vez, ninguno bloquea al otro, y
  // ESPERAMOS a que TODOS se asienten antes del return. Crítico en serverless: si la
  // función retornara antes, Vercel podría matar el POST al CRM a medias y el lead no
  // llegaría sin error visible. allSettled tolera que uno falle sin abortar al otro.
  const [emailR, crmR, respondR] = await Promise.allSettled([
    sendEmail(),
    sendCrm(),
    sendRespond(),
  ]);
  const norm = (r: PromiseSettledResult<SendResult>): SendResult =>
    r.status === "fulfilled" ? r.value : { ok: false, error: "threw" };
  const email = norm(emailR);
  const crm = norm(crmR);
  const respond = norm(respondR);

  // Best-effort: el cliente ignora la respuesta (WhatsApp ya se abrió). El status real
  // (502 si algo falló) sirve para que los logs de Vercel marquen el problema. Respond NO
  // cuenta para el status (es complementario); va en el JSON solo como diagnóstico.
  const status = email.ok && crm.ok ? 200 : 502;
  return NextResponse.json(
    {
      email: email.ok ? "ok" : email.error,
      crm: crm.ok ? "ok" : crm.error,
      respond: respond.ok ? "ok" : respond.error,
    },
    { status }
  );
}
