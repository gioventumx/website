"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { lockLenis, unlockLenis } from "@/lib/lenis";

// Lightbox genérico para imagen ampliada. z-[78]: por debajo del BookingModal
// (z-[80]) a propósito — si el usuario agenda desde acá, el booking debe ganar.
//
// Se porta a document.body (como BookingModal, que al no tener wrapper DOM
// termina siendo hijo directo de <body>) porque algunos heroes usan
// MediaSurface, que tiene `isolation: isolate` (globals.css) — eso aísla a sus
// hijos (ej. HeroNotification) en su propio stacking context, y un z-index
// más alto en un div normal del árbol no basta para taparlos. Portalizar
// saca el lightbox de cualquier ancestro con isolation/transform/filter.
export function ImageLightbox({
  src,
  alt,
  onClose,
}: {
  src: string | null;
  alt: string;
  onClose: () => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!src) return;

    triggerRef.current = document.activeElement as HTMLElement | null;
    closeBtnRef.current?.focus();

    document.body.style.overflow = "hidden";
    // BookingNudge y WhatsAppFab son `position: fixed` con animaciones CSS
    // continuas; Chrome los promueve a su propia capa GPU y en algunos casos
    // esa capa pinta por encima de este overlay pese a tener menor z-index
    // (bug de compositing, no de stacking — el z-index/hit-testing ya es
    // correcto). Se ocultan explícitamente por CSS vía esta clase mientras
    // el lightbox está abierto, en vez de depender del z-index para taparlos.
    document.body.classList.add("lightbox-open");
    lockLenis();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;

      const focusable = panelRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      document.body.classList.remove("lightbox-open");
      unlockLenis();
      triggerRef.current?.focus();
    };
  }, [src, onClose]);

  if (!src) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={alt || "Imagen ampliada"}
      onClick={onClose}
      className="fixed inset-0 z-[78] flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/70" />

      <div
        ref={panelRef}
        onClick={(e) => e.stopPropagation()}
        data-lenis-prevent
        className="relative max-h-[calc(100dvh-2rem)] w-full max-w-2xl overflow-y-auto rounded-block bg-white p-2 shadow-2xl"
      >
        <button
          ref={closeBtnRef}
          type="button"
          aria-label="Cerrar"
          onClick={onClose}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-2xl leading-none text-white transition-colors hover:bg-black/70"
        >
          ×
        </button>

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          className="max-h-[calc(100dvh-4rem)] w-full rounded-[8px] object-contain"
        />
      </div>
    </div>,
    document.body
  );
}
