"use client";

import { useEffect, useState } from "react";
import { Stars } from "@/components/ui/Stars";

// Calificación de Google DINÁMICA por sucursal (igual que el resto del contenido con
// ?suc=). Datos reales por sucursal (nada de promedios inventados; el schema
// MedicalClinic de cada sucursal usa estos mismos valores):
//   ?suc=antigua → 4.8 · 83 reseñas   ·   ?suc=cuspide → 4.6 · 103 reseñas
//   sin parámetro → "4.8 en Google" (Antigua, la mejor calificada), sin conteo.
// Lee el parámetro en el cliente (sin de-optar el render estático a Suspense); en SSR
// muestra el valor por defecto y se ajusta tras hidratar si viene ?suc=.
type Rating = { value: string; text: string };

const RATINGS: Record<string, Rating> = {
  antigua: { value: "4.8", text: "en Google · 83 reseñas" },
  cuspide: { value: "4.6", text: "en Google · 103 reseñas" },
};
const DEFAULT: Rating = { value: "4.8", text: "en Google" };

function useBranchRating(): Rating {
  const [rating, setRating] = useState<Rating>(DEFAULT);
  useEffect(() => {
    const suc = new URLSearchParams(window.location.search).get("suc") ?? "";
    setRating(RATINGS[suc] ?? DEFAULT);
  }, []);
  return rating;
}

/** Formato en línea para los heroes (junto a las estrellas, sobre fondo oscuro). */
export function GoogleRatingInline() {
  const r = useBranchRating();
  return (
    <span>
      <b className="text-white">{r.value}</b> {r.text}
    </span>
  );
}

/** Formato apilado (número grande + estrellas + conteo) para los bloques de testimonios. */
export function GoogleRatingScore() {
  const r = useBranchRating();
  return (
    <div className="mt-5 flex flex-col items-center gap-1">
      <span className="text-[2.6rem] font-semibold leading-none text-ink">{r.value}</span>
      <Stars rating={5} className="text-[1.05rem]" />
      <small className="text-[0.82rem] text-muted">{r.text}</small>
    </div>
  );
}
