"use client";

import { useState } from "react";
import { BookingButton } from "@/components/booking/BookingButton";
import { BranchChoice } from "@/components/booking/BranchChoice";
import { parseBranch, fireCallConversion, type BranchKey } from "@/data/booking";
import { site } from "@/data/site";

// tel: por sucursal derivado de la FUENTE ÚNICA TIPADA (site.branches[].key/.phone).
// Sin match por name: un cambio de tilde en el literal no rompería el número.
const telByKey = Object.fromEntries(
  site.branches.map((b) => {
    // Normaliza el tel: quita espacios/guiones pero CONSERVA un `+` si el literal ya
    // trae lada internacional. Sin `+` → anteponemos +52. El href queda sin espacios.
    const norm = b.phone.replace(/[^\d+]/g, "");
    return [b.key, norm.startsWith("+") ? norm : `+52${norm}`];
  })
) as Record<BranchKey, string>;

/**
 * Barra inferior tipo app — SOLO móvil (md:hidden), contenedor flotante despegado de
 * los bordes. Dos elementos: teléfono (secundario, círculo compacto) + Agendar
 * (primario, ocupa el resto). El ☰ vive en el header (llama al mismo openMenu()).
 *
 * · Teléfono → sucursal-aware como booking: parseBranch(?suc=). Con sucursal marca
 *   directo (tel:); sin sucursal abre una hoja que REUSA BranchChoice para elegir.
 *   En ambos casos emite `booking_call` (evento SEPARADO de booking_whatsapp) de forma
 *   SÍNCRONA justo antes del tel:.
 * · Agendar → BookingButton → openBooking() sin source (atribución igual que hoy).
 *
 * Footprint = alto pill (var(--bottomnav-h)) + gap (var(--bottomnav-gap)) + safe-area,
 * que casa con la reserva pb del <body>. z-40: debajo de drawer (60) y modales (70/80).
 */
export function BottomNav() {
  const [sheetOpen, setSheetOpen] = useState(false);

  // Marca una sucursal: evento SÍNCRONO primero, tel: después.
  const callBranch = (key: BranchKey) => {
    fireCallConversion(key);
    window.location.href = `tel:${telByKey[key]}`;
  };

  const onPhone = () => {
    // Sucursal resuelta como en booking (?suc=). Sin sucursal → hoja de selección.
    const branch = parseBranch(window.location.search);
    if (branch) callBranch(branch);
    else setSheetOpen(true);
  };

  const pickFromSheet = (key: BranchKey) => {
    setSheetOpen(false);
    callBranch(key); // el push va aquí: ya hay sucursal, justo antes de marcar
  };

  return (
    <>
      <nav
        aria-label="Navegación inferior"
        className="fixed inset-x-0 bottom-0 z-40 px-[var(--bottomnav-gap)] pb-[calc(var(--bottomnav-gap)_+_env(safe-area-inset-bottom))] md:hidden"
      >
        {/* UN solo contenedor flotante (ancho completo) con dos hijos: teléfono
            (secundario, círculo compacto a la izq) + Agendar (primario, ocupa el resto).
            El ☰ se fue al header. Cápsula clara, sombra mínima, aire parejo. */}
        <div className="flex h-[var(--bottomnav-h)] items-center gap-3 rounded-full border border-line bg-surface/95 px-2 shadow-[0_1px_2px_rgba(23,23,24,.06)] backdrop-blur-md">
          {/* TELÉFONO — secundario: círculo con fondo gris del sistema (sin borde, sin
              índigo), tappable. Lógica intacta (sucursal-aware + booking_call). */}
          <button
            type="button"
            aria-label="Llamar a la sucursal"
            onClick={onPhone}
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-ink/[0.08] text-brand transition-colors active:bg-ink/[0.14]"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden className="h-[27px] w-[27px]">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </button>

          {/* AGENDAR (índigo, primario): ocupa el resto del ancho. Ícono WA + texto,
              SIN la flecha del .btn */}
          <BookingButton
            variant="primary"
            className="h-11 flex-1 justify-center gap-2 whitespace-nowrap px-5 text-[0.9rem] [&::after]:hidden"
          >
            <span className="flex items-center gap-2">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className="h-[1.15em] w-[1.15em]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              {site.cta.label}
            </span>
          </BookingButton>
        </div>
      </nav>

      {/* HOJA de sucursal para LLAMAR — reusa BranchChoice. z-[75]: encima del nav (40),
          debajo del modal de agenda (80). Solo móvil. */}
      <div
        className={`fixed inset-0 z-[75] flex items-end justify-center p-4 transition-opacity duration-200 md:hidden ${
          sheetOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!sheetOpen}
        onClick={() => setSheetOpen(false)}
      >
        <div className="absolute inset-0 bg-black/50" />
        {/* Fondo BLANCO SÓLIDO (no glass): con el efecto glass el texto no se leía.
            NO se toca la utilidad .glass (de la que depende el header de desktop y
            otras piezas); solo ESTE contenedor cambia a blanco opaco, sin blur. */}
        <div
          data-lenis-prevent
          className="relative mb-[calc(var(--bottomnav-h)_+_2_*_var(--bottomnav-gap))] w-full max-w-md rounded-block border border-line bg-surface p-6 shadow-xl"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => setSheetOpen(false)}
            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full text-3xl leading-none text-ink/60 transition-colors hover:text-ink active:bg-ink/[0.06]"
          >
            ×
          </button>
          <h2 className="font-sans text-xl font-light text-ink text-center">Llámanos ahora</h2>
          <p className="mt-1 text-center text-[0.9rem] text-muted">
            Selecciona la sucursal de tu preferencia
          </p>
          <div className="mt-5">
            <BranchChoice onSelect={pickFromSheet} compact />
          </div>
        </div>
      </div>
    </>
  );
}
