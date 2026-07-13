import type Lenis from "lenis";

// Instancia única de Lenis (solo existe en desktop; null en móvil / reduced-motion).
let instance: Lenis | null = null;
let lockCount = 0;

export function setLenis(l: Lenis | null) {
  instance = l;
}

/** Pausa el smooth scroll (para modales). Usa contador por si hay varios abiertos. */
export function lockLenis() {
  lockCount += 1;
  instance?.stop();
}

/** Reanuda cuando ya no queda ningún bloqueo activo. */
export function unlockLenis() {
  lockCount = Math.max(0, lockCount - 1);
  if (lockCount === 0) instance?.start();
}

/** Scroll suave a un elemento; devuelve false si Lenis no está activo (fallback nativo). */
export function lenisScrollTo(target: HTMLElement, offset = 0) {
  if (!instance) return false;
  instance.scrollTo(target, { offset });
  return true;
}
