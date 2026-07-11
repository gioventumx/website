import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { bookingBranches, type BranchKey } from "@/data/booking";

// Notificación de leads por correo (best-effort). El canal REAL del lead es WhatsApp;
// este correo es una red de seguridad por si el mensaje de WhatsApp no llega. El cliente
// dispara este POST tras abrir WhatsApp y NUNCA espera la respuesta (ver submit() en
// BookingProvider), así que nada aquí puede frenar ni afectar la experiencia del usuario.
export const runtime = "nodejs";

const FROM = "Gioventù <noreply@gioventu.com.mx>";
// BCC fijo: reciben TODOS los leads sin importar la sucursal (el "to" sí varía por
// sucursal). Tres de SCNDAL + dos de Gioventù.
const BCC = [
  "andrea.r@scndal.com",
  "hola@scndal.com",
  "michel.l@scndal.com",
  "lili.v@gioventu.com.mx",
  "chepis.v@gioventu.com.mx",
];

// Destinatario por sucursal.
const BRANCH_TO: Record<BranchKey, string> = {
  antigua: "antigua@gioventu.com.mx",
  cuspide: "cuspide@gioventu.com.mx",
};

// Etiqueta de sucursal para el CRM: contrato acordado ("Antigua"/"Cúspide", con acento
// y mayúscula), NO la key interna. El mapeo se hace aquí (servidor) para no depender de
// lo que mande el cliente.
const BRANCH_CRM_LABEL: Record<BranchKey, "Antigua" | "Cúspide"> = {
  antigua: "Antigua",
  cuspide: "Cúspide",
};

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

  const subject = `Nuevo lead — ${service} — ${branchName}`;
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
          <tr><td style="padding:6px 10px 6px 0;color:#666">Servicio</td><td style="padding:6px 0">${esc(
            service
          )}</td></tr>
          ${
            treatment
              ? `<tr><td style="padding:6px 10px 6px 0;color:#666">Tratamiento</td><td style="padding:6px 0">${esc(
                  treatment
                )}</td></tr>`
              : ""
          }
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
        to: BRANCH_TO[branchKey],
        bcc: BCC,
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
  const sendCrm = async (): Promise<SendResult> => {
    const url = process.env.CRM_WEBHOOK_URL;
    if (!url) {
      console.error("lead: CRM_WEBHOOK_URL ausente");
      return { ok: false, error: "config" };
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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

  // allSettled (NO all): correo y CRM arrancan a la vez, ninguno bloquea al otro, y
  // ESPERAMOS a que AMBOS se asienten antes del return. Crítico en serverless: si la
  // función retornara antes, Vercel podría matar el POST al CRM a medias y el lead no
  // llegaría sin error visible. allSettled tolera que uno falle sin abortar al otro.
  const [emailR, crmR] = await Promise.allSettled([sendEmail(), sendCrm()]);
  const norm = (r: PromiseSettledResult<SendResult>): SendResult =>
    r.status === "fulfilled" ? r.value : { ok: false, error: "threw" };
  const email = norm(emailR);
  const crm = norm(crmR);

  // Best-effort: el cliente ignora la respuesta (WhatsApp ya se abrió). El status real
  // (502 si algo falló) sirve para que los logs de Vercel marquen el problema.
  const status = email.ok && crm.ok ? 200 : 502;
  return NextResponse.json(
    { email: email.ok ? "ok" : email.error, crm: crm.ok ? "ok" : crm.error },
    { status }
  );
}
