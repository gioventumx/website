"use client";

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookingButton } from "@/components/booking/BookingButton";
import { useBooking } from "@/components/booking/BookingProvider";
import { lockLenis, unlockLenis } from "@/lib/lenis";
import { site } from "@/data/site";
import { getVertical } from "@/data/verticals";

const overlayItems = [
  { label: "Sucursales", type: "modal" as const },
  { label: "Nosotros", type: "link" as const, href: "/conocenos/" },
  { label: "Blog", type: "link" as const, href: "/blog/" },
];

const telHref = (n: string) => `tel:${n.replace(/\s/g, "")}`;
const waHref = (n: string) => `https://wa.me/52${n.replace(/\D/g, "")}`;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sucursalesOpen, setSucursalesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { openBooking } = useBooking();

  // Vertical (ej. /dermatologia/): el header muestra índice de anclas y las opciones
  // de vertical se mueven al toggle. Otras páginas: header normal (site.nav).
  const pathname = usePathname();
  const vertical = getVertical(pathname);
  const pillItems = vertical
    ? vertical.anchors.map((a) =>
        a.href
          ? { label: a.label, href: a.href, anchor: false } // enlace a página (hub)
          : { label: a.label, href: `#${a.id}`, anchor: true } // ancla a sección
      )
    : site.nav.map((n) => ({ label: n.label, href: n.href, anchor: false }));
  // En verticales, las opciones de vertical se agregan al overlay del toggle.
  const overlayList = vertical
    ? [...site.nav.map((n) => ({ label: n.label, type: "link" as const, href: n.href })), ...overlayItems]
    : overlayItems;

  // Hairline inferior solo al scrollear (para no pesar sobre el hero en el top).
  // Con Lenis en modo raíz, window.scrollY se actualiza y el evento scroll dispara.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Bloquea el scroll del body (y el smooth scroll) mientras haya overlay/modal abierto
  useEffect(() => {
    if (!(menuOpen || sucursalesOpen)) return;
    document.body.style.overflow = "hidden";
    lockLenis();
    return () => {
      document.body.style.overflow = "";
      unlockLenis();
    };
  }, [menuOpen, sucursalesOpen]);

  // Escape cierra primero el modal, luego el menú
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (sucursalesOpen) setSucursalesOpen(false);
      else if (menuOpen) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen, sucursalesOpen]);

  const closeAll = () => {
    setSucursalesOpen(false);
    setMenuOpen(false);
  };

  return (
    <>
      {/* Outer sticky de altura constante (74px) → sin saltos de layout. El gap
          SUPERIOR en scroll se logra con el offset `top` del sticky (NO transform),
          para no romper el backdrop-filter del glass del inner. */}
      <header
        className={`sticky z-50 transition-[top] duration-300 ease-out ${
          scrolled ? "top-3 md:top-5" : "top-0"
        }`}
      >
        {/* Inner: reposo = barra bg-bg a ancho completo (idéntico a ahora).
            Scroll = tarjeta glass insetada (mx). Blur INTENSIFICADO para diagnóstico. */}
        <div
          className={`flex h-[74px] items-center justify-between transition-all duration-300 ease-out ${
            scrolled
              ? "glass mx-3 bg-white/90 px-5 backdrop-blur-[24px] md:mx-5 md:bg-white/70 md:px-8"
              : "bg-bg px-6 md:px-10"
          }`}
        >
          {/* IZQUIERDA — toggle + logo, pegados al extremo */}
          <div className="flex items-center gap-3 md:gap-4">
            <button
              type="button"
              aria-label="Abrir menú"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="flex flex-col gap-[5px]"
            >
              <span className="h-[2.5px] w-6 rounded-sm bg-brand" />
              <span className="h-[2.5px] w-6 rounded-sm bg-brand" />
              <span className="h-[2.5px] w-6 rounded-sm bg-brand" />
            </button>

            <span aria-hidden className="h-6 w-px bg-line" />

            <Link href="/">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={site.brand.logo} alt={site.brand.name} className="h-4 w-auto md:h-5" />
            </Link>
          </div>

          {/* DERECHA — pastilla de menú glass + CTA, pegados al extremo */}
          <div className="flex items-center gap-6 lg:gap-8">
            <nav className="relative max-[900px]:hidden">
              {/* Fondo píldora glass como CAPA aparte: solo se DESVANECE (opacity) al
                  hacer sticky, sin morphear forma/borde (evita el artefacto de "línea").
                  La forma del nav (padding/redondeo) es constante. */}
              <span
                aria-hidden
                className={`glass absolute inset-0 rounded-full transition-opacity duration-300 ${
                  scrolled ? "opacity-0" : "opacity-100"
                }`}
              />
              <ul className="relative flex items-center px-6 py-2.5">
                {pillItems.map((item, i) => (
                  <Fragment key={item.label}>
                    {i > 0 && (
                      <li aria-hidden className="mx-[16px] h-3.5 w-px bg-ink/20" />
                    )}
                    <li>
                      {item.anchor ? (
                        <a
                          href={item.href}
                          className="text-[0.92rem] font-medium text-ink transition-colors hover:text-brand"
                        >
                          {item.label}
                        </a>
                      ) : (
                        <Link
                          href={item.href}
                          className="text-[0.92rem] font-medium text-ink transition-colors hover:text-brand"
                        >
                          {item.label}
                        </Link>
                      )}
                    </li>
                  </Fragment>
                ))}
              </ul>
            </nav>

            <BookingButton
              variant="primary"
              className="whitespace-nowrap hover:translate-y-0 max-md:text-[0.85rem]"
            >
              {site.cta.label}
            </BookingButton>
          </div>
        </div>
      </header>

      {/* OVERLAY — menú a pantalla completa */}
      <div
        data-lenis-prevent
        className={`fixed inset-0 z-[60] flex flex-col bg-brand-deep text-white transition-opacity duration-300 ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
      >
        {/* Franja superior con logo blanco + cerrar */}
        <div className="flex h-[74px] shrink-0 items-center justify-between px-6 md:px-10">
          <Link href="/" onClick={closeAll}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={site.brand.logo}
              alt={site.brand.name}
              className="h-5 w-auto brightness-0 invert"
            />
          </Link>
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={() => setMenuOpen(false)}
            className="relative h-7 w-7"
          >
            <span className="absolute left-0 top-1/2 h-[3px] w-7 -translate-y-1/2 rotate-45 rounded-sm bg-white" />
            <span className="absolute left-0 top-1/2 h-[3px] w-7 -translate-y-1/2 -rotate-45 rounded-sm bg-white" />
          </button>
        </div>

        {/* Contenido anclado abajo: opciones (izquierda) + contacto (derecha) */}
        <div className="flex flex-1 flex-col justify-end gap-10 px-6 pb-12 md:flex-row md:items-end md:justify-between md:px-10">
          {/* Opciones / páginas, esquina inferior izquierda */}
          <nav className="flex flex-col items-start gap-3">
            {overlayList.map((item) =>
              item.type === "modal" ? (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setSucursalesOpen(true)}
                  className="font-sans text-[clamp(2rem,5vw,3.6rem)] font-light leading-[1.05] tracking-[-0.01em] text-white transition-colors hover:text-brand-tint"
                >
                  {item.label}
                </button>
              ) : (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeAll}
                  className="font-sans text-[clamp(2rem,5vw,3.6rem)] font-light leading-[1.05] tracking-[-0.01em] text-white transition-colors hover:text-brand-tint"
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          {/* Contáctanos, columna derecha */}
          <div className="flex flex-col items-start gap-3 md:items-end md:text-right">
            <span className="text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-white/60">
              Contáctanos
            </span>
            <button
              type="button"
              onClick={() => {
                closeAll();
                openBooking();
              }}
              className="font-accent text-[clamp(2rem,5vw,3.6rem)] leading-[1.05] text-white transition-colors hover:text-brand-tint"
            >
              Agenda una Cita
            </button>
          </div>
        </div>
      </div>

      {/* MODAL — Sucursales */}
      <div
        className={`fixed inset-0 z-[70] flex items-center justify-center p-4 transition-opacity duration-200 ${
          sucursalesOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!sucursalesOpen}
        onClick={() => setSucursalesOpen(false)}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div
          data-lenis-prevent
          className="glass relative w-full max-w-md rounded-block p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            type="button"
            aria-label="Cerrar"
            onClick={() => setSucursalesOpen(false)}
            className="absolute right-5 top-5 text-2xl leading-none text-ink/60 transition-colors hover:text-ink"
          >
            ×
          </button>

          <h2 className="font-sans text-2xl font-light text-ink">Sucursales</h2>
          <p className="mt-1 text-[0.9rem] text-muted">Agenda o contáctanos en tu sucursal más cercana.</p>

          <div className="mt-6 flex flex-col gap-4">
            {site.branches.map((b) => (
              <div key={b.name} className="rounded-card border border-line bg-white/60 p-5">
                <h3 className="text-lg font-medium text-ink">{b.name}</h3>
                <div className="mt-2 flex flex-col gap-1 text-[0.9rem]">
                  <a href={telHref(b.phone)} className="text-muted transition-colors hover:text-brand">
                    Tel: {b.phone}
                  </a>
                  <a
                    href={waHref(b.whatsapp)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted transition-colors hover:text-brand"
                  >
                    WhatsApp: {b.whatsapp}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
