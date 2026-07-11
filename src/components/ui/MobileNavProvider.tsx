"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

// Estado del drawer móvil elevado a contexto: es la ÚNICA fuente de verdad del
// abierto/cerrado del menú, compartida entre el toggle de desktop (en Header) y el
// toggle del bottom nav (móvil). El markup del drawer sigue viviendo una sola vez
// dentro de Header, que lee `menuOpen` de aquí; nadie duplica el overlay ni forkea
// el estado.
type MobileNavContextValue = {
  menuOpen: boolean;
  openMenu: () => void;
  closeMenu: () => void;
};

const MobileNavContext = createContext<MobileNavContextValue | null>(null);

export function useMobileNav() {
  const ctx = useContext(MobileNavContext);
  if (!ctx) throw new Error("useMobileNav debe usarse dentro de <MobileNavProvider>");
  return ctx;
}

export function MobileNavProvider({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const openMenu = useCallback(() => setMenuOpen(true), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const value = useMemo(
    () => ({ menuOpen, openMenu, closeMenu }),
    [menuOpen, openMenu, closeMenu]
  );
  return <MobileNavContext.Provider value={value}>{children}</MobileNavContext.Provider>;
}
