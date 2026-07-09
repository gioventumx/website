"use client";

import { useState } from "react";

// Aside sticky del artículo: solo el newsletter "Mantente informada". El envío es
// placeholder (TODO backend).
export function NewsletterAside() {
  const [sent, setSent] = useState(false);

  // Offset sticky = margen superior de la tarjeta glass del header (top-5 = 20px) +
  // su altura (74px) + espacio para respirar (~24px) = 118px. Evita que la tarjeta
  // quede pegada al header al hacer scroll.
  return (
    <aside className="lg:sticky lg:top-[118px]">
      <div className="rounded-block bg-brand p-8 text-white md:p-10">
        <h3 className="font-accent text-[1.7rem] font-semibold not-italic leading-tight">
          Mantente <span className="font-accent block italic">informada</span>
        </h3>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-brand-tint">
          Todo lo que necesitas saber de tu piel, directo a tu correo. Sin filtros, sin relleno.
        </p>

        {sent ? (
          <p className="mt-6 rounded-full bg-white/15 px-5 py-3.5 text-center text-[0.95rem] font-medium">
            ¡Listo! Gracias por suscribirte.
          </p>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="mt-6 flex items-stretch gap-2"
          >
            <input
              type="email"
              required
              placeholder="Tu correo"
              aria-label="Tu correo"
              className="min-w-0 flex-1 rounded-full bg-white px-5 py-3.5 text-[0.98rem] text-ink shadow-sm outline-none placeholder:text-muted focus:ring-2 focus:ring-white/70"
            />
            <button
              type="submit"
              aria-label="Suscribirme"
              className="flex aspect-square w-[52px] shrink-0 items-center justify-center rounded-[14px] bg-white text-brand transition-colors hover:bg-brand-tint focus:ring-2 focus:ring-white/70"
            >
              {/* Icono flecha (decorativo; el texto accesible va en aria-label) */}
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-5 w-5"
                aria-hidden
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
        )}
      </div>
    </aside>
  );
}
