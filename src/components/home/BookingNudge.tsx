"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getNotification } from "@/data/notifications";
import { useBooking } from "@/components/booking/BookingProvider";

/**
 * CTA de reserva flotante que reaparece fijo abajo-izquierda al hacer scroll
 * más allá del hero. Flota y vibra para captar la atención; al hacer click abre
 * el modal de agendar cita. Se oculta mientras el modal está abierto.
 */
export function BookingNudge() {
  const pathname = usePathname();
  const n = getNotification(pathname);
  const { openBooking, open } = useBooking();
  const [scrolled, setScrolled] = useState(false);
  const [atFooter, setAtFooter] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Deja de acompañar al llegar al footer.
  useEffect(() => {
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(
      ([entry]) => setAtFooter(entry.isIntersecting),
      { threshold: 0 }
    );
    io.observe(footer);
    return () => io.disconnect();
  }, []);

  const visible = scrolled && !open && !atFooter;

  return (
    <div
      className={`fixed bottom-5 left-5 z-40 max-[560px]:hidden transition-all duration-500 ease-out motion-reduce:transition-none ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0 motion-reduce:translate-y-0"
      }`}
    >
      <button
        type="button"
        onClick={() => openBooking({ source: n.source, service: n.service })}
        aria-label={`${n.title}. ${n.body}`}
        className="nudge-float relative flex max-w-[290px] items-center gap-3 rounded-card border border-line bg-white p-3.5 text-left text-ink shadow-xl transition-shadow hover:shadow-2xl"
      >
        {/* Campana amarilla + badge rojo (decorativo) */}
        <span aria-hidden className="absolute -right-2 -top-2">
          <svg viewBox="0 0 24 24" fill="currentColor" className="animate-bell h-6 w-6 text-yellow-400 drop-shadow">
            <path d="M12 2a1 1 0 0 1 1 1v.6a6 6 0 0 1 5 5.9V13l1.4 2.5a1 1 0 0 1-.9 1.5H5.5a1 1 0 0 1-.9-1.5L6 13V9.5a6 6 0 0 1 5-5.9V3a1 1 0 0 1 1-1z" />
            <path d="M9.5 18.5a2.5 2.5 0 0 0 5 0z" />
          </svg>
          <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
        </span>

        {/* Indicador "en vivo" — punto verde pulsante (decorativo) */}
        <span aria-hidden className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75 motion-reduce:hidden" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
        </span>

        <span className="leading-tight">
          <span className="block text-sm font-medium">{n.title}</span>
          <span className="mt-0.5 block text-xs text-muted">{n.body}</span>
        </span>
      </button>
    </div>
  );
}
