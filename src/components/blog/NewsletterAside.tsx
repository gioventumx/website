"use client";

import { useState } from "react";

// Aside sticky del artículo: solo el newsletter "Mantente informada", con más
// presencia (más padding, título y formulario más grandes). El envío es placeholder
// (TODO backend).
export function NewsletterAside() {
  const [sent, setSent] = useState(false);

  return (
    <aside className="lg:sticky lg:top-24">
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
            className="mt-6"
          >
            <input
              type="email"
              required
              placeholder="Tu correo"
              aria-label="Tu correo"
              className="w-full rounded-full bg-white px-5 py-3.5 text-[0.98rem] text-ink shadow-sm outline-none placeholder:text-muted focus:ring-2 focus:ring-white/70"
            />
            <button
              type="submit"
              className="mt-3 w-full rounded-full bg-white py-3.5 text-[1rem] font-semibold text-brand transition-colors hover:bg-brand-tint"
            >
              Suscribirme
            </button>
          </form>
        )}
      </div>
    </aside>
  );
}
