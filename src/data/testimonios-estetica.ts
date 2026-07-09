// Reseñas de la página /estetica/ (Medicina Estética). Mismo tipo Review que el Home.
// TODO: reemplazar por reseñas reales de medicina estética de Google (placeholder).

import type { Review } from "./types";

export const testimoniosEstetica = {
  googleScore: {
    value: "4.7",
    count: "en Google · 186 reseñas",
  },
  reviews: [
    {
      author: "TODO Reseña 1",
      initial: "T",
      rating: 5,
      text: "TODO: reseña real de un paciente de medicina estética (placeholder).",
    },
    {
      author: "TODO Reseña 2",
      initial: "T",
      rating: 5,
      text: "TODO: reseña real de un paciente de medicina estética (placeholder).",
    },
    {
      author: "TODO Reseña 3",
      initial: "T",
      rating: 5,
      text: "TODO: reseña real de un paciente de medicina estética (placeholder).",
    },
  ] satisfies Review[],
};
