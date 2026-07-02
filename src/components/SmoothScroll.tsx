"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { setLenis, lenisScrollTo } from "@/lib/lenis";

/**
 * Smooth scroll (Lenis) SOLO en desktop con puntero fino.
 * En móvil/táctil y con prefers-reduced-motion queda el scroll nativo.
 * Las anclas usan lenis.scrollTo cuando está activo, con fallback nativo.
 */
export function SmoothScroll() {
  useEffect(() => {
    const desktopMq = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const reduceMq = window.matchMedia("(prefers-reduced-motion: reduce)");

    let lenis: Lenis | null = null;
    let rafId = 0;

    const raf = (time: number) => {
      lenis?.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    const enable = () => {
      if (lenis) return;
      if (!desktopMq.matches || reduceMq.matches) return;
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      setLenis(lenis);
      rafId = requestAnimationFrame(raf);
    };

    const disable = () => {
      if (!lenis) return;
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenis = null;
      setLenis(null);
    };

    const update = () => {
      if (desktopMq.matches && !reduceMq.matches) enable();
      else disable();
    };

    update();
    desktopMq.addEventListener("change", update);
    reduceMq.addEventListener("change", update);

    // Anclas: scroll suave con Lenis; fallback nativo si no está activo.
    const onClick = (e: MouseEvent) => {
      const el = e.target as HTMLElement | null;
      const anchor = el?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;
      let dest: Element | null = null;
      try {
        dest = document.querySelector(href);
      } catch {
        return;
      }
      if (!(dest instanceof HTMLElement)) return;
      e.preventDefault();
      if (!lenisScrollTo(dest)) {
        dest.scrollIntoView({ behavior: reduceMq.matches ? "auto" : "smooth" });
      }
    };
    document.addEventListener("click", onClick);

    return () => {
      desktopMq.removeEventListener("change", update);
      reduceMq.removeEventListener("change", update);
      document.removeEventListener("click", onClick);
      disable();
    };
  }, []);

  return null;
}
