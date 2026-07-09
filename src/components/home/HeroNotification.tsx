"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useBooking } from "@/components/booking/BookingProvider";
import { getNotification } from "@/data/notifications";

// Notificación del hero. Botón real (teclado-accesible): abre el modal e inyecta el
// source de la ruta. Copy por config. Campana y punto verde son decorativos.
export function HeroNotification() {
  const pathname = usePathname();
  const n = getNotification(pathname);
  const { openBooking } = useBooking();
  const [show, setShow] = useState(false);

  // Aparece ~4.5s después de cargar y se queda visible
  useEffect(() => {
    const t = setTimeout(() => setShow(true), 4500);
    return () => clearTimeout(t);
  }, []);

  return (
    <button
      type="button"
      onClick={() => openBooking({ source: n.source, service: n.service })}
      aria-label={`${n.title}. ${n.body}`}
      className={`glass-dark absolute right-5 top-5 z-[3] flex max-w-[290px] items-center gap-3 rounded-card p-3.5 text-left text-white shadow-lg transition-all duration-700 ease-out max-[560px]:hidden motion-reduce:transition-none ${
        show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0 motion-reduce:translate-y-0"
      }`}
    >
      {/* Campana amarilla + badge rojo (decorativo) */}
      <span aria-hidden className="absolute -right-2 -top-2">
        <svg viewBox="0 0 24 24" fill="currentColor" className="animate-bell h-6 w-6 text-yellow-400 drop-shadow">
          <path d="M12 2a1 1 0 0 1 1 1v.6a6 6 0 0 1 5 5.9V13l1.4 2.5a1 1 0 0 1-.9 1.5H5.5a1 1 0 0 1-.9-1.5L6 13V9.5a6 6 0 0 1 5-5.9V3a1 1 0 0 1 1-1z" />
          <path d="M9.5 18.5a2.5 2.5 0 0 0 5 0z" />
        </svg>
        <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-brand-deep" />
      </span>

      {/* Indicador "en vivo" — punto verde pulsante (decorativo) */}
      <span aria-hidden className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75 motion-reduce:hidden" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
      </span>

      <span className="leading-tight">
        <span className="block text-sm font-medium">{n.title}</span>
        <span className="mt-0.5 block text-xs text-white/75">{n.body}</span>
      </span>
    </button>
  );
}
